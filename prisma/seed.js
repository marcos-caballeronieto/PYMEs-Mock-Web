const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SPECIALTIES = ["Medicina General", "Fisioterapia", "Psicología", "Análisis Clínicos"];
const MOCK_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];

const getNext5WorkingDays = () => {
  const dates = [];
  let d = new Date();
  while (dates.length < 5) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const dayNum = d.getDate();
      const monthName = new Intl.DateTimeFormat("es-ES", { month: "short" }).format(d);
      dates.push(`${dayNum} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`);
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
};

async function main() {
  console.log('Borrando datos antiguos...');
  await prisma.appointment.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creando pacientes (usuarios falsos)...');
  const user1 = await prisma.user.create({
    data: {
      name: "Laura Martínez",
      email: "laura.m@ejemplo.com",
      phone: "+34600123456"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Carlos Gómez",
      email: "carlos.g@ejemplo.com",
      phone: "+34600987654"
    }
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Ana Ruiz",
      email: "ana.r@ejemplo.com",
      phone: "+34600555666"
    }
  });

  console.log('Generando citas falsas para la semana laboral...');
  const workingDays = getNext5WorkingDays();
  
  const appointmentsToCreate = [
    { userId: user1.id, specialty: SPECIALTIES[0], date: workingDays[0], time: MOCK_TIMES[1], status: "CONFIRMED" }, // Hoy o mañana
    { userId: user2.id, specialty: SPECIALTIES[1], date: workingDays[0], time: MOCK_TIMES[3], status: "CONFIRMED" }, // Hoy o mañana
    { userId: user3.id, specialty: SPECIALTIES[0], date: workingDays[1], time: MOCK_TIMES[0], status: "CONFIRMED" },
    { userId: user1.id, specialty: SPECIALTIES[2], date: workingDays[2], time: MOCK_TIMES[4], status: "CONFIRMED" }, 
    { userId: user2.id, specialty: SPECIALTIES[3], date: workingDays[4], time: MOCK_TIMES[5], status: "CONFIRMED" }
  ];

  for (const app of appointmentsToCreate) {
    await prisma.appointment.create({
      data: app
    });
  }

  console.log('✅ Base de datos poblada con éxito con '+ appointmentsToCreate.length +' citas en Supabase.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Puedes editar estos valores para ocupar la cita que desees
const FAKE_PATIENT = {
  name: "Mock Patient",
  email: "mock@smartclinic.es",
  phone: "+34 600 000 000"
}

// Valores por defecto si no se pasan parámetros
// Nota: 'date' debe coincidir con el label de la interfaz (ej. "Hoy", "Mañana", "Jueves" o fechas literales)
const DEFAULT_SPECIALTY = "Medicina General"
const DEFAULT_DATE = "13 Mar" // El label que genera la app
const DEFAULT_TIME = "10:30"

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (command === "clean") {
    // Vaciar la base de datos entera
    await prisma.appointment.deleteMany()
    await prisma.user.deleteMany()
    console.log("✅ Base de datos (Users y Appointments) vaciada correctamente.")
    return
  }

  if (command === "generate-demo") {
    console.log("Generando datos simulados realistas...");
    await prisma.appointment.deleteMany();
    await prisma.user.deleteMany();

    const SPECIALTIES = ["Medicina General", "Fisioterapia", "Psicología", "Análisis Clínicos"];
    const DATES = ["11 Mar", "12 Mar", "13 Mar", "14 Mar", "15 Mar"];
    const TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];
    
    const fakeNames = ["Carlos Martínez", "Lucía Fernández", "Ana Gómez", "Javier Pérez", "Laura Sánchez", "David López", "Isabel Díaz", "Miguel Ruiz"];
    
    // Generar usuarios
    const users = [];
    for (const name of fakeNames) {
      const email = `${name.split(" ")[0].toLowerCase()}@example.com`;
      const user = await prisma.user.create({
        data: { name, email, phone: "+34 600 " + Math.floor(100000 + Math.random() * 900000) }
      });
      users.push(user);
    }

    // Generar 20 citas aleatorias
    let created = 0;
    while (created < 20) {
      const u = users[Math.floor(Math.random() * users.length)];
      const s = SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)];
      const d = DATES[Math.floor(Math.random() * DATES.length)];
      const t = TIMES[Math.floor(Math.random() * TIMES.length)];
      const isCancelled = Math.random() > 0.85; // 15% canceladas

      try {
        await prisma.appointment.create({
          data: {
            userId: u.id, specialty: s, date: d, time: t,
            status: isCancelled ? "CANCELLED" : "CONFIRMED"
          }
        });
        created++;
      } catch (e) {
        // Ignorar si colisiona y probar otra vez
      }
    }
    
    console.log(`✅ ¡Éxito! Base de datos inicializada con ${fakeNames.length} pacientes y 20 citas.`);
    return;
  }

  if (command === "seed") {
    // Leer parámetros o utilizar los de por defecto
    const specialty = args[1] || DEFAULT_SPECIALTY
    const date = args[2] || DEFAULT_DATE
    const time = args[3] || DEFAULT_TIME

    // Asegurarse de que existe el usuario falso
    const user = await prisma.user.upsert({
      where: { email: FAKE_PATIENT.email },
      update: {},
      create: FAKE_PATIENT
    })

    // Crear la cita para bloquear el spot
    try {
      await prisma.appointment.create({
        data: {
          userId: user.id,
          specialty,
          date,
          time,
          status: "CONFIRMED"
        }
      })
      console.log(`✅ Spot bloqueado con éxito con paciente Mock!`)
      console.log(`   Especialidad: ${specialty}`)
      console.log(`   Día: ${date}`)
      console.log(`   Hora: ${time}`)
    } catch (e: any) {
      if (e.code === 'P2002') {
         console.warn(`⚠️  Ese spot ya está ocupado: ${specialty} el ${date} a las ${time}`)
      } else {
         console.error("Error al crear la cita mock:", e)
      }
    }
    return
  }

  console.log(`
Uso del script (necesitas npx tsx o similar):
  1. Para crear un bloqueo (usa los valores por defecto si no pasas parámetros):
     npx tsx scripts/mock-db.ts seed ["Especialidad"] ["Fecha"] ["Hora"]
     Ejemplo: npx tsx scripts/mock-db.ts seed "Fisioterapia" "13 Mar" "10:30"
     
  2. Para limpiar todas las reservas:
     npx tsx scripts/mock-db.ts clean
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

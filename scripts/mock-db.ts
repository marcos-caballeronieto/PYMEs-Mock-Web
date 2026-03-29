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

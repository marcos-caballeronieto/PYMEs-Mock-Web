import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const MOCK_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');

    if (!specialty) {
      return NextResponse.json(
        { error: 'Parámetro specialty requerido' },
        { status: 400 }
      );
    }

    // Buscar TODAS las citas existentes para esa especialidad (en la vida real se filtraría por un rango de fechas >= hoy)
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        specialty,
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        date: true,
        time: true
      }
    });

    // Devolvemos el array de spots ocupados para que el frontend pinte el calendario
    return NextResponse.json({ bookedSpots: existingAppointments });
    
  } catch (error: any) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

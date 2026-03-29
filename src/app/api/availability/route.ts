import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const MOCK_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const specialty = searchParams.get('specialty');

    if (!date || !specialty) {
      return NextResponse.json(
        { error: 'Parámetros date y specialty requeridos' },
        { status: 400 }
      );
    }

    // Buscar las citas existentes para esa fecha y especialidad
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date,
        specialty,
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        time: true
      }
    });

    const bookedTimes = new Set(existingAppointments.map((app: { time: string }) => app.time));
    
    // Filtrar los times base quitando los que ya están en base de datos
    const availableTimes = MOCK_TIMES.filter(time => !bookedTimes.has(time));

    return NextResponse.json({ availableTimes });
    
  } catch (error: any) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

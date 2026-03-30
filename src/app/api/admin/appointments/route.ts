import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function guardAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  if (user.app_metadata?.role !== 'admin') return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
  return null; // null significa "ok, continuar"
}

export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;

  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: { select: { name: true, phone: true, email: true } }
      },
      orderBy: [
        { date: 'asc' },
        { time: 'asc' }
      ]
    });
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching admin appointments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = await guardAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { id, action, date, time } = body;

    if (!id || !action) {
      return NextResponse.json({ error: 'Faltan campos id y action' }, { status: 400 });
    }

    if (action === 'CANCEL') {
      const updated = await prisma.appointment.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });
      return NextResponse.json({ success: true, appointment: updated });
    }

    if (action === 'RESCHEDULE') {
      if (!date || !time) {
        return NextResponse.json({ error: 'Para reagendar faltan date y time' }, { status: 400 });
      }

      // Evitar colisiones (si otro tomó ese spot)
      const existing = await prisma.appointment.findUnique({
        where: {
          id: id // Primero aseguramos que no busquemos el mismo
        }
      });
      
      if (!existing) return NextResponse.json({error: "No existe"}, {status: 404});

      const clash = await prisma.appointment.findFirst({
        where: {
          date,
          time,
          specialty: existing.specialty,
          status: { not: 'CANCELLED' }
        }
      });

      if (clash) {
        return NextResponse.json({ error: 'El horario está ocupado por otra cita' }, { status: 409 });
      }

      const updated = await prisma.appointment.update({
        where: { id },
        data: { date, time, status: 'CONFIRMED' }
      });
      return NextResponse.json({ success: true, appointment: updated });
    }

    return NextResponse.json({ error: 'Acción inválida' }, { status: 400 });

  } catch (error) {
    console.error('Error patching appt:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await guardAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { name, email, phone, specialty, date, time } = body;

    if (!name || !email || !phone || !specialty || !date || !time) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Check if the slot is taken
    const clash = await prisma.appointment.findFirst({
      where: {
        date,
        time,
        specialty,
        status: { not: 'CANCELLED' }
      }
    });

    if (clash) {
      return NextResponse.json({ error: 'El horario está ocupado' }, { status: 409 });
    }

    // Upsert user
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, phone },
      create: { name, email, phone }
    });

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        specialty,
        date,
        time,
        status: 'CONFIRMED'
      },
      include: {
        user: true
      }
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error('Error creating appt:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

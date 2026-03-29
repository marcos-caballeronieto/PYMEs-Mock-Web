import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';

// Initialize Resend via environment variable
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, specialty, date, time } = body;

    // Server side validation
    if (!name || !email || !phone || !specialty || !date || !time) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios en la reserva' },
        { status: 400 }
      );
    }

    // 1. Save or update user
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, phone },
      create: { name, email, phone }
    });

    // 2. Check availability
    const existingAppointment = await prisma.appointment.findUnique({
      where: {
        date_time_specialty: {
          date,
          time,
          specialty
        }
      }
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'Este horario ya no está disponible para esta especialidad.' },
        { status: 409 } // Conflict
      );
    }

    // 3. Create appointment
    await prisma.appointment.create({
      data: {
        userId: user.id,
        specialty,
        date,
        time,
        status: "CONFIRMED"
      }
    });

    if (!process.env.RESEND_API_KEY) {
      console.warn("No RESEND_API_KEY configured. Mocking successful email response.");
      // Intentional artificial delay in dev
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, mocked: true });
    }

    // Using Resend to ping the client
    const { data, error } = await resend.emails.send({
      from: 'SmartClinic OS <onboarding@resend.dev>',
      to: [process.env.MY_EMAIL || email],
      subject: `Nueva Cita B2B Agendada: ${name} - ${specialty}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #18181b;">
          <h1 style="color: #2563eb;">Nueva Reserva (Demo B2B)</h1>
          <p>Esta es una notificación automática generada por <strong>SmartClinic OS</strong> demostrando el pipeline de reservas.</p>
          
          <div style="background-color: #f4f4f5; padding: 24px; border-radius: 12px; margin: 24px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Paciente:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong>Teléfono:</strong> ${phone}</p>
            <p style="margin: 0 0 10px 0;"><strong>Especialidad:</strong> ${specialty}</p>
            <p style="margin: 0 0 10px 0;"><strong>Día:</strong> ${date}</p>
            <p style="margin: 0;"><strong>Hora:</strong> ${time}</p>
          </div>
          
          <hr style="border-top: 1px solid #e4e4e7; margin: 30px 0;" />
          <p style="color: #71717a; font-size: 12px; line-height: 1.5;">
            Has recibido este email porque completaste el formulario de demostración en la Landing Page de SmartClinic OS. Esta cita es ficticia.
          </p>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error in Booking API:', error);
    return NextResponse.json(
      { error: error?.message || 'Error interno del servidor procesando la cita' },
      { status: 500 }
    );
  }
}

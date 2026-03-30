import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function guardAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  if (user.app_metadata?.role !== 'admin') return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
  return null;
}

export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;

  try {
    // Citas que no están canceladas
    const activeAppointments = await prisma.appointment.count({
      where: { status: { not: 'CANCELLED' } }
    });

    // Número de pacientes únicos
    const totalPatients = await prisma.user.count();

    // Especialidad más demandada
    const specialtyGroups = await prisma.appointment.groupBy({
      by: ['specialty'],
      _count: { specialty: true },
      orderBy: { _count: { specialty: 'desc' } }
    });
    
    const topSpecialtyInfo = specialtyGroups.length > 0 ? specialtyGroups[0] : { specialty: "N/A", _count: { specialty: 0 } };
    
    // Generar Ratings coherentes con las especialidades (datos Mock para B2B demo)
    const reviewsRating = (Math.random() * (4.9 - 4.6) + 4.6).toFixed(1); // ej 4.8
    const reviewsBreakdown = specialtyGroups.map((s: { specialty: string; _count: { specialty: number } }) => ({
      specialty: s.specialty,
      rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
      count: s._count.specialty * 3 + Math.floor(Math.random() * 20) // Proporcional al uso
    }));

    return NextResponse.json({
      appointments: activeAppointments,
      patients: totalPatients,
      topSpecialty: topSpecialtyInfo.specialty,
      reviews: {
        averageRating: reviewsRating,
        totalCount: reviewsBreakdown.reduce((acc: number, r: { count: number }) => acc + r.count, 0),
        breakdown: reviewsBreakdown
      }
    });

  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

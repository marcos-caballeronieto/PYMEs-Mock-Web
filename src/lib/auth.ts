import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Server-side helper.
 * Verifica que existe sesión activa de Supabase Y que el usuario
 * tiene role === 'admin' en app_metadata.
 *
 * - Sin sesión       → redirect a /auth/login?redirectTo=/admin
 * - Sin rol admin    → redirect a / (acceso denegado silencioso)
 * - Todo OK          → devuelve el objeto user
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?redirectTo=/admin');
  }

  if (user.app_metadata?.role !== 'admin') {
    redirect('/');
  }

  return user;
}

/**
 * Server-side helper.
 * Devuelve true si el usuario logueado es admin, false en cualquier otro caso.
 * No hace redirect — útil para renderizado condicional de UI.
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.app_metadata?.role === 'admin';
  } catch {
    return false;
  }
}

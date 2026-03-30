import { Activity } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MobileMenu } from "./MobileMenu";
import { UserNav } from "./UserNav";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-zinc-100 bg-white/60 backdrop-blur-xl sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-primary hover:scale-[0.98] transition-transform">
        <Activity className="h-7 w-7" />
        <span>SmartClinic</span>
      </Link>

      <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-zinc-500 tracking-tight uppercase">
        <a href="/#how-it-works" className="hover:text-primary transition-all duration-300">Cómo funciona</a>
        <a href="/#services" className="hover:text-primary transition-all duration-300">Especialidades</a>
        <a href="/#testimonials" className="hover:text-primary transition-all duration-300">Testimonios</a>
      </nav>

      <div className="flex items-center gap-4">
        {/* Botón de Pedir Cita - AHORA AZUL */}
        <Link href="/reservar" className="hidden sm:flex items-center justify-center bg-primary text-white hover:bg-primary/90 rounded-full px-7 py-2.5 shadow-lg shadow-primary/30 transition-all font-black text-sm uppercase tracking-wide">
          Pedir Cita
        </Link>

        {user ? (
          <div className="flex items-center gap-4 border-l border-zinc-100 pl-4">
            <UserNav user={user} />
          </div>
        ) : (
          <Link href="/auth/login" className="flex items-center justify-center bg-zinc-950 text-white hover:bg-zinc-800 rounded-full px-7 py-2.5 shadow-lg shadow-zinc-400/20 transition-all font-black text-sm uppercase tracking-wide">
            Acceder
          </Link>
        )}
        <MobileMenu user={user} />
      </div>
    </header>
  );
}

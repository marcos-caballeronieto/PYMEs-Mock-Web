"use client";

import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { signout } from "@/actions/auth";

export function MobileMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 -mr-2 text-zinc-600 hover:text-primary transition-colors focus:outline-none"
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {isOpen && (
        <div className="fixed top-[81px] left-0 right-0 bottom-0 bg-white/98 backdrop-blur-2xl border-t border-zinc-100 shadow-2xl p-8 flex flex-col gap-6 font-bold z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-8 flex-1">
            <a onClick={() => setIsOpen(false)} href="/#how-it-works" className="text-2xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4 tracking-tighter uppercase">Cómo funciona</a>
            <a onClick={() => setIsOpen(false)} href="/#services" className="text-2xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4 tracking-tighter uppercase">Especialidades</a>
            <a onClick={() => setIsOpen(false)} href="/#testimonials" className="text-2xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4 tracking-tighter uppercase">Testimonios</a>
            
            <div className="h-px bg-zinc-200 w-full my-2" />
            
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {user.user_metadata?.first_name?.charAt(0) || <UserIcon className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-lg font-black text-zinc-900">{user.user_metadata?.first_name} {user.user_metadata?.last_name}</p>
                    <p className="text-xs text-zinc-500 font-bold">{user.email}</p>
                  </div>
                </div>
                <Link onClick={() => setIsOpen(false)} href="/reservar" className="flex items-center justify-center bg-primary text-white rounded-2xl py-5 text-xl shadow-xl shadow-primary/20 transition-all font-black uppercase tracking-tight">Preguntar Cita</Link>
                <button 
                   onClick={() => { signout(); setIsOpen(false); }}
                   className="w-full flex items-center gap-3 px-6 py-4 text-xl font-black text-red-500 bg-red-50 rounded-2xl transition-all uppercase tracking-tighter"
                >
                  <LogOut className="w-6 h-6" /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pt-4">
                <Link onClick={() => setIsOpen(false)} href="/reservar" className="flex items-center justify-center bg-primary text-white rounded-3xl py-6 text-2xl shadow-xl shadow-primary/20 transition-all font-black uppercase tracking-tight">
                  Pedir Cita
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/auth/login" className="flex items-center justify-center bg-zinc-950 text-white rounded-3xl py-6 text-2xl shadow-xl shadow-zinc-400/20 transition-all font-black uppercase tracking-tight">
                  Acceder
                </Link>
              </div>
            )}
          </div>
          
          <div className="pt-8 border-t border-zinc-100 mt-auto">
             <p className="text-center text-zinc-400 text-sm font-bold uppercase tracking-widest">SmartClinic OS Demo</p>
          </div>
        </div>
      )}
    </div>
  );
}

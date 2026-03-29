"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 -mr-2 text-zinc-600 hover:text-primary transition-colors focus:outline-none"
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {isOpen && (
        <div className="absolute top-[81px] left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-zinc-200 shadow-2xl p-6 flex flex-col gap-6 font-bold z-50 animate-in slide-in-from-top-4 duration-300">
          <a onClick={() => setIsOpen(false)} href="/#how-it-works" className="text-xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4">Cómo funciona</a>
          <a onClick={() => setIsOpen(false)} href="/#services" className="text-xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4">Especialidades</a>
          <a onClick={() => setIsOpen(false)} href="/#testimonials" className="text-xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4">Testimonios</a>
          <div className="h-px bg-zinc-200 w-full" />
          <Link onClick={() => setIsOpen(false)} href="/admin" className="text-xl hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary pl-4">Portal del Administrador</Link>
          <Link onClick={() => setIsOpen(false)} href="/reservar" className="bg-primary hover:bg-primary/90 text-white text-center rounded-2xl py-5 text-xl mt-4 shadow-xl shadow-primary/20 transition-all font-black">
            Reservar Cita Ahora
          </Link>
        </div>
      )}
    </div>
  );
}

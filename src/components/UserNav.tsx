"use client";

import { User as UserIcon, LogOut, Settings, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { signout } from '@/actions/auth';
import { useState } from 'react';

export function UserNav({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all font-bold overflow-hidden"
      >
        {user.user_metadata?.first_name ? (
          user.user_metadata.first_name.charAt(0).toUpperCase()
        ) : (
          <UserIcon className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
            <div className="px-4 py-3 border-b border-white/5 mb-2">
              <p className="text-sm font-bold text-white truncate">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-zinc-500 truncate mt-0.5">
                {user.email}
              </p>
            </div>

            <Link 
              href="/reservar" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-left"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard className="w-4 h-4" /> Mis Citas
            </Link>

            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-left"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" /> Configuración (Demo)
            </Link>

            <div className="px-2 pt-2 mt-2 border-t border-white/5">
              <button 
                onClick={() => signout()}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" /> Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

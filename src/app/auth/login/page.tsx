"use client";

import { useState } from 'react';
import { login } from '@/actions/auth';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    // Explicitly add redirectTo to formData if needed, 
    // but a hidden input in the form is cleaner.
    const result = await login(formData);

    if (result?.error) {
      toast.error("Error de acceso", { description: result.error });
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Bienvenido de nuevo</h2>
        <p className="text-zinc-400 text-sm mt-1">Ingresa tus credenciales para acceder</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Correo Electrónico</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              required
              name="email"
              type="email" 
              placeholder="nombre@ejemplo.com"
              className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-zinc-700" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
             <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Contraseña</label>
             <Link href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">¿Olvidaste?</Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              required
              name="password"
              type="password" 
              placeholder="••••••••"
              className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-zinc-700" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>
              Iniciar Sesión <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 text-center border-t border-white/5">
        <p className="text-zinc-500 text-sm">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/signup" className="text-white font-bold hover:text-primary transition-colors hover:underline">
            Crea una ahora
          </Link>
        </p>
      </div>
    </div>
  );
}

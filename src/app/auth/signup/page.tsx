"use client";

import { useState } from 'react';
import { signup } from '@/actions/auth';
import { Mail, Lock, User, Phone, Loader2, ArrowRight, Eye, EyeOff, Activity } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const pass = formData.get('password') as string;
    const confirmPass = formData.get('confirmPassword') as string;

    if (pass !== confirmPass) {
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const result = await signup(formData);

    if (result?.error) {
      toast.error("Error al registrarse", { description: result.error });
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Crea tu cuenta</h2>
        <p className="text-zinc-400 text-sm mt-1">Únete a la gestión de salud inteligente</p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4 text-primary" />
        </div>
        <p className="text-xs text-zinc-300 font-medium leading-relaxed">
          <strong className="text-primary block mb-0.5">Recomendación:</strong>
          Regístrate para que tus datos se guarden y se rellenen automáticamente en futuras citas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre y Apellidos en la misma fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Nombre</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input
                required
                name="firstName"
                type="text"
                placeholder="Juan"
                className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Apellidos</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input
                required
                name="lastName"
                type="text"
                placeholder="Pérez"
                className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Correo Electrónico</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input
              required
              name="email"
              type="email"
              placeholder="juan@ejemplo.com"
              className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Teléfono</label>
          <div className="relative group">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input
              required
              name="phone"
              type="tel"
              placeholder="+34 600 000 000"
              className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                title={showPassword ? "Ocultar" : "Mostrar"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Confirmar</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input
                required
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-4 active:scale-[0.98]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>
              Crear Cuenta <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 text-center border-t border-white/5">
        <p className="text-zinc-500 text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="text-white font-bold hover:text-primary transition-colors hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

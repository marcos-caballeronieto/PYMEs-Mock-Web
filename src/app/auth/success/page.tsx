import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AuthSuccessPage() {
  return (
    <div className="space-y-8 py-4 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">¡Registro Casi Listo!</h2>
        <p className="text-zinc-400">
          Hemos enviado un correo de confirmación a tu dirección de email.
        </p>
      </div>

      <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-3">
        <Mail className="w-6 h-6 text-primary" />
        <p className="text-sm text-zinc-500 max-w-[240px]">
          Por favor, revisa tu bandeja de entrada (y la carpeta de spam) para activar tu cuenta.
        </p>
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Link 
          href="/auth/login" 
          className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
        >
          Volver al Inicio de Sesión <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

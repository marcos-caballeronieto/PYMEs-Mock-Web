"use client";
import { useState } from 'react';
import { Lock, ShieldCheck, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { loginAdmin } from './actions';
import { useRouter } from 'next/navigation';

export default function LoginMock() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error('Introduce una contraseña');
      return;
    }
    
    setLoading(true);
    
    // Simulate slight network delay for effect
    await new Promise(r => setTimeout(r, 600));
    
    const res = await loginAdmin(password);
    
    if (res.success) {
      toast.success('Acceso permitido', { description: 'Bienvenido al panel de administración.' });
      router.refresh(); // Reloads the server component to read the new cookie
    } else {
      toast.error(res.error || 'Acceso denegado');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">SmartClinic OS</h1>
            <p className="text-zinc-400 text-sm mt-1">Portal Operativo &amp; Base de Datos</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-300">Contraseña de Administrador (Mock)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Cualquier texto sirve..."
                className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold h-12 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? <ShieldCheck className="w-5 h-5 animate-pulse" /> : "Acceder al Panel"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-600 font-medium mt-6">
          La contraseña definida es <strong>admin123</strong>.
        </p>
      </div>
    </div>
  );
}

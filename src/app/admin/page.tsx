import { Activity, Users, Calendar as CalendarIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-zinc-950/60 sticky top-0 z-50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-primary transition-colors">
          <Activity className="h-6 w-6 text-primary" />
          <span>SmartClinic <span className="text-zinc-500 font-normal">| Admin</span></span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">SC</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard General</h1>
            <p className="text-zinc-400">Vista de control. Aquí se integrarán los datos en tiempo real (Base de Datos a continuación).</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/20 text-primary rounded-xl"><CalendarIcon className="w-5 h-5"/></div>
                <span className="text-xs font-bold text-emerald-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> +12%</span>
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">Citas Hoy</p>
                <p className="text-3xl font-black text-white">24</p>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Users className="w-5 h-5"/></div>
                <span className="text-xs font-bold text-emerald-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1"/> +5%</span>
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">Pacientes Nuevos</p>
                <p className="text-3xl font-black text-white">12</p>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><Activity className="w-5 h-5"/></div>
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-medium">Tasa de Asistencia</p>
                <p className="text-3xl font-black text-white">98%</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 h-96 flex flex-col items-center justify-center text-zinc-500 space-y-4">
            <Activity className="w-12 h-12 opacity-20" />
            <p>[ Área reservada para la Tabla de Gestión de Citas (Integración DB) ]</p>
          </div>
        </div>
      </main>
    </div>
  );
}

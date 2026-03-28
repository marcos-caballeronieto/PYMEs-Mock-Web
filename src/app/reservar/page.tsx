import { Calendar, Stethoscope, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-zinc-200 bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-80 transition-opacity">
          <ChevronRight className="rotate-180 h-5 w-5" />
          <span>Volver al Inicio</span>
        </Link>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 py-12">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950">Pedir Cita</h1>
            <p className="text-zinc-500 font-medium text-lg">Esta es una vista interactiva que simularía el proceso de reserva que implementaremos más adelante con base de datos.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-zinc-200 shadow-2xl shadow-zinc-200/50 space-y-10">
            {/* Steps mock */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-primary font-bold text-xl">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">1</div>
                Selecciona tu especialidad
              </div>
              <div className="grid md:grid-cols-2 gap-4 md:pl-14">
                {["Medicina General", "Fisioterapia", "Psicología", "Análisis Clínicos"].map((esp, i) => (
                  <div key={i} className="border-2 border-zinc-100 hover:border-primary/40 focus:border-primary hover:bg-zinc-50/50 rounded-2xl p-5 cursor-pointer transition-all font-bold text-zinc-700 flex justify-between items-center group">
                    {esp}
                    <div className="w-6 h-6 rounded-full border-2 border-zinc-200 group-hover:border-primary transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 opacity-40 pointer-events-none">
              <div className="flex items-center gap-4 text-zinc-400 font-bold text-xl">
                <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center">2</div>
                Fecha y Hora
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-100 md:pl-14 flex justify-end">
              <Button disabled className="rounded-xl px-10 h-14 text-base font-bold opacity-50 bg-zinc-200 text-zinc-500 cursor-not-allowed">
                Siguiente Paso <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-5 flex items-center justify-between border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
          <ChevronRight className="rotate-180 h-5 w-5" />
          <span>Volver a Inicio</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
          Más que una clínica, <br /> <span className="text-primary italic">una solución tecnológica.</span>
        </h1>

        <div className="space-y-8 text-lg md:text-xl text-zinc-600 leading-relaxed font-medium">
          <p>
            SmartClinic OS es un proyecto demostrativo diseñado para explorar cómo la automatización y la Inteligencia Artificial pueden transformar las operaciones comerciales.
          </p>
          <p>
            Aunque aquí mostramos el caso de uso de una clínica de salud, la infraestructura subyacente es aplicable a <strong>despachos de abogados, gimnasios, inmobiliarias, talleres  mecánicos y muchos otros</strong>.
          </p>

          <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100 my-12 shadow-inner">
            <h3 className="text-2xl font-bold text-zinc-950 mb-6">¿Qué se consigue automatizando?</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <ArrowRight className="text-primary shrink-0 mt-1" />
                <span><strong>Ahorro de Tiempo:</strong> Elimina el 80% del tiempo invertido en calificar interesados y buscar huecos en la agenda de forma manual.</span>
              </li>
              <li className="flex gap-4">
                <ArrowRight className="text-primary shrink-0 mt-1" />
                <span><strong>Servicio Ininterrumpido:</strong> Atención automática 24/7. El cliente recibe una confirmación y calendario por WhatsApp instantáneamente.</span>
              </li>
              <li className="flex gap-4">
                <ArrowRight className="text-primary shrink-0 mt-1" />
                <span><strong>Reducción de Fallos:</strong> Los recordatorios programados disminuyen drásticamente los "no-show" o citas perdidas mejorando la rentabilidad.</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
              De acuerdo, vamos a ver la demo <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

import { ArrowRight, Calendar, Clock, MessageSquare, ShieldCheck, Activity, Brain, Stethoscope, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      {/* Disclaimer Banner */}
      <div className="bg-zinc-900 text-zinc-100 text-[10px] md:text-xs py-2 px-4 text-center tracking-wide uppercase font-medium">
        <strong>Aviso:</strong> Este sitio web es una demostración técnica (mock) diseñada para ilustrar capacidades de automatización e IA para empresas. No es una clínica médica real.
      </div>

      {/* Navbar */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-primary">
          <Activity className="h-7 w-7" />
          <span>SmartClinic</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-muted-foreground">
          <a href="#how-it-works" className="hover:text-primary transition-all duration-300">Cómo funciona</a>
          <a href="#services" className="hover:text-primary transition-all duration-300">Especialidades</a>
          <a href="#testimonials" className="hover:text-primary transition-all duration-300">Testimonios</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="hidden lg:flex items-center justify-center hover:bg-zinc-100 rounded-full text-sm font-semibold px-4 py-2 transition-colors">
            Portal Admin
          </Link>
          <Link href="/reservar" className="flex items-center justify-center bg-primary text-white hover:bg-primary/90 rounded-full px-7 py-2.5 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all font-bold">
            Pedir Cita
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center px-6 lg:px-20 py-20 overflow-hidden bg-white">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero_clinic.png"
              alt="Clínica Moderna"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:to-white/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Innovación en Salud
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-950 leading-[0.95]">
              Tu salud, <br />
              <span className="text-primary italic">sin esperas.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-700 max-w-2xl leading-relaxed font-medium">
              Reserva tu cita al instante gracias a nuestro sistema inteligente. Entendemos tus síntomas y te asignamos el especialista adecuado en segundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <Link href="/reservar" className="flex items-center justify-center bg-primary text-white hover:bg-primary/90 active:scale-95 rounded-full text-lg h-16 px-10 w-full sm:w-auto shadow-2xl shadow-primary/40 group hover:-translate-y-1 transition-all font-black">
                RESERVAR AHORA <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/info" className="flex items-center justify-center text-zinc-900 active:scale-95 rounded-full text-lg h-16 px-10 w-full sm:w-auto bg-white/80 backdrop-blur-md border-2 border-zinc-200 hover:border-zinc-300 hover:bg-white transition-all font-bold">
                MÁS INFORMACIÓN
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs font-black uppercase tracking-widest text-zinc-500">
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-500" /> Datos Cifrados</div>
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Triaje AI 24/7</div>
              <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-zinc-950" /> Gestión Directa</div>
            </div>
          </div>
        </section>

        {/* Prominent Separator transition */}
        <div className="w-full bg-primary text-primary-foreground py-6 md:py-8 flex items-center justify-center shadow-xl relative z-20 border-y border-primary/80">
          <div className="max-w-7xl w-full px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-black tracking-[0.2em] uppercase text-sm md:text-base opacity-95">
              Transformando la Experiencia Clínica
            </span>
            <div className="flex items-center gap-6 text-sm font-bold opacity-80">
              <span>Tecnología de Vanguardia</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>Gestión Inteligente</span>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <section id="how-it-works" className="px-6 lg:px-20 py-32 bg-white relative">
          <div className="max-w-6xl mx-auto space-y-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-6 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                  Un proceso <span className="text-primary italic underline decoration-4 underline-offset-8">diseñado</span> para ti.
                </h2>
                <p className="text-zinc-600 text-xl font-medium leading-relaxed">
                  Olvídate de las llamadas en espera. Nuestro sistema automatizado agiliza cada paso de tu visita.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-primary text-white p-6 rounded-2xl rotate-3 shadow-xl">
                  <p className="font-black text-4xl italic">30 seg.</p>
                  <p className="text-xs uppercase font-bold text-white/80 tracking-widest">Tiempo de reserva</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "1. Cuéntanos qué sientes",
                  desc: "Nuestro asistente entenderá tus síntomas inmediatamente y te guiará al departamento correcto de forma precisa.",
                  icon: MessageSquare,
                  bg: "bg-blue-50 text-blue-600"
                },
                {
                  title: "2. Elige tu horario",
                  desc: "Selecciona el hueco que mejor te venga de nuestra agenda en tiempo real. Confirmación inmediata, sin solapamientos.",
                  icon: Calendar,
                  bg: "bg-primary/10 text-primary"
                },
                {
                  title: "3. Recibe recordatorios",
                  desc: "Te avisamos por WhatsApp para que no olvides tu cita. Si surge un imprevisto, puedes reagendar con un solo mensaje.",
                  icon: Clock,
                  bg: "bg-emerald-50 text-emerald-600"
                }
              ].map((f, i) => (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 space-y-6">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${f.bg} transition-transform group-hover:scale-110 duration-500`}>
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{f.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed text-lg">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services - Richer Grid */}
        <section id="services" className="px-6 lg:px-20 py-32 bg-zinc-950 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] -z-10 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto space-y-20 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Nuestras Especialidades</h2>
              <p className="text-zinc-500 text-xl font-medium max-w-2xl mx-auto">Tecnología punta al servicio de las mejores manos profesionales.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Medicina General",
                  desc: "Atención primaria completa",
                  details: "Evaluación médica integral, recetas, chequeos preventivos y seguimiento de dolencias comunes. Tu primer punto de contacto.",
                  icon: Stethoscope,
                  img: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  title: "Fisioterapia",
                  desc: "Recuperación y rendimiento",
                  details: "Tratamientos personalizados para lesiones deportivas, dolores crónicos y rehabilitación post-operatoria.",
                  icon: Activity,
                  img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  title: "Psicología",
                  desc: "Bienestar emocional",
                  details: "Espacio seguro para terapia individual, gestión de la ansiedad, el estrés y desarrollo personal integral.",
                  icon: Brain,
                  img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
                },
                {
                  title: "Análisis Clínicos",
                  desc: "Resultados en tiempo real",
                  details: "Biometrías, química sanguínea y pruebas específicas con resultados conectados directamente a tu portal web.",
                  icon: ShieldCheck,
                  img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000"
                }
              ].map((s, i) => (
                <div key={i} className="group relative h-[26rem] overflow-hidden rounded-[2.5rem] border border-white/10 flex flex-col justify-end p-8 hover:border-primary/50 transition-all duration-500">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-20 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent group-hover:via-zinc-950/90 transition-all duration-500" />
                  
                  <div className="relative z-10 flex flex-col justify-end">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg mb-4">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:-translate-y-1 transition-transform duration-500">{s.title}</h4>
                    <p className="text-primary font-medium text-sm lg:text-base group-hover:-translate-y-1 transition-transform duration-500">{s.desc}</p>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col gap-5">
                          <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">{s.details}</p>
                          <Link href="/reservar" className="flex w-full items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-xl">
                            PEDIR CITA <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="px-6 lg:px-20 py-32 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic text-primary">Voces Reales.</h2>
                <p className="text-zinc-600 text-xl font-medium leading-relaxed">
                  Cientos de pacientes ya disfrutan de una experiencia médica adaptada al siglo XXI.
                </p>
              </div>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?u=${i * 100}`} alt="Patient" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  +500
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 grid gap-6">
              {[
                {
                  quote: "Nunca había sido tan fácil pedir cita. En 30 segundos tenía mi cita confirmada por WhatsApp, sin esperas ni llamadas interminables.",
                  author: "Ana Martínez",
                  role: "Paciente de Fisioterapia"
                },
                {
                  quote: "El sistema de triaje por IA es impresionante. Me recomendó exactamente el especialista que necesitaba por mis síntomas.",
                  author: "Carlos R.",
                  role: "Paciente de Medicina General"
                }
              ].map((t, i) => (
                <div key={i} className="p-10 rounded-[2rem] bg-zinc-50 border border-zinc-100 space-y-6">
                  <p className="text-xl italic font-medium leading-relaxed text-zinc-700">"{t.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-zinc-200 pt-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${t.author}`} alt={t.author} />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-950">{t.author}</p>
                      <p className="text-xs font-black uppercase tracking-widest text-primary/70">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* B2B Pitch Banner - Visual Masterpiece */}
        <section className="px-6 lg:px-20 py-40 relative overflow-hidden bg-zinc-950">
          <img
            src="/images/b2b_banner.png"
            alt="B2B Office"
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />

          <div className="max-w-5xl mx-auto relative z-10 space-y-10">
            <div className="inline-block py-1 pr-4 border-l-4 border-primary pl-4 bg-white/5 backdrop-blur-sm">
              <p className="text-primary font-black uppercase tracking-widest text-sm">PARA EMPRESAS Y PYMES</p>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Ahorra tiempo, <br />
              multiplica tus <span className="italic text-primary">clientes</span>.
            </h2>

            <div className="space-y-4 max-w-3xl">
              <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-medium">
                Esta página es una demostración. Te ayudamos a implementar sistemas que atraen pacientes y gestionan sus citas automáticamente. Crece sin sacrificar tu tiempo libre.
              </p>
              <p className="text-zinc-500 text-sm font-medium">
                A nivel técnico, logramos esta automatización orquestando herramientas como IA (OpenAI), n8n y la API de WhatsApp Business, de forma transparente.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/info" className="flex items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-12 h-16 text-xl font-black shadow-2xl transition-all">
                MÁS INFORMACIÓN B2B
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-black text-3xl tracking-tighter text-zinc-950">
              <Activity className="h-8 w-8 text-primary" />
              <span>SmartClinic</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed font-medium">
              Transformamos la relación entre pequeñas empresas y clientes mediante tecnología de vanguardia y automatizaciones inteligentes.
            </p>
          </div>
          <div className="space-y-6">
            <p className="font-black uppercase tracking-widest text-xs">Empresa</p>
            <nav className="flex flex-col gap-4 text-zinc-500 font-bold">
              <Link href="/info" className="hover:text-primary transition-colors">Nosotros</Link>
              <Link href="/info" className="hover:text-primary transition-colors">Casos de Éxito</Link>
              <Link href="/info" className="hover:text-primary transition-colors">Tecnología</Link>
            </nav>
          </div>
          <div className="space-y-6">
            <p className="font-black uppercase tracking-widest text-xs">Contacto Demo</p>
            <nav className="flex flex-col gap-4 text-zinc-500 font-bold">
              <a href="mailto:social@antigravity-ai.com" className="hover:text-primary transition-colors text-sm break-all">social@antigravity-ai.com</a>
              <p className="text-sm">Madrid/Virtual</p>
            </nav>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-100 mt-16 pt-10 text-center flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <p className="text-sm font-bold tracking-tight">© 2026 SmartClinic OS (Demostración). Todos los derechos reservados.</p>
          <div className="flex gap-8 text-xs font-black tracking-widest uppercase">
            <Link href="/info" className="hover:text-primary">Privacidad</Link>
            <Link href="/info" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

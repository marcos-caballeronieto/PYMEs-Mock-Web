"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, CheckCircle2, User, Phone, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
const SPECIALTIES = ["Medicina General", "Fisioterapia", "Psicología", "Análisis Clínicos"];

const getInitialWeekOffset = () => {
  const dayOfWeek = new Date().getDay();
  return dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0;
};

const getCurrentWeekDays = (weekOffset = 0) => {
  const dates = [];
  let d = new Date();
  
  // Apply week offset
  d.setDate(d.getDate() + (weekOffset * 7));
  
  const dayOfWeek = d.getDay();
  // Calculate Monday of that week
  const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  let startOfWeek = new Date(d);
  startOfWeek.setDate(diff);

  for (let i = 0; i < 5; i++) {
    const current = new Date(startOfWeek);
    current.setDate(startOfWeek.getDate() + i);
    
    const dayName = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(current);
    const dayNum = current.getDate();
    const monthName = new Intl.DateTimeFormat("es-ES", { month: "short" }).format(current);
    
    dates.push({
      id: `d${i + 1}`,
      label: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      date: `${dayNum} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`,
      isPast: current < new Date(new Date().setHours(0,0,0,0))
    });
  }
  return dates;
};
const MOCK_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];

export default function ReservarPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [weekOffset, setWeekOffset] = useState(() => getInitialWeekOffset());
  const [bookedSpots, setBookedSpots] = useState<{date: string, time: string}[]>([]);
  const [formData, setFormData] = useState({
    specialty: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: ""
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Allow a 20px tolerance for fractional zoom scaling, padding bugs, and native scrollbars
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 20);
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  useEffect(() => {
    if (step === 2 && !loadingTimes) {
      // Delay to ensure the DOM is fully painted and CSS flexed before calculating widths.
      const timer = setTimeout(checkScroll, 100);
      
      // Also attach a resize listener in case screen orientation changes
      window.addEventListener('resize', checkScroll);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [step, loadingTimes]);

  useEffect(() => {
    async function fetchAvailability() {
      if (step !== 2 || !formData.specialty) return;
      
      setLoadingTimes(true);
      
      try {
        const response = await fetch(`/api/availability?specialty=${encodeURIComponent(formData.specialty)}`);
        if (response.ok) {
          const data = await response.json();
          setBookedSpots(data.bookedSpots || []);
        }
      } catch (error) {
        console.error("Error cargando disponibilidad:", error);
      } finally {
        setLoadingTimes(false);
      }
    }

    fetchAvailability();
  }, [step, formData.specialty]);

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error procesando la cita');
      }

      toast.success('¡Cita Confirmada!', {
        description: 'Hemos enviado un correo con los detalles de la reserva.'
      });
      setStep(4); // Success Step
    } catch (error: any) {
      toast.error('Error al agendar', {
        description: error.message || 'Ha ocurrido un error inesperado, por favor intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-zinc-200 bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-80 transition-opacity">
          <ChevronRight className="rotate-180 h-5 w-5" />
          <span>Inicio</span>
        </Link>
        <div className="text-sm font-bold text-zinc-400">Paso {Math.min(step, 3)} de 3</div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 py-12">
        {step < 4 ? (
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950">Pedir Cita</h1>
              <p className="text-zinc-500 font-medium text-lg">Completa estos rápidos pasos para confirmar tu visita.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-zinc-200 shadow-2xl shadow-zinc-200/50">
              
              {/* STEP 1: Specialty */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4 text-primary font-bold text-xl">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">1</div>
                    Selecciona tu especialidad
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 md:pl-14">
                    {SPECIALTIES.map((esp) => (
                      <div 
                        key={esp} 
                        onClick={() => updateForm("specialty", esp)}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all font-bold flex justify-between items-center group
                          ${formData.specialty === esp ? "border-primary bg-primary/5 text-primary" : "border-zinc-100 hover:border-primary/40 text-zinc-700"}
                        `}
                      >
                        {esp}
                        <div className={`w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center
                          ${formData.specialty === esp ? "border-primary" : "border-zinc-200 group-hover:border-primary"}
                        `}>
                          {formData.specialty === esp && <div className="w-3 h-3 bg-primary rounded-full" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-zinc-100 md:pl-14 flex justify-end">
                    <button 
                      onClick={handleNext}
                      disabled={!formData.specialty}
                      className="flex items-center justify-center rounded-xl px-10 h-14 text-base font-bold bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Siguiente <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4 text-primary font-bold text-xl">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">2</div>
                    Fecha y Hora
                  </div>
                  
                  <div className="space-y-6 md:pl-14">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Calendario Semanal</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setWeekOffset(w => w - 1)} 
                            disabled={weekOffset <= 0}
                            className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                          >
                            <ChevronLeft className="w-5 h-5"/>
                          </button>
                          <button 
                            onClick={() => setWeekOffset(w => w + 1)} 
                            className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 transition-all"
                          >
                            <ChevronRight className="w-5 h-5"/>
                          </button>
                        </div>
                      </div>
                      
                      {loadingTimes ? (
                        <div className="w-full overflow-hidden opacity-70">
                          <div className="flex gap-3 sm:gap-4 min-w-[500px] sm:min-w-[600px]">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="flex-1 flex flex-col gap-3">
                                <div className="h-16 bg-zinc-200 animate-pulse rounded-xl" />
                                <div className="flex flex-col gap-2">
                                  {[1, 2, 3, 4, 5, 6].map(j => (
                                    <div key={j} className="h-11 bg-zinc-100 animate-pulse rounded-lg" />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full max-w-full">
                          {/* Left Fade */}
                          {canScrollLeft && (
                            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity duration-300"></div>
                          )}
                          
                          {/* Right Fade */}
                          {canScrollRight && (
                            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity duration-300"></div>
                          )}
                          
                          <div 
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="w-full overflow-x-auto pb-4 snap-x relative"
                          >
                            <div className="grid grid-cols-5 gap-3 sm:gap-4 min-w-[500px] sm:min-w-[600px] px-1">
                              {getCurrentWeekDays(weekOffset).map((d) => (
                                <div key={d.id} className={`flex flex-col gap-3 snap-start relative ${d.isPast ? "opacity-50 grayscale" : ""}`}>
                                  <div className={`text-center font-bold p-3 rounded-xl border ${d.isPast ? "bg-zinc-100 border-zinc-200 text-zinc-400" : "bg-zinc-100/80 border-zinc-200 text-zinc-700"}`}>
                                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 mb-1">{d.label}</div>
                                    <div className="text-sm sm:text-base">{d.date}</div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    {MOCK_TIMES.map((t) => {
                                      const isBooked = bookedSpots.some(spot => spot.date === d.date && spot.time === t);
                                      const isSelected = formData.date === d.date && formData.time === t;
                                      
                                      return (
                                        <button
                                          key={`${d.id}-${t}`}
                                          disabled={isBooked || d.isPast}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            updateForm("date", d.date);
                                            updateForm("time", t);
                                          }}
                                          className={`
                                            py-2.5 sm:py-3 rounded-lg font-bold border-2 transition-all text-xs sm:text-sm w-full
                                            ${(isBooked || d.isPast)
                                              ? "bg-red-50/50 border-red-50 text-red-500/30 cursor-not-allowed line-through" 
                                              : isSelected
                                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                                : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-lg hover:-translate-y-0.5"
                                            }
                                          `}
                                        >
                                          {isBooked ? "Ocupado" : d.isPast ? "Pasado" : t}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-zinc-100 md:pl-14 flex justify-between items-center">
                    <button onClick={handleBack} className="text-zinc-500 font-bold hover:text-zinc-950 flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <button 
                      onClick={handleNext}
                      disabled={!formData.date || !formData.time}
                      className="flex items-center justify-center rounded-xl px-10 h-14 text-base font-bold bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Siguiente <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Personal Information */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4 text-primary font-bold text-xl">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">3</div>
                    Tus Datos
                  </div>
                  
                  <form onSubmit={handleSubmit} className="md:pl-14 space-y-6">
                    <div className="bg-zinc-50 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-zinc-100">
                      <div>
                        <p className="text-sm font-bold text-zinc-500">Resumen de la cita:</p>
                        <p className="font-bold text-zinc-950 text-lg">{formData.specialty}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-bold text-primary flex items-center sm:justify-end gap-2"><CalendarIcon className="w-4 h-4"/> {formData.date}</p>
                        <p className="font-bold text-primary flex items-center sm:justify-end gap-2"><Clock className="w-4 h-4"/> {formData.time}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-bold text-zinc-700 mb-2 block">Nombre Completo</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                            className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:bg-white transition-all font-medium" 
                            placeholder="Ej. Juan Pérez"
                          />
                        </div>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-bold text-zinc-700 mb-2 block">Teléfono</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                              required
                              type="tel" 
                              value={formData.phone}
                              onChange={(e) => updateForm("phone", e.target.value)}
                              className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:bg-white transition-all font-medium" 
                              placeholder="+34 600 000 000"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-bold text-zinc-700 mb-2 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                              required
                              type="email" 
                              value={formData.email}
                              onChange={(e) => updateForm("email", e.target.value)}
                              className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:bg-white transition-all font-medium" 
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-zinc-100 flex justify-between items-center">
                      <button type="button" onClick={handleBack} className="text-zinc-500 font-bold hover:text-zinc-950 flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Volver
                      </button>
                      <button 
                        type="submit"
                        disabled={loading || !formData.name || !formData.phone || !formData.email}
                        className="flex items-center justify-center rounded-xl px-10 h-14 text-base font-bold bg-primary text-white hover:bg-primary/90 disabled:opacity-70 transition-all shadow-xl shadow-primary/30"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Confirmar Reserva"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STEP 4: Success Message */
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-zinc-200 shadow-2xl shadow-zinc-200/50 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-500 max-w-2xl mx-auto mt-12">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-zinc-950">¡Cita Confirmada!</h2>
            <p className="text-xl text-zinc-500 font-medium leading-relaxed">
              Hola <span className="text-zinc-950 font-bold">{formData.name}</span>, hemos registrado tu cita para <strong className="text-zinc-950">{formData.specialty}</strong> el <strong>{formData.date} a las {formData.time}</strong>.
            </p>
            <div className="bg-blue-50 text-blue-800 p-6 rounded-2xl text-left w-full mt-8 border border-blue-100">
              <p className="font-bold flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5"/> En breve recibirás un WhatsApp
              </p>
              <p className="text-sm">
                En un proyecto real impulsado por n8n, este formulario acaba de disparar un webhook que te enviaría una confirmación a <strong>{formData.phone}</strong> y crearía el registro en la base de datos automáticamente.
              </p>
            </div>
            
            <div className="pt-8 w-full">
              <Link href="/" className="flex items-center justify-center rounded-xl px-10 h-14 text-base font-bold bg-zinc-950 text-white hover:bg-zinc-800 transition-all w-full">
                Volver al Inicio
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

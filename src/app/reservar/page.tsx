"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronRight, CheckCircle2, User, Phone, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SPECIALTIES = ["Medicina General", "Fisioterapia", "Psicología", "Análisis Clínicos"];
const MOCK_DATES = [
  { id: "today", label: "Hoy", date: "12 Mar" },
  { id: "tomorrow", label: "Mañana", date: "13 Mar" },
  { id: "next", label: "Jueves", date: "14 Mar" }
];
const MOCK_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];

export default function ReservarPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialty: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: ""
  });

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Placeholder Endpoint Request
    try {
      // await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network request
    } finally {
      setLoading(false);
      setStep(4); // Success Step
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
                      <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3">Días disponibles</p>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {MOCK_DATES.map((d) => (
                          <div
                            key={d.id}
                            onClick={() => updateForm("date", d.label)}
                            className={`min-w-[120px] border-2 rounded-2xl p-4 cursor-pointer transition-all text-center
                              ${formData.date === d.label ? "border-primary bg-primary text-white" : "border-zinc-100 hover:border-primary/40 text-zinc-700"}
                            `}
                          >
                            <p className="font-bold">{d.label}</p>
                            <p className={`text-sm ${formData.date === d.label ? "text-white/80" : "text-zinc-500"}`}>{d.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.date && (
                      <div className="animate-in fade-in duration-300">
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3">Horas libres</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {MOCK_TIMES.map((t) => (
                            <div
                              key={t}
                              onClick={() => updateForm("time", t)}
                              className={`border-2 rounded-xl py-3 cursor-pointer transition-all text-center font-bold
                                ${formData.time === t ? "border-primary/20 bg-primary/10 text-primary" : "border-zinc-100 hover:border-primary/40 text-zinc-600"}
                              `}
                            >
                              {t}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

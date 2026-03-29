"use client";
import { useState, useEffect } from 'react';
import { 
  Activity, Users, Calendar as CalendarIcon, ArrowUpRight, 
  Search, ShieldAlert, CheckCircle2, MessageSquare, Database, 
  Server, Smartphone, Mail, XCircle, RotateCw, Globe,
  LayoutList, CalendarDays, UserSquare2
} from 'lucide-react';
import { toast } from 'sonner';

// Types
type Stats = {
  appointments: number;
  patients: number;
  topSpecialty: string;
  reviews: { averageRating: string; totalCount: number; breakdown: any[] };
};

type Appointment = {
  id: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  user: { name: string; phone: string; email: string; };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('Todas');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'patients'>('list');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resStats, resApps] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/appointments')
      ]);
      const dataStats = await resStats.json();
      const dataApps = await resApps.json();
      
      setStats(dataStats);
      setAppointments(dataApps.appointments || []);
    } catch (e) {
      toast.error("Error al conectar con la Base de Datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelClick = async (id: string) => {
    if (!confirm("¿Seguro que deseas cancelar esta cita?")) return;

    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'CANCEL' })
      });
      if (!res.ok) throw new Error();
      
      toast.success("Cita cancelada", { description: "El hueco ha vuelto a estar disponible." });
      fetchData(); // Recargar datos
    } catch (e) {
      toast.error("Error al cancelar");
    }
  };

  const uniqueSpecialties = ['Todas', ...Array.from(new Set(appointments.map(a => a.specialty)))];

  const filteredApps = appointments.filter(a => {
    const matchSearch = a.user.name.toLowerCase().includes(search.toLowerCase()) ||
                        a.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = filterSpecialty === 'Todas' || a.specialty === filterSpecialty;
    return matchSearch && matchSpecialty;
  });

  // Derived data
  const MOCK_DATES = ["11 Mar", "12 Mar", "13 Mar", "14 Mar", "15 Mar"];
  const MOCK_TIMES = ["09:00", "10:30", "12:00", "16:00", "17:30", "18:45"];

  const getAppointmentsForSlot = (d: string, t: string) => {
    return filteredApps.filter(a => a.date === d && a.time === t);
  };

  const uniquePatients = Array.from(new Set(filteredApps.map(a => a.user.email)))
    .map(email => filteredApps.find(a => a.user.email === email)?.user!);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-zinc-950/60 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-primary transition-colors">
          <Activity className="h-6 w-6 text-primary" />
          <span>SmartClinic <span className="text-zinc-500 font-normal">| Admin Portal</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">SC</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 py-8 space-y-12">
        {/* STATS SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-zinc-400 mt-1">Conectado a SQLite / Prisma (Local). Futuro Supabase.</p>
            </div>
            {loading && <div className="text-primary font-bold flex items-center gap-2"><RotateCw className="w-4 h-4 animate-spin"/> Sincronizando BD...</div>}
          </div>

          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform group-hover:scale-150" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/20 text-primary rounded-xl"><CalendarIcon className="w-5 h-5"/></div>
              </div>
              <p className="text-zinc-400 text-sm font-medium">Citas Activas</p>
              <p className="text-4xl font-black text-white">{stats?.appointments || 0}</p>
            </div>
            
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform group-hover:scale-150" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Users className="w-5 h-5"/></div>
              </div>
              <p className="text-zinc-400 text-sm font-medium">Pacientes Únicos</p>
              <p className="text-4xl font-black text-white">{stats?.patients || 0}</p>
            </div>
            
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform group-hover:scale-150" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><Activity className="w-5 h-5"/></div>
              </div>
              <p className="text-zinc-400 text-sm font-medium">Especialidad Top</p>
              <p className="text-2xl font-black text-white truncate" title={stats?.topSpecialty}>{stats?.topSpecialty || "N/A"}</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform group-hover:scale-150" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-xl"><MessageSquare className="w-5 h-5"/></div>
              </div>
              <p className="text-zinc-400 text-sm font-medium flex justify-between">
                <span>Rating Promedio</span>
                <span className="text-yellow-400 font-bold">{stats?.reviews?.averageRating || "N/A"} ★</span>
              </p>
              <p className="text-2xl font-black text-white">{stats?.reviews?.totalCount || 0} reviews</p>
            </div>
          </div>
        </section>

        {/* INTEGRACIONES LAUNCHPAD */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
            <Globe className="w-5 h-5 text-zinc-400" /> Ecosistema Tecnológico
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2">
            {[
              { id: 1, name: "Supabase", icon: Database, color: "text-emerald-400", bg: "bg-emerald-400/10 hover:bg-emerald-400/20", borderColor: "border-emerald-400/20" },
              { id: 2, name: "Vercel", icon: Server, color: "text-white", bg: "bg-white/5 hover:bg-white/10", borderColor: "border-white/10" },
              { id: 3, name: "WhatsApp & Twilio", icon: Smartphone, color: "text-green-400", bg: "bg-green-400/10 hover:bg-green-400/20", borderColor: "border-green-400/20" },
              { id: 4, name: "Resend", icon: Mail, color: "text-red-400", bg: "bg-red-400/10 hover:bg-red-400/20", borderColor: "border-red-400/20" },
              { id: 5, name: "n8n (Webhooks)", icon: RotateCw, color: "text-rose-400", bg: "bg-rose-400/10 hover:bg-rose-400/20", borderColor: "border-rose-400/20" },
              { id: 6, name: "Next.js", icon: Globe, color: "text-zinc-300", bg: "bg-zinc-800 hover:bg-zinc-700", borderColor: "border-zinc-700" },
            ].map(i => (
              <a key={i.id} href="#" className={`p-4 border rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${i.bg} ${i.borderColor}`}>
                <i.icon className={`w-8 h-8 ${i.color}`} />
                <span className="text-xs font-bold text-zinc-300">{i.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* GESTIÓN DE CITAS */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-zinc-400" /> Registro de Citas e Hiper-automatización
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 bg-zinc-900 border border-white/10 p-2 rounded-xl">
            <div className="flex bg-zinc-950 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <LayoutList className="w-4 h-4" /> Lista
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-all ${viewMode === 'calendar' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <CalendarDays className="w-4 h-4" /> Calendario
              </button>
              <button 
                onClick={() => setViewMode('patients')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-all ${viewMode === 'patients' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <UserSquare2 className="w-4 h-4" /> Pacientes
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-primary transition-all text-white placeholder-zinc-600"
                />
              </div>
              
              <div className="flex gap-2">
                {uniqueSpecialties.map(spec => (
                  <button
                    key={spec}
                    onClick={() => setFilterSpecialty(spec)}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                      filterSpecialty === spec 
                      ? 'bg-primary/20 border-primary/50 text-primary' 
                      : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {viewMode === 'list' && (
              <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-950/50 text-zinc-400 font-medium">
                  <tr>
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Dato Contacto</th>
                    <th className="px-6 py-4">Consulta</th>
                    <th className="px-6 py-4">Webhook (n8n/Resend)</th>
                    <th className="px-6 py-4 text-right">Acciones (Mock)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && filteredApps.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-zinc-500">Cargando base de datos mock...</td></tr>
                  ) : filteredApps.length === 0 ? (
                    <tr><td colSpan={5} className="p-8 text-center text-zinc-500">No hay citas registradas. Usa el simulador en frontend o el script de comando para generar.</td></tr>
                  ) : (
                    filteredApps.map(app => {
                      const isCancelled = app.status === 'CANCELLED';
                      return (
                        <tr key={app.id} className={`transition-all hover:bg-white/[0.02] ${isCancelled ? 'opacity-40' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="font-bold text-white flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isCancelled ? 'bg-red-500' : 'bg-green-500'} shadow-[0_0_10px_currentColor]`} />
                              {app.user.name}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">ID: {app.id.substring(app.id.length - 8)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-zinc-300">{app.user.phone}</div>
                            <div className="text-xs text-zinc-500">{app.user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-primary bg-primary/10 inline-block px-2 py-1 rounded text-xs">{app.specialty}</div>
                            <div className="text-zinc-400 font-medium mt-1">{app.date} - {app.time}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1.5">
                              {isCancelled ? (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-red-400"><XCircle className="w-3.5 h-3.5"/> Cancelación enviada</span>
                              ) : (
                                <>
                                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5"/> Confirmación email ok</span>
                                  <span className="flex items-center gap-1.5 text-xs font-bold text-green-400"><CheckCircle2 className="w-3.5 h-3.5"/> Recordatorio WA (Pend.)</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                disabled={isCancelled}
                                onClick={() => handleCancelClick(app.id)}
                                className="px-3 py-1.5 text-xs font-bold bg-zinc-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Cancelar
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
            )}

            {viewMode === 'calendar' && (
              <div className="p-6 overflow-x-auto min-h-[400px]">
                <div className="grid grid-cols-5 gap-4 min-w-[800px]">
                  {MOCK_DATES.map((d) => (
                    <div key={d} className="flex flex-col gap-3">
                      <div className="text-center font-bold text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-white/5">
                        {d}
                      </div>
                      <div className="flex flex-col gap-2">
                        {MOCK_TIMES.map((t) => {
                          const slotApps = getAppointmentsForSlot(d, t);
                          return (
                            <div key={`${d}-${t}`} className="min-h-[80px] p-2 bg-zinc-950/50 border border-white/5 rounded-lg flex flex-col gap-1">
                              <span className="text-xs text-zinc-600 font-bold mb-1">{t}</span>
                              {slotApps.length === 0 ? (
                                <span className="text-[10px] text-zinc-700 italic">Libre</span>
                              ) : (
                                slotApps.map(app => (
                                  <div 
                                    key={app.id} 
                                    className={`text-[10px] p-1.5 rounded truncate border ${
                                      app.status === 'CANCELLED' 
                                      ? 'bg-red-500/10 text-red-400 border-red-500/20 line-through' 
                                      : 'bg-primary/20 text-blue-200 border-primary/30'
                                    }`}
                                    title={`${app.user.name} - ${app.specialty}`}
                                  >
                                    <div className="font-bold">{app.user.name.split(' ')[0]}</div>
                                    <div className="opacity-70">{app.specialty}</div>
                                  </div>
                                ))
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'patients' && (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[400px]">
                {uniquePatients.length === 0 ? (
                   <div className="col-span-full py-12 text-center text-zinc-500">No hay pacientes coincidiendo con la búsqueda.</div>
                ) : (
                  uniquePatients.map(user => {
                    const userApps = filteredApps.filter(a => a.user.email === user.email);
                    const cancelledCount = userApps.filter(a => a.status === 'CANCELLED').length;
                    
                    return (
                      <div key={user.email} className="bg-zinc-950 border border-white/5 rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white">{user.name}</div>
                              <div className="text-xs text-zinc-500">{user.email}</div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-white/5 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Teléfono</span>
                            <span className="text-zinc-300 font-medium">{user.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Total Citas</span>
                            <span className="font-bold text-white">{userApps.length}</span>
                          </div>
                          {cancelledCount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Canceladas</span>
                              <span className="font-bold text-red-400">{cancelledCount}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
            
          </div>
        </section>
      </main>
    </div>
  );
}

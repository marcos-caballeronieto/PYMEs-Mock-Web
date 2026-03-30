# Roadmap Detallado: SmartClinic OS & n8n Ecosystem

Este documento desglosa las fases de desarrollo para la plataforma **SmartClinic OS** y la integración de automatizaciones para PYMEs mediante WhatsApp y n8n.

---

## 🟢 Fase 1: Setup, Boilerplate y Core Frontend (En Proceso)
*   [x] Inicialización de Next.js 14+ con App Router.
*   [x] Configuración de Tailwind CSS y Shadcn UI.
*   [x] Conexión inicial con Supabase (Variables de entorno configuradas).
*   [x] Estructura de carpetas según el Master Plan.
*   [x] Diseño de la Landing Page principal (Hero, Servicios, CTA).

## 🟡 Fase 2: Motor de Datos y Autenticación (Supabase y Auth Real)
*   [x] Motor Base de Datos Provisional (Prisma + SQLite implementado).
*   [x] Migración del esquema a Supabase (Tablas: `clinics`, `patients`, `appointments`).
*   [x] Configuración de Row Level Security (RLS) para proteger los datos médicos (Script generado).
*   [x] Sistema de log-in para clientes con correo electrónico y contraseña (Implementado).
*   [x] Flujo de autenticación para administradores (/admin) vía Supabase Auth.
*   [x] Middleware de protección de rutas.

## 🔴 Fase 3: Integración WhatsApp API y Bot de Reservas (IA Agente)
*   [ ] **Setup de WhatsApp Business API:** Configuración del proveedor (Twilio/Meta).
*   [ ] **Booking Bot (Conversacional con IA):** 
    *   Integración de GPT-4o-mini para el triaje de síntomas vía mensajes de texto.
    *   Bot determinista que ofrece slots basados en la disponibilidad real de la clínica.
    *   Confirmación y envío de notificaciones de reserva (Template Messages).
*   [ ] **Webhook Handler:** Endpoint en Next.js para recibir mensajes entrantes de WhatsApp.

## 🔴 Fase 4: Ecosistema n8n para PYMEs (Ejemplos Prácticos)
*   [ ] **Workflow 1: Captación y Cualificación de Leads:**
    *   Entrada: Formulario web o mensaje de WhatsApp.
    *   Procesamiento: n8n filtra por urgencia y guarda en un CRM/Google Sheets.
    *   Salida: Alerta a Telegram para la recepción de la clínica.
*   [x] **Workflow 2: Recordatorios de Cita Inteligentes:**
    *   Ejecución programada (Cron) que consulta en Supabase las citas de mañana.
    *   Envío masivo personalizado por WhatsApp con opción de confirmación rápida por botón.
*   [x] **Workflow 3: Dashboard Semanal de Rendimiento:**
    *   Generación de reportes PDF basados en estadísticas de ocupación y leads convertidos.

## 🟡 Fase 4: Portal Administrativo Básico (Mock B2B Creado)
*   [x] Panel de Login (Mock) para mostrar intencionalidad de seguridad.
*   [x] Dashboard con métricas clave y enlace a integraciones.
*   [x] Visualización de lista de citas en Dashboard.
*   [ ] Gestión y modificación de citas integrada localmente.
*   [ ] Exportación de datos a Google Sheets/CSV.
*   [ ] Integrar enlaces funcionales a las plataformas mostradas en el apartado "Ecosistema Tecnológico" del dashboard.

## 🔴 Fase 5: Dashboard Administrativo y Refinamiento (UX/UI)
*   [ ] Panel de gestión de médicos y horarios.
*   [ ] Vista de triaje priorizado: El bot marca cuáles son las citas urgentes.
*   [ ] Optimización SEO avanzada (Open Graph, Meta Tags dinámicos).
*   [ ] Pruebas de carga y seguridad (Simulación masiva de reservas).

---

## 🚀 Hitos Clave (Milestones)

1.  **M1 (MVP):** Un paciente puede reservar una cita desde la web y se bloquea el slot en la BD.
2.  **M2 (Integración):** El bot de WhatsApp extrae síntomas y sugiere el especialista adecuado.
3.  **M3 (Ecosistema):** Dashboards operativos con n8n enviando estados semanales a la directiva.
4.  **M4 (Lanzamiento):** Despliegue en producción con Vercel y Supabase.

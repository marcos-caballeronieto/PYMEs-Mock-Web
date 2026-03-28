# SMARTCLINIC_OS - Master Plan

## 1. Visión y Alcance
**Elevator Pitch:** Plataforma B2B multi-tenant (MVP inicial single-tenant) para clínicas de salud que combina captación de leads mediante interfaces optimizadas, triaje de pacientes asistido por IA determinista y gestión automatizada de reservas con bloqueo de concurrencia.

**Usuarios Objetivo:** 1. Pacientes (End-users): Interfaz pública (Landing + Widget de reserva).
2. Administradores/Recepcionistas (Admins): Dashboard privado para gestión de agenda y leads.

**Core Features (MVP):**
1. Landing page estática de alta conversión (Next.js).
2. Widget de captación y reserva híbrido (Triaje NLP -> Flujo determinista de UI).
3. Sistema de bloqueo temporal de *slots* (solución al *Double Booking*).
4. Dashboard administrativo con autenticación basada en roles (RBAC).
5. Sistema de notificaciones asíncronas vía Webhooks (orquestado por n8n).

---

## 2. Stack Tecnológico "Congelado"

**Frontend:** * Framework: Next.js 14+ (App Router).
* UI Library: Tailwind CSS + Shadcn UI (Radix primitives).
* State Management: React Context (Zustand solo si la complejidad del widget de reserva escala).

**Backend:** * Lenguaje/Framework: TypeScript / Next.js Server Actions (Edge/Node runtimes).
* Capa API IA: OpenAI API (modelo `gpt-4o-mini` configurado con `response_format: { type: "json_object" }`).

**Base de Datos:** * Motor: PostgreSQL 15+ (Hosteado en Supabase para robustez, escalabilidad y cumplimiento normativo mediante RLS).
* ORM/Cliente: Supabase Client (`@supabase/supabase-js`).

**Infraestructura/DevOps:** * Frontend/Backend Edge: Vercel.
* Orquestación de Workflows: Servidor n8n autoalojado en VPS (Ubuntu/Docker).

**Servicios Externos (Build vs Buy - REGLA DE ORO):**
* **[BUY] Autenticación:** Supabase Auth (Cero desarrollo de tokens JWT o sesiones manuales).
* **[BUY] Motor de Calendario:** Google Calendar API o Cal.com API para calcular la disponibilidad subyacente de los sanitarios.
* **[BUY] IA de Inferencia:** OpenAI API. NO entrenar modelos propios para extraer sintomatología.
* **[BUILD] Lógica de UI del Chatbot:** Construir la interfaz conversacional en Next.js. El bot NO debe ser generativo en la propuesta de horas; debe ser un script de UI basado en la respuesta JSON estructurada de la IA.
* **[BUILD] Orquestador de Alertas:** n8n (Conectores a WhatsApp Business API y Telegram).

---

## 3. Arquitectura del Proyecto

**Estructura de Directorios Propuesta:**
```text
smartclinic_os/
├── src/
│   ├── app/
│   │   ├── (public)/          # Landing, Booking Widget
│   │   ├── (admin)/           # Dashboard, Auth Protected Routes
│   │   ├── api/               # Webhook receivers & External callbacks
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                # Shadcn primitives (buttons, dialogs)
│   │   └── features/          # BookingFlow, PatientList, ChatWidget
│   ├── lib/
│   │   ├── supabase/          # Supabase client config & server clients
│   │   ├── ai/                # Prompts y llamadas a OpenAI
│   │   └── utils.ts           # Tailwind merge, formatting helpers
│   ├── types/                 # TypeScript interfaces & DB definitions
│   └── actions/               # Next.js Server Actions (Mutations)
├── public/                    # Assets estáticos
├── middleware.ts              # Route protection (Supabase Auth)
├── tailwind.config.ts
└── package.json

**Flujo de Datos:**
1. **Frontend (Client):** El usuario interactúa. Las consultas de lectura van directamente a Supabase (vía cliente autenticado o anónimo con políticas RLS).
2. **Mutaciones (Server Actions):** Las escrituras (ej. crear reserva) llaman a una Server Action.
3. **Resolución de IA:** La Server Action envía el texto a OpenAI, recibe un JSON (ej. `{"intent": "book", "urgency": "high", "department": "physio"}`), y ejecuta la lógica de negocio.
4. **Persistencia (DB):** Se ejecuta la transacción en PostgreSQL (ej. inserción en `appointments` con estado `pending_lock`).
5. **Asincronía (n8n):** Un *Database Webhook* en Supabase (o un fetch post-mutación en Next.js) dispara un payload hacia el VPS de n8n para enviar el mensaje de WhatsApp.

---

## 4. Diseño de Datos (Schema DB)

PostgreSQL (Esquema simplificado para el MVP):

* **Tabla `clinics`** (Preparado para multi-tenant real)
  * `id` (UUID, PK)
  * `name` (String)
  * `timezone` (String)

* **Tabla `patients`**
  * `id` (UUID, PK)
  * `clinic_id` (UUID, FK)
  * `full_name` (String)
  * `phone` (String, Unique per clinic)
  * `email` (String, Optional)
  * `created_at` (Timestamp)

* **Tabla `appointments`** (Gestión de Concurrencia Crítica)
  * `id` (UUID, PK)
  * `patient_id` (UUID, FK)
  * `clinic_id` (UUID, FK)
  * `start_time` (TimestampTZ)
  * `end_time` (TimestampTZ)
  * `status` (Enum: `pending_lock`, `confirmed`, `cancelled`, `completed`)
  * `locked_until` (TimestampTZ) -> **Solución Concurrencia**: Si un paciente selecciona una hora, `status=pending_lock` y `locked_until = NOW() + 5 minutes`. Otras consultas ignorarán este slot hasta que expire o se confirme.
  * `ai_summary` (Text, Optional) -> Resumen del síntoma extraído.

---

## 5. Reglas de Desarrollo (AI Agent Rules)

1. **Iteración Supervisada (MVP First):** La IA generará el código en incrementos atómicos. No intentar construir el dashboard y el frontend público en el mismo *prompt*. Empezar siempre por el modelo de datos.
2. **Anti-Alucinación (Bot Restringido):** La IA conversacional ESTÁ PROHIBIDA para emitir respuestas de texto libre al usuario en el flujo de reserva. El *prompt* a la LLM será exclusivamente de extracción de entidades. El frontend renderizará botones deterministas basados en esas entidades.
3. **Estricto TypeScript:** Todas las interfaces de base de datos deben estar tipadas. Usar `supabase gen types` para mantener la sincronización entre BD y cliente. Se utilizará `camelCase` para variables en TS y `snake_case` para columnas en DB.
4. **Manejo de Errores:** En las Server Actions, todo bloque lógico debe ir envuelto en `try/catch`. Los errores deben devolver un objeto `{ error: string, status: number }` predecible, nunca "explotar" silenciosamente.
5. **Seguridad (RLS):** Toda tabla en Supabase debe tener *Row Level Security* activada desde el inicio. El agente debe generar las políticas SQL correspondientes.

---

## 6. Integraciones y Flujos (n8n/Webhooks)

El servidor n8n actuará como nuestro bus de eventos asíncronos para evitar bloquear el *thread* principal de Next.js.

* **Webhook 1: `POST /webhook/new-lead`**
  * **Trigger:** Disparado desde Next.js tras guardar un paciente nuevo en BD.
  * **Payload:** `{ "patient_id": "uuid", "name": "string", "phone": "string", "ai_summary": "string" }`
  * **Flujo n8n:** Inserta *row* en Google Sheets (Backup para el *mock*) -> Envía alerta a Telegram de la clínica.

* **Webhook 2: `POST /webhook/appointment-status`**
  * **Trigger:** Disparado cuando el `status` de un `appointment` pasa a `confirmed`.
  * **Payload:** `{ "appointment_id": "uuid", "patient_phone": "string", "time": "iso_string" }`
  * **Flujo n8n:** Llama a la API de WhatsApp para enviar plantilla de confirmación al paciente.

---

## 7. Roadmap de Implementación (Paso a Paso)

* **Fase 1: Setup y Boilerplate**
  * Inicialización de Next.js App Router.
  * Configuración de Tailwind CSS y Shadcn UI.
  * Creación del proyecto en Supabase y variables de entorno.

* **Fase 2: Base de Datos y Autenticación**
  * Despliegue del *schema* SQL (Tablas `clinics`, `patients`, `appointments`).
  * Configuración de Supabase Auth para la ruta `/admin`.
  * Implementación de políticas RLS.

* **Fase 3: Core Feature A (Landing y Captación Simple)**
  * Creación de la UI pública (Hero, Servicios, Prueba Social).
  * Implementación del formulario estático de captación.
  * Server Action para persistir datos en `patients` y disparo del Webhook de n8n.

* **Fase 4: Core Feature B (El Motor de Reservas y Triaje)**
  * Implementación del *endpoint* de OpenAI (Extracción de JSON).
  * Lógica de bloqueo de *slots* (`locked_until` y `status`).
  * UI del widget de reserva (Selección de fecha/hora determinista).

* **Fase 5: Integración WhatsApp y Bots (IA Conversacional)**
  * Configuración de WhatsApp Business API (Twilio/Meta).
  * Desarrollo del bot de triaje interactivo para captación directa por chat.
  * Flujo de reserva íntegro desde WhatsApp (Menús interactivos y confirmación).

* **Fase 6: Ecosistema n8n para PYMEs (Herramientas de Ejemplo)**
  * Workflow de captación y cualificación de leads multicanal.
  * Automatización de recordatorios de citas con botones de acción rápida.
  * Generación de reportes semanales automáticos vía email/PDF.

* **Fase 7: Dashboard Administrativo y Refinamiento (UI/UX)**
  * Rutas protegidas `/admin`.
  * Tabla de visualización de `appointments` y vista del día (Calendario).
  * Optimización de SEO y performance para el lanzamiento del MVP.
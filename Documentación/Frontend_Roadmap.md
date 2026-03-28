# Frontend Roadmap - SmartClinic OS

Este documento desglosa el plan de acción específico para completar todas las vistas, flujos de usuario y rutas del Frontend, asegurando que la estructura base de SmartClinic OS sea 100% navegable.

## Fase 1: Interacciones en la Landing Page
- [ ] **Tarjetas de Especialidades Dinámicas:** 
  - Modificar las tarjetas actuales para que, al hacer *hover*, un overlay (o transición suave) muestre información extra sobre los tratamientos.
  - Añadir un botón interactivo de "Pedir Cita" dentro de cada tarjeta apuntando a la especialidad elegida.
- [ ] **Botones del Header y Hero:**
  - "Pedir Cita" / "Reservar Ahora": Conectar a la nueva página de reservas (`/reservar`).
  - "Portal Admin": Conectar a la ruta de inicio de sesión (`/admin`).
- [ ] **Botones B2B y Footer:**
  - Enlazar "Más Información B2B" y "Agendar Consulta" a modales mock, "mailto:" o formularios de contacto corporativos.
  - Configurar hipervínculos funcionales en el Footer (Nosotros, Tecnología, Privacidad, Cookies).

## Fase 2: Flujo de "Pedir Cita" (Booking Flow)
- [ ] **Crear ruta `/reservar`:**
  - Desarrollar un formulario rápido y visualmente limpio estilo *Step-by-Step* (paso a paso).
  - **Paso 1:** Seleccionar especialidad (viniendo de la Home o escogida a mano).
  - **Paso 2:** Selección de día/hora de demo (con un componente visual de calendario).
  - **Paso 3:** Recolección de datos y confirmación (que luego conectaremos a n8n y Base de datos).

## Fase 3: Páginas Secundarias y de Apoyo
- [ ] **Página "Más Información" (`/nosotros` o `/info`):**
  - Desarrollar una página estática rápida pero profesional sobre el "equipo médico".
  - Incluir el valor añadido de nuestra tecnología para los pacientes. No requiere mucha complejidad arquitectónica, priorizar diseño limpio basado en el Home.

## Fase 4: Portal Administrativo Mock (`/admin`)
- [ ] **Login Administrativo (`/admin`):**
  - Crear pantalla de autenticación minimalista para el equipo de doctores/ventas (preparado para integrar con Supabase Auth).
- [ ] **Dashboard Principal (`/admin/dashboard`):**
  - Paneles de control para ver las "Citas del Día".
  - Tabla de pacientes ficticios.
  - Interfaz gráfica (estadísticas) de conversiones de leads B2B.

## Fase 5: Refinamientos Finales
- [ ] Agregar estados de "Carga" (*Loading Skeletons*) entre rutas.
- [ ] Revisión exhaustiva del *Responsive Design* (Móviles y Tablets) de las nuevas páginas creadas.
- [ ] Componentizar mejor los botones y formularios compartidos (*Reusability*).

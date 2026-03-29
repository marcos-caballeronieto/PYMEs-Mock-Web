# Requisitos y Versiones del Ecosistema de Base de Datos Local

Para asegurar la máxima compatibilidad y evitar problemas con versiones dinámicas, se han instalado los siguientes paquetes como base para el ORM local:

### Entorno y Dependencias
- **Motor de Base de Datos:** SQLite (`dev.db`)
- **Herramienta ORM:** Prisma ORM
- **Versión de Prisma y Prisma Client:** `^6.4.1`

### Scripts y Herramientas Necesarias (Backend Mocking)
Para ejecutar `scripts/mock-db.ts` de forma independiente a React/Next.js (y poder generar el falso llenado de citas), se requiere un ejecutor de TypeScript.
- **Recomendado:** `tsx`
- **Comando de instalación global (si fuera necesario):** `npm install -g tsx` o usar `npx tsx scripts/...`

### Flujo de Trabajo
Cada vez que se edite `prisma/schema.prisma` (por ejemplo, para añadir la tabla de Doctores más adelante), deberás re-sincronizar la base de SQLite y regenarar el Type Safety en Node con:
```bash
npx prisma db push
```

### Notas sobre el futuro salto a Supabase
El único cambio necesario cuando abandonemos el SQLite mock será:
1. En `/prisma/schema.prisma` cambiar `provider = "sqlite"` por `provider = "postgresql"`.
2. Actualizar el `url` del connection-string en el `.env` (apuntando al servidor de tu proyecto de Supabase en vez de `file:./dev.db`).
3. Ejecutar `npx prisma db push` para subir la información estructurada a Supabase remota.

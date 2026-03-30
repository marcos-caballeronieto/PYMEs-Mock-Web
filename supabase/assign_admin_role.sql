-- ============================================================
-- PASO ÚNICO: Asignar rol 'admin' a la cuenta de administrador
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Asignar rol admin al usuario por email (Usando el nombre de columna real en Postgres)
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'marcos.caballeronieto@gmail.com';

-- 2. Verificar que se ha aplicado correctamente
SELECT id, email, raw_app_meta_data
FROM auth.users
WHERE email = 'marcos.caballeronieto@gmail.com';

-- ============================================================
-- IMPORTANTE: Después de ejecutar este SQL, el usuario debe
-- cerrar sesión y volver a iniciar sesión para que el JWT
-- incluya el nuevo app_metadata con el rol admin.
-- ============================================================

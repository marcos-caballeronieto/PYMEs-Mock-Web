-- Función para sincronizar nuevos usuarios de Auth a la tabla pública "User"
-- Se ha actualizado para separar "firstName" y "lastName"
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."User" (id, email, "firstName", "lastName", phone, "updatedAt")
  VALUES (
    new.id::text, 
    new.email, 
    COALESCE(new.raw_user_metadata->>'first_name', ''), 
    COALESCE(new.raw_user_metadata->>'last_name', ''), 
    COALESCE(new.raw_user_metadata->>'phone', ''),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que se dispara después de un INSERT en auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

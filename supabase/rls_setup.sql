-- smartclinic-os RLS Policies Setup
-- Enable Row Level Security
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------------------------------
-- POLICIES FOR "User" TABLE
--------------------------------------------------------------------------------

-- 1. Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON "User" 
FOR SELECT 
TO authenticated 
USING (auth.uid()::text = id);

-- 2. Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON "User" 
FOR UPDATE 
TO authenticated 
USING (auth.uid()::text = id)
WITH CHECK (auth.uid()::text = id);

-- 3. Admins have full access to User table
CREATE POLICY "Admins have full access to User" 
ON "User" 
FOR ALL 
TO authenticated 
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');


--------------------------------------------------------------------------------
-- POLICIES FOR "Appointment" TABLE
--------------------------------------------------------------------------------

-- 1. Users can view their own appointments
CREATE POLICY "Users can view their own appointments" 
ON "Appointment" 
FOR SELECT 
TO authenticated 
USING (auth.uid()::text = "userId");

-- 2. Users can create their own appointments
CREATE POLICY "Users can create their own appointments" 
ON "Appointment" 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid()::text = "userId");

-- 3. Users can update their own appointments (e.g. cancel)
CREATE POLICY "Users can update their own appointments" 
ON "Appointment" 
FOR UPDATE 
TO authenticated 
USING (auth.uid()::text = "userId")
WITH CHECK (auth.uid()::text = "userId");

-- 4. Admins have full access to Appointment table
CREATE POLICY "Admins have full access to Appointment" 
ON "Appointment" 
FOR ALL 
TO authenticated 
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

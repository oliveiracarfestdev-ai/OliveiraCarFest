-- Migration para a tabela de Inscrição de Expositores (Exhibitor Leads)

CREATE TABLE public.exhibitor_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    car_model TEXT NOT NULL,
    car_year TEXT NOT NULL,
    modifications TEXT NOT NULL,
    instagram TEXT NOT NULL,
    status TEXT DEFAULT 'pendente' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.exhibitor_leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can insert an exhibitor lead
CREATE POLICY "Allow public insert on exhibitor_leads" 
ON public.exhibitor_leads FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy 2: Only authenticated users (admins) can view
CREATE POLICY "Allow authenticated users to select exhibitor_leads" 
ON public.exhibitor_leads FOR SELECT 
TO authenticated 
USING (true);

-- Policy 3: Only authenticated users (admins) can update
CREATE POLICY "Allow authenticated users to update exhibitor_leads" 
ON public.exhibitor_leads FOR UPDATE 
TO authenticated 
USING (true);

-- Policy 4: Only authenticated users (admins) can delete
CREATE POLICY "Allow authenticated users to delete exhibitor_leads" 
ON public.exhibitor_leads FOR DELETE 
TO authenticated 
USING (true);

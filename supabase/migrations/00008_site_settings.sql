CREATE TABLE IF NOT EXISTS public.site_settings (
    id integer PRIMARY KEY DEFAULT 1,
    exclusive_cars_count integer NOT NULL DEFAULT 0,
    official_partners_count integer NOT NULL DEFAULT 0,
    updated_at timestamp with time zone DEFAULT now()
);

-- Assegurar que só existe 1 registro
ALTER TABLE public.site_settings ADD CONSTRAINT site_settings_id_check CHECK (id = 1);

-- Inserir o registro inicial se não existir
INSERT INTO public.site_settings (id, exclusive_cars_count, official_partners_count) 
VALUES (1, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- Habilitar RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Permitir leitura pública em site_settings" 
ON public.site_settings FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Permitir admin atualizar site_settings"
ON public.site_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

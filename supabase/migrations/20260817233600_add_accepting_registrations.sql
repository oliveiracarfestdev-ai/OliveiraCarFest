-- Adiciona a coluna accepting_registrations na tabela events com um valor padrão de true
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS accepting_registrations BOOLEAN DEFAULT true;

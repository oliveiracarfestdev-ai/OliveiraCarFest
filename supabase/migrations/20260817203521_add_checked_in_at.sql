-- Adicionar coluna de checkin
ALTER TABLE public.exhibitor_leads
ADD COLUMN checked_in_at TIMESTAMPTZ DEFAULT NULL;

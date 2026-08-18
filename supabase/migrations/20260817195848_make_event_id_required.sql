-- Tornar a coluna event_id obrigatória (NOT NULL)
ALTER TABLE public.exhibitor_leads
ALTER COLUMN event_id SET NOT NULL;

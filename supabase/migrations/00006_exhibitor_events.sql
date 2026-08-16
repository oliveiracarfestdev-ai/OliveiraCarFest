-- 1. Adicionar coluna event_id na tabela exhibitor_leads
ALTER TABLE public.exhibitor_leads
ADD COLUMN event_id UUID REFERENCES public.events(id) ON DELETE CASCADE;

-- Criar um index para otimizar buscas por evento
CREATE INDEX idx_exhibitor_leads_event_id ON public.exhibitor_leads(event_id);

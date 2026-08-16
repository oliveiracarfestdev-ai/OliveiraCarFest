-- Migration para adicionar opções de doação (Acesso Solidário)

-- 1. Adicionar coluna donation_items na tabela events
ALTER TABLE public.events
ADD COLUMN donation_items TEXT;

-- 2. Adicionar coluna donation_choice na tabela exhibitor_leads
ALTER TABLE public.exhibitor_leads
ADD COLUMN donation_choice TEXT;

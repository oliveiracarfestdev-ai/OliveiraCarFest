-- 1. Adicionar coluna category na tabela events
ALTER TABLE public.events
ADD COLUMN category TEXT DEFAULT 'Encontro';

-- 2. Adicionar coluna category na tabela albums
ALTER TABLE public.albums
ADD COLUMN category TEXT DEFAULT 'Todos';

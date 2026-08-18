-- Adiciona a coluna max_exhibitors na tabela events com um valor padrão de 50
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS max_exhibitors INTEGER DEFAULT 50;

-- Atualiza os mock events com capacidades maiores para teste
UPDATE public.events SET max_exhibitors = 100 WHERE title = 'Night Runners SP';
UPDATE public.events SET max_exhibitors = 200 WHERE title = 'Expo Clássicos Guarulhos';

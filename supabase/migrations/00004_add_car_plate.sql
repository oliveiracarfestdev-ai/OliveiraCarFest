-- Migration para adicionar a placa do carro (login token) na tabela de expositores

ALTER TABLE public.exhibitor_leads 
ADD COLUMN car_plate TEXT NOT NULL DEFAULT '';

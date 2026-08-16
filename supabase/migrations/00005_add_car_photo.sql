-- 1. Adicionar coluna car_photo_url na tabela exhibitor_leads
ALTER TABLE public.exhibitor_leads
ADD COLUMN car_photo_url TEXT;

-- 2. Criar Bucket para fotos de carros de expositores
INSERT INTO storage.buckets (id, name, public) VALUES ('exhibitor-cars', 'exhibitor-cars', true) ON CONFLICT DO NOTHING;

-- 3. Políticas de Segurança do Storage (RLS para o Bucket)

-- Permitir leitura pública das fotos dos carros
CREATE POLICY "Public read access for exhibitor cars" ON storage.objects FOR SELECT USING (bucket_id = 'exhibitor-cars');

-- Permitir que qualquer pessoa faça upload da foto ao preencher o formulário
CREATE POLICY "Public insert access for exhibitor cars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'exhibitor-cars');

-- Permitir que apenas admins (usuários autenticados) deletem ou atualizem as fotos
CREATE POLICY "Admin update access for exhibitor cars" ON storage.objects FOR UPDATE USING (bucket_id = 'exhibitor-cars' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admin delete access for exhibitor cars" ON storage.objects FOR DELETE USING (bucket_id = 'exhibitor-cars' AND auth.uid() IS NOT NULL);

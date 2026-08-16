# Database Schema - Oliveira Car Fest

## 1. Tabelas

### `users`
*(Gerenciado internamente pelo Supabase Auth. Criaremos perfis se necessário).*
- `id`: UUID (Primary Key, FK para auth.users)
- `role`: text (ex: admin)
- `created_at`: timestamp

### `events`
- `id`: UUID (Primary Key)
- `title`: text
- `date`: date
- `time`: time
- `location`: text
- `address_url`: text
- `description`: text
- `banner_url`: text
- `is_next_event`: boolean (Default: false)
- `created_at`: timestamp

### `albums`
- `id`: UUID (Primary Key)
- `event_id`: UUID (FK para events)
- `title`: text
- `cover_url`: text
- `created_at`: timestamp

### `photos`
- `id`: UUID (Primary Key)
- `album_id`: UUID (FK para albums)
- `image_url`: text
- `created_at`: timestamp

### `sponsors`
- `id`: UUID (Primary Key)
- `name`: text
- `category`: text (ouro, prata, bronze, parceiro)
- `logo_url`: text
- `description`: text
- `website_url`: text
- `instagram_url`: text
- `created_at`: timestamp

### `event_sponsors`
- `event_id`: UUID (FK para events)
- `sponsor_id`: UUID (FK para sponsors)
- Primary Key (event_id, sponsor_id)

### `contact_messages`
- `id`: UUID (Primary Key)
- `name`: text
- `whatsapp`: text
- `email`: text
- `message`: text
- `created_at`: timestamp

### `sponsor_leads`
- `id`: UUID (Primary Key)
- `company`: text
- `contact_person`: text
- `phone`: text
- `email`: text
- `message`: text
- `status`: text (default 'pendente')
- `created_at`: timestamp

### `exhibitor_leads`
- `id`: UUID (Primary Key)
- `event_id`: UUID (FK para events)
- `owner_name`: text
- `email`: text
- `phone`: text
- `car_plate`: text
- `car_model`: text
- `car_year`: text
- `modifications`: text
- `instagram`: text
- `car_photo_url`: text (URL da foto do veículo anexada)
- `status`: text (default 'pendente', opções: pendente, aprovado, rejeitado)
- `created_at`: timestamp

## 2. Storage Buckets
- `event-banners`: Armazena os banners principais dos eventos.
- `gallery-images`: Imagens das galerias e álbuns.
- `sponsor-logos`: Logomarcas dos patrocinadores.
- `exhibitor-cars`: Fotos dos veículos enviadas no ato da inscrição.

## 3. Row Level Security (RLS)
- **Public Read (`events`, `albums`, `photos`, `sponsors`)**: Qualquer usuário anônimo pode ler.
- **Admin Full Access (`events`, `albums`, `photos`, `sponsors`, `event_sponsors`)**: Apenas auth.uid() pode Inserir/Atualizar/Deletar.
- **Public Insert (`contact_messages`, `sponsor_leads`, `exhibitor_leads`)**: Qualquer usuário anônimo pode inserir.
- **Admin Read/Update (`contact_messages`, `sponsor_leads`, `exhibitor_leads`)**: Apenas auth.uid() pode ler as mensagens, contatos e aprovar inscrições.

## 4. Script de Dados Iniciais (Mock Data)
Para facilitar testes e validação visual de layout sem a necessidade de cadastrar itens um a um no painel de administração, o arquivo `supabase/migrations/00002_mock_data.sql` foi criado com dados fictícios para as tabelas `events`, `albums`, `photos`, e `sponsors`.

```sql
-- Insere eventos mockados
INSERT INTO public.events (id, title, date, time, location, address_url, description, banner_url, is_next_event) VALUES
('b3c66f68-7c85-4ab2-9f37-14e30b0d45f1', 'Night Runners SP', '2026-10-14', '20:00:00', 'Guarulhos Auto Park', '#', 'Um olhar cru e sem filtros sobre a cultura automotiva underground.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn2Bsa4nrjybGRMTGb02coDCQLP2mISkei7zLm3-LLE5oOWxbM14_C6CCnbj1NWgp7DwarCXNY0229PpsYcv_lXMi-1mAo6vtINNfB0v-JyJroi_Rm2FthYVw6ny66VZnM0Se7pwjxX_3nDMHiJP_VgPncQ8tJPPS41kArLhhdtX4Q9CAZ4omJsSJ-EW0XssDiqC5LywZ9mz9N0S5NbG3763AhLiMAre_59VJfHp38_pbjWx6YaDuvyw', true),
('e9d84f88-1c95-4eb3-8f48-25f41c1e56f2', 'Expo Clássicos Guarulhos', '2026-11-02', '09:00:00', 'Centro de Convenções GRU', '#', 'Exposição dos melhores carros antigos e clássicos da região.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2h6G9cGxc9yPRmIHHwCS5PdnHiamQBcfoSiXCbLFQC47zDiROVRkqkYKsr2NDrc7ib0LUVyQWBAH6_Y2nFWnhcNa9BrR0y-iVUTGxcjG0Sw--7BdwAPG8i1SWB4jcLIcg0iMmIFLvPkjQhNoGr-LHXCn_HJgb5WwhlhNG4U3j8NVv-mX6NOhrfqbHhSNhh0zaWFMuQ_2y79iIv3n7bITGDKOdrdajJBm_Qwordhj_9cHcELlK0gNiYg', false);

-- Insere patrocinadores mockados
INSERT INTO public.sponsors (id, name, category, logo_url, description, website_url, instagram_url) VALUES
('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'Apex Performance', 'ouro', 'https://lh3.googleusercontent.com/aida-public/AB6AXuChVODgwev1hzTGcl2FfZR3dIpPl4qkvZRax3Fv5UhHd2ZjhQ02FBLJgbv3Qu5GoT6Dj1knMywsoovpPsEQtCX_gg-m_CGbmQ9ts8vP4prhj3ZThMLhJWqPJLKxKZnDFM68yfvca8wVa-P-MUUo7GcCg_qhVpKkmlEGF4zcdzoU9o7NVgEmdZT-QR3enWKEwko4X9yy7t2uibv_07umd_v0V9duOVNZNW-LMvU-dciqpvFwUBqWmemYjg', 'Alta performance.', 'https://apex.com', 'https://instagram.com/apex'),
('b2c3d4e5-f6a7-5b6c-9d8e-0f1a2b3c4d5e', 'Torque Wheels', 'prata', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJoQUe_2LFh_02WfAgTzWa2y14cXOarV2XGYQBpVY0QvmIcqRntVd5M_Q7nqGE1x9yS2emXSKFPSybbS1CAlJTewu11cVeC-8WcBVZnKycMG5otsqZkiDj0O5NJwmzaZjk8OZv5t6CO4sO9HbNTYIjAYs9N9euFgFmURiKjztgDxLvcJj9dZZAsyGw_Bv76fP1kY0JOUNo7vN_KOGsWYvtzjumZ_oQ98YYS_rc2Fsw4VEZHlE3xZqZPQ', 'Rodas forjadas.', 'https://torque.com', 'https://instagram.com/torque');

-- Insere album mockado
INSERT INTO public.albums (id, event_id, title, cover_url) VALUES
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'b3c66f68-7c85-4ab2-9f37-14e30b0d45f1', 'Night Runners Gallery', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1F8yB3r9Q1LpZ7B4A5Q9uW2Y6E6h2zR4I9F3K7aD5U6wM1H8L7C5V4N3bZ9gJ2R8X6T1yP4L9M6D3V1K8H5Q4Z2W1I3F9E7V4O6D3');

-- Insere photos mockadas
INSERT INTO public.photos (id, album_id, image_url) VALUES
('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_DqT1_fSj8V0_t3LqBXZgM1vI3xI0OVKW1Zg_z3y786D7O0R9mI1lZ9C4961mF3L5W63wM91aY4hK4yR-5yR0_Q8wz_H9X9W4U7B6K0GqI7L6H1zB2O8Q3J4V6m2O8G2O8G2O8G2O8G2O8G'),
('e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2h6G9cGxc9yPRmIHHwCS5PdnHiamQBcfoSiXCbLFQC47zDiROVRkqkYKsr2NDrc7ib0LUVyQWBAH6_Y2nFWnhcNa9BrR0y-iVUTGxcjG0Sw--7BdwAPG8i1SWB4jcLIcg0iMmIFLvPkjQhNoGr-LHXCn_HJgb5WwhlhNG4U3j8NVv-mX6NOhrfqbHhSNhh0zaWFMuQ_2y79iIv3n7bITGDKOdrdajJBm_Qwordhj_9cHcELlK0gNiYg');
```

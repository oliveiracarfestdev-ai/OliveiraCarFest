# Documentação Oficial - Oliveira Car Fest

## 1. Escopo do Projeto
Criar o portal oficial de um evento automotivo da cidade de Guarulhos/SP focado em carros rebaixados, clássicos, projetos personalizados, antigos, expositores e patrocinadores locais.

## 2. Identidade Visual
Baseado no Stitch Design System "Portal Automotivo Premium" recuperado via API.
- **Color Mode:** Dark
- **Primary Color:** #ff6600 (Laranja Vibrante)
- **Background/Surface:** Preto, Grafite (#121414, #1e2020)
- **Typography:** Montserrat (Headlines), Hanken Grotesk (Body/Labels)
- **Vibe:** Premium, alta performance, cockpit digital.
- **Animações:** Suaves via Framer Motion.

## 3. Tecnologias
- Frontend: Next.js 15 (App Router), React, TypeScript
- Estilos: Tailwind CSS, Shadcn UI, Framer Motion
- Formulários: Zod, React Hook Form
- Backend/DB: Supabase SSR, PostgreSQL (Migrations)
- Hospedagem: Vercel

## 4. Requisitos de Segurança
- Row Level Security (RLS) obrigatório em todas as tabelas.
- Validação server-side em todas as Server Actions.
- Supabase Auth para autenticação do painel administrativo.
- Nenhuma chave "Service Role" exposta ao frontend.
- Buckets de Storage com controle granular de inserção/leitura.

## 5. Arquitetura do Portal do Expositor
- **Multi-Eventos:** A tabela `exhibitor_leads` possui uma chave estrangeira `event_id`. Isso permite que o formulário de inscrição consulte os eventos ativos e que um mesmo piloto faça inscrições para múltiplos eventos.
- **Compressão de Imagens:** Fotos dos veículos (`car_photo_url`) anexadas pelo usuário no front-end são comprimidas via `browser-image-compression` antes de ir para o bucket `exhibitor-cars`, economizando armazenamento no Supabase.
- **Autenticação de Inscritos:** Feita combinando a `Placa` e o `WhatsApp`. A sessão gerada é armazenada de forma segura usando um cookie HTTP-Only assinado digitalmente com HMAC-SHA256 (`PORTAL_SESSION_SECRET`).
- **Passaportes/Tickets Virtuais:** O painel do Expositor (`/portal/dashboard`) exibe todos os projetos aprovados simultaneamente e gera uma rota de impressão limpa (`/portal/ticket/[id]`) permitindo o download em PDF.

# Controle de Fases - Oliveira Car Fest

## Status do Projeto: Fase 15 (Auditoria Geral Concluída — Correções Funcionais e Lógicas)

> 📄 **Auditoria completa:** `relatorio-auditoria-completa.md` (raiz do projeto)
> Nota geral: **7.9/10** | Segurança: 8.5 | Funcionalidade: 7.0 | Lógica: 7.5 | Visual: 8.5

- [x] Fase 0: Inicialização e Documentação Base
- [x] Fase 1: Setup do Repositório (Next.js 15, Tailwind, Shadcn UI, Framer Motion)
- [x] Fase 2: Configuração de Banco de Dados e Supabase (Schema, Tabelas, RLS, Buckets)
- [x] Fase 3: Desenvolvimento do Design System (Integração Google Stitch, Tema Dark/Premium)
- [x] Fase 4: Páginas Institucionais (UI Estática: Home, Sobre, Eventos, Galeria, Patrocinadores, Contato)

- [x] Fase 5: Integração de Dados Dinâmicos e Formulários
  - [x] Formulário de Contato: React Hook Form + Zod + Server Actions salvando na tabela `contact_messages`.
  - [x] Página "Seja Patrocinador" (Captura de Leads): Formulário integrado salvando na tabela `sponsor_leads`.
  - [x] Consumo de dados do Supabase (SSR) na listagem de Eventos, Galeria e Patrocinadores.
  - [x] Galeria: Implementar Lightbox (modal) para fotos e Lazy Loading otimizado.

- [x] Fase 6: Painel Administrativo (Autenticação e Estrutura)
  - [x] Configuração do Supabase Auth para login protegido na rota `/admin`.
  - [x] Dashboard Admin (Contagem total de eventos, fotos, patrocinadores, contatos e leads).

- [x] Fase 7: CRUDs do Painel Administrativo
  - [x] Gerenciamento de Eventos (Upload de imagem no bucket `event-banners`).
  - [x] Gerenciamento de Galerias e Álbuns (Upload no bucket `gallery-images`).
  - [x] Gerenciamento de Patrocinadores (Upload no bucket `sponsor-logos`).
  - [x] Visualização de Leads e Mensagens de Contato.

- [x] Fase 8: SEO e Metadados
  - [x] Configuração de Open Graph, Keywords e Title tags otimizados (Guarulhos, rebaixados, etc.).
  - [x] Implementação de Schema.org, Sitemap dinâmico e Robots.txt.

- [x] Fase 9: Funcionalidades Extras e Refinamentos
  - [x] Criação de Página 404 Personalizada.
  - [x] Preparação visual da área para futuras inscrições de expositores / presença.
  - [x] Revisão de Responsividade e Acessibilidade (Mobile First).

- [x] Fase 10: Área do Expositor e Portal VIP
  - [x] Formulário de inscrição de expositores (`src/app/expositores/page.tsx`) com seleção de Eventos futuros e upload de imagem do carro com compressão automática (`browser-image-compression`).
  - [x] Painel administrativo de expositores (`src/app/admin/expositores/page.tsx`) com visão de evento e botões de Aprovar/Rejeitar/Pender.
  - [x] Portal do Expositor (`src/app/portal/page.tsx`) — Login seguro com HMAC-SHA256 via Placa + WhatsApp.
  - [x] Dashboard VIP Multi-Eventos (`src/app/portal/dashboard/page.tsx`) — Exibe todos os projetos aprovados e gera Tickets.
  - [x] Rota de Impressão de Ticket em PDF (`/portal/ticket/[id]`).
  - [x] Migrations SQL executadas (`00003`, `00005`, `00006`).

- [x] Fase 11: Auditoria de Segurança
  - [x] Varredura completa de todas as Server Actions, Middleware, Autenticação e Configurações.
  - [x] Relatório gerado com 12 vulnerabilidades catalogadas. **Documento:** `relatorio-seguranca.md`

- [ ] Fase 12: Correções de Segurança
  > 📄 **Referência completa:** `relatorio-seguranca.md` (raiz do projeto)
  > Cada item abaixo referencia o ID da vulnerabilidade no relatório para rastreabilidade.

  ### 🔴 Correções CRÍTICAS (Prioridade Máxima)

  - [x] **CRIT-01** — Blindar Server Actions Admin com autenticação obrigatória
    - 📄 Ref: `relatorio-seguranca.md` → Seção "CRIT-01"
    - [x] Criar `src/lib/supabase/auth-guard.ts` com função `requireAdmin()` que verifica `supabase.auth.getUser()` e bloqueia execução se não autenticado.
    - [x] Aplicar `requireAdmin()` em `src/app/actions/events.ts` → `createEvent`, `deleteEvent`
    - [x] Aplicar `requireAdmin()` em `src/app/actions/sponsors.ts` → `createSponsor`, `deleteSponsor`
    - [x] Aplicar `requireAdmin()` em `src/app/actions/gallery.ts` → `createAlbum`, `deleteAlbum`
    - [x] Aplicar `requireAdmin()` em `src/app/actions/leads.ts` → `deleteContactMessage`, `deleteSponsorLead`, `resolveSponsorLead`
    - [x] Aplicar `requireAdmin()` em `src/app/actions/exhibitors.ts` → `updateExhibitorStatus`, `deleteExhibitorLead`

  - [x] **CRIT-02** — Assinar cookie do Portal com criptografia HMAC-SHA256
    - 📄 Ref: `relatorio-seguranca.md` → Seção "CRIT-02"
    - [x] Adicionar variável `PORTAL_SESSION_SECRET` no `.env` e no `.env.example`
    - [x] Implementar assinatura HMAC-SHA256 na criação do cookie em `src/app/actions/portal.ts` → `loginToPortal`
    - [x] Implementar verificação HMAC-SHA256 na leitura do cookie em `src/app/actions/portal.ts` → `getPortalSession`

  - [x] **CRIT-03** — Implementar Rate Limiting em todos os formulários públicos
    - 📄 Ref: `relatorio-seguranca.md` → Seção "CRIT-03"
    - [x] Criar `src/lib/rate-limit.ts` com sistema de rate limiting por IP (Map em memória, máx 5 req/min)
    - [x] Aplicar rate limit em `src/app/actions/portal.ts` → `loginToPortal`
    - [x] Aplicar rate limit em `src/app/actions/exhibitors.ts` → `createExhibitorLead`
    - [x] Aplicar rate limit em `src/app/actions/contact.ts` → `submitContactForm`
    - [x] Aplicar rate limit em `src/app/actions/sponsor.ts` → `submitSponsorLead`

  ### 🟠 Correções ALTAS

  - [x] **HIGH-01** — Validar tipo e tamanho de arquivo nos uploads
    - 📄 Ref: `relatorio-seguranca.md` → Seção "HIGH-01"
    - [x] Modificar `src/lib/supabase/storage.ts` para rejeitar arquivos > 5MB e extensões fora de `.jpg/.jpeg/.png/.webp/.gif`

  - [x] **HIGH-02** — Sanitizar campos de texto livre contra XSS
    - 📄 Ref: `relatorio-seguranca.md` → Seção "HIGH-02"
    - [x] Criar `src/lib/sanitize.ts` com função que remove tags HTML de strings
    - [x] Aplicar sanitização nos schemas Zod dos formulários públicos

  - [x] **HIGH-03** — Configurar Headers de Segurança HTTP
    - 📄 Ref: `relatorio-seguranca.md` → Seção "HIGH-03"
    - [x] Modificar `next.config.ts` para incluir: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy`, `Strict-Transport-Security`, `Permissions-Policy`

  - [x] **HIGH-04** — Criar `.env.example` para documentação de variáveis
    - 📄 Ref: `relatorio-seguranca.md` → Seção "HIGH-04"
    - [x] Criar `.env.example` na raiz do projeto com todas as variáveis necessárias (sem valores reais)

  ### 🟡 Correções MÉDIAS

  - [x] **MED-01** — Unificar mensagens de erro no login do Portal
    - 📄 Ref: `relatorio-seguranca.md` → Seção "MED-01"
    - [x] Modificar `src/app/actions/portal.ts` para usar mensagem genérica em caso de falha (não revelar status pendente/rejeitado)

  - [x] **MED-02** — Configurar allowedOrigins para proteção CSRF em produção
    - 📄 Ref: `relatorio-seguranca.md` → Seção "MED-02"
    - [x] Adicionar `serverActions.allowedOrigins` no `next.config.ts` com domínio de produção

  - [x] **MED-03** — Remover logs sensíveis em produção
    - 📄 Ref: `relatorio-seguranca.md` → Seção "MED-03"
    - [x] Substituir `console.error(error)` por mensagens genéricas em: `events.ts`, `gallery.ts`, `contact.ts`, `exhibitors.ts`

  ### 🟢 Correções BAIXAS

  - [ ] **LOW-01** — Trocar senha do admin por senha forte (mínimo 12 caracteres)
    - 📄 Ref: `relatorio-seguranca.md` → Seção "LOW-01"
    - [ ] Alterar senha no painel do Supabase Auth

  - [x] **LOW-02** — Bloquear rotas sensíveis no robots.txt
    - 📄 Ref: `relatorio-seguranca.md` → Seção "LOW-02"
    - [x] Modificar `src/app/robots.ts` para incluir `/admin`, `/login` e `/portal` no `Disallow`

- [ ] Fase 13: Correções Visuais e Conteúdo
  > 📄 **Referência completa:** `relatorio-visual.md` (raiz do projeto)
  > Cada item abaixo referencia o ID do problema no relatório para rastreabilidade.

  ### 🔴 Conteúdo Fictício (Requer dados do cliente)

  - [x] **VISUAL-01** — Substituir dados fictícios na página de Contato
    - 📄 Ref: `relatorio-visual.md` → Seção "1. Página de Contato com dados fictícios"
    - [x] Substituir endereço "Neo-Tokyo Auto District" pelo endereço real em Guarulhos/SP → `src/app/contato/page.tsx`
    - [x] Substituir telefone "+81 (0) 3-XXXX-XXXX" pelo WhatsApp real do organizador → `src/app/contato/page.tsx`
    - [x] Substituir email "comms@oliveiracarfest.com" pelo email oficial (ou manter se for real) → `src/app/contato/page.tsx`
    - [x] Trocar labels "Transmissão" → "E-mail", "Linha Direta" → "WhatsApp" → `src/app/contato/page.tsx`
    - [x] Trocar labels do formulário: "Nome Operacional" → "Seu Nome", "Transmitir" → "Enviar Mensagem" → `src/app/contato/page.tsx`
    - [ ] Substituir imagem genérica do mapa por Google Maps embed ou imagem real → `src/app/contato/page.tsx`
    - ⚠️ **Bloqueado:** Aguardando dados reais do cliente.

  - [ ] **VISUAL-02** — Substituir equipe fictícia na página Sobre
    - 📄 Ref: `relatorio-visual.md` → Seção "2. Página Sobre com equipe fictícia"
    - [ ] Substituir "Marcus Vance", "Elena Rostova", "Jameson Wright" por nomes/cargos/fotos reais → `src/app/sobre/page.tsx`
    - [ ] Alternativa: Remover a seção "Nossa Equipe" completamente, se o cliente preferir.
    - ⚠️ **Bloqueado:** Aguardando decisão e dados do cliente.

  ### 🟡 Bugs Visuais (Podem ser corrigidos imediatamente)

  - [x] **VISUAL-03** — Corrigir badge de categoria colado ao nome do patrocinador
    - 📄 Ref: `relatorio-visual.md` → Seção "3. Badge de categoria colado ao nome"
    - [x] Adicionar separação textual e `aria-label` no badge → `src/app/patrocinadores/page.tsx`

  - [x] **VISUAL-04** — Corrigir título da Hero sem espaçamento
    - 📄 Ref: `relatorio-visual.md` → Seção "4. Título da Hero sem espaçamento"
    - [x] Adicionar espaço `{' '}` entre spans do título "PRECISÃO ENCONTRA PAIXÃO" → `src/app/page.tsx`

  ### 💡 Melhorias Opcionais

  - [x] **OPT-01** — Adicionar animações de scroll (fade-in) usando Framer Motion
    - 📄 Ref: `relatorio-visual.md` → Seção "Sugestões de Melhoria"
  - [x] **OPT-02** — Adicionar loading skeletons nas páginas dinâmicas
    - 📄 Ref: `relatorio-visual.md` → Seção "Sugestões de Melhoria"
  - [x] **OPT-03** — Verificar/substituir favicon pela marca oficial do evento
    - 📄 Ref: `relatorio-visual.md` → Seção "Sugestões de Melhoria"

- [x] Fase 14: Deploy em Produção (Entregue)
  - [x] Sistema centralizado e documentado (`fase.md`, `documentacao.md`, `database.md`).
  - [ ] Deploy na Vercel pelo Cliente.
  - [ ] Execução das Migrations (`00001` até `00007`) no banco Supabase de Produção pelo Cliente.
  - [ ] Configuração das chaves do Supabase e `PORTAL_SESSION_SECRET` na Vercel pelo Cliente.

- [x] Fase 15: Auditoria Geral do Portal
  > 📄 **Documento gerado:** `relatorio-auditoria-completa.md` (raiz do projeto)
  - [x] Análise completa de Segurança (8.5/10) — 12 pontos positivos, 8 atenções catalogadas
  - [x] Análise completa de Funcionalidade (7.0/10) — 15 OK, 7 problemas catalogados
  - [x] Análise completa de Lógica (7.5/10) — 6 fortes, 7 problemas catalogados
  - [x] Análise completa de Visual (8.5/10) — 7 excelências, 8 ajustes catalogados
  - [x] 22 melhorias priorizadas (Máxima, Alta, Média, Baixa)

- [x] Fase 16: Correções Funcionais e Lógicas (Prioridade Máxima)
  > 📄 **Referência:** `relatorio-auditoria-completa.md` → Seções "Funcionalidade" e "Lógica"
  > Foco: Corrigir tudo que está quebrado ou que engana o usuário.

  ### 🔴 Correções CRÍTICAS

  - [x] **FUNC-01 / MELHORIA-01** — Implementar filtros funcionais nas páginas públicas
    - 📄 Ref: `relatorio-auditoria-completa.md` → FUNC-01 + MELHORIA-01
    - [x] Criar migration para adicionar campo `category` na tabela `events` e `albums`
    - [x] Converter botões de filtro em `/eventos` para componentes client com state funcional
    - [x] Converter botões de filtro em `/galeria` para componentes client com state funcional

  - [x] **FUNC-04 / FUNC-05 / MELHORIA-02** — Adicionar EDIÇÃO nos CRUDs do Admin
    - 📄 Ref: `relatorio-auditoria-completa.md` → FUNC-04, FUNC-05, MELHORIA-02
    - [x] Criar action `updateEvent()` em `src/app/actions/events.ts`
    - [x] Criar action `updateSponsor()` em `src/app/actions/sponsors.ts`
    - [x] Adicionar botão de editar + formulário pré-preenchido nas telas admin de Eventos
    - [x] Adicionar botão de editar + formulário pré-preenchido nas telas admin de Patrocinadores

  - [x] **MELHORIA-03** — Modal de confirmação para ações destrutivas
    - 📄 Ref: `relatorio-auditoria-completa.md` → MELHORIA-03
    - [x] Criar componente `ConfirmDialog` usando Shadcn UI `AlertDialog`
    - [x] Aplicar em todos os botões de deletar do painel admin (Eventos, Galerias, Patrocinadores, Expositores, Leads)

  - [x] **LOGIC-05 / MELHORIA-05** — Prevenir inscrição duplicada de expositor
    - 📄 Ref: `relatorio-auditoria-completa.md` → LOGIC-05, MELHORIA-05
    - [x] Criar verificação em `src/app/actions/exhibitors.ts` para placa e evento iguais
    - [x] Retornar erro claro (toast/mensagem) caso já exista

  - [x] **FUNC-02** — Corrigir botão "Carregar Eventos Anteriores"
    - 📄 Ref: `relatorio-auditoria-completa.md` → FUNC-02
    - [x] Ocultar ou implementar paginação real (atualmente é decorativo) com `date < today` ou remover o botão

  - [x] **FUNC-03** — Corrigir botão "BAIXAR MEDIA KIT"
    - 📄 Ref: `relatorio-auditoria-completa.md` → FUNC-03
    - [x] Adicionar um link válido de PDF ou abrir modal um PDF real quando disponível

  - [x] **FUNC-07** — Corrigir email fictício no Portal do Expositor
    - 📄 Ref: `relatorio-auditoria-completa.md` → FUNC-07
    - [x] Buscar contato dinâmico (tabela configurations) ou remover link de "contato@exemplo.com" em `src/app/portal/(dashboard)/dashboard/page.tsx`

  - [x] **LOGIC-01** — Adicionar campo de categoria nos eventos
    - 📄 Ref: `relatorio-auditoria-completa.md` → LOGIC-01
    - [x] Adicionar campo `category` na tabela `events` (migration)
    - [x] Permitir classificar como "Encontro", "Exposição"
    - [x] Atualizar formulário de criação de evento no admin para incluir select de categoria

  - [x] **LOGIC-06 / MELHORIA-13** — Campo `address_url` no formulário de evento
    - 📄 Ref: `relatorio-auditoria-completa.md` → LOGIC-06, MELHORIA-13
    - [x] Adicionar campo de endereço/Google Maps URL no formulário de criação de evento
    - [x] Remover placeholder `'#'` do `address_url`

  - [x] **LOGIC-07 / MELHORIA-16** — Limpar arquivos órfãos do Storage ao deletar
    - 📄 Ref: `relatorio-auditoria-completa.md` → LOGIC-07, MELHORIA-16
    - [x] Modificar `deleteAlbum` para remover fotos do bucket antes de deletar o registro
    - [x] Modificar `deleteEvent` para remover banner do bucket
    - [x] Modificar `deleteSponsor` para remover logo do bucket

- [x] Fase 17: Correções de Segurança V2
  > 📄 **Referência:** `relatorio-auditoria-completa.md` → Seção "Segurança"
  > Foco: Fechar brechas identificadas na auditoria.

  - [x] **SEC-01** — Verificar role de admin no `requireAdmin()`
    - 📄 Ref: `relatorio-auditoria-completa.md` → SEC-01
    - [x] Usar metadata do Supabase Auth para verificar is_admin
    - [x] Modificar `src/lib/supabase/auth-guard.ts` para verificar `user_metadata.is_admin`
    - [x] Proteger `src/app/admin/layout.tsx` para todas as páginas filhas

  - [x] **SEC-04** — Adicionar Content-Security-Policy (CSP)
    - 📄 Ref: `relatorio-auditoria-completa.md` → SEC-04
    - [x] Adicionar header CSP restritivo no `next.config.ts`

  - [x] **SEC-05** — Remover `console.error(error)` remanescente em `sponsors.ts`
    - 📄 Ref: `relatorio-auditoria-completa.md` → SEC-05
    - [x] Remover logs que expõem detalhes do Supabase para o servidor (boa prática)

  - [x] **SEC-06** — Remover fallback do `PORTAL_SESSION_SECRET`
    - 📄 Ref: `relatorio-auditoria-completa.md` → SEC-06
    - [x] Lançar erro se `PORTAL_SESSION_SECRET` não estiver definido em produção

  - [x] **SEC-03** — Revogar chaves antigas do Supabase
    - 📄 Ref: `relatorio-auditoria-completa.md` → SEC-03
    - [x] Remover chaves comentadas do `.env`
    - ⚠️ **Ação Manual Requerida do Usuário**: Revogar as chaves antigas no painel do Supabase.

  - [x] **LOW-01** — Trocar senha do admin por senha forte (pendente da Fase 12)
    - 📄 Ref: `relatorio-seguranca.md` → LOW-01
    - ⚠️ **Ação Manual Requerida do Usuário**: Alterar senha no painel do Supabase Auth para uma com no mínimo 12 caracteres.

- [x] Fase 18: Melhorias Visuais e UX (Tornar Incrível)
  > 📄 **Referência:** `relatorio-auditoria-completa.md` → Seções "Visual" e "Melhorias"
  > Foco: Elevar o visual de 8.5 para 9.5+

  - [x] **VIS-01 / LOGIC-03 / MELHORIA-04** — Substituir dados fictícios por reais
    - 📄 Ref: `relatorio-auditoria-completa.md` → VIS-01, LOGIC-03, MELHORIA-04
    - [x] Remover estatísticas hardcoded (2.5K, 48, 150K) da Home
    - [x] Opção A: Buscar contagens reais do banco (eventos, expositores)
    - [ ] Opção B: Criar seção "Nosso Primeiro Evento" com storytelling

  - [x] **VIS-06 / MELHORIA-10** — Redesenhar Footer profissional
    - 📄 Ref: `relatorio-auditoria-completa.md` → VIS-06, MELHORIA-10
    - [x] Criar footer com 4 colunas: Navegação, Redes Sociais (SVG), Newsletter, Legal
    - [x] Adicionar gradient sutil na borda superior

  - [x] **VIS-04 / MELHORIA-11** — Criar Empty States bonitos
    - 📄 Ref: `relatorio-auditoria-completa.md` → VIS-04, MELHORIA-11
    - [x] Criar componente `EmptyState` com ícone/ilustração + texto + CTA
    - [x] Aplicar em Eventos, Galeria e Patrocinadores quando sem dados

  - [x] **MELHORIA-06** — QR Code no Ticket Virtual do Expositor
    - 📄 Ref: `relatorio-auditoria-completa.md` → MELHORIA-06
    - [x] Instalar biblioteca `qrcode` ou `qrcode.react`
    - [x] Gerar QR Code dinâmico no ticket com ID da inscrição
    - [x] Exibir QR Code na rota de impressão `/portal/ticket/[id]`

  - [x] **MELHORIA-12** — Toast Notifications
    - 📄 Ref: `relatorio-auditoria-completa.md` → MELHORIA-12
    - [x] Instalar `sonner` ou `react-hot-toast`
    - [x] Aplicar em formulários (contato, patrocínio, expositor) e ações admin

  - [x] **MELHORIA-08** — Página de Detalhe do Evento rica
    - 📄 Ref: `relatorio-auditoria-completa.md` → MELHORIA-08
    - [x] Redesenhar `/eventos/[id]` com banner fullscreen, galeria, mapa, lista de expositores

  - [x] **MELHORIA-09** — Contador de vagas no formulário de expositor
    - 📄 Ref: `relatorio-auditoria-completa.md` → MELHORIA-09
    - [x] Adicionar campo `max_exhibitors` na tabela `events` (migration)
    - [x] Mostrar "X vagas restantes" no formulário
    - [x] Bloquear inscrição quando lotado

  - [x] **MELHORIA-15** — Animação de contagem na Home
    - 📄 Ref: `relatorio-auditoria-completa.md` → MELHORIA-15
    - [x] Implementar count-up animation com Framer Motion nos números da Home

  - [x] **VIS-02 / VIS-03** — Ajustar textos e linguagem
    - 📄 Ref: `relatorio-auditoria-completa.md` → VIS-02, VIS-03
    - [x] Trocar "EVENTOS GLOBAIS" por "NOSSOS EVENTOS" ou "CIRCUITO GUARULHOS"
    - [x] Trocar "CULTURA NOTURNA" por "GALERIA OFICIAL" na galeria
    - [x] Revisar linguagem "sci-fi" para algo mais autêntico ao contexto local

- [ ] Fase 19: Funcionalidades Avançadas (Nice-to-Have)
  > 📄 **Referência:** `relatorio-auditoria-completa.md` → Seção "Melhorias" (Prioridade Baixa)
  > Foco: Funcionalidades extras que diferenciam o portal.

  - [~] **MELHORIA-07** — Notificação por WhatsApp (Cancelado: Requer API paga)
  - [x] **MELHORIA-14** — Página de detalhe do Patrocinador (`/patrocinadores/[id]`)
  - [x] **MELHORIA-17** — Integrar Google Analytics e Meta Pixel
  - [x] **MELHORIA-18** — PWA (Progressive Web App) para acesso mobile do ticket
  - [~] **MELHORIA-21** — Webhook no Supabase (Cancelado: Requer infra externa)
  - [x] **MELHORIA-22** — Dashboard Admin com gráficos (recharts)
  - [x] **FUNC-06** — Tornar `event_id` obrigatório na inscrição de expositores (constraint NOT NULL)
  - [x] **MELHORIA-23** — Tabela site_settings e painel de configuração para métricas da Home

- [x] Fase 19: Funcionalidades Avançadas (Nice-to-Have)

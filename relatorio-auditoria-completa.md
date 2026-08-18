# 🏁 Relatório de Auditoria Completa — Oliveira Car Fest

> **Data:** 17/08/2026  
> **Projeto:** Portal Oliveira Car Fest  
> **Stack:** Next.js 15 + Supabase + Vercel (planos gratuitos)  
> **Versão Analisada:** Código-fonte completo + Screenshots do ambiente de produção  

---

## Índice

1. [🔒 Segurança](#1--segurança)
2. [⚙️ Funcionalidade](#2-️-funcionalidade)
3. [🧠 Lógica](#3--lógica)
4. [🎨 Visual](#4--visual)
5. [🚀 Melhorias para Tornar o Portal Incrível](#5--melhorias-para-tornar-o-portal-incrível)

---

## 1. 🔒 Segurança

### ✅ O que está BEM FEITO

| Item | Detalhe | Arquivo |
|------|---------|---------|
| **Server Actions protegidas** | Todas as actions admin usam `requireAdmin()` antes de executar | [auth-guard.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/supabase/auth-guard.ts) |
| **Cookie HMAC-SHA256** | Sessão do portal assinada digitalmente com `timingSafeEqual` (previne timing attacks) | [portal.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/portal.ts#L11-L31) |
| **Cookie HttpOnly + Secure** | O cookie `portal_session` não é acessível via JavaScript no browser | [portal.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/portal.ts#L65-L69) |
| **Rate Limiting** | 5 requisições/minuto por IP em todos os formulários públicos | [rate-limit.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/rate-limit.ts) |
| **Validação Zod server-side** | Todos os inputs são validados com schemas Zod antes de tocar o banco | [exhibitors.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/exhibitors.ts#L11-L22) |
| **Sanitização anti-XSS** | HTML entities escapadas em todos os campos de texto livre | [sanitize.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/sanitize.ts) |
| **Headers de segurança HTTP** | `X-Frame-Options`, `X-Content-Type-Options`, `HSTS`, `Referrer-Policy`, `Permissions-Policy` | [next.config.ts](file:///d:/Repositorios/OliveiraCarFest/next.config.ts#L3-L9) |
| **Upload validado** | Limite de 5MB + whitelist de MIME types (jpg/png/webp/gif) | [storage.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/supabase/storage.ts#L3-L11) |
| **RLS no Supabase** | Todas as tabelas com Row Level Security ativo | [00001_initial_schema.sql](file:///d:/Repositorios/OliveiraCarFest/supabase/migrations/00001_initial_schema.sql#L73-L100) |
| **CSRF Protection** | `allowedOrigins` configurado no `next.config.ts` | [next.config.ts](file:///d:/Repositorios/OliveiraCarFest/next.config.ts#L33-L37) |
| **Robots.txt** | `/admin/`, `/login/`, `/portal/` bloqueados para crawlers | [robots.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/robots.ts) |
| **Middleware de auth** | Rotas `/admin/*` protegidas por redirect automático | [middleware.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/supabase/middleware.ts#L35-L42) |

### 🟡 Pontos de ATENÇÃO (Risco Médio)

| # | Problema | Impacto | Arquivo | Sugestão |
|---|----------|---------|---------|----------|
| **SEC-01** | `requireAdmin()` verifica apenas se o user está logado (`auth.uid() IS NOT NULL`), mas NÃO verifica se ele é realmente admin por role | Qualquer usuário autenticado no Supabase Auth pode executar ações admin | [auth-guard.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/supabase/auth-guard.ts) | Verificar `user.role === 'admin'` ou checar contra uma tabela `profiles` com coluna `is_admin` |
| **SEC-02** | Rate limiting usa `Map` em memória — na Vercel (serverless), cada cold start cria um Map novo, tornando o rate limit ineficaz | Atacante pode burlar o rate limit simplesmente esperando um novo cold start (ou fazendo muitas requisições paralelas que vão para instâncias diferentes) | [rate-limit.ts](file:///d:/Repositorios/OliveiraCarFest/src/lib/rate-limit.ts#L8) | No tier gratuito, usar Supabase como store (INSERT + COUNT com window de tempo) ou aceitar essa limitação documentando-a |
| **SEC-03** | O `.env` contém chaves do Supabase de **dois projetos** (um comentado, outro ativo). Chaves antigas expostas no histórico do Git | Chaves da instância antiga podem estar ativas e dar acesso ao banco anterior | [.env](file:///d:/Repositorios/OliveiraCarFest/.env#L1-L2) | Revogar as chaves do projeto antigo (`tgqbhgdvhprgifeskaev`) no painel Supabase |
| **SEC-04** | Falta `Content-Security-Policy` (CSP) nos security headers | Sem CSP, um ataque XSS refletido pode carregar scripts externos livremente | [next.config.ts](file:///d:/Repositorios/OliveiraCarFest/next.config.ts#L3-L9) | Adicionar CSP restritivo (ex: `default-src 'self'; img-src 'self' *.supabase.co; script-src 'self' 'unsafe-inline'`) |
| **SEC-05** | `sponsors.ts` admin action faz `console.error(error)` vazando o objeto de erro completo do Supabase nos logs | Pode expor estrutura interna do banco/queries em logs de produção | [sponsors.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/sponsors.ts#L54) | Trocar por mensagem genérica como nas outras actions |

### 🟢 Risco Baixo (Boas Práticas)

| # | Observação | Sugestão |
|---|------------|----------|
| **SEC-06** | `PORTAL_SESSION_SECRET` tem fallback `'default_dev_secret_please_change'` no código | Remover o fallback e lançar erro se a variável não existir em produção |
| **SEC-07** | Login admin aceita senha mínima de 6 caracteres no schema Zod | Aumentar para 12+ no schema. O item LOW-01 do relatório anterior continua pendente |
| **SEC-08** | Não há política de expiração/rotação do `PORTAL_SESSION_SECRET` | Documentar processo de rotação periódica |

---

## 2. ⚙️ Funcionalidade

### ✅ Funcionalidades que FUNCIONAM corretamente

| Funcionalidade | Status | Observação |
|----------------|--------|------------|
| Login Admin (Supabase Auth) | ✅ OK | Redirect correto para `/admin`, proteção de rotas via middleware |
| Dashboard Admin (contadores) | ✅ OK | Mostra contagem de eventos, fotos, patrocinadores, leads, mensagens |
| CRUD de Eventos | ✅ OK | Criar com upload de banner, deletar, revalidação de cache |
| CRUD de Galerias/Álbuns | ✅ OK | Upload múltiplo de fotos, vinculação a evento |
| CRUD de Patrocinadores | ✅ OK | Upload de logo, categorias (ouro/prata/bronze/parceiro) |
| Visualização de Leads | ✅ OK | Contatos e interesses comerciais com ações de resolver/deletar |
| Gerenciamento de Expositores | ✅ OK | Aprovar/Rejeitar/Pender inscrições, foto do carro visível |
| Formulário de Contato | ✅ OK | Zod + sanitização + rate limit |
| Formulário de Patrocínio | ✅ OK | Zod + sanitização + rate limit |
| Formulário de Inscrição (Expositor) | ✅ OK | Seleção de evento, upload com compressão, doação solidária |
| Portal do Expositor (Login) | ✅ OK | Autenticação Placa + WhatsApp com HMAC |
| Dashboard do Expositor | ✅ OK | Exibe projetos aprovados, ticket virtual |
| Ticket Virtual (Impressão) | ✅ OK | Rota `/portal/ticket/[id]` para download/impressão |
| SEO (meta tags, sitemap, robots) | ✅ OK | OpenGraph, Schema.org, sitemap dinâmico |
| Páginas 404 e Error | ✅ OK | Páginas de erro customizadas |

### 🔴 Problemas Funcionais Encontrados

| # | Problema | Impacto | Arquivo |
|---|----------|---------|---------|
| **FUNC-01** | **Filtros de categoria não funcionam** — Os botões "Corrida", "Encontro", "Exposição" na página `/eventos` e "Rebaixados", "Performance", "Clássicos" na `/galeria` são puramente visuais, sem lógica de filtragem | Usuário clica e nada acontece. Gera frustração | [eventos/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/eventos/page.tsx#L22-L34), [galeria/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/galeria/page.tsx#L39-L43) |
| **FUNC-02** | **Botão "Carregar Eventos Anteriores"** não faz nada — É um `<Button>` sem `onClick` ou action | Promessa visual sem entrega funcional | [eventos/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/eventos/page.tsx#L105-L108) |
| **FUNC-03** | **Botão "BAIXAR MEDIA KIT"** na página de patrocinadores não tem ação | Se o organizador não tem Media Kit, o botão deveria ser removido ou desabilitado | [patrocinadores/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/patrocinadores/page.tsx#L107-L110) |
| **FUNC-04** | **CRUD de Eventos incompleto** — Não há funcionalidade de EDITAR evento (somente criar/deletar) | Admin precisa deletar e recriar para corrigir qualquer informação | [events.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/events.ts) |
| **FUNC-05** | **CRUD de Patrocinadores incompleto** — Sem edição. Mesma limitação | Mesmo problema do FUNC-04 | [sponsors.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/sponsors.ts) |
| **FUNC-06** | **Inscrição sem evento vinculado** — Um dos expositores aparece com "Sem evento" (visível na screenshot do admin). O campo `event_id` pode ser `NULL` no banco | Expositor inscrito sem vínculo a nenhum evento futuro | [00006_exhibitor_events.sql](file:///d:/Repositorios/OliveiraCarFest/supabase/migrations/00006_exhibitor_events.sql#L2-L3) |
| **FUNC-07** | **Email de "Falar com Curadoria" no dashboard do expositor** usa `comms@oliveiracarfest.com` (fictício), diferente do email real `oliveiracarfest@gmail.com` na página de contato | Expositor tenta enviar email e ele não chega | [dashboard/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/portal/(dashboard)/dashboard/page.tsx#L131) |

---

## 3. 🧠 Lógica

### ✅ Lógica que funciona bem

| Aspecto | Avaliação |
|---------|-----------|
| **Autenticação dual** | Boa separação: Supabase Auth para admin, HMAC cookie para expositor |
| **Multi-eventos por expositor** | A query busca todos os leads aprovados com mesmo plate+phone, permitindo N inscrições |
| **Compressão de imagens client-side** | `browser-image-compression` antes do upload economiza storage do Supabase gratuito |
| **Revalidação de cache (ISR)** | `revalidate = 60` + `revalidatePath()` nas actions mantém conteúdo fresco |
| **Cliente público sem cookies** | `supabasePublic` para páginas estáticas permite cache SSG/ISR no Next.js |
| **Categoria inferida do título** | Na página de eventos, a lógica infere "Corrida", "Exposição" ou "Encontro" pelo título |

### 🔴 Problemas de Lógica

| # | Problema | Detalhe | Arquivo |
|---|----------|---------|---------|
| **LOGIC-01** | **Categorização de eventos frágil** — A lógica usa `title.toLowerCase().includes("night")` para definir categoria. Se o admin criar "Noite dos Clássicos" a categoria será errada | Deveria ter um campo `category` na tabela `events` | [eventos/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/eventos/page.tsx#L42-L51) |
| **LOGIC-02** | **Home page quebra sem evento futuro** — Se não houver nenhum evento com `date >= today`, o `nextEvent` será `null` e a seção de countdown some inteira. Isso é tratado com `{nextEvent && (...)}`, mas a Home fica vazia (só Hero + Stats) | Exibir uma mensagem "Em breve..." ou mostrar o último evento passado | [page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/page.tsx#L104) |
| **LOGIC-03** | **Estatísticas hardcoded** — "2.5K+ Carros", "48 Eventos", "150K Seguidores" são valores estáticos escritos no JSX. Não refletem dados reais | Conectar ao banco ou ao Instagram API, ou pelo menos permitir que o admin edite | [page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/page.tsx#L142-L153) |
| **LOGIC-04** | **Página "Sobre" sem seção de equipe** — A seção de equipe foi removida (VISUAL-02 pendente) mas não foi substituída por nada. A página termina abruptamente | A página `/sobre` tem apenas Hero + Manifesto. Falta conteúdo | [sobre/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/sobre/page.tsx) |
| **LOGIC-05** | **Expositor pode se inscrever múltiplas vezes com a mesma placa** — Não há constraint `UNIQUE(car_plate, event_id)` no banco. Na screenshot do admin, "Caio Franca" aparece 2x com placa EVH0H11 | Adicionar constraint unique ou validar no server action antes do INSERT | [exhibitors.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/exhibitors.ts#L55-L57) |
| **LOGIC-06** | **Campo `address_url` sempre `#`** — Ao criar evento, o `address_url` é hardcoded como `'#'` (placeholder) | O admin não consegue inserir o link do Google Maps para o endereço do evento | [events.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/events.ts#L55) |
| **LOGIC-07** | **Deletar álbum não deleta as fotos do Storage** — `deleteAlbum` faz DELETE na tabela (cascade deleta os registros de `photos`), mas os arquivos físicos permanecem no bucket `gallery-images` | Acúmulo de arquivos órfãos no storage gratuito | [gallery.ts](file:///d:/Repositorios/OliveiraCarFest/src/app/actions/gallery.ts#L72-L84) |

---

## 4. 🎨 Visual

### ✅ Pontos Visuais EXCELENTES

| Aspecto | Nota |
|---------|------|
| **Design System consistente** | Dark theme premium com cores `#121414`/`#1e2020`/`#ff6600` aplicadas uniformemente |
| **Tipografia** | Montserrat para headings (forte, uppercase) + Hanken Grotesk para body (legível) — ótima combinação |
| **Identidade visual** | Marca "automotiva premium" muito bem transmitida — bordas retas, linguagem técnica |
| **Painel Admin** | Clean, funcional, sidebar organizada, visual consistente com o tema |
| **Portal do Expositor** | Ticket virtual com visual de "passaporte VIP" — muito bem executado |
| **Micro-animações** | FadeIn com Framer Motion, hover effects nos cards, backdrop-blur nos painéis glass |
| **Responsividade** | Layout mobile-first com breakpoints adequados |

### 🟡 Problemas Visuais Encontrados

| # | Problema | Localização | Impacto |
|---|----------|-------------|---------|
| **VIS-01** | **Dados fictícios ainda presentes na Home** — "2.5K+ Carros Registrados", "48 Eventos Realizados", "150K Seguidores Globais" são números inventados para um evento que está na 1ª edição | Perde credibilidade com visitantes que conhecem o evento | [page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/page.tsx#L142-L153) |
| **VIS-02** | **Textos em "dialeto sci-fi" misturados com português real** — Ex: "Circuito 2026", "EVENTOS GLOBAIS", "Seguidores Globais". O evento é local (Guarulhos/SP), não global | Inconsistência de linguagem. "Eventos Regionais" ou "Nossos Encontros" seria mais autêntico | Múltiplas páginas |
| **VIS-03** | **Página da Galeria título "CULTURA NOTURNA"** — Título genérico que não reflete o conteúdo real (fotos de encontros de carros) | Trocar para algo como "GALERIA OFICIAL" ou "NOSSOS ENCONTROS" | [galeria/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/galeria/page.tsx#L31) |
| **VIS-04** | **Página vazia quando sem dados** — Eventos, Galeria e Patrocinadores exibem apenas "Nenhum X encontrado" sem nenhum visual | Usar empty states com ilustrações ou CTAs | Múltiplas páginas |
| **VIS-05** | **Patrocinadores sem logo** — O card exibe apenas texto (nome do patrocinador). Se o patrocinador foi cadastrado sem logo, o card fica só com texto | Exibir placeholder de logo ou inicial do nome em um avatar | [patrocinadores/page.tsx](file:///d:/Repositorios/OliveiraCarFest/src/app/patrocinadores/page.tsx#L50) |
| **VIS-06** | **Footer muito simples** — Apenas copyright + 2 links (Instagram/TikTok) + créditos. Para um portal "premium" falta substância | Adicionar seções: links rápidos, newsletter, redes sociais com ícones SVG | [Footer.tsx](file:///d:/Repositorios/OliveiraCarFest/src/components/layout/Footer.tsx) |
| **VIS-07** | **Header sem logo de patrocinador do portal** — Na sidebar do portal do expositor aparece "OCF PORTAL" em texto. Poderia usar a logo real | Substituir pelo componente `Image` com a logo | Portal sidebar |
| **VIS-08** | **Admin — Botão deletar sem confirmação** — O ícone de lixeira vermelha em todas as telas do admin deleta direto sem modal de confirmação | Risco de deletar dados acidentalmente | Todas as telas admin |

---

## 5. 🚀 Melhorias para Tornar o Portal Incrível

### 🏆 Prioridade MÁXIMA (Alto impacto, esforço moderado)

| # | Melhoria | Detalhamento | Impacto |
|---|----------|-------------|---------|
| **MELHORIA-01** | **Implementar filtros funcionais** | Adicionar campo `category` na tabela `events` (migration). Converter os botões de filtro em componentes client com state. Filtrar por categoria real em vez de inferir do título | ⭐⭐⭐⭐⭐ |
| **MELHORIA-02** | **Adicionar EDIÇÃO nos CRUDs** | Criar actions `updateEvent()`, `updateSponsor()`. Adicionar botão de editar ao lado do deletar nas tabelas admin. Reutilizar os formulários de criação com dados pré-preenchidos | ⭐⭐⭐⭐⭐ |
| **MELHORIA-03** | **Modal de confirmação para deletar** | Criar um componente `ConfirmDialog` usando Shadcn UI `AlertDialog`. Aplicar em todas as ações destrutivas do admin | ⭐⭐⭐⭐⭐ |
| **MELHORIA-04** | **Substituir dados fictícios por reais** | Remover estatísticas hardcoded (2.5K, 48, 150K). Opção A: Buscar contagens reais do banco. Opção B: Criar seção de "Nosso Primeiro Evento" com countdown + storytelling | ⭐⭐⭐⭐⭐ |
| **MELHORIA-05** | **Prevenir inscrição duplicada** | Adicionar constraint `UNIQUE(car_plate, event_id)` no banco. No server action, verificar existência antes do INSERT e retornar mensagem amigável | ⭐⭐⭐⭐⭐ |

### 🥇 Prioridade ALTA (Diferencial competitivo)

| # | Melhoria | Detalhamento | Impacto |
|---|----------|-------------|---------|
| **MELHORIA-06** | **QR Code no Ticket Virtual** | Usar biblioteca `qrcode` para gerar QR Code dinâmico no ticket com o ID da inscrição. Na entrada do evento, o organizador escaneia para validar. Isso eleva muito o profissionalismo | ⭐⭐⭐⭐⭐ |
| **MELHORIA-07** | **Notificação por WhatsApp** | Ao aprovar/rejeitar expositor, disparar mensagem via WhatsApp API (ou link `wa.me`) para o telefone cadastrado. Pode ser um botão "Notificar" no admin | ⭐⭐⭐⭐ |
| **MELHORIA-08** | **Página de detalhe do Evento rica** | A rota `/eventos/[id]` deveria ser espetacular: banner fullscreen, galeria de fotos do evento, lista de expositores confirmados, mapa com Google Maps embed, botão "Quero Participar" | ⭐⭐⭐⭐ |
| **MELHORIA-09** | **Contador de vagas no formulário de expositor** | Adicionar campo `max_exhibitors` na tabela `events`. No formulário, mostrar "X vagas restantes" em tempo real. Bloquear inscrição quando lotado | ⭐⭐⭐⭐ |
| **MELHORIA-10** | **Footer profissional** | Redesenhar com 4 colunas: Navegação, Redes Sociais (com ícones SVG de Instagram, TikTok, WhatsApp), Newsletter (input de email), Informações legais. Adicionar um gradient sutil na borda superior | ⭐⭐⭐⭐ |

### 🥈 Prioridade MÉDIA (Polish & UX)

| # | Melhoria | Detalhamento | Impacto |
|---|----------|-------------|---------|
| **MELHORIA-11** | **Empty States bonitos** | Quando não há eventos/fotos/patrocinadores, exibir ilustração (pode ser SVG inline ou ícone grande) + texto motivacional + CTA para o admin. Ex: "Nenhum evento ainda — os motores estão esquentando 🏁" | ⭐⭐⭐ |
| **MELHORIA-12** | **Toast notifications** | Usar `sonner` ou `react-hot-toast` para feedback visual ao submeter formulários, aprovar expositores, deletar itens. Atualmente o feedback é apenas inline | ⭐⭐⭐ |
| **MELHORIA-13** | **Campo `address_url` no formulário de criação de evento** | Adicionar campo para que o admin insira o link do Google Maps ao criar o evento. Atualmente é hardcoded como `#` | ⭐⭐⭐ |
| **MELHORIA-14** | **Página de detalhe do Patrocinador** | Clicar no card do patrocinador poderia abrir uma página `/patrocinadores/[id]` com logo grande, descrição, link pro site, redes sociais. Valoriza quem investe | ⭐⭐⭐ |
| **MELHORIA-15** | **Animação de contagem na Home** | Os números (quando reais) poderiam ter animação de "count up" ao entrar na viewport usando Framer Motion | ⭐⭐⭐ |
| **MELHORIA-16** | **Limpar arquivos órfãos no Storage** | Na action `deleteAlbum`, antes de deletar o registro, listar e remover os arquivos do bucket `gallery-images`. O mesmo para `deleteEvent` (banner) e `deleteSponsor` (logo) | ⭐⭐⭐ |

### 🥉 Prioridade BAIXA (Futuro / Nice-to-have)

| # | Melhoria | Detalhamento |
|---|----------|-------------|
| **MELHORIA-17** | **Google Analytics / Meta Pixel** | As variáveis `VITE_GA_ID` e `VITE_META_PIXEL_ID` existem no `.env` mas não são usadas. Implementar tracking para medir engajamento |
| **MELHORIA-18** | **PWA (Progressive Web App)** | Adicionar `manifest.json` e service worker para permitir "instalar" o portal no celular. O expositor abre o ticket direto da home screen |
| **MELHORIA-19** | **Dark/Light mode toggle** | Embora o dark mode seja a identidade, oferecer toggle pode melhorar acessibilidade para quem prefere modo claro |
| **MELHORIA-20** | **Internacionalização (i18n)** | Se o evento crescer, suportar inglês/espanhol com `next-intl` |
| **MELHORIA-21** | **Webhook no Supabase para notificações** | Trigger automático quando um novo expositor se inscreve → notifica admin por email/WhatsApp |
| **MELHORIA-22** | **Dashboard Admin com gráficos** | Usar `recharts` para mostrar inscrições por evento, crescimento de leads, etc. |

---

## 📊 Resumo Executivo

| Área | Nota | Comentário |
|------|------|-----------|
| **🔒 Segurança** | **8.5/10** | Muito bem implementada. Os pontos principais (HMAC, RLS, rate limit, sanitização, headers) estão cobertos. Falta CSP, verificação de role no admin, e o rate limit serverless é uma limitação conhecida |
| **⚙️ Funcionalidade** | **7.0/10** | Core sólido (CRUD, auth, portal, ticket). Pontos fracos: botões sem ação, falta de edição nos CRUDs, filtros decorativos |
| **🧠 Lógica** | **7.5/10** | Arquitetura bem pensada (multi-evento, compressão, ISR). Falhas: categorização por título, dados hardcoded, inscrição duplicada possível |
| **🎨 Visual** | **8.5/10** | Design premium e consistente. Identidade visual forte. Precisa de ajustes em dados fictícios, empty states, e footer |
| **📈 Nota Geral** | **7.9/10** | Portal com fundação muito sólida. Com as melhorias de prioridade máxima e alta implementadas, sobe facilmente para **9.0+** |

---

> [!TIP]
> **Recomendação de execução:** Comece pelas **MELHORIA-01 a 05** (prioridade máxima) que resolvem bugs funcionais e lógicos. Depois implemente **MELHORIA-06 a 10** que são os diferenciais que vão fazer o portal parecer profissional de verdade. O QR Code no ticket (MELHORIA-06) sozinho já transforma a percepção do evento.

> [!IMPORTANT]
> **Sobre os planos gratuitos (Supabase + Vercel):** Todas as melhorias sugeridas são compatíveis com os tiers gratuitos. A única ressalva é a MELHORIA-07 (WhatsApp API) que precisaria de um serviço externo, mas pode ser simplificada com links `wa.me` manuais.

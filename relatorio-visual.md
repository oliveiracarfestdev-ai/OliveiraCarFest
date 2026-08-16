# 🔍 Relatório de Auditoria Visual — OliveiraCarFest

**Data**: 13/08/2026 | **Auditor**: Motor de Engenharia de Software  
**Escopo**: Varredura visual completa de todas as 8 páginas públicas do site.

---

## Resumo

| Severidade | Quantidade |
|---|---|
| 🔴 **Dados fictícios em produção** | 1 |
| 🟠 **Conteúdo placeholder** | 1 |
| 🟡 **Bugs visuais menores** | 2 |

**Total de problemas encontrados: 4**  
**Páginas auditadas: 8** (Home, Eventos, Galeria, Patrocinadores, Sobre, Contato, Expositores, Portal)

---

## Problemas Encontrados

### 1. 🔴 Página de Contato com dados fictícios (Cyberpunk)

**Página:** `/contato`  
**Arquivo:** `src/app/contato/page.tsx`

A página inteira está com textos de placeholder que nunca foram substituídos pelos dados reais do evento:

| Elemento | Valor Atual (Fictício) | O que deveria ser |
|---|---|---|
| Endereço | "Neo-Tokyo Auto District, Sector 4, Block 9" | Endereço real em Guarulhos/SP |
| Telefone | "+81 (0) 3-XXXX-XXXX" (DDI do Japão) | WhatsApp/Telefone real do organizador |
| Email | "comms@oliveiracarfest.com" | Email oficial do evento |
| Label "Sede" | "Sede" | OK (pode manter) |
| Label "Transmissão" | "Transmissão" | "E-mail" |
| Label "Linha Direta" | "Linha Direta" | "WhatsApp" |
| Mapa | Imagem genérica com "Coordenadas Travadas" | Google Maps embed ou imagem real |
| Formulário - campo nome | "Nome Operacional" | "Seu Nome" |
| Formulário - botão | "Transmitir" | "Enviar Mensagem" |
| Formulário - campo mensagem | "Mensagem (Criptografada)" | "Sua Mensagem" |

**Ação necessária:** O cliente precisa fornecer os dados reais para substituição.

**Status:** ⬜ Aguardando dados do cliente

---

### 2. 🟠 Página "Sobre" com equipe fictícia

**Página:** `/sobre`  
**Arquivo:** `src/app/sobre/page.tsx`

A seção "NOSSA EQUIPE" exibe 3 membros com nomes e fotos de placeholder internacionais:

| Nome Atual (Fictício) | Cargo |
|---|---|
| Marcus Vance | Fundador & CEO |
| Elena Rostova | Diretora Criativa |
| Jameson Wright | Chefe de Parcerias |

**Opções de correção:**
1. Substituir pelos nomes, cargos e fotos reais da equipe do Oliveira Car Fest.
2. Remover a seção "Nossa Equipe" completamente, se o cliente preferir não expor os organizadores.

**Ação necessária:** O cliente precisa decidir qual opção prefere e, se for a opção 1, fornecer nomes, cargos e fotos.

**Status:** ⬜ Aguardando decisão do cliente

---

### 3. 🟡 Patrocinadores — Badge de categoria colado ao nome

**Página:** `/patrocinadores`  
**Arquivo:** `src/app/patrocinadores/page.tsx`

No DOM, o texto da categoria do patrocinador (ouro/prata/bronze) está concatenado diretamente ao nome da empresa sem separação. Exemplo na leitura do DOM:

```
"Apex Performanceouro"  →  deveria ser  →  "Apex Performance" + badge "Ouro"
```

**Impacto:**
- Leitores de tela (acessibilidade) leem "Apex Performanceouro" como uma palavra só.
- SEO interpreta como texto sem sentido.
- Visualmente pode parecer ok graças ao CSS, mas a marcação semântica está incorreta.

**Correção:** Garantir que o componente `Badge` tenha um `aria-label` e separação textual adequada (espaço ou elemento `<span>` com `sr-only`).

**Status:** ⬜ Pendente

---

### 4. 🟡 Home Page — Título da Hero sem espaçamento

**Página:** `/` (Home)  
**Arquivo:** `src/app/page.tsx`

Na Hero Section, as palavras do título estão grudadas na leitura do DOM:

```
Atual:    "PRECISÃOENCONTRA PAIXÃO"
Correto:  "PRECISÃO ENCONTRA PAIXÃO"
```

Isso acontece porque os textos estão em `<span>` separados sem espaço entre eles. Visualmente pode parecer ok por causa do CSS de quebra de linha, mas no DOM e para SEO/acessibilidade o texto está errado.

**Correção:** Adicionar um espaço (` `) ou `{' '}` entre os spans do título.

**Status:** ⬜ Pendente

---

## Páginas sem Problemas ✅

| Página | Observações |
|---|---|
| **Eventos** (`/eventos`) | Cards dinâmicos carregando do Supabase, design consistente, botão "Carregar Anteriores" |
| **Galeria** (`/galeria`) | Filtros funcionais, grid de imagens, botão carregar mais |
| **Expositores** (`/expositores`) | Formulário completo e funcional com todos os campos exigidos |
| **Portal** (`/portal`) | Tela de login limpa, link para inscrição, design premium |
| **Header** | Logo, navegação e links "Inscrever-se" e "Portal" visíveis |
| **Footer** | Consistente em todas as páginas, links e redes sociais |
| **Ícones** | Material Symbols carregando corretamente em todas as páginas |

---

## Sugestões de Melhoria (opcionais)

1. **Animações de scroll** — Adicionar efeito fade-in nas seções ao rolar a página (Framer Motion já está instalado no projeto).
2. **Galeria** — O título "Night Runners Gallery" aparece repetido na listagem. Verificar se é bug de renderização ou consequência de ter apenas 1 álbum mockado.
3. **Loading states** — Adicionar esqueletos (skeletons) durante o carregamento das páginas dinâmicas (eventos, galeria, patrocinadores) para melhorar a percepção de velocidade.
4. **Favicon** — Verificar se o favicon atual representa bem a marca (está usando o ícone padrão do Next.js?).

---

*Documento gerado automaticamente pela auditoria visual do Motor de Engenharia de Software.*

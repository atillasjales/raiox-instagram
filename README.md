# 🔬 Raio-X do Instagram — Troppa Digital

Ferramenta de diagnóstico gratuita para geração de leads. Avalia o perfil do Instagram do usuário em 6 módulos e gera um plano de ação personalizado, convertendo em uma oferta de serviços da Troppa Digital.

## Stack

- **Frontend + Backend**: Next.js 14 (App Router)
- **Banco de dados**: Supabase (PostgreSQL)
- **Deploy**: Vercel
- **Email**: Resend
- **UI**: Tailwind CSS + Recharts (gráfico radar)

---

## Configuração

### 1. Clonar e instalar

```bash
git clone <repo>
cd raiox-instagram
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Preencha o `.env.local` com:

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (service_role) |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | Email verificado no Resend (ex: raio-x@seudominio.com) |
| `NEXT_PUBLIC_APP_URL` | URL do seu app (ex: https://raiox.troppadigital.com.br) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número com DDI, sem símbolos (ex: 5581999999999) |

### 3. Configurar o Supabase

No [Supabase SQL Editor](https://app.supabase.com), execute o arquivo:

```
supabase-migration.sql
```

Isso cria as tabelas `leads` e `avaliacoes`, além de views para dashboard.

### 4. Configurar o Resend

1. Acesse [resend.com](https://resend.com) e crie uma conta
2. Adicione e verifique seu domínio (ex: `troppadigital.com.br`)
3. Crie uma API Key e adicione no `.env.local`

### 5. Rodar localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## Deploy no Vercel

### Opção 1 — Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Opção 2 — Via GitHub

1. Faça push para um repositório GitHub
2. Importe no [vercel.com/new](https://vercel.com/new)
3. Configure todas as variáveis de ambiente no painel do Vercel
4. Deploy automático!

**Atenção**: Selecione a região `gru1` (São Paulo) para menor latência.

---

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/page.tsx         # Quiz multi-step
│   ├── resultado/[id]/       # Página de resultado
│   └── api/
│       ├── leads/route.ts    # POST - salva lead no Supabase
│       └── avaliacoes/       # POST - salva avaliação + envia email
├── components/
│   ├── landing/              # HeroSection, LeadModal, etc.
│   ├── quiz/                 # QuizModulo, QuizProgress, QuizIntro
│   └── resultado/            # ResultadoClient (dashboard)
├── lib/
│   ├── quiz-data.ts          # Perguntas, módulos, lógica de scoring
│   ├── diagnostico.ts        # Engine de diagnóstico e recomendações
│   ├── supabase.ts           # Cliente Supabase
│   └── email-template.ts     # Template HTML do email
└── types/index.ts            # TypeScript types
```

---

## Fluxo do usuário

```
1. Landing Page
   ↓ clica no CTA
2. Modal (nome + email + telefone)
   ↓ dados salvos no Supabase (tabela leads)
3. Quiz - 6 módulos × 10 perguntas
   ↓ notas de 1 a 10 por pergunta
4. API processa as notas
   ↓ salva em avaliacoes no Supabase
   ↓ gera diagnóstico com engine própria
   ↓ envia email via Resend
5. Página de Resultado
   - Nota geral (0-10)
   - Gráfico radar por módulo
   - Diagnóstico detalhado por módulo
   - Plano de ação prioritário
   - CTA para WhatsApp (Ativação / Assessoria / Ambos)
```

---

## Personalização

### Alterar preços / descrição dos serviços

Edite `src/components/resultado/ResultadoClient.tsx` — seção "Offer CTA"

### Alterar número do WhatsApp

No arquivo `.env.local`: `NEXT_PUBLIC_WHATSAPP_NUMBER=5581XXXXXXXXX`

### Adicionar/editar perguntas

Edite `src/lib/quiz-data.ts` — array `MODULOS`

### Editar recomendações automáticas

Edite `src/lib/diagnostico.ts` — objeto `RECOMENDACOES`

### Alterar cores/branding

Edite `tailwind.config.js` — seção `colors.brand`

---

## Banco de dados — Tabelas

### `leads`
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid | PK gerado automaticamente |
| nome | text | Nome do lead |
| email | text | Email (unique) |
| telefone | text | Telefone/WhatsApp |
| created_at | timestamptz | Data de criação |

### `avaliacoes`
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid | PK gerado automaticamente |
| lead_id | uuid | FK → leads.id |
| notas | jsonb | Objeto com nota de cada módulo |
| nota_geral | numeric | Média geral (0-10) |
| created_at | timestamptz | Data de criação |

### Views úteis no Supabase
- `v_leads_com_avaliacao` — joins leads com suas avaliações
- `v_stats` — totais e médias gerais

---

Feito com ❤️ por Troppa Digital

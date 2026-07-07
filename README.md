# Fontana — Negócios Imobiliários

Site institucional + painel administrativo da Fontana. Next.js 16 (App
Router) + TypeScript + Tailwind v4 + Supabase (banco, storage de fotos e
autenticação).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** — Postgres, Storage (fotos dos imóveis) e Auth (login do painel)
- **React Hook Form + Zod** — formulários e validação
- **Zustand** — estado global leve
- **TanStack Query** — cache de dados no cliente
- **lucide-react** — ícones

## Estrutura de pastas

```
app/
  (site)/         → grupo de rotas do site público (home, imóveis, imóvel, sobre, contato)
  admin/          → painel administrativo (protegido por login)
components/
  ui/             → componentes de design system (Button, Badge...)
  layout/         → Header, Footer
  property/       → PropertyCard e afins
features/
  home/           → composição da página inicial (Hero, busca, destaques...)
lib/
  supabase/       → clientes Supabase (browser, server, middleware)
  utils.ts        → helpers (formatação de preço, cn...)
services/
  imoveis.ts      → toda a camada de acesso a dados do Supabase
types/
  database.ts     → tipos que espelham o schema do banco
proxy.ts           → middleware de sessão/autenticação (Next.js 16 renomeou middleware.ts → proxy.ts)
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha com as chaves do seu projeto Supabase
npm run dev
```

Acesse http://localhost:3000

## Banco de dados (Supabase)

O schema completo (tabelas, políticas de segurança RLS, bucket de storage
e dados iniciais de tipos de imóvel/características) já está aplicado no
projeto Supabase criado para este site. Se precisar recriar em outro
projeto Supabase do zero, as migrations aplicadas foram:

1. `core_schema` — tabelas principais
2. `rls_policies` — segurança em nível de linha (site lê, só staff logado escreve)
3. `seed_dados_iniciais` — tipos de imóvel e características padrão
4. `storage_bucket_imoveis` — bucket público de fotos + políticas de upload

## Deploy na Vercel

1. Suba este repositório para o GitHub (veja instruções abaixo).
2. Em https://vercel.com/new, importe o repositório.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. A cada push na branch principal, a Vercel publica automaticamente.

## Enviando este projeto para o GitHub

```bash
cd imobiliaria
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

(o repositório local já está inicializado com o primeiro commit)

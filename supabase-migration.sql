-- ============================================================
-- Raio-X do Instagram — Troppa Digital
-- Supabase SQL Migration
-- Execute no Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Leads ───────────────────────────────────────────────────
create table if not exists leads (
  id                  uuid primary key default gen_random_uuid(),
  nome                text not null,
  email               text not null unique,
  telefone            text not null,
  instagram_profile   varchar(255),
  segmento            varchar(255),
  created_at          timestamptz not null default now()
);

-- Index for fast lookups
create index if not exists leads_email_idx on leads(email);
create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_instagram_profile_idx on leads(instagram_profile);

-- ─── Avaliações ──────────────────────────────────────────────
create table if not exists avaliacoes (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references leads(id) on delete cascade,
  notas       jsonb not null,
  nota_geral  numeric(4,2) not null,
  created_at  timestamptz not null default now()
);

create index if not exists avaliacoes_lead_id_idx on avaliacoes(lead_id);
create index if not exists avaliacoes_created_at_idx on avaliacoes(created_at desc);
create index if not exists avaliacoes_nota_geral_idx on avaliacoes(nota_geral);

-- ─── Row Level Security ───────────────────────────────────────
-- Disable RLS for server-side access via service role
alter table leads disable row level security;
alter table avaliacoes disable row level security;

-- ─── Useful views ────────────────────────────────────────────
create or replace view v_leads_com_avaliacao as
  select
    l.id as lead_id,
    l.nome,
    l.email,
    l.telefone,
    l.instagram_profile,
    l.segmento,
    l.created_at as lead_criado_em,
    a.id as avaliacao_id,
    a.nota_geral,
    a.notas,
    a.created_at as avaliacao_criada_em
  from leads l
  left join avaliacoes a on a.lead_id = l.id
  order by l.created_at desc;

-- ─── Dashboard stats view ─────────────────────────────────────
create or replace view v_stats as
  select
    count(distinct l.id) as total_leads,
    count(distinct a.id) as total_avaliacoes,
    round(avg(a.nota_geral), 2) as media_nota_geral,
    count(case when a.nota_geral <= 4 then 1 end) as modo_perdido,
    count(case when a.nota_geral > 4 and a.nota_geral <= 7 then 1 end) as modo_luneta,
    count(case when a.nota_geral > 7 then 1 end) as modo_tesouro
  from leads l
  left join avaliacoes a on a.lead_id = l.id;

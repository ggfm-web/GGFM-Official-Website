-- =============================================================================
-- Green Giant FM — Writeups (Editorial / Blog) Schema Migration
-- Target: Supabase PostgreSQL
-- Idempotent: Safe to run multiple times in the Supabase SQL Editor
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Helper Trigger Function for updated_at
-- -----------------------------------------------------------------------------
create or replace function public.set_writeup_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 2. Categories Table
-- -----------------------------------------------------------------------------
create table if not exists public.writeup_categories (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  accent_color text not null default '#569429',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 3. Authors Table (Decoupled from "Radio Talent" with optional soft link)
-- -----------------------------------------------------------------------------
create table if not exists public.writeup_authors (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  initials text not null,
  role_title text not null,
  pool_name text not null,
  bio text not null default '',
  avatar_url text,
  rt_link text,
  radio_talent_id bigint,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 4. Writeups Table
-- -----------------------------------------------------------------------------
create table if not exists public.writeups (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  subtitle text not null default '',
  excerpt text not null,
  cover_image_url text not null,
  cover_caption text not null default '',
  issue_label text not null default 'ISSUE 01',
  category_id bigint not null references public.writeup_categories(id) on delete restrict,
  author_id bigint not null references public.writeup_authors(id) on delete restrict,
  content_md text not null default '',
  content_blocks jsonb not null default '[]'::jsonb,
  companion_track jsonb,
  reading_time_minutes integer not null default 3 check (reading_time_minutes > 0),
  is_featured boolean not null default false,
  view_count bigint not null default 0 check (view_count >= 0),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'archived')),
  published_at timestamptz,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(subtitle, '') || ' ' || coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content_md, '')), 'C')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint writeups_published_requires_timestamp check (
    status <> 'published' or published_at is not null
  )
);

drop trigger if exists trg_writeups_updated_at on public.writeups;
create trigger trg_writeups_updated_at
  before update on public.writeups
  for each row
  execute function public.set_writeup_updated_at();

-- -----------------------------------------------------------------------------
-- 5. Tags & Join Table
-- -----------------------------------------------------------------------------
create table if not exists public.writeup_tags (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.writeup_tag_links (
  writeup_id bigint not null references public.writeups(id) on delete cascade,
  tag_id bigint not null references public.writeup_tags(id) on delete cascade,
  primary key (writeup_id, tag_id)
);

-- -----------------------------------------------------------------------------
-- 6. Indexes
-- -----------------------------------------------------------------------------
create index if not exists idx_writeups_published_feed
  on public.writeups (published_at desc)
  where status = 'published';

create index if not exists idx_writeups_category_published
  on public.writeups (category_id, published_at desc)
  where status = 'published';

create index if not exists idx_writeups_author_id
  on public.writeups (author_id);

create index if not exists idx_writeups_popular
  on public.writeups (view_count desc)
  where status = 'published';

-- Guarantee at most one published featured cover story at a time
create unique index if not exists idx_writeups_single_featured
  on public.writeups (is_featured)
  where is_featured = true and status = 'published';

create index if not exists idx_writeups_search_vector
  on public.writeups using gin (search_vector);

create index if not exists idx_writeup_tag_links_tag_id
  on public.writeup_tag_links (tag_id);

-- -----------------------------------------------------------------------------
-- 7. Atomic View Increment RPC
-- -----------------------------------------------------------------------------
create or replace function public.increment_writeup_views(target_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  update public.writeups
  set view_count = view_count + 1
  where slug = target_slug
    and status = 'published'
    and published_at <= now()
  returning view_count into new_count;

  return coalesce(new_count, 0);
end;
$$;

revoke all on function public.increment_writeup_views(text) from public;
grant execute on function public.increment_writeup_views(text) to anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 8. Row-Level Security (RLS)
--    Public reads published content only; Admin writes use service_role key.
-- -----------------------------------------------------------------------------
alter table public.writeup_categories enable row level security;
alter table public.writeup_authors enable row level security;
alter table public.writeups enable row level security;
alter table public.writeup_tags enable row level security;
alter table public.writeup_tag_links enable row level security;

drop policy if exists "Public can read writeup categories" on public.writeup_categories;
create policy "Public can read writeup categories"
  on public.writeup_categories
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read active writeup authors" on public.writeup_authors;
create policy "Public can read active writeup authors"
  on public.writeup_authors
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Public can read published writeups" on public.writeups;
create policy "Public can read published writeups"
  on public.writeups
  for select
  to anon, authenticated
  using (status = 'published' and published_at <= now());

drop policy if exists "Public can read writeup tags" on public.writeup_tags;
create policy "Public can read writeup tags"
  on public.writeup_tags
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read tag links of published writeups" on public.writeup_tag_links;
create policy "Public can read tag links of published writeups"
  on public.writeup_tag_links
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.writeups w
      where w.id = writeup_tag_links.writeup_id
        and w.status = 'published'
        and w.published_at <= now()
    )
  );

-- -----------------------------------------------------------------------------
-- 9. Seed Initial Editorial Categories
-- -----------------------------------------------------------------------------
insert into public.writeup_categories (slug, name, description, accent_color, sort_order)
values
  (
    'behind-the-booth',
    'Behind the Booth',
    'Inside Br. Bloemen Hall — studio routines, broadcast tech, and the student crew keeping the stream alive.',
    '#569429',
    1
  ),
  (
    'music-reviews',
    'Music Reviews',
    'Deep listens on OPM releases, campus indie records, and late-night rotation picks from our Audio and RT pools.',
    '#D8CEAE',
    2
  ),
  (
    'live-coverage',
    'Live Coverage',
    'Field dispatches from Taft Avenue gigs, university concerts, and GGFM-hosted stage nights.',
    '#569429',
    3
  ),
  (
    'hitlist-breakdown',
    'Hitlist Breakdown',
    'Bi-weekly chart trajectories, listener voting swings, and the tracks climbing Green Giant FM''s top countdown.',
    '#D8CEAE',
    4
  ),
  (
    'campus-culture',
    'Campus Culture',
    'Essays and observations on student radio, Lasallian soundscapes, and life along Taft.',
    '#569429',
    5
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  accent_color = excluded.accent_color,
  sort_order = excluded.sort_order;

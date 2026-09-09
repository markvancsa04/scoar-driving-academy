-- =====================================================================
--  SCOBAR — CMS schema
--  Run once in the Supabase SQL editor of project ndfhbrfcvbevbiqoawbt.
--  Safe to re-run: every statement is idempotent.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Admin roles (roles NEVER live on a profile table)
-- ---------------------------------------------------------------------
do $$
begin
  create type public.app_role as enum ('admin', 'editor');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.user_roles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "users read own roles" on public.user_roles;
create policy "users read own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  );
$$;

grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated, service_role;

-- Promote an existing account to administrator.
-- Run AFTER the owner has signed up at /auth, e.g.:
--   select public.grant_admin_by_email('scobarautosiskola@gmail.com');
create or replace function public.grant_admin_by_email(_email text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  _uid uuid;
begin
  select id into _uid from auth.users where lower(email) = lower(_email) limit 1;
  if _uid is null then
    return 'No account found for ' || _email || ' — sign up first at /auth.';
  end if;
  insert into public.user_roles (user_id, role) values (_uid, 'admin')
  on conflict (user_id, role) do nothing;
  return 'Admin role granted to ' || _email;
end $$;

revoke execute on function public.grant_admin_by_email(text) from anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. Shared helpers
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------
-- 3. Singleton sections (site settings, hero, about, contact, footer, …)
--    One row per section; `data` mirrors the exact content shape the
--    website renders, with every text stored as {"hu": …, "ro": …}.
-- ---------------------------------------------------------------------
create table if not exists public.cms_sections (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

grant select on public.cms_sections to anon, authenticated;
grant insert, update, delete on public.cms_sections to authenticated;
grant all on public.cms_sections to service_role;
alter table public.cms_sections enable row level security;

drop policy if exists "public reads sections" on public.cms_sections;
create policy "public reads sections"
  on public.cms_sections for select to anon, authenticated using (true);

drop policy if exists "admins write sections" on public.cms_sections;
create policy "admins write sections"
  on public.cms_sections for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists cms_sections_updated_at on public.cms_sections;
create trigger cms_sections_updated_at before update on public.cms_sections
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 4. Media library (files live in Storage, never as base64)
-- ---------------------------------------------------------------------
create table if not exists public.cms_media (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  folder       text not null default 'general',
  alt          jsonb not null default '{"hu":"","ro":""}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   uuid references auth.users(id) on delete set null
);

grant select on public.cms_media to anon, authenticated;
grant insert, update, delete on public.cms_media to authenticated;
grant all on public.cms_media to service_role;
alter table public.cms_media enable row level security;

drop policy if exists "public reads media" on public.cms_media;
create policy "public reads media"
  on public.cms_media for select to anon, authenticated using (true);

drop policy if exists "admins write media" on public.cms_media;
create policy "admins write media"
  on public.cms_media for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists cms_media_updated_at on public.cms_media;
create trigger cms_media_updated_at before update on public.cms_media
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 5. List sections — one table per collection, identical shape
--    (id, slug, sort_order, is_active, data, timestamps)
-- ---------------------------------------------------------------------
do $$
declare
  t text;
  tables text[] := array[
    'cms_navigation',
    'cms_hero_highlights',
    'cms_services',
    'cms_instructors',
    'cms_vehicles',
    'cms_advantages',
    'cms_process_steps',
    'cms_gallery_images',
    'cms_testimonials',
    'cms_faq_items',
    'cms_news_items',
    'cms_social_links'
  ];
begin
  foreach t in array tables loop
    execute format($f$
      create table if not exists public.%1$I (
        id         uuid primary key default gen_random_uuid(),
        slug       text unique,
        sort_order integer not null default 0,
        is_active  boolean not null default true,
        data       jsonb not null default '{}'::jsonb,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now(),
        updated_by uuid references auth.users(id) on delete set null
      );
    $f$, t);

    execute format('grant select on public.%1$I to anon, authenticated;', t);
    execute format('grant insert, update, delete on public.%1$I to authenticated;', t);
    execute format('grant all on public.%1$I to service_role;', t);
    execute format('alter table public.%1$I enable row level security;', t);

    execute format('drop policy if exists "public reads active" on public.%1$I;', t);
    execute format($f$
      create policy "public reads active" on public.%1$I
        for select to anon, authenticated using (is_active);
    $f$, t);

    execute format('drop policy if exists "admins read all" on public.%1$I;', t);
    execute format($f$
      create policy "admins read all" on public.%1$I
        for select to authenticated using (public.has_role(auth.uid(), 'admin'));
    $f$, t);

    execute format('drop policy if exists "admins write" on public.%1$I;', t);
    execute format($f$
      create policy "admins write" on public.%1$I
        for all to authenticated
        using (public.has_role(auth.uid(), 'admin'))
        with check (public.has_role(auth.uid(), 'admin'));
    $f$, t);

    execute format('drop trigger if exists %1$I on public.%2$I;', t || '_updated_at', t);
    execute format($f$
      create trigger %1$I before update on public.%2$I
        for each row execute function public.set_updated_at();
    $f$, t || '_updated_at', t);

    execute format('create index if not exists %1$I on public.%2$I (sort_order);', t || '_sort_idx', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- 6. Storage bucket for administrator-uploaded media
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

drop policy if exists "public reads site media" on storage.objects;
create policy "public reads site media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists "admins upload site media" on storage.objects;
create policy "admins upload site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins update site media" on storage.objects;
create policy "admins update site media"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'))
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins delete site media" on storage.objects;
create policy "admins delete site media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));

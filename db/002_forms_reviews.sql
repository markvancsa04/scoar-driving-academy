-- =====================================================================
--  SCOBAR — visitor submissions (messages, applications, reviews)
--  Run once in the Supabase SQL editor of project ndfhbrfcvbevbiqoawbt,
--  AFTER db/001_cms_schema.sql. Safe to re-run.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Contact messages
-- ---------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,
  phone      text,
  message    text not null,
  language   text not null default 'hu',
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;

drop policy if exists "anyone submits a message" on public.contact_messages;
create policy "anyone submits a message"
  on public.contact_messages for insert to anon, authenticated with check (true);

drop policy if exists "admins read messages" on public.contact_messages;
create policy "admins read messages"
  on public.contact_messages for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins update messages" on public.contact_messages;
create policy "admins update messages"
  on public.contact_messages for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins delete messages" on public.contact_messages;
create policy "admins delete messages"
  on public.contact_messages for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------
-- 2. Course applications
-- ---------------------------------------------------------------------
create table if not exists public.applications (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text,
  phone        text,
  category     text,
  message      text,
  language     text not null default 'hu',
  status       text not null default 'new',
  is_read      boolean not null default false,
  created_at   timestamptz not null default now()
);

grant insert on public.applications to anon, authenticated;
grant select, update, delete on public.applications to authenticated;
grant all on public.applications to service_role;
alter table public.applications enable row level security;

drop policy if exists "anyone applies" on public.applications;
create policy "anyone applies"
  on public.applications for insert to anon, authenticated with check (true);

drop policy if exists "admins read applications" on public.applications;
create policy "admins read applications"
  on public.applications for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins update applications" on public.applications;
create policy "admins update applications"
  on public.applications for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins delete applications" on public.applications;
create policy "admins delete applications"
  on public.applications for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------
-- 3. Visitor reviews — only approved rows are publicly readable
-- ---------------------------------------------------------------------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  location    text,
  text        text not null,
  rating      integer not null default 5 check (rating between 1 and 5),
  language    text not null default 'hu',
  is_approved boolean not null default false,
  created_at  timestamptz not null default now()
);

grant insert on public.reviews to anon, authenticated;
grant select on public.reviews to anon, authenticated;
grant update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;

drop policy if exists "anyone submits a review" on public.reviews;
create policy "anyone submits a review"
  on public.reviews for insert to anon, authenticated
  with check (is_approved = false);

drop policy if exists "public reads approved reviews" on public.reviews;
create policy "public reads approved reviews"
  on public.reviews for select to anon, authenticated using (is_approved);

drop policy if exists "admins read all reviews" on public.reviews;
create policy "admins read all reviews"
  on public.reviews for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins update reviews" on public.reviews;
create policy "admins update reviews"
  on public.reviews for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins delete reviews" on public.reviews;
create policy "admins delete reviews"
  on public.reviews for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index if not exists reviews_approved_idx on public.reviews (is_approved, created_at desc);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
create index if not exists applications_created_idx on public.applications (created_at desc);

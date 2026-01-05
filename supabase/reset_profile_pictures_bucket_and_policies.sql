-- Run in Supabase SQL Editor.
-- Purpose:
--   1) Ensure public.profiles RLS allows each user to read/write ONLY their own row.
-- Notes:
--   - Storage policies for bucket `profile-pictures` are managed in Dashboard.
--   - Recommended storage.objects policies for `profile-pictures` bucket:
--       pp_select_own (SELECT, authenticated): bucket_id='profile-pictures' AND auth.uid()::text = split_part(name,'/',1)
--       pp_insert_own (INSERT, authenticated): bucket_id='profile-pictures' AND auth.uid()::text = split_part(name,'/',1)
--       pp_delete_own (DELETE, authenticated): bucket_id='profile-pictures' AND auth.uid()::text = split_part(name,'/',1)
--
-- NOTE:
-- If your app times out before you see any /rest/v1 or /storage/v1 object requests in the browser Network tab,
-- that is NOT an RLS/policy issue. It indicates the client requests aren't leaving the browser (transport/fetch/proxy/extension issue).

begin;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_delete_own"
on public.profiles
for delete
using (auth.uid() = id);

commit;

-- NOTE:
-- The app may call PostgREST (/rest/v1) and Storage (/storage/v1/object/...) directly via fetch using the session access token.
-- RLS policies above + Storage bucket/object policies must allow the authenticated user’s own row/object.

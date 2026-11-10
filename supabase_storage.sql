-- Supabase SQL Editor에서 한 번 실행하세요. 기존 상품/관리자 테이블은 유지합니다.
-- 공개 버킷의 이미지는 URL을 아는 누구나 볼 수 있으므로 상품 사진만 올리세요.
begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "figroom_admin_image_insert" on storage.objects;
create policy "figroom_admin_image_insert"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'product-images'
  and exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  )
);

commit;

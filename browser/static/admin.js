const db = window.FigroomDB;
const el = selector => document.querySelector(selector);
const form = el('#product-form');
let items = [], editing = null, busy = false;

function message(text, error = false) { el('#message').textContent = text; el('#message').classList.toggle('error', error); }
function lock(value) {
  busy = value;
  document.querySelectorAll('button,input,select,textarea').forEach(node => { node.disabled = value; });
}
function resetForm() {
  editing = null; form.reset(); el('#form-title').textContent = '새 상품 추가';
}
function showLogin() { el('#login-panel').hidden = false; el('#admin-panel').hidden = true; resetForm(); }
async function requireAdmin() {
  if (!await db.isAdmin()) throw new Error('이 계정에는 관리자 권한이 없습니다.');
}
async function load() {
  await requireAdmin();
  items = await db.products(true);
  el('#login-panel').hidden = true; el('#admin-panel').hidden = false;
  el('#seed-panel').hidden = items.length !== 0;
  el('#product-count').textContent = `전체 ${items.length}개 · 공개 ${items.filter(p => p.is_published).length}개`;
  el('#product-list').innerHTML = items.length ? items.map(p => `
    <article class="admin-row"><h3>${db.escape(p.name)}</h3>
    <p>${Number(p.price).toLocaleString('ko-KR')}원 · ${db.escape(p.category)} · ${p.is_published ? '공개' : '숨김'}${p.is_sold_out ? ' · 품절' : ''}</p>
    <button data-edit="${p.id}">수정</button><button data-delete="${p.id}">삭제</button></article>
  `).join('') : '<p>등록된 상품이 없습니다.</p>';
}
async function run(task) {
  if (busy) return;
  lock(true); message('처리 중입니다…');
  try { await task(); }
  catch (error) {
    message(error.message || '요청을 처리하지 못했습니다.', true);
    if (!db.hasSession() || error.status === 401) {
      try { await db.logout(); } catch { /* Local session is cleared. */ }
      showLogin();
    }
  } finally { lock(false); }
}

el('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  run(async () => {
    try {
      await db.login(el('#email').value.trim(), el('#password').value);
      await load(); message('로그인했습니다.');
    } catch (error) {
      try { await db.logout(); } catch { /* Clear session even when offline. */ }
      showLogin();
      throw new Error(error.status === 400 ? '이메일과 비밀번호를 확인해주세요.' : error.message);
    } finally { el('#password').value = ''; }
  });
});
el('#logout').addEventListener('click', () => run(async () => {
  try { await db.logout(); message('로그아웃했습니다.'); }
  finally { items = []; el('#product-list').replaceChildren(); showLogin(); }
}));
el('#refresh').addEventListener('click', () => run(async () => { await load(); message('상품 목록을 새로 불러왔습니다.'); }));
el('#cancel-edit').addEventListener('click', resetForm);

el('#product-list').addEventListener('click', event => {
  if (busy) return;
  const edit = event.target.closest('[data-edit]');
  if (edit) {
    const item = items.find(p => p.id === Number(edit.dataset.edit));
    resetForm(); editing = item.id;
    for (const field of form.elements) {
      if (!field.name) continue;
      if (field.type === 'checkbox') field.checked = Boolean(item[field.name]);
      else field.value = item[field.name] ?? '';
    }
    el('#form-title').textContent = '상품 수정'; form.scrollIntoView({ block: 'start' });
  }
  const remove = event.target.closest('[data-delete]');
  if (remove) {
    const item = items.find(p => p.id === Number(remove.dataset.delete));
    if (!confirm(`“${item.name}” 상품을 삭제할까요? 삭제하면 복구할 수 없습니다.`)) return;
    run(async () => {
      const result = await db.request(`/rest/v1/products?id=eq.${item.id}`, { method: 'DELETE', headers: { Prefer: 'return=representation' } });
      if (result.length !== 1) throw new Error('삭제되지 않았습니다. 관리자 권한과 상품 상태를 확인해주세요.');
      if (editing === item.id) resetForm();
      await load(); message('상품을 삭제했습니다.');
    });
  }
});

async function upload(file) {
  const types = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  if (!types[file.type] || file.size > 5 * 1024 * 1024 || !file.size) throw new Error('이미지는 JPG·PNG·WebP 형식, 5MB 이하로 선택해주세요.');
  const name = `${crypto.randomUUID()}.${types[file.type]}`;
  try {
    await db.request(`/storage/v1/object/product-images/${name}`, { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
  } catch (error) {
    throw new Error(`이미지 업로드 실패: ${error.message}. Storage 설정 SQL 실행 여부를 확인해주세요.`);
  }
  return `https://kaobzowjbgooffnulybz.supabase.co/storage/v1/object/public/product-images/${name}`;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  // Read before run() disables form fields.
  const values = new FormData(form);
  const file = el('#image-file').files[0];
  run(async () => {
    const payload = {};
    for (const key of ['name', 'series', 'category', 'scale', 'description', 'badge', 'kind', 'color']) payload[key] = String(values.get(key) || '').trim();
    payload.price = Number(values.get('price'));
    if (!payload.name || !Number.isInteger(payload.price) || payload.price < 0 || payload.price > 2147483647) throw new Error('상품명과 올바른 정수 가격을 입력해주세요.');
    payload.is_published = values.has('is_published'); payload.is_sold_out = values.has('is_sold_out');
    const image = String(values.get('image_url') || '').trim();
    if (image && !db.imageUrl(image)) throw new Error('이미지 URL은 https://로 시작해야 합니다.');
    payload.image_url = image || null;
    if (file) {
      payload.image_url = await upload(file);
      // Keep uploaded URL on retry if the subsequent product save fails.
      form.elements.namedItem('image_url').value = payload.image_url; el('#image-file').value = '';
    }
    const result = await db.request(`/rest/v1/products${editing === null ? '' : `?id=eq.${editing}`}`, {
      method: editing === null ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(payload),
    });
    if (result.length !== 1) throw new Error('저장되지 않았습니다. 관리자 권한을 확인해주세요.');
    resetForm(); await load(); message('저장했습니다. 스토어를 새로고침하면 반영됩니다.');
  });
});

el('#seed').addEventListener('click', () => run(async () => {
  await load();
  if (items.length) throw new Error('이미 상품이 있습니다. 초기 상품 등록은 빈 목록에서만 가능합니다.');
  const response = await fetch('./products.json');
  if (!response.ok) throw new Error('초기 상품 파일을 불러오지 못했습니다.');
  const initial = (await response.json()).map(({ id, ...product }) => ({ ...product, is_published: true }));
  const saved = await db.request('/rest/v1/products', { method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(initial) });
  if (saved.length !== initial.length) throw new Error('초기 상품 등록 결과를 확인해주세요.');
  await load(); message('기존 상품 6개를 등록했습니다.');
}));

if (db.hasSession()) run(async () => {
  try { await load(); message('관리자 계정으로 접속했습니다.'); }
  catch (error) { try { await db.logout(); } catch {} showLogin(); throw error; }
});

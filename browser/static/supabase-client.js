/* Publishable key only. Database RLS decides who may read/write each row. */
window.FigroomDB = (() => {
  const url = 'https://kaobzowjbgooffnulybz.supabase.co';
  const key = 'sb_publishable_LD2YQDxwVrcSd81B1HVasw_YLdrQl7h';
  const storageKey = 'figroom-admin-session';
  let session = null, refreshing = null;
  try { session = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); } catch { /* Require login. */ }

  function save(value) {
    session = value;
    try {
      if (value) sessionStorage.setItem(storageKey, JSON.stringify(value));
      else sessionStorage.removeItem(storageKey);
    } catch { /* This tab can still use its in-memory session. */ }
  }

  async function raw(path, options = {}, token = null) {
    const headers = { apikey: key, ...options.headers };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(url + path, { ...options, headers });
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (!response.ok) {
      const error = new Error(data?.msg || data?.message || data?.error_description || data?.error || `요청 실패 (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  async function token() {
    if (!session?.access_token) throw new Error('관리자 로그인이 필요합니다.');
    if (session.expires_at * 1000 > Date.now() + 60000) return session.access_token;
    if (!refreshing) {
      refreshing = raw('/auth/v1/token?grant_type=refresh_token', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
      }).then(data => {
        save({ ...data, expires_at: Math.floor(Date.now() / 1000) + data.expires_in });
        return data.access_token;
      }).catch(error => { save(null); throw error; }).finally(() => { refreshing = null; });
    }
    return refreshing;
  }

  async function request(path, options = {}, authenticated = true) {
    return raw(path, options, authenticated ? await token() : null);
  }

  async function login(email, password) {
    const data = await raw('/auth/v1/token?grant_type=password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    save({ ...data, expires_at: Math.floor(Date.now() / 1000) + data.expires_in });
    return data.user;
  }

  async function logout() {
    try { if (session) await request('/auth/v1/logout?scope=local', { method: 'POST' }); }
    finally { save(null); }
  }

  async function isAdmin() {
    // auth.uid() in RLS restricts this query to the signed-in user's own row.
    const rows = await request('/rest/v1/admin_users?select=user_id');
    return rows.length > 0;
  }

  async function products(admin = false) {
    const rows = [];
    for (let offset = 0; ; offset += 1000) {
      const page = await request(`/rest/v1/products?select=*&order=id.asc&limit=1000&offset=${offset}${admin ? '' : '&is_published=eq.true'}`, {}, admin);
      rows.push(...page);
      if (page.length < 1000) return rows;
    }
  }

  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  function imageUrl(value) {
    if (!value) return '';
    try { const parsed = new URL(value); return parsed.protocol === 'https:' ? parsed.href : ''; } catch { return ''; }
  }

  return { request, login, logout, isAdmin, products, escape, imageUrl, hasSession: () => Boolean(session?.access_token) };
})();

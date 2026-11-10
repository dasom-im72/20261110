// All artwork is local SVG; the shop works without external image services.
function figure(kind, suffix = 'default') {
  const id = `g-${kind}-${suffix}`;
  const defs = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eff6e8"/><stop offset=".5" stop-color="#a2beb0"/><stop offset="1" stop-color="#608c7c"/></linearGradient><linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#51615a"/><stop offset=".5" stop-color="#1e2d2b"/><stop offset="1" stop-color="#101c1d"/></linearGradient></defs>`;
  let shape;
  if (kind === 'astronaut') shape = `<ellipse cx="150" cy="331" rx="88" ry="13" fill="#566851" opacity=".17"/><rect x="83" y="141" width="134" height="120" rx="31" fill="#6b8e7c"/><path d="M109 241l-10 59q-8 24 18 25h24l7-86M162 239l-1 70q0 17 23 17h20q17-4 9-20l-19-68" fill="url(#${id})" stroke="#729687" stroke-width="2"/><path d="M95 161Q67 164 62 203l-8 41q2 19 22 20 16-2 19-18l16-63M202 160q26 1 33 34l14 40q5 19-13 24-17 4-24-15l-18-54" fill="url(#${id})" stroke="#7b9e8c" stroke-width="2"/><path d="M104 157q41-20 89 0l6 88q-46 24-99 0z" fill="url(#${id})"/><rect x="126" y="183" width="50" height="45" rx="9" fill="#dce6cf" stroke="#749782" stroke-width="3"/><rect x="136" y="192" width="30" height="10" rx="2" fill="#536e5e"/><circle cx="139" cy="214" r="3" fill="#f96c3d"/><circle cx="151" cy="214" r="3" fill="#c1b86d"/><path d="M100 245h96M112 263l26 2M168 264l29-2" stroke="#648775" stroke-width="7"/><ellipse cx="148" cy="111" rx="76" ry="77" fill="url(#${id})" stroke="#7d9c8b" stroke-width="2"/><rect x="70" y="93" width="16" height="43" rx="7" fill="#a8bda5"/><rect x="212" y="93" width="16" height="43" rx="7" fill="#759381"/><path d="M91 105q4-44 57-44t58 44v20q-5 37-58 38-54-1-57-38z" fill="url(#${id}-glass)" stroke="#d6dfc7" stroke-width="7"/><path d="M104 103q7-25 37-28" stroke="#a8bfb0" opacity=".45" stroke-width="8" stroke-linecap="round"/><path d="M114 171q31 13 66 0" stroke="#dce5cf" stroke-width="8"/><circle cx="188" cy="83" r="5" fill="#f7f3d0" opacity=".7"/><path d="M104 312h34M171 312h33" stroke="#547a67" stroke-width="6"/>`;
  else if (kind === 'forest') shape = `<ellipse cx="150" cy="325" rx="82" ry="12" fill="#7b6d38" opacity=".15"/><path d="M94 269l-8 39q2 18 28 14l27-23M164 299l25 23q27 3 25-15l-11-38" fill="#ad975d"/><ellipse cx="150" cy="228" rx="77" ry="78" fill="#c6b67b"/><ellipse cx="150" cy="241" rx="50" ry="54" fill="#eee4b7"/><path d="M85 191q-32 12-26 55 8 13 23 0M214 191q31 12 26 55-8 13-23 0" fill="#b5a368"/><path d="M95 92q-25-57-1-61 25 8 33 49M174 79q12-52 32-47 21 12-4 62" fill="#9e9157"/><path d="M82 103q68-66 137 0l4 61q-3 59-72 59-72 0-74-59z" fill="#bfc183"/><ellipse cx="150" cy="161" rx="58" ry="43" fill="#eee7bc"/><ellipse cx="123" cy="151" rx="6" ry="9" fill="#393e2c"/><ellipse cx="177" cy="151" rx="6" ry="9" fill="#393e2c"/><path d="M144 166q6 7 12 0M150 172v6" fill="none" stroke="#646244" stroke-width="3"/><ellipse cx="109" cy="173" rx="10" ry="5" fill="#d7ac88"/><ellipse cx="191" cy="173" rx="10" ry="5" fill="#d7ac88"/><path d="M137 84q-17-38 12-51 26 16 9 48" fill="#6c8860"/><path d="M150 76l-1-31" stroke="#a5b484" stroke-width="3"/>`;
  else if (kind === 'cat') shape = `<ellipse cx="150" cy="326" rx="84" ry="12" fill="#986f70" opacity=".15"/><path d="M207 246q71 16 44-39-15-22-25 0" fill="none" stroke="#d09c92" stroke-width="19" stroke-linecap="round"/><ellipse cx="150" cy="247" rx="64" ry="65" fill="#deb3a5"/><ellipse cx="150" cy="254" rx="39" ry="43" fill="#f8e6d2"/><ellipse cx="113" cy="309" rx="29" ry="15" fill="#d09c92"/><ellipse cx="184" cy="309" rx="29" ry="15" fill="#d09c92"/><path d="M84 122L78 46q1-17 17-7l49 39h22l44-39q17-12 17 8l-6 80" fill="#e2b7ab"/><path d="M94 91l-3-33 30 28M187 85l26-27-3 36" fill="#bb7e7d"/><ellipse cx="151" cy="147" rx="86" ry="73" fill="#e8c3b4"/><path d="M102 144q10-12 20 0M179 144q10-12 20 0" fill="none" stroke="#5c4844" stroke-width="5" stroke-linecap="round"/><path d="M143 159l8 7 8-7" fill="#a86b69"/><path d="M151 166q-8 16-18 6M151 166q8 16 18 6" fill="none" stroke="#795754" stroke-width="3"/><path d="M76 160l26 5M77 177l24-2M203 165l24-5M204 175l23 2" stroke="#b8887e" stroke-width="3"/><path d="M130 214l21 14 20-14" fill="none" stroke="#f2dfcc" stroke-width="9"/><circle cx="151" cy="229" r="8" fill="#bf9859"/>`;
  else shape = `<ellipse cx="150" cy="333" rx="90" ry="12" fill="#5d526c" opacity=".15"/><path d="M109 237l-14 67-15 16h56l10-78M167 240l6 80h57l-17-17-13-66" fill="#635d79" stroke="#414153" stroke-width="3"/><path d="M110 276h29M174 277h32" stroke="#b0a1c4" stroke-width="11"/><path d="M98 156l-30 8-24 71 26 17 35-61M201 157l31 8 25 72-28 16-31-64" fill="#858099" stroke="#4d4a63" stroke-width="3"/><path d="M92 158l58-22 61 22-14 91h-94z" fill="#a79bbd" stroke="#655c79" stroke-width="3"/><path d="M105 169l46 31 47-31-12 48h-69z" fill="#45485c"/><path d="M130 180h39l-19 19z" fill="#edaa76"/><path d="M114 226h73" stroke="#ddc3d9" stroke-width="7"/><path d="M106 78l44-22 44 22 13 56-31 21h-51l-33-21z" fill="#a79bbd" stroke="#655c79" stroke-width="3"/><path d="M107 91l43 14 45-14-10 37-34 14-35-13z" fill="#333a4c"/><path d="M117 109l25 6M158 115l25-6" stroke="#f4ac70" stroke-width="5"/><path d="M130 145l20-16 20 16" fill="#d7c8da"/><path d="M105 83L86 41l40 36M175 76l39-36-17 47" fill="#decbd9" stroke="#655c79" stroke-width="3"/><path d="M57 202l19 8M226 210l18-8" stroke="#d2b5cf" stroke-width="12"/>`;
  return `<svg viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${shape}</svg>`;
}

const escapeHTML = window.FigroomDB.escape;
const $ = (selector) => document.querySelector(selector);
const money = (number) => number.toLocaleString('ko-KR') + '원';
let products = [], filter = '전체';
let cart = {};
try { const stored = JSON.parse(localStorage.getItem('figroom-cart') || '{}'); if (stored && typeof stored === 'object' && !Array.isArray(stored)) cart = Object.fromEntries(Object.entries(stored).filter(([id, quantity]) => /^\d+$/.test(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99)); } catch { /* Fresh cart when storage is unavailable. */ }
let toastTimer;
$('#hero-figure').innerHTML = figure('astronaut', 'hero');
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2400); }
function updateCart() {
  try { localStorage.setItem('figroom-cart', JSON.stringify(cart)); } catch { /* Session-only cart. */ }
  const entries = products.filter(p => cart[p.id] && !p.is_sold_out);
  $('#cart-count').textContent = entries.reduce((sum, p) => sum + cart[p.id], 0);
  $('#cart-items').innerHTML = entries.length ? entries.map(p => `<div class="cart-row"><div><b>${escapeHTML(p.name)}</b><small>${money(p.price)}</small></div><div class="quantity"><button data-quantity="${p.id}" data-change="-1" aria-label="${escapeHTML(p.name)} 수량 줄이기">−</button><span>${cart[p.id]}</span><button data-quantity="${p.id}" data-change="1" aria-label="${escapeHTML(p.name)} 수량 늘리기">+</button></div></div>`).join('') : '<p class="empty">아직 장바구니가 비어 있어요.<br>마음에 드는 작은 우주를 담아보세요.</p>';
  $('#cart-total').textContent = money(entries.reduce((sum, p) => sum + p.price * cart[p.id], 0));
}
function add(id) { if (!products.some(p => p.id === id && !p.is_sold_out)) return; cart[id] = Math.min((cart[id] || 0) + 1, 99); updateCart(); toast('장바구니에 담았어요. 작은 행복 하나 추가!'); }
function render() {
  const query = $('#search').value.trim().toLowerCase();
  let items = products.filter(p => (filter === '전체' || (filter === '예약' ? p.badge === 'PRE-ORDER' : filter === '신상품' ? p.badge === 'NEW' : p.category === filter)) && `${escapeHTML(p.name)} ${escapeHTML(p.series)}`.toLowerCase().includes(query));
  if ($('#sort').value !== 'featured') items.sort((a, b) => $('#sort').value === 'low' ? a.price - b.price : b.price - a.price);
  $('#products').classList.toggle('filtered', filter !== '전체' || !!query || $('#sort').value !== 'featured');
  $('#products').innerHTML = items.length ? items.map(p => `<article class="product-card"><button class="product-image ${p.color}" data-detail="${p.id}" aria-label="${escapeHTML(p.name)} 상세 보기">${p.badge ? `<span class="badge ${p.badge === 'PRE-ORDER' ? 'preorder' : ''}">${escapeHTML(p.badge)}</span>` : ''}${productArt(p, p.id)}</button><p class="series">${escapeHTML(p.series)}</p><h3>${escapeHTML(p.name)}</h3><p class="price">${p.price.toLocaleString('ko-KR')}${p.is_sold_out ? ' (SOLD OUT)' : ''}<span>원</span></p><button class="add" data-add="${p.id}" ${p.is_sold_out ? 'disabled' : ''} aria-label="${escapeHTML(p.name)} 장바구니에 담기">+</button></article>`).join('') : '<p class="empty">검색 결과가 없어요. 다른 검색어를 입력해 보세요.</p>';
}
function setFilter(value) { filter = value; document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b.dataset.filter === value); b.setAttribute('aria-pressed', String(b.dataset.filter === value)); }); render(); }
document.addEventListener('click', event => {
  const addButton = event.target.closest('[data-add]'); if (addButton) add(Number(addButton.dataset.add));
  const filterButton = event.target.closest('[data-filter]'); if (filterButton) setFilter(filterButton.dataset.filter);
  const nav = event.target.closest('[data-nav]'); if (nav) setFilter(nav.dataset.nav === 'new' ? '신상품' : '예약');
  const detail = event.target.closest('[data-detail]');
  if (detail) { const p = products.find(p => p.id === Number(detail.dataset.detail)); $('#product-detail').innerHTML = `<div class="detail-art ${p.color}">${productArt(p, 'detail')}</div><div class="detail-copy"><p class="series">${escapeHTML(p.series)}</p><h2 id="detail-title">${escapeHTML(p.name)}</h2><p>${escapeHTML(p.scale)} · ${escapeHTML(p.category)}</p><p>${money(p.price)}</p><p class="demo-note">${p.badge === 'PRE-ORDER' ? '예약 상품 예시입니다. 출시 일정은 정해져 있지 않습니다.' : '나만의 공간에 작은 즐거움을 더하는 컬렉터블 피규어입니다.'}</p><p>${escapeHTML(p.description || '')}</p><button class="button dark" data-add="${p.id}" ${p.is_sold_out ? 'disabled' : ''}>장바구니에 담기 <span>+</span></button></div>`; $('#product-dialog').showModal(); }
  const quantity = event.target.closest('[data-quantity]'); if (quantity) { const id = quantity.dataset.quantity; cart[id] = Math.min(99, (cart[id] || 0) + Number(quantity.dataset.change)); if (cart[id] <= 0) delete cart[id]; updateCart(); }
  if (event.target.closest('[data-close]')) event.target.closest('dialog').close();
});
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } }));
$('#cart-open').addEventListener('click', () => { updateCart(); $('#cart-dialog').showModal(); });
$('#search-toggle').addEventListener('click', () => { $('#search-panel').hidden = !$('#search-panel').hidden; if (!$('#search-panel').hidden) { $('#collection').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); $('#search').focus({ preventScroll: true }); } });
$('#search').addEventListener('input', render);
$('#sort').addEventListener('change', render);
function productArt(product, suffix) {
  const image = window.FigroomDB.imageUrl(product.image_url);
  return image ? `<img class="product-photo" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)}" loading="lazy" referrerpolicy="no-referrer">` : figure(product.kind, suffix);
}

async function init() {
  try {
    const rows = await window.FigroomDB.products();
    products = rows.map(p => ({
      ...p,
      color: ['mint', 'yellow', 'purple', 'pink', 'blue'].includes(p.color) ? p.color : 'mint',
      kind: ['astronaut', 'forest', 'cat', 'robot'].includes(p.kind) ? p.kind : 'astronaut',
    })).filter(p => Number.isSafeInteger(p.id) && Number.isInteger(p.price) && p.price >= 0);
    cart = Object.fromEntries(Object.entries(cart).filter(([id]) => products.some(p => p.id === Number(id) && !p.is_sold_out)));
    const count = document.querySelector('[data-filter] span');
    if (count) count.textContent = String(products.length).padStart(2, '0');
    setFilter('전체'); updateCart();
  } catch {
    $('#products').innerHTML = '<p class="empty">상품을 불러오지 못했어요. 잠시 후 새로고침해 주세요.</p>';
  }
}
init();

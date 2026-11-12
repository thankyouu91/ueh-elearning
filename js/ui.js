// Small rendering helpers and shared UI primitives (no state mutations here).

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const icon = (name, cls = '') => `<i data-lucide="${name}" class="ic ${cls}" aria-hidden="true"></i>`;
export const initials = (name) => name.replace(/^(Dr\.|Prof\.)\s+/, '').split(/\s+/).map(p => p[0]).slice(-2).join('').toUpperCase();
export const avatar = (u, size = '') => `<span class="avatar ${size}" title="${esc(u?.name)}">${esc(initials(u?.name || '?'))}</span>`;

export const STATUS = {
  draft: ['Draft', 'neutral'], submitted: ['Submitted', 'info'], changes_requested: ['Changes requested', 'warn'],
  rejected: ['Rejected', 'danger'], approved: ['Approved', 'accent'], scheduled: ['Scheduled', 'accent'],
  published: ['Published', 'ok'], open: ['Open', 'ok'], closed: ['Closed', 'neutral'], graded: ['Graded', 'ok'],
  missing: ['Missing', 'danger'], awaiting_grade: ['Awaiting grade', 'warn'], at_risk: ['At risk', 'danger'],
  on_track: ['On track', 'ok'], live: ['Live', 'danger'], provisional: ['Provisional', 'neutral'],
};
export const badge = (key, label) => {
  const TONES = ['ok', 'warn', 'danger', 'info', 'accent', 'neutral'];
  const [text, tone] = STATUS[key] || [key, TONES.includes(key) ? key : 'neutral'];
  return `<span class="badge b-${tone}">${esc(label || text)}</span>`;
};

export const TYPE_META = {
  theory: { label: 'Theory', icon: 'book-open' }, vocabulary: { label: 'Vocabulary', icon: 'languages' },
  simulation: { label: 'Simulation', icon: 'chart-spline' }, case_study: { label: 'Case discussion', icon: 'messages-square' },
  quiz: { label: 'Practice check', icon: 'list-checks' }, calculation: { label: 'Worked problem', icon: 'calculator' },
  material: { label: 'Textbook extract', icon: 'book-marked' }, resource: { label: 'Library resource', icon: 'paperclip' },
  page: { label: 'Page', icon: 'layout-panel-top' },
};
export const ASSESS_META = {
  quiz: { label: 'Quiz', icon: 'list-checks' }, unit_test: { label: 'Unit test', icon: 'file-check-2' },
  workshop: { label: 'Case report', icon: 'file-text' }, midterm: { label: 'Midterm', icon: 'file-badge' }, final: { label: 'Final', icon: 'award' },
};

export function kpi({ label, value, sub = '', iconName, tone = '' }) {
  return `<div class="card kpi ${tone ? 'kpi-' + tone : ''}">
    <div class="kpi-top"><span class="kpi-label">${esc(label)}</span>${iconName ? `<span class="kpi-icon">${icon(iconName)}</span>` : ''}</div>
    <div class="kpi-value">${value}</div>
    <div class="kpi-sub">${sub}</div>
  </div>`;
}

export function card({ title, subtitle = '', actions = '', body, cls = '', flush = false, id = '' }) {
  return `<section class="card ${cls}" ${id ? `id="${id}"` : ''}>
    ${title ? `<header class="card-head"><div><h3>${title}</h3>${subtitle ? `<p class="muted">${subtitle}</p>` : ''}</div><div class="row gap-2">${actions}</div></header>` : ''}
    <div class="${flush ? 'card-flush' : 'card-body'}">${body}</div>
  </section>`;
}

export const empty = (iconName, title, text = '', action = '') => `<div class="empty">${icon(iconName)}<strong>${esc(title)}</strong>${text ? `<p>${esc(text)}</p>` : ''}${action}</div>`;

export const progress = (pct, tone = '') => `<div class="progress ${tone}" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${Math.max(0, Math.min(100, pct))}%"></span></div>`;

export const pageHead = (title, sub = '', actions = '') => `<div class="page-head"><div><h1>${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ''}</div><div class="row gap-2 wrap">${actions}</div></div>`;

export const subjectChip = (s, key) => `<span class="subj subj-${esc(key)}">${esc(s.subjects[key]?.short || key)}</span>`;

export const scoreText =(v) => (v === null || v === undefined ? '<span class="muted">—</span>' : `<strong class="${v < 5 ? 't-danger' : ''}">${v.toFixed(1)}</strong>`);

/* ---------- toast ---------- */
export function toast(message, tone = 'ok') {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast t-${tone}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `${icon(tone === 'danger' ? 'circle-alert' : tone === 'warn' ? 'triangle-alert' : 'circle-check')}<span>${esc(message)}</span>`;
  root.appendChild(el);
  window.lucide?.createIcons();
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 250); }, 3600);
}

/* ---------- modal & drawer ---------- */
let onCloseCb = null;
let covered = null; // scroll position and field values of a page's drawer that another modal replaced
export function openModal(html, { wide = false, drawer = false, onClose = null } = {}) {
  const root = document.getElementById('modal-root');
  const prev = root.querySelector('[role=dialog][data-route]');
  if (prev) covered = { scroll: prev.scrollTop, values: [...prev.querySelectorAll('input, textarea, select')].map(e => e.value) };
  onCloseCb = onClose;
  root.innerHTML = `<div class="overlay" data-action="modal-close"></div>
    <div class="${drawer ? 'drawer' : 'modal'} ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">${html}</div>`;
  root.classList.add('open');
  window.lucide?.createIcons();
  setTimeout(() => root.querySelector('[autofocus], input, textarea, select, button.btn-primary')?.focus({ preventScroll: true }), 30);
}
export function closeModal() {
  const root = document.getElementById('modal-root');
  if (!root.classList.contains('open')) return;
  const closed = root.querySelector('[role=dialog]');
  root.classList.remove('open');
  root.innerHTML = '';
  const cb = onCloseCb; onCloseCb = null;
  cb?.();
  closeHook?.(closed);
}
/** Puts a reopened drawer back where the user left it: same scroll position, same typed text. */
export function restoreCovered(el) {
  if (!covered || !el) return;
  const fields = [...el.querySelectorAll('input, textarea, select')];
  covered.values.forEach((v, i) => { if (fields[i] && fields[i].type !== 'file') fields[i].value = v; });
  el.scrollTop = covered.scroll; covered = null;
}
let closeHook = null;
/** Called with the closed dialog element after any modal closes (the shell uses it for URLs that open a drawer). */
export const setCloseHook = (fn) => { closeHook = fn; };
export const isModalOpen = () => document.getElementById('modal-root')?.classList.contains('open');

export const modalHead = (title, sub = '') => `<header class="modal-head"><div><h2>${title}</h2>${sub ? `<p class="muted">${sub}</p>` : ''}</div><button class="btn btn-ghost btn-icon" data-action="modal-close" aria-label="Close">${icon('x')}</button></header>`;

export function confirmDialog({ title, body, confirmLabel = 'Confirm', tone = 'primary' }) {
  return new Promise(resolve => {
    let done = false;
    const finish = (v) => { if (!done) { done = true; resolve(v); } };
    openModal(`${modalHead(title)}<div class="modal-body">${body}</div>
      <footer class="modal-foot"><button class="btn btn-ghost" data-action="modal-close">Cancel</button>
      <button class="btn btn-${tone}" id="confirm-ok">${esc(confirmLabel)}</button></footer>`, { onClose: () => finish(false) });
    document.getElementById('confirm-ok').addEventListener('click', () => { finish(true); closeModal(); });
  });
}

/* ---------- charts ---------- */
let charts = [];
export function destroyCharts() { charts.forEach(c => c.destroy()); charts = []; }
export function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
export function makeChart(canvasId, config) {
  const el = document.getElementById(canvasId);
  if (!el || !window.Chart) return null;
  const Chart = window.Chart;
  Chart.defaults.font.family = cssVar('--font');
  Chart.defaults.font.size = 12;
  Chart.defaults.color = cssVar('--text-2');
  Chart.defaults.borderColor = cssVar('--border');
  const c = new Chart(el, config);
  charts.push(c);
  return c;
}

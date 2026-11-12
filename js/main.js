import { load, getState, subscribe, resetDemo } from './store.js';
import { dispatch, checkAtRisk } from './events.js';
import * as S from './selectors.js';
import { BRAND } from './config.js';
import { esc, icon, avatar, closeModal, isModalOpen, destroyCharts, confirmDialog, toast, setCloseHook, restoreCovered } from './ui.js';
import { notifPopover, userMenu, logoMark } from './views/shared.js';
import * as student from './views/student.js';
import * as instructor from './views/instructor.js';
import * as director from './views/director.js';
import * as admin from './views/admin.js';
import * as provost from './views/provost.js';
import { loginView } from './views/login.js';
import * as curriculum from './views/curriculum.js';
import * as library from './views/library.js';
import * as modules from './views/modules.js';
import * as studio from './views/studio.js';
import * as workbook from './views/workbook.js';
import * as staff from './views/staff.js';
import * as bento from './views/bento.js';
import { initFiles } from './features/files.js';
import { setLang } from './i18n.js';

const VIEWS = { student, instructor, director, admin, provost };
const ROLE_LABEL = { student: 'Student', instructor: 'Lecturer', director: 'Dean', admin: 'Administrator', provost: 'Academic Affairs' };

let popover = null; // 'notif' | 'user' | null
let lastRoute = '';
let pendingMount = null;
let routeModal = null; // route (role/page/id) whose mount opened the current modal
setCloseHook((closed) => {
  const r = parseRoute();
  if (!routeModal || r.full !== routeModal) return;
  // The drawer itself closed: go back to the list, so the same link opens it again.
  if (closed?.dataset.route) { routeModal = null; location.hash = `/${r.role}/${r.page}`; return; }
  // A preview or dialog opened from inside the drawer closed: bring the drawer back where the user was.
  render();
  restoreCovered(document.querySelector('#modal-root [role=dialog]'));
});

/* ---------------- actions shared by the shell ---------------- */
const shellActions = {
  'modal-close': () => closeModal(),
  'set-lang': (el) => { closeModal(); popover = null; setLang(el.dataset.lang); dispatch('UI_SET', { lang: el.dataset.lang }); },
  go: (el) => { location.hash = el.dataset.href.replace(/^#/, ''); },
  'toggle-popover': (el) => { popover = popover === el.dataset.which ? null : el.dataset.which; render(); },
  'toggle-demo': () => dispatch('UI_SET', { demoOpen: !getState().ui.demoOpen }),
  'hide-start': (el) => dispatch('UI_SET', { [el.dataset.key]: true }),
  'toggle-nav': () => document.querySelector('.app')?.classList.toggle('nav-open'),
  'open-notif': (el) => {
    dispatch('NOTIFICATION_READ', { id: el.dataset.id });
    popover = null;
    if (el.dataset.link) location.hash = el.dataset.link.replace(/^#/, '');
    render();
  },
  'notif-all-read': () => dispatch('NOTIFICATIONS_ALL_READ'),
  'switch-user': (el) => { popover = null; dispatch('SIGNED_IN', { userId: el.dataset.id }); location.hash = `/${S.currentUser(getState()).role}/dashboard`; },
  'sign-in': (el) => {
    dispatch('SIGNED_IN', { userId: el.dataset.id });
    const role = S.currentUser(getState()).role; const next = sessionStorage.getItem('afterLogin'); sessionStorage.removeItem('afterLogin');
    location.hash = next?.startsWith(`${role}/`) ? `/${next}` : `/${role}/dashboard`; // e.g. a class link opened before signing in
  },
  'sign-out': () => { popover = null; dispatch('SIGNED_OUT'); location.hash = '/login'; },
  'toggle-theme': () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    dispatch('UI_SET', { theme: next });
  },
  'advance-week': async () => {
    const s = getState();
    const w = s.clock.week;
    const ok = await confirmDialog({ title: `Advance to week ${w + 1}?`, body: `<p>This simulates the passage of one week. Scheduled lessons for week ${w + 1} are published, assessments open or close on their dates, and reminders are sent.</p>`, confirmLabel: `Go to week ${w + 1}` });
    if (ok) dispatch('WEEK_ADVANCED');
  },
  'reset-demo': async () => {
    const ok = await confirmDialog({ title: 'Reset demo data?', body: '<p>All changes made in this browser will be discarded and the seed data restored.</p>', confirmLabel: 'Reset', tone: 'danger' });
    if (ok) { resetDemo(); checkAtRisk(getState(), { silent: true }); toast('Demo data restored'); }
  },
};
const allActions = () => Object.assign({}, shellActions, student.actions, instructor.actions, director.actions, admin.actions, provost.actions, curriculum.actions, library.actions, modules.actions, studio.actions, workbook.actions, staff.actions, bento.actions);

/* ---------------- routing ---------------- */
function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean);
  return { role: parts[0] || '', page: parts[1] || 'dashboard', id: parts[2] || null, full: parts.join('/') };
}

function navFor(s, user) {
  const sections = S.sectionsForUser(s, user);
  const counts = {
    approvals: S.pendingApprovals(s, sections).length + s.modules.filter(m => m.status === 'submitted' && m.sectionIds.some(x => sections.some(y => y.id === x))).length,
    marking: user.role === 'instructor' ? S.pendingMarking(s, sections, user.id).length : 0,
    studio: s.exams.filter(e => (e.status === 'review' && e.coEditors.some(c => c.userId === user.id && !c.signedOff)) || (e.status === 'submitted' && S.examApprover(s, user, e))).length,
    curricula: s.programs.filter(p => p.proposal?.status === 'submitted').length,
    gradebook: S.ungradedWorkshop(s, sections).length,
    grading: (user.role === 'instructor' ? S.pendingMarking(s, sections, user.id).length : 0) + S.ungradedWorkshop(s, sections).length,
    staff: user.role === 'director' ? S.newClasses(s, sections).filter(sec => S.staffingGaps(s, [sec]).length).length : 0,
    assessments: user.role === 'student' ? S.upcomingForStudent(s, user.id).filter(x => x.st === 'open').length : 0,
    course: user.role === 'student' ? S.studentTasks(s, user.id).filter(t => t.icon === 'book-open').length : 0,
  };
  return VIEWS[user.role].NAV.map(n => ({ ...n, count: counts[n.countKey] || 0 }));
}

function shell(s, user, route, view) {
  const unread = S.unreadCount(s, user.id);
  const nav = navFor(s, user);
  const secs = S.sectionsForUser(s, user);
  const orgs = ['director', 'provost'].includes(user.role) ? S.scopeOrgs(s, user) : [];
  const indent = { university: '', school: '', program: '\u00a0\u00a0\u00a0' };
  const sectionCtl = orgs.length > 1
    ? `<select class="select select-sm" data-change="set-org-filter" aria-label="Organisation filter">
         ${orgs.map(o => `<option value="${o.id}" ${(s.ui.orgFilter || user.orgId) === o.id ? 'selected' : ''}>${indent[o.type] || ''}${esc(o.name)}</option>`).join('')}</select>`
    : user.orgId ? `<span class="chip">${icon('building-2')} ${esc(S.orgById(s, user.orgId).name)}</span>` : `<span class="chip" title="${secs.map(x => esc(x.code)).join(', ')}">${icon('users')} ${secs.length > 2 ? `${secs.length} classes` : secs.map(x => esc(x.code)).join(', ')}</span>`;
  return `<div class="app">
    <aside class="sidebar" aria-label="Main navigation">
      <a class="brand" href="#/${user.role}/dashboard" aria-label="${esc(BRAND.product)} home">${logoMark()}<div class="brand-text"><b>Learning</b><span>${esc(ROLE_LABEL[user.role]).toUpperCase()}</span></div></a>
      <nav class="nav">
        ${nav.map(n => n.header ? `<div class="nav-label">${n.header}</div>` : `<a href="#/${user.role}/${n.page}" class="${route.page === n.page || (n.also || []).includes(route.page) ? 'active' : ''}">${icon(n.icon)}<span>${n.label}</span>${n.count ? `<span class="count">${n.count}</span>` : ''}</a>`).join('')}
      </nav>
      <details class="sidebar-foot demo-tools" ${s.ui.demoOpen ? 'open' : ''}>
        <summary data-action="toggle-demo">${icon('flask-conical')}<span>Demo controls</span>${icon('chevron-up', 'ic-xs')}</summary>
        <div class="demo-week">${esc(s.term.title)} · week ${s.clock.week} of ${s.term.weeks}</div>
        <button class="btn btn-ghost btn-sm" data-action="advance-week" ${s.clock.week >= s.term.weeks ? 'disabled' : ''}>${icon('fast-forward')} Advance week</button>
        <button class="btn btn-ghost btn-sm" data-action="toggle-popover" data-which="user">${icon('repeat')} Switch account</button>
        <button class="btn btn-ghost btn-sm" data-action="reset-demo">${icon('rotate-ccw')} Reset demo</button>
      </details>
    </aside>
    <div class="main">
      <header class="topbar">
        <button class="btn btn-ghost btn-icon menu-btn" data-action="toggle-nav" aria-label="Open navigation">${icon('menu')}</button>
        <div class="term"><b class="hide-sm">${esc(s.term.title)}</b><span class="hide-sm">${esc(s.course.title)}</span><span class="week-pill">Week ${s.clock.week}/${s.term.weeks}</span></div>
        <div class="grow"></div>
        ${sectionCtl}
        <div class="icon-wrap">
          <button class="btn btn-ghost btn-icon" data-action="toggle-popover" data-which="notif" aria-label="Notifications, ${unread} unread">${icon('bell')}</button>
          ${unread ? `<span class="dot-count">${unread > 9 ? '9+' : unread}</span>` : ''}
          ${popover === 'notif' ? notifPopover(s, user) : ''}
        </div>
        <div class="icon-wrap">
          <button class="btn btn-ghost" data-action="toggle-popover" data-which="user" aria-label="Account menu" style="padding:0 6px 0 4px">${avatar(user, 'sm')}<span class="hide-sm small" style="font-weight:600">${esc(user.name)}</span>${icon('chevron-down')}</button>
          ${popover === 'user' ? userMenu(s, user) : ''}
        </div>
      </header>
      <main class="content" id="content">${view.html}</main>
    </div>
  </div>`;
}

export function render() {
  const s = getState();
  const app = document.getElementById('app');
  const user = S.currentUser(s);
  let route = parseRoute();
  destroyCharts();

  if (!user) {
    if (route.full !== 'login') { if (route.role) sessionStorage.setItem('afterLogin', route.full); history.replaceState(null, '', '#/login'); }
    document.title = `Sign in · ${BRAND.product}`;
    app.innerHTML = loginView(s);
    window.lucide?.createIcons();
    return;
  }
  if (route.role === 'print') {
    document.title = `Print · ${BRAND.product}`;
    app.innerHTML = workbook.printView(s, route.page, route.id, user);
    window.lucide?.createIcons();
    bento.mountMedia(app);
    return;
  }
  if (route.role !== user.role || !VIEWS[user.role].ROUTES[route.page]) {
    history.replaceState(null, '', `#/${user.role}/dashboard`);
    route = parseRoute();
  }
  const changedRoute = route.full !== lastRoute;
  const scrollY = window.scrollY;
  let view;
  try { view = VIEWS[user.role].ROUTES[route.page](s, route.id, user); }
  catch (e) { console.error(e); view = { title: 'Error', html: `<div class="card card-body">${icon('circle-alert')} This page could not be displayed. <a href="#/${user.role}/dashboard">Back to dashboard</a></div>` }; }
  document.title = `${view.title} · ${BRAND.product}`;
  app.innerHTML = shell(s, user, route, view);
  window.lucide?.createIcons();
  if (changedRoute) { lastRoute = route.full; if (isModalOpen()) closeModal(); }
  pendingMount = view.mount || null;
  const before = document.querySelector('#modal-root [role=dialog]');
  if (pendingMount) { try { pendingMount(s, route.id, user); } catch (e) { console.error(e); } }
  // A URL like #/director/approvals/L-1 opens its drawer on mount. Mark that drawer, so closing it goes
  // back to the list (the same link can open it again) and closing anything opened on top of it returns to it.
  const dlg = document.querySelector('#modal-root [role=dialog]');
  if (route.id && dlg && dlg !== before) { dlg.dataset.route = '1'; routeModal = route.full; if (before?.dataset.route) restoreCovered(dlg); }
  window.scrollTo(0, changedRoute ? 0 : scrollY);
}

/* ---------------- global listeners ---------------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (el) {
    const fn = allActions()[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el, e); }
    return;
  }
  if (popover && !e.target.closest('.popover')) { popover = null; render(); }
  if (e.target.closest('.nav a')) document.querySelector('.app')?.classList.remove('nav-open');
});
document.addEventListener('change', (e) => {
  const el = e.target.closest('[data-change]');
  if (!el) return;
  if (el.dataset.change === 'set-org-filter') { const u = S.currentUser(getState()); dispatch('UI_SET', { orgFilter: el.value === u.orgId ? null : el.value }); return; }
  allActions()[el.dataset.change]?.(el, e);
});
document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[data-submit]');
  if (!form) return;
  e.preventDefault();
  allActions()[form.dataset.submit]?.(form, new FormData(form), e);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isModalOpen()) closeModal();
    else if (popover) { popover = null; render(); }
  }
});
window.addEventListener('hashchange', () => { popover = null; render(); });

// Live countdowns without re-rendering the page.
setInterval(() => {
  const s = getState();
  if (!s) return;
  document.querySelectorAll('[data-countdown]').forEach(el => { el.textContent = S.countdown(s, el.dataset.countdown); });
}, 1000);

/* ---------------- boot ---------------- */
const s = load();
if (!s.flags.initialized) { checkAtRisk(s, { silent: true }); s.flags.initialized = true; }
if (!s.ui.theme) s.ui.theme = document.documentElement.dataset.theme || 'light';
document.documentElement.dataset.theme = s.ui.theme;
setLang(s.ui.lang || 'vi'); // Vietnamese first: most users are not at ease with an English UI
subscribe(() => render());
render();
initFiles().then(() => render());

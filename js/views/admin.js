import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { esc, icon, badge, kpi, card, empty, pageHead, avatar, makeChart, cssVar } from '../ui.js';
import { libraryView, readerView } from './library.js';

export const NAV = [
  { page: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { page: 'users', label: 'Users', icon: 'users' },
  { page: 'library', label: 'Library', icon: 'library-big', also: ['book'] },
  { page: 'licensing', label: 'Licensing', icon: 'key-round' },
  { page: 'integrations', label: 'Integrations', icon: 'plug' },
  { page: 'audit', label: 'Audit log', icon: 'scroll-text' },
];
const ROLE_LABEL = { provost: 'Academic Affairs', director: 'Dean', instructor: 'Lecturer', student: 'Student', admin: 'Administrator' };
const INTEGRATIONS = [
  { key: 'lti', label: 'LTI 1.3', desc: 'Launch UEH Learning from the university LMS and pass back grades.' },
  { key: 'oneroster', label: 'OneRoster', desc: 'Nightly roster sync of students, staff and class sections.' },
  { key: 'sso', label: 'UEH single sign-on', desc: 'Sign in with UEH accounts (SAML/OIDC).' },
];

function activeUsers(s, days = 7) {
  const since = S.now(s).getTime() - days * 86400000;
  const ids = new Set();
  s.activity.forEach(a => { if (new Date(a.at) >= since) ids.add(a.studentId); });
  s.auditLog.forEach(a => { if (new Date(a.at) >= since && a.actorId !== 'system') ids.add(a.actorId); });
  return ids.size;
}

function auditTable(s, rows) {
  if (!rows.length) return empty('scroll-text', 'No matching events');
  return `<div class="table-wrap"><table class="table"><thead><tr><th>Time</th><th>Actor</th><th>Event</th><th>Summary</th></tr></thead><tbody>${rows.map(e => {
    const u = S.userById(s, e.actorId);
    return `<tr><td class="small mono" style="white-space:nowrap">${S.fmtDateTime(e.at)}</td><td>${u ? `<div class="row gap-2">${avatar(u, 'sm')}<div><div>${esc(u.name)}</div><div class="small faint">${ROLE_LABEL[u.role]}</div></div></div>` : '<span class="chip">System</span>'}</td><td><span class="mono small">${esc(e.action)}</span></td><td>${esc(e.summary)}</td></tr>`;
  }).join('')}</tbody></table></div>`;
}

function dashboard(s) {
  const seats = s.users.length;
  const today = S.now(s); today.setHours(0, 0, 0, 0);
  const events = [...s.auditLog].sort((a, b) => new Date(b.at) - new Date(a.at));
  const byRole = ['student', 'instructor', 'director', 'provost', 'admin'].map(r => s.users.filter(u => u.role === r).length);
  return {
    title: 'Dashboard',
    html: `<div class="page">${pageHead('System overview', `${esc(s.term.title)}, ${s.sections.length} sections`)}
      <div class="grid">
        <div class="span-3">${kpi({ label: 'Licensed seats', value: `${seats}<small> / ${s.license.seats}</small>`, sub: `${Math.round((seats / s.license.seats) * 100)}% used, expires ${S.fmtDate(s.license.expiresAt, { month: 'short', year: 'numeric' })}`, iconName: 'key-round' })}</div>
        <div class="span-3">${kpi({ label: 'Active users (7 days)', value: String(activeUsers(s)), sub: `of ${s.users.length} accounts`, iconName: 'user-check' })}</div>
        <div class="span-3">${kpi({ label: 'Integrations', value: `${Object.keys(s.integrations || {}).length}/${INTEGRATIONS.length}`, sub: 'Synced at least once (simulated)', iconName: 'plug', tone: 'warn' })}</div>
        <div class="span-3">${kpi({ label: 'Audit events today', value: String(events.filter(e => new Date(e.at) >= today).length), sub: `${events.length} total this term`, iconName: 'scroll-text' })}</div>
      </div>
      <div class="grid"><div class="span-8">${card({ title: 'Recent activity', actions: '<a class="btn btn-sm" href="#/admin/audit">Full audit log</a>', flush: true, body: auditTable(s, events.slice(0, 8)) })}</div>
        <div class="span-4">${card({ title: 'Accounts by role', body: '<div class="chart-box sm"><canvas id="ad-roles"></canvas></div>' })}</div></div></div>`,
    mount: () => makeChart('ad-roles', { type: 'doughnut', data: { labels: ['Students', 'Lecturers', 'Deans', 'Academic Affairs', 'Admin'], datasets: [{ data: byRole, backgroundColor: [cssVar('--brand'), cssVar('--brand-2'), cssVar('--info'), cssVar('--s-ACC'), cssVar('--text-3')], borderWidth: 0 }] }, options: { maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10 } } } } }),
  };
}

const userFilter = { role: '' };
function users(s) {
  const list = s.users.filter(u => !userFilter.role || u.role === userFilter.role);
  return {
    title: 'Users',
    html: `<div class="page">${pageHead('Users', `${s.users.length} accounts, provisioning will come from OneRoster`, `<select class="select select-sm" data-change="user-role"><option value="">All roles</option>${Object.entries(ROLE_LABEL).map(([k, v]) => `<option value="${k}" ${userFilter.role === k ? 'selected' : ''}>${v}</option>`).join('')}</select>`)}
      ${card({ flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Class / unit</th><th class="num">Last 7 days</th></tr></thead><tbody>${list.map(u => {
        const since = S.now(s).getTime() - 7 * 86400000;
        const n = s.activity.filter(a => a.studentId === u.id && new Date(a.at) >= since).length + s.auditLog.filter(a => a.actorId === u.id && new Date(a.at) >= since).length;
        return `<tr><td><div class="row gap-2">${avatar(u, 'sm')}<strong>${esc(u.name)}</strong></div></td><td>${ROLE_LABEL[u.role]}</td><td class="mono small">${esc(u.email)}</td><td>${u.sectionId ? esc(S.sectionById(s, u.sectionId).code) : u.role === 'instructor' ? S.sectionsForUser(s, u).map(x => esc(x.code)).join(', ') : u.orgId ? esc(S.orgById(s, u.orgId).name) : '—'}</td><td class="num">${n ? `${n} actions` : '<span class="faint">Inactive</span>'}</td></tr>`;
      }).join('')}</tbody></table></div>` })}</div>`,
  };
}

function licensing(s) {
  const used = s.users.length;
  return {
    title: 'Licensing',
    html: `<div class="page">${pageHead('Licensing', esc(s.license.product))}
      <div class="grid"><div class="span-4">${kpi({ label: 'Seats in use', value: `${used}<small> / ${s.license.seats}</small>`, sub: `${s.license.seats - used} available`, iconName: 'key-round' })}</div>
      <div class="span-4">${kpi({ label: 'Valid until', value: S.fmtDate(s.license.expiresAt, { day: 'numeric', month: 'short', year: 'numeric' }), sub: `${Math.round((new Date(s.license.expiresAt) - S.now(s)) / 86400000)} days remaining`, iconName: 'calendar' })}</div>
      <div class="span-4">${kpi({ label: 'Sections', value: String(s.sections.length), sub: s.sections.map(x => x.code).join(', '), iconName: 'school' })}</div></div>
      ${card({ title: 'Coursebooks under this licence', subtitle: 'Licensed content is read-only and disappears for students when the licence ends. UEH material and student results stay.', flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Coursebook</th><th>Units</th><th>File</th><th>Valid until</th></tr></thead><tbody>${s.library.books.map(b => `<tr><td><strong>${esc(b.title)}</strong></td><td class="small">${b.unitIds.join(', ')}</td><td class="small">${b.file ? 'PDF uploaded' : '<span class="faint">Not uploaded</span>'}</td><td class="small">${S.fmtDate(s.license.expiresAt, { day: 'numeric', month: 'short', year: 'numeric' })}</td></tr>`).join('')}</tbody></table></div>` })}</div>`,
  };
}

function integrations(s) {
  return {
    title: 'Integrations',
    html: `<div class="page">${pageHead('Integrations', 'Connections to UEH systems')}
      <div class="note note-warn">${icon('flask-conical')}<div>These connectors are <strong>simulated</strong> in the demo — a sync only writes an audit entry. Real endpoints are configured during deployment.</div></div>
      <div class="grid">${INTEGRATIONS.map(i => {
        const st = s.integrations?.[i.key];
        return `<div class="span-4">${card({ title: i.label, actions: st ? badge('ok', 'Synced') : badge('neutral', 'Not configured'), body: `<p class="muted small">${i.desc}</p><p class="small mt-3">${st ? `Last sync ${S.fmtDateTime(st.lastSync)}, ${st.records} records` : 'Never synced'}</p><button class="btn btn-sm mt-3" data-action="run-sync" data-key="${i.key}" data-label="${esc(i.label)}">${icon('refresh-cw')} Run sync</button>` })}</div>`;
      }).join('')}</div></div>`,
  };
}

const auditFilter = { q: '', role: '' };
function audit(s) {
  const rows = [...s.auditLog].sort((a, b) => new Date(b.at) - new Date(a.at)).filter(e => {
    const u = S.userById(s, e.actorId);
    if (auditFilter.role && (auditFilter.role === 'system' ? e.actorId !== 'system' : u?.role !== auditFilter.role)) return false;
    if (auditFilter.q && !`${e.summary} ${e.action} ${u?.name || ''}`.toLowerCase().includes(auditFilter.q.toLowerCase())) return false;
    return true;
  });
  return {
    title: 'Audit log',
    html: `<div class="page">${pageHead('Audit log', 'Every state change across all roles is recorded here')}
      ${card({ title: `${rows.length} events`, actions: `<form data-submit="audit-search" class="row gap-2"><input class="input" style="height:32px;width:200px" name="q" value="${esc(auditFilter.q)}" placeholder="Search…"><select class="select select-sm" name="role" data-change="audit-role"><option value="">All actors</option>${Object.entries(ROLE_LABEL).map(([k, v]) => `<option value="${k}" ${auditFilter.role === k ? 'selected' : ''}>${v}</option>`).join('')}<option value="system" ${auditFilter.role === 'system' ? 'selected' : ''}>System</option></select><button class="btn btn-sm">Filter</button></form>`, flush: true, body: auditTable(s, rows) })}</div>`,
  };
}

export const ROUTES = { dashboard, users, library: (s) => libraryView(s), book: (s, id) => readerView(s, id), licensing, integrations, audit };
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
export const actions = {
  'user-role': (el) => { userFilter.role = el.value; rerender(); },
  'run-sync': (el) => dispatch('INTEGRATION_SYNCED', { key: el.dataset.key, label: el.dataset.label }),
  'audit-search': (form, data) => { auditFilter.q = data.get('q'); auditFilter.role = data.get('role'); rerender(); },
  'audit-role': (el) => { auditFilter.role = el.value; rerender(); },
};

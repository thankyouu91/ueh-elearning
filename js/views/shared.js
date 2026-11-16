// Components shared by every role. Same data, role-specific actions.
import * as S from '../selectors.js';
import { BRAND } from '../config.js';
import { esc, icon, avatar, badge, empty, scoreText, TYPE_META, ASSESS_META, makeChart, cssVar } from '../ui.js';

export function logoMark(big = false) {
  if (BRAND.logoSrc) return `<img class="brand-mark" src="${esc(BRAND.logoSrc)}" alt="${esc(BRAND.institution)}" ${big ? 'style="height:72px"' : ''}>`;
  return `<span class="logo-text" aria-label="${esc(BRAND.institution)}"><span class="l1">${esc(BRAND.shortName)}</span><span class="l2">UNIVERSITY</span></span>`;
}

/* ---------- first-steps card for newcomers ---------- */
/** steps: [href, icon, title, description]; hidden per user once dismissed (Reset demo brings it back). */
export function startHere(s, me, steps) {
  const key = `hideStart_${me.id}`;
  if (s.ui[key]) return '';
  return `<div class="card start-here"><div class="card-body">
    <div class="row between"><strong>Start here</strong><button class="btn btn-ghost btn-sm" data-action="hide-start" data-key="${key}">${icon('x')} Hide</button></div>
    <ol class="start-steps">${steps.map(([href, ic, title, desc], i) => `<li><a href="${href}"><span class="step-num">${i + 1}</span>${icon(ic)}<span class="stack"><b>${title}</b><span class="small muted">${desc}</span></span></a></li>`).join('')}</ol>
  </div></div>`;
}

/* ---------- "what to do now" list, colour-coded by urgency (students and lecturers) ---------- */
/** tasks: [{ level, icon, title, why, href, action, pct?, due?, opens?, act?, section? }]; labels: level → kicker text. */
export function taskList(s, tasks, labels, { title = 'What to do now', emptyTitle, emptyText } = {}) {
  const active = tasks.filter(t => !['later', 'missed'].includes(t.level));
  const urgent = tasks.filter(t => t.level === 'urgent').length;
  const row = (t) => {
    const tag = t.act ? `button type="button" data-action="${t.act}" data-section="${esc(t.section || '')}"` : `a href="${t.href}"`;
    return `<${tag} class="task lv-${t.level}">
      <span class="task-mark">${icon(t.icon)}</span>
      <div class="grow"><div class="task-kicker">${labels[t.level]}</div><div class="title">${esc(t.title)}</div><div class="meta">${esc(t.why)}</div>${t.pct !== undefined ? `<div class="task-bar"><div class="progress"><span style="width:${t.pct}%"></span></div></div>` : ''}</div>
      ${t.due ? `<span class="due-chip" title="Closes ${S.fmtDateTime(t.due)}" data-countdown="${t.due}">${S.countdown(s, t.due)}</span>` : t.opens ? `<span class="due-chip">Opens ${S.fmtDate(t.opens)}</span>` : ''}
      <span class="btn btn-sm ${['urgent', 'soon'].includes(t.level) ? 'btn-primary' : ''}">${t.action} ${icon('arrow-right')}</span></${t.act ? 'button' : 'a'}>`;
  };
  const summary = active.length ? `<span class="task-count ${urgent ? 'is-urgent' : ''}">${active.length}</span>` : `<span class="task-count is-done">${icon('check')}</span>`;
  const levels = Object.keys(labels).filter(l => l !== 'missed');
  return `<section class="card tasks-card"><header class="card-head"><div class="row gap-3">${summary}<div><h3>${title}</h3><p class="muted">${active.length ? `${active.length} things to do${urgent ? ` · ${urgent} urgent` : ''}` : 'All caught up'}</p></div></div>
      <div class="row gap-3 wrap small task-legend">${levels.map(l => `<span class="lv-${l}"><i></i>${labels[l]}</span>`).join('')}</div></header>
    ${tasks.length ? `<div>${tasks.map(row).join('')}</div>` : `<div class="card-body">${empty('party-popper', emptyTitle, emptyText)}</div>`}</section>`;
}

/* ---------- notifications & account ---------- */
export function notifPopover(s, user) {
  const list = S.notificationsFor(s, user.id).slice(0, 30);
  const today = S.now(s); today.setHours(0, 0, 0, 0);
  const groups = [['Today', list.filter(n => new Date(n.createdAt) >= today)], ['Earlier', list.filter(n => new Date(n.createdAt) < today)]].filter(g => g[1].length);
  const item = (n) => `<button class="notif ${n.readAt ? '' : 'unread'}" data-action="open-notif" data-id="${n.id}" data-link="${esc(n.link || '')}">
      <span class="ndot"></span><span class="grow"><div class="nt">${esc(n.title)}</div><div class="nb">${esc(n.body)}</div><div class="nm">${S.relTime(s, n.createdAt)}</div></span></button>`;
  return `<div class="popover" role="dialog" aria-label="Notifications">
    <div class="popover-head"><strong>Notifications</strong>${S.unreadCount(s, user.id) ? `<button class="btn btn-ghost btn-sm" data-action="notif-all-read">Mark all read</button>` : ''}</div>
    <div class="popover-body">${groups.length ? groups.map(([g, items]) => `<div class="popover-group">${g}</div>${items.map(item).join('')}`).join('') : empty('bell-off', 'No notifications', 'Updates from your courses will appear here.')}</div>
  </div>`;
}

export function userMenu(s, user) {
  const byRole = ['provost', 'director', 'instructor', 'student', 'admin'].map(r => [r, s.users.filter(u => u.role === r)]);
  const label = { provost: 'University leadership', director: 'Deans', instructor: 'Lecturers', student: 'Students', admin: 'Administrator' };
  return `<div class="popover menu" role="menu">
    <div class="popover-head"><div class="row gap-3">${avatar(user)}<div><div style="font-weight:600">${esc(user.name)}</div><div class="small muted">${esc(user.title)}</div></div></div></div>
    <div class="popover-body" style="max-height:380px">
      <button class="menu-item" data-action="toggle-theme">${icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon')} ${document.documentElement.dataset.theme === 'dark' ? 'Light' : 'Dark'} mode</button>
      <button class="menu-item" data-action="sign-out">${icon('log-out')} Sign out</button>
      <div class="popover-group">Switch demo account</div>
      ${byRole.map(([r, us]) => `<div class="popover-group" style="padding-top:4px;font-weight:500">${label[r]}</div>${(r === 'student' ? us.filter((u, i) => i % 6 === 0) : us).map(u => `<button class="menu-item ${u.id === user.id ? 'current' : ''}" data-action="switch-user" data-id="${u.id}">${avatar(u, 'sm')} <span class="grow truncate">${esc(u.name)}</span>${u.sectionId ? `<span class="faint small">${esc(S.sectionById(s, u.sectionId).code)}</span>` : ''}</button>`).join('')}`).join('')}
    </div>
  </div>`;
}

/* ---------- term timeline ---------- */
/** opts: { sections, viewer: 'student'|'instructor'|'director', showGaps, compact, studentId } */
export function termTimeline(s, opts) {
  const { sections, viewer } = opts;
  const multi = sections.length > 1;
  const lessonLink = (l) => viewer === 'student' ? `#/student/lesson/${l.id}` : viewer === 'instructor' ? `#/instructor/builder/${l.id}` : `#/director/approvals/${l.id}`;
  const weeks = Array.from({ length: s.term.weeks }, (_, i) => i + 1);
  const cols = weeks.map(w => {
    let lessons = s.lessons.filter(l => l.week === w && sections.some(x => x.id === l.sectionId) && l.status !== 'rejected');
    if (viewer === 'student') lessons = lessons.filter(l => l.status === 'published');
    const assess = s.assessments.filter(a => sections.some(x => a.sectionIds.includes(x.id)) && S.weekOf(s, a.opensAt) === w && (viewer !== 'student' || a.status !== 'draft'));
    const resources = [];
    const gaps = opts.showGaps ? sections.filter(sec => !s.lessons.some(l => l.sectionId === sec.id && l.week === w && l.status !== 'rejected')) : [];
    const cls = w < s.clock.week ? 'past' : w === s.clock.week ? 'current' : '';
    const ws = S.weekStartOf(s, w);
    return `<div class="tl-week ${cls}">
      <div class="tl-head"><b>W${w}${w === s.clock.week ? ' · now' : ''}</b><span>${S.fmtDate(ws)}</span></div>
      <div class="tl-body">
        ${lessons.map(l => `<a class="tl-item s-${l.status}" href="${lessonLink(l)}" title="${esc(l.title)} — ${esc(l.status.replace('_', ' '))}">
            <div class="truncate" style="font-weight:600">${esc(l.title)}</div>
            <div class="tl-meta">${multi ? esc(S.sectionById(s, l.sectionId).code) + ' · ' : ''}${esc((l.status === 'changes_requested' ? 'changes' : l.status))}</div></a>${l.blocks.filter(b => b.type === 'resource' && b.extra).map(b => { const r = S.resourceById(s, b.resourceId); return r ? `<div class="tl-extra x-${r.type}" title="${esc(r.title)}">${icon(r.type === 'practical' ? 'monitor-cog' : 'briefcase', 'ic-xs')} ${esc(r.title)}</div>` : ''; }).join('')}`).join('')}
        ${assess.map(a => `<a class="tl-item assess" href="${viewer === 'student' ? (a.type === 'workshop' ? '#/student/assessments' : `#/student/exam/${a.id}`) : viewer === 'instructor' ? '#/instructor/assessments' : '#/director/studio'}" title="${esc(a.title)}">
            <div class="truncate" style="font-weight:600">${icon(ASSESS_META[a.type].icon, 'ic-xs')} ${esc(a.title)}</div><div class="tl-meta">${esc(ASSESS_META[a.type].label)} · ${badgeless(S.assessmentStatus(s, a))}</div></a>`).join('')}
        ${resources.map(c => `<div class="tl-item" style="border-left-color:var(--text-3)" title="${esc(c.title)}"><div class="truncate">${icon(c.kind === 'safety_sop' ? 'shield-alert' : 'wrench')} ${esc(c.title)}</div><div class="tl-meta">Repository</div></div>`).join('')}
        ${gaps.map(sec => `<div class="tl-gap">${multi ? esc(sec.code) + ': ' : ''}No lesson</div>`).join('')}
      </div></div>`;
  }).join('');
  return `<div class="timeline" role="list" aria-label="Term timeline">${cols}</div>`;
}
const badgeless = (st) => st;

export function timelineLegend() {
  const it = (cls, label) => `<span class="row gap-1 small muted"><span style="width:10px;height:10px;border-radius:2px;background:${cls}"></span>${label}</span>`;
  return `<div class="row gap-3 wrap">${it('var(--ok)', 'Published')}${it('var(--brand)', 'Scheduled')}${it('var(--info)', 'Submitted')}${it('var(--warn)', 'Changes requested')}${it('var(--brand-2)', 'Assessment')}</div>`;
}

/* ---------- lessons ---------- */
export function lessonBlocks(l) {
  if (!l.blocks.length) return empty('layers', 'No blocks yet', 'Add blocks from the palette to build the lesson.');
  return `<div class="stack gap-2">${l.blocks.map((b, i) => `<div class="block-row clickable" data-action="block-preview" data-lesson="${l.id}" data-block="${b.id}" role="button" tabindex="0" title="Preview this block"><span class="num">${i + 1}</span>${icon(TYPE_META[b.type].icon)}<div class="grow"><div style="font-weight:500">${esc(b.title)}</div><div class="small muted">${TYPE_META[b.type].label}</div></div><span class="chip">${b.minutes} min</span>${icon('eye', 'faint')}</div>`).join('')}</div>`;
}
export function lessonHistory(s, l) {
  if (!l.history?.length) return '';
  return `<div class="history">${[...l.history].reverse().map(h => {
    const who = h.by === 'system' ? 'System' : S.userById(s, h.by)?.name || h.by;
    return `<div class="history-item"><span class="dot"></span><div><div><strong>${esc(h.action)}</strong> <span class="muted">by ${esc(who)}</span></div>${h.note ? `<div class="muted">"${esc(h.note)}"</div>` : ''}<div class="faint small">${S.fmtDateTime(h.at)}</div></div></div>`;
  }).join('')}</div>`;
}

/* ---------- gradebook ---------- */
/** opts: { editable, compact, onlyRisk } */
export function gradebookTable(s, sections, opts = {}) {
  const students = S.studentsInSections(s, sections);
  if (!students.length) return empty('users', 'No students', 'No students are enrolled in this section.');
  const cats = s.course.gradingScheme.categories;
  const rows = students.map(u => ({ u, g: S.courseGrade(s, u.id), r: S.atRisk(s, u.id), e: S.engagement(s, u.id), m: S.studyMinutes(s, u.id) }))
    .sort((a, b) => (b.r.flag - a.r.flag) || ((a.g.value ?? 99) - (b.g.value ?? 99)));
  const q = (opts.q || '').toLowerCase();
  const list = rows.filter(r => (!opts.onlyRisk || r.r.flag) && (!q || `${r.u.name} ${r.u.id}`.toLowerCase().includes(q)));
  const ws = sections.flatMap(sec => S.assessmentsForSection(s, sec.id)).filter((a, i, arr) => a.type === 'workshop' && S.assessmentStatus(s, a) === 'closed' && arr.findIndex(x => x.id === a.id) === i);
  const multi = sections.length > 1;
  return `<div class="table-wrap"><table class="table">
    <thead><tr><th>Student</th>${multi ? '<th>Section</th>' : ''}<th class="num">Study time</th><th class="num">Engagement</th>
      ${opts.compact ? '' : cats.map(c => `<th class="num">${c.label} <span class="faint">${Math.round(c.weight * 100)}%</span></th>`).join('')}
      ${opts.editable ? ws.map(a => `<th>${esc(a.title.replace('Workshop: ', ''))}</th>`).join('') : ''}
      ${opts.markFor ? '<th class="num">To mark</th>' : ''}<th class="num">Course grade</th><th>Status</th></tr></thead>
    <tbody>${list.map(({ u, g, r, e, m }) => `<tr class="${r.flag ? 'risk' : ''}">
      <td><div class="row gap-2">${avatar(u, 'sm')}<div><div style="font-weight:600">${opts.studentHref ? `<a href="${opts.studentHref(u)}">${esc(u.name)}</a>` : esc(u.name)}</div><div class="faint small">${u.id}</div></div></div></td>
      ${multi ? `<td>${esc(S.sectionById(s, u.sectionId).code)}</td>` : ''}
      <td class="num">${S.fmtMinutes(m)}</td>
      <td class="num">${e === null ? '—' : `<span class="${e < 60 ? 't-danger' : ''}">${e}%</span>`}</td>
      ${opts.compact ? '' : cats.map(c => `<td class="num">${scoreText(g.breakdown[c.key])}</td>`).join('')}
      ${opts.editable ? ws.map(a => {
        const res = S.assessmentResult(s, u.id, a);
        return `<td>${res.state === 'graded' ? `<button class="btn btn-ghost btn-sm" data-action="open-rubric" data-assessment="${a.id}" data-student="${u.id}">${res.value.toFixed(1)} ${icon('pencil')}</button>` : `<button class="btn btn-sm" data-action="open-rubric" data-assessment="${a.id}" data-student="${u.id}">${icon('clipboard-pen')} Grade</button>`}</td>`;
      }).join('') : ''}
      ${opts.markFor ? (() => { const n = S.pendingMarking(s, sections, opts.markFor).filter(a => a.studentId === u.id).length; return `<td class="num">${n ? `<button class="btn btn-sm btn-primary" data-action="wbl-mark-next" data-section="${u.sectionId}" data-student="${u.id}">${icon('pen-line')} ${n}</button>` : '<span class="faint">—</span>'}</td>`; })() : ''}
      <td class="num">${g.value === null ? '—' : `<strong class="${g.value < s.course.gradingScheme.passMark ? 't-danger' : ''}">${g.value.toFixed(1)}</strong>${g.provisional ? '<span class="faint">*</span>' : ''}`}</td>
      <td>${r.flag ? `<span title="${esc(r.reasons.join('; '))}">${badge('at_risk')}</span><div class="small t-danger" style="max-width:220px">${esc(r.reasons[0])}</div>` : badge('on_track')}</td>
    </tr>`).join('') || `<tr><td colspan="20">${empty('circle-check', 'No students at risk')}</td></tr>`}</tbody></table></div>
    ${opts.noNote ? '' : '<div class="small faint" style="padding:10px 14px">* Provisional: categories without results yet are excluded and their weight is redistributed.</div>'}`;
}

/* ---------- at-risk list ---------- */
export function atRiskList(s, sections, link, base = null) {
  const list = S.studentsInSections(s, sections).map(u => ({ u, r: S.atRisk(s, u.id) })).filter(x => x.r.flag);
  if (!list.length) return empty('circle-check', 'No students at risk', 'Everyone is above the pass mark and engagement threshold.');
  return `<div class="list">${list.map(({ u, r }) => `<a class="list-item" href="${base ? `${base}/${u.id}` : link}"><span class="li-icon danger">${icon('triangle-alert')}</span><div class="grow"><div class="title">${esc(u.name)} <span class="faint small">${esc(S.sectionById(s, u.sectionId).code)}</span></div><div class="meta">${esc(r.reasons.join(' · '))}</div></div></a>`).join('')}</div>`;
}

/* ---------- charts ---------- */
export function radarChart(canvasId, datasets) {
  const tags = ['Economics', 'Accounting', 'Finance', 'Management', 'Marketing'];
  const colors = [cssVar('--brand'), cssVar('--brand-2'), cssVar('--text-3')];
  makeChart(canvasId, {
    type: 'radar',
    data: { labels: tags, datasets: datasets.map((d, i) => ({ label: d.label, data: tags.map(t => d.values[t] ?? null), borderColor: colors[i], backgroundColor: i === 0 ? colors[0] + '22' : 'transparent', pointBackgroundColor: colors[i], borderWidth: 2, pointRadius: 3, borderDash: d.dashed ? [5, 4] : [] })) },
    options: { maintainAspectRatio: false, plugins: { legend: { display: datasets.length > 1, position: 'bottom', labels: { boxWidth: 10, boxHeight: 10 } } }, scales: { r: { min: 0, max: 100, ticks: { stepSize: 25, backdropColor: 'transparent', color: cssVar('--text-3') }, grid: { color: cssVar('--border') }, angleLines: { color: cssVar('--border') }, pointLabels: { color: cssVar('--text-2'), font: { size: 12 } } } } },
  });
}
export const BENCHMARK = { Economics: 70, Accounting: 70, Finance: 70, Management: 70, Marketing: 70 };

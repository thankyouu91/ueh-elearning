import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { esc, icon, badge, kpi, card, empty, pageHead, ASSESS_META, openModal, closeModal, modalHead, confirmDialog, makeChart, cssVar, avatar } from '../ui.js';
import { termTimeline, timelineLegend, gradebookTable, lessonBlocks, lessonHistory, radarChart, BENCHMARK, atRiskList } from './shared.js';
import { openAssessmentModal } from './instructor.js';
import { explorerView } from './explorer.js';
import { designerView, compareMatrix, resetDraft } from './curriculum.js';
import { libraryView, readerView } from './library.js';
import { studioView } from './studio.js';
import { moduleSummaryHtml } from './modules.js';
import { staffView } from './staff.js';

export const NAV = [
  { page: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { page: 'explore', label: 'Organisation', icon: 'network' },
  { page: 'staff', label: 'Teaching staff', icon: 'contact', countKey: 'staff' },
  { page: 'curriculum', label: 'Curriculum', icon: 'blocks' },
  { page: 'approvals', label: 'Approvals', icon: 'inbox', countKey: 'approvals' },
  { page: 'library', label: 'Library', icon: 'library-big', also: ['book'] },
  { page: 'studio', label: 'Exam studio', icon: 'pen-tool', countKey: 'studio' },
  { page: 'timeline', label: 'Master timeline', icon: 'calendar-range' },
  { page: 'analytics', label: 'Analytics', icon: 'chart-spline' },
];

/* ---------------- dashboard ---------------- */
function dashboard(s, _id, me) {
  const secs = S.scopedSections(s);
  const students = S.studentsInSections(s, secs);
  const pending = S.pendingApprovals(s, secs);
  const prog = S.termProgress(s, secs);
  const grades = students.map(u => S.courseGrade(s, u.id).value).filter(v => v !== null);
  const pass = grades.length ? Math.round((grades.filter(v => v >= s.course.gradingScheme.passMark).length / grades.length) * 100) : null;
  const risk = students.filter(u => S.atRisk(s, u.id).flag).length;
  const upcomingGaps = secs.flatMap(sec => S.weekGaps(s, sec.id).filter(w => w > s.clock.week && w <= s.clock.week + 4).map(w => ({ sec, w })));
  const scope = s.ui.orgFilter && s.ui.orgFilter !== me.orgId ? S.orgById(s, s.ui.orgFilter)?.name : `${secs.length} classes`;

  return {
    title: 'Dashboard',
    html: `<div class="page">
      ${pageHead(esc(S.orgById(s, me.orgId).name), `${esc(s.term.title)} · ${esc(scope)} · ${students.length} students`, `<a class="btn" href="#/director/studio">${icon('pen-tool')} Exam studio</a><a class="btn btn-primary" href="#/director/approvals">${icon('inbox')} Review approvals${pending.length ? ` (${pending.length})` : ''}</a>`)}
      <div class="grid">
        <div class="span-3">${kpi({ label: 'Pending approvals', value: String(pending.length), sub: pending.length ? `Oldest ${S.relTime(s, pending[0].submittedAt)}` : 'Inbox clear', iconName: 'inbox', tone: pending.length ? 'warn' : 'ok' })}</div>
        <div class="span-3">${kpi({ label: 'Term delivery', value: `${prog.pct}%`, sub: `${prog.published} of ${prog.planned} lesson-weeks published`, iconName: 'calendar-check' })}</div>
        <div class="span-3">${kpi({ label: 'Cohort pass rate', value: pass === null ? '—' : `${pass}%`, sub: `Course grade ≥ ${s.course.gradingScheme.passMark.toFixed(1)}`, iconName: 'graduation-cap', tone: pass !== null && pass < 80 ? 'warn' : 'ok' })}</div>
        <div class="span-3">${kpi({ label: 'Students at risk', value: String(risk), sub: `${students.length ? Math.round((risk / students.length) * 100) : 0}% of cohort`, iconName: 'triangle-alert', tone: risk ? 'danger' : 'ok' })}</div>
      </div>
      <div class="grid">
        <div class="span-8">${card({ title: 'Approvals inbox', subtitle: 'Lessons submitted by instructors', actions: pending.length > 1 ? `<button class="btn btn-sm" data-action="bulk-approve">${icon('check-check')} Approve all (${pending.length})</button>` : '', flush: true, body: approvalsTable(s, pending.slice(0, 6)) })}</div>
        <div class="span-4 stack gap-4">
          ${card({ title: 'Planning gaps', subtitle: 'Next 4 weeks without a lesson', flush: true, body: upcomingGaps.length ? `<div class="list">${upcomingGaps.map(({ sec, w }) => `<a class="list-item" href="#/director/timeline"><span class="li-icon warn">${icon('calendar-x')}</span><div class="grow"><div class="title">Week ${w} · ${esc(sec.code)}</div><div class="meta">${esc(sec.instructorIds.map(id => S.userById(s, id).name).join(', '))}</div></div></a>`).join('')}</div>` : empty('circle-check', 'No gaps', 'Every section has lessons planned.') })}
          ${card({ title: 'At-risk students', flush: true, body: atRiskList(s, secs, '#/director/analytics') })}
        </div>
      </div>
      <div class="grid">
        <div class="span-7">${card({ title: 'Section comparison', subtitle: 'Average grade, pass rate and engagement', body: '<div class="chart-box"><canvas id="dr-sections"></canvas></div>' })}</div>
        <div class="span-5">${card({ title: 'Cohort competencies', subtitle: '% correct vs. programme benchmark', body: '<div class="chart-box"><canvas id="dr-radar"></canvas></div>' })}</div>
      </div>
      ${card({ title: 'Master timeline', subtitle: 'All sections · dashed boxes are unplanned weeks', actions: timelineLegend(), flush: true, body: termTimeline(s, { sections: secs, viewer: 'director', showGaps: true }) })}
    </div>`,
    mount: () => {
      sectionChart(s, 'dr-sections', secs);
      radarChart('dr-radar', [{ label: 'Cohort', values: S.competency(s, students.map(u => u.id)) }, { label: 'Benchmark', values: BENCHMARK, dashed: true }]);
    },
  };
}

function sectionChart(s, id, secs) {
  const st = secs.map(x => S.sectionStats(s, x.id));
  makeChart(id, {
    type: 'bar',
    data: { labels: secs.map(x => x.code), datasets: [
      { label: 'Average grade (×10)', data: st.map(x => (x.avg ?? 0) * 10), backgroundColor: cssVar('--brand'), borderRadius: 4 },
      { label: 'Pass rate %', data: st.map(x => x.pass ?? 0), backgroundColor: cssVar('--brand-2'), borderRadius: 4 },
      { label: 'Engagement %', data: st.map(x => x.engagement ?? 0), backgroundColor: cssVar('--text-3'), borderRadius: 4 } ] },
    options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10 } }, tooltip: { callbacks: { label: (c) => c.datasetIndex === 0 ? `Average grade: ${(c.raw / 10).toFixed(1)}/10` : `${c.dataset.label}: ${c.raw}` } } }, scales: { y: { min: 0, max: 100, grid: { color: cssVar('--border') } }, x: { grid: { display: false } } } },
  });
}

function approvalsTable(s, list) {
  if (!list.length) return empty('inbox', 'No lessons waiting', 'New submissions from instructors will appear here.');
  return `<div class="table-wrap"><table class="table"><thead><tr><th>Lesson</th><th>Instructor</th><th>Section</th><th class="num">Week</th><th class="num">Duration</th><th>Submitted</th><th></th></tr></thead><tbody>
    ${list.map(l => `<tr><td><a href="#/director/approvals/${l.id}" style="font-weight:600">${esc(l.title)}</a><div class="small faint">${esc(S.unitById(s, l.unitId).title)} · ${l.blocks.length} blocks</div></td>
      <td><div class="row gap-2">${avatar(S.userById(s, l.authorId), 'sm')}${esc(S.userById(s, l.authorId).name)}</div></td><td>${esc(S.sectionById(s, l.sectionId).code)}</td><td class="num">${l.week}</td><td class="num">${S.lessonMinutes(l)} min</td>
      <td class="small">${S.relTime(s, l.submittedAt)}</td><td class="num"><a class="btn btn-sm btn-primary" href="#/director/approvals/${l.id}">Review</a></td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------------- approvals ---------------- */
function approvals(s, id, me) {
  const secs = S.scopedSections(s);
  const pending = S.pendingApprovals(s, secs);
  const mods = s.modules.filter(m => m.status === 'submitted' && m.sectionIds.some(x => secs.some(y => y.id === x)));
  const modCard = card({ title: `Modules waiting for approval · ${mods.length}`, subtitle: 'A whole 16-week plan finalised by a lecturer for specific classes', flush: true, body: mods.length ? `<div class="list">${mods.map(m => `<a class="list-item" href="#/director/approvals/${m.id}"><span class="li-icon warn">${icon('calendar-range')}</span><div class="grow"><div class="title">${esc(m.title)}</div><div class="meta">${esc(S.userById(s, m.ownerId).name)} · ${m.sectionIds.map(x => esc(S.sectionById(s, x).code)).join(', ')} · ${m.weeks.reduce((t, w) => t + w.extras.length, 0)} add-ons</div></div><span class="btn btn-sm btn-primary">Review</span></a>`).join('')}</div>` : empty('calendar-range', 'No modules waiting') });
  const reviewed = s.lessons.filter(l => l.reviewedBy && secs.some(x => x.id === l.sectionId) && l.status !== 'submitted')
    .map(l => ({ l, h: [...l.history].reverse().find(h => ['Approved', 'Requested changes', 'Rejected'].includes(h.action)) })).filter(x => x.h)
    .sort((a, b) => new Date(b.h.at) - new Date(a.h.at)).slice(0, 10);
  return {
    title: 'Approvals',
    html: `<div class="page">${pageHead('Approvals', 'Approved lessons are scheduled and publish automatically when their week starts', pending.length > 1 ? `<button class="btn" data-action="bulk-approve">${icon('check-check')} Approve all (${pending.length})</button>` : '')}
      ${modCard}
      ${card({ title: `Lessons waiting for review · ${pending.length}`, flush: true, body: approvalsTable(s, pending) })}
      ${card({ title: 'Recently reviewed', flush: true, body: reviewed.length ? `<div class="list">${reviewed.map(({ l, h }) => `<a class="list-item" href="#/director/approvals/${l.id}"><span class="li-icon ${h.action === 'Approved' ? 'ok' : h.action === 'Rejected' ? 'danger' : 'warn'}">${icon(h.action === 'Approved' ? 'check' : h.action === 'Rejected' ? 'x' : 'message-square-warning')}</span><div class="grow"><div class="title">${esc(l.title)}</div><div class="meta">${esc(h.action)} ${S.relTime(s, h.at)} · ${esc(S.sectionById(s, l.sectionId).code)} · week ${l.week}</div></div>${badge(l.status)}</a>`).join('')}</div>` : empty('history', 'Nothing reviewed yet') })}
    </div>`,
    mount: () => { if (id?.startsWith('MOD')) openModuleReview(id); else if (id) openReview(id); },
  };
}

function openModuleReview(id) {
  const s = getState();
  const m = s.modules.find(x => x.id === id);
  if (!m) return;
  const issues = S.validateModule(s, m);
  const pending = m.status === 'submitted';
  openModal(`${modalHead(esc(m.title), `Module by ${esc(S.userById(s, m.ownerId).name)} · ${esc(S.orgById(s, m.programId).name)}`)}
    <div class="modal-body">
      <div class="row gap-2 wrap">${badge(m.status)}${m.sectionIds.map(x => `<span class="chip">${icon('users')} ${esc(S.sectionById(s, x).code)}</span>`).join('')}<span class="chip">${icon('clock')} ${Math.round(S.moduleMinutes(s, m) / 6) / 10} h</span></div>
      ${issues.length ? `<div class="note note-warn">${icon('triangle-alert')}<div>${issues.map(esc).join('<br>')}</div></div>` : ''}
      <div class="note note-info">${icon('info')}<div>Approving locks the module and creates the class lessons. Weeks already running in those classes are kept.</div></div>
      ${moduleSummaryHtml(s, m)}
      ${pending ? '<label class="field"><span>Note to the lecturer (required to request changes)</span><textarea class="textarea" id="mod-review-note"></textarea></label>' : ''}
    </div>
    ${pending ? `<footer class="modal-foot"><button class="btn" data-action="mod-review" data-kind="changes" data-id="${m.id}">${icon('message-square-warning')} Request changes</button><button class="btn btn-primary" data-action="mod-review" data-kind="approve" data-id="${m.id}">${icon('lock')} Approve & lock</button></footer>` : ''}`,
  { drawer: true, wide: true, onClose: () => { if (location.hash.startsWith('#/director/approvals/')) location.hash = '/director/approvals'; } });
}

function openReview(id) {
  const s = getState();
  const l = S.lessonById(s, id);
  if (!l) return;
  const sec = S.sectionById(s, l.sectionId);
  const clash = s.lessons.find(x => x.id !== l.id && x.sectionId === l.sectionId && x.week === l.week && ['scheduled', 'published'].includes(x.status));
  const pending = l.status === 'submitted';
  openModal(`${modalHead(esc(l.title), `${esc(sec.code)} · week ${l.week} · ${esc(S.unitById(s, l.unitId).title)}`)}
    <div class="modal-body">
      <div class="row gap-3 wrap">${badge(l.status)}<span class="chip">${icon('user')} ${esc(S.userById(s, l.authorId).name)}</span><span class="chip">${icon('clock')} ${S.lessonMinutes(l)} min</span><span class="chip">${icon('calendar')} ${S.fmtDate(S.weekStartOf(s, l.week))}</span></div>
      ${clash ? `<div class="note note-warn">${icon('triangle-alert')}<div>Week ${l.week} already has "${esc(clash.title)}" for ${esc(sec.code)}.</div></div>` : ''}
      ${l.week <= s.clock.week && pending ? `<div class="note note-info">${icon('info')}<div>Week ${l.week} has already started — approving publishes this lesson to students immediately.</div></div>` : ''}
      <div><h4>Summary</h4><p class="muted mt-2">${esc(l.summary) || '<span class="faint">No summary provided.</span>'}</p></div>
      <div><h4 style="margin-bottom:8px">Blocks</h4>${lessonBlocks(l)}</div>
      <div><h4 style="margin-bottom:8px">History</h4>${lessonHistory(s, l)}</div>
      ${pending ? `<label class="field"><span>Note to instructor (required for changes or rejection)</span><textarea class="textarea" id="review-note" placeholder="e.g. Add a Lockout-Tagout checklist block"></textarea></label>` : ''}
    </div>
    ${pending ? `<footer class="modal-foot" style="justify-content:space-between"><button class="btn btn-danger" data-action="review" data-kind="reject" data-id="${l.id}">${icon('x')} Reject</button>
      <div class="row gap-2"><button class="btn" data-action="review" data-kind="changes" data-id="${l.id}">${icon('message-square-warning')} Request changes</button><button class="btn btn-primary" data-action="review" data-kind="approve" data-id="${l.id}">${icon('check')} Approve</button></div></footer>` : ''}`,
  { drawer: true, onClose: () => { if (location.hash.startsWith('#/director/approvals/')) location.hash = '/director/approvals'; } });
}

/* ---------------- timeline ---------------- */
function timeline(s) {
  const secs = S.scopedSections(s);
  return {
    title: 'Master timeline',
    html: `<div class="page">${pageHead('Master timeline', `${esc(s.term.title)} · ${s.term.weeks} weeks · week ${s.clock.week} in progress`)}
      <div class="grid">${secs.map(sec => {
        const ls = s.lessons.filter(l => l.sectionId === sec.id);
        const n = (st) => ls.filter(l => l.status === st).length;
        return `<div class="span-6">${card({ title: esc(sec.code), subtitle: esc(sec.instructorIds.map(id => S.userById(s, id).name).join(', ')), body: `<div class="row gap-2 wrap">${badge('published', `${n('published')} published`)}${badge('scheduled', `${n('scheduled')} scheduled`)}${badge('submitted', `${n('submitted')} in review`)}${badge('changes_requested', `${n('changes_requested')} changes`)}${badge('draft', `${n('draft')} drafts`)}${badge('missing', `${S.weekGaps(s, sec.id).length} gaps`)}</div>` })}</div>`;
      }).join('')}</div>
      ${card({ title: 'All weeks', actions: timelineLegend(), flush: true, body: termTimeline(s, { sections: secs, viewer: 'director', showGaps: true }) })}</div>`,
  };
}

/* ---------------- analytics ---------------- */
const drill = { studentId: null };
function analytics(s) {
  const secs = S.scopedSections(s);
  const students = S.studentsInSections(s, secs);
  if (!students.some(u => u.id === drill.studentId)) drill.studentId = students[0]?.id;
  const u = S.userById(s, drill.studentId);
  const g = S.courseGrade(s, u.id); const r = S.atRisk(s, u.id);
  const buckets = [0, 0, 0, 0, 0];
  students.forEach(x => { const v = S.courseGrade(s, x.id).value; if (v !== null) buckets[Math.min(4, Math.floor(v / 2))]++; });
  return {
    title: 'Analytics',
    html: `<div class="page">${pageHead('Analytics', `${secs.map(x => esc(x.code)).join(', ')} · ${students.length} students`)}
      <div class="grid"><div class="span-6">${card({ title: 'Grade distribution', subtitle: 'Course grade, 0–10', body: '<div class="chart-box sm"><canvas id="an-dist"></canvas></div>' })}</div>
      <div class="span-6">${card({ title: 'Section comparison', body: '<div class="chart-box sm"><canvas id="an-sec"></canvas></div>' })}</div></div>
      ${card({ title: 'Student drill-down', actions: `<select class="select select-sm" data-change="drill-student">${students.map(x => `<option value="${x.id}" ${x.id === u.id ? 'selected' : ''}>${esc(x.name)} (${esc(S.sectionById(s, x.sectionId).code)})</option>`).join('')}</select>`, body: `
        <div class="grid"><div class="span-5"><div class="row gap-3">${avatar(u, 'lg')}<div><h3>${esc(u.name)}</h3><div class="small muted">${u.id} · ${esc(S.sectionById(s, u.sectionId).code)} · ${esc(u.email)}</div></div></div>
          <div class="grid mt-4" style="gap:10px"><div class="span-6">${kpi({ label: 'Course grade', value: g.value === null ? '—' : g.value.toFixed(1), sub: g.provisional ? 'Provisional' : '' })}</div><div class="span-6">${kpi({ label: 'Engagement', value: `${S.engagement(s, u.id) ?? '—'}%`, sub: S.fmtMinutes(S.studyMinutes(s, u.id)) + ' studied' })}</div></div>
          <div class="mt-3">${r.flag ? `<div class="note note-danger">${icon('triangle-alert')}<div>${esc(r.reasons.join('; '))}</div></div>` : `<div class="note note-ok">${icon('circle-check')}<div>On track</div></div>`}</div></div>
        <div class="span-7"><div class="chart-box"><canvas id="an-radar"></canvas></div></div></div>` })}
      ${card({ title: 'Full gradebook', flush: true, body: gradebookTable(s, secs) })}</div>`,
    mount: () => {
      makeChart('an-dist', { type: 'bar', data: { labels: ['0–2', '2–4', '4–6', '6–8', '8–10'], datasets: [{ label: 'Students', data: buckets, backgroundColor: buckets.map((_, i) => i < 2 ? cssVar('--danger') : cssVar('--brand')), borderRadius: 4 }] }, options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: cssVar('--border') } }, x: { grid: { display: false } } } } });
      sectionChart(s, 'an-sec', secs);
      radarChart('an-radar', [{ label: u.name, values: S.competency(s, [u.id]) }, { label: `${S.sectionById(s, u.sectionId).code} average`, values: S.competency(s, S.sectionById(s, u.sectionId).studentIds) }, { label: 'Benchmark', values: BENCHMARK, dashed: true }]);
    },
  };
}

function explore(s, id, me) { return explorerView(s, me, id || me.orgId, '#/director/explore'); }

function curriculum(s, id, me) {
  const progs = S.programsUnder(s, me.orgId);
  const prog = progs.find(p => p.id === id) || progs[0];
  if (!prog) return { title: 'Curriculum', html: card({ body: empty('blocks', 'No programmes in your school') }) };
  const v = designerView(s, prog, me);
  const picker = progs.length > 1 ? `<select class="select select-sm" data-change="cur-program">${progs.map(p => `<option value="${p.id}" ${p.id === prog.id ? 'selected' : ''}>${esc(S.orgById(s, p.id).name)}</option>`).join('')}</select>` : '';
  return {
    title: 'Curriculum',
    html: `<div class="page">${pageHead('Curriculum designer', `Build the year plan for ${esc(S.orgById(s, prog.id).name)} from the ${esc(s.framework.title)} skeleton. Changes apply to the next intake after approval.`, picker)}
      ${v.html}
      ${card({ title: 'Compare with other programmes', subtitle: 'Current intake, all schools', flush: true, body: compareMatrix(s, s.programs) })}</div>`,
    mount: v.mount,
  };
}

function library(s) { return libraryView(s); }
function book(s, id) { return readerView(s, id); }
function studio(s, id, me) { return studioView(s, id, me); }

export const ROUTES = { dashboard, explore, staff: staffView, curriculum, approvals, library, book, studio, timeline, analytics };

const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
export const actions = {
  review: (el) => {
    const note = document.getElementById('review-note')?.value || '';
    const type = { approve: 'LESSON_APPROVED', changes: 'LESSON_CHANGES_REQUESTED', reject: 'LESSON_REJECTED' }[el.dataset.kind];
    if (dispatch(type, { id: el.dataset.id, note })) closeModal();
  },
  'bulk-approve': async () => {
    const s = getState(); const list = S.pendingApprovals(s, S.scopedSections(s));
    const ok = await confirmDialog({ title: `Approve ${list.length} lessons?`, body: `<ul style="margin:0;padding-left:18px">${list.map(l => `<li><strong>${esc(l.title)}</strong> — ${esc(S.sectionById(s, l.sectionId).code)}, week ${l.week}</li>`).join('')}</ul><p class="small muted mt-2">Each lesson is scheduled for its week and its instructor is notified.</p>`, confirmLabel: `Approve ${list.length}` });
    if (ok) dispatch('TERM_BULK_APPROVED', { ids: list.map(l => l.id) });
  },
  'mod-review': (el) => {
    const note = document.getElementById('mod-review-note')?.value || '';
    if (dispatch(el.dataset.kind === 'approve' ? 'MODULE_APPROVED' : 'MODULE_CHANGES_REQUESTED', { id: el.dataset.id, note })) closeModal();
  },
  'drill-student': (el) => { drill.studentId = el.value; rerender(); },
  'cur-program': (el) => { resetDraft(); location.hash = `/director/curriculum/${el.value}`; },
};

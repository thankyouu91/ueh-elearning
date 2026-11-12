import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { subjectChip, esc, icon, badge, kpi, card, empty, progress, pageHead, TYPE_META, ASSESS_META, openModal, closeModal, modalHead, confirmDialog, makeChart, cssVar, avatar, toast } from '../ui.js';
import { termTimeline, timelineLegend, gradebookTable, lessonBlocks, lessonHistory, radarChart, BENCHMARK, startHere } from './shared.js';
import { marketSimHtml, startMarketSim } from '../features/market-sim.js';
import { libraryView, readerView, RES_META, materialBlock, materialHtml, mountMaterials, resourceBody } from './library.js';
import { modulesView } from './modules.js';
import { studioView } from './studio.js';
import { lecturerWorkbook, lecturerCases } from './workbook.js';
import { caseEditor, pageEditor, slideHtml, mountMedia } from './bento.js';

export const NAV = [
  { page: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { page: 'live', label: 'Teach live', icon: 'presentation' },
  { header: 'Teaching' },
  { page: 'lessons', label: 'Lessons', icon: 'layers', also: ['builder', 'pageedit'] },
  { page: 'modules', label: 'Modules', icon: 'calendar-range' },
  { page: 'calendar', label: 'Calendar', icon: 'calendar-days' },
  { header: 'Materials' },
  { page: 'library', label: 'Library', icon: 'library-big', also: ['book'] },
  { page: 'workbook', label: 'Workbook & cases', icon: 'notebook-pen', also: ['cases', 'caseedit'] },
  { header: 'Assessment' },
  { page: 'gradebook', label: 'Grades & marking', icon: 'clipboard-pen', also: ['marking'], countKey: 'grading' },
  { page: 'assessments', label: 'Assessments', icon: 'clipboard-check' },
  { page: 'studio', label: 'Exam studio', icon: 'pen-tool', countKey: 'studio' },
];

const mySections = (s, me) => S.sectionsForUser(s, me);
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));

/* ---------------- dashboard ---------------- */
const dashUi = { filter: 'all', q: '', sort: 'attention' };
/** One class as the lecturer sees it: progress, results and what needs doing. */
function classHealth(s, sec, me) {
  const st = S.orgStats(s, [sec]);
  const mark = S.pendingMarking(s, [sec], me.id).length;
  const rel = S.releasedUnits(s, sec.id);
  const wb = sec.studentIds.length ? Math.round(sec.studentIds.reduce((t, id) => t + S.workbookProgress(s, id, rel).pct, 0) / sec.studentIds.length) : 0;
  const live = S.publishedLessons(s, sec.id).filter(l => l.week <= s.clock.week).length;
  const nw = s.clock.week + 1;
  const nextUnit = nw <= s.term.weeks ? S.unitForWeek(s, sec.id, nw) : null;
  const mineNext = nextUnit && S.teachesUnit(s, me.id, sec.id, nextUnit.id);
  const nextLesson = mineNext ? s.lessons.find(l => l.sectionId === sec.id && l.week === nw && l.status !== 'rejected') : null;
  const nextReady = !mineNext || ['submitted', 'scheduled', 'published'].includes(nextLesson?.status);
  // Only things that need action this week flag a class; routine marking stays in the footer counts.
  const reasons = [st.atRisk && `${st.atRisk} at risk`, mark > 10 && `${mark} to mark`, !nextReady && `Week ${nw} lesson not ready`, st.engagement !== null && st.engagement < 65 && 'Low engagement'].filter(Boolean);
  return { sec, st, mark, wb, live, nw, nextUnit, mineNext, nextLesson, reasons, attention: reasons.length > 0 };
}
function classCard(s, h, me) {
  const { sec, st } = h;
  const prog = S.programOfSection(s, sec.id);
  const bar = (label, pct, tone) => `<div class="cc-bar"><span>${label}</span>${progress(pct, tone)}<b>${Math.round(pct)}%</b></div>`;
  const next = !h.nextUnit ? '<span class="faint">Term ends</span>' : !h.mineNext ? `<span class="faint">W${h.nw} · ${h.nextUnit.id} (colleague)</span>` : `W${h.nw} · ${h.nextUnit.id} ${badge(h.nextLesson?.status || 'missing', h.nextLesson ? undefined : 'No lesson')}`;
  return `<a class="class-card ${h.attention ? 'attn' : ''}" href="#/instructor/gradebook/${sec.id}">
    <div class="row between gap-2"><strong class="cc-code">${esc(sec.code)}</strong><span class="row gap-2"><button class="code-chip" data-action="class-share" data-id="${sec.id}" title="Class code — send it to students">${icon('ticket', 'ic-xs')} ${S.joinCodeOf(sec)}</button>${sec.studentIds.length ? (h.attention ? badge('warn', 'Needs attention') : badge('ok', 'On track')) : badge('info', 'New')}</span></div>
    <div class="small muted">${esc(prog.code)} · ${st.students} students · ${S.lecturerSubjects(s, me.id, sec.id).map(k => subjectChip(s, k)).join(' ') || '<span class="faint">lead only</span>'}</div>
    ${h.attention ? `<div class="small t-warn">${icon('triangle-alert')} ${esc(h.reasons.join(' · '))}</div>` : ''}
    ${bar('Delivery', (h.live / s.clock.week) * 100, h.live < s.clock.week ? 'warn' : 'ok')}
    ${bar('Workbook', h.wb, h.wb < 50 ? 'danger' : h.wb < 75 ? 'warn' : 'ok')}
    <div class="cc-stats"><span>Avg <b>${st.avg === null ? '—' : st.avg.toFixed(1)}</b></span><span>Pass <b>${st.pass ?? '—'}%</b></span><span>Eng <b>${st.engagement ?? '—'}%</b></span></div>
    <div class="cc-foot small"><span>${st.atRisk ? `<span class="t-danger">${icon('user-x')} ${st.atRisk}</span>` : `${icon('user-check')} 0`}</span><span>${icon('clipboard-pen')} ${h.mark}</span><span class="grow" style="text-align:right">${next}</span></div>
  </a>`;
}

function dashboard(s, _id, me) {
  const secs = mySections(s, me);
  const students = S.studentsInSections(s, secs);
  const health = secs.map(sec => classHealth(s, sec, me));
  const grades = students.map(u => S.courseGrade(s, u.id).value).filter(v => v !== null);
  const avgGrade = grades.length ? S.round1(grades.reduce((t, v) => t + v, 0) / grades.length) : null;
  const passRate = grades.length ? Math.round((grades.filter(v => v >= s.course.gradingScheme.passMark).length / grades.length) * 100) : null;
  const toMark = S.pendingMarking(s, secs, me.id).length;
  const ungraded = S.ungradedWorkshop(s, secs);
  const mine = s.lessons.filter(l => secs.some(x => x.id === l.sectionId) && l.authorId === me.id);
  const pending = mine.filter(l => l.status === 'submitted');
  const changes = mine.filter(l => ['changes_requested', 'rejected'].includes(l.status));
  const atRisk = students.filter(u => S.atRisk(s, u.id).flag).length;
  const attn = health.filter(h => h.attention).length;

  let shown = health.filter(h => (dashUi.filter === 'all' || (dashUi.filter === 'attention') === h.attention) && (!dashUi.q || h.sec.code.toLowerCase().includes(dashUi.q.toLowerCase())));
  shown = shown.sort(dashUi.sort === 'code' ? (a, b) => a.sec.code.localeCompare(b.sec.code)
    : dashUi.sort === 'grade' ? (a, b) => (a.st.avg ?? 99) - (b.st.avg ?? 99)
    : (a, b) => b.reasons.length - a.reasons.length || b.st.atRisk - a.st.atRisk || a.sec.code.localeCompare(b.sec.code));

  const queue = [
    ...changes.map(l => `<a class="list-item" href="#/instructor/builder/${l.id}"><span class="li-icon warn">${icon('message-square-warning')}</span><div class="grow"><div class="title">${esc(l.title)}</div><div class="meta">${esc(S.sectionById(s, l.sectionId).code)} · ${l.status === 'rejected' ? 'Rejected' : 'Changes requested'}: "${esc(l.reviewNote)}"</div></div></a>`),
    ...(toMark ? [`<a class="list-item" href="#/instructor/gradebook"><span class="li-icon warn">${icon('clipboard-pen')}</span><div class="grow"><div class="title">${toMark} written answers to mark</div><div class="meta">Workbook and case tasks in your subjects</div></div></a>`] : []),
    ...(ungraded.length ? [`<a class="list-item" href="#/instructor/gradebook"><span class="li-icon warn">${icon('clipboard-check')}</span><div class="grow"><div class="title">${ungraded.length} case reports to grade</div><div class="meta">${esc([...new Set(ungraded.map(x => x.section.code))].join(', '))}</div></div></a>`] : []),
    ...health.filter(h => h.mineNext && !['submitted', 'scheduled', 'published'].includes(h.nextLesson?.status)).map(h => `<a class="list-item" href="${h.nextLesson ? `#/instructor/builder/${h.nextLesson.id}` : '#/instructor/lessons'}"><span class="li-icon">${icon('calendar-plus')}</span><div class="grow"><div class="title">Week ${h.nw} · ${esc(h.sec.code)} · ${h.nextUnit.id}</div><div class="meta">${h.nextLesson ? 'Draft — submit it for approval' : 'Nothing planned yet'}</div></div></a>`),
    ...pending.map(l => `<a class="list-item" href="#/instructor/builder/${l.id}"><span class="li-icon">${icon('hourglass')}</span><div class="grow"><div class="title">${esc(l.title)}</div><div class="meta">${esc(S.sectionById(s, l.sectionId).code)} · waiting for the Dean since ${S.fmtDate(l.submittedAt)}</div></div></a>`),
  ];
  const chip = (k, label, n) => `<button class="chip-btn ${dashUi.filter === k ? 'active' : ''}" data-action="dash-filter" data-k="${k}">${label} <span>${n}</span></button>`;

  const closedAssess = secs.flatMap(sec => S.assessmentsForSection(s, sec.id)).filter((a, i, arr) => arr.findIndex(x => x.id === a.id) === i && a.type !== 'workshop' && s.attempts.some(t => t.assessmentId === a.id && students.some(u => u.id === t.studentId)));
  return {
    title: 'Dashboard',
    html: `<div class="page">
      ${pageHead(`Good morning, ${esc(me.name)}`, `${secs.length} classes · ${students.length} students · week ${s.clock.week} of ${s.term.weeks}`, `<button class="btn" data-action="class-new">${icon('users-round')} Open a class</button><a class="btn" href="#/instructor/live">${icon('radio')} Start live session</a><a class="btn btn-primary" href="#/instructor/lessons?new">${icon('plus')} New lesson</a>`)}
      ${startHere(s, me, [
        ['#/instructor/lessons', 'layers', "Prepare next week's lesson", 'Create or edit a lesson for one of your classes.'],
        ['#/instructor/gradebook', 'clipboard-pen', 'Mark student work', 'The number in the menu shows how many answers wait for you.'],
        ['#/instructor/live', 'presentation', 'Teach a live class', 'Start a session; students join with a PIN.'],
      ])}
      <div class="grid">
        <div class="span-3">${kpi({ label: 'Classes', value: `${secs.length}<small> · ${students.length} students</small>`, sub: attn ? `<span class="t-warn">${attn} need attention</span>` : 'All on track', iconName: 'school', tone: attn ? 'warn' : 'ok' })}</div>
        <div class="span-3">${kpi({ label: 'Average course grade', value: avgGrade === null ? '—' : `${avgGrade.toFixed(1)}<small> / 10</small>`, sub: `Pass rate ${passRate ?? '—'}% · ${atRisk} at risk`, iconName: 'chart-column', tone: atRisk ? 'danger' : '' })}</div>
        <div class="span-3">${kpi({ label: 'To mark', value: String(toMark + ungraded.length), sub: `${toMark} written · ${ungraded.length} case reports`, iconName: 'clipboard-pen', tone: toMark + ungraded.length ? 'warn' : 'ok' })}</div>
        <div class="span-3">${kpi({ label: 'Lessons in review', value: String(pending.length), sub: changes.length ? `<span class="t-warn">${changes.length} need changes</span>` : 'No changes requested', iconName: 'inbox', tone: changes.length ? 'warn' : '' })}</div>
      </div>
      <div class="grid">
        <div class="span-8">${card({ title: 'My classes', subtitle: 'Click a class to open its gradebook', flush: true, body: `
          <div class="row gap-2 wrap dash-tools">${chip('all', 'All', health.length)}${chip('attention', 'Needs attention', attn)}${chip('ok', 'On track', health.length - attn)}
            <span class="grow"></span><input class="input" style="max-width:160px;height:32px" placeholder="Find class…" value="${esc(dashUi.q)}" data-change="dash-q" aria-label="Find class">
            <select class="select select-sm" data-change="dash-sort" aria-label="Sort classes"><option value="attention" ${dashUi.sort === 'attention' ? 'selected' : ''}>Needs attention first</option><option value="grade" ${dashUi.sort === 'grade' ? 'selected' : ''}>Lowest average first</option><option value="code" ${dashUi.sort === 'code' ? 'selected' : ''}>Class code</option></select></div>
          <div class="class-grid">${shown.map(h => classCard(s, h, me)).join('') || empty('search-x', 'No classes match')}</div>` })}</div>
        <div class="span-4"><div class="sticky-side">${card({ title: 'Action needed', flush: true, body: queue.length ? `<div class="list">${queue.join('')}</div>` : empty('circle-check', 'All clear', 'Nothing needs your attention.') })}</div></div>
      </div>
      <div class="grid">
        <div class="span-5">${card({ title: 'Class competencies', subtitle: '% correct by skill', body: '<div class="chart-box"><canvas id="in-radar"></canvas></div>' })}</div>
        <div class="span-7">${card({ title: 'Assessment results', subtitle: 'Average score and submission rate', body: closedAssess.length ? '<div class="chart-box"><canvas id="in-bar"></canvas></div>' : empty('chart-column', 'No results yet') })}</div>
      </div>
    </div>`,
    mount: () => {
      radarChart('in-radar', [{ label: 'My classes', values: S.competency(s, students.map(u => u.id)) }, { label: 'Benchmark', values: BENCHMARK, dashed: true }]);
      if (closedAssess.length) {
        const avgOf = (a) => { const v = students.map(u => S.assessmentResult(s, u.id, a)).filter(r => r.state === 'graded').map(r => r.value); return v.length ? S.round1(v.reduce((t, x) => t + x, 0) / v.length) : 0; };
        const rate = (a) => { const ss = students.filter(u => a.sectionIds.includes(u.sectionId)); return ss.length ? Math.round((ss.filter(u => S.attemptsOf(s, u.id, a.id).length).length / ss.length) * 100) : 0; };
        makeChart('in-bar', {
          type: 'bar',
          data: { labels: closedAssess.map(a => `${a.title.split(' · ')[0]} (${a.programId?.slice(2) || ''})`), datasets: [
            { label: 'Average (/10)', data: closedAssess.map(avgOf), backgroundColor: cssVar('--brand'), borderRadius: 4, yAxisID: 'y' },
            { label: 'Submitted (%)', data: closedAssess.map(rate), type: 'line', borderColor: cssVar('--brand-2'), backgroundColor: cssVar('--brand-2'), yAxisID: 'y2', tension: .3 } ] },
          options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10 } } }, scales: { y: { min: 0, max: 10, grid: { color: cssVar('--border') } }, y2: { position: 'right', min: 0, max: 100, grid: { display: false } }, x: { grid: { display: false } } } },
        });
      }
    },
  };
}

/* ---------------- lessons list ---------------- */
const lessonsUi = { tab: 'bank', mine: false, unit: '' };
function lessons(s, _id, me) {
  const secs = mySections(s, me);
  const list = s.lessons.filter(l => secs.some(x => x.id === l.sectionId) && (l.authorId === me.id || (l.unitId && S.teachesUnit(s, me.id, l.sectionId, l.unitId)))).sort((a, b) => (a.week ?? 99) - (b.week ?? 99));
  const bank = S.bankLessons(s).filter(l => (!lessonsUi.mine || l.authorId === me.id) && (!lessonsUi.unit || l.unitId === lessonsUi.unit)).sort((a, b) => a.unitId.localeCompare(b.unitId) || (b.authorId === me.id) - (a.authorId === me.id));
  if (location.hash.includes('?new')) setTimeout(() => { history.replaceState(null, '', '#/instructor/lessons'); openNewLesson(); }, 0);
  const libCount = (l) => l.blocks.filter(b => b.type === 'material' || b.type === 'resource').length;
  const useCount = (l) => s.modules.filter(m => m.weeks.some(w => w.lessonId === l.id)).length;
  const bankBody = bank.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>Unit</th><th>Lesson</th><th>Author</th><th class="num">Blocks</th><th class="num">Library items</th><th class="num">Duration</th><th class="num">In modules</th><th></th></tr></thead><tbody>
    ${bank.map(l => { const u = S.unitById(s, l.unitId); const mine = l.authorId === me.id; return `<tr><td><div class="row gap-2">${subjectChip(s, u.subject)}<span class="mono small">${u.id}</span></div></td>
      <td><a href="#/instructor/builder/${l.id}" style="font-weight:600">${esc(l.title)}</a></td><td class="small">${mine ? '<strong>You</strong>' : esc(S.userById(s, l.authorId).name)}</td>
      <td class="num">${l.blocks.length}</td><td class="num">${libCount(l) || '—'}</td><td class="num">${S.lessonMinutes(l)} min</td><td class="num">${useCount(l) || '—'}</td>
      <td class="num">${mine ? `<a class="btn btn-sm" href="#/instructor/builder/${l.id}">Edit</a>` : `<button class="btn btn-sm" data-action="dup-bank" data-id="${l.id}">${icon('copy')} Duplicate</button>`}</td></tr>`; }).join('')}</tbody></table></div>` : empty('book-copy', 'No lessons in the bank', 'Create a reusable lesson for a unit.');
  const classBody = list.length ? `<div class="table-wrap"><table class="table"><thead><tr><th class="num">Week</th><th>Lesson</th><th>Unit</th>${secs.length > 1 ? '<th>Class</th>' : ''}<th class="num">Duration</th><th>Status</th><th></th></tr></thead><tbody>
        ${list.map(l => `<tr><td class="num">${l.week ?? '—'}</td><td><a href="#/instructor/builder/${l.id}" style="font-weight:600">${esc(l.title)}</a>${l.moduleId ? ' <span class="chip">from module</span>' : ''}${l.reviewNote && ['changes_requested', 'rejected'].includes(l.status) ? `<div class="small t-warn truncate" style="max-width:360px">"${esc(l.reviewNote)}"</div>` : ''}</td><td>${l.unitId ? esc(l.unitId) : '—'}</td>${secs.length > 1 ? `<td>${esc(S.sectionById(s, l.sectionId).code)}</td>` : ''}<td class="num">${S.lessonMinutes(l)} min</td><td>${badge(l.status)}</td>
        <td class="num"><a class="btn btn-sm" href="#/instructor/builder/${l.id}">${['draft', 'changes_requested'].includes(l.status) ? 'Edit' : 'View'}</a></td></tr>`).join('')}</tbody></table></div>` : empty('layers', 'No class lessons yet');
  return {
    title: 'Lessons',
    html: `<div class="page">${pageHead('Lessons', 'Teaching one class this week? Create a lesson for that class. Want to reuse it every term? Create a reusable lesson.', `<button class="btn btn-primary" data-action="new-lesson">${icon('plus')} Lesson for one class</button><button class="btn" data-action="new-bank-lesson">${icon('copy-plus')} Reusable lesson</button>`)}
      ${card({ flush: true, body: `<div class="tabs" style="padding:0 12px"><button class="${lessonsUi.tab === 'bank' ? 'active' : ''}" data-action="lessons-tab" data-tab="bank">Lesson bank <span class="faint">${S.bankLessons(s).length}</span></button><button class="${lessonsUi.tab === 'class' ? 'active' : ''}" data-action="lessons-tab" data-tab="class">Class lessons <span class="faint">${list.length}</span></button></div>
        ${lessonsUi.tab === 'bank' ? `<div class="card-body row gap-2 wrap"><label class="opt" style="margin:0"><input type="checkbox" data-change="bank-mine" ${lessonsUi.mine ? 'checked' : ''}> Only mine</label>
          <select class="select select-sm" data-change="bank-unit"><option value="">All units</option>${s.units.map(u => `<option value="${u.id}" ${lessonsUi.unit === u.id ? 'selected' : ''}>${u.id} · ${esc(u.title)}</option>`).join('')}</select>
          <span class="small muted">Lessons from other lecturers can be duplicated into your bank and adapted.</span></div>${bankBody}` : classBody}` })}
    </div>`,
  };
}

function openNewBankLesson(unitId = '') {
  const s = getState();
  openModal(`${modalHead('New bank lesson', 'A reusable lesson for one unit. Add textbook extracts and library resources, then plan it into a module.')}
    <form data-submit="create-bank-lesson"><div class="modal-body"><div class="form-grid">
      <label class="field full"><span>Unit</span><select class="select" name="unitId">${s.units.map(u => `<option value="${u.id}" ${u.id === unitId ? 'selected' : ''}>${u.id} · ${esc(u.title)}</option>`).join('')}</select></label>
      <label class="field full"><span>Title (optional)</span><input class="input" name="title" placeholder="Defaults to the unit title"></label>
      <label class="opt full" style="margin:0"><input type="checkbox" name="template" checked> Start from the unit template</label>
    </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('plus')} Create</button></footer></form>`);
}
export { openNewBankLesson };

function weekOptions(s, sectionId) {
  const gaps = S.weekGaps(s, sectionId).filter(w => w >= s.clock.week);
  const me = S.currentUser(s);
  return Array.from({ length: s.term.weeks }, (_, i) => i + 1).filter(w => w >= s.clock.week && S.teachesUnit(s, me.id, sectionId, S.unitForWeek(s, sectionId, w).id)).map(w => {
    const u = S.unitForWeek(s, sectionId, w);
    return `<option value="${w}" ${w === gaps[0] ? 'selected' : ''}>Week ${w} · ${esc(u.id)} ${esc(u.title)}${gaps.includes(w) ? ' (free)' : ''}</option>`;
  }).join('');
}
function openNewLesson() {
  const s = getState(); const me = S.currentUser(s); const secs = mySections(s, me);
  openModal(`${modalHead('New lesson', 'The unit comes from your programme curriculum for that week. Nothing is visible to students until it is approved and its week begins.')}
    <form data-submit="create-lesson"><div class="modal-body"><div class="form-grid">
      <label class="field"><span>Class</span><select class="select" name="sectionId" data-change="new-lesson-section">${secs.map(x => `<option value="${x.id}">${esc(x.code)}</option>`).join('')}</select></label>
      <label class="field"><span>Teaching week</span><select class="select" name="week" id="new-lesson-week">${weekOptions(s, secs[0].id)}</select></label>
      <label class="field full"><span>Title (optional — defaults to the unit title)</span><input class="input" name="title" placeholder="Leave blank to use the unit title"></label>
      <label class="opt full" style="margin:0"><input type="checkbox" name="template" checked> Start from the unit template (theory, key terms, activity, practice check)</label>
    </div></div>
    <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('plus')} Create draft</button></footer></form>`);
}

/* ---------------- builder ---------------- */
const PALETTE = ['page', 'theory', 'vocabulary', 'simulation', 'calculation', 'case_study', 'quiz'];
const DEFAULT_MIN = { page: 15, theory: 25, vocabulary: 10, simulation: 20, calculation: 20, case_study: 25, quiz: 10 };

const LIB_KINDS = [['extract', 'Textbook extract', 'book-marked'], ...S.RESOURCE_TYPES.map(t => [t, RES_META[t].label, RES_META[t].icon])];
function blockMeta(s, b) {
  if (b.type === 'material') { const x = S.extractById(s, b.extractId); return x ? `${esc(S.bookById(s, x.bookId).title)} · pp. ${x.fromPage}–${x.toPage}` : 'Extract removed'; }
  if (b.type === 'resource') { const r = S.resourceById(s, b.resourceId); return r ? `${RES_META[r.type].label}${b.extra ? ' · add-on session' : ''}` : 'Resource removed'; }
  if (b.type === 'page') return b.layout?.length ? `Page · ${b.layout.length} tiles · ${S.slidesOf({ blocks: [b] }).length} slides` : 'Page · empty — click Edit page';
  return TYPE_META[b.type]?.label || b.type;
}
const pageLink = (l, b, editable) => b.type === 'page' ? `<a class="btn btn-sm ${editable ? 'btn-primary' : ''}" href="#/instructor/pageedit/${l.id}~${b.id}">${icon(editable ? 'pencil' : 'eye')} ${editable ? 'Edit page' : 'Open page'}</a>` : '';

/** Reviewer checklist for the lesson, and where this class struggles in the units taught so far. */
function lessonAids(s, l, editable) {
  const checks = S.lessonQuality(s, l);
  const passed = checks.filter(c => c.ok).length;
  const quality = card({ title: 'Lesson quality', subtitle: 'Checklist used by reviewers', actions: `<span class="score-num ${passed === checks.length ? 't-ok' : passed >= 4 ? '' : 't-warn'}">${passed}<small>/${checks.length}</small></span>`, body: `<ul class="checklist">${checks.map(c => `<li class="${c.ok ? 'ok' : 'todo'}">${icon(c.ok ? 'circle-check' : 'circle-dashed')}<div><div>${c.label}</div>${c.ok ? '' : `<div class="small muted">${esc(c.hint)}</div>`}</div></li>`).join('')}</ul>` });
  const sec = l.sectionId ? S.sectionById(s, l.sectionId) : null;
  const units = sec ? S.curriculumOfSection(s, sec.id).slice(0, Math.max(l.week || s.clock.week, 1)) : [l.unitId].filter(Boolean);
  const ids = sec ? sec.studentIds : s.users.filter(u => u.role === 'student').map(u => u.id);
  const spots = units.length ? S.weakSpots(s, ids, units) : [];
  const weak = card({ title: 'Where students struggle', subtitle: sec ? `${esc(sec.code)} · units taught so far` : 'All classes · this unit', flush: true, body: spots.length ? `<div class="list">${spots.map(w => `<div class="list-item"><div class="grow"><div class="small" style="font-weight:600">${esc(w.title.length > 90 ? w.title.slice(0, 88) + '…' : w.title)}</div><div class="meta">${w.unitId} · ${w.source} · ${w.pct}% correct · ${w.n} answers</div></div></div>`).join('')}</div>
      ${editable ? `<div class="row gap-2 wrap" style="padding:12px 22px;border-top:1px solid var(--border)"><span class="small muted grow">Revisit these in class:</span><button class="btn btn-sm" data-action="add-block" data-type="calculation">${icon('calculator')} Add worked problem</button><button class="btn btn-sm" data-action="add-block" data-type="quiz">${icon('list-checks')} Add practice check</button></div>` : ''}`
    : `<div class="card-body small muted">No weak spots yet — fewer than 3 answers per question, or students score 60 % or more.</div>` });
  return quality + weak;
}
function blockIcon(s, b) {
  if (b.type === 'resource') { const r = S.resourceById(s, b.resourceId); return RES_META[r?.type]?.icon || 'paperclip'; }
  return TYPE_META[b.type]?.icon || 'square';
}

function builder(s, id, me) {
  const l = S.lessonById(s, id);
  const isBank = l?.status === 'template';
  if (!l || (!isBank && !mySections(s, me).some(x => x.id === l.sectionId))) return { title: 'Lesson', html: card({ body: empty('file-x', 'Lesson not found', '', '<a class="btn mt-3" href="#/instructor/lessons">Back to lessons</a>') }) };
  const editable = isBank ? l.authorId === me.id : ['draft', 'changes_requested'].includes(l.status);
  const total = S.lessonMinutes(l);
  const clash = !isBank && l.week && s.lessons.find(x => x.id !== l.id && x.sectionId === l.sectionId && x.week === l.week && !['draft', 'rejected', 'changes_requested'].includes(x.status));
  const issues = isBank ? [] : [!l.title.trim() && 'Add a title', !l.week && 'Choose a week', !l.blocks.length && 'Add at least one block', clash && `Week ${l.week} already has "${clash.title}"`].filter(Boolean);
  const unit = l.unitId ? S.unitById(s, l.unitId) : null;
  const modulesUsing = s.modules.filter(m => m.weeks.some(w => w.lessonId === l.id));

  const statusNote = isBank ? `<div class="note note-info">${icon('book-copy')}<div>Bank lesson for <strong>${l.unitId}</strong>${l.authorId === me.id ? '' : ` by ${esc(S.userById(s, l.authorId).name)} — duplicate it to adapt`}. Plan it into weeks on the <a href="#/instructor/modules">Modules</a> page.${modulesUsing.length ? ` Used in ${modulesUsing.length} module(s).` : ''}</div></div>` : ({
    changes_requested: `<div class="note note-warn">${icon('message-square-warning')}<div><strong>Changes requested by ${esc(S.userById(s, l.reviewedBy)?.name)}:</strong> "${esc(l.reviewNote)}"</div></div>`,
    rejected: `<div class="note note-danger">${icon('circle-x')}<div><strong>Rejected:</strong> "${esc(l.reviewNote)}"<div class="mt-2"><button class="btn btn-sm" data-action="reopen-lesson" data-id="${l.id}">Reopen as draft</button></div></div></div>`,
    submitted: `<div class="note note-info">${icon('hourglass')}<div>Waiting for the Dean's approval. Editing is locked.</div></div>`,
    scheduled: `<div class="note note-info">${icon('calendar-check')}<div>Approved — publishes automatically when week ${l.week} starts.</div></div>`,
    published: `<div class="note note-ok">${icon('circle-check')}<div>Live for students since ${S.fmtDate(l.publishedAt)}.</div></div>`,
  }[l.status] || '');

  const palette = card({ title: 'Blocks', subtitle: editable ? 'Drag onto the canvas or click to add' : 'Editing locked', body: `<div class="stack gap-2">${PALETTE.map(t => `<button class="palette-item" draggable="${editable}" data-type="${t}" data-action="add-block" ${editable ? '' : 'disabled'}>${icon(TYPE_META[t].icon)}<div class="grow"><div style="font-weight:500">${TYPE_META[t].label}</div><div class="small faint">${DEFAULT_MIN[t]} min default</div></div></button>`).join('')}
    <div class="nav-label" style="padding-left:2px">From the library</div>
    ${LIB_KINDS.map(([k, label, ic]) => `<button class="palette-item lib" data-action="pick-library" data-kind="${k}" ${editable ? '' : 'disabled'}>${icon(ic)}<div class="grow"><div style="font-weight:500">${label}</div><div class="small faint">${k === 'extract' ? s.library.extracts.length : s.resources.filter(r => r.type === k).length} available</div></div>${icon('chevron-right', 'faint')}</button>`).join('')}</div>` });

  const canvas = card({ title: esc(l.title || 'Untitled lesson'), subtitle: `${l.blocks.length} blocks · ${total} min total`, actions: `${l.blocks.length ? `<button class="btn btn-sm" data-action="present-lesson" data-id="${l.id}">${icon('presentation')} Present</button>` : ''}${badge(isBank ? 'accent' : l.status, isBank ? 'Lesson bank' : undefined)}`, body: editable ? `<div class="drop-zone" id="drop-zone">${l.blocks.length ? l.blocks.map((b, i) => `<div class="block-row ${b.type === 'material' || b.type === 'resource' ? 'lib-row' : ''}" data-index="${i}"><span class="num">${i + 1}</span>${icon(blockIcon(s, b))}
        <div class="grow stack" style="gap:2px"><input class="input" value="${esc(b.title)}" data-change="block-title" data-i="${i}" aria-label="Block title"><span class="small faint" style="padding-left:2px">${blockMeta(s, b)}</span></div>
        <input class="input mins" type="number" min="1" max="240" value="${b.minutes}" data-change="block-mins" data-i="${i}" aria-label="Minutes">
        ${pageLink(l, b, true)}<button class="btn btn-ghost btn-sm btn-icon" data-action="block-preview" data-lesson="${l.id}" data-block="${b.id}" aria-label="Preview" title="Preview as students see it">${icon('eye')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="move-block" data-i="${i}" data-d="-1" ${i === 0 ? 'disabled' : ''} aria-label="Move up">${icon('arrow-up')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="move-block" data-i="${i}" data-d="1" ${i === l.blocks.length - 1 ? 'disabled' : ''} aria-label="Move down">${icon('arrow-down')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="remove-block" data-i="${i}" aria-label="Remove">${icon('trash-2')}</button></div>`).join('') : `<div class="empty">${icon('mouse-pointer-click')}<strong>Drop blocks here</strong><p>Drag a block from the palette, or add material from the library.</p></div>`}</div>`
      : `<div class="stack gap-2">${l.blocks.map((b, i) => `<div class="block-row clickable" data-action="block-preview" data-lesson="${l.id}" data-block="${b.id}" role="button" tabindex="0"><span class="num">${i + 1}</span>${icon(blockIcon(s, b))}<div class="grow"><div style="font-weight:500">${esc(b.title)}</div><div class="small muted">${blockMeta(s, b)}</div></div>${pageLink(l, b, false)}<span class="chip">${b.minutes} min</span></div>`).join('')}</div>` });

  const settings = card({ title: isBank ? 'Bank lesson' : 'Lesson settings', body: `<div class="stack gap-3">
      ${statusNote}
      <label class="field"><span>Title</span><input class="input" value="${esc(l.title)}" data-change="lesson-field" data-field="title" ${editable ? '' : 'disabled'}></label>
      ${isBank ? '' : `<div class="form-grid"><label class="field"><span>Week</span><select class="select" data-change="lesson-field" data-field="week" ${editable ? '' : 'disabled'}><option value="">—</option>${Array.from({ length: s.term.weeks }, (_, i) => i + 1).map(w => `<option value="${w}" ${l.week === w ? 'selected' : ''} ${w < s.clock.week && l.week !== w ? 'disabled' : ''}>Week ${w}</option>`).join('')}</select></label>
      <label class="field"><span>Class</span><input class="input" value="${esc(S.sectionById(s, l.sectionId).code)}" disabled></label></div>`}
      <div class="field"><span>Unit${isBank ? '' : ' (from the programme curriculum)'}</span>${unit ? `<div class="row gap-2">${subjectChip(s, unit.subject)}<span class="small"><strong>${esc(unit.id)}</strong> ${esc(unit.title)}</span></div>` : '<span class="small faint">Choose a week</span>'}</div>
      <label class="field"><span>Summary for students</span><textarea class="textarea" data-change="lesson-field" data-field="summary" ${editable ? '' : 'disabled'} placeholder="What will students be able to do after this lesson?">${esc(l.summary)}</textarea></label>
      ${!isBank && editable ? `${issues.length ? `<div class="note note-info">${icon('info')}<div>${issues.map(esc).join('<br>')}</div></div>` : ''}
        <button class="btn btn-primary" data-action="submit-lesson" data-id="${l.id}" ${issues.length ? 'disabled' : ''}>${icon('send')} Submit for approval</button>
        ${l.status === 'draft' ? `<button class="btn btn-ghost" data-action="delete-lesson" data-id="${l.id}">${icon('trash-2')} Delete draft</button>` : ''}` : ''}
      ${isBank && editable ? `<button class="btn btn-ghost" data-action="delete-lesson" data-id="${l.id}">${icon('trash-2')} Delete from bank</button>` : ''}
      ${isBank && !editable ? `<button class="btn btn-primary" data-action="dup-bank" data-id="${l.id}">${icon('copy')} Duplicate to my bank</button>` : ''}
      ${l.status === 'published' ? `<a class="btn" href="#/instructor/live">${icon('radio')} Present live</a>` : ''}
    </div>` });

  return {
    title: l.title,
    html: `<div class="page">${pageHead('Lesson builder', isBank ? `Lesson bank · ${l.unitId}` : `${esc(S.sectionById(s, l.sectionId).code)} · ${l.week ? `Week ${l.week}` : 'No week yet'}`, `<a class="btn" href="#/instructor/lessons">${icon('arrow-left')} Lessons</a>`)}
      <div class="builder">${palette}<div class="stack gap-4">${canvas}${l.history.length ? card({ title: 'History', body: lessonHistory(s, l) }) : ''}</div><div class="stack gap-4">${settings}${lessonAids(s, l, editable)}</div></div></div>`,
    mount: () => {
      if (!editable) return;
      const zone = document.getElementById('drop-zone');
      document.querySelectorAll('.palette-item[data-type]').forEach(p => p.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', p.dataset.type); e.dataTransfer.effectAllowed = 'copy'; }));
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => {
        e.preventDefault(); zone.classList.remove('over');
        const type = e.dataTransfer.getData('text/plain');
        if (!TYPE_META[type]) return;
        const rows = [...zone.querySelectorAll('.block-row')];
        const at = rows.findIndex(r => e.clientY < r.getBoundingClientRect().top + r.offsetHeight / 2);
        addBlock(type, at === -1 ? undefined : at);
      });
    },
  };
}

function openLibraryPicker(kind) {
  const s = getState();
  const l = S.lessonById(s, location.hash.split('/')[3]);
  const items = kind === 'extract'
    ? s.library.extracts.map(x => ({ id: x.id, title: x.title, unitId: x.unitId, meta: `${S.bookById(s, x.bookId).title} · pp. ${x.fromPage}–${x.toPage}` }))
    : s.resources.filter(r => r.type === kind).map(r => ({ id: r.id, title: r.title, unitId: r.unitId, meta: `${r.minutes} min · ${esc(r.body.slice(0, 90))}…` }));
  items.sort((a, b) => (b.unitId === l.unitId) - (a.unitId === l.unitId));
  const label = kind === 'extract' ? 'Textbook extracts' : RES_META[kind].plural;
  openModal(`${modalHead(`Add from the library · ${label}`, l.unitId ? `Items for ${l.unitId} are listed first` : '')}
    <div class="modal-body">${items.length ? `<div class="list" style="border:1px solid var(--border);border-radius:var(--radius-sm);max-height:420px;overflow-y:auto">${items.map(i => `<div class="list-item"><div class="grow"><div class="title">${esc(i.title)} ${i.unitId ? `<span class="chip">${i.unitId}</span>` : ''}${i.unitId === l.unitId ? ' <span class="badge b-accent">Same unit</span>' : ''}</div><div class="meta">${i.meta}</div></div>
      <button class="btn btn-sm btn-primary" data-action="pick-library-item" data-kind="${kind === 'extract' ? 'extract' : 'resource'}" data-id="${i.id}">${icon('plus')} Add</button></div>`).join('')}</div>`
      : empty(kind === 'extract' ? 'scissors' : 'library', 'Nothing here yet', kind === 'extract' ? 'Open a book in the Library and save a page range as an extract.' : 'Add one from the Library page.', `<a class="btn mt-3" href="#/instructor/library">Open library</a>`)}</div>`, { wide: true });
}

function updateBlocks(fn) {
  const s = getState(); const id = location.hash.split('/')[3];
  const l = S.lessonById(s, id);
  const blocks = l.blocks.map(b => ({ ...b }));
  fn(blocks);
  dispatch('LESSON_UPDATED', { id, patch: { blocks } });
}
function addBlock(type, at) {
  const lessonId = location.hash.split('/')[3];
  const b = { id: `B-${Date.now().toString(36)}`, type, title: type === 'page' ? 'New page' : TYPE_META[type].label, minutes: DEFAULT_MIN[type], ...(type === 'page' ? { layout: [] } : {}) };
  updateBlocks(blocks => { if (at === undefined) blocks.push(b); else blocks.splice(at, 0, b); });
  // a new page opens straight in the page editor
  if (type === 'page' && S.lessonById(getState(), lessonId).blocks.some(x => x.id === b.id)) location.hash = `/instructor/pageedit/${lessonId}~${b.id}`;
}

/* ---------------- assessments ---------------- */
function assessments(s, _id, me) {
  const secs = mySections(s, me);
  const students = S.studentsInSections(s, secs);
  const list = secs.flatMap(sec => S.assessmentsForSection(s, sec.id)).filter((a, i, arr) => arr.findIndex(x => x.id === a.id) === i);
  return {
    title: 'Assessments',
    html: `<div class="page">${pageHead('Assessments', 'Your quizzes and workshop tasks, plus standardized exams set by the Academic Director', `<button class="btn btn-primary" data-action="new-assessment">${icon('plus')} New assessment</button>`)}
      ${card({ flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Assessment</th><th>Type</th><th>Window</th><th>Status</th><th class="num">Submitted</th><th class="num">Average</th></tr></thead><tbody>
      ${list.map(a => {
        const res = students.map(u => S.assessmentResult(s, u.id, a));
        const graded = res.filter(r => r.state === 'graded');
        const sub = a.type === 'workshop' ? graded.length : students.filter(u => S.attemptsOf(s, u.id, a.id).length).length;
        const avg = graded.length ? S.round1(graded.reduce((t, r) => t + r.value, 0) / graded.length) : null;
        return `<tr><td><strong>${esc(a.title)}</strong> ${a.origin === 'standardized' ? '<span class="chip">Standardized</span>' : ''}<div class="small faint">${a.questionIds.length ? `${a.questionIds.length} questions` : 'Rubric graded'}${a.timeLimitMin ? ` · ${a.timeLimitMin} min` : ''} · ${a.maxAttempts} attempt${a.maxAttempts > 1 ? 's' : ''}</div></td>
          <td>${ASSESS_META[a.type].label}</td><td class="small">${S.fmtDate(a.opensAt)} – ${S.fmtDate(a.closesAt)}</td><td>${badge(S.assessmentStatus(s, a))}</td>
          <td class="num">${sub}/${students.length}</td><td class="num">${avg === null ? '—' : avg.toFixed(1)}</td></tr>`;
      }).join('')}</tbody></table></div>` })}</div>`,
  };
}

/** Units taught in the current user's classes (their programmes' curricula). */
function scopeUnits(s) {
  const ids = new Set(S.sectionsForUser(s).flatMap(sec => S.curriculumOfSection(s, sec.id)));
  return s.units.filter(u => ids.has(u.id));
}
function questionPicker(s, unitId) {
  const allowed = new Set(scopeUnits(s).map(u => u.id));
  const qs = s.questions.filter(q => allowed.has(q.unitId) && (!unitId || q.unitId === unitId));
  if (!qs.length) return '<p class="small muted" style="padding:8px">No questions for this unit yet.</p>';
  return qs.map(q => `<label class="opt" style="align-items:flex-start"><input type="checkbox" name="q" value="${q.id}" ${unitId ? 'checked' : ''}><div class="grow"><div class="small" style="font-weight:500">${esc(q.stem)}</div><div class="small faint">${esc(q.unitId)} · ${q.competencyTag} · ${q.bloomLevel}</div></div></label>`).join('');
}
export function openAssessmentModal({ standardized = false } = {}) {
  const s = getState();
  const weeks = Array.from({ length: s.term.weeks }, (_, i) => i + 1).filter(w => w >= s.clock.week);
  openModal(`${modalHead(standardized ? 'New standardized exam' : 'New assessment', standardized ? 'Assembled from the shared question bank and scheduled for every class in your scope.' : 'Scheduled for your classes. Students are notified when it opens.')}
    <form data-submit="create-assessment"><input type="hidden" name="standardized" value="${standardized ? '1' : ''}"><div class="modal-body">
      <div class="form-grid">
        <label class="field full"><span>Title</span><input class="input" name="title" required autofocus placeholder="${standardized ? 'e.g. School Common Exam: Finance' : 'e.g. Quiz: Time Value of Money'}"></label>
        <label class="field"><span>Type</span><select class="select" name="type" data-change="assess-type">${(standardized ? ['midterm', 'final', 'unit_test'] : ['quiz', 'unit_test', 'workshop']).map(t => `<option value="${t}">${ASSESS_META[t].label}</option>`).join('')}</select></label>
        <label class="field"><span>Unit</span><select class="select" name="unitId" data-change="assess-unit"><option value="">All units</option>${scopeUnits(s).map(u => `<option value="${u.id}">${esc(u.id)} · ${esc(u.title)}</option>`).join('')}</select></label>
        <label class="field"><span>Opens in week</span><select class="select" name="week">${weeks.map(w => `<option value="${w}" ${w === Math.min(s.clock.week + 1, s.term.weeks) ? 'selected' : ''}>Week ${w}${w === s.clock.week ? ' (opens now)' : ''}</option>`).join('')}</select></label>
        <label class="field"><span>Open for</span><select class="select" name="durationDays"><option value="7">7 days</option><option value="5">5 days</option><option value="12">12 days</option></select></label>
        <label class="field q-only"><span>Time limit (min)</span><input class="input" type="number" name="timeLimitMin" value="15" min="5" max="180"></label>
        <label class="field q-only"><span>Attempts</span><input class="input" type="number" name="maxAttempts" value="${standardized ? 1 : 2}" min="1" max="5"></label>
      </div>
      <div class="q-only"><div class="row between"><strong class="small">Questions from the bank</strong><span class="small muted" id="q-count"></span></div><div id="q-picker" style="max-height:300px;overflow-y:auto">${questionPicker(s, '')}</div></div>
    </div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('calendar-plus')} Schedule</button></footer></form>`, { wide: true });
  updateQCount();
}
function updateQCount() { const n = document.querySelectorAll('#q-picker input:checked').length; const el = document.getElementById('q-count'); if (el) el.textContent = `${n} selected`; }

/* ---------------- gradebook ---------------- */
const gbUi = { open: new Set(), q: '', risk: false, started: false };
function gradebook(s, id, me) {
  const secs = mySections(s, me);
  if (!gbUi.started) { if (secs[0]) gbUi.open.add(secs[0].id); gbUi.started = true; }
  if (id) gbUi.open.add(id);
  const filtering = !!(gbUi.q || gbUi.risk);
  const toMark = S.pendingMarking(s, secs, me.id).length;
  const blocks = secs.map(sec => {
    const st = S.orgStats(s, [sec]);
    const mark = S.pendingMarking(s, [sec], me.id).length;
    const open = filtering || gbUi.open.has(sec.id);
    return `<details class="card gb-class" id="gb-${sec.id}" data-gb="${sec.id}" ${open ? 'open' : ''}>
      <summary class="gb-sum">${icon('chevron-right', 'gb-caret')}<strong class="gb-code">${esc(sec.code)}</strong>
        <span class="row gap-1">${S.lecturerSubjects(s, me.id, sec.id).map(k => subjectChip(s, k)).join('')}</span>
        <span class="gb-stats"><span>${st.students} students</span><span>Avg <b>${st.avg === null ? '—' : st.avg.toFixed(1)}</b></span><span>Pass <b>${st.pass ?? '—'}%</b></span><span>Eng <b>${st.engagement ?? '—'}%</b></span></span>
        <span class="grow"></span>${st.atRisk ? badge('danger', `${st.atRisk} at risk`) : ''}${st.ungraded ? badge('warn', `${st.ungraded} to grade`) : ''}${mark ? `<button class="btn btn-sm" data-action="wbl-mark-next" data-section="${sec.id}">${icon('pen-line')} Mark ${mark}</button>` : ''}</summary>
      <div class="gb-body">${gradebookTable(s, [sec], { editable: true, onlyRisk: gbUi.risk, q: gbUi.q, noNote: true, markFor: me.id })}</div></details>`;
  }).join('');
  return {
    title: 'Grades & marking',
    html: `<div class="page">${pageHead('Grades & marking', `${secs.length} classes · weights: ${s.course.gradingScheme.categories.map(c => `${c.label} ${Math.round(c.weight * 100)}%`).join(' · ')}`, `<button class="btn" data-action="export-csv">${icon('download')} Export CSV</button>${toMark ? `<button class="btn btn-primary" data-action="wbl-mark-next">${icon('pen-line')} Mark next (${toMark})</button>` : ''}`)}
      <div class="row gap-2 wrap"><input class="input" style="max-width:240px;height:32px" placeholder="Find student or ID…" value="${esc(gbUi.q)}" data-change="gb-q" aria-label="Find student">
        <label class="opt" style="margin:0;padding:5px 10px"><input type="checkbox" data-change="gb-risk" ${gbUi.risk ? 'checked' : ''}> At risk only</label>
        <span class="grow"></span><button class="btn btn-sm" data-action="gb-all" data-open="1">${icon('chevrons-down')} Expand all</button><button class="btn btn-sm" data-action="gb-all" data-open="0">${icon('chevrons-up')} Collapse all</button></div>
      <div class="stack gap-2">${blocks}</div>
      <p class="small faint">* Provisional: categories without results yet are excluded and their weight is redistributed.</p></div>`,
    mount: () => {
      document.querySelectorAll('details[data-gb]').forEach(d => d.addEventListener('toggle', () => { if (!filtering) (d.open ? gbUi.open.add(d.dataset.gb) : gbUi.open.delete(d.dataset.gb)); }));
      if (id) document.getElementById(`gb-${id}`)?.scrollIntoView({ block: 'start' });
    },
  };
}
function openRubric(assessmentId, studentId) {
  const s = getState(); const a = S.assessmentById(s, assessmentId); const u = S.userById(s, studentId);
  const g = S.rubricOf(s, studentId, assessmentId);
  const LV = ['Beginning', 'Developing', 'Proficient', 'Exemplary'];
  openModal(`${modalHead(`Grade: ${esc(a.title)}`, `${esc(u.name)} · ${esc(S.sectionById(s, u.sectionId).code)}`)}
    <form data-submit="save-rubric"><input type="hidden" name="assessmentId" value="${a.id}"><input type="hidden" name="studentId" value="${u.id}"><div class="modal-body">
    ${a.rubric.map((c, i) => `<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:600;margin-bottom:6px">${esc(c)}</legend><div class="row gap-2 wrap">${LV.map((lv, k) => `<label class="opt" style="margin:0;flex:1;min-width:120px"><input type="radio" name="c${i}" value="${k + 1}" ${g?.criteria[i]?.level === k + 1 ? 'checked' : ''} required> <span><strong>${k + 1}</strong> ${lv}</span></label>`).join('')}</div></fieldset>`).join('')}
    <p class="small muted">Score = total levels ÷ ${a.rubric.length * 4} × 10.</p></div>
    <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('save')} Save grade</button></footer></form>`);
}

/* ---------------- live session ---------------- */
function live(s, _id, me) {
  const secs = mySections(s, me);
  const active = secs.map(sec => S.activeLiveFor(s, sec.id)).find(Boolean);
  if (!active) {
    const pub = s.lessons.filter(l => l.status === 'published' && secs.some(x => x.id === l.sectionId)).sort((a, b) => b.week - a.week);
    return {
      title: 'Live session',
      html: `<div class="page">${pageHead('Live session', 'Present a published lesson in class. Students join with a PIN and are credited attendance time.')}
        ${card({ title: 'Start a session', body: pub.length ? `<form class="stack gap-3" data-submit="start-live" style="max-width:520px">
          <label class="field"><span>Lesson</span><select class="select" name="lessonId">${pub.map(l => `<option value="${l.id}">Week ${l.week} · ${esc(l.title)}${secs.length > 1 ? ` (${S.sectionById(s, l.sectionId).code})` : ''}</option>`).join('')}</select></label>
          <label class="field"><span>PIN valid for</span><select class="select" name="hours"><option value="2">2 hours</option><option value="1">1 hour</option><option value="24">24 hours</option></select></label>
          <div><button class="btn btn-primary">${icon('radio')} Start session</button></div></form>` : empty('radio', 'No published lessons', 'Lessons can be presented once they are published.') })}</div>`,
    };
  }
  const l = S.lessonById(s, active.lessonId);
  const slides = S.slidesOf(l);
  const at = Math.min(active.slide || 0, slides.length - 1);
  const slide = slides[at]; const b = slide.b;
  const sec = S.sectionById(s, active.sectionId);
  return {
    title: 'Live session',
    html: `<div class="page">${pageHead(esc(l.title), `${esc(sec.code)} · live since ${S.fmtDateTime(active.startedAt)} · PIN expires ${S.fmtDateTime(active.expiresAt)}`, `<button class="btn btn-danger" data-action="end-live" data-id="${active.id}">${icon('square')} End session</button>`)}
      <div class="grid"><div class="span-8"><div class="live-stage" id="live-stage">
          <div class="small" style="color:#9fb2b7">Slide ${at + 1} / ${slides.length} · ${TYPE_META[b.type].label}</div>
          ${b.type === 'simulation' ? `<h2>${esc(b.title)}</h2><div style="width:100%;max-width:820px;color:var(--text)">${marketSimHtml('live-sim')}</div>` : slideHtml(s, l, slide, active)}
          <div class="row gap-2"><button class="btn" data-action="live-slide" data-id="${active.id}" data-to="${at - 1}" ${at === 0 ? 'disabled' : ''} aria-label="Previous slide">${icon('arrow-left')}</button><button class="btn" data-action="live-slide" data-id="${active.id}" data-to="${at + 1}" ${at >= slides.length - 1 ? 'disabled' : ''} aria-label="Next slide">${icon('arrow-right')}</button>
            ${slide.tiles?.some(t => t.kind === 'check') ? `<button class="btn" data-action="live-reveal">${icon('eye')} Show answer</button>` : ''}<button class="btn" data-action="live-full" aria-label="Full screen">${icon('maximize')}</button></div>
        </div></div>
        <div class="span-4 stack gap-4">${card({ title: 'Join code', body: `<div class="pin">${esc(active.pin)}</div><p class="small muted mt-2">Students open <strong>Live class</strong> and enter this PIN.</p>` })}
          ${card({ title: `Joined · ${active.joined.length}/${sec.studentIds.length}`, flush: true, body: `<div class="list">${sec.studentIds.map(id => S.userById(s, id)).map(u => `<div class="list-item">${avatar(u, 'sm')}<span class="grow">${esc(u.name)}</span>${active.joined.includes(u.id) ? badge('graded', 'Joined') : '<span class="faint small">Not joined</span>'}</div>`).join('')}</div>` })}</div></div></div>`,
    mount: () => { if (b.type === 'simulation') startMarketSim('live-sim'); mountMedia(document.getElementById('live-stage')); },
  };
}

function calendar(s, _id, me) {
  return { title: 'Calendar', html: `<div class="page">${pageHead('Calendar', `${esc(s.term.title)} · gaps are weeks with no lesson planned`)}${card({ title: 'Term timeline', actions: timelineLegend(), flush: true, body: termTimeline(s, { sections: mySections(s, me), viewer: 'instructor', showGaps: true }) })}</div>` };
}

function library(s) { return libraryView(s); }
function book(s, id) { return readerView(s, id); }
function modules(s, id, me) { return modulesView(s, id, me); }
function studio(s, id, me) { return studioView(s, id, me); }

export const ROUTES = { dashboard, library, book, lessons, builder, modules, workbook: lecturerWorkbook, cases: lecturerCases, caseedit: caseEditor, pageedit: pageEditor, marking: (s, id, me) => gradebook(s, id, me), assessments, studio, gradebook, live, calendar };

/* ---------------- actions ---------------- */
export const actions = {
  'new-lesson': () => openNewLesson(),
  'dash-filter': (el) => { dashUi.filter = el.dataset.k; rerender(); },
  'dash-q': (el) => { dashUi.q = el.value; rerender(); },
  'dash-sort': (el) => { dashUi.sort = el.value; rerender(); },
  'gb-q': (el) => { gbUi.q = el.value.trim(); rerender(); },
  'gb-risk': (el) => { gbUi.risk = el.checked; rerender(); },
  'gb-all': (el) => { const s = getState(); gbUi.open = new Set(el.dataset.open === '1' ? mySections(s, S.currentUser(s)).map(x => x.id) : []); rerender(); },
  'new-bank-lesson': () => openNewBankLesson(),
  'create-bank-lesson': (form, data) => {
    const id = dispatch('LESSON_CREATED', { bank: true, unitId: data.get('unitId'), title: data.get('title'), template: data.get('template') === 'on' });
    if (id) { closeModal(); location.hash = `/instructor/builder/${id}`; }
  },
  'dup-bank': (el) => {
    const src = S.lessonById(getState(), el.dataset.id);
    const id = dispatch('LESSON_CREATED', { bank: true, unitId: src.unitId, copyFrom: src.id, title: `${src.title} (my version)` });
    if (id) location.hash = `/instructor/builder/${id}`;
  },
  'lessons-tab': (el) => { lessonsUi.tab = el.dataset.tab; rerender(); },
  'bank-mine': (el) => { lessonsUi.mine = el.checked; rerender(); },
  'bank-unit': (el) => { lessonsUi.unit = el.value; rerender(); },
  'pick-library': (el) => openLibraryPicker(el.dataset.kind),
  'pick-library-item': (el) => { const blk = materialBlock(getState(), el.dataset.kind, el.dataset.id); updateBlocks(b => b.push(blk)); closeModal(); toast('Added to the lesson'); },
  'create-lesson': (form, data) => {
    const id = dispatch('LESSON_CREATED', { ...Object.fromEntries(data), template: data.get('template') === 'on' });
    if (id) { closeModal(); location.hash = `/instructor/builder/${id}`; }
  },
  'add-block': (el) => addBlock(el.dataset.type),
  'remove-block': (el) => updateBlocks(b => b.splice(Number(el.dataset.i), 1)),
  'move-block': (el) => updateBlocks(b => { const i = Number(el.dataset.i), j = i + Number(el.dataset.d); [b[i], b[j]] = [b[j], b[i]]; }),
  'block-title': (el) => updateBlocks(b => { b[Number(el.dataset.i)].title = el.value.trim() || b[Number(el.dataset.i)].title; }),
  'block-mins': (el) => updateBlocks(b => { b[Number(el.dataset.i)].minutes = Math.max(1, Math.min(180, Number(el.value) || 1)); }),
  'lesson-field': (el) => dispatch('LESSON_UPDATED', { id: location.hash.split('/')[3], patch: { [el.dataset.field]: el.value } }),
  'submit-lesson': async (el) => {
    const s = getState(); const l = S.lessonById(s, el.dataset.id);
    const ok = await confirmDialog({ title: 'Submit for approval?', body: `<p><strong>${esc(l.title)}</strong> — week ${l.week}, ${l.blocks.length} blocks, ${S.lessonMinutes(l)} min. Editing is locked until the Academic Director responds.</p>`, confirmLabel: 'Submit' });
    if (ok) dispatch('LESSON_SUBMITTED', { id: l.id });
  },
  'delete-lesson': async (el) => {
    const ok = await confirmDialog({ title: 'Delete this draft?', body: '<p>This cannot be undone.</p>', confirmLabel: 'Delete', tone: 'danger' });
    if (ok && dispatch('LESSON_DELETED', { id: el.dataset.id })) location.hash = '/instructor/lessons';
  },
  'reopen-lesson': (el) => dispatch('LESSON_REOPENED', { id: el.dataset.id }),
  'new-assessment': () => openAssessmentModal(),
  'assess-unit': (el) => { document.getElementById('q-picker').innerHTML = questionPicker(getState(), el.value); updateQCount(); },
  'assess-type': (el) => { document.querySelectorAll('.q-only').forEach(n => { n.style.display = el.value === 'workshop' ? 'none' : ''; }); },
  'create-assessment': (form, data) => {
    const p = Object.fromEntries(data);
    p.questionIds = p.type === 'workshop' ? [] : data.getAll('q');
    if (dispatch('ASSESSMENT_CREATED', p)) closeModal();
  },
  'open-rubric': (el) => openRubric(el.dataset.assessment, el.dataset.student),
  'save-rubric': (form, data) => {
    const s = getState(); const a = S.assessmentById(s, data.get('assessmentId'));
    const levels = a.rubric.map((_, i) => Number(data.get(`c${i}`)));
    if (dispatch('RUBRIC_GRADED', { assessmentId: a.id, studentId: data.get('studentId'), levels })) closeModal();
  },
  'export-csv': () => {
    const s = getState(); const me = S.currentUser(s);
    const cats = s.course.gradingScheme.categories;
    const rows = [['Student ID', 'Name', 'Section', 'Study minutes', 'Engagement %', ...cats.map(c => c.label), 'Course grade', 'At risk']];
    for (const u of S.studentsInSections(s, mySections(s, me))) {
      const g = S.courseGrade(s, u.id);
      rows.push([u.id, u.name, S.sectionById(s, u.sectionId).code, S.studyMinutes(s, u.id), S.engagement(s, u.id), ...cats.map(c => g.breakdown[c.key] ?? ''), g.value ?? '', S.atRisk(s, u.id).flag ? 'yes' : 'no']);
    }
    const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' }));
    a.download = `gradebook-week${s.clock.week}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Gradebook exported');
  },
  'start-live': (form, data) => dispatch('LIVE_SESSION_STARTED', { lessonId: data.get('lessonId'), hours: data.get('hours') }),
  'end-live': async (el) => { if (await confirmDialog({ title: 'End this session?', body: '<p>Students who joined will be credited the session time.</p>', confirmLabel: 'End session', tone: 'danger' })) dispatch('LIVE_SESSION_ENDED', { id: el.dataset.id }); },
  'live-slide': (el) => dispatch('LIVE_SLIDE', { id: el.dataset.id, slide: Number(el.dataset.to) }),
  'live-reveal': () => document.getElementById('live-stage')?.classList.toggle('reveal'),
  'live-full': () => document.getElementById('live-stage')?.requestFullscreen?.(),
};
document.addEventListener('change', (e) => { if (e.target.closest('#q-picker')) updateQCount(); });
// Simulation speed buttons inside the live stage reuse the student action name.
actions['new-lesson-section'] = (el) => { document.getElementById('new-lesson-week').innerHTML = weekOptions(getState(), el.value); };

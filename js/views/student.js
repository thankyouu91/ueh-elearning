import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { subjectChip, esc, icon, badge, kpi, card, empty, progress, pageHead, scoreText, TYPE_META, ASSESS_META, confirmDialog, toast, openModal, modalHead } from '../ui.js';
import { termTimeline, timelineLegend, radarChart, BENCHMARK } from './shared.js';
import { marketSimHtml, startMarketSim } from '../features/market-sim.js';
import { materialHtml, mountMaterials, resourceBody, RES_META } from './library.js';
import { studentWorkbook, studentCases } from './workbook.js';
import { pageGrid, mountMedia } from './bento.js';

export const NAV = [
  { page: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { header: 'Study' },
  { page: 'course', label: 'My course', icon: 'book-open', also: ['lesson'], countKey: 'course' },
  { page: 'assessments', label: 'Assessments', icon: 'clipboard-check', also: ['exam', 'result'], countKey: 'assessments' },
  { page: 'grades', label: 'Grades', icon: 'chart-column' },
  { page: 'join', label: 'Join a class', icon: 'ticket' },
  { header: 'Practice' },
  { page: 'workbook', label: 'Workbook', icon: 'notebook-pen' },
  { page: 'cases', label: 'Case studies', icon: 'briefcase', also: ['case'] },
  { page: 'vocabulary', label: 'Vocabulary', icon: 'languages' },
  { header: 'Timetable' },
  { page: 'calendar', label: 'Calendar', icon: 'calendar-days' },
  { page: 'live', label: 'Live class', icon: 'radio' },
];

/* ---------------- dashboard ---------------- */
function dashboard(s, _id, me) {
  const sec = S.sectionById(s, me.sectionId);
  const g = S.courseGrade(s, me.id);
  const eng = S.engagement(s, me.id);
  const weekMin = S.studyMinutes(s, me.id, s.clock.week);
  const lastWeekMin = S.studyMinutes(s, me.id, s.clock.week - 1);
  const todo = S.upcomingForStudent(s, me.id);
  const missing = S.overdue(s, me.id);
  const lessons = S.publishedLessons(s, me.sectionId);
  const next = [...lessons].reverse().find(l => S.lessonProgress(s, me.id, l).done < l.blocks.length) || lessons[lessons.length - 1];
  const thisWeek = lessons.filter(l => l.week === s.clock.week);
  const risk = S.atRisk(s, me.id);
  const comp = S.competency(s, [me.id]);
  const tasks = S.studentTasks(s, me.id);
  const urgent = tasks.filter(t => t.level === 'urgent').length;

  const kpis = `<div class="grid">
    <div class="span-3">${kpi({ label: 'Course grade', value: g.value === null ? '—' : `${g.value.toFixed(1)}<small> / 10</small>`, sub: g.provisional ? 'Provisional — final not taken yet' : 'Final', iconName: 'award', tone: g.value !== null && g.value < 5 ? 'danger' : '' })}</div>
    <div class="span-3">${kpi({ label: 'Study time this week', value: S.fmtMinutes(weekMin), sub: `${weekMin >= lastWeekMin ? '+' : '−'}${S.fmtMinutes(Math.abs(weekMin - lastWeekMin))} vs last week · ${S.fmtMinutes(S.studyMinutes(s, me.id))} total`, iconName: 'clock' })}</div>
    <div class="span-3">${kpi({ label: 'Engagement', value: eng === null ? '—' : `${eng}%`, sub: 'Lesson activities completed', iconName: 'activity', tone: eng !== null && eng < 60 ? 'danger' : 'ok' })}</div>
    <div class="span-3">${kpi({ label: 'Due in 7 days', value: String(todo.filter(x => x.st === 'open').length), sub: missing.length ? `<span class="t-danger">${missing.length} missed</span>` : 'Nothing missed', iconName: 'calendar-clock', tone: urgent || missing.length ? 'danger' : todo.length ? 'warn' : 'ok' })}</div>
  </div>`;

  const riskNote = risk.flag ? `<div class="note note-warn">${icon('triangle-alert')}<div><strong>You may need support.</strong> <span>${esc(risk.reasons.join('; '))}</span>. <span>Talk to your instructor or catch up on the items below.</span></div></div>` : '';

  const continueCard = next ? (() => {
    const p = S.lessonProgress(s, me.id, next);
    const pct = Math.round((p.done / p.total) * 100);
    return card({ title: 'Continue learning', subtitle: `Week ${next.week} · ${esc(S.unitById(s, next.unitId).title)}`, body: `
      <div class="row gap-4 wrap"><div class="grow" style="min-width:240px"><h3 style="font-size:17px">${esc(next.title)}</h3><p class="muted mt-2">${esc(next.summary)}</p>
      <div class="row gap-3 mt-3">${progress(pct, pct === 100 ? 'ok' : '')}<span class="small muted" style="white-space:nowrap">${p.done}/${p.total} activities</span></div></div>
      <a class="btn btn-primary" href="#/student/lesson/${next.id}">${pct ? 'Resume' : 'Start'} lesson ${icon('arrow-right')}</a></div>` });
  })() : card({ title: 'Continue learning', body: empty('book-open', 'No lessons yet', 'Lessons appear here once they are published.') });

  const weekList = card({ title: `This week · week ${s.clock.week}`, flush: true, body: thisWeek.length ? `<div class="list">${thisWeek.map(l => {
    const p = S.lessonProgress(s, me.id, l);
    return `<a class="list-item" href="#/student/lesson/${l.id}"><span class="li-icon accent">${icon('book-open')}</span><div class="grow"><div class="title">${esc(l.title)}</div><div class="meta">${S.lessonMinutes(l)} min · ${p.done}/${p.total} done</div></div>${p.done === p.total ? badge('graded', 'Completed') : ''}</a>`;
  }).join('')}</div>` : empty('calendar', 'No lesson published for this week yet') });


  const breakdown = card({ title: 'Grade breakdown', subtitle: 'Weighted by the course grading scheme', body: `<div class="stack gap-3">${s.course.gradingScheme.categories.map(c => {
    const v = g.breakdown[c.key];
    return `<div><div class="row between small"><span>${c.label} <span class="faint">· ${Math.round(c.weight * 100)}%</span></span><span>${v === null ? '<span class="faint">No results yet</span>' : `<strong>${v.toFixed(1)}</strong> / 10`}</span></div><div class="mt-2">${progress(v === null ? 0 : v * 10, v !== null && v < 5 ? 'danger' : '')}</div></div>`;
  }).join('')}</div>` });

  return {
    title: 'Dashboard',
    html: `<div class="page">
      ${pageHead(`Hello, ${esc(me.name.split(' ').slice(-1)[0])}`, `${esc(sec.code)} · ${esc(s.course.title)}`)}
      ${riskNote}${tasksCard(s, tasks)}${kpis}
      <div class="grid"><div class="span-8 stack gap-4">${continueCard}${weekList}</div><div class="span-4 stack gap-4">${workbookCard(s, me)}</div></div>
      <div class="grid"><div class="span-5">${card({ title: 'My competencies', subtitle: '% correct by skill vs. programme benchmark', body: Object.keys(comp).length ? '<div class="chart-box"><canvas id="st-radar"></canvas></div>' : empty('radar', 'No graded work yet') })}</div><div class="span-7">${breakdown}</div></div>
      ${card({ title: 'Term timeline', subtitle: 'Published lessons and assessments', actions: timelineLegend(), flush: true, body: termTimeline(s, { sections: [S.sectionById(s, me.sectionId)], viewer: 'student' }) })}
    </div>`,
    mount: () => { if (Object.keys(comp).length) radarChart('st-radar', [{ label: 'Me', values: comp }, { label: 'Benchmark', values: BENCHMARK, dashed: true }]); },
  };
}

const LEVEL = { urgent: 'Do now', soon: 'This week', catchup: 'Catch up', missed: 'Missed', later: 'Coming up' };
/** What to do next, colour-coded by urgency: red = now, orange = this week, blue = catch up, grey = coming up. */
function tasksCard(s, tasks) {
  const active = tasks.filter(t => !['later', 'missed'].includes(t.level));
  const urgent = tasks.filter(t => t.level === 'urgent').length;
  // keep the list short: two oldest catch-up lessons, then one line for the rest
  const catchup = tasks.filter(t => t.level === 'catchup');
  let n = 0;
  tasks = tasks.flatMap(t => t.level !== 'catchup' ? [t] : ++n <= 2 ? [t] : n === 3 ? [{ level: 'catchup', icon: 'layers', title: `${catchup.length - 2} more unfinished lessons`, why: 'Finish earlier weeks to keep up with the class', href: '#/student/course', action: 'View all' }] : []);
  const row = (t) => `<a class="task lv-${t.level}" href="${t.href}">
      <span class="task-mark">${icon(t.icon)}</span>
      <div class="grow"><div class="task-kicker">${LEVEL[t.level]}</div><div class="title">${esc(t.title)}</div><div class="meta">${esc(t.why)}</div>${t.pct !== undefined ? `<div class="task-bar">${progress(t.pct)}</div>` : ''}</div>
      ${t.due ? `<span class="due-chip" title="Closes ${S.fmtDateTime(t.due)}" data-countdown="${t.due}">${S.countdown(s, t.due)}</span>` : t.opens ? `<span class="due-chip">Opens ${S.fmtDate(t.opens)}</span>` : ''}
      <span class="btn btn-sm ${['urgent', 'soon'].includes(t.level) ? 'btn-primary' : ''}">${t.action} ${icon('arrow-right')}</span></a>`;
  const summary = active.length ? `<span class="task-count ${urgent ? 'is-urgent' : ''}">${active.length}</span>` : `<span class="task-count is-done">${icon('check')}</span>`;
  return `<section class="card tasks-card"><header class="card-head"><div class="row gap-3">${summary}<div><h3>What to do now</h3><p class="muted">${active.length ? `${active.length} things to do${urgent ? ` · ${urgent} urgent` : ''}` : 'All caught up'}</p></div></div>
      <div class="row gap-3 wrap small task-legend">${['urgent', 'soon', 'catchup', 'later'].map(l => `<span class="lv-${l}"><i></i>${LEVEL[l]}</span>`).join('')}</div></header>
    ${tasks.length ? `<div>${tasks.map(row).join('')}</div>` : `<div class="card-body">${empty('party-popper', 'Nothing left for this week', 'Revise in the workbook or read ahead in My course.')}</div>`}</section>`;
}

function workbookCard(s, me) {
  const rel = S.releasedUnits(s, me.sectionId);
  const p = S.workbookProgress(s, me.id, rel);
  const next = rel.find(u => S.workbookProgress(s, me.id, [u]).pct < 100);
  return card({ title: 'Workbook', subtitle: `${p.done}/${p.total} exercises${p.accuracy !== null ? ` · ${p.accuracy}% accuracy` : ''}`, body: `${progress(p.pct, p.pct === 100 ? 'ok' : '')}<div class="row between mt-3"><span class="small muted">${p.pending ? `${p.pending} written answer(s) waiting for marking` : 'Practise every unit you have studied'}</span>${next ? `<a class="btn btn-sm btn-primary" href="#/student/workbook/${next}">Continue ${next}</a>` : ''}</div>` });
}

/* ---------------- course ---------------- */
function course(s, _id, me) {
  const lessons = S.publishedLessons(s, me.sectionId);
  const cur = S.curriculumOfSection(s, me.sectionId);
  const prog = S.programOfSection(s, me.sectionId);
  const counts = S.subjectCounts(s, cur);
  return {
    title: 'My course',
    html: `<div class="page">${pageHead('My course', `${esc(S.orgById(s, prog.id).name)} · ${esc(s.course.title)} · ${lessons.length} of ${cur.length} units released`)}
      <div class="row gap-2 wrap">${Object.entries(counts).filter(([, n]) => n).map(([k, n]) => `<span class="chip">${subjectChip(s, k)} ${s.subjects[k].label} · ${n} units</span>`).join('')}</div>
      ${card({ title: 'Year plan', subtitle: 'One unit per week', flush: true, body: `<div class="list">${cur.map((uid, i) => {
        const u = S.unitById(s, uid); const l = lessons.find(x => x.week === i + 1);
        if (!l) return `<div class="list-item"><span class="faint small" style="width:34px">W${i + 1}</span>${subjectChip(s, u.subject)}<div class="grow"><div class="title" style="color:var(--text-2)">${esc(u.title)}</div><div class="meta">${i + 1 > s.clock.week ? `Opens ${S.fmtDate(S.weekStartOf(s, i + 1))}` : 'Not released yet'}</div></div>${icon('lock', 'faint')}</div>`;
        const p = S.lessonProgress(s, me.id, l);
        return `<a class="list-item" href="#/student/lesson/${l.id}"><span class="faint small" style="width:34px">W${i + 1}</span>${subjectChip(s, u.subject)}<div class="grow"><div class="title">${esc(l.title)}</div><div class="meta">${S.lessonMinutes(l)} min · ${p.done}/${p.total} activities</div></div><div style="width:120px" class="hide-sm">${progress((p.done / p.total) * 100, p.done === p.total ? 'ok' : '')}</div></a>`;
      }).join('')}</div>` })}
    </div>`,
  };
}

/* ---------------- lesson player ---------------- */
const player = { lessonId: null, idx: 0, openedAt: Date.now(), practice: {}, sop: {} };

function blockBody(s, l, b) {
  const unit = S.unitById(s, l.unitId);
  const vocab = s.vocabulary.filter(v => v.unitId === l.unitId);
  switch (b.type) {
    case 'theory': return `<div class="prose"><p><strong>Learning outcome.</strong> ${esc(unit.summary)}</p>${vocab.length ? `<p><strong>Key ideas:</strong></p><ul>${vocab.map(v => `<li><strong>${esc(v.term)}</strong> — ${esc(v.def)}</li>`).join('')}</ul>` : ''}<p class="small muted">Read the matching chapter of the ${esc(s.subjects[unit.subject].label)} course reader before class.</p></div>`;
    case 'vocabulary': return `<div class="stack gap-2">${vocab.length ? vocab.map(v => `<div class="block-row"><div class="grow"><div style="font-weight:600">${esc(v.term)} <span class="muted" style="font-weight:400">· ${esc(v.vi)}</span></div><div class="small muted">${esc(v.def)}</div></div><button class="btn btn-ghost btn-sm btn-icon" data-action="speak" data-text="${esc(v.term)}" aria-label="Pronounce ${esc(v.term)}">${icon('volume-2')}</button></div>`).join('') : '<p class="small muted">No key terms recorded for this unit yet.</p>'}</div>`;
    case 'simulation': return `${marketSimHtml()}<p class="small muted mt-3">Try it: raise demand by +20, then add a price ceiling below the new equilibrium. What happens to the shortage? Then add a tax of 10 — who pays more of it?</p>`;
    case 'calculation': return `<div class="prose">${unit.example ? `<div class="note note-info" style="font-size:14px">${icon('calculator')}<div>${esc(unit.example)}</div></div><p class="mt-3">Now change one number in the example (for instance the rate or the price) and recalculate. Compare your answer with a classmate.</p>` : '<p>Work through the exercises in the course reader for this unit.</p>'}</div>`;
    case 'case_study': {
      const cases = s.resources.filter(c => c.type === 'case_study' && c.unitId === unit.id);
      return `<div class="prose">${cases.length ? cases.map(c => `<p><strong>Case:</strong> ${esc(c.title)}</p>`).join('') : `<p><strong>Case discussion.</strong> Apply this unit to a business you know in Vietnam.</p>`}<p>In groups of three, prepare short answers:</p><ol><li>Which concept from this unit explains what is happening?</li><li>What data would you need to support your view?</li><li>What would you recommend to the manager, in two sentences?</li></ol></div>`;
    }
    case 'material': return materialHtml(s, b);
    case 'page': return pageGrid(s, b, { mode: 'student', me: S.currentUser(s) });
    case 'resource': { const r = S.resourceById(s, b.resourceId); return r ? `${b.extra ? `<div class="note note-info" style="margin-bottom:12px">${icon(RES_META[r.type].icon)}<div><strong>${RES_META[r.type].label}</strong> — ${r.type === 'practical' ? 'held in the computer lab / classroom; bring your laptop.' : 'add-on activity for this week.'}</div></div>` : ''}${resourceBody(s, r)}` : '<p class="small muted">This resource was removed.</p>'; }
    case 'quiz': {
      const qs = s.questions.filter(q => q.unitId === l.unitId).slice(0, 3);
      const st = player.practice[b.id] || {};
      return `<p class="muted small" style="margin-bottom:10px">Practice only — not graded. You get instant feedback.</p>${qs.map((q, qi) => `<div class="q-card"><div class="q-stem">${qi + 1}. ${esc(q.stem)}</div>${q.options.map((o, oi) => {
        const picked = st[q.id];
        const cls = picked === undefined ? '' : oi === q.answerIndex ? 'correct' : picked === oi ? 'wrong' : '';
        return `<button class="opt ${cls}" style="width:100%;text-align:left;background:none" data-action="practice-answer" data-block="${b.id}" data-q="${q.id}" data-o="${oi}" ${picked !== undefined ? 'disabled' : ''}>${esc(o)}</button>`;
      }).join('')}</div>`).join('')}`;
    }
    default: return '';
  }
}

function lesson(s, id, me) {
  const l = S.lessonById(s, id);
  if (!l || l.sectionId !== me.sectionId || l.status !== 'published') return { title: 'Lesson', html: `<div class="page">${card({ body: empty('lock', 'This lesson is not available', 'It may not be published yet.', '<a class="btn mt-3" href="#/student/course">Back to course</a>') })}</div>` };
  if (player.lessonId !== l.id) {
    const prog = S.lessonProgress(s, me.id, l);
    player.lessonId = l.id; player.idx = Math.max(0, l.blocks.findIndex(b => !prog.doneIds.has(b.id))); player.openedAt = Date.now();
    if (player.idx < 0) player.idx = 0;
  }
  const prog = S.lessonProgress(s, me.id, l);
  const b = l.blocks[player.idx];
  const done = prog.doneIds.has(b.id);
  return {
    title: l.title,
    html: `<div class="page">
      ${pageHead(esc(l.title), `Week ${l.week} · ${esc(S.unitById(s, l.unitId).title)} · ${S.lessonMinutes(l)} min`, `<a class="btn" href="#/student/course">${icon('arrow-left')} Course</a>`)}
      <div class="player">
        ${card({ title: 'Activities', subtitle: `${prog.done}/${prog.total} completed`, flush: true, body: `<div>${l.blocks.map((x, i) => `<button class="step ${i === player.idx ? 'active' : ''} ${prog.doneIds.has(x.id) ? 'done' : ''}" data-action="goto-block" data-i="${i}"><span class="st">${prog.doneIds.has(x.id) ? icon('check') : `<span class="small">${i + 1}</span>`}</span><div class="grow"><div class="small" style="font-weight:600">${esc(x.title)}</div><div class="small faint">${TYPE_META[x.type].label} · ${x.minutes} min</div></div></button>`).join('')}</div>` })}
        ${card({ title: `${icon(TYPE_META[b.type].icon)} ${esc(b.title)}`, subtitle: `${TYPE_META[b.type].label} · planned ${b.minutes} min`, actions: done ? badge('graded', 'Completed') : '', body: `${blockBody(s, l, b)}
          <div class="row between mt-4" style="border-top:1px solid var(--border);padding-top:14px">
            <button class="btn" data-action="goto-block" data-i="${player.idx - 1}" ${player.idx === 0 ? 'disabled' : ''}>${icon('arrow-left')} Previous</button>
            ${done ? `<button class="btn btn-primary" data-action="goto-block" data-i="${player.idx + 1}" ${player.idx >= l.blocks.length - 1 ? 'disabled' : ''}>Next ${icon('arrow-right')}</button>`
              : `<button class="btn btn-primary" data-action="complete-block" data-lesson="${l.id}" data-block="${b.id}">${icon('check')} Mark complete${player.idx < l.blocks.length - 1 ? ' & continue' : ''}</button>`}
          </div>` })}
      </div></div>`,
    mount: () => { if (b.type === 'simulation') startMarketSim(); if (b.type === 'material') mountMaterials(s); if (b.type === 'page') mountMedia(); },
  };
}

/* ---------------- assessments ---------------- */
function assessments(s, _id, me) {
  const list = S.assessmentsForSection(s, me.sectionId).filter(a => a.status !== 'draft');
  return {
    title: 'Assessments',
    html: `<div class="page">${pageHead('Assessments', 'Quizzes, tests and workshop tasks for your class')}
      ${card({ flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Assessment</th><th>Type</th><th>Opens</th><th>Closes</th><th>Status</th><th class="num">Result</th><th></th></tr></thead><tbody>
      ${list.map(a => {
        const st = S.assessmentStatus(s, a), r = S.assessmentResult(s, me.id, a);
        const att = S.attemptsOf(s, me.id, a.id);
        const canStart = st === 'open' && a.type !== 'workshop' && att.length < a.maxAttempts;
        const last = att[att.length - 1];
        return `<tr><td><strong>${esc(a.title)}</strong>${a.origin === 'standardized' ? ' <span class="chip">Standardized</span>' : ''}</td><td>${ASSESS_META[a.type].label}</td><td>${S.fmtDate(a.opensAt)}</td><td>${S.fmtDateTime(a.closesAt)}</td>
          <td>${r.state === 'graded' || r.state === 'missing' || r.state === 'awaiting_grade' ? badge(r.state) : badge(st)}</td><td class="num">${scoreText(r.value)}</td>
          <td class="num">${canStart ? `<a class="btn btn-sm btn-primary" href="#/student/exam/${a.id}">${att.length ? 'Retake' : 'Start'}</a>` : last ? `<a class="btn btn-sm" href="#/student/result/${last.id}">Review</a>` : a.type === 'workshop' ? '<span class="small muted">In workshop</span>' : ''}</td></tr>`;
      }).join('')}</tbody></table></div>` })}</div>`,
  };
}

/* ---------------- exam ---------------- */
const exam = { id: null, startedAt: null, startedReal: 0, answers: {}, timer: null };
function stopTimer() { if (exam.timer) clearInterval(exam.timer); exam.timer = null; }

function examPage(s, id, me) {
  const a = S.assessmentById(s, id);
  if (!a || !a.sectionIds.includes(me.sectionId) || a.type === 'workshop') return { title: 'Exam', html: card({ body: empty('file-x', 'Assessment not found') }) };
  const st = S.assessmentStatus(s, a);
  const att = S.attemptsOf(s, me.id, a.id);
  const inProgress = exam.id === a.id;
  if (!inProgress) {
    stopTimer();
    const can = st === 'open' && att.length < a.maxAttempts;
    return {
      title: a.title,
      html: `<div class="page" style="max-width:760px">${pageHead(esc(a.title), `${ASSESS_META[a.type].label}${a.origin === 'standardized' ? ' · Standardized' : ''}`, `<a class="btn" href="#/student/assessments">${icon('arrow-left')} Assessments</a>`)}
        ${card({ body: `<div class="grid" style="gap:12px">
          <div class="span-3"><div class="small muted">Questions</div><strong>${a.questionIds.length}</strong></div>
          <div class="span-3"><div class="small muted">Time limit</div><strong>${a.timeLimitMin ? `${a.timeLimitMin} min` : 'None'}</strong></div>
          <div class="span-3"><div class="small muted">Attempts</div><strong>${att.length} / ${a.maxAttempts}</strong></div>
          <div class="span-3"><div class="small muted">Closes</div><strong>${S.fmtDateTime(a.closesAt)}</strong></div></div>
          <div class="mt-4">${st === 'open' ? `<div class="note note-info">${icon('info')}<div>Answers are auto-graded when you submit. The timer starts when you press Start and cannot be paused. <span data-countdown="${a.closesAt}"></span> until the window closes.</div></div>` : st === 'scheduled' ? `<div class="note note-info">${icon('calendar')}<div>Opens ${S.fmtDateTime(a.opensAt)}.</div></div>` : `<div class="note note-warn">${icon('lock')}<div>This assessment is closed.</div></div>`}</div>
          <div class="row gap-2 mt-4">${can ? `<button class="btn btn-primary" data-action="exam-start" data-id="${a.id}">${icon('play')} Start ${att.length ? 'new attempt' : 'assessment'}</button>` : ''}${att.length ? `<a class="btn" href="#/student/result/${att[att.length - 1].id}">Review last attempt</a>` : ''}</div>` })}
      </div>`,
    };
  }
  const qs = a.questionIds.map(qid => S.questionById(s, qid));
  const answered = Object.keys(exam.answers).length;
  return {
    title: a.title,
    html: `<div class="page" style="max-width:820px">
      <div class="card card-body exam-bar row between gap-3 wrap"><div><strong>${esc(a.title)}</strong><div class="small muted"><span id="exam-answered">${answered}</span> of ${qs.length} answered</div></div>
        <div class="row gap-3">${a.timeLimitMin ? `<span class="timer" id="exam-timer">--:--</span>` : ''}<button class="btn btn-primary" data-action="exam-submit">${icon('send')} Submit</button></div></div>
      ${qs.map((q, i) => `<div class="q-card card" style="box-shadow:none"><div class="q-stem">${i + 1}. ${esc(q.stem)} <span class="faint small">(${q.points} pt)</span></div>
        ${q.options.map((o, oi) => `<label class="opt ${exam.answers[q.id] === oi ? 'selected' : ''}"><input type="radio" name="${q.id}" value="${oi}" data-change="exam-answer" data-q="${q.id}" ${exam.answers[q.id] === oi ? 'checked' : ''}> ${esc(o)}</label>`).join('')}</div>`).join('')}
      <div class="row" style="justify-content:flex-end"><button class="btn btn-primary" data-action="exam-submit">${icon('send')} Submit answers</button></div>
    </div>`,
    mount: () => {
      if (!a.timeLimitMin || exam.timer) return;
      const deadline = exam.startedReal + a.timeLimitMin * 60000;
      const tick = () => {
        const el = document.getElementById('exam-timer');
        const left = Math.max(0, deadline - Date.now());
        if (el) { el.textContent = `${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`; el.classList.toggle('low', left < 120000); }
        if (left <= 0) { stopTimer(); toast('Time is up — submitting your answers', 'warn'); submitExam(true); }
      };
      tick();
      exam.timer = setInterval(tick, 1000);
    },
  };
}

function submitExam() {
  const s = getState();
  const a = S.assessmentById(s, exam.id);
  const id = dispatch('ATTEMPT_SUBMITTED', { assessmentId: a.id, answers: exam.answers, startedAt: exam.startedAt });
  stopTimer();
  exam.id = null; exam.answers = {};
  if (id) location.hash = `/student/result/${id}`;
}

function result(s, id, me) {
  const at = s.attempts.find(x => x.id === id && x.studentId === me.id);
  if (!at) return { title: 'Result', html: card({ body: empty('file-x', 'Result not found') }) };
  const a = S.assessmentById(s, at.assessmentId);
  const ten = S.round1((at.score / at.maxScore) * 10);
  return {
    title: `Result · ${a.title}`,
    html: `<div class="page" style="max-width:820px">${pageHead(`Result: ${esc(a.title)}`, `Submitted ${S.fmtDateTime(at.submittedAt)}`, `<a class="btn" href="#/student/assessments">${icon('arrow-left')} Assessments</a>`)}
      <div class="grid"><div class="span-4">${kpi({ label: 'Score', value: `${ten.toFixed(1)}<small> / 10</small>`, sub: `${at.score} of ${at.maxScore} correct`, iconName: 'award', tone: ten < 5 ? 'danger' : 'ok' })}</div>
      <div class="span-4">${kpi({ label: 'Course grade now', value: (S.courseGrade(s, me.id).value ?? 0).toFixed(1), sub: 'Updated with this result', iconName: 'chart-column' })}</div>
      <div class="span-4">${kpi({ label: 'Time taken', value: `${Math.max(1, Math.round((new Date(at.submittedAt) - new Date(at.startedAt)) / 60000))} min`, sub: a.timeLimitMin ? `Limit ${a.timeLimitMin} min` : '', iconName: 'timer' })}</div></div>
      ${card({ title: 'Review answers', body: a.questionIds.map((qid, i) => {
        const q = S.questionById(s, qid); const pick = at.answers[qid];
        return `<div class="q-card"><div class="q-stem">${i + 1}. ${esc(q.stem)} ${pick === q.answerIndex ? badge('graded', 'Correct') : badge('missing', pick === undefined ? 'Not answered' : 'Incorrect')}</div>${q.options.map((o, oi) => `<div class="opt ${oi === q.answerIndex ? 'correct' : pick === oi ? 'wrong' : ''}" style="cursor:default">${oi === q.answerIndex ? icon('check') : pick === oi ? icon('x') : icon('circle', 'faint')} ${esc(o)}</div>`).join('')}<div class="small faint mt-2">Skill: ${q.competencyTag} · ${q.bloomLevel}</div></div>`;
      }).join('') })}</div>`,
  };
}

/* ---------------- vocabulary ---------------- */
const fc = { unit: 'all', idx: 0, flipped: false, startedReal: Date.now() };
function vocabulary(s) {
  const list = s.vocabulary.filter(v => fc.unit === 'all' || S.unitById(s, v.unitId).subject === fc.unit);
  fc.idx = Math.min(fc.idx, list.length - 1);
  const v = list[fc.idx];
  return {
    title: 'Vocabulary',
    html: `<div class="page">${pageHead('Vocabulary trainer', `${s.vocabulary.length} business terms · English–Vietnamese with pronunciation`, `<select class="select select-sm" data-change="fc-unit"><option value="all">All subjects</option>${Object.entries(s.subjects).map(([k, v]) => `<option value="${k}" ${fc.unit === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select>`)}
      <div class="grid"><div class="span-7">${card({ title: `Card ${fc.idx + 1} of ${list.length}`, subtitle: 'Click the card to flip it', body: `
        <div class="flashcard ${fc.flipped ? 'flipped' : ''}" data-action="fc-flip" role="button" tabindex="0" aria-label="Flip card"><div class="flashcard-inner">
          <div class="fc-face"><div class="fc-term">${esc(v.term)}</div><div class="small faint">${esc(S.unitById(s, v.unitId).title)}</div></div>
          <div class="fc-face back"><div style="font-weight:700;font-size:18px">${esc(v.vi)}</div><p>${esc(v.def)}</p></div></div></div>
        <div class="row between mt-4"><button class="btn" data-action="fc-move" data-d="-1" ${fc.idx === 0 ? 'disabled' : ''}>${icon('arrow-left')} Previous</button>
          <button class="btn" data-action="speak" data-text="${esc(v.term)}">${icon('volume-2')} Pronounce</button>
          <button class="btn btn-primary" data-action="fc-move" data-d="1" ${fc.idx >= list.length - 1 ? 'disabled' : ''}>Next ${icon('arrow-right')}</button></div>` })}</div>
      <div class="span-5">${card({ title: 'All terms', flush: true, body: `<div class="list" style="max-height:420px;overflow-y:auto">${list.map((x, i) => `<button class="list-item" data-action="fc-go" data-i="${i}" style="${i === fc.idx ? 'background:var(--brand-soft)' : ''}"><div class="grow"><div class="title small">${esc(x.term)}</div><div class="meta truncate">${esc(x.def)}</div></div></button>`).join('')}</div>` })}</div></div></div>`,
  };
}

/* ---------------- grades ---------------- */
function grades(s, _id, me) {
  const g = S.courseGrade(s, me.id);
  const list = S.assessmentsForSection(s, me.sectionId);
  return {
    title: 'Grades',
    html: `<div class="page">${pageHead('Grades', 'How your course grade is calculated')}
      <div class="grid"><div class="span-4">${kpi({ label: 'Course grade', value: g.value === null ? '—' : `${g.value.toFixed(1)}<small> / 10</small>`, sub: `${g.provisional ? 'Provisional · ' : ''}pass mark ${s.course.gradingScheme.passMark.toFixed(1)}`, iconName: 'award', tone: g.value !== null && g.value < 5 ? 'danger' : 'ok' })}</div>
      <div class="span-8">${card({ title: 'Weights', body: `<div class="row gap-2 wrap">${s.course.gradingScheme.categories.map(c => `<span class="chip">${c.label} ${Math.round(c.weight * 100)}% · ${g.breakdown[c.key] === null ? '—' : g.breakdown[c.key].toFixed(1)}</span>`).join('')}</div><p class="small muted mt-3">Categories without results are left out and their weight is shared among the others until results arrive. Missed assessments count as 0.</p>` })}</div></div>
      ${card({ flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Assessment</th><th>Category</th><th>Closes</th><th>Status</th><th class="num">Score</th></tr></thead><tbody>${list.map(a => {
        const r = S.assessmentResult(s, me.id, a);
        return `<tr><td>${esc(a.title)}</td><td>${ASSESS_META[a.type].label}</td><td>${S.fmtDate(a.closesAt)}</td><td>${badge(r.state === 'graded' || r.state === 'missing' || r.state === 'awaiting_grade' ? r.state : S.assessmentStatus(s, a))}</td><td class="num">${scoreText(r.value)}</td></tr>`;
      }).join('')}</tbody></table></div>` })}</div>`,
  };
}

/* ---------------- calendar & live ---------------- */
function calendar(s, _id, me) {
  return { title: 'Calendar', html: `<div class="page">${pageHead('Calendar', `${esc(s.term.title)} · ${s.term.weeks} weeks`)}${card({ actions: timelineLegend(), title: 'Term timeline', flush: true, body: termTimeline(s, { sections: [S.sectionById(s, me.sectionId)], viewer: 'student' }) })}</div>` };
}
const reactionsLog = [];
function live(s, _id, me) {
  const x = S.activeLiveFor(s, me.sectionId);
  if (!x) return { title: 'Live class', html: `<div class="page">${pageHead('Live class')}${card({ body: empty('radio', 'No live class right now', 'You will get a notification with the PIN when your instructor starts one.') })}</div>` };
  const l = S.lessonById(s, x.lessonId);
  const joined = x.joined.includes(me.id);
  const onScreen = (S.slidesOf(l)[x.slide || 0]?.tiles || []).filter(t => t.kind === 'check');
  const checks = onScreen.map(t => { const mine = x.answers?.[t.id]?.[me.id]; return `<div class="live-check"><div class="q-stem">${esc(t.prompt)}</div>${t.options.map((o, i) => mine === undefined ? `<button class="opt" data-action="live-answer" data-tile="${t.id}" data-o="${i}"><span class="mono small">${'ABCD'[i]}</span> ${esc(o)}</button>` : `<div class="opt ${mine === i ? 'picked' : ''}"><span class="mono small">${'ABCD'[i]}</span> ${esc(o)}</div>`).join('')}${mine === undefined ? '' : '<p class="small">Answer sent — watch the screen for the result.</p>'}</div>`; }).join('');
  return {
    title: 'Live class',
    html: `<div class="page">${pageHead('Live class', `${esc(l.title)} · ${esc(S.userById(s, x.startedBy).name)}`)}
      ${joined ? `<div class="live-stage"><span class="badge b-danger">${icon('radio')} Live</span><h2>${esc(l.title)}</h2><p style="color:#9fb2b7">Follow the slides on the classroom screen. Use reactions to respond.</p>${checks}
          <div class="row gap-2"><button class="btn" data-action="react" data-r="👏 Clap">👏</button><button class="btn" data-action="react" data-r="✋ Question">✋ Question</button><button class="btn" data-action="react" data-r="👍 Understood">👍 Understood</button></div>
          <div class="reactions" id="reactions"></div></div>`
        : card({ title: 'Join with PIN', subtitle: 'Your instructor shares the PIN in class (it is also in your notifications).', body: `<form class="row gap-2 wrap" data-submit="live-join"><input class="input" name="pin" placeholder="UEH-123" style="max-width:220px" autocomplete="off" required><button class="btn btn-primary">${icon('log-in')} Join</button></form>` })}
    </div>`,
  };
}

/* ---------------- join a class with a code ---------------- */
function join(s, code, me) {
  const sec = code ? S.classByCode(s, code) : null;
  const cur = S.sectionById(s, me.sectionId);
  const form = `<form class="row gap-2 wrap" data-submit="class-join-find"><input class="input mono join-input" name="code" placeholder="ABC123" maxlength="6" autocomplete="off" value="${esc(code || '')}" required aria-label="Class code"><button class="btn btn-primary">${icon('search')} Find class</button></form>`;
  const found = sec ? card({ title: esc(sec.code), subtitle: `${esc(S.orgById(s, sec.programId).name)} · ${esc(s.course.title)}`, body: `<div class="stack gap-3">
      <div class="row gap-3 wrap small"><span class="chip">${icon('user')} ${esc(S.userById(s, sec.leadId).name)}</span><span class="chip">${icon('users')} ${sec.studentIds.length} students</span>${S.joinCodeOf(sec) !== String(code).toUpperCase() ? `<span class="chip">${icon('corner-down-right')} Moved from a cancelled class</span>` : ''}</div>
      ${sec.id === me.sectionId ? `<div class="note note-ok">${icon('circle-check')}<div>You are already in this class.</div></div>`
        : `${cur ? `<div class="note note-info">${icon('info')}<div><span>Current class:</span> <strong>${esc(cur.code)}</strong> → <strong>${esc(sec.code)}</strong><div class="small">Joining moves you out of your current class.</div></div></div>` : ''}<div><button class="btn btn-primary" data-action="class-join" data-code="${esc(code)}">${icon('log-in')} Join ${esc(sec.code)}</button></div>`}</div>` })
    : code ? `<div class="note note-danger">${icon('circle-x')}<div>No class has the code <strong>${esc(code)}</strong>. Check it with your lecturer.</div></div>` : '';
  return { title: 'Join a class', html: `<div class="page">${pageHead('Join a class', 'Type the 6-character code your lecturer sent you, or open their link.')}${card({ body: form })}${found}</div>` };
}

export const ROUTES = { join, dashboard, course, lesson, workbook: studentWorkbook, cases: studentCases, case: studentCases, assessments, exam: examPage, result, vocabulary, grades, calendar, live };

/* ---------------- actions ---------------- */
function speak(text) {
  if (!('speechSynthesis' in window)) { toast('Speech is not supported in this browser', 'warn'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB'; u.rate = 0.9;
  speechSynthesis.speak(u);
}
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));

export const actions = {
  // Preview one block exactly as students see it (used by lecturers and deans).
  'block-preview': (el) => {
    const s = getState(); const l = S.lessonById(s, el.dataset.lesson); const b = l?.blocks.find(x => x.id === el.dataset.block);
    if (!b) return;
    const body = l.unitId || b.type === 'page' ? blockBody(s, l, b) : '<p class="muted">Choose a teaching week first — block content comes from the unit.</p>';
    openModal(`${modalHead(`${icon(TYPE_META[b.type].icon)} ${esc(b.title)}`, `${TYPE_META[b.type].label} · ${b.minutes} min · ${esc(l.title)}${l.unitId ? ` · ${l.unitId}` : ''}`)}<div class="modal-body"><div class="note note-info small" style="display:block">${icon('eye')} Student view</div>${body}</div>`, { wide: true });
    if (b.type === 'simulation') startMarketSim();
    if (b.type === 'material') mountMaterials(s);
    if (b.type === 'page') mountMedia(document.getElementById('modal-root'));
  },
  'goto-block': (el) => {
    const s = getState(); const l = S.lessonById(s, player.lessonId);
    const i = Number(el.dataset.i);
    if (!l || i < 0 || i >= l.blocks.length) return;
    player.idx = i; player.openedAt = Date.now(); rerender();
  },
  'complete-block': (el) => {
    const minutes = Math.max(1, Math.ceil((Date.now() - player.openedAt) / 60000));
    dispatch('ACTIVITY_LOGGED', { lessonId: el.dataset.lesson, blockId: el.dataset.block, type: 'complete', minutes });
    const l = S.lessonById(getState(), el.dataset.lesson);
    if (player.idx < l.blocks.length - 1) { player.idx++; player.openedAt = Date.now(); rerender(); }
    else toast('Lesson completed');
  },
  'class-join-find': (form, data) => { location.hash = `/student/join/${String(data.get('code')).trim().toUpperCase()}`; },
  'class-join': (el) => { if (dispatch('CLASS_JOINED', { code: el.dataset.code })) location.hash = '/student/dashboard'; },
  'live-answer': (el) => dispatch('LIVE_ANSWERED', { tileId: el.dataset.tile, o: Number(el.dataset.o) }),
  'practice-answer': (el) => {
    player.practice[el.dataset.block] ??= {};
    player.practice[el.dataset.block][el.dataset.q] = Number(el.dataset.o);
    rerender();
  },
  'sop-step': (el) => {
    const arr = player.sop[el.dataset.block] ??= [];
    const i = Number(el.dataset.i);
    player.sop[el.dataset.block] = el.checked ? [...arr, i] : arr.filter(x => x !== i);
    el.closest('.opt').classList.toggle('selected', el.checked);
  },
  speak: (el) => speak(el.dataset.text),
  'exam-start': async (el) => {
    const s = getState(); const a = S.assessmentById(s, el.dataset.id);
    const ok = await confirmDialog({ title: `Start ${a.title}?`, body: `<p>${a.questionIds.length} questions${a.timeLimitMin ? `, ${a.timeLimitMin} minutes` : ''}. Attempt ${S.attemptsOf(s, S.currentUser(s).id, a.id).length + 1} of ${a.maxAttempts}. The timer cannot be paused.</p>`, confirmLabel: 'Start now' });
    if (!ok) return;
    exam.id = a.id; exam.answers = {}; exam.startedAt = S.now(s).toISOString(); exam.startedReal = Date.now();
    rerender();
  },
  'exam-answer': (el) => {
    exam.answers[el.dataset.q] = Number(el.value);
    el.closest('.q-card').querySelectorAll('.opt').forEach(o => o.classList.toggle('selected', o.contains(el)));
    const c = document.getElementById('exam-answered'); if (c) c.textContent = Object.keys(exam.answers).length;
  },
  'exam-submit': async () => {
    const s = getState(); const a = S.assessmentById(s, exam.id);
    const missing = a.questionIds.length - Object.keys(exam.answers).length;
    const ok = await confirmDialog({ title: 'Submit your answers?', body: missing ? `<div class="note note-warn">${icon('triangle-alert')}<div>${missing} question${missing > 1 ? 's are' : ' is'} unanswered and will be marked incorrect.</div></div>` : '<p>All questions answered. You cannot change answers after submitting.</p>', confirmLabel: 'Submit' });
    if (ok) submitExam();
  },
  'fc-flip': () => { fc.flipped = !fc.flipped; document.querySelector('.flashcard')?.classList.toggle('flipped', fc.flipped); },
  'fc-move': (el) => { fc.idx += Number(el.dataset.d); fc.flipped = false; logFlashcard(); rerender(); },
  'fc-go': (el) => { fc.idx = Number(el.dataset.i); fc.flipped = false; rerender(); },
  'fc-unit': (el) => { fc.unit = el.value; fc.idx = 0; fc.flipped = false; rerender(); },
  'live-join': (form, data) => dispatch('LIVE_JOINED', { pin: data.get('pin') }),
  react: (el) => {
    const box = document.getElementById('reactions'); if (!box) return;
    const r = document.createElement('div'); r.className = 'reaction'; r.textContent = el.dataset.r; box.appendChild(r); setTimeout(() => r.remove(), 2400);
    reactionsLog.push(el.dataset.r);
  },
};

// Credit real time spent on flashcards in 5-minute chunks.
function logFlashcard() {
  const mins = Math.floor((Date.now() - fc.startedReal) / 60000);
  if (mins >= 5) { dispatch('ACTIVITY_LOGGED', { type: 'flashcard', minutes: mins }); fc.startedReal = Date.now(); }
}

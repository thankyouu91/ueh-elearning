// Organisation explorer: the same KPIs at every level, drill down University → School → Programme → Class → Student.
import * as S from '../selectors.js';
import { esc, icon, badge, kpi, card, empty, avatar, scoreText, subjectChip, makeChart, cssVar, ASSESS_META } from '../ui.js';
import { gradebookTable, termTimeline, timelineLegend, radarChart, BENCHMARK, atRiskList } from './shared.js';

const LEVEL = { university: 'University', school: 'School', program: 'Programme', section: 'Class', student: 'Student' };

/** Resolve an id (org unit, section or student) inside the viewer's scope. */
function resolve(s, me, id) {
  const root = me.orgId;
  const org = S.orgById(s, id);
  if (org && S.isUnder(s, org.id, root)) return { kind: org.type, org };
  const sec = S.sectionById(s, id);
  if (sec && S.isUnder(s, sec.programId, root)) return { kind: 'section', sec };
  const stu = S.userById(s, id);
  if (stu?.role === 'student' && S.isUnder(s, S.sectionById(s, stu.sectionId).programId, root)) return { kind: 'student', stu, sec: S.sectionById(s, stu.sectionId) };
  return { kind: S.orgById(s, root).type, org: S.orgById(s, root) };
}

function crumbs(s, me, base, chain) {
  const rootDepth = S.orgPath(s, me.orgId).length - 1;
  return `<nav class="crumbs" aria-label="Breadcrumb">${chain.slice(rootDepth).map((c, i, arr) => i === arr.length - 1 ? `<span class="cur">${esc(c.name)}</span>` : `<a href="${base}/${c.id}">${esc(c.name)}</a>${icon('chevron-right', 'faint')}`).join('')}</nav>`;
}

function kpis(st) {
  return `<div class="grid">
    <div class="span-3">${kpi({ label: 'Students', value: String(st.students), sub: `${st.sections} class${st.sections === 1 ? '' : 'es'}`, iconName: 'users' })}</div>
    <div class="span-3">${kpi({ label: 'Average grade', value: st.avg === null ? '—' : `${st.avg.toFixed(1)}<small> / 10</small>`, sub: `Pass rate ${st.pass ?? '—'}%`, iconName: 'graduation-cap', tone: st.pass !== null && st.pass < 80 ? 'warn' : '' })}</div>
    <div class="span-3">${kpi({ label: 'Engagement', value: st.engagement === null ? '—' : `${st.engagement}%`, sub: `Term delivery ${st.delivery}%`, iconName: 'activity', tone: st.engagement !== null && st.engagement < 70 ? 'warn' : 'ok' })}</div>
    <div class="span-3">${kpi({ label: 'At risk', value: String(st.atRisk), sub: `${st.pending} lessons in review, ${st.ungraded} to grade`, iconName: 'triangle-alert', tone: st.atRisk ? 'danger' : 'ok' })}</div>
  </div>`;
}

function childRows(s, base, children) {
  return `<div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Lead</th><th class="num">Classes</th><th class="num">Students</th><th class="num">Avg grade</th><th class="num">Pass</th><th class="num">Engagement</th><th class="num">At risk</th><th class="num">In review</th><th class="num">Delivery</th><th></th></tr></thead><tbody>
    ${children.map(c => `<tr class="click" data-action="go" data-href="${base}/${c.id}">
      <td><strong>${esc(c.name)}</strong>${c.sub ? `<div class="small faint">${c.sub}</div>` : ''}</td><td class="small">${esc(c.lead || '—')}</td>
      <td class="num">${c.st.sections}</td><td class="num">${c.st.students}</td><td class="num">${scoreText(c.st.avg)}</td><td class="num">${c.st.pass ?? '—'}%</td>
      <td class="num"><span class="${c.st.engagement !== null && c.st.engagement < 70 ? 't-warn' : ''}">${c.st.engagement ?? '—'}%</span></td>
      <td class="num">${c.st.atRisk ? `<span class="t-danger"><strong>${c.st.atRisk}</strong></span>` : '0'}</td><td class="num">${c.st.pending}</td><td class="num">${c.st.delivery}%</td>
      <td class="num">${icon('chevron-right', 'faint')}</td></tr>`).join('')}</tbody></table></div>`;
}

function compareChart(id, children) {
  makeChart(id, {
    type: 'bar',
    data: { labels: children.map(c => c.short || c.name), datasets: [
      { label: 'Average grade (×10)', data: children.map(c => (c.st.avg ?? 0) * 10), backgroundColor: cssVar('--brand'), borderRadius: 4 },
      { label: 'Pass rate %', data: children.map(c => c.st.pass ?? 0), backgroundColor: cssVar('--brand-2'), borderRadius: 4 },
      { label: 'Engagement %', data: children.map(c => c.st.engagement ?? 0), backgroundColor: cssVar('--text-3'), borderRadius: 4 } ] },
    options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10 } }, tooltip: { callbacks: { label: (c) => c.datasetIndex === 0 ? `Average grade: ${(c.raw / 10).toFixed(1)}/10` : `${c.dataset.label}: ${c.raw}` } } }, scales: { y: { min: 0, max: 100, grid: { color: cssVar('--border') } }, x: { grid: { display: false } } } },
  });
}

function curriculumStrip(s, unitIds) {
  return `<div class="row gap-2 wrap">${unitIds.map((id, i) => { const u = S.unitById(s, id); return `<span class="chip" title="${esc(u.title)}"><span class="faint">W${i + 1}</span> ${subjectChip(s, u.subject)} ${esc(u.id)}</span>`; }).join('')}</div>`;
}

/** Returns { title, html, mount } for the explorer at `id`. `base` like '#/provost/explore'. */
export function explorerView(s, me, id, base) {
  const r = resolve(s, me, id);
  if (r.kind === 'student') return studentView(s, me, r, base);
  if (r.kind === 'section') return sectionView(s, me, r.sec, base);
  const org = r.org;
  const sections = S.sectionsUnder(s, org.id);
  const st = S.orgStats(s, sections);
  const students = S.studentsInSections(s, sections);
  let children;
  if (org.type === 'program') {
    children = sections.map(sec => ({ id: sec.id, name: sec.code, short: sec.code, lead: sec.instructorIds.map(i => S.userById(s, i).name).join(', '), st: S.orgStats(s, [sec]), sub: `Week ${s.clock.week}, ${S.publishedLessons(s, sec.id).length} lessons live` }));
  } else {
    children = S.orgChildren(s, org.id).map(c => {
      const secs = S.sectionsUnder(s, c.id);
      const lead = c.type === 'school' ? s.users.find(u => u.role === 'director' && u.orgId === c.id)?.name : [...new Set(secs.flatMap(x => x.instructorIds))].map(i => S.userById(s, i).name).join(', ');
      return { id: c.id, name: c.name, short: c.name.replace(/^(School of|Bachelor of) /, ''), lead, st: S.orgStats(s, secs), sub: c.type === 'program' ? `${secs.length} classes, curriculum ${esc(S.activeVersion(S.programById(s, c.id)).label)}` : `${S.orgChildren(s, c.id).length} programme(s)` };
    });
  }
  const prog = org.type === 'program' ? S.programById(s, org.id) : null;
  const childLabel = { university: 'Schools', school: 'Programmes', program: 'Classes' }[org.type];
  return {
    title: org.name,
    html: `<div class="page">
      <div class="stack gap-2">${crumbs(s, me, base, S.orgPath(s, org.id))}<div class="page-head"><div><div class="level-tag">${LEVEL[org.type]}</div><h1>${esc(org.name)}</h1><p class="muted">${esc(s.term.title)}, week ${s.clock.week} of ${s.term.weeks}</p></div></div></div>
      ${kpis(st)}
      ${card({ title: childLabel, subtitle: 'Click a row to drill down', flush: true, body: childRows(s, base, children) })}
      ${prog ? card({ title: 'Curriculum in use', subtitle: esc(S.activeVersion(prog).label), body: curriculumStrip(s, S.activeVersion(prog).unitIds) }) : ''}
      <div class="grid">
        <div class="span-7">${card({ title: `Compare ${childLabel.toLowerCase()}`, body: '<div class="chart-box"><canvas id="ex-compare"></canvas></div>' })}</div>
        <div class="span-5">${card({ title: 'Mastery by subject', subtitle: '% correct vs. benchmark', body: '<div class="chart-box"><canvas id="ex-radar"></canvas></div>' })}</div>
      </div>
      ${card({ title: `At-risk students, ${st.atRisk}`, flush: true, body: atRiskList(s, sections, null, base) })}
    </div>`,
    mount: () => {
      compareChart('ex-compare', children);
      radarChart('ex-radar', [{ label: org.name, values: S.competency(s, students.map(u => u.id)) }, { label: 'Benchmark', values: BENCHMARK, dashed: true }]);
    },
  };
}

function sectionView(s, me, sec, base) {
  const st = S.orgStats(s, [sec]);
  const prog = S.programById(s, sec.programId);
  const chain = [...S.orgPath(s, prog.id), { id: sec.id, name: sec.code }];
  return {
    title: sec.code,
    html: `<div class="page">
      <div class="stack gap-2">${crumbs(s, me, base, chain)}<div class="page-head"><div><div class="level-tag">Class</div><h1>${esc(sec.code)}</h1><p class="muted">${esc(S.orgById(s, prog.id).name)}, Lecturer ${esc(sec.instructorIds.map(i => S.userById(s, i).name).join(', '))}</p></div></div></div>
      ${kpis(st)}
      ${card({ title: 'Students', subtitle: 'Click a name to open the student record', flush: true, body: gradebookTable(s, [sec], { studentHref: (u) => `${base}/${u.id}` }) })}
      ${card({ title: 'Teaching plan', actions: timelineLegend(), flush: true, body: termTimeline(s, { sections: [sec], viewer: 'director', showGaps: true }) })}
    </div>`,
  };
}

function studentView(s, me, { stu, sec }, base) {
  const prog = S.programById(s, sec.programId);
  const chain = [...S.orgPath(s, prog.id), { id: sec.id, name: sec.code }, { id: stu.id, name: stu.name }];
  const g = S.courseGrade(s, stu.id), r = S.atRisk(s, stu.id), e = S.engagement(s, stu.id);
  const list = S.assessmentsForSection(s, sec.id);
  const lessons = S.publishedLessons(s, sec.id);
  const recent = s.activity.filter(a => a.studentId === stu.id).sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 8);
  return {
    title: stu.name,
    html: `<div class="page">
      <div class="stack gap-2">${crumbs(s, me, base, chain)}
        <div class="page-head"><div class="row gap-3">${avatar(stu, 'lg')}<div><div class="level-tag">Student</div><h1>${esc(stu.name)}</h1><p class="muted">${stu.id}, ${esc(sec.code)}, ${esc(stu.email)}</p></div></div>${r.flag ? badge('at_risk') : badge('on_track')}</div></div>
      ${r.flag ? `<div class="note note-danger">${icon('triangle-alert')}<div><strong>At risk:</strong> ${esc(r.reasons.join('; '))}</div></div>` : ''}
      <div class="grid">
        <div class="span-3">${kpi({ label: 'Course grade', value: g.value === null ? '—' : `${g.value.toFixed(1)}<small> / 10</small>`, sub: g.provisional ? 'Provisional' : 'Final', iconName: 'award', tone: g.value !== null && g.value < 5 ? 'danger' : '' })}</div>
        <div class="span-3">${kpi({ label: 'Engagement', value: e === null ? '—' : `${e}%`, sub: 'Activities completed', iconName: 'activity', tone: e !== null && e < 60 ? 'danger' : 'ok' })}</div>
        <div class="span-3">${kpi({ label: 'Study time', value: S.fmtMinutes(S.studyMinutes(s, stu.id)), sub: `${S.fmtMinutes(S.studyMinutes(s, stu.id, s.clock.week))} this week`, iconName: 'clock' })}</div>
        <div class="span-3">${kpi({ label: 'Missed', value: String(S.overdue(s, stu.id).length), sub: 'Closed with no submission', iconName: 'circle-x', tone: S.overdue(s, stu.id).length ? 'danger' : '' })}</div>
      </div>
      <div class="grid">
        <div class="span-7">${card({ title: 'Assessment results', flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Assessment</th><th>Type</th><th>Closes</th><th>Status</th><th class="num">Score</th></tr></thead><tbody>${list.map(a => { const res = S.assessmentResult(s, stu.id, a); return `<tr><td>${esc(a.title)}</td><td>${ASSESS_META[a.type].label}</td><td>${S.fmtDate(a.closesAt)}</td><td>${badge(['graded', 'missing', 'awaiting_grade'].includes(res.state) ? res.state : S.assessmentStatus(s, a))}</td><td class="num">${scoreText(res.value)}</td></tr>`; }).join('')}</tbody></table></div>` })}</div>
        <div class="span-5">${card({ title: 'Mastery by subject', subtitle: 'Student vs. class average', body: '<div class="chart-box"><canvas id="ex-stu-radar"></canvas></div>' })}</div>
      </div>
      <div class="grid">
        <div class="span-7">${card({ title: 'Lesson progress', flush: true, body: `<div class="list">${lessons.map(l => { const p = S.lessonProgress(s, stu.id, l); const u = S.unitById(s, l.unitId); return `<div class="list-item"><span class="faint small" style="width:28px">W${l.week}</span>${subjectChip(s, u.subject)}<div class="grow truncate">${esc(l.title)}</div><span class="small ${p.done === p.total ? 't-ok' : p.done === 0 ? 't-danger' : 'muted'}">${p.done}/${p.total}</span></div>`; }).join('')}</div>` })}</div>
        <div class="span-5">${card({ title: 'Recent activity', flush: true, body: recent.length ? `<div class="list">${recent.map(a => `<div class="list-item"><span class="li-icon">${icon(a.type === 'flashcard' ? 'languages' : a.type === 'live' ? 'radio' : 'check')}</span><div class="grow"><div class="small">${a.type === 'complete' ? `Completed an activity in "${esc(S.lessonById(s, a.lessonId)?.title || '')}"` : a.type === 'flashcard' ? 'Vocabulary practice' : 'Live class'}</div><div class="small faint">${S.fmtDateTime(a.at)}, ${a.minutes} min</div></div></div>`).join('')}</div>` : empty('activity', 'No activity yet') })}</div>
      </div>
    </div>`,
    mount: () => radarChart('ex-stu-radar', [{ label: stu.name, values: S.competency(s, [stu.id]) }, { label: `${sec.code} average`, values: S.competency(s, sec.studentIds) }, { label: 'Benchmark', values: BENCHMARK, dashed: true }]),
  };
}

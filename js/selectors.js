// Every number in the UI comes from here. Nothing is hardcoded in views.
import { weekStart } from './seed.js';

const DAY = 86400000;

export function now(s) {
  const base = weekStart(s.clock.week).getTime() + 2 * DAY + 10 * 3600000; // Wednesday 10:00 of current week
  return new Date(base + (Date.now() - s.clock.setAt));
}
export const weekStartOf = (s, week) => new Date(new Date(s.term.startDate).getTime() + (week - 1) * 7 * DAY);
export const weekOf =(s, dateish) => Math.floor((new Date(dateish) - new Date(s.term.startDate)) / (7 * DAY)) + 1;

export const userById = (s, id) => s.users.find(u => u.id === id);
export const currentUser = (s) => userById(s, s.session.userId);
export const sectionById = (s, id) => s.sections.find(x => x.id === id);
export const unitById = (s, id) => s.units.find(u => u.id === id);
export const lessonById = (s, id) => s.lessons.find(l => l.id === id);
export const assessmentById = (s, id) => s.assessments.find(a => a.id === id);
export const questionById = (s, id) => s.questions.find(q => q.id === id);

/* ---------- organisation tree ---------- */
export const orgById = (s, id) => s.orgUnits.find(o => o.id === id);
export const orgChildren = (s, id) => s.orgUnits.filter(o => o.parentId === id);
export function orgPath(s, id) {
  const out = [];
  let o = orgById(s, id);
  while (o) { out.unshift(o); o = orgById(s, o.parentId); }
  return out;
}
export function orgDescendantIds(s, id) {
  const out = [id];
  for (let i = 0; i < out.length; i++) s.orgUnits.filter(o => o.parentId === out[i]).forEach(o => out.push(o.id));
  return out;
}
export const isUnder = (s, orgId, ancestorId) => orgPath(s, orgId).some(o => o.id === ancestorId);
export const sectionsUnder = (s, orgId) => { const ids = new Set(orgDescendantIds(s, orgId)); return s.sections.filter(x => ids.has(x.programId)); };
export const programById = (s, id) => s.programs.find(p => p.id === id);
export const programOfSection = (s, sectionId) => programById(s, sectionById(s, sectionId)?.programId);
export const schoolOfSection = (s, sectionId) => orgById(s, programOfSection(s, sectionId)?.schoolId);
export const programsUnder = (s, orgId) => { const ids = new Set(orgDescendantIds(s, orgId)); return s.programs.filter(p => ids.has(p.id)); };

/* ---------- curriculum ---------- */
export const unitsById = (s) => Object.fromEntries(s.units.map(u => [u.id, u]));
export function curriculumOfSection(s, sectionId) {
  const sec = sectionById(s, sectionId);
  const p = programById(s, sec.programId);
  return (p.versions.find(v => v.id === sec.versionId) || p.versions[p.versions.length - 1]).unitIds;
}
export const unitForWeek = (s, sectionId, week) => unitById(s, curriculumOfSection(s, sectionId)[week - 1]);
export const activeVersion = (p) => [...p.versions].reverse().find(v => v.status === 'active') || p.versions[0];
export const subjectLabel = (s, key) => s.subjects[key]?.label || key;
export function subjectCounts(s, unitIds) {
  const out = Object.fromEntries(Object.keys(s.subjects).map(k => [k, 0]));
  for (const id of unitIds) { const u = unitById(s, id); if (u) out[u.subject]++; }
  return out;
}
/** Validation of a 16-slot curriculum against the framework rules. */
export function validateCurriculum(s, unitIds) {
  const fw = s.framework;
  const issues = [];
  const filled = unitIds.filter(Boolean);
  if (filled.length < fw.capacity) issues.push(`${fw.capacity - filled.length} empty slot${fw.capacity - filled.length > 1 ? 's' : ''} — every week needs a unit`);
  const missing = fw.requiredUnitIds.filter(id => !filled.includes(id));
  if (missing.length) issues.push(`Required core units missing: ${missing.join(', ')}`);
  const counts = subjectCounts(s, filled);
  for (const k of fw.coreSubjects) if (counts[k] < fw.minPerCoreSubject) issues.push(`${subjectLabel(s, k)} needs at least ${fw.minPerCoreSubject} units (has ${counts[k]})`);
  if (new Set(filled).size !== filled.length) issues.push('A unit appears more than once');
  return issues;
}

export function sectionsForUser(s, user = currentUser(s)) {
  if (!user) return [];
  if (user.role === 'student') return s.sections.filter(x => x.id === user.sectionId);
  if (user.role === 'instructor') return s.sections.filter(x => x.instructorIds.includes(user.id));
  if (user.orgId) return sectionsUnder(s, user.orgId);
  return s.sections;
}
/** Org units the user may filter by (their own unit and everything below it). */
export function scopeOrgs(s, user = currentUser(s)) {
  if (!user?.orgId) return [];
  return orgDescendantIds(s, user.orgId).map(id => orgById(s, id)).filter(o => o.type !== 'section');
}
/** Sections in scope after the topbar organisation filter. */
export function scopedSections(s) {
  const user = currentUser(s);
  const all = sectionsForUser(s, user);
  const f = s.ui.orgFilter;
  if (f && user?.orgId && isUnder(s, f, user.orgId)) { const sub = new Set(sectionsUnder(s, f).map(x => x.id)); return all.filter(x => sub.has(x.id)); }
  return all;
}
export const studentsInSections = (s, sections) => s.users.filter(u => u.role === 'student' && sections.some(x => x.studentIds.includes(u.id)));
export const instructorsOfSection = (s, sectionId) => sectionById(s, sectionId)?.instructorIds || [];
/** Deans (directors) whose organisation contains the section, falling back to the provost. */
export function deansFor(s, sectionId) {
  const p = programOfSection(s, sectionId);
  const ids = s.users.filter(u => u.role === 'director' && p && isUnder(s, p.id, u.orgId)).map(u => u.id);
  return ids.length ? ids : provosts(s);
}
export const provosts = (s) => s.users.filter(u => u.role === 'provost').map(u => u.id);
export const directors = (s) => s.users.filter(u => u.role === 'director').map(u => u.id);
/** Can this user act on (approve, review) things in this section? */
/* ---------- class join codes ---------- */
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O, 1/I
/** Six-character code students type to join a class. Seed classes get a stable code from their id. */
export function joinCodeOf(sec) {
  if (sec.joinCode) return sec.joinCode;
  let h = 2166136261;
  for (const c of sec.id) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  let out = '';
  for (let i = 0; i < 6; i++) { h ^= h >>> 13; h = Math.imul(h, 0x5bd1e995); h ^= h >>> 15; out += CODE_CHARS[(h >>> 0) % CODE_CHARS.length]; }
  return out;
}
export const newJoinCode = (s) => { let c; do { c = Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join(''); } while (classByCode(s, c)); return c; };
/** The class a code opens; a cancelled class's code leads to the class its students were moved to. */
export function classByCode(s, code) {
  const c = String(code || '').trim().toUpperCase();
  if (!c) return null;
  return s.sections.find(x => joinCodeOf(x) === c) || sectionById(s, s.classRedirects?.[c]) || null;
}
export const joinLink = (sec) => `${location.origin}${location.pathname}#/student/join/${joinCodeOf(sec)}`;
/** Classes opened by lecturers (not from the timetable seed), newest first. */
export const newClasses = (s, sections) => sections.filter(x => x.createdAt).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
console.assert(joinCodeOf({ id: 'S-ECO1' }) === joinCodeOf({ id: 'S-ECO1' }) && joinCodeOf({ id: 'S-ECO1' }).length === 6, 'joinCodeOf self-check');

export function canManageSection(s, user, sectionId) {
  if (user.role === 'provost') return true;
  if (user.role === 'director') return isUnder(s, programOfSection(s, sectionId).id, user.orgId);
  return false;
}

/** Aggregate KPIs for any organisation unit (university, school, programme) or a list of sections. */
export function orgStats(s, sections) {
  const studs = studentsInSections(s, sections);
  const grades = studs.map(u => courseGrade(s, u.id).value).filter(v => v !== null);
  const eng = studs.map(u => engagement(s, u.id)).filter(v => v !== null);
  const avg = (a) => a.length ? round1(a.reduce((t, v) => t + v, 0) / a.length) : null;
  const prog = termProgress(s, sections);
  return {
    sections: sections.length, students: studs.length, avg: avg(grades),
    pass: grades.length ? Math.round((grades.filter(v => v >= s.course.gradingScheme.passMark).length / grades.length) * 100) : null,
    engagement: avg(eng), atRisk: studs.filter(u => atRisk(s, u.id).flag).length,
    delivery: prog.pct, pending: pendingApprovals(s, sections).length, ungraded: ungradedWorkshop(s, sections).length,
    minutes: studs.reduce((t, u) => t + studyMinutes(s, u.id, s.clock.week), 0),
  };
}

export const lessonMinutes = (l) => l.blocks.reduce((t, b) => t + (Number(b.minutes) || 0), 0);
export const publishedLessons = (s, sectionId) => s.lessons.filter(l => l.sectionId === sectionId && l.status === 'published').sort((a, b) => a.week - b.week);

/* ---------- assessments ---------- */
export function assessmentStatus(s, a, at = now(s)) {
  if (a.status === 'draft') return 'draft';
  if (at < new Date(a.opensAt)) return 'scheduled';
  if (at <= new Date(a.closesAt)) return 'open';
  return 'closed';
}
export const assessmentsForSection = (s, sectionId) => s.assessments.filter(a => a.sectionIds.includes(sectionId)).sort((a, b) => new Date(a.opensAt) - new Date(b.opensAt));
export const attemptsOf = (s, studentId, assessmentId) => s.attempts.filter(x => x.studentId === studentId && x.assessmentId === assessmentId);
export const rubricOf = (s, studentId, assessmentId) => s.rubricGrades.find(g => g.studentId === studentId && g.assessmentId === assessmentId);

export function gradeAttempt(s, assessment, answers) {
  let score = 0, max = 0;
  for (const qid of assessment.questionIds) {
    const q = questionById(s, qid);
    max += q.points;
    if (answers[qid] === q.answerIndex) score += q.points;
  }
  return { score, maxScore: max };
}

/** Score on a 0–10 scale, or null when there is nothing to grade yet. `missing` = closed with no submission. */
export function assessmentResult(s, studentId, a) {
  if (a.type === 'workshop') {
    const g = rubricOf(s, studentId, a.id);
    if (g) {
      const pts = g.criteria.reduce((t, c) => t + c.level, 0);
      return { value: round1((pts / (g.criteria.length * 4)) * 10), state: 'graded' };
    }
    return { value: null, state: assessmentStatus(s, a) === 'closed' ? 'awaiting_grade' : assessmentStatus(s, a) };
  }
  const at = attemptsOf(s, studentId, a.id).filter(x => x.status === 'graded');
  if (at.length) {
    const best = Math.max(...at.map(x => x.score / x.maxScore));
    return { value: round1(best * 10), state: 'graded', attempts: at.length };
  }
  const st = assessmentStatus(s, a);
  if (st === 'closed') return { value: 0, state: 'missing' };
  return { value: null, state: st };
}

export function categoryAverages(s, studentId) {
  const stu = userById(s, studentId);
  const out = {};
  for (const c of s.course.gradingScheme.categories) {
    const vals = assessmentsForSection(s, stu.sectionId).filter(a => a.type === c.key)
      .map(a => assessmentResult(s, studentId, a).value).filter(v => v !== null);
    out[c.key] = vals.length ? round1(vals.reduce((t, v) => t + v, 0) / vals.length) : null;
  }
  return out;
}

export function courseGrade(s, studentId) {
  const avg = categoryAverages(s, studentId);
  let wSum = 0, total = 0;
  const cats = s.course.gradingScheme.categories;
  for (const c of cats) if (avg[c.key] !== null) { wSum += c.weight; total += avg[c.key] * c.weight; }
  if (!wSum) return { value: null, provisional: true, breakdown: avg };
  return { value: round1(total / wSum), provisional: cats.some(c => avg[c.key] === null), breakdown: avg };
}

/* ---------- engagement & time ---------- */
export function engagement(s, studentId) {
  const stu = userById(s, studentId);
  const lessons = publishedLessons(s, stu.sectionId);
  const blockIds = new Set(lessons.flatMap(l => l.blocks.map(b => b.id)));
  if (!blockIds.size) return null;
  const done = new Set(s.activity.filter(a => a.studentId === studentId && a.type === 'complete' && blockIds.has(a.blockId)).map(a => a.blockId));
  return Math.round((done.size / blockIds.size) * 1000) / 10;
}
export function lessonProgress(s, studentId, lesson) {
  const done = new Set(s.activity.filter(a => a.studentId === studentId && a.lessonId === lesson.id && a.type === 'complete').map(a => a.blockId));
  return { done: lesson.blocks.filter(b => done.has(b.id)).length, total: lesson.blocks.length, doneIds: done };
}
export function studyMinutes(s, studentId, week = null) {
  let m = 0;
  for (const a of s.activity) if (a.studentId === studentId && (week === null || weekOf(s, a.at) === week)) m += a.minutes;
  for (const t of s.attempts) if (t.studentId === studentId && t.submittedAt && (week === null || weekOf(s, t.submittedAt) === week)) m += Math.max(1, Math.round((new Date(t.submittedAt) - new Date(t.startedAt)) / 60000));
  return m;
}
export const fmtMinutes = (m) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;

/* ---------- competency ---------- */
export function competency(s, studentIds) {
  const set = new Set(studentIds);
  const acc = {};
  for (const t of s.attempts) {
    if (!set.has(t.studentId) || t.status !== 'graded') continue;
    for (const [qid, pick] of Object.entries(t.answers)) {
      const q = questionById(s, qid);
      if (!q) continue;
      acc[q.competencyTag] ??= { c: 0, n: 0 };
      acc[q.competencyTag].n++;
      if (pick === q.answerIndex) acc[q.competencyTag].c++;
    }
  }
  const out = {};
  for (const [k, v] of Object.entries(acc)) out[k] = Math.round((v.c / v.n) * 100);
  return out;
}

/* ---------- risk & queues ---------- */
export function overdue(s, studentId) {
  const stu = userById(s, studentId);
  return assessmentsForSection(s, stu.sectionId).filter(a => a.type !== 'workshop' && assessmentResult(s, studentId, a).state === 'missing');
}
export function atRisk(s, studentId) {
  const reasons = [];
  const g = courseGrade(s, studentId).value;
  const e = engagement(s, studentId);
  const o = overdue(s, studentId).length;
  if (g !== null && g < s.course.gradingScheme.passMark) reasons.push(`Course grade ${g.toFixed(1)} is below the pass mark`);
  if (e !== null && e < 60) reasons.push(`Engagement ${e}% is below 60%`);
  if (o >= 2) reasons.push(`${o} missed assessments`);
  return { flag: reasons.length > 0, reasons };
}
export function upcomingForStudent(s, studentId) {
  const stu = userById(s, studentId);
  const t = now(s);
  return assessmentsForSection(s, stu.sectionId).map(a => ({ a, st: assessmentStatus(s, a), r: assessmentResult(s, studentId, a) }))
    .filter(x => (x.st === 'open' && x.a.type !== 'workshop' && attemptsOf(s, studentId, x.a.id).length < x.a.maxAttempts && x.r.state !== 'graded')
      || (x.st === 'scheduled' && new Date(x.a.opensAt) - t < 7 * DAY))
    .sort((x, y) => new Date(x.a.closesAt) - new Date(y.a.closesAt));
}
/**
 * Everything a student should do next, most urgent first.
 * level: urgent (≤ 2 days left or live now) · soon (this week) · catchup (earlier weeks) · later (opens soon) · missed.
 */
export function studentTasks(s, studentId) {
  const stu = userById(s, studentId); const t = now(s);
  const tasks = [];
  const live = activeLiveFor(s, stu.sectionId);
  if (live) tasks.push({ level: 'urgent', icon: 'radio', title: lessonById(s, live.lessonId).title, why: 'Live class now', href: '#/student/live', action: 'Join' });
  for (const { a, st } of upcomingForStudent(s, studentId)) {
    if (st === 'open') {
      const left = new Date(a.closesAt) - t;
      tasks.push({ level: left <= 2 * DAY ? 'urgent' : 'soon', icon: 'clipboard-check', title: a.title, why: 'Assessment open', due: a.closesAt, href: `#/student/exam/${a.id}`, action: 'Start' });
    } else tasks.push({ level: 'later', icon: 'calendar-clock', title: a.title, why: 'Opens soon', opens: a.opensAt, href: '#/student/assessments', action: 'View' });
  }
  for (const l of publishedLessons(s, stu.sectionId).filter(l => l.week <= s.clock.week)) {
    const p = lessonProgress(s, studentId, l);
    if (p.done >= p.total) continue;
    const thisWeek = l.week === s.clock.week;
    tasks.push({ level: thisWeek ? 'soon' : 'catchup', icon: 'book-open', title: l.title, why: thisWeek ? `This week's lesson · ${p.done}/${p.total} done` : `Week ${l.week} lesson not finished · ${p.done}/${p.total} done`, href: `#/student/lesson/${l.id}`, action: p.done ? 'Resume' : 'Start', pct: Math.round((p.done / p.total) * 100) });
  }
  for (const a of overdue(s, studentId).filter(a => t - new Date(a.closesAt) < 14 * DAY)) tasks.push({ level: 'missed', icon: 'circle-x', title: a.title, why: 'Missed — counted as 0. Talk to your lecturer.', href: '#/student/assessments', action: 'View' });
  const order = { urgent: 0, soon: 1, catchup: 2, missed: 3, later: 4 };
  return tasks.sort((x, y) => order[x.level] - order[y.level] || new Date(x.due || x.opens || 0) - new Date(y.due || y.opens || 0));
}
/** Lecturers get the reduced "simple" interface unless they switch to the full one. */
export const isSimple = (s, user = currentUser(s)) => user?.role === 'instructor' && s.ui.simple !== false;
/** What a lecturer should do next, most urgent first. Same shape as studentTasks. */
export function lecturerTasks(s, me) {
  const secs = sectionsForUser(s, me); const tasks = [];
  for (const sec of secs) {
    const live = activeLiveFor(s, sec.id);
    if (live && live.startedBy === me.id) tasks.push({ level: 'urgent', icon: 'radio', title: lessonById(s, live.lessonId).title, why: `${sec.code} · Live class is open`, href: '#/instructor/live', action: 'Open' });
  }
  for (const l of s.lessons.filter(l => l.authorId === me.id && l.status === 'changes_requested'))
    tasks.push({ level: 'urgent', icon: 'message-square-warning', title: l.title, why: `${sectionById(s, l.sectionId)?.code || ''} · The Dean asked for changes`, href: `#/instructor/builder/${l.id}`, action: 'Fix' });
  for (const sec of secs) {
    const nw = s.clock.week + 1;
    const unit = nw <= s.term.weeks ? unitForWeek(s, sec.id, nw) : null;
    if (unit && teachesUnit(s, me.id, sec.id, unit.id)) {
      const l = s.lessons.find(x => x.sectionId === sec.id && x.week === nw && x.status !== 'rejected');
      if (!l) tasks.push({ level: 'soon', icon: 'layers', title: `Prepare the week ${nw} lesson`, why: `${sec.code} · ${unit.id} ${unit.title}`, href: `#/instructor/lessons?new=${sec.id}`, action: 'Prepare' });
      else if (l.status === 'draft') tasks.push({ level: 'soon', icon: 'send', title: l.title, why: `${sec.code} · Week ${nw} draft not sent to the Dean yet`, href: `#/instructor/builder/${l.id}`, action: 'Continue' });
    }
  }
  // one line for all marking: the queue runs across classes, oldest answer first
  const toMark = pendingMarking(s, secs, me.id).length;
  if (toMark) tasks.push({ level: toMark > 10 ? 'urgent' : 'soon', icon: 'pen-line', title: `Mark ${toMark} answers`, why: `${secs.filter(sec => pendingMarking(s, [sec], me.id).length).map(sec => sec.code).join(', ')} · Students are waiting for feedback`, href: '#/instructor/gradebook', act: 'wbl-mark-next', action: 'Mark' });
  const reports = ungradedWorkshop(s, secs).length;
  if (reports) tasks.push({ level: 'soon', icon: 'clipboard-pen', title: `Grade ${reports} case reports`, why: 'Marked with the rubric in the gradebook', href: '#/instructor/gradebook/all', action: 'Grade' });
  for (const e of s.exams.filter(e => e.status === 'review' && e.coEditors.some(c => c.userId === me.id && !c.signedOff)))
    tasks.push({ level: 'soon', icon: 'badge-check', title: e.title, why: 'Exam paper waiting for your sign-off', href: `#/instructor/studio/${e.id}`, action: 'Review' });
  const risk = studentsInSections(s, secs).filter(u => atRisk(s, u.id).flag).length;
  if (risk) tasks.push({ level: 'catchup', icon: 'user-x', title: `${risk} students need support`, why: 'Low grade, low activity or missed assessments', href: '#/instructor/classes', action: 'View' });
  const order = { urgent: 0, soon: 1, catchup: 2, later: 3 };
  return tasks.sort((a, b) => order[a.level] - order[b.level]);
}
export function ungradedWorkshop(s, sections) {
  const out = [];
  for (const sec of sections) for (const a of assessmentsForSection(s, sec.id).filter(a => a.type === 'workshop' && assessmentStatus(s, a) === 'closed'))
    for (const sid of sec.studentIds) if (!rubricOf(s, sid, a.id)) out.push({ assessment: a, student: userById(s, sid), section: sec });
  return out;
}
export const pendingApprovals = (s, sections = s.sections) => s.lessons.filter(l => l.status === 'submitted' && sections.some(x => x.id === l.sectionId)).sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
export function weekGaps(s, sectionId) {
  const used = new Set(s.lessons.filter(l => l.sectionId === sectionId && l.status !== 'rejected').map(l => l.week));
  return Array.from({ length: s.term.weeks }, (_, i) => i + 1).filter(w => !used.has(w));
}
export function sectionStats(s, sectionId) {
  const sec = sectionById(s, sectionId);
  const grades = sec.studentIds.map(id => courseGrade(s, id).value).filter(v => v !== null);
  const avg = grades.length ? round1(grades.reduce((t, v) => t + v, 0) / grades.length) : null;
  const pass = grades.length ? Math.round((grades.filter(v => v >= s.course.gradingScheme.passMark).length / grades.length) * 100) : null;
  const eng = sec.studentIds.map(id => engagement(s, id)).filter(v => v !== null);
  return { avg, pass, engagement: eng.length ? round1(eng.reduce((t, v) => t + v, 0) / eng.length) : null, atRisk: sec.studentIds.filter(id => atRisk(s, id).flag).length, size: sec.studentIds.length };
}
export function termProgress(s, sections) {
  const planned = sections.length * s.term.weeks;
  const published = s.lessons.filter(l => l.status === 'published' && sections.some(x => x.id === l.sectionId)).length;
  return { planned, published, pct: Math.round((published / planned) * 100) };
}
export function activeLiveFor(s, sectionId) {
  const t = now(s);
  return s.liveSessions.find(x => x.sectionId === sectionId && x.active && new Date(x.expiresAt) > t);
}
export const notificationsFor = (s, userId) => s.notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
export const unreadCount = (s, userId) => s.notifications.filter(n => n.userId === userId && !n.readAt).length;

export const round1 = (v) => Math.round(v * 10) / 10;
export function fmtDate(d, opts = { day: 'numeric', month: 'short' }) { return new Date(d).toLocaleDateString('en-GB', opts); }
export function fmtDateTime(d) { return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
export function relTime(s, d) {
  const diff = (now(s) - new Date(d)) / 60000;
  if (diff < 1) return 'just now';
  if (diff < 60) return `${Math.round(diff)} min ago`;
  if (diff < 1440) return `${Math.round(diff / 60)} h ago`;
  return `${Math.round(diff / 1440)} d ago`;
}
export function countdown(s, d) {
  const ms = new Date(d) - now(s);
  if (ms <= 0) return 'closed';
  const days = Math.floor(ms / DAY), h = Math.floor((ms % DAY) / 3600000), m = Math.floor((ms % 3600000) / 60000);
  return days ? `${days}d ${h}h left` : `${h}h ${m}m left`;
}

/* ---------- library ---------- */
export const bookById = (s, id) => s.library.books.find(b => b.id === id);
export const extractById = (s, id) => s.library.extracts.find(x => x.id === id);
export const resourceById = (s, id) => s.resources.find(r => r.id === id);
export const RESOURCE_TYPES = ['case_study', 'group_project', 'activity', 'worksheet', 'practical'];

/* ---------- lesson bank & modules ---------- */
export const bankLessons = (s) => s.lessons.filter(l => l.status === 'template');
/** Bank lessons for a unit, the given author's first. */
export function bankLessonsFor(s, unitId, authorId = null) {
  return bankLessons(s).filter(l => l.unitId === unitId).sort((a, b) => (b.authorId === authorId) - (a.authorId === authorId));
}
export function moduleCurriculum(s, m) {
  const p = programById(s, m.programId);
  return (p.versions.find(v => v.id === m.versionId) || activeVersion(p)).unitIds;
}
export function validateModule(s, m) {
  const cur = moduleCurriculum(s, m);
  const issues = [];
  const empty = m.weeks.filter(w => !w.lessonId).map(w => w.week);
  if (empty.length) issues.push(`No lesson planned for week${empty.length > 1 ? 's' : ''} ${empty.join(', ')}`);
  const wrong = m.weeks.filter(w => w.lessonId && lessonById(s, w.lessonId)?.unitId !== cur[w.week - 1]).map(w => w.week);
  if (wrong.length) issues.push(`Lesson does not match the curriculum unit in week ${wrong.join(', ')}`);
  return issues;
}
export const moduleMinutes = (s, m) => m.weeks.reduce((t, w) => t + (w.lessonId ? lessonMinutes(lessonById(s, w.lessonId)) : 0) + w.extras.reduce((x, rid) => x + (resourceById(s, rid)?.minutes || 0), 0), 0);

/* ---------- exam studio ---------- */
export const examById = (s, id) => s.exams.find(x => x.id === id);
export const examQuestionIds = (ex) => ex.parts.flatMap(p => p.items.map(i => i.questionId));
export function examStats(s, ex) {
  const qs = examQuestionIds(ex).map(id => questionById(s, id)).filter(Boolean);
  const subjects = Object.fromEntries(Object.keys(s.subjects).map(k => [k, 0]));
  const bloom = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0 };
  for (const q of qs) { subjects[unitById(s, q.unitId).subject]++; bloom[q.bloomLevel] = (bloom[q.bloomLevel] || 0) + 1; }
  const points = ex.parts.reduce((t, p) => t + p.items.reduce((x, i) => x + (i.points || 1), 0), 0);
  return { count: qs.length, points, subjects, bloom };
}
/** Past answers to a bank question; `studentIds` limits it to one class. `picks` counts each option. */
export function questionStats(s, qid, studentIds = null) {
  let n = 0, c = 0;
  const q = questionById(s, qid);
  const only = studentIds && new Set(studentIds);
  const picks = q.options.map(() => 0);
  for (const t of s.attempts) if (qid in t.answers && (!only || only.has(t.studentId))) { n++; picks[t.answers[qid]] = (picks[t.answers[qid]] || 0) + 1; if (t.answers[qid] === q.answerIndex) c++; }
  return { n, pct: n ? Math.round((c / n) * 100) : null, picks };
}

/* ---------- teaching aids: item analysis, exam time, auto-fill ---------- */
/** Warnings a reviewer would raise about a multiple-choice item, from wording and past answers. */
export function itemFlags(s, q) {
  const st = questionStats(s, q.id); const f = [];
  if (st.n >= 5 && st.pct >= 90) f.push('Too easy');
  if (st.n >= 5 && st.pct <= 25) f.push('Too hard');
  if (st.n >= 8) { const dead = st.picks.filter((c, i) => i !== q.answerIndex && !c).length; if (dead) f.push(dead > 1 ? `${dead} options nobody picks` : 'An option nobody picks'); }
  if (/\b(NOT|EXCEPT|KHÔNG)\b/.test(q.stem)) f.push('Negative wording');
  if (q.options.some(o => /all of the above|none of the above|tất cả các ý|không có ý nào/i.test(o))) f.push('"All / none of the above"');
  return f;
}
const MIN_PER_LEVEL = { Remember: 0.75, Understand: 1.25, Apply: 2.5, Analyze: 3.5 };
/** Rough working time for a paper in minutes, by thinking level. */
export const examMinutes = (s, ex) => Math.round(examQuestionIds(ex).map(id => questionById(s, id)).filter(Boolean).reduce((t, q) => t + (MIN_PER_LEVEL[q.bloomLevel] || 1.5), 0));
/** Bank questions that best close the gap between a paper and its blueprint. */
export function autoFillPicks(s, ex) {
  const st = examStats(s, ex);
  let need = ex.targets.total - st.count;
  const used = new Set(examQuestionIds(ex));
  const lastTerm = new Set(s.exams.filter(e => e.id !== ex.id && ['locked', 'scheduled'].includes(e.status)).flatMap(examQuestionIds));
  const units = activeVersion(programById(s, ex.programId)).unitIds;
  const pool = s.questions.filter(q => units.includes(q.unitId) && !used.has(q.id));
  const subj = { ...st.subjects }, bloom = { ...st.bloom }, picks = [];
  while (need-- > 0) {
    let best = null, bestScore = -Infinity;
    for (const q of pool) {
      if (picks.includes(q)) continue;
      const sj = unitById(s, q.unitId).subject; const pct = questionStats(s, q.id).pct;
      const score = ((ex.targets.subjects[sj] || 0) - (subj[sj] || 0)) * 3 + ((ex.targets.bloom[q.bloomLevel] || 0) - (bloom[q.bloomLevel] || 0)) * 2
        - (lastTerm.has(q.id) ? 4 : 0) + (pct === null ? 0.5 : pct >= 40 && pct <= 85 ? 1 : -1) - itemFlags(s, q).length;
      if (score > bestScore) { best = q; bestScore = score; }
    }
    if (!best) break;
    picks.push(best);
    const sj = unitById(s, best.unitId).subject; subj[sj] = (subj[sj] || 0) + 1; bloom[best.bloomLevel] = (bloom[best.bloomLevel] || 0) + 1;
  }
  return picks.map(q => q.id);
}

/* ---------- teaching aids: lesson slides & quality ---------- */
/** Presentation slides: one per block; a page block gives one slide per row of tiles (4 columns wide). */
export function slidesOf(l) {
  const out = [];
  for (const b of l.blocks) {
    if (b.type !== 'page' || !b.layout?.length) { out.push({ b, tiles: null }); continue; }
    let row = [], w = 0;
    for (const t of b.layout) { if (w + t.w > 4 && row.length) { out.push({ b, tiles: row }); row = []; w = 0; } row.push(t); w += t.w; }
    out.push({ b, tiles: row });
  }
  return out;
}
/** Checklist a reviewer would apply to a lesson plan. */
export function lessonQuality(s, l) {
  const tiles = l.blocks.flatMap(b => b.type === 'page' ? b.layout || [] : []);
  const text = [l.title, l.summary, ...l.blocks.map(b => b.title), ...tiles.map(t => [t.title, t.body, t.caption, t.prompt].join(' '))].join(' ');
  const mins = lessonMinutes(l);
  let run = 0, longest = 0;
  for (const b of l.blocks) {
    const passive = ['theory', 'material'].includes(b.type) || (b.type === 'page' && !(b.layout || []).some(t => t.kind === 'check'));
    run = passive ? run + b.minutes : 0; longest = Math.max(longest, run);
  }
  return [
    { ok: (l.summary || '').trim().length >= 30, label: 'Learning outcome stated', hint: 'Write in "Summary for students" what they will be able to do.' },
    { ok: l.blocks.some(b => b.type === 'quiz') || tiles.some(t => t.kind === 'check'), label: 'Checks understanding', hint: 'Add a Practice check block or a Quick check on a page.' },
    { ok: mins >= 40 && mins <= 120, label: 'Length fits one class session', hint: mins < 40 ? 'Under 40 minutes — add an activity.' : 'Over 120 minutes — split it or shorten blocks.' },
    { ok: longest <= 30, label: 'Changes activity at least every 30 min', hint: `${longest} minutes of reading or lecture in a row — insert a discussion, calculation or check.` },
    { ok: /viet ?nam|việt nam|saigon|sài gòn|hà nội|ha noi|hcmc|hồ chí minh|ho chi minh|\bvnd\b/i.test(text) || l.blocks.some(b => ['case_study', 'resource'].includes(b.type)), label: 'Uses a real Vietnamese example', hint: 'Add a case or an example from a Vietnamese business.' },
    { ok: tiles.some(t => ['image', 'exhibit'].includes(t.kind)) || l.blocks.some(b => ['simulation', 'material'].includes(b.type)), label: 'Has a visual: image, data or simulation', hint: 'Add a page with an image or data table, or a simulation block.' },
  ];
}
/** Workbook exercises and bank questions a group of students mostly gets wrong (≥ 3 answers, < 60 % correct). */
export function weakSpots(s, studentIds, unitIds) {
  const out = [];
  for (const e of s.exercises.filter(e => unitIds.includes(e.unitId) && !e.caseId)) {
    const st = exerciseStats(s, e.id, studentIds);
    if (st.attempted >= 3 && st.pct !== null && st.pct < 60) out.push({ unitId: e.unitId, title: e.title || e.prompt, pct: st.pct, n: st.attempted, source: 'Workbook' });
  }
  for (const q of s.questions.filter(q => unitIds.includes(q.unitId))) {
    const st = questionStats(s, q.id, studentIds);
    if (st.n >= 3 && st.pct < 60) out.push({ unitId: q.unitId, title: q.stem, pct: st.pct, n: st.n, source: 'Quiz' });
  }
  return out.sort((a, b) => a.pct - b.pct).slice(0, 4);
}
/** Dean of the exam's programme (or Academic Affairs). Approves papers written by lecturers. */
export const examApprover = (s, user, ex) => user.role === 'provost' || (user.role === 'director' && isUnder(s, ex.programId, user.orgId));
/** Papers owned by a lecturer need a Dean's approval before they are locked and scheduled. */
export const needsDeanApproval = (s, ex) => userById(s, ex.ownerId)?.role === 'instructor';
export function examsForUser(s, user) {
  if (user.role === 'provost') return s.exams;
  if (user.role === 'director') return s.exams.filter(e => e.ownerId === user.id || isUnder(s, e.programId, user.orgId) || e.coEditors.some(c => c.userId === user.id));
  return s.exams.filter(e => e.coEditors.some(c => c.userId === user.id) || e.ownerId === user.id);
}

/* ---------- workbook & cases ---------- */
export const exerciseById = (s, id) => s.exercises.find(e => e.id === id);
export const unitExercises = (s, unitId) => s.exercises.filter(e => e.unitId === unitId && !e.caseId);
export const caseTasks = (s, caseId) => s.exercises.filter(e => e.caseId === caseId);
export const fullCases = (s) => s.resources.filter(r => r.type === 'case_study' && r.full);
/** Units whose week has started for a class (students can open their workbook). */
export function releasedUnits(s, sectionId) {
  return curriculumOfSection(s, sectionId).slice(0, s.clock.week);
}
export const tolOf = (e) => e.tol ?? Math.max(Math.abs(e.answer) * 0.005, 0.01);
/** Auto-grades a value. Returns { correct, fraction } or null for written answers. */
export function gradeExercise(e, value) {
  if (e.type === 'numeric') { const v = Number(String(value).replace(/,/g, '')); const ok = Number.isFinite(v) && Math.abs(v - e.answer) <= tolOf(e) + 1e-9; return { correct: ok, fraction: ok ? 1 : 0 }; }
  if (e.type === 'classify') { const right = e.items.filter(([, c], i) => Number(value?.[i]) === c).length; return { correct: right === e.items.length, fraction: right / e.items.length }; }
  if (e.type === 'mcq') { const ok = Number(value) === e.answerIndex; return { correct: ok, fraction: ok ? 1 : 0 }; }
  if (e.type === 'order') { const right = (value || []).filter((v, i) => v === i).length; return { correct: right === e.steps.length, fraction: right / e.steps.length }; }
  return null;
}
export const answerOf = (s, studentId, exerciseId) => s.workbookAnswers.find(a => a.studentId === studentId && a.exerciseId === exerciseId);
export function answerScore(e, a) {
  if (!a) return null;
  if (e.type === 'written') return a.status === 'graded' ? a.score / 4 : null;
  return a.correct ? 1 : 0;
}
export function workbookProgress(s, studentId, unitIds) {
  const ex = s.exercises.filter(e => unitIds.includes(e.unitId) && !e.caseId);
  const ans = ex.map(e => ({ e, a: answerOf(s, studentId, e.id) }));
  const done = ans.filter(x => x.a).length;
  const scored = ans.map(x => answerScore(x.e, x.a)).filter(v => v !== null);
  return { total: ex.length, done, pct: ex.length ? Math.round((done / ex.length) * 100) : 0, accuracy: scored.length ? Math.round((scored.reduce((t, v) => t + v, 0) / scored.length) * 100) : null, pending: ans.filter(x => x.a?.status === 'submitted').length };
}
/* ---------- four language skills ---------- */
/** Where a piece of content comes from. Coursebook content is licensed and read-only; UEH content is written and approved in-house. */
export const SOURCES = { book: ['Coursebook', 'book-marked'], ueh: ['UEH', 'landmark'] };
export const sourceOf = (x) => x.source || (x.bookId || x.extractId || x.type === 'material' ? 'book' : 'ueh');
/** Per unit: what each source provides. Used to see where the coursebook leaves gaps for UEH material to fill. */
export function sourceCoverage(s, unitIds) {
  return unitIds.map(id => {
    const ex = s.exercises.filter(e => e.unitId === id && !e.caseId);
    const skills = Object.fromEntries(Object.keys(SKILLS).map(k => [k, ex.filter(e => skillOf(e) === k).length]));
    return { unit: unitById(s, id), books: s.library.books.filter(b => b.unitIds.includes(id)), extracts: s.library.extracts.filter(x => x.unitId === id).length,
      exercises: ex.length, resources: s.resources.filter(r => r.unitId === id).length, skills, gaps: Object.keys(SKILLS).filter(k => !skills[k]) };
  });
}
export const SKILLS = { R: ['Reading', 'book-open'], L: ['Listening', 'headphones'], S: ['Speaking', 'mic'], W: ['Writing', 'pen-line'], U: ['Vocabulary & grammar', 'spell-check'] };
/** Explicit tag wins; otherwise: audio scenario = listening, recorded = speaking, written = writing, the rest = reading. */
export const skillOf = (e) => e.skill || (e.scenario?.audio ? 'L' : e.speak ? 'S' : e.type === 'written' ? 'W' : 'R');
/** Average score (%) per skill over the given students' answers to unit exercises; null when nothing scored yet. */
export function skillProfile(s, studentIds, unitIds) {
  const ids = new Set(studentIds); const ex = new Map(s.exercises.filter(e => !e.caseId && unitIds.includes(e.unitId)).map(e => [e.id, e]));
  const acc = Object.fromEntries(Object.keys(SKILLS).map(k => [k, [0, 0]]));
  for (const a of s.workbookAnswers) {
    const e = ex.get(a.exerciseId); if (!e || !ids.has(a.studentId)) continue;
    const v = answerScore(e, a); if (v === null) continue;
    const k = acc[skillOf(e)]; k[0] += v; k[1]++;
  }
  return Object.fromEntries(Object.entries(acc).map(([k, [t, n]]) => [k, n ? Math.round((t / n) * 100) : null]));
}
export function pendingMarking(s, sections, userId = null) {
  const ids = new Set(sections.flatMap(x => x.studentIds));
  return s.workbookAnswers.filter(a => a.status === 'submitted' && ids.has(a.studentId)
    && (!userId || teachesUnit(s, userId, userById(s, a.studentId).sectionId, exerciseById(s, a.exerciseId).unitId)))
    .sort((a, b) => new Date(a.at) - new Date(b.at));
}
export function exerciseStats(s, exerciseId, studentIds) {
  const e = exerciseById(s, exerciseId);
  const set = new Set(studentIds);
  const ans = s.workbookAnswers.filter(a => a.exerciseId === exerciseId && set.has(a.studentId));
  const scored = ans.map(a => answerScore(e, a)).filter(v => v !== null);
  return { attempted: ans.length, of: studentIds.length, pct: scored.length ? Math.round((scored.reduce((t, v) => t + v, 0) / scored.length) * 100) : null, firstTry: ans.length ? Math.round((ans.filter(a => a.correct && a.tries === 1).length / ans.length) * 100) : null, pending: ans.filter(a => a.status === 'submitted').length };
}

/* ---------- teaching staff (class × subject) ---------- */
/** Subjects taught in a class = subjects present in its curriculum, in a fixed order. */
export function subjectsOfSection(s, sectionId) {
  const c = subjectCounts(s, curriculumOfSection(s, sectionId));
  return Object.keys(s.subjects).filter(k => c[k] > 0);
}
/** Lecturer responsible for a subject in a class; unassigned subjects fall back to the class lead. */
export const subjectLecturer = (s, sectionId, subject) => sectionById(s, sectionId).assignments?.[subject] || sectionById(s, sectionId).leadId;
export function lecturerSubjects(s, userId, sectionId) {
  return subjectsOfSection(s, sectionId).filter(k => subjectLecturer(s, sectionId, k) === userId);
}
export const teachesUnit = (s, userId, sectionId, unitId) => lecturerSubjects(s, userId, sectionId).includes(unitById(s, unitId)?.subject);
/** Term load: units taught (one per teaching week) × contact hours per unit. */
export function lecturerLoad(s, userId) {
  const rows = [];
  for (const sec of s.sections) {
    const cur = curriculumOfSection(s, sec.id);
    for (const k of subjectsOfSection(s, sec.id)) {
      if (sec.assignments?.[k] !== userId) continue;
      const units = cur.filter(u => unitById(s, u).subject === k).length;
      rows.push({ sectionId: sec.id, subject: k, units });
    }
  }
  const units = rows.reduce((t, r) => t + r.units, 0);
  const hours = units * s.staffing.hoursPerUnit;
  return { rows, units, hours, classes: new Set(rows.map(r => r.sectionId)).size, over: hours > s.staffing.maxHours };
}
export function staffingGaps(s, sections) {
  return sections.flatMap(sec => subjectsOfSection(s, sec.id).filter(k => !sec.assignments?.[k]).map(k => ({ sec, subject: k })));
}

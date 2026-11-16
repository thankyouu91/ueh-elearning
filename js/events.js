// The single place where state changes. Every cross-role effect (notification, audit, toast) is produced here.
import { getState, commit, newId } from './store.js';
import * as S from './selectors.js';
import { toast } from './ui.js';
import { blocksForUnit } from './seed.js';

const LIB = ['BOOK_ADDED', 'BOOK_FILE_ATTACHED', 'EXTRACT_CREATED', 'EXTRACT_DELETED', 'RESOURCE_CREATED', 'CASE_LAYOUT_SAVED', 'EXERCISE_SAVED'];
const STUDIO_EDIT = ['EXAM_ITEMS_UPDATED', 'EXAM_COMMENTED', 'QUESTION_AUTHORED'];
const STUDIO_LECTURER = ['EXAM_CREATED', 'EXAM_SETTINGS_UPDATED', 'COEDITOR_INVITED', 'COEDITOR_REMOVED', 'EXAM_SENT_FOR_REVIEW', 'EXAM_REOPENED', 'EXAM_VERSION_SAVED', 'EXAM_SUBMITTED'];
const STUDIO_OWN = ['EXAM_CHANGES_REQUESTED', 'EXAM_CREATED', 'EXAM_SETTINGS_UPDATED', 'COEDITOR_INVITED', 'COEDITOR_REMOVED', 'EXAM_SENT_FOR_REVIEW', 'EXAM_REOPENED', 'EXAM_LOCKED', 'EXAM_SCHEDULED', 'EXAM_VERSION_SAVED'];
const ROLES = {
  student: ['CLASS_JOINED', 'ATTEMPT_SUBMITTED', 'ACTIVITY_LOGGED', 'LIVE_JOINED', 'LIVE_ANSWERED', 'WORKBOOK_ANSWERED'],
  instructor: ['CLASS_CREATED', 'CLASS_CANCELLED', 'LESSON_CREATED', 'LESSON_UPDATED', 'LESSON_DELETED', 'LESSON_SUBMITTED', 'LESSON_REOPENED', 'ASSESSMENT_CREATED', 'RUBRIC_GRADED', 'LIVE_SESSION_STARTED', 'LIVE_SESSION_ENDED', 'LIVE_SLIDE', ...LIB, 'MODULE_CREATED', 'MODULE_UPDATED', 'MODULE_SUBMITTED', ...STUDIO_EDIT, ...STUDIO_LECTURER, 'EXAM_SIGNED_OFF', 'WORKBOOK_GRADED'],
  director: ['CLASS_CANCELLED', 'LESSON_APPROVED', 'LESSON_CHANGES_REQUESTED', 'LESSON_REJECTED', 'TERM_BULK_APPROVED', 'ASSESSMENT_CREATED', 'CURRICULUM_SAVED', 'CURRICULUM_SUBMITTED', 'STAFF_ASSIGNED', ...LIB, 'MODULE_APPROVED', 'MODULE_CHANGES_REQUESTED', ...STUDIO_EDIT, ...STUDIO_OWN, 'EXAM_SIGNED_OFF'],
  provost: ['LESSON_APPROVED', 'LESSON_CHANGES_REQUESTED', 'LESSON_REJECTED', 'TERM_BULK_APPROVED', 'ASSESSMENT_CREATED', 'CURRICULUM_APPROVED', 'CURRICULUM_CHANGES_REQUESTED', ...LIB, 'MODULE_APPROVED', 'MODULE_CHANGES_REQUESTED', ...STUDIO_EDIT, ...STUDIO_OWN, 'EXAM_SIGNED_OFF'],
  admin: ['INTEGRATION_SYNCED', 'BOOK_ADDED', 'BOOK_FILE_ATTACHED'],
  any: ['SIGNED_IN', 'SIGNED_OUT', 'NOTIFICATION_READ', 'NOTIFICATIONS_ALL_READ', 'WEEK_ADVANCED', 'UI_SET'],
};
const SILENT = new Set(['LIVE_SLIDE', 'LIVE_ANSWERED', 'EXERCISE_SAVED', 'LESSON_UPDATED', 'ACTIVITY_LOGGED', 'NOTIFICATION_READ', 'NOTIFICATIONS_ALL_READ', 'UI_SET']);

class DomainError extends Error {}
const fail = (msg) => { throw new DomainError(msg); };

function notify(s, userIds, title, body, link, eventId) {
  const t = S.now(s).toISOString();
  for (const userId of new Set(userIds)) s.notifications.push({ id: newId('N'), userId, eventId, title, body, link, createdAt: t, readAt: null });
}
function audit(s, eventId, actorId, action, summary, entityType, entityId) {
  s.auditLog.push({ id: eventId, actorId, action, summary, entityType, entityId, at: S.now(s).toISOString() });
}
function ownLesson(s, actor, id) {
  const l = S.lessonById(s, id) || fail('Lesson not found');
  if (l.status === 'template') { if (l.authorId !== actor.id) fail('Only the author can edit this lesson — duplicate it to your bank first'); return l; }
  if (actor.role === 'instructor' && !S.sectionById(s, l.sectionId).instructorIds.includes(actor.id)) fail('You can only edit lessons for your own sections');
  return l;
}
const studentsOf = (s, sectionId) => S.sectionById(s, sectionId).studentIds;
const sectionCode = (s, id) => S.sectionById(s, id).code;

function publishLesson(s, l, eventId) {
  l.status = 'published';
  l.publishedAt = S.now(s).toISOString();
  l.history.push({ at: l.publishedAt, by: 'system', action: 'Published to students' });
  notify(s, studentsOf(s, l.sectionId), 'New lesson available', `"${l.title}" is now open in week ${l.week}.`, `#/student/lesson/${l.id}`, eventId);
}
function reviewable(s, actor, id) {
  const l = S.lessonById(s, id) || fail('Lesson not found');
  if (!S.canManageSection(s, actor, l.sectionId)) fail('This lesson belongs to another school');
  return l;
}
function approveOne(s, actor, l, eventId) {
  if (!S.canManageSection(s, actor, l.sectionId)) fail('This lesson belongs to another school');
  if (l.status !== 'submitted') fail(`"${l.title}" is not awaiting approval`);
  l.reviewedBy = actor.id;
  l.reviewNote = null;
  l.history.push({ at: S.now(s).toISOString(), by: actor.id, action: 'Approved' });
  if (l.week <= s.clock.week) publishLesson(s, l, eventId);
  else { l.status = 'scheduled'; l.history.push({ at: S.now(s).toISOString(), by: 'system', action: `Scheduled for week ${l.week}` }); }
  notify(s, [l.authorId], 'Lesson approved', `"${l.title}" was approved and is ${l.status === 'published' ? 'now live' : `scheduled for week ${l.week}`}.`, `#/instructor/builder/${l.id}`, eventId);
}

/* ---------- module & exam helpers ---------- */
function ownModule(s, a, id) {
  const m = s.modules.find(x => x.id === id) || fail('Module not found');
  if (m.ownerId !== a.id) fail('Only the module owner can change it');
  if (!['draft', 'changes_requested'].includes(m.status)) fail('This module is locked or waiting for approval');
  return m;
}
/** Creates class lessons from a locked module. Weeks already scheduled/published are kept. */
function instantiateModule(s, a, m, eventId) {
  let created = 0, kept = 0;
  for (const sid of m.sectionIds) {
    const cur = S.curriculumOfSection(s, sid);
    for (const w of m.weeks) {
      const tpl = S.lessonById(s, w.lessonId);
      if (!tpl || tpl.unitId !== cur[w.week - 1]) continue;
      const existing = s.lessons.find(l => l.sectionId === sid && l.week === w.week && l.status !== 'rejected');
      if (existing && ['published', 'scheduled'].includes(existing.status)) { kept++; continue; }
      if (existing) s.lessons = s.lessons.filter(l => l !== existing);
      const extras = w.extras.map(rid => s.resources.find(r => r.id === rid)).filter(Boolean)
        .map(r => ({ id: newId('B'), type: 'resource', resourceId: r.id, title: r.title, minutes: r.minutes, extra: true }));
      const t = S.now(s).toISOString();
      const l = { id: newId('L'), sectionId: sid, unitId: tpl.unitId, authorId: m.ownerId, week: w.week, title: tpl.title, summary: tpl.summary, status: 'scheduled',
        blocks: [...tpl.blocks.map(b => ({ ...b, id: newId('B') })), ...extras], moduleId: m.id, sourceLessonId: tpl.id,
        history: [{ at: t, by: m.ownerId, action: `Planned in module "${m.title}"` }, { at: t, by: a.id, action: 'Approved with module' }],
        submittedAt: t, reviewedBy: a.id, reviewNote: null, publishedAt: null };
      s.lessons.push(l);
      if (w.week <= s.clock.week) publishLesson(s, l, eventId);
      created++;
    }
  }
  return { created, kept };
}
function ownExam(s, a, id, { owner = false, anyStatus = false, approver = false } = {}) {
  const ex = s.exams.find(x => x.id === id) || fail('Exam not found');
  const isOwner = ex.ownerId === a.id || (a.role === 'provost') || (approver && S.examApprover(s, a, ex));
  const isCo = ex.coEditors.some(c => c.userId === a.id);
  if (owner ? !isOwner : !(isOwner || isCo)) fail(owner ? 'Only the exam owner can do that' : 'You are not an editor of this exam');
  if (!anyStatus && !['draft', 'review'].includes(ex.status)) fail('This paper is locked');
  return ex;
}
function touchExam(s, a, ex) { ex.lastEdit = { by: a.id, at: S.now(s).toISOString() }; }
function studioLink(s, userId, examId) { const u = S.userById(s, userId); return `#/${u.role}/studio/${examId}`; }

/** Flags newly at-risk students (and clears recovered ones). Notifies instructors + directors. */
export function checkAtRisk(s, { silent = false } = {}) {
  const prev = new Set(s.flags.atRisk);
  const nowFlagged = s.users.filter(u => u.role === 'student' && S.atRisk(s, u.id).flag).map(u => u.id);
  s.flags.atRisk = nowFlagged;
  if (silent) return;
  for (const id of nowFlagged.filter(id => !prev.has(id))) {
    const stu = S.userById(s, id);
    const reasons = S.atRisk(s, id).reasons.join('; ');
    const eventId = newId('E');
    audit(s, eventId, 'system', 'STUDENT_FLAGGED_AT_RISK', `${stu.name} flagged at risk: ${reasons}`, 'user', id);
    notify(s, [...S.instructorsOfSection(s, stu.sectionId), ...S.deansFor(s, stu.sectionId)], 'Student at risk', `${stu.name} (${sectionCode(s, stu.sectionId)}): ${reasons}.`, `#/instructor/gradebook`, eventId);
  }
}

const H = {
  SIGNED_IN(s, a, p) {
    s.session.userId = p.userId;
    const u = S.userById(s, p.userId);
    s.ui.orgFilter = null;
    return { audit: [`Signed in (${u.role})`, 'user', u.id], actorOverride: u.id };
  },
  SIGNED_OUT(s) { s.session.userId = null; return {}; },
  UI_SET(s, a, p) { Object.assign(s.ui, p); return {}; },
  NOTIFICATION_READ(s, a, p) { const n = s.notifications.find(n => n.id === p.id && n.userId === a.id); if (n && !n.readAt) n.readAt = S.now(s).toISOString(); return {}; },
  NOTIFICATIONS_ALL_READ(s, a) { const t = S.now(s).toISOString(); s.notifications.forEach(n => { if (n.userId === a.id && !n.readAt) n.readAt = t; }); return {}; },

  LESSON_CREATED(s, a, p) {
    if (p.bank) {
      const unit = S.unitById(s, p.unitId) || fail('Choose a unit');
      const src = p.copyFrom ? S.lessonById(s, p.copyFrom) : null;
      const l = { id: newId('T'), sectionId: null, unitId: unit.id, authorId: a.id, week: null, title: p.title?.trim() || src?.title || unit.title, summary: src?.summary || unit.summary, status: 'template', shared: true, blocks: src ? src.blocks.map(b => ({ ...b, id: newId('B') })) : (p.template ? blocksForUnit(unit) : []), history: [{ at: S.now(s).toISOString(), by: a.id, action: src ? `Duplicated from ${S.userById(s, src.authorId).name}'s lesson` : 'Created in lesson bank' }], submittedAt: null, reviewedBy: null, reviewNote: null, publishedAt: null, updatedAt: S.now(s).toISOString() };
      s.lessons.push(l);
      return { result: l.id, audit: [`Created bank lesson "${l.title}" (${unit.id})`, 'lesson', l.id], toast: src ? 'Copied to your lesson bank' : null };
    }
    const sec = S.sectionById(s, p.sectionId) || fail('Choose a section');
    if (!sec.instructorIds.includes(a.id)) fail('You do not teach this section');
    const week = Number(p.week) || null;
    const unit = week ? S.unitForWeek(s, sec.id, week) : null;
    if (unit && !S.teachesUnit(s, a.id, sec.id, unit.id)) fail(`You are not assigned to ${S.subjectLabel(s, unit.subject)} in ${sec.code}`);
    const l = { id: newId('L'), sectionId: sec.id, unitId: unit?.id || null, authorId: a.id, week, title: p.title?.trim() || unit?.title || 'Untitled lesson', summary: unit?.summary || '', status: 'draft', blocks: p.template && unit ? blocksForUnit(unit) : [], history: [{ at: S.now(s).toISOString(), by: a.id, action: 'Created draft' }], submittedAt: null, reviewedBy: null, reviewNote: null, publishedAt: null };
    s.lessons.push(l);
    return { result: l.id, audit: [`Created draft "${l.title}"`, 'lesson', l.id] };
  },
  LESSON_UPDATED(s, a, p) {
    const l = ownLesson(s, a, p.id);
    if (!['draft', 'changes_requested', 'template'].includes(l.status)) fail('Only drafts can be edited');
    if (l.status === 'template') l.updatedAt = S.now(s).toISOString();
    const allowed = ['title', 'summary', 'week', 'blocks'];
    for (const k of allowed) if (k in p.patch) l[k] = k === 'week' ? (Number(p.patch.week) || null) : p.patch[k];
    if ('week' in p.patch && l.sectionId) {
      const old = l.unitId ? S.unitById(s, l.unitId) : null;
      const u = l.week ? S.unitForWeek(s, l.sectionId, l.week) : null; l.unitId = u?.id || null;
      // Moving to another unit: swap the untouched ready-made blocks, title and summary for the new unit's.
      // Blocks the lecturer added or renamed are kept.
      if (old && u && old.id !== u.id) {
        const tpl = blocksForUnit(old);
        const isTpl = (b) => tpl.some(t => t.type === b.type && t.title === b.title && t.minutes === b.minutes);
        if (l.blocks.some(isTpl)) l.blocks = [...blocksForUnit(u), ...l.blocks.filter(b => !isTpl(b))];
        if (l.title === old.title) l.title = u.title;
        if (l.summary === old.summary) l.summary = u.summary;
      }
    }
    return {};
  },
  LESSON_DELETED(s, a, p) {
    const l = ownLesson(s, a, p.id);
    if (!['draft', 'template'].includes(l.status)) fail('Only drafts can be deleted');
    if (l.status === 'template' && s.modules.some(m => m.weeks.some(w => w.lessonId === l.id))) fail('This lesson is used in a module plan — remove it there first');
    s.lessons = s.lessons.filter(x => x.id !== l.id);
    return { audit: [`Deleted draft "${l.title}"`, 'lesson', l.id], toast: 'Draft deleted' };
  },
  LESSON_SUBMITTED(s, a, p, eventId) {
    const l = ownLesson(s, a, p.id);
    if (!['draft', 'changes_requested'].includes(l.status)) fail('This lesson has already been submitted');
    if (!l.title.trim()) fail('Add a title before submitting');
    if (!l.week) fail('Choose a teaching week before submitting');
    if (!l.blocks.length) fail('Add at least one block before submitting');
    const clash = s.lessons.find(x => x.id !== l.id && x.sectionId === l.sectionId && x.week === l.week && !['draft', 'rejected', 'changes_requested'].includes(x.status));
    if (clash) fail(`Week ${l.week} already has "${clash.title}"`);
    l.status = 'submitted';
    l.submittedAt = S.now(s).toISOString();
    l.history.push({ at: l.submittedAt, by: a.id, action: 'Submitted for approval' });
    notify(s, S.deansFor(s, l.sectionId), 'Lesson awaiting approval', `${a.name} submitted "${l.title}" (${sectionCode(s, l.sectionId)}, week ${l.week}).`, `#/director/approvals/${l.id}`, eventId);
    return { audit: [`Submitted "${l.title}" for approval`, 'lesson', l.id], toast: 'Submitted to the Dean for approval' };
  },
  LESSON_REOPENED(s, a, p) {
    const l = ownLesson(s, a, p.id);
    if (l.status !== 'rejected') fail('Only rejected lessons can be reopened');
    l.status = 'draft';
    l.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Reopened as draft' });
    return { audit: [`Reopened "${l.title}" as draft`, 'lesson', l.id], toast: 'Lesson reopened as a draft' };
  },
  LESSON_APPROVED(s, a, p, eventId) {
    const l = reviewable(s, a, p.id);
    approveOne(s, a, l, eventId);
    return { audit: [`Approved "${l.title}" (${l.status})`, 'lesson', l.id], toast: l.status === 'published' ? 'Approved and published to students' : `Approved — scheduled for week ${l.week}` };
  },
  LESSON_CHANGES_REQUESTED(s, a, p, eventId) {
    const l = reviewable(s, a, p.id);
    if (l.status !== 'submitted') fail('Lesson is not awaiting approval');
    if (!p.note?.trim()) fail('Write a note explaining the changes');
    l.status = 'changes_requested'; l.reviewedBy = a.id; l.reviewNote = p.note.trim();
    l.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Requested changes', note: l.reviewNote });
    notify(s, [l.authorId], 'Changes requested', `${a.name}: "${l.reviewNote}"`, `#/instructor/builder/${l.id}`, eventId);
    return { audit: [`Requested changes on "${l.title}"`, 'lesson', l.id], toast: 'Changes requested — instructor notified', tone: 'warn' };
  },
  LESSON_REJECTED(s, a, p, eventId) {
    const l = reviewable(s, a, p.id);
    if (l.status !== 'submitted') fail('Lesson is not awaiting approval');
    if (!p.note?.trim()) fail('Write a reason for rejecting');
    l.status = 'rejected'; l.reviewedBy = a.id; l.reviewNote = p.note.trim();
    l.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Rejected', note: l.reviewNote });
    notify(s, [l.authorId], 'Lesson rejected', `${a.name}: "${l.reviewNote}"`, `#/instructor/builder/${l.id}`, eventId);
    return { audit: [`Rejected "${l.title}"`, 'lesson', l.id], toast: 'Lesson rejected', tone: 'warn' };
  },
  TERM_BULK_APPROVED(s, a, p, eventId) {
    const list = p.ids.map(id => S.lessonById(s, id)).filter(l => l?.status === 'submitted');
    if (!list.length) fail('Nothing to approve');
    list.forEach(l => approveOne(s, a, l, eventId));
    return { audit: [`Bulk approved ${list.length} lessons`, 'term', s.term.id], toast: `${list.length} lessons approved` };
  },

  WEEK_ADVANCED(s, a, p, eventId) {
    if (s.clock.week >= s.term.weeks) fail('The term has ended');
    const before = Object.fromEntries(s.assessments.map(x => [x.id, S.assessmentStatus(s, x)]));
    s.clock.week += 1;
    s.clock.setAt = Date.now();
    const w = s.clock.week;
    const published = [];
    for (const l of s.lessons.filter(l => l.status === 'scheduled' && l.week <= w)) { publishLesson(s, l, eventId); published.push(l); }
    const opened = [], closed = [];
    for (const x of s.assessments) {
      const after = S.assessmentStatus(s, x);
      if (before[x.id] !== 'open' && after === 'open') opened.push(x);
      if (before[x.id] !== 'closed' && after === 'closed') closed.push(x);
    }
    for (const x of opened) for (const sid of x.sectionIds) {
      notify(s, studentsOf(s, sid), `${x.title} is open`, `Closes ${S.fmtDateTime(x.closesAt)}.${x.timeLimitMin ? ` Time limit ${x.timeLimitMin} min.` : ''}`, x.type === 'workshop' ? '#/student/assessments' : `#/student/exam/${x.id}`, eventId);
    }
    for (const x of closed) for (const sid of x.sectionIds) {
      const sec = S.sectionById(s, sid);
      const missing = sec.studentIds.filter(st => x.type === 'workshop' ? !S.rubricOf(s, st, x.id) : !S.attemptsOf(s, st, x.id).length).length;
      notify(s, sec.instructorIds, `${x.title} closed`, x.type === 'workshop' ? `${missing} students in ${sec.code} need a rubric grade.` : `${sec.studentIds.length - missing}/${sec.studentIds.length} students in ${sec.code} submitted.`, '#/instructor/gradebook', eventId);
    }
    for (const sec of s.sections) {
      const nextWeek = s.lessons.find(l => l.sectionId === sec.id && l.week === w + 1);
      if (w < s.term.weeks && (!nextWeek || nextWeek.status === 'draft' || nextWeek.status === 'changes_requested')) {
        notify(s, [S.subjectLecturer(s, sec.id, S.unitForWeek(s, sec.id, w + 1).subject)], 'Reminder: next week\'s lesson', nextWeek ? `"${nextWeek.title}" (week ${w + 1}) still needs to be submitted.` : `${sec.code} has no lesson planned for week ${w + 1}.`, '#/instructor/lessons', eventId);
      }
    }
    checkAtRisk(s);
    const parts = [`Week ${w} started`];
    if (published.length) parts.push(`${published.length} lesson${published.length > 1 ? 's' : ''} published`);
    if (opened.length) parts.push(`${opened.map(x => x.title).join(', ')} opened`);
    if (closed.length) parts.push(`${closed.length} assessment${closed.length > 1 ? 's' : ''} closed`);
    return { audit: [parts.join(' · '), 'term', s.term.id], toast: parts.join(' · '), actorOverride: 'system' };
  },

  ASSESSMENT_CREATED(s, a, p, eventId) {
    if (!p.title?.trim()) fail('Add a title');
    if (p.type !== 'workshop' && !p.questionIds?.length) fail('Select at least one question');
    const week = Number(p.week);
    if (!week || week < s.clock.week) fail('Choose the current or a future week');
    const mgr = ['director', 'provost'].includes(a.role);
    const sectionIds = S.sectionsForUser(s, a).map(x => x.id).filter(id => !p.sectionIds?.length || p.sectionIds.includes(id));
    if (!sectionIds.length) fail('Choose at least one class');
    const start = new Date(S.weekStartOf(s, week)); start.setHours(8, 0, 0, 0);
    const end = new Date(start); end.setDate(end.getDate() + (Number(p.durationDays) || 7) - 1); end.setHours(23, 59, 0, 0);
    const x = { id: newId('A'), courseId: s.course.id, sectionIds, type: p.type, title: p.title.trim(), unitId: p.unitId || null, questionIds: p.questionIds || [], opensAt: start.toISOString(), closesAt: end.toISOString(), timeLimitMin: Number(p.timeLimitMin) || null, maxAttempts: Number(p.maxAttempts) || 1, status: 'scheduled', origin: mgr ? 'standardized' : 'instructor', createdBy: a.id, rubric: p.type === 'workshop' ? ['Use of economic & business concepts', 'Analysis & calculation accuracy', 'Use of evidence & data', 'Written communication'] : undefined };
    s.assessments.push(x);
    if (mgr) notify(s, sectionIds.flatMap(id => S.instructorsOfSection(s, id)), 'Standardized assessment scheduled', `${x.title} opens in week ${week} for ${sectionIds.map(id => sectionCode(s, id)).join(', ')}.`, '#/instructor/assessments', eventId);
    if (S.assessmentStatus(s, x) === 'open') for (const sid of sectionIds) notify(s, studentsOf(s, sid), `${x.title} is open`, `Closes ${S.fmtDateTime(x.closesAt)}.`, `#/student/exam/${x.id}`, eventId);
    return { audit: [`Scheduled ${x.title} for week ${week}`, 'assessment', x.id], toast: `${x.title} scheduled for week ${week}` };
  },

  ATTEMPT_SUBMITTED(s, a, p, eventId) {
    const x = S.assessmentById(s, p.assessmentId) || fail('Assessment not found');
    if (!x.sectionIds.includes(a.sectionId)) fail('This assessment is not assigned to your class');
    if (S.assessmentStatus(s, x) !== 'open') fail('This assessment is not open');
    if (S.attemptsOf(s, a.id, x.id).length >= x.maxAttempts) fail('No attempts left');
    const { score, maxScore } = S.gradeAttempt(s, x, p.answers);
    const at = { id: newId('AT'), assessmentId: x.id, studentId: a.id, startedAt: p.startedAt, submittedAt: S.now(s).toISOString(), answers: p.answers, score, maxScore, status: 'graded' };
    s.attempts.push(at);
    const ten = S.round1((score / maxScore) * 10);
    notify(s, S.instructorsOfSection(s, a.sectionId), 'Submission auto-graded', `${a.name} scored ${ten.toFixed(1)}/10 on ${x.title}.`, '#/instructor/gradebook', eventId);
    notify(s, [a.id], 'Result available', `${x.title}: ${score}/${maxScore} correct (${ten.toFixed(1)}/10).`, `#/student/result/${at.id}`, eventId);
    checkAtRisk(s);
    return { result: at.id, audit: [`Submitted ${x.title}: ${score}/${maxScore} (auto-graded)`, 'attempt', at.id], toast: `Submitted — ${score}/${maxScore} correct` };
  },
  RUBRIC_GRADED(s, a, p, eventId) {
    const x = S.assessmentById(s, p.assessmentId) || fail('Assessment not found');
    const stu = S.userById(s, p.studentId);
    if (!S.sectionById(s, stu.sectionId).instructorIds.includes(a.id)) fail('Not your student');
    if (p.levels.some(l => !(l >= 1 && l <= 4))) fail('Choose a level for every criterion');
    const g = { id: `RG-${stu.id}-${x.id}`, assessmentId: x.id, studentId: stu.id, criteria: x.rubric.map((name, i) => ({ name, level: p.levels[i] })), gradedBy: a.id, gradedAt: S.now(s).toISOString() };
    s.rubricGrades = s.rubricGrades.filter(r => r.id !== g.id).concat(g);
    const v = S.assessmentResult(s, stu.id, x).value;
    notify(s, [stu.id], 'Workshop graded', `${x.title}: ${v.toFixed(1)}/10.`, '#/student/grades', eventId);
    checkAtRisk(s);
    return { audit: [`Graded ${x.title} for ${stu.name}: ${v.toFixed(1)}/10`, 'rubric', g.id], toast: `Saved — ${stu.name}: ${v.toFixed(1)}/10` };
  },
  ACTIVITY_LOGGED(s, a, p) {
    if (p.type === 'complete' && s.activity.some(x => x.studentId === a.id && x.blockId === p.blockId && x.type === 'complete')) return {};
    s.activity.push({ id: newId('ACT'), studentId: a.id, lessonId: p.lessonId || null, blockId: p.blockId || null, type: p.type, minutes: Math.max(1, Math.round(p.minutes || 1)), at: S.now(s).toISOString() });
    return {};
  },

  LIVE_SESSION_STARTED(s, a, p, eventId) {
    const l = ownLesson(s, a, p.lessonId);
    if (l.status !== 'published') fail('Only published lessons can be presented live');
    s.liveSessions.forEach(x => { if (x.sectionId === l.sectionId) x.active = false; });
    const pin = `UEH-${String(Math.floor(100 + Math.random() * 900))}`;
    const startedAt = S.now(s);
    const x = { id: newId('LV'), lessonId: l.id, sectionId: l.sectionId, pin, startedBy: a.id, startedAt: startedAt.toISOString(), startedReal: Date.now(), expiresAt: new Date(startedAt.getTime() + (Number(p.hours) || 2) * 3600000).toISOString(), active: true, joined: [], slide: 0, answers: {} };
    s.liveSessions.push(x);
    notify(s, studentsOf(s, l.sectionId), 'Live lesson started', `${a.name} is presenting "${l.title}". Join with PIN ${pin}.`, '#/student/live', eventId);
    return { result: x.id, audit: [`Started live session for "${l.title}" (PIN ${pin})`, 'live', x.id], toast: `Live session started — PIN ${pin}` };
  },
  LIVE_SESSION_ENDED(s, a, p) {
    const x = s.liveSessions.find(x => x.id === p.id) || fail('Session not found');
    x.active = false;
    const mins = Math.max(1, Math.round((Date.now() - x.startedReal) / 60000));
    for (const sid of x.joined) s.activity.push({ id: newId('ACT'), studentId: sid, lessonId: x.lessonId, blockId: null, type: 'live', minutes: mins, at: S.now(s).toISOString() });
    return { audit: [`Ended live session (${x.joined.length} joined, ${mins} min)`, 'live', x.id], toast: `Session ended — ${x.joined.length} students credited ${mins} min` };
  },
  LIVE_JOINED(s, a, p) {
    const x = S.activeLiveFor(s, a.sectionId);
    if (!x) fail('There is no live session for your class right now');
    if (x.pin.toUpperCase() !== String(p.pin || '').trim().toUpperCase()) fail('Incorrect PIN');
    if (!x.joined.includes(a.id)) x.joined.push(a.id);
    return { audit: [`Joined live session ${x.pin}`, 'live', x.id], toast: 'Joined the live lesson' };
  },
  LIVE_SLIDE(s, a, p) {
    const x = s.liveSessions.find(x => x.id === p.id && x.active) || fail('Session not found');
    if (x.startedBy !== a.id) fail('Only the presenting lecturer can change slides');
    const n = S.slidesOf(S.lessonById(s, x.lessonId)).length;
    x.slide = Math.max(0, Math.min(n - 1, Number(p.slide) || 0));
    return {};
  },
  LIVE_ANSWERED(s, a, p) {
    const x = S.activeLiveFor(s, a.sectionId);
    if (!x || !x.joined.includes(a.id)) fail('Join the live class first');
    const slide = S.slidesOf(S.lessonById(s, x.lessonId))[x.slide || 0];
    const t = slide?.tiles?.find(t => t.id === p.tileId && t.kind === 'check') || fail('This question is no longer on screen');
    const o = Number(p.o);
    if (!(o >= 0 && o < t.options.length)) fail('Choose an answer');
    ((x.answers ??= {})[t.id] ??= {})[a.id] = o;
    return { toast: 'Answer sent' };
  },

  CURRICULUM_SAVED(s, a, p) {
    const prog = S.programById(s, p.programId) || fail('Programme not found');
    if (!S.isUnder(s, prog.id, a.orgId)) fail('You can only edit programmes in your school');
    if (prog.proposal?.status === 'submitted') fail('This proposal is waiting for approval and cannot be edited');
    if (!Array.isArray(p.unitIds) || p.unitIds.length !== s.framework.capacity) fail('Invalid curriculum');
    const t = S.now(s).toISOString();
    const prev = prog.proposal;
    prog.proposal = { unitIds: [...p.unitIds], status: 'draft', note: prev?.note || null, rationale: p.rationale ?? prev?.rationale ?? '', updatedBy: a.id, updatedAt: t, submittedAt: null, history: [...(prev?.history || []), ...(prev ? [] : [{ at: t, by: a.id, action: 'Started draft' }])] };
    return { audit: [`Saved draft curriculum for ${S.orgById(s, prog.id).name}`, 'program', prog.id], toast: p.quiet ? null : 'Draft saved' };
  },
  CURRICULUM_SUBMITTED(s, a, p, eventId) {
    const prog = S.programById(s, p.programId) || fail('Programme not found');
    if (!S.isUnder(s, prog.id, a.orgId)) fail('You can only submit programmes in your school');
    const pr = prog.proposal || fail('Save a draft first');
    if (pr.status === 'submitted') fail('Already submitted');
    const issues = S.validateCurriculum(s, pr.unitIds);
    if (issues.length) fail(issues[0]);
    if (pr.unitIds.join() === S.activeVersion(prog).unitIds.join()) fail('No changes from the current curriculum');
    if (!pr.rationale?.trim()) fail('Explain the reason for the change');
    pr.status = 'submitted'; pr.submittedAt = S.now(s).toISOString();
    pr.history.push({ at: pr.submittedAt, by: a.id, action: 'Submitted for approval' });
    const name = S.orgById(s, prog.id).name;
    notify(s, S.provosts(s), 'Curriculum awaiting approval', `${a.name} submitted a revised ${name} curriculum for the next intake.`, `#/provost/curricula/${prog.id}`, eventId);
    return { audit: [`Submitted ${name} curriculum for approval`, 'program', prog.id], toast: 'Submitted to Academic Affairs' };
  },
  CURRICULUM_APPROVED(s, a, p, eventId) {
    const prog = S.programById(s, p.programId) || fail('Programme not found');
    const pr = prog.proposal;
    if (pr?.status !== 'submitted') fail('Nothing awaiting approval');
    const t = S.now(s).toISOString();
    const n = 50 + prog.versions.length;
    prog.versions.push({ id: `${prog.id}-K${n}`, label: `Intake K${n} · ${2026 + prog.versions.length}`, unitIds: [...pr.unitIds], status: 'approved', approvedBy: a.id, approvedAt: t, rationale: pr.rationale });
    pr.history.push({ at: t, by: a.id, action: 'Approved' });
    prog.proposal = null;
    const name = S.orgById(s, prog.id).name;
    const secs = s.sections.filter(x => x.programId === prog.id);
    notify(s, [pr.updatedBy, ...secs.flatMap(x => x.instructorIds)], 'Curriculum approved', `${name} curriculum approved for intake K${n}. Current classes are unaffected.`, '#/director/curriculum', eventId);
    return { audit: [`Approved ${name} curriculum for intake K${n}`, 'program', prog.id], toast: `Approved — applies from intake K${n}` };
  },
  CURRICULUM_CHANGES_REQUESTED(s, a, p, eventId) {
    const prog = S.programById(s, p.programId) || fail('Programme not found');
    const pr = prog.proposal;
    if (pr?.status !== 'submitted') fail('Nothing awaiting approval');
    if (!p.note?.trim()) fail('Write a note explaining the changes');
    pr.status = 'changes_requested'; pr.note = p.note.trim();
    pr.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Requested changes', note: pr.note });
    notify(s, [pr.updatedBy], 'Curriculum changes requested', `${a.name}: "${pr.note}"`, '#/director/curriculum', eventId);
    return { audit: [`Requested changes on ${S.orgById(s, prog.id).name} curriculum`, 'program', prog.id], toast: 'Changes requested — dean notified', tone: 'warn' };
  },
  /* ---------------- library ---------------- */
  BOOK_ADDED(s, a, p) {
    if (!p.title?.trim()) fail('Add a title');
    const b = { id: newId('BK'), title: p.title.trim(), subject: p.subject || 'ECO', unitIds: p.unitIds || [], description: p.description?.trim() || '', file: null, addedBy: a.id, addedAt: S.now(s).toISOString() };
    s.library.books.push(b);
    return { result: b.id, audit: [`Added "${b.title}" to the library`, 'book', b.id], toast: p.quiet ? null : 'Book added to the library' };
  },
  BOOK_FILE_ATTACHED(s, a, p) {
    const b = s.library.books.find(x => x.id === p.bookId) || fail('Book not found');
    b.file = { name: p.name, size: p.size, pages: p.pages, outline: p.outline || [], uploadedBy: a.id, uploadedAt: S.now(s).toISOString() };
    return { audit: [`Uploaded PDF for "${b.title}" (${p.pages} pages)`, 'book', b.id], toast: `Uploaded — ${p.pages} pages ready to read` };
  },
  EXTRACT_CREATED(s, a, p) {
    const b = s.library.books.find(x => x.id === p.bookId) || fail('Book not found');
    const from = Number(p.fromPage), to = Number(p.toPage);
    if (!p.title?.trim()) fail('Give the extract a title');
    if (!(from >= 1 && to >= from)) fail('Check the page range');
    if (b.file?.pages && to > b.file.pages) fail(`The book has ${b.file.pages} pages`);
    const x = { id: newId('EXT'), bookId: b.id, title: p.title.trim(), fromPage: from, toPage: to, unitId: p.unitId || null, note: p.note?.trim() || '', createdBy: a.id, createdAt: S.now(s).toISOString() };
    s.library.extracts.push(x);
    return { result: x.id, audit: [`Extracted "${x.title}" (pp. ${from}–${to}) from "${b.title}"`, 'extract', x.id], toast: `Extract saved — pages ${from}–${to}` };
  },
  EXTRACT_DELETED(s, a, p) {
    const x = s.library.extracts.find(e => e.id === p.id) || fail('Extract not found');
    if (x.createdBy !== a.id && a.role === 'instructor') fail('Only the person who made this extract can delete it');
    if (s.lessons.some(l => l.blocks.some(b => b.extractId === x.id))) fail('This extract is used in a lesson');
    s.library.extracts = s.library.extracts.filter(e => e.id !== x.id);
    return { audit: [`Deleted extract "${x.title}"`, 'extract', x.id], toast: 'Extract deleted' };
  },
  RESOURCE_CREATED(s, a, p) {
    if (!p.title?.trim()) fail('Add a title');
    if (!S.RESOURCE_TYPES.includes(p.type)) fail('Choose a type');
    const r = { id: p.id || newId('R'), type: p.type, unitId: p.unitId || null, title: p.title.trim(), minutes: Number(p.minutes) || 30, body: p.body?.trim() || '', file: p.file || null, createdBy: a.id, createdAt: S.now(s).toISOString() };
    s.resources.push(r);
    return { result: r.id, audit: [`Added ${r.type.replace('_', ' ')} "${r.title}" to the library`, 'resource', r.id], toast: 'Added to the library' };
  },

  /* ---------------- modules (học phần) ---------------- */
  MODULE_CREATED(s, a, p) {
    const prog = S.programById(s, p.programId) || fail('Choose a programme');
    const v = S.activeVersion(prog);
    const m = { id: newId('MOD'), title: p.title?.trim() || `${S.orgById(s, prog.id).name} · Year 1`, programId: prog.id, versionId: v.id, ownerId: a.id,
      weeks: v.unitIds.map((u, i) => ({ week: i + 1, lessonId: p.autofill ? (S.bankLessonsFor(s, u, a.id)[0]?.id || null) : null, extras: [] })),
      sectionIds: [], status: 'draft', note: null, updatedAt: S.now(s).toISOString(), history: [{ at: S.now(s).toISOString(), by: a.id, action: 'Created module plan' }] };
    s.modules.push(m);
    return { result: m.id, audit: [`Created module plan "${m.title}"`, 'module', m.id], toast: 'Module plan created' };
  },
  MODULE_UPDATED(s, a, p) {
    const m = ownModule(s, a, p.id);
    if (p.weeks) {
      const cur = S.moduleCurriculum(s, m);
      for (const w of p.weeks) {
        if (w.lessonId) { const l = S.lessonById(s, w.lessonId); if (!l || l.status !== 'template') fail('Only lesson-bank lessons can be planned'); if (l.unitId !== cur[w.week - 1]) fail(`Week ${w.week} is ${cur[w.week - 1]} — that lesson is for ${l.unitId}`); }
      }
      m.weeks = p.weeks;
    }
    if ('title' in p) m.title = p.title;
    m.updatedAt = S.now(s).toISOString();
    return { audit: p.summary ? [p.summary, 'module', m.id] : null };
  },
  MODULE_SUBMITTED(s, a, p, eventId) {
    const m = ownModule(s, a, p.id);
    const issues = S.validateModule(s, m);
    if (issues.length) fail(issues[0]);
    const secs = (p.sectionIds || []).map(id => S.sectionById(s, id)).filter(x => x && x.programId === m.programId);
    if (!secs.length) fail('Choose at least one class');
    m.sectionIds = secs.map(x => x.id);
    m.status = 'submitted'; m.note = null;
    m.history.push({ at: S.now(s).toISOString(), by: a.id, action: `Finalised for ${secs.map(x => x.code).join(', ')} and submitted` });
    const deans = [...new Set(secs.flatMap(x => S.deansFor(s, x.id)))];
    notify(s, deans, 'Module awaiting approval', `${a.name} finalised "${m.title}" for ${secs.map(x => x.code).join(', ')}.`, `#/director/approvals/${m.id}`, eventId);
    return { audit: [`Submitted module "${m.title}" for ${secs.map(x => x.code).join(', ')}`, 'module', m.id], toast: 'Module submitted to the Dean' };
  },
  MODULE_APPROVED(s, a, p, eventId) {
    const m = s.modules.find(x => x.id === p.id) || fail('Module not found');
    if (m.status !== 'submitted') fail('This module is not awaiting approval');
    if (!m.sectionIds.every(id => S.canManageSection(s, a, id))) fail('This module includes classes outside your school');
    const r = instantiateModule(s, a, m, eventId);
    m.status = 'locked';
    m.history.push({ at: S.now(s).toISOString(), by: a.id, action: `Approved and locked · ${r.created} lessons created, ${r.kept} already running kept` });
    notify(s, [m.ownerId, ...m.sectionIds.flatMap(id => S.instructorsOfSection(s, id))], 'Module approved & locked', `"${m.title}" is locked for ${m.sectionIds.map(id => S.sectionById(s, id).code).join(', ')}. ${r.created} lessons scheduled.`, '#/instructor/modules', eventId);
    checkAtRisk(s);
    return { audit: [`Approved module "${m.title}" (${r.created} lessons scheduled)`, 'module', m.id], toast: `Locked — ${r.created} lessons scheduled, ${r.kept} running lessons kept` };
  },
  MODULE_CHANGES_REQUESTED(s, a, p, eventId) {
    const m = s.modules.find(x => x.id === p.id) || fail('Module not found');
    if (m.status !== 'submitted') fail('This module is not awaiting approval');
    if (!p.note?.trim()) fail('Write a note explaining the changes');
    m.status = 'changes_requested'; m.note = p.note.trim();
    m.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Requested changes', note: m.note });
    notify(s, [m.ownerId], 'Module changes requested', `${a.name}: "${m.note}"`, `#/instructor/modules/${m.id}`, eventId);
    return { audit: [`Requested changes on module "${m.title}"`, 'module', m.id], toast: 'Changes requested', tone: 'warn' };
  },

  /* ---------------- exam studio ---------------- */
  EXAM_CREATED(s, a, p) {
    const prog = S.programById(s, p.programId) || fail('Choose a programme');
    if (a.role === 'director' && !S.isUnder(s, prog.id, a.orgId)) fail('You can only set exams for programmes in your school');
    const mine = s.sections.filter(x => x.programId === prog.id && (a.role !== 'instructor' || x.instructorIds.includes(a.id)));
    if (!mine.length) fail('You do not teach a class in this programme');
    if (!p.title?.trim()) fail('Add a title');
    const counts = S.subjectCounts(s, S.activeVersion(prog).unitIds);
    const total = Number(p.total) || 16;
    const subjects = Object.fromEntries(Object.entries(counts).map(([k, n]) => [k, Math.round((n / 16) * total)]));
    const ex = { id: newId('EX'), title: p.title.trim(), type: p.type || 'final', programId: prog.id, sectionIds: mine.map(x => x.id), ownerId: a.id, coEditors: [], durationMin: Number(p.durationMin) || 45, status: 'draft',
      targets: { total, subjects, bloom: { Remember: Math.round(total * 0.3), Understand: Math.round(total * 0.3), Apply: Math.round(total * 0.25), Analyze: total - Math.round(total * 0.3) * 2 - Math.round(total * 0.25) } },
      parts: [{ id: newId('P'), title: 'Part A', instructions: 'Choose the best answer.', items: [] }], comments: [], versions: [], lastEdit: { by: a.id, at: S.now(s).toISOString() }, assessmentId: null,
      history: [{ at: S.now(s).toISOString(), by: a.id, action: 'Created exam' }] };
    s.exams.push(ex);
    return { result: ex.id, audit: [`Created exam "${ex.title}"`, 'exam', ex.id], toast: 'Exam created' };
  },
  EXAM_SETTINGS_UPDATED(s, a, p) {
    const ex = ownExam(s, a, p.id, { owner: true });
    if (a.role === 'instructor' && (p.patch.sectionIds || []).some(id => !S.sectionById(s, id)?.instructorIds.includes(a.id))) fail('You can only choose classes you teach');
    for (const k of ['title', 'durationMin', 'sectionIds', 'targets']) if (k in p.patch) ex[k] = p.patch[k];
    touchExam(s, a, ex);
    return { audit: ['Updated exam settings', 'exam', ex.id], toast: 'Settings saved' };
  },
  EXAM_ITEMS_UPDATED(s, a, p) {
    const ex = ownExam(s, a, p.id);
    ex.parts = p.parts;
    const reset = ex.status === 'review' && ex.coEditors.some(c => c.signedOff);
    if (reset) { ex.coEditors.forEach(c => { c.signedOff = false; }); ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Edited during review — sign-offs reset' }); }
    touchExam(s, a, ex);
    return { audit: [p.summary || 'Edited exam paper', 'exam', ex.id], toast: reset ? 'Saved — co-editor sign-offs were reset' : null, tone: 'warn' };
  },
  QUESTION_AUTHORED(s, a, p) {
    if (!p.stem?.trim()) fail('Write the question');
    const opts = (p.options || []).map(o => String(o || '').trim());
    if (opts.length !== 4 || opts.some(o => !o)) fail('Write all four options');
    const ai = Number(p.answerIndex);
    if (!(ai >= 0 && ai <= 3)) fail('Mark the correct answer');
    const u = S.unitById(s, p.unitId) || fail('Choose a unit');
    const q = { id: newId('Q'), unitId: u.id, stem: p.stem.trim(), options: opts, answerIndex: ai, competencyTag: S.subjectLabel(s, u.subject), bloomLevel: p.bloom || 'Understand', points: 1, authorId: a.id, createdAt: S.now(s).toISOString() };
    s.questions.push(q);
    return { result: q.id, audit: [`Wrote a new ${u.id} question for the bank`, 'question', q.id] };
  },
  COEDITOR_INVITED(s, a, p, eventId) {
    const ex = ownExam(s, a, p.id, { owner: true });
    const ids = (p.userIds || []).filter(id => id !== ex.ownerId && !ex.coEditors.some(c => c.userId === id));
    if (!ids.length) fail('Choose at least one person');
    ids.forEach(id => ex.coEditors.push({ userId: id, signedOff: false, invitedAt: S.now(s).toISOString() }));
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: `Invited ${ids.map(id => S.userById(s, id).name).join(', ')}` });
    ids.forEach(id => notify(s, [id], 'Invited to co-edit an exam', `${a.name} invited you to co-edit "${ex.title}".`, studioLink(s, id, ex.id), eventId));
    return { audit: [`Invited ${ids.length} co-editor(s) to "${ex.title}"`, 'exam', ex.id], toast: `Invitation sent to ${ids.length}` };
  },
  COEDITOR_REMOVED(s, a, p) {
    const ex = ownExam(s, a, p.id, { owner: true });
    ex.coEditors = ex.coEditors.filter(c => c.userId !== p.userId);
    return { audit: [`Removed ${S.userById(s, p.userId).name} from "${ex.title}"`, 'exam', ex.id], toast: 'Co-editor removed' };
  },
  EXAM_COMMENTED(s, a, p, eventId) {
    const ex = ownExam(s, a, p.id, { anyStatus: true });
    if (!p.text?.trim()) fail('Write a comment');
    ex.comments.push({ id: newId('CM'), userId: a.id, at: S.now(s).toISOString(), text: p.text.trim() });
    const others = [ex.ownerId, ...ex.coEditors.map(c => c.userId)].filter(id => id !== a.id);
    others.forEach(id => notify(s, [id], `Comment on "${ex.title}"`, `${a.name}: "${p.text.trim().slice(0, 120)}"`, studioLink(s, id, ex.id), eventId));
    return {};
  },
  EXAM_SENT_FOR_REVIEW(s, a, p, eventId) {
    const ex = ownExam(s, a, p.id, { owner: true });
    if (!S.examQuestionIds(ex).length) fail('Add questions first');
    ex.status = 'review'; ex.coEditors.forEach(c => { c.signedOff = false; });
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Sent for review' });
    ex.coEditors.forEach(c => notify(s, [c.userId], 'Exam ready for your sign-off', `${a.name} sent "${ex.title}" for review.`, studioLink(s, c.userId, ex.id), eventId));
    return { audit: [`Sent "${ex.title}" for review`, 'exam', ex.id], toast: ex.coEditors.length ? 'Sent to co-editors for sign-off' : 'Marked ready for review' };
  },
  EXAM_SIGNED_OFF(s, a, p, eventId) {
    const ex = s.exams.find(x => x.id === p.id) || fail('Exam not found');
    const c = ex.coEditors.find(x => x.userId === a.id) || fail('You are not a co-editor of this exam');
    if (ex.status !== 'review') fail('The exam is not in review');
    c.signedOff = true;
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Signed off' });
    notify(s, [ex.ownerId], 'Co-editor signed off', `${a.name} signed off "${ex.title}".`, studioLink(s, ex.ownerId, ex.id), eventId);
    return { audit: [`Signed off "${ex.title}"`, 'exam', ex.id], toast: 'Signed off' };
  },
  EXAM_SUBMITTED(s, a, p, eventId) {
    const ex = ownExam(s, a, p.id, { owner: true });
    if (!S.needsDeanApproval(s, ex)) fail('This paper does not need approval');
    if (!S.examQuestionIds(ex).length) fail('Add questions first');
    ex.status = 'submitted'; ex.reviewNote = null;
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Submitted to the Dean for approval' });
    const deans = [...new Set(ex.sectionIds.flatMap(id => S.deansFor(s, id)))];
    deans.forEach(id => notify(s, [id], 'Exam paper awaiting approval', `${a.name} submitted "${ex.title}" (${S.examQuestionIds(ex).length} questions).`, studioLink(s, id, ex.id), eventId));
    return { audit: [`Submitted "${ex.title}" for approval`, 'exam', ex.id], toast: 'Sent to the Dean for approval' };
  },
  EXAM_CHANGES_REQUESTED(s, a, p, eventId) {
    const ex = s.exams.find(x => x.id === p.id) || fail('Exam not found');
    if (!S.examApprover(s, a, ex)) fail('Only the Dean of this programme can review this paper');
    if (ex.status !== 'submitted') fail('This paper is not waiting for approval');
    if (!p.note?.trim()) fail('Explain what needs to change');
    ex.status = 'draft'; ex.reviewNote = p.note.trim();
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Requested changes', note: ex.reviewNote });
    notify(s, [ex.ownerId], 'Exam changes requested', `${a.name}: "${ex.reviewNote}"`, studioLink(s, ex.ownerId, ex.id), eventId);
    return { audit: [`Requested changes on "${ex.title}"`, 'exam', ex.id], toast: 'Changes requested', tone: 'warn' };
  },
  EXAM_REOPENED(s, a, p) {
    const ex = ownExam(s, a, p.id, { owner: true, anyStatus: true, approver: true });
    if (!['review', 'locked'].includes(ex.status)) fail('Only exams in review or locked can be reopened');
    if (ex.status === 'locked' && S.needsDeanApproval(s, ex) && !S.examApprover(s, a, ex)) fail('Only the Dean can unlock an approved paper');
    ex.status = 'draft';
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: 'Reopened for editing' });
    return { audit: [`Reopened "${ex.title}"`, 'exam', ex.id], toast: 'Reopened for editing' };
  },
  EXAM_LOCKED(s, a, p, eventId) {
    const dean = S.needsDeanApproval(s, S.examById(s, p.id) || fail('Exam not found'));
    const ex = dean ? s.exams.find(x => x.id === p.id) : ownExam(s, a, p.id, { owner: true });
    if (dean && !S.examApprover(s, a, ex)) fail('Only the Dean of this programme can approve this paper');
    if (dean && ex.status !== 'submitted') fail('The lecturer has not submitted this paper yet');
    if (!S.examQuestionIds(ex).length) fail('Add questions first');
    ex.status = 'locked'; ex.reviewNote = null;
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: `${dean ? 'Approved and locked' : 'Locked'} (${S.examQuestionIds(ex).length} questions)` });
    if (dean) notify(s, [ex.ownerId], 'Exam paper approved', `${a.name} approved "${ex.title}". It can now be scheduled.`, studioLink(s, ex.ownerId, ex.id), eventId);
    return { audit: [`${dean ? 'Approved and locked' : 'Locked'} "${ex.title}"`, 'exam', ex.id], toast: dean ? 'Paper approved and locked' : 'Paper locked — ready to schedule' };
  },
  EXAM_VERSION_SAVED(s, a, p) {
    const ex = ownExam(s, a, p.id, { owner: true, anyStatus: true });
    ex.versions.push({ id: newId('V'), at: S.now(s).toISOString(), by: a.id, label: p.label?.trim() || `Version ${ex.versions.length + 1}`, parts: JSON.parse(JSON.stringify(ex.parts)) });
    return { audit: [`Saved a version of "${ex.title}"`, 'exam', ex.id], toast: 'Version saved' };
  },
  EXAM_SCHEDULED(s, a, p, eventId) {
    const ex = ownExam(s, a, p.id, { owner: true, anyStatus: true, approver: true });
    if (S.needsDeanApproval(s, ex) && !S.examApprover(s, a, ex)) fail('The Dean schedules papers written by lecturers');
    if (ex.status !== 'locked') fail('Lock the paper before scheduling');
    const week = Number(p.week);
    if (!week || week < s.clock.week) fail('Choose the current or a future week');
    if (!ex.sectionIds.length) fail('Choose at least one class');
    const start = new Date(S.weekStartOf(s, week)); start.setHours(8, 0, 0, 0);
    const end = new Date(start); end.setDate(end.getDate() + (Number(p.durationDays) || 5) - 1); end.setHours(23, 59, 0, 0);
    const x = { id: newId('A'), courseId: s.course.id, programId: ex.programId, sectionIds: [...ex.sectionIds], type: ex.type, title: ex.title, unitId: null, questionIds: S.examQuestionIds(ex),
      opensAt: start.toISOString(), closesAt: end.toISOString(), timeLimitMin: ex.durationMin, maxAttempts: 1, status: 'scheduled', origin: 'standardized', createdBy: a.id, examId: ex.id };
    s.assessments.push(x);
    ex.status = 'scheduled'; ex.assessmentId = x.id;
    ex.history.push({ at: S.now(s).toISOString(), by: a.id, action: `Scheduled for week ${week}` });
    notify(s, ex.sectionIds.flatMap(id => S.instructorsOfSection(s, id)), 'Exam scheduled', `${ex.title} opens in week ${week} for ${ex.sectionIds.map(id => S.sectionById(s, id).code).join(', ')}.`, '#/instructor/assessments', eventId);
    if (S.assessmentStatus(s, x) === 'open') ex.sectionIds.forEach(id => notify(s, studentsOf(s, id), `${x.title} is open`, `Closes ${S.fmtDateTime(x.closesAt)}.`, `#/student/exam/${x.id}`, eventId));
    return { audit: [`Scheduled "${ex.title}" for week ${week}`, 'exam', ex.id], toast: `Scheduled for week ${week}` };
  },

  CASE_LAYOUT_SAVED(s, a, p) {
    const c = S.resourceById(s, p.id) || fail('Case not found');
    if (!Array.isArray(p.layout) || !p.layout.length) fail('Add at least one tile');
    const kinds = new Set(['text', 'image', 'audio', 'exhibit', 'question']);
    if (p.layout.some(t => !kinds.has(t.kind) || !(t.w >= 1 && t.w <= 4) || !(t.h >= 1 && t.h <= 2))) fail('Invalid tile');
    if (p.layout.some(t => t.kind === 'question' && !S.exerciseById(s, t.exerciseId))) fail('A question tile is missing its question');
    c.layout = p.layout; c.full = true; c.editedBy = a.id; c.editedAt = S.now(s).toISOString();
    if (!c.notes) c.notes = { timing: [], points: [], extension: '' };
    return { audit: [`Edited the layout of "${c.title}" (${p.layout.length} tiles)`, 'resource', c.id], toast: 'Case saved' };
  },
  EXERCISE_SAVED(s, a, p) {
    const e = p.exercise || {};
    if (!['mcq', 'written', 'numeric'].includes(e.type)) fail('Unknown question type');
    if (!e.prompt?.trim()) fail('Write the question');
    if (e.type === 'mcq') { if (e.options?.length !== 4 || e.options.some(o => !String(o).trim())) fail('Write all four options'); if (!(e.answerIndex >= 0 && e.answerIndex <= 3)) fail('Mark the correct option'); }
    if (e.type === 'numeric' && !Number.isFinite(Number(e.answer))) fail('Enter the correct numeric answer');
    if (e.type === 'written' && !e.model?.trim()) fail('Write a model answer');
    const existing = e.id && S.exerciseById(s, e.id);
    const clean = { ...e, prompt: e.prompt.trim(), title: e.title?.trim() || (e.type === 'mcq' ? 'Check' : e.type === 'numeric' ? 'Calculate' : 'Written task'),
      marking: e.type === 'written' ? (e.marking?.length ? e.marking : ['Answers the question directly', 'Uses concepts from the unit', 'Supports the answer with case data']) : e.marking, words: e.words || 120 };
    if (existing) Object.assign(existing, clean); else s.exercises.push({ ...clean, id: newId('CQ') });
    return { result: existing?.id || s.exercises[s.exercises.length - 1].id };
  },
  CLASS_CREATED(s, a, p, eventId) {
    const prog = S.programById(s, p.programId) || fail('Choose a programme');
    const intake = String(p.intake || '').trim().toUpperCase();
    if (!/^K\d{2}$/.test(intake)) fail('Intake looks like K50');
    const prefix = `${prog.code}-${intake}-`;
    const n = Math.max(0, ...s.sections.filter(x => x.code.startsWith(prefix)).map(x => Number(x.code.slice(prefix.length)) || 0)) + 1;
    const sec = { id: newId('S'), programId: prog.id, versionId: S.activeVersion(prog).id, code: prefix + String(n).padStart(2, '0'), leadId: a.id, assignments: {}, instructorIds: [a.id], studentIds: [],
      joinCode: S.newJoinCode(s), createdBy: a.id, createdAt: S.now(s).toISOString(), note: String(p.note || '').trim() };
    s.sections.push(sec);
    notify(s, S.deansFor(s, sec.id), 'New class opened', `${a.name} opened ${sec.code} (${S.orgById(s, prog.id).name}). Assign lecturers to its subjects.`, '#/director/staff', eventId);
    return { result: sec.id, audit: [`Opened class ${sec.code} (code ${sec.joinCode})`, 'section', sec.id], toast: `Class ${sec.code} created` };
  },
  CLASS_JOINED(s, a, p, eventId) {
    const sec = S.classByCode(s, p.code) || fail('No class has this code. Check it with your lecturer.');
    if (a.sectionId === sec.id) fail(`You are already in ${sec.code}`);
    const from = S.sectionById(s, a.sectionId);
    if (from) from.studentIds = from.studentIds.filter(id => id !== a.id);
    sec.studentIds.push(a.id); a.sectionId = sec.id;
    notify(s, [sec.leadId], 'Student joined your class', `${a.name} joined ${sec.code} with the class code.`, '#/instructor/dashboard', eventId);
    return { result: sec.id, audit: [`Joined ${sec.code}${from ? ` (left ${from.code})` : ''}`, 'section', sec.id], toast: `You are now in ${sec.code}` };
  },
  CLASS_CANCELLED(s, a, p, eventId) {
    const sec = S.sectionById(s, p.id) || fail('Class not found');
    if (sec.createdBy !== a.id && !S.canManageSection(s, a, sec.id)) fail('Only the lecturer who opened the class or the Dean can cancel it');
    if (s.lessons.some(l => l.sectionId === sec.id && ['submitted', 'approved', 'scheduled', 'published'].includes(l.status))) fail('This class already has approved lessons — it cannot be cancelled');
    if (s.attempts.some(t => sec.studentIds.includes(t.studentId) && S.assessmentById(s, t.assessmentId)?.sectionIds.includes(sec.id))) fail('Students in this class have already taken an assessment — it cannot be cancelled');
    const target = p.targetId ? S.sectionById(s, p.targetId) || fail('Choose the class to move students to') : null;
    if (!target && sec.studentIds.length) fail('Choose the class to move students to');
    if (target?.id === sec.id) fail('Choose a different class');
    for (const id of sec.studentIds) { S.userById(s, id).sectionId = target.id; target.studentIds.push(id); }
    const code = S.joinCodeOf(sec);
    s.classRedirects = s.classRedirects || {};
    if (target) { s.classRedirects[code] = target.id; for (const k in s.classRedirects) if (s.classRedirects[k] === sec.id) s.classRedirects[k] = target.id; }
    s.lessons = s.lessons.filter(l => l.sectionId !== sec.id);
    s.assessments.forEach(x => { x.sectionIds = x.sectionIds.filter(id => id !== sec.id); });
    s.exams.forEach(x => { x.sectionIds = x.sectionIds.filter(id => id !== sec.id); });
    s.liveSessions = s.liveSessions.filter(x => x.sectionId !== sec.id);
    s.sections = s.sections.filter(x => x.id !== sec.id);
    if (target) { notify(s, sec.studentIds, 'Your class was moved', `${sec.code} was cancelled. You are now in ${target.code}.`, '#/student/dashboard', eventId); notify(s, [target.leadId], 'Students moved to your class', `${sec.studentIds.length} student(s) from ${sec.code} joined ${target.code}.`, '#/instructor/dashboard', eventId); }
    notify(s, S.deansFor(s, (target || s.sections[0]).id).filter(id => id !== a.id), 'Class cancelled', `${a.name} cancelled ${sec.code}${target ? ` — students moved to ${target.code}` : ''}.`, '#/director/staff', eventId);
    return { audit: [`Cancelled ${sec.code}${target ? `; ${sec.studentIds.length} student(s) and code ${code} moved to ${target.code}` : ''}`, 'section', sec.id], toast: target ? `Cancelled — students and code now go to ${target.code}` : 'Class cancelled' };
  },
  STAFF_ASSIGNED(s, a, p, eventId) {
    const sec = S.sectionById(s, p.sectionId) || fail('Class not found');
    if (a.role !== 'director' || !S.canManageSection(s, a, sec.id)) fail('Only the Dean of this school can change teaching assignments');
    const userId = p.userId || null;
    if (userId && S.userById(s, userId)?.role !== 'instructor') fail('Choose a lecturer');
    const subjects = p.subject === 'lead' ? null : S.subjectsOfSection(s, sec.id);
    if (subjects && !subjects.includes(p.subject)) fail('This class does not study that subject');
    const label = p.subject === 'lead' ? 'class lead' : S.subjectLabel(s, p.subject);
    const prev = p.subject === 'lead' ? sec.leadId : sec.assignments[p.subject] || null;
    if (prev === userId) return {};
    if (p.subject === 'lead') { if (!userId) fail('A class needs a lead lecturer'); sec.leadId = userId; }
    else sec.assignments[p.subject] = userId;
    sec.instructorIds = [...new Set([sec.leadId, ...Object.values(sec.assignments).filter(Boolean)])];
    if (userId) notify(s, [userId], 'New teaching assignment', `${a.name} assigned you to ${label} in ${sec.code}.`, '#/instructor/dashboard', eventId);
    if (prev) notify(s, [prev], 'Teaching assignment changed', `You no longer teach ${label} in ${sec.code}.`, '#/instructor/dashboard', eventId);
    const load = userId ? S.lecturerLoad(s, userId) : null;
    return { audit: [`${sec.code} · ${label}: ${prev ? S.userById(s, prev).name : 'unassigned'} → ${userId ? S.userById(s, userId).name : 'unassigned'}`, 'section', sec.id],
      toast: load?.over ? `Assigned — ${S.userById(s, userId).name} is now at ${load.hours}h (limit ${s.staffing.maxHours}h)` : 'Assignment saved', tone: load?.over ? 'warn' : 'ok' };
  },
  WORKBOOK_ANSWERED(s, a, p) {
    const e = S.exerciseById(s, p.exerciseId) || fail('Exercise not found');
    if (!S.releasedUnits(s, a.sectionId).includes(e.unitId)) fail('This unit has not started yet');
    let ans = S.answerOf(s, a.id, e.id);
    const t = S.now(s).toISOString();
    if (e.type === 'written') {
      const text = String(p.value || '').trim();
      const media = e.speak && typeof p.media === 'string' && p.media.startsWith('rec-') ? p.media : null;
      if (!media && text.split(/\s+/).filter(Boolean).length < 10) fail(e.speak ? 'Record your answer, or type at least 10 words' : 'Write at least 10 words');
      if (ans?.status === 'graded') fail('This answer has already been marked');
      if (!ans) { ans = { id: newId('WA'), exerciseId: e.id, studentId: a.id, tries: 0 }; s.workbookAnswers.push(ans); }
      Object.assign(ans, { value: text, media, correct: null, score: null, status: 'submitted', tries: ans.tries + 1, at: t, feedback: null, gradedBy: null });
      s.activity.push({ id: newId('ACT'), studentId: a.id, lessonId: null, blockId: null, type: 'workbook', minutes: 8, at: t });
      return { audit: [`Submitted a ${e.speak ? 'spoken' : 'written'} answer (${e.unitId}: ${e.title})`, 'exercise', e.id], toast: 'Submitted — your lecturer will mark it' };
    }
    const g = S.gradeExercise(e, p.value);
    if (!ans) { ans = { id: newId('WA'), exerciseId: e.id, studentId: a.id, tries: 0, correct: false }; s.workbookAnswers.push(ans); }
    if (ans.correct) return { result: { correct: true, fraction: 1, already: true } };
    Object.assign(ans, { value: p.value, correct: g.correct, score: null, status: 'graded', tries: ans.tries + 1, at: t });
    s.activity.push({ id: newId('ACT'), studentId: a.id, lessonId: null, blockId: null, type: 'workbook', minutes: 3, at: t });
    return { result: g };
  },
  WORKBOOK_GRADED(s, a, p, eventId) {
    const ans = s.workbookAnswers.find(x => x.id === p.answerId) || fail('Answer not found');
    const stu = S.userById(s, ans.studentId);
    if (!S.sectionById(s, stu.sectionId).instructorIds.includes(a.id)) fail('Not your student');
    const score = Number(p.score);
    if (!(score >= 0 && score <= 4)) fail('Choose a score from 0 to 4');
    Object.assign(ans, { score, status: 'graded', feedback: p.feedback?.trim() || null, gradedBy: a.id });
    const e = S.exerciseById(s, ans.exerciseId);
    notify(s, [stu.id], e.speak ? 'Spoken answer marked' : 'Written answer marked', `${e.title}: ${score}/4${ans.feedback ? ` — "${ans.feedback}"` : ''}`, e.caseId ? `#/student/case/${e.caseId}` : `#/student/workbook/${e.unitId}`, eventId);
    return { audit: [`Marked ${stu.name}'s answer (${e.title}): ${score}/4`, 'answer', ans.id], toast: `Saved — ${score}/4` };
  },
  INTEGRATION_SYNCED(s, a, p) {
    const students = s.users.filter(u => u.role === 'student').length;
    s.integrations ??= {};
    s.integrations[p.key] = { lastSync: S.now(s).toISOString(), records: students };
    return { audit: [`Ran simulated ${p.label} sync (${students} student records)`, 'integration', p.key], toast: `${p.label}: ${students} records reconciled (simulated)` };
  },

};

/** dispatch(type, payload) → result | undefined. Shows a toast for success and for rule violations. */
export function dispatch(type, payload = {}) {
  const s = getState();
  const actor = S.currentUser(s) || (type === 'SIGNED_IN' ? { id: payload.userId, role: 'any' } : null);
  try {
    if (!H[type]) fail(`Unknown action ${type}`);
    const allowed = ROLES.any.includes(type) || (actor && ROLES[actor.role]?.includes(type));
    if (!allowed) fail('You do not have permission to do that');
    const eventId = newId('E');
    const out = H[type](s, actor, payload, eventId) || {};
    if (!SILENT.has(type) && out.audit) audit(s, eventId, out.actorOverride || actor.id, type, ...out.audit);
    commit();
    if (out.toast) toast(out.toast, out.tone || 'ok');
    return out.result ?? true;
  } catch (e) {
    if (e instanceof DomainError) { toast(e.message, 'danger'); return undefined; }
    console.error(e);
    toast('Something went wrong. Please try again.', 'danger');
    return undefined;
  }
}

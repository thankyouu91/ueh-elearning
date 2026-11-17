// Deterministic demo seed for UEH Learning — one ESP class: English for Marketing Communication (B1–B1+).
// Every number shown in the UI is derived from this data by selectors.js.
import { addLibrarySeed } from './seed-library.js';
import { addWorkbookSeed } from './seed-workbook.js';
import { UNITS, WEEKS, Q, VOCAB, GRAMMAR, LESSONS, PHOTOS } from './content/index.js';
import { unitExercises } from './seed-workbook.js';
import { addMidterm } from './seed-midterm.js';

export const TERM_START = '2026-09-07T00:00:00'; // Monday of week 1
export const TERM_WEEKS = 16;
const CURRENT_WEEK = 9;
const DAY = 86400000;

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
export function weekStart(week) { return new Date(new Date(TERM_START).getTime() + (week - 1) * 7 * DAY); }
const iso = (d) => d.toISOString();
const at = (week, dayOffset, hour = 9, min = 0) => { const d = weekStart(week); d.setDate(d.getDate() + dayOffset); d.setHours(hour, min, 0, 0); return d; };

/* ------------------------------------------------------------------ subject & unit library */
// One ESP class: English for Marketing Communication (CEFR B1–B1+). Unit rows and all content live in js/content/.
export const SUBJECTS = {
  MKT: { label: 'Marketing', short: 'MKT' },
};
const FRAMEWORK = WEEKS;
const REQUIRED = ['MK1', 'MK2', 'MK3', 'MK4', 'MK5', 'MK6', 'MK7', 'MK8', 'MK9', 'MK10', 'MID', 'FX'];
const CURRICULA = { 'P-MKT': WEEKS };
const GENRE = Object.fromEntries(UNITS.map(u => [u[0], u[4]]));
const GRAMMAR_BY_UNIT = Object.fromEntries(GRAMMAR.map(g => [g[1], { name: g[2], form: g[4], use: g[5], examples: g[7], watchOut: g[8] }]));

let blkSeq = 0;
const tileSeq = { n: 0 };
const tile = (kind, w, h, extra) => ({ id: `TL-L${++tileSeq.n}`, kind, w, h, ...extra });
const qTile = (e) => tile('question', e.type === 'written' ? 4 : 2, 1, { exerciseId: e.id });
const bullets = (list) => list.map(x => `- ${x}`).join('\n');

/**
 * Lesson blocks for a unit, in the order of the genre-based teaching–learning cycle:
 * lead-in, key words, model text, genre analysis, language focus, listening, speaking (task-based), writing, practice check.
 * Each stage is a page that embeds the unit's real workbook items; minutes come from the lesson plan (js/content/mkt-lessons.js).
 * `ctx` needs `exercises` (with ids); grammar comes from the content files.
 */
export function blocksForUnit(unit, ctx) {
  const P = LESSONS[unit.id] || {};
  const m = P.minutes || {};
  const ex = (ctx?.exercises || []).filter(e => e.unitId === unit.id && !e.caseId);
  const by = (skill) => ex.filter(e => e.skill === skill);
  const R = by('R'), L = by('L'), Sp = by('S'), Wr = by('W'), U = by('U');
  const order = U.filter(e => e.type === 'order'), lang = U.filter(e => e.type !== 'order');
  const genre = GENRE[unit.id] || 'Review';
  const g = GRAMMAR_BY_UNIT[unit.id];
  const b = (type, title, minutes, extra = {}) => ({ id: `B${++blkSeq}-${Math.random().toString(36).slice(2, 6)}`, type, title, minutes: minutes || 10, ...extra });
  const page = (title, minutes, layout) => b('page', title, minutes, { layout: layout.filter(Boolean) });
  const out = [];

  out.push(page(`Lead-in: ${unit.title}`, m.leadIn, [
    PHOTOS[unit.id] ? tile('image', 4, 2, { src: `assets/lessons/${unit.id}.jpg`, caption: PHOTOS[unit.id], fit: 'cover' }) : null,
    tile('text', 4, 1, { title: 'Today', body: `**By the end of this lesson:** ${unit.summary}\n\n${P.leadIn || ''}` }),
    P.discussion?.length ? tile('text', 4, 1, { title: 'Talk in pairs (5 minutes)', body: P.discussion.map((q, i) => `${i + 1}. ${q}`).join('\n') }) : null,
  ]));
  out.push(b('vocabulary', 'Key words and chunks (EN–VI)', m.vocab));
  if (R.length) out.push(page(`Model text: ${genre}`, m.model, [
    tile('text', 4, 2, { title: R[0].scenario.title.replace(/^[^,]+, /, ''), body: R[0].scenario.text }),
    ...R.map(qTile),
  ]));
  if (P.genreMoves?.length || order.length) out.push(page(`How the ${genre.toLowerCase()} works`, m.genre, [
    P.genreMoves?.length ? tile('text', 4, 1, { title: 'Moves of the text', body: P.genreMoves.map(([move, purpose, phrases], i) => `${i + 1}. **${move}**: ${purpose} *Useful language:* ${phrases}`).join('\n') + (P.genreNote ? `\n\n${P.genreNote}` : '') }) : null,
    ...order.map(qTile),
  ]));
  out.push(page(g ? `Language focus: ${g.name}` : 'Language focus: review', m.language, [
    g ? tile('text', 4, 1, { title: g.name, body: `**Form:** ${g.form}\n\n**Use:** ${g.use}\n\n${bullets(g.examples)}\n\n**Watch out:** ${g.watchOut}` })
      : unit.example ? tile('text', 4, 1, { title: 'Language focus', body: unit.example }) : null,
    ...lang.map(qTile),
  ]));
  if (L.length) out.push(page(`Listening: ${L[0].scenario.title.replace(/^[^,]+, /, '')}`, m.listening, [
    tile('audio', 4, 1, { title: 'Listen twice: first for the main idea, then for detail', transcript: L[0].scenario.audio }),
    ...L.map(qTile),
  ]));
  if (Sp.length) out.push(page(`Speaking task: ${Sp[0].title.replace(/^[^,]+, /, '')}`, m.speaking, [
    P.speakingPrep ? tile('text', 4, 1, { title: 'Plan (2 minutes)', body: P.speakingPrep }) : null,
    ...Sp.map(qTile),
    P.speakingFollowUp ? tile('text', 4, 1, { title: 'After speaking', body: P.speakingFollowUp }) : null,
  ]));
  if (Wr.length) out.push(page(`Writing task: ${Wr[0].title.replace(/^[^,]+, /, '')}`, m.writing, [
    P.writingFrame?.length ? tile('text', 2, 1, { title: 'Writing frame', body: bullets(P.writingFrame) }) : null,
    P.checklist?.length ? tile('text', 2, 1, { title: 'Check before you submit', body: bullets(P.checklist) }) : null,
    ...Wr.map(qTile),
  ]));
  out.push(b('quiz', 'Practice check', m.check || 5));
  return out;
}

export function buildSeed() {
  blkSeq = 0; tileSeq.n = 0;
  const ctx = { exercises: unitExercises() };
  const r = rng(20260907);
  const units = UNITS.map(([id, title, summary, example]) => ({ id, subject: 'MKT', title, summary, example: example || null }));
  const unitMap = Object.fromEntries(units.map(u => [u.id, u]));

  /* org tree */
  const orgUnits = [
    { id: 'UEH', type: 'university', name: 'UEH University', parentId: null },
    { id: 'SCH-MKT', type: 'school', name: 'School of Marketing', parentId: 'UEH' },
    { id: 'P-MKT', type: 'program', name: 'Bachelor of Marketing', parentId: 'SCH-MKT' },
  ];

  const users = [
    { id: 'P1', name: 'Dr. Tran Minh Quan', title: 'Vice Rector, Academic Affairs', role: 'provost', orgId: 'UEH' },
    { id: 'D3', name: 'Dr. Le Hoang Nam', title: 'Dean, School of Marketing', role: 'director', orgId: 'SCH-MKT' },
    { id: 'I3', name: 'Michael Nguyen', title: 'ESP Lecturer, School of Marketing', role: 'instructor' },
    { id: 'I2', name: 'Nguyen Thi Mai', title: 'ESP Lecturer, School of Marketing', role: 'instructor' },
    { id: 'A1', name: 'Sarah Kim', title: 'System Administrator', role: 'admin', orgId: 'UEH' },
  ];
  const SECTION_DEFS = [
    { id: 'S-MKT1', programId: 'P-MKT', code: 'MKT-K50-ESP01', instructor: 'I3' },
  ];
  // Who teaches the class (one subject: English for Marketing Communication).
  const STAFFING = { 'S-MKT1': { MKT: 'I3' } };
  const NAMES = [
    'Dang Hoang Minh', 'Nguyen Thanh Long', 'Pham Quoc Thai', 'Le Thi Thanh Van', 'Tran Minh Khoa', 'Vo Ngoc Anh',
    'Bui Duc Huy', 'Hoang Thu Trang', 'Do Van Phuc', 'Ngo Bao Chau', 'Ly Gia Han', 'Phan Tuan Kiet',
    'Truong My Linh', 'Huynh Gia Bao', 'Dinh Khanh Vy', 'Mai Quoc Dat', 'Lam Thao Nguyen', 'Cao Minh Triet',
    'Nguyen Ha My', 'Tran Duc Anh', 'Vu Hoang Yen', 'Le Nhat Quang', 'Pham Bao Ngoc', 'Doan Thanh Tam',
    'Ho Thi Kim Ngan', 'Nguyen Phuc Thinh', 'Ta Minh Chau', 'Kieu Anh Thu', 'Luu Quang Vinh', 'Chau Ngoc Han',
  ];
  // [ability (P correct), engagement (P block completed)]
  const PROFILE = [
    [0.86, 0.93], [0.78, 0.86], [0.52, 0.47], [0.94, 0.97], [0.7, 0.8], [0.74, 0.74],
    [0.8, 0.85], [0.86, 0.9], [0.44, 0.63], [0.7, 0.78], [0.9, 0.92], [0.62, 0.7],
    [0.82, 0.88], [0.75, 0.82], [0.92, 0.95], [0.48, 0.55], [0.7, 0.76], [0.8, 0.84],
    [0.88, 0.9], [0.72, 0.8], [0.66, 0.72], [0.9, 0.94], [0.58, 0.66], [0.77, 0.83],
    [0.85, 0.9], [0.69, 0.75], [0.95, 0.96], [0.6, 0.58], [0.79, 0.86], [0.73, 0.8],
  ];
  const profile = {};
  NAMES.forEach((name, i) => {
    const sec = SECTION_DEFS[0];
    const id = `SV${String(i + 1).padStart(3, '0')}`;
    users.push({ id, name, title: `Student, ${sec.code}`, role: 'student', sectionId: sec.id });
    profile[id] = { ab: PROFILE[i][0], en: PROFILE[i][1] };
  });
  users.forEach(u => { u.email = u.role === 'student' ? `${u.id.toLowerCase()}@st.ueh.edu.vn` : `${u.name.replace(/^Dr\.\s*/, '').toLowerCase().split(' ').slice(-1)[0]}.${u.id.toLowerCase()}@ueh.edu.vn`; });
  const students = users.filter(u => u.role === 'student');

  const programs = ['P-MKT'].map(pid => ({
    id: pid, orgId: pid, schoolId: orgUnits.find(o => o.id === pid).parentId, frameworkId: 'FW1', code: pid.slice(2),
    versions: [{ id: `${pid}-K50`, label: 'Intake K50, 2026', unitIds: CURRICULA[pid], status: 'active', approvedBy: 'P1', approvedAt: iso(new Date('2026-06-15T09:00:00')) }],
    proposal: null,
  }));

  const sections = SECTION_DEFS.map(d => ({
    id: d.id, programId: d.programId, versionId: `${d.programId}-K50`, code: d.code,
    leadId: d.instructor, assignments: STAFFING[d.id], instructorIds: [...new Set([d.instructor, ...Object.values(STAFFING[d.id]).filter(Boolean), 'I2'])], studentIds: students.filter(s => s.sectionId === d.id).map(s => s.id),
  }));
  const curriculumOf = (sec) => programs.find(p => p.id === sec.programId).versions.find(v => v.id === sec.versionId).unitIds;

  /* questions */
  const questions = Q.map(([unitId, stem, opts, bloom], i) => {
    const order = opts.map((o, k) => ({ o, k, s: r() })).sort((a, b) => a.s - b.s);
    return { id: `Q${i + 1}`, unitId, stem, options: order.map(x => x.o), answerIndex: order.findIndex(x => x.k === 0), competencyTag: SUBJECTS.MKT.label, bloomLevel: bloom, points: 1 };
  });
  const qOf = (unitId, n = 3) => questions.filter(q => q.unitId === unitId).slice(0, n).map(q => q.id);

  /* lessons */
  const lessons = [];
  let lSeq = 100;
  const plan = { 'S-MKT1': { 10: 'scheduled', 11: 'submitted', 12: 'changes_requested', 13: 'draft' } };
  const deanOf = { 'P-MKT': 'D3' };
  for (const sec of sections) {
    const cur = curriculumOf(sec);
    const extra = plan[sec.id];
    for (let w = 1; w <= CURRENT_WEEK + 4; w++) {
      const status = w <= CURRENT_WEEK ? 'published' : extra[w];
      if (!status) continue;
      const u = unitMap[cur[w - 1]];
      const authorId = sec.instructorIds[0];
      const l = { id: `L-${++lSeq}`, sectionId: sec.id, unitId: u.id, authorId, week: w, title: u.title, summary: u.summary, status, blocks: blocksForUnit(u, ctx), history: [], submittedAt: null, reviewedBy: null, reviewNote: null, publishedAt: null };
      l.history.push({ at: iso(at(Math.max(1, w - 3), 1, 10)), by: authorId, action: 'Created draft' });
      if (status !== 'draft') { l.submittedAt = iso(at(Math.max(1, w - 2), 1, 15)); l.history.push({ at: l.submittedAt, by: authorId, action: 'Submitted for approval' }); }
      if (['scheduled', 'published'].includes(status)) { l.reviewedBy = deanOf[sec.programId]; l.history.push({ at: iso(at(Math.max(1, w - 2), 3, 11)), by: l.reviewedBy, action: 'Approved' }); }
      if (status === 'published') { l.publishedAt = iso(at(w, 0, 7)); l.history.push({ at: l.publishedAt, by: 'system', action: 'Published to students' }); }
      if (status === 'changes_requested') {
        l.reviewedBy = deanOf[sec.programId];
        l.reviewNote = 'Add a Green Leaf Tea example to the model text and a short practice check on the passive voice.';
        l.history.push({ at: iso(at(CURRENT_WEEK - 1, 2, 10)), by: l.reviewedBy, action: 'Requested changes', note: l.reviewNote });
      }
      lessons.push(l);
    }
  }

  /* assessments — one set per programme, built from its curriculum */
  const rubric = ['Task achievement & genre moves', 'Organisation & coherence', 'Vocabulary range & accuracy', 'Grammar & mechanics'];
  const assessments = [];
  for (const p of programs) {
    const cur = p.versions[0].unitIds;
    const secIds = sections.filter(x => x.programId === p.id).map(x => x.id);
    const wk = (from, to, n) => cur.slice(from - 1, to).flatMap(u => qOf(u, n));
    const A = (key, type, title, openW, openD, closeW, closeD, questionIds, extra = {}) => assessments.push({
      id: `${p.code}-${key}`, courseId: 'C1', programId: p.id, sectionIds: secIds, type, title, unitId: null, questionIds,
      opensAt: iso(at(openW, openD, 8)), closesAt: iso(at(closeW, closeD, 23, 59)), timeLimitMin: 15, maxAttempts: 1, status: 'scheduled',
      origin: 'instructor', createdBy: sections.find(x => x.programId === p.id).instructorIds[0], ...extra,
    });
    A('Q1', 'quiz', 'Quiz 1, Weeks 1–2', 2, 0, 2, 6, wk(1, 2, 3), { maxAttempts: 2 });
    A('Q2', 'quiz', 'Quiz 2, Weeks 3–4', 4, 0, 4, 6, wk(3, 4, 3), { maxAttempts: 2 });
    A('UT1', 'unit_test', 'Unit Test 1, Weeks 1–6', 6, 0, 6, 6, wk(1, 6, 2), { timeLimitMin: 25 });
    A('CR1', 'workshop', 'Writing Portfolio 1, Stakeholder memo', 6, 0, 7, 4, [], { rubric, timeLimitMin: null });
    A('MID', 'midterm', 'Midterm Examination', CURRENT_WEEK, 0, CURRENT_WEEK + 1, 4, wk(1, 8, 2), { timeLimitMin: 120, origin: 'standardized', createdBy: deanOf[p.id] }); // paper and parts: js/seed-midterm.js
    A('Q3', 'quiz', 'Quiz 3, Weeks 9–10', 10, 0, 10, 6, wk(9, 10, 3), { maxAttempts: 2 });
    A('CR2', 'workshop', 'Writing Portfolio 2, Campaign proposal', 11, 0, 12, 4, [], { rubric, timeLimitMin: null });
    A('Q4', 'quiz', 'Quiz 4, Weeks 11–12', 12, 0, 12, 6, wk(11, 12, 3), { maxAttempts: 2 });
    A('FIN', 'final', 'Final Examination', 16, 0, 16, 4, wk(1, 16, 1), { timeLimitMin: 45, origin: 'standardized', createdBy: deanOf[p.id] });
  }

  /* attempts & rubric grades */
  const attempts = [];
  const rubricGrades = [];
  let aSeq = 0;
  const qMap = Object.fromEntries(questions.map(q => [q.id, q]));
  const missed = { SV009: ['Q2', 'UT1'], SV016: ['UT1', 'Q2'] };
  const midDone = ['SV002', 'SV004', 'SV008', 'SV011', 'SV013', 'SV015', 'SV019', 'SV022', 'SV025', 'SV027'];
  const ungradedCR = ['SV006', 'SV012', 'SV020'];
  const weekOf = (d) => Math.floor((new Date(d) - new Date(TERM_START)) / (7 * DAY)) + 1;
  for (const s of students) {
    const p = profile[s.id];
    const sec = sections.find(x => x.id === s.sectionId);
    for (const a of assessments.filter(a => a.sectionIds.includes(sec.id))) {
      const key = a.id.split('-')[1];
      if (a.type === 'workshop') {
        if (weekOf(a.closesAt) < CURRENT_WEEK && !ungradedCR.includes(s.id)) {
          const lvl = () => Math.max(1, Math.min(4, Math.round(1 + p.ab * 3 + (r() - 0.5))));
          rubricGrades.push({ id: `RG-${s.id}-${a.id}`, assessmentId: a.id, studentId: s.id, criteria: a.rubric.map(name => ({ name, level: lvl() })), gradedBy: sec.instructorIds[0], gradedAt: iso(at(weekOf(a.closesAt) + 1, 1, 16)) });
        }
        continue;
      }
      const past = weekOf(a.closesAt) < CURRENT_WEEK;
      if (!past && !(key === 'MID' && midDone.includes(s.id))) continue;
      if ((missed[s.id] || []).includes(key)) continue;
      const answers = {};
      let score = 0, max = 0;
      for (const qid of a.questionIds) {
        const q = qMap[qid];
        const pick = r() < p.ab ? q.answerIndex : (q.answerIndex + 1 + Math.floor(r() * 3)) % 4;
        answers[qid] = pick; max += q.points; if (pick === q.answerIndex) score += q.points;
      }
      const startedAt = key === 'MID' ? at(CURRENT_WEEK, Math.floor(r() * 2), 14 + Math.floor(r() * 4)) : at(weekOf(a.opensAt), 2 + Math.floor(r() * 3), 14 + Math.floor(r() * 5));
      attempts.push({ id: `AT${++aSeq}`, assessmentId: a.id, studentId: s.id, startedAt: iso(startedAt), submittedAt: iso(new Date(startedAt.getTime() + (8 + r() * (a.timeLimitMin - 8)) * 60000)), answers, score, maxScore: max, status: 'graded' });
    }
  }

  /* activity */
  const activity = [];
  let actSeq = 0;
  for (const s of students) {
    const p = profile[s.id];
    for (const l of lessons.filter(l => l.sectionId === s.sectionId && l.status === 'published')) {
      for (const blk of l.blocks) {
        const chance = l.week === CURRENT_WEEK ? p.en * 0.4 : p.en;
        if (r() < chance) activity.push({ id: `ACT${++actSeq}`, studentId: s.id, lessonId: l.id, blockId: blk.id, type: 'complete', minutes: Math.round(blk.minutes * (0.8 + r() * 0.6)), at: iso(at(l.week, Math.floor(r() * 6), 9 + Math.floor(r() * 10))) });
      }
      if (r() < p.en) activity.push({ id: `ACT${++actSeq}`, studentId: s.id, lessonId: null, blockId: null, type: 'flashcard', minutes: 5 + Math.floor(r() * 15), at: iso(at(l.week, 5, 20)) });
    }
  }


  const now = (d, h, m = 0) => iso(at(CURRENT_WEEK, d, h, m));
  const pendingLesson = (secId) => lessons.find(l => l.sectionId === secId && l.status === 'submitted');
  const crLesson = lessons.find(l => l.status === 'changes_requested');
  const notifications = [
    ...['S-MKT1'].map((sid, i) => {
      const l = pendingLesson(sid); const sec = sections.find(x => x.id === sid);
      return { id: `NL${i}`, userId: deanOf[sec.programId], title: 'Lesson awaiting approval', body: `${users.find(u => u.id === l.authorId).name} submitted "${l.title}" (${sec.code}, week ${l.week}).`, link: `#/director/approvals/${l.id}`, createdAt: now(0, 15 + i), readAt: null };
    }),
    { id: 'N3', userId: 'I3', title: 'Changes requested', body: `Dr. Le Hoang Nam: "${crLesson.reviewNote}"`, link: `#/instructor/builder/${crLesson.id}`, createdAt: iso(at(CURRENT_WEEK - 1, 2, 10)), readAt: null },
    { id: 'N4', userId: 'I3', title: 'Portfolio marking pending', body: '3 students in MKT-K50-ESP01 still need a rubric grade for Writing Portfolio 1.', link: '#/instructor/gradebook', createdAt: now(0, 8), readAt: null },
    { id: 'N6', userId: 'A1', title: 'Roster sync completed', body: `Simulated OneRoster sync reconciled ${students.length} student seats.`, link: '#/admin/integrations', createdAt: now(0, 6), readAt: null },
    ...students.map((s, i) => ({ id: `NS${i}`, userId: s.id, title: 'Midterm Examination is open', body: 'The midterm closes on Friday of week 10. You have one attempt of 120 minutes: listening, reading, vocabulary and grammar, writing and speaking.', link: `#/student/exam/${programs.find(p => p.id === sections.find(x => x.id === s.sectionId).programId).code}-MID`, createdAt: now(0, 8), readAt: midDone.includes(s.id) ? now(1, 9) : null })),
  ];

  const auditLog = [
    { id: 'E3', actorId: 'D3', action: 'LESSON_CHANGES_REQUESTED', summary: `Requested changes on "${crLesson.title}"`, entityType: 'lesson', entityId: crLesson.id, at: iso(at(CURRENT_WEEK - 1, 2, 10)) },
    { id: 'E4', actorId: 'system', action: 'WEEK_ADVANCED', summary: `Week ${CURRENT_WEEK} started, ${sections.length} lessons published, Midterm Examination opened`, entityType: 'term', entityId: 'T1', at: now(0, 7) },
    ...['S-MKT1'].map((sid, i) => { const l = pendingLesson(sid); return { id: `E1${i}`, actorId: l.authorId, action: 'LESSON_SUBMITTED', summary: `Submitted "${l.title}" for approval`, entityType: 'lesson', entityId: l.id, at: now(0, 15 + i) }; }),
  ];

  const st = {
    version: 20,
    clock: { week: CURRENT_WEEK, setAt: Date.now() },
    session: { userId: null },
    ui: { theme: 'light', orgFilter: null },
    term: { id: 'T1', title: 'AY 2026–27, Term 1', startDate: TERM_START, weeks: TERM_WEEKS },
    course: {
      id: 'C1', code: 'ESP-MKT', title: 'English for Marketing Communication (ESP, B1–B1+)',
      gradingScheme: { categories: [
        { key: 'quiz', label: 'Quizzes', weight: 0.15 }, { key: 'unit_test', label: 'Unit tests', weight: 0.15 },
        { key: 'workshop', label: 'Writing portfolio', weight: 0.2 }, { key: 'midterm', label: 'Midterm', weight: 0.2 },
        { key: 'final', label: 'Final', weight: 0.3 } ], passMark: 5, scale: 10 },
    },
    subjects: SUBJECTS,
    framework: { id: 'FW1', title: 'UEH English for Marketing Communication (ESP)', capacity: 16, unitIds: FRAMEWORK, requiredUnitIds: REQUIRED, minPerCoreSubject: 10, coreSubjects: ['MKT'] },
    staffing: { hoursPerUnit: 3, maxHours: 48 },
    license: { seats: 2000, product: 'UEH Learning — campus licence', expiresAt: '2027-08-31T00:00:00' },
    orgUnits, programs, users, sections, units, lessons, assessments, questions, attempts, rubricGrades, activity,
    notifications, auditLog, liveSessions: [], flags: { atRisk: [] },
    vocabulary: VOCAB.map(([term, vi, def, unitId, pos, family, example, collocations], i) => ({ id: `V${i + 1}`, term, vi, def, unitId, pos, family, example, collocations })),
    grammar: GRAMMAR.map(([id, unitId, name, vi, form, use, useVi, examples, watchOut]) => ({ id, unitId, name, vi, form, use, useVi, examples, watchOut })),
  };
  addLibrarySeed(st, { blocksForUnit: (u) => blocksForUnit(u, ctx), at, iso, CURRENT_WEEK });
  st.__profiles = profile;
  addWorkbookSeed(st, { rng, iso, at, CURRENT_WEEK });
  addMidterm(st, { rng, iso, at, CURRENT_WEEK, profiles: profile });
  delete st.__profiles;
  return st;
}

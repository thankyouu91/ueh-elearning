// Library, lesson bank, modules and exam-studio seed data.
// Licensed ESP coursebooks: staff upload the PDF; the platform stores page references, never retyped content.

// [id, title, subject, suggested units, description]
const BOOKS = [
  ['BK-MCOM', 'Marketing Communication', 'MKT', ['MK1', 'MK2', 'MK3', 'MK4', 'MK5'], 'Stakeholders, multicultural communication, ethics and the marketing mix. Licensed coursebook: PDF and page references only.'],
  ['BK-BCOM', 'Business Communication for Marketing', 'MKT', ['MK6', 'MK7', 'MK8', 'MK9', 'MK10'], 'Briefings, proposals, presentations, business letters and digital communication. Licensed coursebook: PDF and page references only.'],
  ['BK-ADV', 'Advertising & Promotions', 'MKT', ['MK4', 'MK10', 'PJ2'], 'Advertising messages, press releases and campaign evaluation.'],
];

// [id, type, unitId, title, minutes, body]
// Classroom resources come from the ESP content files (js/content/mkt-*.js, LIB).
const RESOURCES = [];

import { EXTRA_LIBRARY } from './content/index.js';

export function addLibrarySeed(st, { blocksForUnit, at, iso, CURRENT_WEEK }) {
  st.library = {
    collection: 'UEH Business & Economics collection',
    books: BOOKS.map(([id, title, subject, unitIds, description]) => ({ id, title, subject, unitIds, description, file: null, addedBy: 'A1', addedAt: iso(new Date('2026-08-20T09:00:00')) })),
    extracts: [],
  };
  st.resources = [...RESOURCES, ...EXTRA_LIBRARY].map(([id, type, unitId, title, minutes, body]) => ({ id, type, unitId, title, minutes, body, file: null, createdBy: type === 'practical' ? 'I3' : 'D3', createdAt: iso(new Date('2026-08-25T09:00:00')) }));

  /* lesson bank: reusable lessons per unit */
  const unit = (id) => st.units.find(u => u.id === id);
  let tSeq = 0;
  const tpl = (unitId, authorId, extraBlocks = []) => {
    const u = unit(unitId);
    const l = { id: `T-${++tSeq}`, sectionId: null, unitId, authorId, week: null, title: u.title, summary: u.summary, status: 'template', shared: true,
      blocks: [...blocksForUnit(u), ...extraBlocks], history: [{ at: iso(at(Math.max(1, CURRENT_WEEK - 6), 1, 10)), by: authorId, action: 'Created in lesson bank' }],
      submittedAt: null, reviewedBy: null, reviewNote: null, publishedAt: null, updatedAt: iso(at(CURRENT_WEEK - 2, 2, 14)) };
    st.lessons.push(l);
    return l;
  };
  const resBlock = (rid, extra = false) => { const r = st.resources.find(x => x.id === rid); return { id: `RB-${rid}-${Math.random().toString(36).slice(2, 6)}`, type: 'resource', resourceId: rid, title: r.title, minutes: r.minutes, extra }; };
  // Lesson bank of the ESP Marketing lecturers (PJ2 deliberately missing so the planner shows a gap)
  ['MK1', 'MK2', 'MK3', 'MK4', 'MK5', 'RV1', 'MK6', 'MK7', 'MID', 'MK8', 'MK9', 'MK10', 'PJ1'].forEach(u => tpl(u, 'I3'));
  ['RV2', 'FX'].forEach(u => tpl(u, 'I2'));

  /* module (học phần) being planned by the Marketing lecturer */
  const mkt = st.programs.find(p => p.id === 'P-MKT');
  const cur = mkt.versions[0].unitIds;
  const bankFor = (unitId) => st.lessons.find(l => l.status === 'template' && l.unitId === unitId);
  const extrasByWeek = { 8: ['R-C3'], 12: ['R-C6'] };
  st.modules = [{
    id: 'MOD-1', title: 'English for Marketing Communication, Term 1', programId: 'P-MKT', versionId: mkt.versions[0].id, ownerId: 'I3',
    weeks: cur.map((u, i) => ({ week: i + 1, lessonId: bankFor(u)?.id || null, extras: extrasByWeek[i + 1] || [] })),
    sectionIds: [], status: 'draft', note: null, updatedAt: iso(at(CURRENT_WEEK - 1, 4, 16)),
    history: [{ at: iso(at(CURRENT_WEEK - 3, 1, 9)), by: 'I3', action: 'Created module plan' }],
  }];

  /* exam studio */
  const qFor = (unitIds, n) => unitIds.flatMap(u => st.questions.filter(q => q.unitId === u).slice(0, n));
  const item = (q, by) => ({ questionId: q.id, addedBy: by, addedAt: iso(at(CURRENT_WEEK - 1, 2, 10)), points: 1 });
  const mktQs = qFor(['MK6', 'MK7', 'MK8', 'MK9'], 2);
  const revQs = qFor(['MK1', 'MK2', 'MK3', 'MK4', 'MK5'], 1);
  st.exams = [
    {
      id: 'EX-1', title: 'Final Examination (resit paper)', type: 'final', programId: 'P-MKT', sectionIds: ['S-MKT1'],
      ownerId: 'D3', coEditors: [{ userId: 'I3', signedOff: false, invitedAt: iso(at(CURRENT_WEEK - 2, 1, 9)) }, { userId: 'I2', signedOff: false, invitedAt: iso(at(CURRENT_WEEK - 2, 1, 9)) }],
      durationMin: 45, status: 'draft',
      targets: { total: 16, subjects: { MKT: 16 }, bloom: { Remember: 5, Understand: 5, Apply: 4, Analyze: 2 } },
      parts: [
        { id: 'PA', title: 'Part A, Units 6–9', instructions: 'Choose the best answer.', items: mktQs.map((q, i) => item(q, i % 2 ? 'I3' : 'D3')) },
        { id: 'PB', title: 'Part B, Units 1–2', instructions: 'Choose the best answer.', items: qFor(['MK1', 'MK2'], 1).map(q => item(q, 'I2')) },
      ],
      comments: [
        { id: 'CM1', userId: 'I3', at: iso(at(CURRENT_WEEK - 1, 2, 11)), text: 'Added two questions each for Units 6–9. Still need Unit 10 and the review units.' },
        { id: 'CM2', userId: 'I2', at: iso(at(CURRENT_WEEK - 1, 3, 9)), text: 'Part B has Units 1 and 2. I can add an Apply-level item on the passive voice for Unit 9 if you want one.' },
        { id: 'CM3', userId: 'D3', at: iso(at(CURRENT_WEEK - 1, 3, 15)), text: 'Yes please — we are short on Apply/Analyze items. Target is in the blueprint.' },
      ],
      versions: [{ id: 'V1', at: iso(at(CURRENT_WEEK - 1, 3, 16)), by: 'D3', label: 'First draft', parts: null }],
      lastEdit: { by: 'D3', at: iso(at(CURRENT_WEEK - 1, 3, 15)) }, assessmentId: null,
      history: [{ at: iso(at(CURRENT_WEEK - 2, 1, 9)), by: 'D3', action: 'Created exam and invited Michael Nguyen, Nguyen Thi Mai' }],
    },
    {
      id: 'EX-2', title: 'Progress Test, Units 1–5', type: 'unit_test', programId: 'P-MKT', sectionIds: ['S-MKT1'],
      ownerId: 'D3', coEditors: [{ userId: 'I3', signedOff: true, invitedAt: iso(at(CURRENT_WEEK - 2, 2, 9)) }],
      durationMin: 20, status: 'review',
      targets: { total: 5, subjects: { MKT: 5 }, bloom: { Remember: 2, Understand: 2, Apply: 1, Analyze: 0 } },
      parts: [{ id: 'PA', title: 'Part A', instructions: 'Choose the best answer.', items: revQs.map(q => item(q, 'I3')) }],
      comments: [{ id: 'CM4', userId: 'I3', at: iso(at(CURRENT_WEEK - 1, 1, 10)), text: 'Signed off. One question per unit, Units 1–5.' }],
      versions: [], lastEdit: { by: 'I3', at: iso(at(CURRENT_WEEK - 1, 1, 10)) }, assessmentId: null,
      history: [{ at: iso(at(CURRENT_WEEK - 2, 2, 9)), by: 'D3', action: 'Created exam' }, { at: iso(at(CURRENT_WEEK - 1, 0, 16)), by: 'D3', action: 'Sent for review' }],
    },
  ];

  /* complete, locked final papers: one question per curriculum unit, varied thinking levels */
  const fullPaper = (id, programId, owner, co, title) => {
    const prog = st.programs.find(p => p.id === programId);
    const units = prog.versions[0].unitIds;
    const qs = units.map((u, i) => { const pool = st.questions.filter(q => q.unitId === u); return pool[(i + 1) % pool.length]; });
    const subjects = { MKT: 0 };
    const bloom = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0 };
    qs.forEach(q => { subjects[st.units.find(u => u.id === q.unitId).subject]++; bloom[q.bloomLevel]++; });
    const half = Math.ceil(qs.length / 2);
    const t = iso(at(CURRENT_WEEK - 1, 4, 10));
    st.exams.push({
      id, title, type: 'final', programId, sectionIds: st.sections.filter(x => x.programId === programId).map(x => x.id), ownerId: owner,
      coEditors: [{ userId: co, signedOff: true, invitedAt: iso(at(CURRENT_WEEK - 3, 1, 9)) }], durationMin: 45, status: 'locked',
      targets: { total: qs.length, subjects, bloom },
      parts: [
        { id: 'PA', title: 'Part A, Weeks 1–8', instructions: 'Choose the best answer. 1 mark each.', items: qs.slice(0, half).map(q => item(q, co)) },
        { id: 'PB', title: 'Part B, Weeks 9–16', instructions: 'Choose the best answer. 1 mark each.', items: qs.slice(half).map(q => item(q, owner)) },
      ],
      comments: [{ id: `CM-${id}`, userId: co, at: t, text: 'Checked every key against the bank. One question per unit, in teaching order. Signed off.' }],
      versions: [{ id: `V-${id}`, at: t, by: owner, label: 'Final version', parts: null }], lastEdit: { by: owner, at: t }, assessmentId: null,
      history: [{ at: iso(at(CURRENT_WEEK - 3, 1, 9)), by: owner, action: 'Created exam' }, { at: iso(at(CURRENT_WEEK - 2, 2, 9)), by: owner, action: 'Sent for review' }, { at: t, by: co, action: 'Signed off' }, { at: t, by: owner, action: `Locked (${qs.length} questions)` }],
    });
  };
  fullPaper('EX-3', 'P-MKT', 'D3', 'I3', 'Final Examination, English for Marketing Communication');
}

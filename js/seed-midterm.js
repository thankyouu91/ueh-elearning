// The 4-skill midterm: 55 auto-checked items (listening, reading, vocabulary & grammar) and 5 lecturer-marked tasks
// (2 writing, 3 recorded speaking), 120 minutes. The paper lives in js/content/mkt-midterm.js; this file turns it into
// questions, exam tasks and demo attempts for the students who have already sat it.
import { MIDTERM } from './content/mkt-midterm.js';

const BLOOM = { L: 'Understand', R: 'Understand', U: 'Apply' };

export function addMidterm(st, { rng, iso, at, CURRENT_WEEK, profiles }) {
  const a = st.assessments.find(x => x.type === 'midterm');
  if (!a) return;
  const r = rng(909090);
  const caseId = `EXAM:${a.id}`;
  let qn = 0;
  const parts = MIDTERM.parts.map(p => {
    const base = { id: p.id, title: p.title, minutes: p.minutes, weight: p.weight, instructions: p.instructions };
    if (p.tasks) {
      const taskIds = p.tasks.map((t, i) => {
        const id = `EX-${a.id}-${p.id}${i + 1}`;
        st.exercises.push({ id, unitId: 'MID', caseId, type: 'written', title: t.title, prompt: t.prompt, model: t.model, marking: t.marking,
          words: t.words || 90, skill: p.id, level: 'B1', pack: 'ESP-MKT', source: 'ueh', ...(p.id === 'S' ? { speak: true, seconds: t.seconds || 60 } : {}) });
        return id;
      });
      return { ...base, taskIds };
    }
    const groups = p.groups.map(g => ({ title: g.title, text: g.text || null, audio: g.audio || null,
      questionIds: g.items.map(([stem, opts, explanation]) => {
        const order = opts.map((o, k) => ({ o, k, s: r() })).sort((x, y) => x.s - y.s);
        const id = `MQ-${p.id}${++qn}`;
        st.questions.push({ id, unitId: 'MID', stem, options: order.map(x => x.o), answerIndex: order.findIndex(x => x.k === 0), explanation,
          competencyTag: 'Marketing', bloomLevel: BLOOM[p.id], points: 1, skill: p.id, examOnly: true });
        return id;
      }) }));
    return { ...base, groups };
  });
  Object.assign(a, { title: MIDTERM.title, parts, questionIds: parts.flatMap(p => (p.groups || []).flatMap(g => g.questionIds)), timeLimitMin: MIDTERM.minutes, maxAttempts: 1 });

  /* demo: the students who have already sat the midterm this week */
  const sat = [...new Set(st.attempts.filter(t => t.assessmentId === a.id).map(t => t.studentId))];
  st.attempts = st.attempts.filter(t => t.assessmentId !== a.id);
  const tasks = parts.flatMap(p => p.taskIds || []).map(id => st.exercises.find(e => e.id === id));
  const qMap = Object.fromEntries(st.questions.map(q => [q.id, q]));
  sat.forEach((sid, i) => {
    const ab = profiles[sid]?.ab ?? 0.7;
    const answers = {};
    for (const qid of a.questionIds) { const q = qMap[qid]; answers[qid] = r() < ab ? q.answerIndex : (q.answerIndex + 1 + Math.floor(r() * 3)) % 4; }
    const started = at(CURRENT_WEEK, Math.floor(r() * 2), 8 + Math.floor(r() * 2));
    const marked = i < 4; // the lecturer has finished marking the first four papers
    const level = ab > 0.85 ? 4 : ab > 0.7 ? 3 : 2;
    for (const e of tasks) {
      st.workbookAnswers.push({ id: `WA-${a.id}-${sid}-${e.id}`, exerciseId: e.id, studentId: sid, value: e.model, media: null, correct: null,
        score: marked ? level : null, status: marked ? 'graded' : 'submitted', tries: 1, at: iso(new Date(started.getTime() + 100 * 60000)),
        feedback: marked ? (level >= 3 ? 'Clear, well organised and accurate.' : 'Good ideas; check verb forms and linking words.') : null, gradedBy: marked ? 'I3' : null });
    }
    const t = { id: `AT-${a.id}-${sid}`, assessmentId: a.id, studentId: sid, startedAt: iso(started), submittedAt: iso(new Date(started.getTime() + (95 + r() * 20) * 60000)), answers, score: null, maxScore: 100, status: 'pending_marking' };
    if (marked) { // same weighting as selectors.examBreakdown (kept here to avoid a seed ↔ selectors import cycle)
      const total = parts.reduce((sum, p) => {
        const pct = p.taskIds ? level / 4 : (() => { const ids = p.groups.flatMap(g => g.questionIds); return ids.filter(id => answers[id] === qMap[id].answerIndex).length / ids.length; })();
        return sum + pct * p.weight;
      }, 0);
      Object.assign(t, { status: 'graded', score: Math.round(total * 10) / 10 });
    }
    st.attempts.push(t);
  });
  return a;
}

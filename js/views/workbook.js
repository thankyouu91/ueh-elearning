// Workbook + case studies. Student edition (interactive, auto-checked) and lecturer edition
// (answers, solutions, marking guide, class statistics), a marking queue, and printable documents.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { BRAND } from '../config.js';
import { esc, icon, badge, kpi, card, empty, pageHead, subjectChip, progress, openModal, closeModal, modalHead, toast } from '../ui.js';
import { bentoGrid, layoutOf, mountMedia, richText } from './bento.js';
import { putFile } from '../features/files.js';

const TYPE = { mcq: ['Multiple choice', 'list-checks'], classify: ['Sort it', 'shapes'], order: ['Put in order', 'list-ordered'], numeric: ['Calculate', 'calculator'], written: ['Write', 'pen-line'] };
const draft = {}; // exerciseId -> in-progress value (not yet checked)
const lastCheck = {}; // exerciseId -> result of the last check in this session
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
const me = () => S.currentUser(getState());
const role = () => me().role;

/* ---------------- helpers ---------------- */
function shuffled(n, seed) {
  const idx = [...Array(n).keys()];
  let h = [...seed].reduce((t, c) => (t * 31 + c.charCodeAt(0)) >>> 0, 7);
  for (let i = n - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  if (idx.every((v, i) => v === i) && n > 1) [idx[0], idx[1]] = [idx[1], idx[0]];
  return idx;
}
const fmtNum = (v) => typeof v === 'number' ? v.toLocaleString('en-US', { maximumFractionDigits: 2 }) : v;
const typeOf = (e) => e.speak ? ['Record', 'mic'] : TYPE[e.type];
const skillChip = (e) => { const k = S.skillOf(e); const [l, ic] = S.SKILLS[k]; return `<span class="chip skill-${k}">${icon(ic)} ${l}</span>${e.level ? `<span class="chip">CEFR ${esc(e.level)}</span>` : ''}${sourceChip(e)}`; };
export const sourceChip = (x) => { const [l, ic] = S.SOURCES[S.sourceOf(x)]; return `<span class="chip src-${S.sourceOf(x)}">${icon(ic)} ${l}</span>`; };
const typeChip = (e) => `${skillChip(e)}<span class="chip">${icon(typeOf(e)[1])} ${typeOf(e)[0]}</span>`;
const rec = { id: null, mr: null, t0: 0 }; // one recording at a time
/** Four bars, one per skill; null = nothing scored yet. */
export const skillBars = (p) => `<div class="skill-bars">${Object.entries(S.SKILLS).map(([k, [l, ic]]) => `<div class="skill-bar"><div class="row between small"><span>${icon(ic)} ${l}</span><strong>${p[k] === null ? '—' : p[k] + '%'}</strong></div>${progress(p[k] || 0, p[k] === null ? '' : p[k] < 60 ? 'danger' : p[k] >= 80 ? 'ok' : '')}</div>`).join('')}</div>`;
function statusChip(e, a) {
  if (!a) return '<span class="chip">Not started</span>';
  if (e.type === 'written') return a.status === 'graded' ? badge(a.score >= 3 ? 'ok' : a.score >= 2 ? 'warn' : 'danger', `Marked ${a.score}/4`) : badge('info', 'Waiting for marking');
  return a.correct ? badge('ok', a.tries === 1 ? 'Correct first try' : 'Correct') : badge('warn', `Try again · ${a.tries} tries`);
}

/* ---------------- exercise card: student ---------------- */
/** Mini-case box before the first exercise of a group that shares the same scenario. */
function caseIntro(list, i, print = false, lecturer = false) {
  const sc = list[i].scenario;
  if (!sc || list[i - 1]?.scenario?.id === sc.id) return '';
  const n = list.filter(e => e.scenario?.id === sc.id).length;
  if (sc.audio) return print ? `<div class="doc-instr"><strong>Listening · ${esc(sc.title)}</strong><br>${lecturer ? esc(sc.audio) : 'Listen to the recording, then answer.'}</div>`
    : `<div class="mini-case"><div class="mini-case-kicker">${icon('headphones', 'ic-xs')} Listening · ${n} questions</div><h3>${esc(sc.title)}</h3><div class="row gap-2 wrap"><button class="btn btn-sm" data-action="bento-speak" data-text="${esc(sc.audio)}">${icon('play')} Play recording</button><span class="small faint">Listen up to twice, then answer.</span></div>${lecturer ? `<details class="mt-2"><summary class="small">Transcript</summary><p class="small">${esc(sc.audio)}</p></details>` : ''}</div>`;
  return print ? `<div class="doc-instr"><strong>Case · ${esc(sc.title)}</strong><br>${esc(sc.text)}</div>`
    : `<div class="mini-case"><div class="mini-case-kicker">${icon('briefcase', 'ic-xs')} Case · ${n} questions</div><h3>${esc(sc.title)}</h3><p>${esc(sc.text)}</p></div>`;
}

export function studentExercise(s, e, n, a) {
  const done = a?.correct || a?.status === 'graded';
  const showSolution = e.type !== 'written' && (a?.correct || (a?.tries || 0) >= 2);
  let body = '';
  if (e.type === 'mcq') {
    const res = lastCheck[e.id];
    const picked = a?.correct ? Number(a.value) : draft[e.id];
    body = `<div class="stack gap-1">${e.options.map((o, i) => { const cls = a?.correct && i === e.answerIndex ? 'correct' : res && !res.correct && Number(draft[e.id]) === i ? 'wrong' : String(picked) === String(i) ? 'selected' : '';
      return `<label class="opt ${cls}" style="margin:0"><input type="radio" name="mcq-${e.id}" value="${i}" ${String(picked) === String(i) ? 'checked' : ''} ${a?.correct ? 'disabled' : ''} data-change="wb-mcq" data-id="${e.id}"> <span class="mono small">${'ABCD'[i]}</span> ${esc(o)}</label>`; }).join('')}</div>
      ${a?.correct ? '' : `<button class="btn btn-primary btn-sm mt-3" data-action="wb-check" data-id="${e.id}">${icon('check')} Check</button>`}`;
  } else if (e.type === 'numeric') {
    const v = draft[e.id] ?? (a?.correct ? a.value : '');
    body = `<div class="row gap-2 wrap"><input class="input" style="max-width:200px" inputmode="decimal" value="${esc(v)}" data-change="wb-num" data-id="${e.id}" ${a?.correct ? 'disabled' : ''} aria-label="Your answer"><span class="muted">${esc(e.unit || '')}</span>
      ${a?.correct ? '' : `<button class="btn btn-primary btn-sm" data-action="wb-check" data-id="${e.id}">${icon('check')} Check</button>`}</div>`;
  } else if (e.type === 'classify') {
    const v = draft[e.id] || (a?.value ?? e.items.map(() => ''));
    const res = lastCheck[e.id];
    body = `<div class="table-wrap"><table class="table"><tbody>${e.items.map(([text, c], i) => {
      const mark = (a?.correct || res) ? (Number(v[i]) === c ? icon('check', 't-ok') : icon('x', 't-danger')) : '';
      return `<tr><td>${esc(text)}</td><td style="width:220px"><select class="select select-sm" style="width:100%" data-change="wb-cls" data-id="${e.id}" data-i="${i}" ${a?.correct ? 'disabled' : ''}><option value="">Choose…</option>${e.categories.map((cat, k) => `<option value="${k}" ${String(v[i]) === String(k) ? 'selected' : ''}>${esc(cat)}</option>`).join('')}</select></td><td style="width:28px">${mark}</td></tr>`;
    }).join('')}</tbody></table></div>${a?.correct ? '' : `<button class="btn btn-primary btn-sm mt-3" data-action="wb-check" data-id="${e.id}">${icon('check')} Check</button>`}`;
  } else if (e.type === 'order') {
    const v = draft[e.id] || (a?.correct ? a.value : shuffled(e.steps.length, e.id));
    draft[e.id] = v;
    body = `<ol class="order-list">${v.map((si, pos) => `<li class="${a?.correct ? 'ok' : ''}"><span class="grow">${esc(e.steps[si])}</span>${a?.correct ? '' : `<button class="btn btn-ghost btn-sm btn-icon" data-action="wb-move" data-id="${e.id}" data-pos="${pos}" data-d="-1" ${pos === 0 ? 'disabled' : ''} aria-label="Move up">${icon('arrow-up')}</button><button class="btn btn-ghost btn-sm btn-icon" data-action="wb-move" data-id="${e.id}" data-pos="${pos}" data-d="1" ${pos === v.length - 1 ? 'disabled' : ''} aria-label="Move down">${icon('arrow-down')}</button>`}</li>`).join('')}</ol>
      ${a?.correct ? '' : `<button class="btn btn-primary btn-sm" data-action="wb-check" data-id="${e.id}">${icon('check')} Check order</button>`}`;
  } else if (e.speak) {
    const locked = a?.status === 'graded';
    const key = draft[e.id + '#rec'] ?? a?.media;
    const live = rec.id === e.id;
    const typed = draft[e.id] ?? a?.value ?? '';
    body = `<div class="row gap-3 wrap">${locked ? '' : `<button class="btn ${live ? 'btn-danger' : ''} btn-sm" data-action="${live ? 'wb-rec-stop' : 'wb-rec-start'}" data-id="${e.id}">${icon(live ? 'square' : 'mic')} ${live ? 'Stop recording' : key ? 'Record again' : 'Start recording'}</button>`}
      ${live ? `<span class="small t-danger">● Recording… aim for about ${e.seconds} seconds</span>` : key ? `<audio controls preload="none" data-media="${esc(key)}" style="width:100%;max-width:360px"></audio>` : `<span class="small faint">About ${e.seconds} seconds. Your browser will ask to use the microphone.</span>`}</div>
      <details class="mt-2" ${!key && typed ? 'open' : ''}><summary class="small">No microphone? Type what you would say</summary><textarea class="textarea mt-2" style="min-height:90px" data-change="wb-text" data-id="${e.id}" ${locked ? 'disabled' : ''}>${esc(typed)}</textarea></details>
      ${locked ? '' : `<div class="row mt-2" style="justify-content:flex-end"><button class="btn btn-primary btn-sm" data-action="wb-submit" data-id="${e.id}">${icon('send')} ${a ? 'Resubmit' : 'Submit to lecturer'}</button></div>`}
      ${locked ? `<div class="note ${a.score >= 3 ? 'note-ok' : 'note-warn'} mt-3">${icon('message-square')}<div><strong>${a.score}/4</strong>${a.feedback ? ` — ${esc(a.feedback)}` : ''}<div class="small mt-2">Sample answer: ${esc(e.model)}</div></div></div>` : ''}`;
  } else {
    const v = draft[e.id] ?? a?.value ?? '';
    const words = String(v).trim().split(/\s+/).filter(Boolean).length;
    const locked = a?.status === 'graded';
    body = `<textarea class="textarea" style="min-height:120px" data-change="wb-text" data-id="${e.id}" ${locked ? 'disabled' : ''} placeholder="Write your answer (about ${e.words} words)">${esc(v)}</textarea>
      <div class="row between small mt-2"><span class="faint">${words} words · aim for ${e.words}</span>${locked ? '' : `<button class="btn btn-primary btn-sm" data-action="wb-submit" data-id="${e.id}">${icon('send')} ${a ? 'Resubmit' : 'Submit to lecturer'}</button>`}</div>
      ${a?.status === 'graded' ? `<div class="note ${a.score >= 3 ? 'note-ok' : 'note-warn'} mt-3">${icon('message-square')}<div><strong>${a.score}/4</strong>${a.feedback ? ` — ${esc(a.feedback)}` : ''}<div class="small mt-2">Model answer: ${esc(e.model)}</div></div></div>` : ''}`;
  }
  const res = lastCheck[e.id];
  const feedback = e.type === 'written' ? '' : res && !a?.correct ? `<div class="note note-warn mt-3">${icon('rotate-ccw')}<div>${res.fraction > 0 && res.fraction < 1 ? `${Math.round(res.fraction * 100)}% right — ` : ''}Not yet. ${(a?.tries || 0) >= 2 ? 'See the worked solution below.' : 'Check your working and try again.'}</div></div>` : '';
  return `<section class="card ex-card ${done ? 'done' : ''}" id="ex-${e.id}"><div class="card-body">
    <div class="row between gap-2 wrap"><div class="row gap-2"><span class="q-num">${n}</span><strong>${esc(e.title)}</strong></div><div class="row gap-2">${typeChip(e)}${statusChip(e, a)}</div></div>
    <p class="mt-3">${esc(e.prompt)}</p><div class="mt-3">${body}</div>${feedback}
    ${showSolution ? `<div class="note note-info mt-3">${icon('lightbulb')}<div><strong>Worked solution:</strong> ${esc(e.solution)}${e.type === 'numeric' ? ` <strong>Answer: ${fmtNum(e.answer)} ${esc(e.unit || '')}</strong>` : ''}</div></div>` : ''}
  </div></section>`;
}

/* ---------------- exercise card: lecturer edition ---------------- */
function answerHtml(e) {
  if (e.type === 'mcq') return `<ol type="A" style="margin:0;padding-left:20px">${e.options.map((o, i) => `<li${i === e.answerIndex ? ' style="font-weight:700;color:var(--ok)"' : ''}>${esc(o)}${i === e.answerIndex ? ' ✓' : ''}</li>`).join('')}</ol>${e.solution ? `<div class="small mt-2">${esc(e.solution)}</div>` : ''}`;
  if (e.type === 'numeric') return `<strong>${fmtNum(e.answer)} ${esc(e.unit || '')}</strong> <span class="faint small">(accepts ±${fmtNum(S.tolOf(e))})</span><div class="small mt-2">${esc(e.solution)}</div>`;
  if (e.type === 'classify') return `<div class="table-wrap"><table class="table"><tbody>${e.items.map(([t, c]) => `<tr><td>${esc(t)}</td><td><strong>${esc(e.categories[c])}</strong></td></tr>`).join('')}</tbody></table></div><div class="small mt-2">${esc(e.solution)}</div>`;
  if (e.type === 'order') return `<ol style="margin:0;padding-left:20px">${e.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol><div class="small mt-2">${esc(e.solution)}</div>`;
  return `<div><strong>Model answer:</strong> ${esc(e.model)}</div><div class="mt-2"><strong>Marking guide (4 marks):</strong><ul style="margin:4px 0 0;padding-left:18px">${e.marking.map(m => `<li>${esc(m)}</li>`).join('')}</ul><div class="small faint">Award 1 mark per point met, +1 for a clear, well-applied answer.</div></div>`;
}
export function lecturerExercise(s, e, n, st) {
  return `<section class="card ex-card"><div class="card-body">
    <div class="row between gap-2 wrap"><div class="row gap-2"><span class="q-num">${n}</span><strong>${esc(e.title)}</strong></div><div class="row gap-2">${typeChip(e)}
      ${st ? `<span class="chip" title="Attempted">${icon('users')} ${st.attempted}/${st.of}</span>${st.pct !== null ? `<span class="chip ${st.pct < 60 ? 't-danger' : ''}">${icon('target')} ${st.pct}% ${e.type === 'written' ? 'avg mark' : 'correct'}</span>` : ''}${st.firstTry !== null && e.type !== 'written' ? `<span class="chip">${st.firstTry}% first try</span>` : ''}${st.pending ? badge('warn', `${st.pending} to mark`) : ''}` : ''}</div></div>
    <p class="mt-3">${esc(e.prompt)}</p>${e.type === 'classify' ? `<p class="small muted">Categories: ${e.categories.map(esc).join(' · ')}</p>` : ''}
    <div class="answer-box mt-3">${answerHtml(e)}</div></div></section>`;
}

/* ---------------- student pages ---------------- */
export function studentWorkbook(s, unitId, u) {
  const released = S.releasedUnits(s, u.sectionId);
  const cur = S.curriculumOfSection(s, u.sectionId);
  if (unitId) {
    const unit = S.unitById(s, unitId);
    if (!unit || !released.includes(unitId)) return { title: 'Workbook', html: card({ body: empty('lock', 'This unit has not started yet', '', '<a class="btn mt-3" href="#/student/workbook">Back</a>') }) };
    const ex = S.unitExercises(s, unitId);
    const pr = S.workbookProgress(s, u.id, [unitId]);
    const cases = S.fullCases(s).filter(c => c.unitId === unitId);
    return {
      title: `Workbook · ${unit.id}`,
      html: `<div class="page" style="max-width:900px">${pageHead(`${esc(unit.id)} · ${esc(unit.title)}`, `Workbook · week ${cur.indexOf(unitId) + 1} · ${ex.length} exercises`, `<a class="btn" href="#/student/workbook">${icon('arrow-left')} Workbook</a><a class="btn" href="#/print/workbook/${unit.id}" target="_blank">${icon('printer')} Print</a>`)}
        <div class="row gap-3 wrap">${subjectChip(s, unit.subject)}<div style="width:220px">${progress(pr.pct, pr.pct === 100 ? 'ok' : '')}</div><span class="small muted">${pr.done}/${pr.total} done${pr.accuracy !== null ? ` · ${pr.accuracy}% accuracy` : ''}${pr.pending ? ` · ${pr.pending} waiting for marking` : ''}</span></div>
        ${ex.map((e, i) => caseIntro(ex, i) + studentExercise(s, e, i + 1, S.answerOf(s, u.id, e.id))).join('')}
        ${cases.length ? card({ title: 'Case study for this unit', flush: true, body: `<div class="list">${cases.map(c => `<a class="list-item" href="#/student/case/${c.id}"><span class="li-icon accent">${icon('briefcase')}</span><div class="grow"><div class="title">${esc(c.title)}</div><div class="meta">${c.minutes} min · ${S.caseTasks(s, c.id).length} tasks</div></div>${icon('chevron-right', 'faint')}</a>`).join('')}</div>` }) : ''}
      </div>`,
      mount: () => mountMedia(),
    };
  }
  const all = S.workbookProgress(s, u.id, released);
  return {
    title: 'Workbook',
    html: `<div class="page">${pageHead('Workbook', 'Practise each unit: sort, order, calculate and write. Auto-checked exercises give instant feedback; written answers are marked by your lecturer.')}
      <div class="grid"><div class="span-4">${kpi({ label: 'Completed', value: `${all.pct}%`, sub: `${all.done} of ${all.total} exercises in released units`, iconName: 'book-check' })}</div>
        <div class="span-4">${kpi({ label: 'Accuracy', value: all.accuracy === null ? '—' : `${all.accuracy}%`, sub: 'Auto-checked and marked work', iconName: 'target', tone: all.accuracy !== null && all.accuracy < 60 ? 'warn' : 'ok' })}</div>
        <div class="span-4">${kpi({ label: 'Waiting for marking', value: String(all.pending), sub: 'Written and spoken answers', iconName: 'hourglass' })}</div></div>
      ${card({ title: 'My four skills', subtitle: 'Average score in released units · reading and listening are auto-checked; speaking and writing are marked by your lecturer', body: skillBars(S.skillProfile(s, [u.id], released)) })}
      ${card({ title: 'Units', flush: true, body: `<div class="list">${cur.map((uid, i) => {
        const unit = S.unitById(s, uid); const open = released.includes(uid); const p = S.workbookProgress(s, u.id, [uid]);
        return open ? `<a class="list-item" href="#/student/workbook/${uid}"><span class="faint small" style="width:34px">W${i + 1}</span>${subjectChip(s, unit.subject)}<div class="grow"><div class="title">${esc(unit.title)}</div><div class="meta">${p.done}/${p.total} done${p.accuracy !== null ? ` · ${p.accuracy}%` : ''}${p.pending ? ` · ${p.pending} waiting` : ''}</div></div><div style="width:120px" class="hide-sm">${progress(p.pct, p.pct === 100 ? 'ok' : '')}</div></a>`
          : `<div class="list-item"><span class="faint small" style="width:34px">W${i + 1}</span>${subjectChip(s, unit.subject)}<div class="grow"><div class="title" style="color:var(--text-2)">${esc(unit.title)}</div><div class="meta">Opens ${S.fmtDate(S.weekStartOf(s, i + 1))}</div></div>${icon('lock', 'faint')}</div>`;
      }).join('')}</div>` })}</div>`,
  };
}

export function exhibitHtml(x) {
  if (!x) return '';
  return `<figure class="exhibit"><figcaption>${esc(x.title)}</figcaption><div class="table-wrap"><table class="table"><thead><tr>${x.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${x.rows.map(r => `<tr>${r.map((c, i) => `<td class="${i ? 'num' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${x.note ? `<div class="small faint" style="padding:8px 12px">${esc(x.note)}</div>` : ''}</figure>`;
}
function caseBody(c) { return `<div class="prose">${c.body.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('')}</div>`; }

export function studentCases(s, id, u) {
  const units = S.curriculumOfSection(s, u.sectionId);
  const released = S.releasedUnits(s, u.sectionId);
  if (id) {
    const c = S.resourceById(s, id);
    if (!c?.full || !released.includes(c.unitId)) return { title: 'Case study', html: card({ body: empty('lock', 'This case is not available yet', '', '<a class="btn mt-3" href="#/student/cases">Back</a>') }) };
    const tasks = S.caseTasks(s, c.id);
    return {
      title: c.title,
      html: `<div class="page" style="max-width:1100px">${pageHead(esc(c.title), `Case study · ${c.unitId} · about ${c.minutes} minutes`, `<a class="btn" href="#/student/cases">${icon('arrow-left')} Cases</a><a class="btn" href="#/print/case/${c.id}" target="_blank">${icon('printer')} Print</a>`)}
        ${bentoGrid(s, c, { mode: 'student', me: u })}</div>`,
      mount: () => mountMedia(),
    };
  }
  const list = S.fullCases(s).filter(c => units.includes(c.unitId));
  return {
    title: 'Case studies',
    html: `<div class="page">${pageHead('Case studies', 'Real business situations with data. Calculate, analyse and recommend.')}
      <div class="case-grid">${list.map(c => { const open = released.includes(c.unitId); const t = S.caseTasks(s, c.id); const done = t.filter(e => S.answerOf(s, u.id, e.id)).length; const unit = S.unitById(s, c.unitId);
        return `<${open ? `a href="#/student/case/${c.id}"` : 'div'} class="case-card ${open ? '' : 'locked'}"><div class="row gap-2">${subjectChip(s, unit.subject)}<span class="chip">${c.unitId} · week ${units.indexOf(c.unitId) + 1}</span></div><h3>${esc(c.title)}</h3><p class="small muted">${esc(c.body.slice(0, 140))}…</p>
          <div class="row between small"><span>${icon('clock')} ${c.minutes} min · ${t.length} tasks</span>${open ? `<span>${done}/${t.length} done</span>` : `<span class="faint">${icon('lock')} Opens week ${units.indexOf(c.unitId) + 1}</span>`}</div></${open ? 'a' : 'div'}>`; }).join('')}</div></div>`,
  };
}

/* ---------------- lecturer pages ---------------- */
const lui = { section: null, markSection: null, skill: '', level: '', unit: '' };
function lecturerScope(s, u) {
  const secs = S.sectionsForUser(s, u);
  if (!secs.some(x => x.id === lui.section)) lui.section = secs[0]?.id || null;
  return { secs, sec: S.sectionById(s, lui.section) };
}
const sectionPicker = (secs) => secs.length > 1 ? `<select class="select select-sm" data-change="wbl-section">${secs.map(x => `<option value="${x.id}" ${x.id === lui.section ? 'selected' : ''}>${esc(x.code)}</option>`).join('')}</select>` : '';

export function lecturerWorkbook(s, unitId, u) {
  const { secs, sec } = lecturerScope(s, u);
  if (!sec) return { title: 'Workbook', html: card({ body: empty('book', 'No classes') }) };
  const cur = S.curriculumOfSection(s, sec.id);
  const studs = sec.studentIds;
  if (unitId === 'skills') return skillBank(s, sec, secs, cur);
  if (unitId) {
    const unit = S.unitById(s, unitId);
    const ex = S.unitExercises(s, unitId);
    return {
      title: `Lecturer edition · ${unitId}`,
      html: `<div class="page" style="max-width:980px">${pageHead(`${esc(unit.id)} · ${esc(unit.title)}`, `Lecturer edition · answers, solutions, marking guide · class ${esc(sec.code)}`, `<a class="btn" href="#/instructor/workbook">${icon('arrow-left')} Workbook</a><a class="btn" href="#/print/workbook/${unit.id}" target="_blank">${icon('printer')} Student edition</a><a class="btn btn-primary" href="#/print/workbook/${unit.id}?ed=lecturer" target="_blank">${icon('printer')} Lecturer edition</a>`)}
        <div class="note note-info">${icon('presentation')}<div><strong>Teaching tip:</strong> set the auto-checked exercises as homework before class; use class time for the written task and the case study. Exercises with low % correct are worth reviewing together.</div></div>
        ${ex.map((e, i) => caseIntro(ex, i, false, true) + lecturerExercise(s, e, i + 1, S.exerciseStats(s, e.id, studs))).join('')}</div>`,
      mount: () => mountMedia(),
    };
  }
  const rows = cur.map((uid, i) => {
    const unit = S.unitById(s, uid); const ex = S.unitExercises(s, uid);
    const stats = ex.map(e => S.exerciseStats(s, e.id, studs));
    const att = stats.reduce((t, x) => t + x.attempted, 0); const max = ex.length * studs.length;
    const pcts = stats.map(x => x.pct).filter(v => v !== null);
    const acc = pcts.length ? Math.round(pcts.reduce((t, v) => t + v, 0) / pcts.length) : null;
    const pend = stats.reduce((t, x) => t + x.pending, 0);
    return `<tr class="click" data-action="go" data-href="#/instructor/workbook/${uid}"><td class="num faint">W${i + 1}</td><td><div class="row gap-2">${subjectChip(s, unit.subject)}<strong>${esc(unit.title)}</strong></div></td><td class="num">${ex.length}</td>
      <td style="width:160px">${i + 1 <= s.clock.week ? `<div class="row gap-2">${progress(max ? (att / max) * 100 : 0)}<span class="small">${max ? Math.round((att / max) * 100) : 0}%</span></div>` : '<span class="faint small">Not released</span>'}</td>
      <td class="num">${acc === null ? '—' : `<span class="${acc < 60 ? 't-danger' : ''}">${acc}%</span>`}</td><td class="num">${pend ? badge('warn', String(pend)) : '—'}</td><td class="num">${icon('chevron-right', 'faint')}</td></tr>`;
  }).join('');
  const queue = S.pendingMarking(s, [sec], u.id).length;
  return {
    title: 'Workbook',
    html: `<div class="page">${pageHead('Workbook', `Lecturer edition for ${esc(sec.code)} · ${s.exercises.filter(e => !e.caseId && cur.includes(e.unitId)).length} exercises in this programme`, `${sectionPicker(secs)}${queue ? `<button class="btn btn-primary" data-action="wbl-mark-next" data-section="${sec.id}">${icon('clipboard-pen')} Mark ${sec.code} (${queue})</button>` : ''}`)}
      ${wbTabs('wb')}
      ${card({ flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th class="num">Week</th><th>Unit</th><th class="num">Exercises</th><th>Class completion</th><th class="num">Accuracy</th><th class="num">To mark</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` })}</div>`,
  };
}

const wbTabs = (on) => `<div class="tabs page-tabs">${[['wb', '#/instructor/workbook', 'notebook-pen', 'Workbook'], ['skills', '#/instructor/workbook/skills', 'languages', '4-skill bank'], ['cases', '#/instructor/cases', 'briefcase', 'Case studies']].map(([k, h, ic, l]) => `<a class="tab-link ${on === k ? 'active' : ''}" href="${h}">${icon(ic)} ${l}</a>`).join('')}</div>`;

/** Every unit exercise tagged by skill and CEFR level: filter it, see coverage gaps, and see how the class does per skill. */
function skillBank(s, sec, secs, cur) {
  const pool = s.exercises.filter(e => !e.caseId && cur.includes(e.unitId));
  const levels = [...new Set(pool.map(e => e.level).filter(Boolean))].sort();
  const pick = pool.filter(e => (!lui.skill || S.skillOf(e) === lui.skill) && (!lui.level || e.level === lui.level) && (!lui.unit || e.unitId === lui.unit));
  const count = (uid, k) => pool.filter(e => e.unitId === uid && S.skillOf(e) === k && (!lui.level || e.level === lui.level)).length;
  const pack = pool.filter(e => e.pack);
  const packUnits = [...new Set(pack.map(e => e.unitId))];
  const sel = (k, opts, all) => `<select class="select select-sm" data-change="wbl-filter" data-k="${k}"><option value="">${all}</option>${opts.map(([v, l]) => `<option value="${v}" ${lui[k] === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  const shown = pick.slice(0, 40);
  return {
    title: '4-skill bank',
    html: `<div class="page">${pageHead('4-skill bank', `Every workbook exercise in ${esc(sec.code)}'s programme, tagged by language skill and CEFR level. Filter to build a lesson or a course for a target group.`, sectionPicker(secs))}
      ${wbTabs('skills')}
      <div class="grid">
        <div class="span-7">${card({ title: 'English for Economics & Business · Level 1 (CEFR B1)', subtitle: `${packUnits.length} units · four skills plus vocabulary & grammar · ${pack.length} exercises`, body: `<p class="small muted">One unit per core subject. Each unit has a reading text and a listening recording with auto-checked questions, a 1-minute speaking task recorded in the browser, and a short business email or memo. Speaking and writing go to your marking queue.</p>
          <div class="row gap-2 wrap mt-3">${packUnits.map(uid => `<a class="btn btn-sm" href="#/instructor/workbook/${uid}">${uid} · ${esc(S.unitById(s, uid).title)}</a>`).join('')}</div>
          <button class="btn btn-primary btn-sm mt-3" data-action="wbl-filter-set" data-level="B1" data-skill="" data-unit="">${icon('filter')} Show the B1 pack</button>` })}</div>
        <div class="span-5">${card({ title: `Class ${esc(sec.code)} · four skills`, subtitle: 'Average score in released units', body: skillBars(S.skillProfile(s, sec.studentIds, S.releasedUnits(s, sec.id))) })}</div>
      </div>
      ${card({ title: 'Coverage by unit', subtitle: `Exercises per skill${lui.level ? ` at ${lui.level}` : ''} · click a number to list them · a dash is a gap to fill`, flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th class="num">Week</th><th>Unit</th>${Object.values(S.SKILLS).map(([l, ic]) => `<th class="num">${icon(ic)} ${l}</th>`).join('')}</tr></thead><tbody>${cur.map((uid, i) => `<tr><td class="num faint">W${i + 1}</td><td><div class="row gap-2">${subjectChip(s, S.unitById(s, uid).subject)}<span>${esc(S.unitById(s, uid).title)}</span></div></td>${Object.keys(S.SKILLS).map(k => { const n = count(uid, k); return `<td class="num">${n ? `<button class="btn btn-ghost btn-sm ${lui.unit === uid && lui.skill === k ? 'active' : ''}" data-action="wbl-filter-set" data-unit="${uid}" data-skill="${k}" data-level="${lui.level}">${n}</button>` : '<span class="faint">—</span>'}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>` })}
      <div class="row gap-2 wrap mt-4">${sel('skill', Object.entries(S.SKILLS).map(([k, [l]]) => [k, l]), 'All skills')}${sel('level', levels.map(l => [l, 'CEFR ' + l]), 'All levels')}${sel('unit', cur.map(uid => [uid, uid + ' · ' + S.unitById(s, uid).title]), 'All units')}
        <span class="small muted">${pick.length} exercise(s)${pick.length > shown.length ? ` · showing the first ${shown.length}` : ''}</span>${lui.skill || lui.level || lui.unit ? `<button class="btn btn-ghost btn-sm" data-action="wbl-filter-set" data-skill="" data-level="" data-unit="">${icon('x')} Clear</button>` : ''}</div>
      <div class="mt-3">${shown.length ? shown.map((e, i) => `<div class="small faint mt-3">${e.unitId} · ${esc(S.unitById(s, e.unitId).title)}</div>${caseIntro(shown, i, false, true)}${lecturerExercise(s, e, i + 1, S.exerciseStats(s, e.id, sec.studentIds))}`).join('') : card({ body: empty('search-x', 'No exercises match these filters') })}</div></div>`,
  };
}

export function lecturerCases(s, id, u) {
  const { sec } = lecturerScope(s, u);
  if (id) {
    const c = S.resourceById(s, id);
    if (!c?.full) return { title: 'Case', html: card({ body: empty('file-x', 'Case not found') }) };
    const tasks = S.caseTasks(s, c.id);
    return {
      title: c.title,
      html: `<div class="page" style="max-width:1100px">${pageHead(esc(c.title), `Case study · ${c.unitId} · ${c.minutes} min · lecturer edition`, `<a class="btn" href="#/instructor/cases">${icon('arrow-left')} Cases</a><a class="btn" href="#/instructor/caseedit/${c.id}">${icon('layout-grid')} Edit layout</a><a class="btn" href="#/print/case/${c.id}" target="_blank">${icon('printer')} Student copy</a><a class="btn btn-primary" href="#/print/case/${c.id}?ed=lecturer" target="_blank">${icon('printer')} Teaching notes</a>`)}
        ${c.notes?.timing?.length ? card({ title: 'Teaching notes', body: `<div class="grid" style="gap:16px"><div class="span-4"><h4>Lesson plan</h4><ul class="tight">${c.notes.timing.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><div class="span-4"><h4>Key points to draw out</h4><ul class="tight">${c.notes.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><div class="span-4"><h4>Extension</h4><p class="small">${esc(c.notes.extension)}</p></div></div>` }) : ''}
        ${bentoGrid(s, c, { mode: 'lecturer', me: u, stats: sec ? sec.studentIds : null })}</div>`,
      mount: () => mountMedia(),
    };
  }
  return {
    title: 'Case studies',
    html: `<div class="page">${pageHead('Case studies', 'Full cases with data exhibits, student tasks, answers and teaching notes. Add them to lessons from the Library.', `<button class="btn btn-primary" data-action="case-new">${icon('plus')} New case</button>`)}
      ${wbTabs('cases')}
      <div class="case-grid">${S.fullCases(s).map(c => { const unit = S.unitById(s, c.unitId); return `<a href="#/instructor/cases/${c.id}" class="case-card"><div class="row gap-2">${subjectChip(s, unit.subject)}<span class="chip">${c.unitId}</span>${c.isNew ? badge('accent', 'New') : ''}</div><h3>${esc(c.title)}</h3><p class="small muted">${esc(c.body.slice(0, 140))}…</p><div class="row between small"><span>${icon('clock')} ${c.minutes} min · ${S.caseTasks(s, c.id).length} tasks</span><span>${icon('table')} Exhibit</span></div></a>`; }).join('')}</div></div>`,
  };
}

/** Written answers waiting for this lecturer; scope = one class, or all classes when null. */
const markQueue = (s) => S.pendingMarking(s, lui.markSection ? [S.sectionById(s, lui.markSection)] : S.sectionsForUser(s, me()), me().id);

function openMarking(answerId) {
  const s = getState(); const a = s.workbookAnswers.find(x => x.id === answerId);
  if (!a) return;
  const e = S.exerciseById(s, a.exerciseId); const st = S.userById(s, a.studentId);
  const left = markQueue(s).length;
  openModal(`${modalHead(`Mark · ${esc(e.title)}`, `${esc(st.name)} · ${esc(S.sectionById(s, st.sectionId).code)} · ${left} left in queue`)}
    <form data-submit="wbl-save"><input type="hidden" name="id" value="${a.id}"><div class="modal-body">
      <div><div class="small muted">Task</div><p>${esc(e.prompt)}</p></div>
      <div class="student-answer">${a.media ? `<div class="small muted">Recording</div><audio controls preload="none" data-media="${esc(a.media)}" style="width:100%"></audio>` : ''}${a.value ? `<div class="small muted">${e.speak ? 'Typed instead of recording' : 'Student answer'} · ${String(a.value).trim().split(/\s+/).length} words</div><p>${esc(a.value)}</p>` : ''}</div>
      <div class="answer-box">${answerHtml(e)}</div>
      <div class="field"><span>Mark</span><div class="row gap-2 wrap">${[0, 1, 2, 3, 4].map(n => `<label class="opt" style="margin:0"><input type="radio" name="score" value="${n}" required> <strong>${n}</strong></label>`).join('')}</div></div>
      <label class="field"><span>Feedback to the student</span><textarea class="textarea" name="feedback" style="min-height:70px" placeholder="What was good, and one thing to improve"></textarea></label>
      <div class="row gap-2 wrap">${['Clear and well applied — good use of the unit concepts.', 'Good start — add a specific example or figure from the case.', 'Too general — use the key terms from the unit and explain the link.'].map(t => `<button type="button" class="chip" data-action="wbl-quick" data-text="${esc(t)}">${esc(t.split(' — ')[0])}</button>`).join('')}</div>
    </div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Close</button><button class="btn btn-primary">${icon('save')} Save & next</button></footer></form>`, { wide: true });
  mountMedia();
}

/* ---------------- printable documents ---------------- */
export function printView(s, kind, id, u) {
  const lecturer = new URLSearchParams(location.hash.split('?')[1] || '').get('ed') === 'lecturer' && u.role !== 'student';
  const head = (title, sub) => `<header class="doc-head"><div class="doc-brand"><span class="l1">${esc(BRAND.shortName)}</span><span class="l2">UNIVERSITY</span></div><div><div class="doc-kicker">${esc(s.course.title)} · ${lecturer ? 'Lecturer edition' : 'Student edition'}</div><h1>${title}</h1><div class="doc-sub">${sub}</div></div></header>`;
  const studentBox = lecturer ? '' : '<div class="doc-fields"><span>Name: ____________________________</span><span>Student ID: ______________</span><span>Class: __________</span></div>';
  const exHtml = (e, n) => {
    let body = '';
    if (e.type === 'mcq') body = `<ol class="doc-opts">${e.options.map((o, oi) => `<li class="${lecturer && oi === e.answerIndex ? 'key' : ''}"><span>${'ABCD'[oi]}.</span> ${esc(o)}</li>`).join('')}</ol>`;
    else if (e.type === 'classify') body = `<table class="doc-table"><thead><tr><th>Item</th><th>${e.categories.map(esc).join(' / ')}</th></tr></thead><tbody>${e.items.map(([t, c]) => `<tr><td>${esc(t)}</td><td>${lecturer ? `<strong>${esc(e.categories[c])}</strong>` : ''}</td></tr>`).join('')}</tbody></table>`;
    else if (e.type === 'order') { const sh = shuffled(e.steps.length, e.id); body = `<table class="doc-table"><tbody>${sh.map(si => `<tr><td style="width:46px">${lecturer ? `<strong>${si + 1}</strong>` : '☐'}</td><td>${esc(e.steps[si])}</td></tr>`).join('')}</tbody></table>`; }
    else if (e.type === 'numeric') body = lecturer ? `<div class="doc-answer"><strong>${fmtNum(e.answer)} ${esc(e.unit || '')}</strong> — ${esc(e.solution)}</div>` : '<div class="doc-working">Working:</div><div class="doc-line">Answer: ______________ ' + esc(e.unit || '') + '</div>';
    else body = lecturer ? `<div class="doc-answer"><strong>Model answer:</strong> ${esc(e.model)}<br><strong>Marking (4):</strong> ${e.marking.map(esc).join('; ')}.</div>` : `<div class="doc-lines">${'<div></div>'.repeat(Math.ceil(e.words / 18))}</div>`;
    return `<div class="doc-q"><div class="doc-qh"><span>${n}. ${esc(e.title)}</span><span class="doc-type">${S.SKILLS[S.skillOf(e)][0]} · ${typeOf(e)[0]}</span></div><p>${esc(e.prompt)}</p>${body}${lecturer && e.type !== 'numeric' && e.type !== 'written' ? `<div class="doc-answer">${esc(e.solution)}</div>` : ''}</div>`;
  };
  let html = '';
  if (kind === 'workbook') {
    const units = id.startsWith('P-') ? S.activeVersion(S.programById(s, id)).unitIds : [id];
    html = units.map((uid, ui) => { const unit = S.unitById(s, uid); return `<section class="doc-page">${head(`Workbook · ${esc(unit.id)} ${esc(unit.title)}`, esc(unit.summary))}${ui === 0 ? studentBox : ''}${S.unitExercises(s, uid).map((e, i, all) => caseIntro(all, i, true, lecturer) + exHtml(e, i + 1)).join('')}</section>`; }).join('');
  } else if (kind === 'case') {
    const c = S.resourceById(s, id);
    let qn = 0;
    const tilePrint = (t) => t.kind === 'text' ? `${t.title ? `<h3>${esc(t.title)}</h3>` : ''}<div class="prose">${richText(t.body)}</div>` : t.kind === 'image' && t.src ? `<figure class="doc-fig"><img src="${esc(t.src)}" alt="">${t.caption ? `<figcaption>${esc(t.caption)}</figcaption>` : ''}</figure>` : t.kind === 'image' ? `<figure class="doc-fig"><img data-media="${esc(t.media.key)}" alt="">${t.caption ? `<figcaption>${esc(t.caption)}</figcaption>` : ''}</figure>` : t.kind === 'audio' ? `<div class="doc-instr"><strong>Listening · ${esc(t.title || '')}</strong>${lecturer && t.transcript ? `<br>${esc(t.transcript)}` : ''}</div>` : t.kind === 'exhibit' ? exhibitHtml(t.table) : t.kind === 'question' && S.exerciseById(s, t.exerciseId) ? exHtml(S.exerciseById(s, t.exerciseId), ++qn) : '';
    html = `<section class="doc-page">${head(`Case study · ${esc(c.title)}`, `${c.unitId} · ${c.minutes} minutes`)}${studentBox}${layoutOf(s, c).map(tilePrint).join('')}
      ${lecturer && c.notes?.timing?.length ? `<h2>Teaching notes</h2><h3>Lesson plan</h3><ul>${c.notes.timing.map(t => `<li>${esc(t)}</li>`).join('')}</ul><h3>Key points</h3><ul>${c.notes.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul><h3>Extension</h3><p>${esc(c.notes.extension)}</p>` : ''}</section>`;
  } else if (kind === 'exam') {
    const ex = S.examById(s, id); let n = 0;
    const L = ['A', 'B', 'C', 'D'];
    const vB = new URLSearchParams(location.hash.split('?')[1] || '').get('v') === 'B';
    // version B: same questions, order shuffled per part and options shuffled per question (deterministic)
    const order = (p) => vB ? shuffled(p.items.length, ex.id + p.id + 'B').map(i => p.items[i]) : p.items;
    const opts = (q) => vB ? shuffled(q.options.length, q.id + 'B') : q.options.map((_, i) => i);
    const keyOf = (q) => L[opts(q).indexOf(q.answerIndex)];
    html = `<section class="doc-page">${head(`${esc(ex.title)}${vB ? ' · Version B' : ' · Version A'}`, `${esc(S.orgById(s, ex.programId).name)} · ${ex.durationMin} minutes · ${S.examStats(s, ex).count} questions · ${esc(s.term.title)}`)}${studentBox}
      ${lecturer ? '' : `<div class="doc-instr"><strong>Instructions.</strong> Answer all questions. Circle one letter for each question. No marks are deducted for wrong answers. Calculators are allowed.</div>`}
      ${ex.parts.map(p => `<h2>${esc(p.title)}</h2><p class="small">${esc(p.instructions)}</p>${order(p).map(it => { const q = S.questionById(s, it.questionId); n++; const u2 = S.unitById(s, q.unitId);
        return `<div class="doc-q"><div class="doc-qh"><span>${n}. ${esc(q.stem)}</span>${lecturer ? `<span class="doc-type">${u2.id} · ${q.bloomLevel}</span>` : `<span class="doc-type">${it.points || 1} mark</span>`}</div><ol class="doc-opts">${opts(q).map((oi, pos) => `<li class="${lecturer && oi === q.answerIndex ? 'key' : ''}"><span>${L[pos]}.</span> ${esc(q.options[oi])}</li>`).join('')}</ol></div>`; }).join('')}`).join('')}
      ${lecturer ? `<h2>Answer key</h2><table class="doc-table"><thead><tr><th>Q</th><th>Answer</th><th>Unit</th><th>Subject</th><th>Level</th></tr></thead><tbody>${ex.parts.flatMap(order).map(it => it.questionId).map((qid, i) => { const q = S.questionById(s, qid); const u2 = S.unitById(s, q.unitId); return `<tr><td>${i + 1}</td><td><strong>${keyOf(q)}</strong></td><td>${u2.id}</td><td>${esc(s.subjects[u2.subject].label)}</td><td>${q.bloomLevel}</td></tr>`; }).join('')}</tbody></table>` : ''}</section>`;
  } else html = empty('file-x', 'Nothing to print');
  return `<div class="doc"><div class="doc-toolbar no-print"><button class="btn btn-primary" onclick="window.print()">${icon('printer')} Print / Save as PDF</button><button class="btn" onclick="history.length > 1 ? history.back() : window.close()">${icon('x')} Close</button><span class="small muted">Tip: choose "Save as PDF" in the print dialog.</span></div>${html}</div>`;
}

/* ---------------- actions ---------------- */
export const actions = {
  'wb-num': (el) => { draft[el.dataset.id] = el.value; },
  'wb-mcq': (el) => { draft[el.dataset.id] = Number(el.value); delete lastCheck[el.dataset.id]; },
  'wb-cls': (el) => { const e = S.exerciseById(getState(), el.dataset.id); const v = draft[e.id] || e.items.map(() => ''); v[Number(el.dataset.i)] = el.value; draft[e.id] = v; delete lastCheck[e.id]; },
  'wb-text': (el) => { draft[el.dataset.id] = el.value; },
  'wb-move': (el) => { const v = draft[el.dataset.id]; const i = Number(el.dataset.pos), j = i + Number(el.dataset.d); [v[i], v[j]] = [v[j], v[i]]; delete lastCheck[el.dataset.id]; rerender(); },
  'wb-check': (el) => {
    const s = getState(); const e = S.exerciseById(s, el.dataset.id);
    const card = document.getElementById(`ex-${e.id}`);
    if (e.type === 'mcq') { const r0 = card.querySelector('input[type=radio]:checked'); if (!r0) { toast('Choose an answer', 'warn'); return; } draft[e.id] = Number(r0.value); }
    if (e.type === 'numeric') draft[e.id] = card.querySelector('input').value;
    if (e.type === 'classify') { draft[e.id] = [...card.querySelectorAll('select')].map(x => x.value); if (draft[e.id].some(v => v === '')) { toast('Choose a category for every item', 'warn'); return; } }
    if (e.type === 'numeric' && String(draft[e.id] ?? '').trim() === '') { toast('Enter your answer', 'warn'); return; }
    const value = e.type === 'classify' ? draft[e.id].map(Number) : e.type === 'numeric' ? Number(String(draft[e.id]).replace(/,/g, '')) : draft[e.id];
    const r = dispatch('WORKBOOK_ANSWERED', { exerciseId: e.id, value });
    if (!r) return;
    lastCheck[e.id] = r;
    if (r.correct) { toast('Correct!'); delete draft[e.id]; }
    rerender();
  },
  'wb-submit': (el) => {
    const card = document.getElementById(`ex-${el.dataset.id}`);
    const value = card.querySelector('textarea').value;
    const media = draft[el.dataset.id + '#rec'] ?? S.answerOf(getState(), me().id, el.dataset.id)?.media ?? null;
    if (dispatch('WORKBOOK_ANSWERED', { exerciseId: el.dataset.id, value, media })) { delete draft[el.dataset.id]; delete draft[el.dataset.id + '#rec']; }
  },
  'wb-rec-start': async (el) => {
    if (rec.mr) return;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('Recording is not supported in this browser — type your answer instead', 'warn'); return; }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch { toast('Microphone not available — type your answer instead', 'warn'); return; }
    const chunks = []; const mr = new MediaRecorder(stream); const id = el.dataset.id;
    mr.ondataavailable = (ev) => chunks.push(ev.data);
    mr.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const key = `rec-${id}-${me().id}-${Date.now()}`; // new key per take: cached object URLs never go stale
      try { await putFile(key, new Blob(chunks, { type: mr.mimeType || 'audio/webm' })); draft[id + '#rec'] = key; } catch { toast('Could not save the recording in this browser', 'warn'); }
      Object.assign(rec, { id: null, mr: null }); rerender();
    };
    Object.assign(rec, { id, mr, t0: Date.now() }); mr.start(); rerender();
  },
  'wb-rec-stop': () => { if (Date.now() - rec.t0 < 1500) { toast('Speak a little longer', 'warn'); return; } rec.mr?.stop(); },
  'wbl-section': (el) => { lui.section = el.value; rerender(); },
  'wbl-filter': (el) => { lui[el.dataset.k] = el.value; rerender(); },
  'wbl-filter-set': (el) => { Object.assign(lui, { skill: el.dataset.skill, level: el.dataset.level, unit: el.dataset.unit }); rerender(); },
  'wbl-mark': (el) => openMarking(el.dataset.id),
  // From the gradebook: mark one student's answers, or work through a class / all classes.
  'wbl-mark-next': (el) => {
    lui.markSection = el.dataset.section || null;
    const s = getState();
    const q = markQueue(s).filter(a => !el.dataset.student || a.studentId === el.dataset.student);
    if (q[0]) openMarking(q[0].id); else toast('Nothing to mark', 'ok');
  },
  'wbl-quick': (el) => { const ta = el.closest('form').querySelector('textarea[name="feedback"]'); ta.value = el.dataset.text; },
  'wbl-save': (form, data) => {
    if (!dispatch('WORKBOOK_GRADED', { answerId: data.get('id'), score: data.get('score'), feedback: data.get('feedback') })) return;
    const next = markQueue(getState())[0];
    if (next) openMarking(next.id); else { closeModal(); toast(lui.markSection ? 'This class is fully marked' : 'Queue empty — all marked'); }
  },
};

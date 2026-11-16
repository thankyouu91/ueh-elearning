// Exam studio: build an exam paper together. Owner (Dean / Academic Affairs) sets the blueprint and invites co-editors;
// co-editors add and write questions, comment and sign off; the owner locks and schedules it.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState, newId } from '../store.js';
import { esc, icon, badge, card, empty, pageHead, subjectChip, avatar, openModal, closeModal, modalHead, confirmDialog, toast, ASSESS_META } from '../ui.js';
import { lessonHistory } from './shared.js';

const BLOOM = ['Remember', 'Understand', 'Apply', 'Analyze'];
const STATUS_LABEL = { draft: 'Draft', review: 'In review', submitted: 'Waiting for the Dean', locked: 'Locked', scheduled: 'Scheduled' };
const STATUS_TONE = { draft: 'neutral', review: 'info', submitted: 'warn', locked: 'accent', scheduled: 'ok' };
const bankUi = { unit: '', subject: '', bloom: '', q: '', part: null };
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
const base = () => `#/${S.currentUser(getState()).role}/studio`;
const stBadge = (st) => badge(STATUS_TONE[st], STATUS_LABEL[st]);

export function studioView(s, id, me) {
  return id ? editor(s, id, me) : list(s, me);
}

/* ---------------- list ---------------- */
function list(s, me) {
  const exams = S.examsForUser(s, me);
  const canCreate = ['director', 'provost', 'instructor'].includes(me.role);
  const myTurn = (ex) => (ex.status === 'review' && ex.coEditors.some(c => c.userId === me.id && !c.signedOff)) || (ex.status === 'submitted' && S.examApprover(s, me, ex));
  return {
    title: 'Exam studio',
    html: `<div class="page">${pageHead('Exam studio', me.role === 'instructor' ? 'Write a paper for your classes, invite colleagues if you like, then send it to the Dean. The Dean approves and schedules it.' : 'Build exam papers with your lecturers: set the blueprint, invite co-editors, review together, lock and schedule. Papers written by lecturers come here for your approval.', canCreate ? `<button class="btn btn-primary" data-action="ex-new">${icon('plus')} New exam paper</button>` : '')}
      ${card({ flush: true, body: exams.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>Exam</th><th>Programme</th><th>Owner</th><th>Co-editors</th><th class="num">Questions</th><th>Status</th><th>Last edit</th><th></th></tr></thead><tbody>
        ${exams.map(ex => { const st = S.examStats(s, ex); return `<tr class="click" data-action="go" data-href="${base()}/${ex.id}"><td><strong>${esc(ex.title)}</strong><div class="small faint">${ASSESS_META[ex.type].label}, ${ex.durationMin} min</div></td>
          <td class="small">${esc(S.orgById(s, ex.programId).name)}</td><td class="small">${esc(S.userById(s, ex.ownerId).name)}</td>
          <td><div class="row" style="gap:2px">${ex.coEditors.map(c => `<span title="${esc(S.userById(s, c.userId).name)}${c.signedOff ? ' — signed off' : ''}" class="${c.signedOff ? 'av-ok' : ''}">${avatar(S.userById(s, c.userId), 'sm')}</span>`).join('') || '<span class="faint small">—</span>'}</div></td>
          <td class="num">${st.count}/${ex.targets.total}</td><td>${stBadge(ex.status)}${myTurn(ex) ? ` <span class="badge b-warn">${ex.status === 'submitted' ? 'Your approval' : 'Your sign-off'}</span>` : ''}</td>
          <td class="small">${esc(S.userById(s, ex.lastEdit.by).name)}, ${S.relTime(s, ex.lastEdit.at)}</td><td class="num">${icon('chevron-right', 'faint')}</td></tr>`; }).join('')}</tbody></table></div>` : empty('pen-tool', 'No exams yet', me.role === 'instructor' ? 'Create a paper, or wait for a Dean to invite you.' : 'Create the first paper.') })}
      ${canCreate && me.role !== 'instructor' ? bankOverview(s, me) : ''}
    </div>`,
  };
}

function bankOverview(s, me) {
  const units = new Set(S.programsUnder(s, me.orgId).flatMap(p => S.activeVersion(p).unitIds));
  const qs = s.questions.filter(q => units.has(q.unitId));
  const byUnit = [...units].map(u => ({ u: S.unitById(s, u), n: qs.filter(q => q.unitId === u).length })).sort((a, b) => a.n - b.n);
  return card({ title: `Question bank coverage, ${qs.length} questions`, subtitle: 'Units with few questions limit how many papers you can build', body: `<div class="row gap-2 wrap">${byUnit.map(({ u, n }) => `<span class="chip ${n < 3 ? 't-warn' : ''}">${subjectChip(s, u.subject)} ${u.id}, ${n}</span>`).join('')}</div>` });
}

/* ---------------- editor ---------------- */
function editor(s, id, me) {
  const ex = S.examById(s, id);
  if (!ex || !S.examsForUser(s, me).includes(ex)) return { title: 'Exam', html: card({ body: empty('file-x', 'Exam not found', '', `<a class="btn mt-3" href="${base()}">Back</a>`) }) };
  const isOwner = ex.ownerId === me.id || me.role === 'provost';
  const dean = S.needsDeanApproval(s, ex); const approver = S.examApprover(s, me, ex);
  const decides = dean ? approver : isOwner; // who locks, unlocks and schedules
  const co = ex.coEditors.find(c => c.userId === me.id);
  const canEdit = (isOwner || !!co) && ['draft', 'review'].includes(ex.status);
  const st = S.examStats(s, ex);
  const used = new Set(S.examQuestionIds(ex));
  let n = 0;

  const parts = ex.parts.map((p, pi) => `<section class="card paper-part"><header class="card-head"><div><h3>${esc(p.title)}</h3><p class="muted">${esc(p.instructions || '')}, ${p.items.length} question${p.items.length === 1 ? '' : 's'}</p></div>
      ${canEdit ? `<div class="row gap-2"><button class="btn btn-sm" data-action="ex-bank" data-part="${p.id}">${icon('library')} Add from bank</button><button class="btn btn-sm" data-action="ex-write" data-part="${p.id}">${icon('pencil-line')} Write new</button>${ex.parts.length > 1 && !p.items.length ? `<button class="btn btn-ghost btn-sm btn-icon" data-action="ex-del-part" data-part="${p.id}" aria-label="Delete part">${icon('trash-2')}</button>` : ''}</div>` : ''}</header>
    <div class="card-body stack gap-2">${p.items.length ? p.items.map((it, ii) => {
      const q = S.questionById(s, it.questionId); n++;
      if (!q) return '';
      const u = S.unitById(s, q.unitId); const qs = S.questionStats(s, q.id);
      return `<div class="q-item"><div class="q-num">${n}</div><div class="grow">
        <div class="q-stem">${esc(q.stem)}</div>
        <ol class="q-opts" type="A">${q.options.map((o, oi) => `<li class="${oi === q.answerIndex ? 'ok' : ''}">${esc(o)}${oi === q.answerIndex ? ` ${icon('check', 't-ok')}` : ''}</li>`).join('')}</ol>
        <div class="row gap-2 wrap small">${subjectChip(s, u.subject)}<span class="chip">${u.id}</span><span class="chip">${q.bloomLevel}</span>${qs.pct !== null ? `<span class="chip" title="From ${qs.n} past answers">${qs.pct}% correct</span>` : '<span class="chip">New</span>'}${flagChips(s, q)}<span class="faint">added by ${esc(S.userById(s, it.addedBy).name)}${q.authorId ? `, written by ${esc(S.userById(s, q.authorId).name)}` : ''}</span></div></div>
        ${canEdit ? `<div class="stack gap-1"><button class="btn btn-ghost btn-sm btn-icon" data-action="ex-move" data-part="${p.id}" data-i="${ii}" data-d="-1" ${ii === 0 ? 'disabled' : ''} aria-label="Move up">${icon('arrow-up')}</button><button class="btn btn-ghost btn-sm btn-icon" data-action="ex-move" data-part="${p.id}" data-i="${ii}" data-d="1" ${ii === p.items.length - 1 ? 'disabled' : ''} aria-label="Move down">${icon('arrow-down')}</button><button class="btn btn-ghost btn-sm btn-icon" data-action="ex-remove" data-part="${p.id}" data-i="${ii}" aria-label="Remove">${icon('trash-2')}</button></div>` : ''}</div>`;
    }).join('') : empty('list-plus', 'No questions in this part yet')}</div></section>`).join('');

  const bar = (label, have, want) => `<div class="balance-row" style="grid-template-columns:96px 1fr 58px"><span class="small">${label}</span><div class="bar"><span style="width:${want ? Math.min(100, (have / want) * 100) : have ? 100 : 0}%;background:${have === want ? 'var(--ok)' : have > want ? 'var(--warn)' : 'var(--brand)'}"></span></div><span class="delta ${have === want ? 'up' : have > want ? 'down' : 'eq'}">${have}/${want}</span></div>`;
  const blueprint = card({ title: 'Blueprint', subtitle: 'Target vs. paper', actions: isOwner && canEdit ? `<button class="btn btn-ghost btn-sm" data-action="ex-settings">${icon('settings-2')}</button>` : '', body: `<div class="stack gap-2">
      ${bar('<strong>Total</strong>', st.count, ex.targets.total)}
      <div class="nav-label" style="padding:6px 0 0">By subject</div>${Object.entries(ex.targets.subjects).filter(([k, v]) => v || st.subjects[k]).map(([k, v]) => bar(subjectChip(s, k), st.subjects[k], v)).join('')}
      <div class="nav-label" style="padding:6px 0 0">By thinking level (Bloom)</div>${BLOOM.map(b => bar(b, st.bloom[b] || 0, ex.targets.bloom[b] || 0)).join('')}</div>` });

  const people = card({ title: 'Team', actions: isOwner ? `<button class="btn btn-sm" data-action="ex-invite">${icon('user-plus')} Invite</button>` : '', flush: true, body: `<div class="list">
      <div class="list-item">${avatar(S.userById(s, ex.ownerId), 'sm')}<div class="grow"><div class="title small">${esc(S.userById(s, ex.ownerId).name)}</div><div class="meta">Owner</div></div></div>
      ${ex.coEditors.map(c => `<div class="list-item">${avatar(S.userById(s, c.userId), 'sm')}<div class="grow"><div class="title small">${esc(S.userById(s, c.userId).name)}</div><div class="meta">Co-editor, ${ex.parts.flatMap(p => p.items).filter(i => i.addedBy === c.userId).length} questions added</div></div>
        ${ex.status === 'review' ? (c.signedOff ? badge('ok', 'Signed off') : badge('warn', 'Pending')) : ''}${isOwner && ex.status === 'draft' ? `<button class="btn btn-ghost btn-sm btn-icon" data-action="ex-uninvite" data-user="${c.userId}" aria-label="Remove">${icon('x')}</button>` : ''}</div>`).join('') || '<div class="list-item small muted">No co-editors yet — invite lecturers to help write the paper.</div>'}</div>` });

  const comments = card({ title: `Discussion, ${ex.comments.length}`, flush: true, body: `<div class="comments">${ex.comments.map(c => `<div class="comment">${avatar(S.userById(s, c.userId), 'sm')}<div class="grow"><div class="small"><strong>${esc(S.userById(s, c.userId).name)}</strong> <span class="faint">${S.relTime(s, c.at)}</span></div><div class="small">${esc(c.text)}</div></div></div>`).join('') || '<p class="small muted" style="padding:12px 16px">No comments yet.</p>'}</div>
    <form class="row gap-2" style="padding:12px 16px;border-top:1px solid var(--border)" data-submit="ex-comment"><input class="input" name="text" placeholder="Write a comment… (everyone on the team is notified)" autocomplete="off"><button class="btn btn-sm btn-primary">${icon('send')}</button></form>` });

  const unsigned = ex.coEditors.filter(c => !c.signedOff).length;
  const flow = {
    draft: isOwner ? `<button class="btn" data-action="ex-version">${icon('save')} Save version</button>${dean ? `${ex.coEditors.length ? `<button class="btn" data-action="ex-review">${icon('users')} Ask co-editors to review</button>` : ''}<button class="btn btn-primary" data-action="ex-submit" data-unsigned="0">${icon('send')} Send to the Dean</button>` : `<button class="btn btn-primary" data-action="ex-review">${icon('users')} Send for review</button>`}` : '',
    review: `${co && !co.signedOff ? `<button class="btn btn-primary" data-action="ex-signoff">${icon('badge-check')} Sign off</button>` : ''}${isOwner ? `<button class="btn" data-action="ex-reopen">${icon('pencil')} Back to draft</button>${dean ? `<button class="btn btn-primary" data-action="ex-submit" data-unsigned="${unsigned}">${icon('send')} Send to the Dean</button>` : `<button class="btn btn-primary" data-action="ex-lock" data-unsigned="${unsigned}">${icon('lock')} Lock paper</button>`}` : ''}`,
    submitted: approver ? `<button class="btn" data-action="ex-changes">${icon('message-square-warning')} Request changes</button><button class="btn btn-primary" data-action="ex-lock" data-unsigned="0">${icon('badge-check')} Approve & lock</button>` : '',
    locked: decides ? `<button class="btn" data-action="ex-reopen">${icon('lock-open')} Unlock</button><button class="btn btn-primary" data-action="ex-schedule">${icon('calendar-plus')} Schedule</button>` : '',
    scheduled: '',
  }[ex.status];
  const scheduled = ex.assessmentId ? S.assessmentById(s, ex.assessmentId) : null;

  return {
    title: ex.title,
    html: `<div class="page">
      ${pageHead(esc(ex.title), `${ASSESS_META[ex.type].label}, ${esc(S.orgById(s, ex.programId).name)}, ${ex.sectionIds.map(x => esc(S.sectionById(s, x).code)).join(', ')}, ${ex.durationMin} min`, `<a class="btn" href="${base()}">${icon('arrow-left')} Studio</a><button class="btn" data-action="ex-preview">${icon('eye')} Preview</button><a class="btn" href="#/print/exam/${ex.id}" target="_blank">${icon('printer')} Paper</a><a class="btn" href="#/print/exam/${ex.id}?ed=lecturer" target="_blank">${icon('key-round')} Answer key</a>${flow}`)}
      <div class="row gap-3 wrap">${stBadge(ex.status)}<span class="small muted">${icon('history')} Last edit by <strong>${esc(S.userById(s, ex.lastEdit.by).name)}</strong>, ${S.relTime(s, ex.lastEdit.at)}</span>${ex.versions.length ? `<span class="small muted">${ex.versions.length} saved version(s)</span>` : ''}${scheduled ? `<span class="chip">${icon('calendar')} Opens ${S.fmtDateTime(scheduled.opensAt)}</span>` : ''}</div>
      ${ex.status === 'submitted' ? `<div class="note ${approver ? 'note-warn' : 'note-info'}">${icon('hourglass')}<div>${approver ? `${esc(S.userById(s, ex.ownerId).name)} sent this paper for your approval. Check it, then approve or request changes.` : 'Waiting for the Dean’s approval. Editing is locked until the Dean responds.'}</div></div>` : ''}
      ${ex.status === 'draft' && ex.reviewNote ? `<div class="note note-warn">${icon('message-square-warning')}<div><strong>Changes requested:</strong> "${esc(ex.reviewNote)}"</div></div>` : ''}
      ${ex.status === 'locked' && dean && !decides ? `<div class="note note-ok">${icon('circle-check')}<div>Approved by the Dean. The Dean schedules it for your classes.</div></div>` : ''}
      ${ex.status === 'review' && co && !co.signedOff ? `<div class="note note-warn">${icon('badge-check')}<div>${esc(S.userById(s, ex.ownerId).name)} asked you to review this paper. Check the questions and sign off, or leave a comment.</div></div>` : ''}
      ${ex.status === 'review' && isOwner ? `<div class="note note-info">${icon('users')}<div>${ex.coEditors.length - unsigned}/${ex.coEditors.length} co-editors signed off. Any edit now resets sign-offs.</div></div>` : ''}
      <div class="studio"><div class="stack gap-4">${parts}${canEdit ? `<button class="btn" data-action="ex-add-part" style="align-self:flex-start">${icon('plus')} Add part</button>` : ''}</div>
        <div class="stack gap-4">${paperCheck(s, ex, st, canEdit)}${blueprint}${people}${comments}${card({ title: 'History', body: lessonHistory(s, ex) })}</div></div>
    </div>`,
  };
}

const flagChips = (s, q) => S.itemFlags(s, q).map(f => `<span class="chip chip-flag" title="Review this question">${icon('flag', 'ic-xs')} ${f}</span>`).join('');

/** Reviewer's view of the whole paper: working time, items to revisit, auto-fill and A/B versions. */
function paperCheck(s, ex, st, canEdit) {
  const est = S.examMinutes(s, ex);
  const timeNote = !st.count ? 'Add questions to estimate the working time.'
    : est > ex.durationMin ? `About ${est} min of work for a ${ex.durationMin}-minute paper — remove or simplify questions.`
    : est < ex.durationMin * 0.4 ? `About ${est} min of work for a ${ex.durationMin}-minute paper — students will finish early.`
    : `About ${est} min of work for a ${ex.durationMin}-minute paper.`;
  const flagged = []; let n = 0;
  for (const p of ex.parts) for (const it of p.items) { n++; const q = S.questionById(s, it.questionId); const f = q ? S.itemFlags(s, q) : []; if (f.length) flagged.push({ n, f }); }
  const missing = ex.targets.total - st.count;
  return card({ title: 'Paper check', subtitle: 'Time, item quality and versions', body: `<div class="stack gap-3">
      <div class="row gap-2 ${est > ex.durationMin || (st.count && est < ex.durationMin * 0.4) ? 't-warn' : ''}">${icon('timer')}<span class="small">${timeNote}</span></div>
      <div class="row gap-2 ${flagged.length ? 't-warn' : 't-ok'}">${icon(flagged.length ? 'flag' : 'circle-check')}<span class="small">${flagged.length ? `${flagged.length} question(s) to review` : 'No item warnings'}</span></div>
      ${flagged.length ? `<ul class="small flag-list">${flagged.map(x => `<li><strong>Q${x.n}</strong> <span>${x.f.join(', ')}</span></li>`).join('')}</ul>` : ''}
      ${canEdit && missing > 0 ? `<button class="btn btn-primary" data-action="ex-autofill">${icon('wand-sparkles')} Fill ${missing} gap(s) from the bank</button>` : ''}
      <div class="small muted">Printed versions — B shuffles question and option order:</div>
      <div class="row gap-2 wrap"><a class="btn btn-sm" href="#/print/exam/${ex.id}" target="_blank">Version A</a><a class="btn btn-sm" href="#/print/exam/${ex.id}?v=B" target="_blank">Version B</a><a class="btn btn-sm btn-ghost" href="#/print/exam/${ex.id}?ed=lecturer" target="_blank">${icon('key-round')} Key A</a><a class="btn btn-sm btn-ghost" href="#/print/exam/${ex.id}?ed=lecturer&v=B" target="_blank">${icon('key-round')} Key B</a></div>
    </div>` });
}

/* ---------------- modals ---------------- */
function currentExam() { return S.examById(getState(), location.hash.split('/')[3]); }
function saveParts(ex, parts, summary) { return dispatch('EXAM_ITEMS_UPDATED', { id: ex.id, parts, summary }); }
const copyParts = (ex) => ex.parts.map(p => ({ ...p, items: p.items.map(i => ({ ...i })) }));

function bankModal(partId) {
  const s = getState(); const ex = currentExam();
  bankUi.part = partId;
  const units = S.activeVersion(S.programById(s, ex.programId)).unitIds;
  const used = new Set(S.examQuestionIds(ex));
  const qs = s.questions.filter(q => units.includes(q.unitId) && !used.has(q.id)
    && (!bankUi.unit || q.unitId === bankUi.unit) && (!bankUi.subject || S.unitById(s, q.unitId).subject === bankUi.subject) && (!bankUi.bloom || q.bloomLevel === bankUi.bloom)
    && (!bankUi.q || q.stem.toLowerCase().includes(bankUi.q.toLowerCase())));
  openModal(`${modalHead('Add from the question bank', `${qs.length} available, only units in ${esc(S.orgById(s, ex.programId).name)}`)}
    <div class="modal-body">
      <div class="row gap-2 wrap"><input class="input" style="max-width:220px;height:32px" placeholder="Search…" value="${esc(bankUi.q)}" data-change="exb-q">
        <select class="select select-sm" data-change="exb-subject"><option value="">All subjects</option>${Object.entries(s.subjects).map(([k, v]) => `<option value="${k}" ${bankUi.subject === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select>
        <select class="select select-sm" data-change="exb-unit"><option value="">All units</option>${units.map(u => `<option value="${u}" ${bankUi.unit === u ? 'selected' : ''}>${u}, ${esc(S.unitById(s, u).title)}</option>`).join('')}</select>
        <select class="select select-sm" data-change="exb-bloom"><option value="">All levels</option>${BLOOM.map(b => `<option ${bankUi.bloom === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
      <form id="exb-form" data-submit="exb-add"><div class="list" style="border:1px solid var(--border);border-radius:var(--radius-sm);max-height:420px;overflow-y:auto">${qs.map(q => { const st = S.questionStats(s, q.id); const u = S.unitById(s, q.unitId); return `<label class="list-item" style="cursor:pointer"><input type="checkbox" name="q" value="${q.id}"><div class="grow"><div class="small" style="font-weight:500">${esc(q.stem)}</div><div class="row gap-2 small mt-2">${subjectChip(s, u.subject)}<span class="chip">${u.id}</span><span class="chip">${q.bloomLevel}</span>${st.pct !== null ? `<span class="chip">${st.pct}% correct, ${st.n} answers</span>` : '<span class="chip">New</span>'}${flagChips(s, q)}</div></div></label>`; }).join('') || '<p class="small muted" style="padding:12px">No questions match. Write a new one instead.</p>'}</div></form>
    </div><footer class="modal-foot"><button class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary" type="submit" form="exb-form">${icon('plus')} Add selected</button></footer>`, { wide: true });
}

function writeModal(partId) {
  const s = getState(); const ex = currentExam();
  const units = S.activeVersion(S.programById(s, ex.programId)).unitIds;
  openModal(`${modalHead('Write a new question', 'It is saved to the shared question bank and added to this paper.')}
    <form data-submit="exw-save"><input type="hidden" name="part" value="${partId}"><div class="modal-body">
      <label class="field"><span>Question</span><textarea class="textarea" name="stem" required autofocus></textarea></label>
      ${[0, 1, 2, 3].map(i => `<label class="row gap-2"><input type="radio" name="answer" value="${i}" ${i === 0 ? 'checked' : ''} aria-label="Correct answer ${String.fromCharCode(65 + i)}"><span class="mono small">${String.fromCharCode(65 + i)}</span><input class="input" name="opt${i}" required placeholder="Option ${String.fromCharCode(65 + i)}"></label>`).join('')}
      <p class="small muted">Select the radio button next to the correct answer.</p>
      <div class="form-grid"><label class="field"><span>Unit</span><select class="select" name="unitId">${units.map(u => `<option value="${u}">${u}, ${esc(S.unitById(s, u).title)}</option>`).join('')}</select></label>
      <label class="field"><span>Thinking level</span><select class="select" name="bloom">${BLOOM.map(b => `<option>${b}</option>`).join('')}</select></label></div>
    </div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('save')} Save & add</button></footer></form>`, { wide: true });
}

function previewModal() {
  const s = getState(); const ex = currentExam(); let n = 0;
  openModal(`${modalHead(`Preview, ${esc(ex.title)}`, `As students will see it, ${S.examStats(s, ex).count} questions, ${ex.durationMin} minutes`)}
    <div class="modal-body">${ex.parts.map(p => `<h3>${esc(p.title)}</h3><p class="small muted">${esc(p.instructions)}</p>${p.items.map(it => { const q = S.questionById(s, it.questionId); n++; return `<div class="q-card"><div class="q-stem">${n}. ${esc(q.stem)}</div>${q.options.map(o => `<div class="opt" style="cursor:default">${icon('circle', 'faint')} ${esc(o)}</div>`).join('')}</div>`; }).join('')}`).join('')}</div>`, { wide: true });
}

export const actions = {
  'ex-new': () => {
    const s = getState(); const me = S.currentUser(s);
    const progs = me.role === 'provost' ? s.programs : me.role === 'instructor' ? s.programs.filter(p => s.sections.some(x => x.programId === p.id && x.instructorIds.includes(me.id))) : S.programsUnder(s, me.orgId);
    openModal(`${modalHead('New exam paper', 'The blueprint is pre-filled from the programme curriculum and can be changed later.')}
      <form data-submit="ex-create"><div class="modal-body"><div class="form-grid">
        <label class="field full"><span>Title</span><input class="input" name="title" required autofocus placeholder="e.g. Final Examination, Bachelor of Economics"></label>
        <label class="field"><span>Programme</span><select class="select" name="programId">${progs.map(p => `<option value="${p.id}">${esc(S.orgById(s, p.id).name)}</option>`).join('')}</select></label>
        <label class="field"><span>Type</span><select class="select" name="type">${(me.role === 'instructor' ? ['unit_test', 'midterm', 'final'] : ['final', 'midterm', 'unit_test']).map(t => `<option value="${t}">${ASSESS_META[t].label}</option>`).join('')}</select></label>
        <label class="field"><span>Number of questions</span><input class="input" type="number" name="total" value="16" min="4" max="60"></label>
        <label class="field"><span>Duration (min)</span><input class="input" type="number" name="durationMin" value="45" min="10" max="180"></label>
      </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('plus')} Create</button></footer></form>`);
  },
  'ex-create': (form, data) => { const id = dispatch('EXAM_CREATED', Object.fromEntries(data)); if (id) { closeModal(); location.hash = `${base().slice(1)}/${id}`; } },
  'ex-bank': (el) => bankModal(el.dataset.part),
  'exb-q': (el) => { bankUi.q = el.value; bankModal(bankUi.part); },
  'exb-subject': (el) => { bankUi.subject = el.value; bankModal(bankUi.part); },
  'exb-unit': (el) => { bankUi.unit = el.value; bankModal(bankUi.part); },
  'exb-bloom': (el) => { bankUi.bloom = el.value; bankModal(bankUi.part); },
  'exb-add': (form, data) => {
    const ids = data.getAll('q'); if (!ids.length) { toast('Select at least one question', 'warn'); return; }
    const ex = currentExam(); const me = S.currentUser(getState()); const parts = copyParts(ex);
    const t = S.now(getState()).toISOString();
    parts.find(p => p.id === bankUi.part).items.push(...ids.map(questionId => ({ questionId, addedBy: me.id, addedAt: t, points: 1 })));
    if (saveParts(ex, parts, `Added ${ids.length} question(s) to "${ex.title}"`)) { closeModal(); toast(`${ids.length} question${ids.length > 1 ? 's' : ''} added`); }
  },
  'ex-write': (el) => writeModal(el.dataset.part),
  'exw-save': (form, data) => {
    const qid = dispatch('QUESTION_AUTHORED', { stem: data.get('stem'), options: [0, 1, 2, 3].map(i => data.get(`opt${i}`)), answerIndex: data.get('answer'), unitId: data.get('unitId'), bloom: data.get('bloom') });
    if (!qid) return;
    const ex = currentExam(); const me = S.currentUser(getState()); const parts = copyParts(ex);
    parts.find(p => p.id === data.get('part')).items.push({ questionId: qid, addedBy: me.id, addedAt: S.now(getState()).toISOString(), points: 1 });
    if (saveParts(ex, parts, `Wrote and added a ${data.get('unitId')} question to "${ex.title}"`)) { closeModal(); toast('Question saved to the bank and added'); }
  },
  'ex-move': (el) => { const ex = currentExam(); const parts = copyParts(ex); const p = parts.find(x => x.id === el.dataset.part); const i = Number(el.dataset.i), j = i + Number(el.dataset.d); [p.items[i], p.items[j]] = [p.items[j], p.items[i]]; saveParts(ex, parts); },
  'ex-remove': (el) => { const ex = currentExam(); const parts = copyParts(ex); const p = parts.find(x => x.id === el.dataset.part); p.items.splice(Number(el.dataset.i), 1); saveParts(ex, parts, `Removed a question from "${ex.title}"`); },
  'ex-add-part': () => { const ex = currentExam(); const parts = copyParts(ex); parts.push({ id: newId('P'), title: `Part ${String.fromCharCode(65 + parts.length)}`, instructions: 'Choose the best answer.', items: [] }); saveParts(ex, parts, 'Added a part'); },
  'ex-del-part': (el) => { const ex = currentExam(); saveParts(ex, copyParts(ex).filter(p => p.id !== el.dataset.part), 'Deleted an empty part'); },
  'ex-comment': (form, data) => { if (dispatch('EXAM_COMMENTED', { id: currentExam().id, text: data.get('text') })) form.reset(); },
  'ex-invite': () => {
    const s = getState(); const ex = currentExam();
    const taken = new Set([ex.ownerId, ...ex.coEditors.map(c => c.userId)]);
    const people = s.users.filter(u => ['instructor', 'director'].includes(u.role) && !taken.has(u.id));
    openModal(`${modalHead('Invite co-editors', 'Co-editors can add and write questions, comment and sign off. Only you can change settings, lock and schedule.')}
      <form data-submit="ex-invite-send"><div class="modal-body">${people.map(u => `<label class="opt" style="margin:0 0 6px"><input type="checkbox" name="u" value="${u.id}"> ${avatar(u, 'sm')} <strong>${esc(u.name)}</strong> <span class="small muted">${esc(u.title)}</span></label>`).join('') || '<p class="small muted">Everyone is already on the team.</p>'}</div>
      <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('send')} Send invitations</button></footer></form>`);
  },
  'ex-invite-send': (form, data) => { if (dispatch('COEDITOR_INVITED', { id: currentExam().id, userIds: data.getAll('u') })) closeModal(); },
  'ex-uninvite': async (el) => { if (await confirmDialog({ title: 'Remove this co-editor?', body: '<p>Their questions stay in the paper.</p>', confirmLabel: 'Remove', tone: 'danger' })) dispatch('COEDITOR_REMOVED', { id: currentExam().id, userId: el.dataset.user }); },
  'ex-review': async () => { const ex = currentExam(); if (await confirmDialog({ title: 'Send for review?', body: `<p>${ex.coEditors.length ? `${ex.coEditors.length} co-editor(s) will be asked to sign off.` : 'There are no co-editors — the paper will be marked ready for review.'}</p>`, confirmLabel: 'Send' })) dispatch('EXAM_SENT_FOR_REVIEW', { id: ex.id }); },
  'ex-signoff': () => dispatch('EXAM_SIGNED_OFF', { id: currentExam().id }),
  'ex-reopen': () => dispatch('EXAM_REOPENED', { id: currentExam().id }),
  'ex-version': () => dispatch('EXAM_VERSION_SAVED', { id: currentExam().id }),
  'ex-lock': async (el) => {
    const s = getState(); const ex = currentExam(); const st = S.examStats(s, ex);
    const warn = [Number(el.dataset.unsigned) ? `${el.dataset.unsigned} co-editor(s) have not signed off` : null, st.count !== ex.targets.total ? `The paper has ${st.count} questions; the blueprint asks for ${ex.targets.total}` : null].filter(Boolean);
    if (await confirmDialog({ title: 'Lock this paper?', body: warn.length ? `<div class="note note-warn">${icon('triangle-alert')}<div>${warn.join('<br>')}</div></div><p class="mt-3">You can still lock it.</p>` : '<p>All co-editors signed off and the blueprint is met.</p>', confirmLabel: 'Lock paper' })) dispatch('EXAM_LOCKED', { id: ex.id });
  },
  'ex-schedule': () => {
    const s = getState(); const ex = currentExam();
    openModal(`${modalHead('Schedule exam', `${ex.sectionIds.map(x => esc(S.sectionById(s, x).code)).join(', ')}`)}
      <form data-submit="ex-schedule-go"><div class="modal-body"><div class="form-grid">
        <label class="field"><span>Opens in week</span><select class="select" name="week">${Array.from({ length: s.term.weeks }, (_, i) => i + 1).filter(w => w >= s.clock.week).map(w => `<option value="${w}" ${w === s.term.weeks ? 'selected' : ''}>Week ${w}</option>`).join('')}</select></label>
        <label class="field"><span>Open for</span><select class="select" name="durationDays"><option value="1">1 day</option><option value="3">3 days</option><option value="5" selected>5 days</option></select></label>
      </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('calendar-plus')} Schedule</button></footer></form>`);
  },
  'ex-schedule-go': (form, data) => { if (dispatch('EXAM_SCHEDULED', { id: currentExam().id, week: data.get('week'), durationDays: data.get('durationDays') })) closeModal(); },
  'ex-preview': () => previewModal(),
  'ex-submit': async (el) => {
    const s = getState(); const ex = currentExam(); const st = S.examStats(s, ex);
    const warn = [Number(el.dataset.unsigned) ? `${el.dataset.unsigned} co-editor(s) have not signed off` : null, st.count !== ex.targets.total ? `The paper has ${st.count} questions; the blueprint asks for ${ex.targets.total}` : null].filter(Boolean);
    if (await confirmDialog({ title: 'Send to the Dean?', body: `${warn.length ? `<div class="note note-warn">${icon('triangle-alert')}<div>${warn.join('<br>')}</div></div>` : ''}<p class="mt-3">Editing is locked while the Dean reviews the paper.</p>`, confirmLabel: 'Send' })) dispatch('EXAM_SUBMITTED', { id: ex.id });
  },
  'ex-changes': () => openModal(`${modalHead('Request changes', 'The lecturer sees your note and can edit the paper again.')}<form data-submit="ex-changes-send"><div class="modal-body"><label class="field"><span>What should change?</span><textarea class="textarea" name="note" required autofocus></textarea></label></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('send')} Send</button></footer></form>`),
  'ex-changes-send': (form, data) => { if (dispatch('EXAM_CHANGES_REQUESTED', { id: currentExam().id, note: data.get('note') })) closeModal(); },
  'ex-autofill': async () => {
    const s = getState(); const ex = currentExam(); const picks = S.autoFillPicks(s, ex);
    if (!picks.length) { toast('No suitable questions left in the bank — write new ones', 'warn'); return; }
    const list = picks.map(id => { const q = S.questionById(s, id); return `<li><span class="chip">${q.unitId}</span> <span class="chip">${q.bloomLevel}</span> ${esc(q.stem)}</li>`; }).join('');
    if (!(await confirmDialog({ title: `Add ${picks.length} question(s)?`, body: `<p class="small muted">Chosen to match the blueprint by subject and thinking level, preferring questions with medium difficulty that were not in another locked paper.</p><ol class="small autofill-list">${list}</ol>`, confirmLabel: 'Add to paper' }))) return;
    const me = S.currentUser(s); const parts = copyParts(ex); const at = S.now(s).toISOString();
    parts[parts.length - 1].items.push(...picks.map(questionId => ({ questionId, addedBy: me.id, addedAt: at, points: 1 })));
    if (saveParts(ex, parts, `Auto-filled ${picks.length} question(s) in "${ex.title}"`)) toast(`${picks.length} question(s) added`);
  },
  'ex-settings': () => {
    const s = getState(); const ex = currentExam();
    const me = S.currentUser(s); const secs = s.sections.filter(x => x.programId === ex.programId && (me.role !== 'instructor' || x.instructorIds.includes(me.id)));
    openModal(`${modalHead('Exam settings & blueprint')}
      <form data-submit="ex-settings-save"><div class="modal-body"><div class="form-grid">
        <label class="field full"><span>Title</span><input class="input" name="title" value="${esc(ex.title)}"></label>
        <label class="field"><span>Duration (min)</span><input class="input" type="number" name="durationMin" value="${ex.durationMin}"></label>
        <label class="field"><span>Total questions</span><input class="input" type="number" name="total" value="${ex.targets.total}"></label>
        <div class="field full"><span>Classes</span><div class="row gap-2 wrap">${secs.map(x => `<label class="chip"><input type="checkbox" name="sec" value="${x.id}" ${ex.sectionIds.includes(x.id) ? 'checked' : ''}> ${esc(x.code)}</label>`).join('')}</div></div>
        <div class="field full"><span>Target by subject</span><div class="row gap-2 wrap">${Object.keys(s.subjects).map(k => `<label class="chip">${subjectChip(s, k)} <input class="input" style="width:56px;height:26px" type="number" min="0" name="s_${k}" value="${ex.targets.subjects[k] || 0}"></label>`).join('')}</div></div>
        <div class="field full"><span>Target by thinking level</span><div class="row gap-2 wrap">${BLOOM.map(b => `<label class="chip">${b} <input class="input" style="width:56px;height:26px" type="number" min="0" name="b_${b}" value="${ex.targets.bloom[b] || 0}"></label>`).join('')}</div></div>
      </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('save')} Save</button></footer></form>`, { wide: true });
  },
  'ex-settings-save': (form, data) => {
    const s = getState();
    const patch = { title: data.get('title'), durationMin: Number(data.get('durationMin')), sectionIds: data.getAll('sec'),
      targets: { total: Number(data.get('total')), subjects: Object.fromEntries(Object.keys(s.subjects).map(k => [k, Number(data.get(`s_${k}`)) || 0])), bloom: Object.fromEntries(BLOOM.map(b => [b, Number(data.get(`b_${b}`)) || 0])) } };
    if (dispatch('EXAM_SETTINGS_UPDATED', { id: currentExam().id, patch })) closeModal();
  },
};

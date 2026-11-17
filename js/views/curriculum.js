// Curriculum designer: a programme's 16-unit year built from the shared framework by drag and drop.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { esc, icon, badge, card, empty, subjectChip, confirmDialog, toast, openModal, modalHead, TYPE_META } from '../ui.js';
import { lessonHistory, lessonBlocks } from './shared.js';

const subjOrder = () => Object.keys(getState().subjects);
const draft = { programId: null, unitIds: null, rationale: '', dirty: false, libSubject: '', libQuery: '' };

export function resetDraft() { draft.programId = null; }

function ensureDraft(s, prog, editable) {
  if (draft.programId === prog.id && draft.unitIds) return;
  const src = editable && prog.proposal ? prog.proposal.unitIds : S.activeVersion(prog).unitIds;
  draft.programId = prog.id;
  draft.unitIds = [...src];
  draft.rationale = prog.proposal?.rationale || '';
  draft.dirty = false;
}

/* ---------------- pieces ---------------- */
function unitCard(s, u, { slot = null, locked = false, changed = false, draggable = true, removable = false } = {}) {
  const qn = s.questions.filter(q => q.unitId === u.id).length;
  return `<div class="ucard s-${u.subject} ${draggable ? '' : 'locked'} ${changed ? 'changed' : ''}" ${draggable ? `draggable="true"` : ''} data-unit="${u.id}" ${slot !== null ? `data-slot="${slot}"` : ''} data-action="cur-unit" role="button" tabindex="0" title="Click for details, drag to move">
    <div class="grow"><div class="row gap-2">${subjectChip(s, u.subject)}<span class="faint small mono">${u.id}</span>${locked ? `<span class="faint" title="Required core unit">${icon('lock', 'ic-xs')}</span>` : ''}</div>
      <div class="ut mt-2">${esc(u.title)}</div>${qn ? '' : '<div class="um">No question bank yet</div>'}</div>
    ${removable ? `<button class="btn btn-ghost btn-sm btn-icon x" data-action="cur-remove" data-slot="${slot}" aria-label="Remove ${esc(u.title)}">${icon('x')}</button>` : ''}
  </div>`;
}

export function slotGrid(s, unitIds, { editable = false, compareTo = null } = {}) {
  const req = new Set(s.framework.requiredUnitIds);
  return `<div class="slots" id="cur-slots">${unitIds.map((id, i) => {
    const u = id ? S.unitById(s, id) : null;
    const changed = compareTo && compareTo[i] !== id;
    return `<div class="slot ${u ? 'filled' : 'empty-slot'}" data-drop-slot="${i}">
      <div class="wk"><span>Week ${i + 1}</span>${changed ? '<span style="color:var(--brand-2)">changed</span>' : ''}</div>
      ${u ? unitCard(s, u, { slot: i, locked: req.has(u.id), changed, draggable: editable, removable: editable && !req.has(u.id) }) : `<div class="ph">${editable ? 'Drop a unit here' : 'Empty'}</div>`}
    </div>`;
  }).join('')}</div>`;
}

export function balancePanel(s, unitIds) {
  const counts = S.subjectCounts(s, unitIds.filter(Boolean));
  const fw = S.subjectCounts(s, s.framework.unitIds);
  const max = Math.max(8, ...Object.values(counts), ...Object.values(fw));
  return `<div class="stack gap-2">${subjOrder().map(k => {
    const d = counts[k] - fw[k];
    return `<div class="balance-row">${subjectChip(s, k)}
      <div class="bar" title="${counts[k]} units (framework ${fw[k]})"><span style="width:${(counts[k] / max) * 100}%;background:var(--s-${k})"></span>${fw[k] ? `<span class="fw" style="width:${(fw[k] / max) * 100}%"></span>` : ''}</div>
      <div class="delta ${d > 0 ? 'up' : d < 0 ? 'down' : 'eq'}">${counts[k]} ${d ? `(${d > 0 ? '+' : ''}${d})` : ''}</div></div>`;
  }).join('')}
  <div class="small faint">Bar = units in this plan, marker = framework standard (4 per core subject).</div></div>`;
}

export function diffList(s, from, to) {
  const added = to.filter(id => id && !from.includes(id));
  const removed = from.filter(id => id && !to.includes(id));
  const moved = to.filter((id, i) => id && from.includes(id) && from[i] !== id).length;
  if (!added.length && !removed.length && !moved) return '<p class="small muted">No changes.</p>';
  const row = (id, sign) => { const u = S.unitById(s, id); return `<div class="row gap-2 small"><strong class="${sign === '+' ? 't-ok' : 't-danger'}" style="width:12px">${sign}</strong>${subjectChip(s, u.subject)}<span>${esc(u.title)}</span></div>`; };
  return `<div class="stack gap-2">${added.map(id => row(id, '+')).join('')}${removed.map(id => row(id, '−')).join('')}${moved ? `<div class="small muted">${moved} unit${moved > 1 ? 's' : ''} moved to a different week</div>` : ''}</div>`;
}

export function compareMatrix(s, programs) {
  const used = new Set([...s.framework.unitIds, ...programs.flatMap(p => [...S.activeVersion(p).unitIds, ...(p.proposal?.unitIds || [])])]);
  const units = s.units.filter(u => used.has(u.id)).sort((a, b) => subjOrder().indexOf(a.subject) - subjOrder().indexOf(b.subject) || a.id.localeCompare(b.id));
  const cell = (list, id) => { const i = list.indexOf(id); return i >= 0 ? `<span class="small"><span class="dot-on" style="background:var(--s-${S.unitById(s, id).subject})"></span> W${i + 1}</span>` : '<span class="faint">—</span>'; };
  return `<div class="table-wrap"><table class="table matrix"><thead><tr><th>Unit</th><th class="mark">Framework</th>${programs.map(p => `<th class="mark">${esc(p.code)}</th>`).join('')}</tr></thead><tbody>
    ${units.map(u => `<tr><td><div class="row gap-2">${subjectChip(s, u.subject)}<span>${esc(u.title)}</span>${s.framework.requiredUnitIds.includes(u.id) ? `<span class="faint" title="Required">${icon('lock')}</span>` : ''}</div></td>
      <td class="mark">${cell(s.framework.unitIds, u.id)}</td>${programs.map(p => `<td class="mark">${cell(S.activeVersion(p).unitIds, u.id)}</td>`).join('')}</tr>`).join('')}
    <tr><td><strong>Units per subject</strong></td><td class="mark small">${countLine(s, s.framework.unitIds)}</td>${programs.map(p => `<td class="mark small">${countLine(s, S.activeVersion(p).unitIds)}</td>`).join('')}</tr>
  </tbody></table></div>`;
}
const countLine = (s, ids) => { const c = S.subjectCounts(s, ids); return subjOrder().filter(k => c[k]).map(k => `${s.subjects[k].short} ${c[k]}`).join(', '); };

/* ---------------- designer page ---------------- */
export function designerView(s, prog, me) {
  const pr = prog.proposal;
  const editable = me.role === 'director' && S.isUnder(s, prog.id, me.orgId) && pr?.status !== 'submitted';
  ensureDraft(s, prog, editable);
  if (!editable && pr?.status === 'submitted') draft.unitIds = [...pr.unitIds];
  const active = S.activeVersion(prog);
  const upcoming = prog.versions.filter(v => v.status === 'approved');
  const issues = S.validateCurriculum(s, draft.unitIds);
  const inPlan = new Set(draft.unitIds.filter(Boolean));
  const lib = s.units.filter(u => !inPlan.has(u.id) && (!draft.libSubject || u.subject === draft.libSubject) && (!draft.libQuery || `${u.title} ${u.id}`.toLowerCase().includes(draft.libQuery.toLowerCase())))
    .sort((a, b) => subjOrder().indexOf(a.subject) - subjOrder().indexOf(b.subject) || a.id.localeCompare(b.id));

  const statusNote = !pr ? '' : {
    draft: `<div class="note note-info">${icon('pencil')}<div>Draft saved ${S.relTime(s, pr.updatedAt)} — not yet submitted.</div></div>`,
    submitted: `<div class="note note-info">${icon('hourglass')}<div>Submitted ${S.relTime(s, pr.submittedAt)}. Waiting for Academic Affairs — editing is locked.</div></div>`,
    changes_requested: `<div class="note note-warn">${icon('message-square-warning')}<div><strong>Changes requested:</strong> "${esc(pr.note)}"</div></div>`,
  }[pr.status] || '';

  const library = card({ title: 'Unit library', subtitle: 'Drag into a week, or drag a week back here to remove it', body: `
    <div class="stack gap-2" style="margin-bottom:10px">
      <input class="input" placeholder="Search units…" value="${esc(draft.libQuery)}" data-change="cur-lib-q" aria-label="Search units">
      <select class="select" data-change="cur-lib-subject"><option value="">All subjects</option>${subjOrder().map(k => `<option value="${k}" ${draft.libSubject === k ? 'selected' : ''}>${s.subjects[k].label}</option>`).join('')}</select>
    </div>
    <div class="lib-list lib-zone" id="cur-lib">${lib.length ? lib.map(u => `<div class="row gap-1">${unitCard(s, u, { draggable: editable })}${editable ? `<button class="btn btn-ghost btn-sm btn-icon" data-action="cur-add" data-unit="${u.id}" aria-label="Add ${esc(u.title)}">${icon('plus')}</button>` : ''}</div>`).join('') : empty('library', 'No units', 'Every matching unit is already in the plan.')}</div>` });

  const grid = card({
    title: `${esc(S.orgById(s, prog.id).name)}, Year 1 plan`,
    subtitle: `${draft.unitIds.filter(Boolean).length}/${s.framework.capacity} weeks filled, highlighted weeks differ from the current curriculum (${esc(active.label)})`,
    actions: editable ? `<button class="btn btn-sm" data-action="cur-reset" data-to="framework">${icon('rotate-ccw')} Framework</button><button class="btn btn-sm" data-action="cur-reset" data-to="active">${icon('history')} Current</button>` : (pr?.status === 'submitted' ? badge('submitted') : ''),
    body: slotGrid(s, draft.unitIds, { editable, compareTo: active.unitIds }),
  });

  const side = card({ title: 'Balance & rules', body: `<div class="stack gap-4">
      ${statusNote}
      ${balancePanel(s, draft.unitIds)}
      <div>${issues.length ? `<div class="note note-warn">${icon('triangle-alert')}<div>${issues.map(esc).join('<br>')}</div></div>` : `<div class="note note-ok">${icon('circle-check')}<div>Meets framework rules: 16 weeks, required core units, ≥ ${s.framework.minPerCoreSubject} units per core subject.</div></div>`}</div>
      <div><h4 style="margin-bottom:8px">Changes vs current</h4>${diffList(s, active.unitIds, draft.unitIds)}</div>
      ${editable ? `<label class="field"><span>Reason for change (shown to the approver)</span><textarea class="textarea" data-change="cur-rationale" placeholder="e.g. Employers ask for stronger digital marketing skills">${esc(draft.rationale)}</textarea></label>
        <div class="row gap-2 wrap"><button class="btn" data-action="cur-save" ${draft.dirty ? '' : 'disabled'}>${icon('save')} Save draft</button>
        <button class="btn btn-primary" data-action="cur-submit" ${issues.length ? 'disabled' : ''}>${icon('send')} Submit for approval</button></div>
        ${draft.dirty ? '<div class="small t-warn">Unsaved changes</div>' : ''}` : ''}
      ${upcoming.length ? `<div class="note note-ok">${icon('calendar-check')}<div>${upcoming.map(v => `${esc(v.label)} approved ${S.fmtDate(v.approvedAt)}`).join('<br>')}</div></div>` : ''}
      ${pr?.history?.length ? `<div><h4 style="margin-bottom:8px">History</h4>${lessonHistory(s, pr)}</div>` : ''}
    </div>` });

  return {
    html: `<div class="designer">${library}${grid}${side}</div>`,
    mount: () => { if (editable) wireDnD(); },
  };
}

/* ---------------- drag & drop ---------------- */
function wireDnD() {
  let payload = null;
  document.querySelectorAll('.designer .ucard[draggable="true"]').forEach(el => {
    el.addEventListener('dragstart', e => {
      payload = { unit: el.dataset.unit, slot: el.dataset.slot === undefined ? null : Number(el.dataset.slot) };
      e.dataTransfer.setData('text/plain', JSON.stringify(payload));
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });
  const over = (el) => (e) => { e.preventDefault(); el.classList.add('over'); };
  const leave = (el) => () => el.classList.remove('over');
  document.querySelectorAll('[data-drop-slot]').forEach(el => {
    el.addEventListener('dragover', over(el));
    el.addEventListener('dragleave', leave(el));
    el.addEventListener('drop', e => { e.preventDefault(); el.classList.remove('over'); const p = readPayload(e) || payload; if (p) placeUnit(p, Number(el.dataset.dropSlot)); });
  });
  const libZone = document.getElementById('cur-lib');
  if (libZone) {
    libZone.addEventListener('dragover', e => { e.preventDefault(); libZone.classList.add('over'); });
    libZone.addEventListener('dragleave', () => libZone.classList.remove('over'));
    libZone.addEventListener('drop', e => { e.preventDefault(); libZone.classList.remove('over'); const p = readPayload(e) || payload; if (p?.slot !== null && p?.slot !== undefined) removeSlot(p.slot); });
  }
}
function readPayload(e) { try { return JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return null; } }
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
const isRequired = (id) => getState().framework.requiredUnitIds.includes(id);

function placeUnit(p, target) {
  const list = draft.unitIds;
  if (p.slot !== null && p.slot !== undefined) {
    if (p.slot === target) return;
    [list[p.slot], list[target]] = [list[target], list[p.slot]];
  } else {
    const current = list[target];
    if (current && isRequired(current)) { toast(`${current} is a required core unit — drop on another week`, 'danger'); return; }
    list[target] = p.unit;
  }
  draft.dirty = true;
  rerender();
}
function removeSlot(slot) {
  const id = draft.unitIds[slot];
  if (!id) return;
  if (isRequired(id)) { toast(`${id} is a required core unit and cannot be removed`, 'danger'); return; }
  draft.unitIds[slot] = null;
  draft.dirty = true;
  rerender();
}

/* ---------------- unit detail (read-only drawer) ---------------- */
function openUnitDetail(unitId) {
  const s = getState(); const me = S.currentUser(s);
  const u = S.unitById(s, unitId);
  if (!u) return;
  const scope = new Set(S.sectionsForUser(s, me).map(x => x.id));
  const bank = S.bankLessons(s).filter(l => l.unitId === u.id);
  const taught = s.lessons.filter(l => l.unitId === u.id && scope.has(l.sectionId)).sort((a, b) => S.sectionById(s, a.sectionId).code.localeCompare(S.sectionById(s, b.sectionId).code));
  const ex = S.unitExercises(s, u.id);
  const qs = s.questions.filter(q => q.unitId === u.id);
  const vocab = s.vocabulary.filter(v => v.unitId === u.id);
  const cases = s.resources.filter(r => r.unitId === u.id);
  const books = s.library.books.filter(b => b.unitIds.includes(u.id));
  const used = s.programs.map(p => ({ p, w: S.activeVersion(p).unitIds.indexOf(u.id) })).filter(x => x.w >= 0);
  const count = (arr, key) => Object.entries(arr.reduce((m, x) => ({ ...m, [x[key]]: (m[x[key]] || 0) + 1 }), {})).map(([k, n]) => `${k} ${n}`).join(', ');
  const lessonItem = (l, meta) => `<details class="lesson-detail"><summary><span class="grow"><strong>${esc(l.title)}</strong><span class="small muted">, ${meta}</span></span>${badge(l.status === 'template' ? 'accent' : l.status, l.status === 'template' ? 'Bank' : undefined)}</summary>
    <div class="stack gap-2" style="padding:8px 0 4px">${l.summary ? `<p class="small muted">${esc(l.summary)}</p>` : ''}${lessonBlocks(l)}</div></details>`;
  const section = (title, body) => `<div><h4 style="margin-bottom:8px">${title}</h4>${body}</div>`;
  openModal(`${modalHead(`${esc(u.id)}, ${esc(u.title)}`, `${esc(s.subjects[u.subject].label)}${s.framework.requiredUnitIds.includes(u.id) ? ', required core unit' : ''}`)}
    <div class="modal-body">
      <div class="row gap-2 wrap">${subjectChip(s, u.subject)}${used.map(x => `<span class="chip">${esc(x.p.code)}, week ${x.w + 1}</span>`).join('') || '<span class="chip">Library only</span>'}</div>
      ${section('Learning outcome', `<p>${esc(u.summary)}</p>${u.example ? `<div class="note note-info mt-2">${icon('calculator')}<div><strong>Worked example:</strong> ${esc(u.example)}</div></div>` : ''}`)}
      ${section(`Lessons, ${bank.length + taught.length}`, bank.length + taught.length
        ? `<div class="stack gap-2">${bank.map(l => lessonItem(l, `lesson bank, ${esc(S.userById(s, l.authorId).name)}, ${S.lessonMinutes(l)} min`)).join('')}${taught.map(l => lessonItem(l, `${esc(S.sectionById(s, l.sectionId).code)}, week ${l.week}, ${esc(S.userById(s, l.authorId).name)}, ${S.lessonMinutes(l)} min`)).join('')}</div>`
        : empty('book-open', 'No lessons yet', 'Lecturers have not built a lesson for this unit.'))}
      ${section(`Workbook, ${ex.length} exercises`, ex.length ? `<ul class="tight">${ex.map(e => `<li>${esc(e.title)} <span class="faint">(${e.type})</span></li>`).join('')}</ul>` : '<p class="small muted">No exercises yet.</p>')}
      ${section(`Question bank, ${qs.length}`, qs.length ? `<p class="small muted">${count(qs, 'bloomLevel')}</p>` : '<p class="small t-warn">No questions — this unit cannot be examined yet.</p>')}
      ${section(`Key terms, ${vocab.length}`, vocab.length ? `<div class="row gap-1 wrap">${vocab.map(v => `<span class="chip" title="${esc(v.def)}">${esc(v.term)}, ${esc(v.vi)}</span>`).join('')}</div>` : '<p class="small muted">None yet.</p>')}
      ${section('Library', `${cases.map(r => `<div class="small">${icon('briefcase')} ${esc(r.title)} <span class="faint">(${r.type.replace('_', ' ')}, ${r.minutes} min)</span></div>`).join('')}${books.map(b => `<div class="small">${icon('book')} ${esc(b.title)}</div>`).join('')}` || '<p class="small muted">No library material linked.</p>')}
    </div>`, { drawer: true, wide: true });
}

export const actions = {
  'cur-unit': (el) => openUnitDetail(el.dataset.unit),
  'cur-add': (el) => {
    const i = draft.unitIds.findIndex(x => !x);
    if (i < 0) { toast('All 16 weeks are full — remove a unit first', 'warn'); return; }
    placeUnit({ unit: el.dataset.unit, slot: null }, i);
  },
  'cur-remove': (el) => removeSlot(Number(el.dataset.slot)),
  'cur-lib-q': (el) => { draft.libQuery = el.value; rerender(); },
  'cur-lib-subject': (el) => { draft.libSubject = el.value; rerender(); },
  'cur-rationale': (el) => { draft.rationale = el.value; draft.dirty = true; rerender(); },
  'cur-reset': async (el) => {
    const s = getState(); const prog = S.programById(s, draft.programId);
    const to = el.dataset.to;
    const ok = await confirmDialog({ title: to === 'framework' ? 'Start from the framework?' : 'Revert to the current curriculum?', body: `<p>${to === 'framework' ? 'The plan is replaced by the standard Economics Foundation framework (4 units per core subject).' : `The plan is replaced by ${esc(S.activeVersion(prog).label)}.`} Unsaved changes are lost.</p>`, confirmLabel: 'Replace plan' });
    if (!ok) return;
    draft.unitIds = [...(to === 'framework' ? s.framework.unitIds : S.activeVersion(prog).unitIds)];
    draft.dirty = true; rerender();
  },
  'cur-save': () => { if (dispatch('CURRICULUM_SAVED', { programId: draft.programId, unitIds: draft.unitIds, rationale: draft.rationale })) { draft.dirty = false; rerender(); } },
  'cur-submit': async () => {
    const s = getState(); const prog = S.programById(s, draft.programId);
    const ok = await confirmDialog({ title: 'Submit curriculum for approval?', body: `<p>The Vice Rector for Academic Affairs reviews the change. If approved it applies to the <strong>next intake</strong>; classes already running keep their current plan.</p><div class="mt-3">${diffList(s, S.activeVersion(prog).unitIds, draft.unitIds)}</div>`, confirmLabel: 'Submit' });
    if (!ok) return;
    if (!dispatch('CURRICULUM_SAVED', { programId: draft.programId, unitIds: draft.unitIds, rationale: draft.rationale, quiet: true })) return;
    draft.dirty = false;
    dispatch('CURRICULUM_SUBMITTED', { programId: draft.programId });
  },
};

// Module planner (học phần): arrange bank lessons into the 16-week curriculum, add practical / case-study add-ons,
// then finalise for a programme's classes. The Dean approves and the module locks into class lessons.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { esc, icon, badge, card, empty, pageHead, subjectChip, openModal, closeModal, modalHead, confirmDialog, toast } from '../ui.js';
import { lessonHistory } from './shared.js';
import { RES_META } from './library.js';

const ui = { side: 'bank', resType: '' };
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));

export function modulesView(s, id, me) {
  if (id) return planner(s, id, me);
  const mine = s.modules.filter(m => m.ownerId === me.id);
  const others = s.modules.filter(m => m.ownerId !== me.id && m.status === 'locked');
  const row = (m) => {
    const planned = m.weeks.filter(w => w.lessonId).length;
    return `<a class="list-item" href="#/instructor/modules/${m.id}"><span class="li-icon accent">${icon('calendar-range')}</span><div class="grow"><div class="title">${esc(m.title)}</div>
      <div class="meta">${esc(S.orgById(s, m.programId).name)}, ${planned}/16 weeks planned, ${m.weeks.reduce((t, w) => t + w.extras.length, 0)} add-ons${m.sectionIds.length ? `, ${m.sectionIds.map(x => S.sectionById(s, x).code).join(', ')}` : ''}${m.ownerId !== me.id ? `, by ${esc(S.userById(s, m.ownerId).name)}` : ''}</div></div>${badge(m.status)}</a>`;
  };
  return {
    title: 'Modules',
    html: `<div class="page">${pageHead('Modules', 'A module (học phần) is the 16-week lesson plan for a programme. Plan it, then finalise it for the classes that will take it.', `<button class="btn btn-primary" data-action="mod-new">${icon('plus')} New module</button>`)}
      <div class="steps">${['Library', 'Research', 'Build lessons', 'Arrange plan', 'Finalise for classes', 'Dean locks'].map((t, i) => `<div class="step-pill"><span>${i + 1}</span>${t}</div>`).join(icon('chevron-right', 'faint'))}</div>
      ${card({ title: 'My modules', flush: true, body: mine.length ? `<div class="list">${mine.map(row).join('')}</div>` : empty('calendar-range', 'No modules yet', 'Create one for the programme you teach.') })}
      ${others.length ? card({ title: 'Locked modules from colleagues', flush: true, body: `<div class="list">${others.map(row).join('')}</div>` }) : ''}
    </div>`,
  };
}

function lessonCard(s, l, { week = null, removable = false, draggable = false } = {}) {
  const lib = l.blocks.filter(b => b.type === 'material' || b.type === 'resource').length;
  return `<div class="ucard s-${S.unitById(s, l.unitId).subject}" ${draggable ? 'draggable="true"' : ''} data-lesson="${l.id}" ${week ? `data-week="${week}"` : ''}>
    <div class="grow"><div class="ut">${esc(l.title)}</div><div class="um">${esc(S.userById(s, l.authorId).name)}, ${l.blocks.length} blocks${lib ? `, ${lib} library` : ''}, ${S.lessonMinutes(l)} min</div></div>
    ${removable ? `<button class="btn btn-ghost btn-sm btn-icon x" data-action="mod-clear" data-week="${week}" aria-label="Remove lesson">${icon('x')}</button>` : ''}</div>`;
}

function planner(s, id, me) {
  const m = s.modules.find(x => x.id === id);
  if (!m) return { title: 'Module', html: card({ body: empty('file-x', 'Module not found', '', '<a class="btn mt-3" href="#/instructor/modules">Back</a>') }) };
  const editable = m.ownerId === me.id && ['draft', 'changes_requested'].includes(m.status);
  const cur = S.moduleCurriculum(s, m);
  const issues = S.validateModule(s, m);
  const planned = m.weeks.filter(w => w.lessonId).length;
  const hours = Math.round(S.moduleMinutes(s, m) / 6) / 10;
  const units = new Set(cur);

  const weeks = m.weeks.map(w => {
    const u = S.unitById(s, cur[w.week - 1]);
    const l = w.lessonId ? S.lessonById(s, w.lessonId) : null;
    const options = S.bankLessonsFor(s, u.id, me.id);
    return `<div class="plan-week ${w.week === s.clock.week ? 'current' : ''}" data-drop-week="${w.week}">
      <div class="pw-head"><span class="pw-num">W${w.week}</span>${subjectChip(s, u.subject)}<span class="small"><strong>${u.id}</strong> ${esc(u.title)}</span></div>
      <div class="pw-body">
        <div class="pw-lesson">${l ? lessonCard(s, l, { week: w.week, removable: editable }) : `<div class="slot-empty">${editable ? `${options.length ? `<select class="select select-sm" data-change="mod-pick" data-week="${w.week}"><option value="">Choose from bank (${options.length})…</option>${options.map(o => `<option value="${o.id}">${esc(o.title)} — ${esc(S.userById(s, o.authorId).name)}</option>`).join('')}</select>` : '<span class="small faint">No bank lesson for this unit</span>'}
          <button class="btn btn-sm" data-action="mod-create-lesson" data-unit="${u.id}">${icon('plus')} Create</button>` : '<span class="small t-danger">No lesson</span>'}</div>`}</div>
        <div class="pw-extras" data-drop-extra="${w.week}">${w.extras.map(rid => { const r = S.resourceById(s, rid); return r ? `<span class="extra-chip x-${r.type}">${icon(RES_META[r.type].icon)} ${esc(r.title)} <span class="faint">${r.minutes}′</span>${editable ? `<button class="link-btn" data-action="mod-remove-extra" data-week="${w.week}" data-id="${rid}" aria-label="Remove">${icon('x')}</button>` : ''}</span>` : ''; }).join('')}${editable ? '<span class="extra-drop small faint">Drop practical / case study here</span>' : ''}</div>
      </div></div>`;
  }).join('');

  const bank = S.bankLessons(s).filter(l => units.has(l.unitId)).sort((a, b) => cur.indexOf(a.unitId) - cur.indexOf(b.unitId) || (b.authorId === me.id) - (a.authorId === me.id));
  const resources = s.resources.filter(r => (!ui.resType || r.type === ui.resType)).sort((a, b) => units.has(b.unitId) - units.has(a.unitId) || ['practical', 'case_study', 'activity', 'worksheet'].indexOf(a.type) - ['practical', 'case_study', 'activity', 'worksheet'].indexOf(b.type));
  const side = card({ title: 'Drag into the plan', flush: true, body: `<div class="tabs" style="padding:0 12px"><button class="${ui.side === 'bank' ? 'active' : ''}" data-action="mod-side" data-tab="bank">Lesson bank</button><button class="${ui.side === 'extras' ? 'active' : ''}" data-action="mod-side" data-tab="extras">Add-ons</button></div>
    <div class="card-body lib-list" style="max-height:640px">${ui.side === 'bank'
      ? bank.map(l => `<div><div class="small faint" style="margin:2px 0">${l.unitId}, week ${cur.indexOf(l.unitId) + 1}</div>${lessonCard(s, l, { draggable: editable })}</div>`).join('') || empty('book-copy', 'No bank lessons for this programme')
      : `<select class="select select-sm" data-change="mod-res-type" style="margin-bottom:8px"><option value="">All add-ons</option>${S.RESOURCE_TYPES.map(t => `<option value="${t}" ${ui.resType === t ? 'selected' : ''}>${RES_META[t].plural}</option>`).join('')}</select>
        ${resources.map(r => `<div class="ucard s-${S.unitById(s, r.unitId)?.subject || 'MKT'}" ${editable ? 'draggable="true"' : ''} data-resource="${r.id}"><div class="grow"><div class="row gap-2">${icon(RES_META[r.type].icon)}<span class="small faint">${RES_META[r.type].label}, ${r.unitId}${units.has(r.unitId) ? `, W${cur.indexOf(r.unitId) + 1}` : ''}</span></div><div class="ut mt-2">${esc(r.title)}</div><div class="um">${r.minutes} min</div></div></div>`).join('')}`}</div>` });

  const statusNote = {
    submitted: `<div class="note note-info">${icon('hourglass')}<div>Finalised for ${m.sectionIds.map(x => esc(S.sectionById(s, x).code)).join(', ')} — waiting for the Dean to approve and lock.</div></div>`,
    locked: `<div class="note note-ok">${icon('lock')}<div>Locked for ${m.sectionIds.map(x => esc(S.sectionById(s, x).code)).join(', ')}. Lessons are scheduled in each class timeline.</div></div>`,
    changes_requested: `<div class="note note-warn">${icon('message-square-warning')}<div><strong>Changes requested:</strong> "${esc(m.note)}"</div></div>`,
  }[m.status] || '';

  return {
    title: m.title,
    html: `<div class="page">${pageHead(esc(m.title), `${esc(S.orgById(s, m.programId).name)}, curriculum ${esc(S.programById(s, m.programId).versions.find(v => v.id === m.versionId)?.label || '')}, owner ${esc(S.userById(s, m.ownerId).name)}`, `<a class="btn" href="#/instructor/modules">${icon('arrow-left')} Modules</a>${editable ? `<button class="btn btn-primary" data-action="mod-finalise" data-id="${m.id}" ${issues.length ? 'disabled' : ''}>${icon('lock')} Finalise module</button>` : ''}`)}
      ${statusNote}
      <div class="row gap-3 wrap">${badge(m.status)}<span class="chip">${icon('calendar-check')} ${planned}/16 weeks planned</span><span class="chip">${icon('clock')} ${hours} teaching hours</span><span class="chip">${icon('puzzle')} ${m.weeks.reduce((t, w) => t + w.extras.length, 0)} add-ons</span>${issues.length ? `<span class="small t-warn">${icon('triangle-alert')} ${esc(issues[0])}</span>` : `<span class="small t-ok">${icon('circle-check')} Ready to finalise</span>`}</div>
      <div class="planner"><div class="stack gap-2" id="plan-weeks">${weeks}</div><div class="stack gap-4">${side}${m.history.length ? card({ title: 'History', body: lessonHistory(s, m) }) : ''}</div></div>
    </div>`,
    mount: () => { if (editable) wire(m.id); },
  };
}

function wire(moduleId) {
  let payload = null;
  document.querySelectorAll('.planner [draggable="true"]').forEach(el => {
    el.addEventListener('dragstart', e => {
      payload = el.dataset.resource ? { resource: el.dataset.resource } : { lesson: el.dataset.lesson, from: el.dataset.week ? Number(el.dataset.week) : null };
      e.dataTransfer.setData('text/plain', JSON.stringify(payload)); e.dataTransfer.effectAllowed = 'copy';
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });
  document.querySelectorAll('[data-drop-week]').forEach(el => {
    el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('over'); });
    el.addEventListener('dragleave', () => el.classList.remove('over'));
    el.addEventListener('drop', e => {
      e.preventDefault(); el.classList.remove('over');
      let p = payload; try { p = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { /* use cached */ }
      const week = Number(el.dataset.dropWeek);
      if (p?.resource) addExtra(moduleId, week, p.resource);
      else if (p?.lesson) setLesson(moduleId, week, p.lesson);
    });
  });
}
function weeksCopy(m) { return m.weeks.map(w => ({ ...w, extras: [...w.extras] })); }
function setLesson(moduleId, week, lessonId) {
  const s = getState(); const m = s.modules.find(x => x.id === moduleId);
  const weeks = weeksCopy(m); weeks[week - 1].lessonId = lessonId;
  const l = S.lessonById(s, lessonId);
  dispatch('MODULE_UPDATED', { id: moduleId, weeks, summary: `Planned "${l.title}" in week ${week} of "${m.title}"` });
}
function addExtra(moduleId, week, rid) {
  const s = getState(); const m = s.modules.find(x => x.id === moduleId);
  const weeks = weeksCopy(m);
  if (weeks[week - 1].extras.includes(rid)) { toast('Already in that week', 'warn'); return; }
  weeks[week - 1].extras.push(rid);
  dispatch('MODULE_UPDATED', { id: moduleId, weeks, summary: `Added "${S.resourceById(s, rid).title}" to week ${week}` });
}

export function moduleSummaryHtml(s, m) {
  const cur = S.moduleCurriculum(s, m);
  return `<div class="table-wrap"><table class="table"><thead><tr><th class="num">Week</th><th>Unit</th><th>Lesson</th><th>Author</th><th class="num">Blocks</th><th>Add-ons</th></tr></thead><tbody>
    ${m.weeks.map(w => { const l = S.lessonById(s, w.lessonId); const u = S.unitById(s, cur[w.week - 1]); return `<tr><td class="num">${w.week}</td><td><div class="row gap-2">${subjectChip(s, u.subject)}<span class="small">${u.id}</span></div></td><td>${l ? esc(l.title) : '<span class="t-danger">Missing</span>'}</td><td class="small">${l ? esc(S.userById(s, l.authorId).name) : ''}</td><td class="num">${l ? l.blocks.length : ''}</td><td class="small">${w.extras.map(rid => esc(S.resourceById(s, rid)?.title || '')).join('<br>') || '—'}</td></tr>`; }).join('')}</tbody></table></div>`;
}

export const actions = {
  'mod-new': () => {
    const s = getState(); const me = S.currentUser(s);
    const mineProgs = [...new Set(S.sectionsForUser(s, me).map(x => x.programId))];
    openModal(`${modalHead('New module plan', 'Weeks follow the programme curriculum. Lessons come from the shared lesson bank.')}
      <form data-submit="mod-create"><div class="modal-body"><div class="form-grid">
        <label class="field full"><span>Programme</span><select class="select" name="programId">${s.programs.map(p => `<option value="${p.id}" ${mineProgs[0] === p.id ? 'selected' : ''}>${esc(S.orgById(s, p.id).name)}, ${esc(S.activeVersion(p).label)}</option>`).join('')}</select></label>
        <label class="field full"><span>Title</span><input class="input" name="title" placeholder="e.g. Bachelor of Economics, Year 1, Term 1"></label>
        <label class="opt full" style="margin:0"><input type="checkbox" name="autofill" checked> Pre-fill each week with a matching bank lesson (mine first)</label>
      </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('plus')} Create</button></footer></form>`);
  },
  'mod-create': (form, data) => {
    const id = dispatch('MODULE_CREATED', { programId: data.get('programId'), title: data.get('title'), autofill: data.get('autofill') === 'on' });
    if (id) { closeModal(); location.hash = `/instructor/modules/${id}`; }
  },
  'mod-side': (el) => { ui.side = el.dataset.tab; rerender(); },
  'mod-res-type': (el) => { ui.resType = el.value; rerender(); },
  'mod-pick': (el) => { if (el.value) setLesson(location.hash.split('/')[3], Number(el.dataset.week), el.value); },
  'mod-clear': (el) => {
    const s = getState(); const m = s.modules.find(x => x.id === location.hash.split('/')[3]);
    const weeks = weeksCopy(m); weeks[Number(el.dataset.week) - 1].lessonId = null;
    dispatch('MODULE_UPDATED', { id: m.id, weeks });
  },
  'mod-remove-extra': (el) => {
    const s = getState(); const m = s.modules.find(x => x.id === location.hash.split('/')[3]);
    const weeks = weeksCopy(m); const w = weeks[Number(el.dataset.week) - 1]; w.extras = w.extras.filter(x => x !== el.dataset.id);
    dispatch('MODULE_UPDATED', { id: m.id, weeks });
  },
  'mod-create-lesson': (el) => {
    const id = dispatch('LESSON_CREATED', { bank: true, unitId: el.dataset.unit, template: true });
    if (id) { toast('Bank lesson created — add library materials, then come back to the module'); location.hash = `/instructor/builder/${id}`; }
  },
  'mod-finalise': (el) => {
    const s = getState(); const m = s.modules.find(x => x.id === el.dataset.id);
    const prog = S.programById(s, m.programId);
    const secs = s.sections.filter(x => x.programId === prog.id && x.versionId === m.versionId);
    const school = S.orgById(s, prog.schoolId);
    openModal(`${modalHead('Finalise module', 'Choose who takes this module. The Dean of the school approves and locks it.')}
      <form data-submit="mod-submit"><input type="hidden" name="id" value="${m.id}"><div class="modal-body">
        <div class="form-grid"><div class="field"><span>School</span><div class="chip">${icon('building-2')} ${esc(school.name)}</div></div><div class="field"><span>Programme</span><div class="chip">${esc(S.orgById(s, prog.id).name)}</div></div></div>
        <div class="field"><span>Classes</span>${secs.map(x => `<label class="opt" style="margin:0 0 6px"><input type="checkbox" name="sectionIds" value="${x.id}" ${m.sectionIds.includes(x.id) ? 'checked' : ''}> <strong>${esc(x.code)}</strong> <span class="small muted">${x.studentIds.length} students, lecturer ${esc(x.instructorIds.map(i => S.userById(s, i).name).join(', '))}</span></label>`).join('') || '<span class="small faint">No classes on this curriculum version.</span>'}</div>
        <div class="note note-info">${icon('info')}<div>When locked, each class receives the planned lessons and add-ons. Weeks that are already running (published or scheduled) are kept as they are.</div></div>
      </div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('send')} Finalise & send to Dean</button></footer></form>`);
  },
  'mod-submit': (form, data) => { if (dispatch('MODULE_SUBMITTED', { id: data.get('id'), sectionIds: data.getAll('sectionIds') })) closeModal(); },
};

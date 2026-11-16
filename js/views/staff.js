// Teaching staff: who teaches which subject in which class, and each lecturer's term load.
// Deans edit their school's classes; Academic Affairs sees the whole university read-only.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { esc, icon, badge, kpi, card, pageHead, subjectChip, avatar, progress, openModal, closeModal, modalHead, toast } from '../ui.js';

export function staffView(s, _id, me) {
  const editable = me.role === 'director';
  const secs = S.scopedSections(s);
  const lecturers = s.users.filter(u => u.role === 'instructor');
  const loads = Object.fromEntries(lecturers.map(u => [u.id, S.lecturerLoad(s, u.id)]));
  const subjects = Object.keys(s.subjects);
  const gaps = S.staffingGaps(s, secs);
  const inScope = lecturers.filter(u => loads[u.id].rows.some(r => secs.some(x => x.id === r.sectionId)) || secs.some(x => x.leadId === u.id));
  const over = inScope.filter(u => loads[u.id].over);
  const slots = secs.reduce((t, x) => t + S.subjectsOfSection(s, x.id).length, 0);
  const max = s.staffing.maxHours;

  const cell = (sec, k) => {
    if (!S.subjectsOfSection(s, sec.id).includes(k)) return '<td class="faint">—</td>';
    const uid = sec.assignments?.[k] || '';
    const units = S.curriculumOfSection(s, sec.id).filter(u => S.unitById(s, u).subject === k).length;
    if (!editable) return `<td>${uid ? esc(S.userById(s, uid).name) : '<span class="t-danger">Unassigned</span>'}<div class="small faint">${units} units</div></td>`;
    return `<td><select class="select select-sm staff-pick ${uid ? '' : 'gap'} ${uid && loads[uid].over ? 'over' : ''}" data-change="staff-assign" data-section="${sec.id}" data-subject="${k}" aria-label="${esc(sec.code)} ${esc(s.subjects[k].label)} lecturer">
      <option value="">Unassigned</option>${lecturers.map(u => `<option value="${u.id}" ${u.id === uid ? 'selected' : ''}>${esc(u.name)}, ${loads[u.id].hours}h</option>`).join('')}</select><div class="small faint">${units} units, ${units * s.staffing.hoursPerUnit}h</div></td>`;
  };

  return {
    title: 'Teaching staff',
    html: `<div class="page">${pageHead('Teaching staff', `Assign a lecturer to each subject in each class, load limit ${max}h per term (${s.staffing.hoursPerUnit}h per unit)${editable ? '' : ', read-only'}`)}
      <div class="grid">
        <div class="span-3">${kpi({ label: 'Lecturers', value: String(inScope.length), sub: `teaching ${secs.length} classes`, iconName: 'users' })}</div>
        <div class="span-3">${kpi({ label: 'Subjects staffed', value: `${slots - gaps.length}<small> / ${slots}</small>`, sub: 'class × subject slots', iconName: 'grid-3x3' })}</div>
        <div class="span-3">${kpi({ label: 'Unassigned', value: String(gaps.length), sub: gaps.length ? 'Lessons fall back to the class lead' : 'Every subject has a lecturer', iconName: 'user-x', tone: gaps.length ? 'danger' : 'ok' })}</div>
        <div class="span-3">${kpi({ label: 'Over the limit', value: String(over.length), sub: over.map(u => u.name).join(', ') || `Everyone ≤ ${max}h`, iconName: 'gauge', tone: over.length ? 'warn' : 'ok' })}</div>
      </div>
      ${newClassesCard(s, secs, editable)}
      ${gaps.length ? `<div class="note note-danger">${icon('user-x')}<div><strong>Unassigned:</strong> ${gaps.map(g => `${esc(g.sec.code)}, ${esc(s.subjects[g.subject].label)}`).join(', ')}</div></div>` : ''}
      ${card({ title: 'Assignments by class', subtitle: 'Lessons, marking and reminders for a subject go to the lecturer assigned here', flush: true, body: `<div class="table-wrap"><table class="table staff-table"><thead><tr><th>Class</th><th>Class lead</th>${subjects.map(k => `<th>${subjectChip(s, k)} ${esc(s.subjects[k].label)}</th>`).join('')}</tr></thead><tbody>
        ${secs.map(sec => `<tr><td><strong>${esc(sec.code)}</strong><div class="small faint">${sec.studentIds.length} students</div></td>
          <td>${editable ? `<select class="select select-sm staff-pick" data-change="staff-assign" data-section="${sec.id}" data-subject="lead" aria-label="${esc(sec.code)} class lead">${lecturers.map(u => `<option value="${u.id}" ${u.id === sec.leadId ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select>` : esc(S.userById(s, sec.leadId).name)}</td>
          ${subjects.map(k => cell(sec, k)).join('')}</tr>`).join('')}</tbody></table></div>` })}
      ${card({ title: 'Lecturer workload', subtitle: 'All classes the lecturer teaches, including other schools', flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Lecturer</th><th>Assignments</th><th class="num">Classes</th><th class="num">Units</th><th style="width:220px">Hours this term</th><th>Status</th></tr></thead><tbody>
        ${lecturers.map(u => { const l = loads[u.id]; return `<tr><td><div class="row gap-2">${avatar(u, 'sm')}<div><strong>${esc(u.name)}</strong><div class="small faint">${esc(u.title)}</div></div></div></td>
          <td><div class="row gap-1 wrap">${l.rows.map(r => `<span class="chip">${subjectChip(s, r.subject)} ${esc(S.sectionById(s, r.sectionId).code)}</span>`).join('') || '<span class="faint small">None</span>'}</div></td>
          <td class="num">${l.classes}</td><td class="num">${l.units}</td>
          <td><div class="row gap-2">${progress(Math.min(100, (l.hours / max) * 100), l.over ? 'danger' : l.hours > max * 0.85 ? 'warn' : 'ok')}<span class="small" style="white-space:nowrap">${l.hours}h / ${max}h</span></div></td>
          <td>${l.over ? badge('danger', 'Over limit') : l.hours === 0 ? badge('neutral', 'Available') : l.hours > max * 0.85 ? badge('warn', 'Near limit') : badge('ok', 'OK')}</td></tr>`; }).join('')}</tbody></table></div>` })}
    </div>`,
  };
}

/** Classes lecturers opened themselves: the Dean checks them and assigns lecturers to their subjects. */
function newClassesCard(s, secs, editable) {
  const list = S.newClasses(s, secs);
  if (!list.length) return '';
  return card({ title: `New classes, ${list.length}`, subtitle: 'Opened by lecturers with a class code. Assign lecturers to each subject below.', flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Class</th><th>Opened by</th><th class="num">Students</th><th>Subjects without a lecturer</th><th></th></tr></thead><tbody>
    ${list.map(sec => { const g = S.staffingGaps(s, [sec]); return `<tr><td><strong>${esc(sec.code)}</strong><div class="small faint">${esc(S.orgById(s, sec.programId).name)}</div></td>
      <td class="small">${esc(S.userById(s, sec.createdBy).name)}<div class="faint">${S.relTime(s, sec.createdAt)}</div></td><td class="num">${sec.studentIds.length}</td>
      <td>${g.length ? `<span class="t-danger small">${g.map(x => esc(s.subjects[x.subject].label)).join(', ')}</span>` : badge('ok', 'All assigned')}</td>
      <td class="num"><div class="row gap-2" style="justify-content:flex-end"><button class="btn btn-sm" data-action="class-share" data-id="${sec.id}">${icon('ticket')} Code</button>${editable ? `<button class="btn btn-sm btn-ghost" data-action="class-cancel" data-id="${sec.id}">${icon('x')} Cancel</button>` : ''}</div></td></tr>`; }).join('')}</tbody></table></div>` });
}

const canCancel = (s, me, sec) => sec.createdBy === me.id || (me.role === 'director' && S.canManageSection(s, me, sec.id));
function shareModal(id) {
  const s = getState(); const me = S.currentUser(s); const sec = S.sectionById(s, id); if (!sec) return;
  const code = S.joinCodeOf(sec); const link = S.joinLink(sec);
  openModal(`${modalHead(`Class code, ${esc(sec.code)}`, 'Send the code or the link to your students')}
    <div class="modal-body stack gap-3"><div class="join-code" aria-label="Class code">${code}</div>
      <div class="row gap-2"><input class="input mono" readonly value="${esc(link)}" aria-label="Class link" onclick="this.select()"><button class="btn" data-action="class-copy" data-text="${esc(link)}">${icon('link')} Copy link</button><button class="btn" data-action="class-copy" data-text="${code}">${icon('copy')} Copy code</button></div>
      <p class="small muted">Students open the link, or choose <strong>Join a class</strong> and type the code. Each code opens one class. If this class is cancelled, the code takes students to the class they were moved to.</p>
      <p class="small">${sec.studentIds.length} student(s) in the class so far.</p></div>
    <footer class="modal-foot">${canCancel(s, me, sec) ? `<button class="btn btn-danger" data-action="class-cancel" data-id="${sec.id}" style="margin-right:auto">${icon('x')} Cancel class</button>` : ''}<button class="btn btn-primary" data-action="modal-close">Done</button></footer>`);
}

export const actions = {
  'class-new': () => {
    const s = getState();
    openModal(`${modalHead('Open a new class', 'You get a class code to send to students. The Dean is told and assigns lecturers to the subjects.')}
      <form data-submit="class-create"><div class="modal-body"><div class="form-grid">
        <label class="field full"><span>Programme</span><select class="select" name="programId">${s.programs.map(p => `<option value="${p.id}">${esc(S.orgById(s, p.id).name)}</option>`).join('')}</select></label>
        <label class="field"><span>Intake</span><input class="input" name="intake" value="K50" required pattern="[Kk][0-9]{2}" title="For example K50"></label>
        <label class="field"><span>Note for the Dean (optional)</span><input class="input" name="note" placeholder="e.g. evening class, 40 students expected"></label>
      </div><p class="small muted mt-3">The class follows the programme's current 16-week curriculum. You are its class lead.</p></div>
      <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('plus')} Open class</button></footer></form>`);
  },
  'class-create': (form, data) => { const id = dispatch('CLASS_CREATED', Object.fromEntries(data)); if (id) shareModal(id); },
  'class-share': (el) => shareModal(el.dataset.id),
  'class-copy': async (el) => { try { await navigator.clipboard.writeText(el.dataset.text); toast('Copied'); } catch { toast('Select the text and copy it', 'warn'); } },
  'class-cancel': (el) => {
    const s = getState(); const sec = S.sectionById(s, el.dataset.id);
    const same = s.sections.filter(x => x.id !== sec.id && x.programId === sec.programId);
    const targets = same.length ? same : s.sections.filter(x => x.id !== sec.id);
    openModal(`${modalHead(`Cancel ${esc(sec.code)}?`, 'Use this when a class does not open, for example too few students.')}
      <form data-submit="class-cancel-go"><input type="hidden" name="id" value="${sec.id}"><div class="modal-body stack gap-3">
        <label class="field"><span>Move its ${sec.studentIds.length} student(s) and its code to</span><select class="select" name="targetId">${targets.map(x => `<option value="${x.id}">${esc(x.code)}, ${x.studentIds.length} students</option>`).join('')}</select></label>
        <div class="note note-warn">${icon('triangle-alert')}<div>Draft lessons of this class are deleted. Students who use the old code or link are taken to the class you choose.</div></div></div>
      <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Keep the class</button><button class="btn btn-danger">${icon('x')} Cancel class</button></footer></form>`);
  },
  'class-cancel-go': (form, data) => { if (dispatch('CLASS_CANCELLED', { id: data.get('id'), targetId: data.get('targetId') })) closeModal(); },
  'staff-assign': (el) => dispatch('STAFF_ASSIGNED', { sectionId: el.dataset.section, subject: el.dataset.subject, userId: el.value }),
};

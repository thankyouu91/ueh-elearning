// University leadership (Vice Rector, Academic Affairs): whole-university view, curriculum approval, framework.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { esc, icon, badge, card, empty, pageHead, subjectChip, confirmDialog } from '../ui.js';
import { explorerView } from './explorer.js';
import { slotGrid, balancePanel, diffList, compareMatrix } from './curriculum.js';
import { lessonHistory } from './shared.js';
import { libraryView, readerView } from './library.js';
import { studioView } from './studio.js';
import { staffView } from './staff.js';

export const NAV = [
  { page: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { page: 'explore', label: 'Organisation', icon: 'network' },
  { page: 'staff', label: 'Teaching staff', icon: 'contact' },
  { page: 'curricula', label: 'Curricula', icon: 'blocks', countKey: 'curricula' },
  { page: 'framework', label: 'Framework & units', icon: 'shapes' },
  { page: 'library', label: 'Library', icon: 'library-big', also: ['book'] },
  { page: 'studio', label: 'Exam studio', icon: 'pen-tool', countKey: 'studio' },
];

function decisions(s) {
  const pending = s.programs.filter(p => p.proposal?.status === 'submitted');
  return card({ title: 'Needs your decision', flush: true, body: pending.length ? `<div class="list">${pending.map(p => `<a class="list-item" href="#/provost/curricula/${p.id}"><span class="li-icon warn">${icon('blocks')}</span><div class="grow"><div class="title">${esc(S.orgById(s, p.id).name)} — curriculum change</div><div class="meta">Submitted by ${esc(S.userById(s, p.proposal.updatedBy).name)} ${S.relTime(s, p.proposal.submittedAt)}, "${esc(p.proposal.rationale || '')}"</div></div>${badge('submitted')}</a>`).join('')}</div>` : empty('circle-check', 'Nothing waiting', 'Curriculum proposals from deans will appear here.') });
}

function dashboard(s, _id, me) {
  const v = explorerView(s, me, me.orgId, '#/provost/explore');
  return { title: 'Dashboard', html: `<div class="page">${decisions(s)}</div><div class="mt-4">${v.html}</div>`, mount: v.mount };
}
function explore(s, id, me) { return explorerView(s, me, id || me.orgId, '#/provost/explore'); }

function curricula(s, id) {
  if (id) return review(s, id);
  return {
    title: 'Curricula',
    html: `<div class="page">${pageHead('Programme curricula', `All programmes are built on ${esc(s.framework.title)} (${s.framework.capacity} units per year)`)}
      ${card({ flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Programme</th><th>School</th><th>Current curriculum</th><th>Units per subject</th><th>Next intake</th><th></th></tr></thead><tbody>
        ${s.programs.map(p => { const v = S.activeVersion(p); const c = S.subjectCounts(s, v.unitIds); const next = p.versions.find(x => x.status === 'approved');
          return `<tr><td><strong>${esc(S.orgById(s, p.id).name)}</strong></td><td>${esc(S.orgById(s, p.schoolId).name)}</td><td>${esc(v.label)}</td>
          <td><div class="row gap-1 wrap">${Object.entries(c).filter(([, n]) => n).map(([k, n]) => `${subjectChip(s, k)}<span class="small" style="margin-right:6px">${n}</span>`).join('')}</div></td>
          <td>${p.proposal ? badge(p.proposal.status) : next ? badge('approved', next.label) : '<span class="faint small">No change</span>'}</td>
          <td class="num"><a class="btn btn-sm ${p.proposal?.status === 'submitted' ? 'btn-primary' : ''}" href="#/provost/curricula/${p.id}">${p.proposal?.status === 'submitted' ? 'Review' : 'View'}</a></td></tr>`; }).join('')}</tbody></table></div>` })}
      ${card({ title: 'Compare programmes', subtitle: 'Which week each unit is taught in, per programme (current intake)', flush: true, body: compareMatrix(s, s.programs) })}</div>`,
  };
}

function review(s, pid) {
  const p = S.programById(s, pid);
  if (!p) return { title: 'Curricula', html: card({ body: empty('file-x', 'Programme not found') }) };
  const pr = p.proposal;
  const active = S.activeVersion(p);
  const shown = pr ? pr.unitIds : active.unitIds;
  const issues = S.validateCurriculum(s, shown);
  const pending = pr?.status === 'submitted';
  return {
    title: S.orgById(s, p.id).name,
    html: `<div class="page">${pageHead(esc(S.orgById(s, p.id).name), pr ? `Proposal for the next intake, submitted by ${esc(S.userById(s, pr.updatedBy).name)}` : `${esc(active.label)}, no pending proposal`, `<a class="btn" href="#/provost/curricula">${icon('arrow-left')} Curricula</a>`)}
      ${pr?.rationale ? `<div class="note note-info">${icon('quote')}<div><strong>Dean's rationale:</strong> ${esc(pr.rationale)}</div></div>` : ''}
      <div class="grid">
        <div class="span-8">${card({ title: pr ? 'Proposed year plan' : 'Current year plan', subtitle: pr ? `Highlighted weeks differ from ${esc(active.label)}` : '', actions: pr ? badge(pr.status) : '', body: slotGrid(s, shown, { compareTo: pr ? active.unitIds : null }) })}</div>
        <div class="span-4 stack gap-4">
          ${card({ title: 'Changes vs current', body: diffList(s, active.unitIds, shown) })}
          ${card({ title: 'Subject balance', subtitle: 'vs. framework standard', body: balancePanel(s, shown) })}
          ${card({ title: 'Framework rules', body: issues.length ? `<div class="note note-warn">${icon('triangle-alert')}<div>${issues.map(esc).join('<br>')}</div></div>` : `<div class="note note-ok">${icon('circle-check')}<div>All rules met.</div></div>` })}
          ${pending ? card({ title: 'Decision', body: `<div class="stack gap-3"><p class="small muted">Approving creates a new curriculum version for the next intake. Classes already running are not changed.</p>
            <label class="field"><span>Note to the dean (required to request changes)</span><textarea class="textarea" id="cur-review-note"></textarea></label>
            <div class="row gap-2 wrap"><button class="btn" data-action="cur-review" data-kind="changes" data-id="${p.id}">${icon('message-square-warning')} Request changes</button><button class="btn btn-primary" data-action="cur-review" data-kind="approve" data-id="${p.id}">${icon('check')} Approve</button></div></div>` }) : ''}
          ${pr?.history?.length ? card({ title: 'History', body: lessonHistory(s, pr) }) : ''}
        </div>
      </div></div>`,
  };
}

function framework(s) {
  const fw = s.framework;
  const usage = (id) => s.programs.filter(p => S.activeVersion(p).unitIds.includes(id)).map(p => p.code);
  return {
    title: 'Framework & units',
    html: `<div class="page">${pageHead(esc(fw.title), `${fw.capacity} weeks, one unit per week, every class starts from this skeleton`)}
      <div class="grid"><div class="span-8">${card({ title: 'Standard year plan', subtitle: 'Locked units are required in every programme', body: slotGrid(s, fw.unitIds, { editable: false }) })}</div>
      <div class="span-4">${card({ title: 'Rules for programmes', body: `<ul style="margin:0;padding-left:18px;line-height:1.8">
        <li>Exactly ${fw.capacity} units, one per teaching week</li>
        <li>Required core units: ${fw.requiredUnitIds.map(id => `<strong>${id}</strong>`).join(', ')}</li>
        <li>At least ${fw.minPerCoreSubject} units in each core subject (${fw.coreSubjects.map(k => s.subjects[k].label).join(', ')})</li>
        <li>Remaining weeks are free for the school's specialism (e.g. Marketing)</li>
        <li>Changes are approved by Academic Affairs and apply from the next intake</li></ul>` })}</div></div>
      ${card({ title: `Unit library, ${s.units.length} units`, flush: true, body: `<div class="table-wrap"><table class="table"><thead><tr><th>Unit</th><th>Subject</th><th class="num">Questions</th><th class="num">Key terms</th><th>Used by</th></tr></thead><tbody>
        ${s.units.map(u => `<tr><td><div class="row gap-2"><span class="mono small faint">${u.id}</span><strong>${esc(u.title)}</strong>${fw.requiredUnitIds.includes(u.id) ? icon('lock', 'faint') : ''}</div><div class="small muted">${esc(u.summary)}</div></td><td>${subjectChip(s, u.subject)}</td>
          <td class="num">${s.questions.filter(q => q.unitId === u.id).length || '<span class="t-warn">0</span>'}</td><td class="num">${s.vocabulary.filter(v => v.unitId === u.id).length}</td><td>${usage(u.id).map(c => `<span class="chip">${c}</span>`).join(' ') || '<span class="faint small">Library only</span>'}</td></tr>`).join('')}</tbody></table></div>` })}</div>`,
  };
}

export const ROUTES = { dashboard, explore, staff: staffView, curricula, framework, library: (s) => libraryView(s), book: (s, id) => readerView(s, id), studio: (s, id, me) => studioView(s, id, me) };

export const actions = {
  'cur-review': async (el) => {
    const note = document.getElementById('cur-review-note')?.value || '';
    if (el.dataset.kind === 'approve') {
      const s = getState(); const p = S.programById(s, el.dataset.id);
      const ok = await confirmDialog({ title: 'Approve this curriculum?', body: `<p>${esc(S.orgById(s, p.id).name)} gets a new curriculum version for the next intake.</p>`, confirmLabel: 'Approve' });
      if (ok && dispatch('CURRICULUM_APPROVED', { programId: el.dataset.id })) location.hash = '/provost/curricula';
    } else if (dispatch('CURRICULUM_CHANGES_REQUESTED', { programId: el.dataset.id, note })) location.hash = '/provost/curricula';
  },
};

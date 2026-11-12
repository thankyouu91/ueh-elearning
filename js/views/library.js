// Library (books, extracts, case studies, activities, worksheets, practicals) and the book reader used for research.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState, newId } from '../store.js';
import { esc, icon, badge, card, empty, pageHead, subjectChip, openModal, closeModal, modalHead, confirmDialog, toast } from '../ui.js';
import { hasFile, putFile, getFile, fmtSize } from '../features/files.js';
import { openPdf, inspectPdf, renderPage, forgetPdf } from '../features/pdf.js';

export const RES_META = {
  case_study: { label: 'Case study', plural: 'Case studies', icon: 'briefcase' },
  group_project: { label: 'Group project', plural: 'Group projects', icon: 'users-round' },
  activity: { label: 'Activity', plural: 'Activities', icon: 'puzzle' },
  worksheet: { label: 'Worksheet', plural: 'Worksheets', icon: 'file-pen-line' },
  practical: { label: 'Practical session', plural: 'Practicals', icon: 'monitor-cog' },
};
const TABS = [['books', 'Books'], ['extracts', 'Extracts'], ...S.RESOURCE_TYPES.map(t => [t, RES_META[t].plural])];
const ui = { tab: 'books', subject: '', unit: '', q: '' };
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
const role = () => S.currentUser(getState()).role;
const canEditLessons = () => ['instructor'].includes(role());

const usedIn = (s, pred) => s.lessons.filter(l => l.blocks.some(pred)).length;
const bookHasFile = (b) => !!b.file && hasFile(`book:${b.id}`);

function filters(s) {
  return `<div class="row gap-2 wrap">
    <input class="input" style="max-width:240px;height:32px" placeholder="Search…" value="${esc(ui.q)}" data-change="lib-q" aria-label="Search library">
    <select class="select select-sm" data-change="lib-subject"><option value="">All subjects</option>${Object.entries(s.subjects).map(([k, v]) => `<option value="${k}" ${ui.subject === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select>
    <select class="select select-sm" data-change="lib-unit"><option value="">All units</option>${s.units.filter(u => !ui.subject || u.subject === ui.subject).map(u => `<option value="${u.id}" ${ui.unit === u.id ? 'selected' : ''}>${u.id} · ${esc(u.title)}</option>`).join('')}</select>
  </div>`;
}
const matchText = (t) => !ui.q || t.toLowerCase().includes(ui.q.toLowerCase());

function bookCover(s, b) {
  return `<div class="cover cover-${b.subject}"><span>${esc(b.title)}</span><small>${esc(s.subjects[b.subject].label)}</small></div>`;
}

function booksGrid(s) {
  const base = `#/${role()}/book`;
  const list = s.library.books.filter(b => (!ui.subject || b.subject === ui.subject) && (!ui.unit || b.unitIds.includes(ui.unit)) && matchText(`${b.title} ${b.description}`));
  if (!list.length) return empty('library', 'No books match', 'Try another subject or unit.');
  return `<div class="book-grid">${list.map(b => {
    const n = s.library.extracts.filter(x => x.bookId === b.id).length;
    return `<a class="book" href="${base}/${b.id}">${bookCover(s, b)}
      <div class="book-meta"><div class="title">${esc(b.title)}</div>
        <div class="row gap-1 wrap mt-2">${b.unitIds.map(u => `<span class="chip">${u}</span>`).join('')}</div>
        <div class="small mt-2 ${bookHasFile(b) ? 't-ok' : 'faint'}">${bookHasFile(b) ? `${icon('file-check')} PDF · ${b.file.pages} pages` : b.file ? `${icon('cloud-off')} PDF on another device` : `${icon('upload')} No PDF yet`}${n ? ` · ${n} extract${n > 1 ? 's' : ''}` : ''}</div></div></a>`;
  }).join('')}</div>`;
}

function extractsTable(s) {
  const me = S.currentUser(s);
  const list = s.library.extracts.filter(x => (!ui.unit || x.unitId === ui.unit) && (!ui.subject || S.bookById(s, x.bookId).subject === ui.subject) && matchText(`${x.title} ${S.bookById(s, x.bookId).title}`))
    .sort((a, b) => (b.createdBy === me.id) - (a.createdBy === me.id));
  if (!list.length) return empty('scissors', 'No extracts yet', 'Open a book, choose a page range and save it as an extract. Extracts can then be added to lessons.');
  return `<div class="table-wrap"><table class="table"><thead><tr><th>Extract</th><th>Book</th><th class="num">Pages</th><th>Unit</th><th>By</th><th class="num">In lessons</th><th></th></tr></thead><tbody>
    ${list.map(x => { const b = S.bookById(s, x.bookId); return `<tr><td><strong>${esc(x.title)}</strong>${x.note ? `<div class="small muted">${esc(x.note)}</div>` : ''}</td><td>${esc(b.title)}</td><td class="num">${x.fromPage}–${x.toPage}</td><td>${x.unitId ? `<span class="chip">${x.unitId}</span>` : '—'}</td><td class="small">${esc(S.userById(s, x.createdBy).name)}</td><td class="num">${usedIn(s, bl => bl.extractId === x.id)}</td>
      <td class="num"><div class="row gap-1" style="justify-content:flex-end"><a class="btn btn-sm" href="#/${role()}/book/${b.id}?p=${x.fromPage}">Open</a>${canEditLessons() ? `<button class="btn btn-sm btn-primary" data-action="lib-add-to-lesson" data-kind="extract" data-id="${x.id}">${icon('plus')} Lesson</button>` : ''}</div></td></tr>`; }).join('')}</tbody></table></div>`;
}

function resourcesTable(s, type) {
  const list = s.resources.filter(r => r.type === type && (!ui.unit || r.unitId === ui.unit) && (!ui.subject || S.unitById(s, r.unitId)?.subject === ui.subject) && matchText(`${r.title} ${r.body}`));
  if (!list.length) return empty(RES_META[type].icon, `No ${RES_META[type].plural.toLowerCase()} match`);
  return `<div class="list">${list.map(r => `<div class="list-item"><span class="li-icon accent">${icon(RES_META[type].icon)}</span>
    <div class="grow"><div class="title">${esc(r.title)}</div><div class="meta">${r.unitId ? `${subjectChip(s, S.unitById(s, r.unitId).subject)} ${r.unitId} · ` : ''}${r.minutes} min · by ${esc(S.userById(s, r.createdBy).name)} · used in ${usedIn(s, b => b.resourceId === r.id)} lesson(s)${r.file ? ` · ${icon('paperclip')} ${esc(r.file.name)}` : ''}</div></div>
    <button class="btn btn-sm" data-action="lib-view-resource" data-id="${r.id}">View</button>${canEditLessons() ? `<button class="btn btn-sm btn-primary" data-action="lib-add-to-lesson" data-kind="resource" data-id="${r.id}">${icon('plus')} Lesson</button>` : ''}</div>`).join('')}</div>`;
}

export function libraryView(s) {
  const counts = { books: s.library.books.length, extracts: s.library.extracts.length, ...Object.fromEntries(S.RESOURCE_TYPES.map(t => [t, s.resources.filter(r => r.type === t).length])) };
  const body = ui.tab === 'books' ? booksGrid(s) : ui.tab === 'extracts' ? extractsTable(s) : resourcesTable(s, ui.tab);
  const canAddRes = role() !== 'admin';
  return {
    title: 'Library',
    html: `<div class="page">${pageHead('Library', `${esc(s.library.collection)} · research the books, extract units, and add materials to lessons`, `${canAddRes ? `<button class="btn" data-action="lib-new-resource">${icon('plus')} Case study / activity</button>` : ''}<button class="btn btn-primary" data-action="lib-new-book">${icon('upload')} Upload book</button>`)}
      <div class="note note-info">${icon('route')}<div><strong>Workflow:</strong> Library → open a book and research → save page ranges as <em>extracts</em> → add extracts, case studies, activities, worksheets and practicals to lessons → arrange lessons in a <em>module plan</em> → finalise the module for a programme and its classes.</div></div>
      ${card({ flush: true, body: `<div class="tabs" style="padding:0 12px">${TABS.map(([k, l]) => `<button class="${ui.tab === k ? 'active' : ''}" data-action="lib-tab" data-tab="${k}">${l} <span class="faint">${counts[k]}</span></button>`).join('')}</div>
        <div class="card-body">${filters(s)}</div><div style="padding:0 0 4px">${ui.tab === 'books' ? `<div style="padding:0 18px 18px">${body}</div>` : body}</div>` })}
    </div>`,
  };
}

/* ---------------- reader ---------------- */
const reader = { bookId: null, page: 1, zoom: 1, from: null, to: null };
export function readerView(s, id) {
  const b = S.bookById(s, id);
  if (!b) return { title: 'Book', html: card({ body: empty('book-x', 'Book not found') }) };
  const qp = Number(new URLSearchParams(location.hash.split('?')[1] || '').get('p'));
  if (reader.bookId !== b.id) { reader.bookId = b.id; reader.page = qp || 1; reader.from = null; reader.to = null; }
  else if (qp) reader.page = qp;
  const extracts = s.library.extracts.filter(x => x.bookId === b.id).sort((a, c) => a.fromPage - c.fromPage);
  const head = pageHead(esc(b.title), `${esc(s.subjects[b.subject].label)} · suggested units ${b.unitIds.join(', ') || '—'}`, `<a class="btn" href="#/${role()}/library">${icon('arrow-left')} Library</a>`);
  if (!bookHasFile(b)) {
    return {
      title: b.title,
      html: `<div class="page">${head}
        <div class="grid"><div class="span-4">${card({ body: bookCover(s, b) + `<p class="muted mt-3">${esc(b.description)}</p>` })}</div>
        <div class="span-8">${card({ title: 'Upload the PDF', subtitle: b.file ? `A file (${esc(b.file.name)}) was uploaded on another device. Upload it again to read it here.` : 'Upload the licensed PDF of this book to read it and extract units.', body: `
          <label class="dropzone" id="pdf-drop"><input type="file" accept="application/pdf" data-change="lib-upload-pdf" data-book="${b.id}" hidden>
            ${icon('file-up')}<strong>Choose a PDF or drop it here</strong><span class="small muted">The file is stored in this browser only (demo — no server yet).</span></label>
          <div id="upload-status" class="small muted mt-2"></div>` })}</div></div></div>`,
      mount: () => wireDrop(b.id),
    };
  }
  const units = s.units;
  return {
    title: b.title,
    html: `<div class="page">${head}
      <div class="reader">
        ${card({ title: 'Contents', flush: true, body: `<div class="toc">${(b.file.outline || []).filter(o => o.page).map(o => `<button class="toc-item" style="padding-left:${12 + o.depth * 14}px" data-action="rd-go" data-page="${o.page}"><span class="grow truncate">${esc(o.title)}</span><span class="faint small">${o.page}</span></button>`).join('') || `<p class="small muted" style="padding:12px">This PDF has no table of contents. Use the page box to navigate.</p>`}</div>` })}
        <div class="card reader-main">
          <div class="reader-bar row gap-2 wrap">
            <button class="btn btn-sm btn-icon" data-action="rd-step" data-d="-1" aria-label="Previous page">${icon('chevron-left')}</button>
            <input class="input" style="width:70px;height:30px" type="number" min="1" max="${b.file.pages}" value="${reader.page}" data-change="rd-page" aria-label="Page"><span class="small muted">/ ${b.file.pages}</span>
            <button class="btn btn-sm btn-icon" data-action="rd-step" data-d="1" aria-label="Next page">${icon('chevron-right')}</button>
            <span class="grow"></span>
            <button class="btn btn-sm" data-action="rd-mark" data-which="from">${icon('bookmark-plus')} Start here</button>
            <button class="btn btn-sm" data-action="rd-mark" data-which="to">${icon('bookmark-check')} End here</button>
            <button class="btn btn-sm btn-icon" data-action="rd-zoom" data-d="-1" aria-label="Zoom out">${icon('zoom-out')}</button>
            <button class="btn btn-sm btn-icon" data-action="rd-zoom" data-d="1" aria-label="Zoom in">${icon('zoom-in')}</button>
          </div>
          <div class="page-view" id="page-view"><div class="skeleton" style="height:400px"></div></div>
        </div>
        <div class="stack gap-4">
          ${card({ title: 'Extract a unit', subtitle: 'Save a page range to use in lessons', body: `<form class="stack gap-3" data-submit="rd-save-extract">
            <label class="field"><span>Title</span><input class="input" name="title" required placeholder="e.g. Price elasticity — worked examples"></label>
            <div class="form-grid"><label class="field"><span>From page</span><input class="input" type="number" name="fromPage" min="1" max="${b.file.pages}" value="${reader.from || reader.page}" required></label>
            <label class="field"><span>To page</span><input class="input" type="number" name="toPage" min="1" max="${b.file.pages}" value="${reader.to || reader.from || reader.page}" required></label></div>
            <label class="field"><span>Unit</span><select class="select" name="unitId">${units.map(u => `<option value="${u.id}" ${b.unitIds[0] === u.id ? 'selected' : ''}>${u.id} · ${esc(u.title)}</option>`).join('')}</select></label>
            <label class="field"><span>Note for colleagues (optional)</span><input class="input" name="note" placeholder="e.g. Good diagrams on p. 3"></label>
            <button class="btn btn-primary">${icon('scissors')} Save extract</button></form>` })}
          ${card({ title: `Extracts from this book · ${extracts.length}`, flush: true, body: extracts.length ? `<div class="list">${extracts.map(x => `<div class="list-item"><div class="grow"><button class="link-btn" data-action="rd-go" data-page="${x.fromPage}"><strong>${esc(x.title)}</strong></button><div class="meta">pp. ${x.fromPage}–${x.toPage}${x.unitId ? ` · ${x.unitId}` : ''} · ${esc(S.userById(s, x.createdBy).name)}</div></div>
            ${canEditLessons() ? `<button class="btn btn-sm btn-icon" data-action="lib-add-to-lesson" data-kind="extract" data-id="${x.id}" aria-label="Add to lesson">${icon('plus')}</button>` : ''}
            <button class="btn btn-ghost btn-sm btn-icon" data-action="rd-del-extract" data-id="${x.id}" aria-label="Delete extract">${icon('trash-2')}</button></div>`).join('')}</div>` : empty('scissors', 'No extracts yet') })}
        </div>
      </div></div>`,
    mount: () => drawPage(b),
  };
}

async function drawPage(b) {
  const box = document.getElementById('page-view');
  if (!box) return;
  try {
    const doc = await openPdf(`book:${b.id}`);
    if (!doc) { box.innerHTML = empty('file-x', 'File not found in this browser'); return; }
    reader.page = Math.max(1, Math.min(doc.numPages, reader.page));
    const canvas = document.createElement('canvas');
    const w = Math.min(box.clientWidth - 24, 900) * reader.zoom;
    await renderPage(doc, reader.page, canvas, Math.max(240, w));
    box.innerHTML = '';
    const inRange = reader.from && reader.page >= reader.from && reader.page <= (reader.to || reader.from);
    if (inRange) box.insertAdjacentHTML('beforeend', `<div class="small" style="color:var(--brand-2);font-weight:600;margin-bottom:6px">${icon('bookmark')} In selected range ${reader.from}–${reader.to || '…'}</div>`);
    box.appendChild(canvas);
    window.lucide?.createIcons();
  } catch (e) { console.error(e); box.innerHTML = empty('circle-alert', 'Could not render this PDF', e.message); }
}

function wireDrop(bookId) {
  const dz = document.getElementById('pdf-drop');
  if (!dz) return;
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('over'));
  dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('over'); const f = e.dataTransfer.files[0]; if (f) uploadPdf(bookId, f); });
}

async function uploadPdf(bookId, file) {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) { toast('Please choose a PDF file', 'danger'); return false; }
  const st = document.getElementById('upload-status');
  if (st) st.textContent = 'Reading the PDF…';
  try {
    const meta = await inspectPdf(file);
    await putFile(`book:${bookId}`, file);
    forgetPdf(`book:${bookId}`);
    dispatch('BOOK_FILE_ATTACHED', { bookId, name: file.name, size: file.size, pages: meta.pages, outline: meta.outline });
    return true;
  } catch (e) {
    console.error(e);
    if (st) st.textContent = '';
    toast(`Could not read this PDF: ${e.message}`, 'danger');
    return false;
  }
}

/* ---------------- add material to a lesson ---------------- */
export function materialBlock(s, kind, id) {
  if (kind === 'extract') { const x = S.extractById(s, id); return { id: newId('B'), type: 'material', extractId: x.id, title: x.title, minutes: Math.max(10, (x.toPage - x.fromPage + 1) * 5) }; }
  const r = S.resourceById(s, id); return { id: newId('B'), type: 'resource', resourceId: r.id, title: r.title, minutes: r.minutes, extra: r.type === 'practical' };
}
export function openAddToLesson(kind, id) {
  const s = getState(); const me = S.currentUser(s);
  const item = kind === 'extract' ? S.extractById(s, id) : S.resourceById(s, id);
  const unitId = item.unitId;
  const mine = s.lessons.filter(l => l.authorId === me.id && ['template', 'draft', 'changes_requested'].includes(l.status))
    .sort((a, b) => (b.unitId === unitId) - (a.unitId === unitId) || (a.status === 'template' ? -1 : 1));
  openModal(`${modalHead('Add to a lesson', `${esc(item.title)}${unitId ? ` · ${unitId}` : ''}`)}
    <div class="modal-body">
      ${unitId ? `<button class="btn" data-action="lib-new-bank-with" data-kind="${kind}" data-id="${id}">${icon('plus')} New bank lesson for ${unitId} with this material</button>` : ''}
      <div class="small muted">Or add it to one of your lessons:</div>
      <div class="list" style="max-height:360px;overflow-y:auto;border:1px solid var(--border);border-radius:var(--radius-sm)">${mine.map(l => `<button class="list-item" data-action="lib-pick-lesson" data-kind="${kind}" data-id="${id}" data-lesson="${l.id}">
        <span class="li-icon ${l.unitId === unitId ? 'accent' : ''}">${icon(l.status === 'template' ? 'book-copy' : 'calendar')}</span>
        <div class="grow"><div class="title">${esc(l.title)}</div><div class="meta">${l.status === 'template' ? 'Lesson bank' : `${esc(S.sectionById(s, l.sectionId).code)} · week ${l.week}`} · ${l.unitId || '—'}${l.unitId === unitId ? ' · <strong>same unit</strong>' : ''}</div></div>${badge(l.status === 'template' ? 'accent' : l.status, l.status === 'template' ? 'Bank' : undefined)}</button>`).join('') || empty('book-copy', 'No editable lessons', 'Create one with the button above.')}</div>
    </div>`);
}

/* ---------------- forms ---------------- */
function openNewBook() {
  const s = getState();
  openModal(`${modalHead('Upload a book', 'Adds a title to the library. You can attach the PDF now or later.')}
    <form data-submit="lib-create-book"><div class="modal-body"><div class="form-grid">
      <label class="field full"><span>Title</span><input class="input" name="title" required autofocus></label>
      <label class="field"><span>Subject</span><select class="select" name="subject">${Object.entries(s.subjects).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}</select></label>
      <label class="field"><span>PDF file</span><input class="input" type="file" name="file" accept="application/pdf" style="padding-top:5px"></label>
      <label class="field full"><span>Description</span><textarea class="textarea" name="description" style="min-height:60px"></textarea></label>
      <div class="field full"><span>Units this book supports</span><div class="unit-checks">${s.units.map(u => `<label class="chip"><input type="checkbox" name="unitIds" value="${u.id}"> ${u.id}</label>`).join('')}</div></div>
    </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('upload')} Add book</button></footer></form>`, { wide: true });
}
function openNewResource() {
  const s = getState();
  openModal(`${modalHead('Add to the library', 'Case studies, activities, worksheets and practical sessions can be added to any lesson.')}
    <form data-submit="lib-create-resource"><div class="modal-body"><div class="form-grid">
      <label class="field"><span>Type</span><select class="select" name="type">${S.RESOURCE_TYPES.map(t => `<option value="${t}" ${ui.tab === t ? 'selected' : ''}>${RES_META[t].label}</option>`).join('')}</select></label>
      <label class="field"><span>Unit</span><select class="select" name="unitId">${s.units.map(u => `<option value="${u.id}">${u.id} · ${esc(u.title)}</option>`).join('')}</select></label>
      <label class="field full"><span>Title</span><input class="input" name="title" required autofocus></label>
      <label class="field"><span>Duration (min)</span><input class="input" type="number" name="minutes" value="30" min="5" max="240"></label>
      <label class="field"><span>Attachment (optional PDF)</span><input class="input" type="file" name="file" accept="application/pdf" style="padding-top:5px"></label>
      <label class="field full"><span>Instructions / content</span><textarea class="textarea" name="body" style="min-height:120px" placeholder="Scenario, steps and questions for students"></textarea></label>
    </div></div><footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('plus')} Add</button></footer></form>`, { wide: true });
}
export function resourceBody(s, r) {
  return `<div class="stack gap-3"><div class="row gap-2 wrap"><span class="chip">${icon(RES_META[r.type].icon)} ${RES_META[r.type].label}</span>${r.unitId ? `${subjectChip(s, S.unitById(s, r.unitId).subject)}<span class="chip">${r.unitId} · ${esc(S.unitById(s, r.unitId).title)}</span>` : ''}<span class="chip">${r.minutes} min</span></div>
    <div class="prose" style="white-space:pre-wrap">${esc(r.body).replace(/^(Brief|Deliverables|Team roles.*|Timeline.*|Assessment.*)$/gm, '<strong class="res-head">$1</strong>') || '<span class="faint">No instructions.</span>'}</div>
    ${r.file ? `<button class="btn btn-sm" data-action="lib-open-attachment" data-id="${r.id}" style="align-self:flex-start">${icon('paperclip')} ${esc(r.file.name)} (${fmtSize(r.file.size)})</button>` : ''}</div>`;
}

export const actions = {
  'lib-tab': (el) => { ui.tab = el.dataset.tab; rerender(); },
  'lib-q': (el) => { ui.q = el.value; rerender(); },
  'lib-subject': (el) => { ui.subject = el.value; ui.unit = ''; rerender(); },
  'lib-unit': (el) => { ui.unit = el.value; rerender(); },
  'lib-new-book': () => openNewBook(),
  'lib-new-resource': () => openNewResource(),
  'lib-create-book': async (form, data) => {
    const id = dispatch('BOOK_ADDED', { title: data.get('title'), subject: data.get('subject'), description: data.get('description'), unitIds: data.getAll('unitIds'), quiet: true });
    if (!id) return;
    const f = data.get('file');
    closeModal();
    if (f && f.size) { toast('Book added — reading the PDF…'); await uploadPdf(id, f); }
    else toast('Book added — upload the PDF when ready');
    location.hash = `/${role()}/book/${id}`;
  },
  'lib-create-resource': async (form, data) => {
    const id = newId('R');
    const f = data.get('file');
    let file = null;
    if (f && f.size) { await putFile(`res:${id}`, f); file = { name: f.name, size: f.size }; }
    if (dispatch('RESOURCE_CREATED', { id, type: data.get('type'), unitId: data.get('unitId'), title: data.get('title'), minutes: data.get('minutes'), body: data.get('body'), file })) { ui.tab = data.get('type'); closeModal(); rerender(); }
  },
  'lib-view-resource': (el) => {
    const s = getState(); const r = S.resourceById(s, el.dataset.id);
    openModal(`${modalHead(esc(r.title), `Added by ${esc(S.userById(s, r.createdBy).name)}`)}<div class="modal-body">${resourceBody(s, r)}</div>
      <footer class="modal-foot"><button class="btn btn-ghost" data-action="modal-close">Close</button>${canEditLessons() ? `<button class="btn btn-primary" data-action="lib-add-to-lesson" data-kind="resource" data-id="${r.id}">${icon('plus')} Add to lesson</button>` : ''}</footer>`, { wide: true });
  },
  'lib-open-attachment': async (el) => {
    const f = await getFile(`res:${el.dataset.id}`);
    if (!f) { toast('The attachment is stored on another device', 'warn'); return; }
    window.open(URL.createObjectURL(f), '_blank', 'noopener');
  },
  'lib-upload-pdf': (el) => { const f = el.files?.[0]; if (f) uploadPdf(el.dataset.book, f); },
  'lib-add-to-lesson': (el) => openAddToLesson(el.dataset.kind, el.dataset.id),
  'lib-pick-lesson': (el) => {
    const s = getState(); const l = S.lessonById(s, el.dataset.lesson);
    const blk = materialBlock(s, el.dataset.kind, el.dataset.id);
    if (dispatch('LESSON_UPDATED', { id: l.id, patch: { blocks: [...l.blocks, blk] } })) { closeModal(); toast(`Added to "${l.title}"`); }
  },
  'lib-new-bank-with': (el) => {
    const s = getState();
    const item = el.dataset.kind === 'extract' ? S.extractById(s, el.dataset.id) : S.resourceById(s, el.dataset.id);
    const id = dispatch('LESSON_CREATED', { bank: true, unitId: item.unitId, template: true });
    if (!id) return;
    const l = S.lessonById(getState(), id);
    dispatch('LESSON_UPDATED', { id, patch: { blocks: [...l.blocks, materialBlock(getState(), el.dataset.kind, el.dataset.id)] } });
    closeModal();
    location.hash = `/instructor/builder/${id}`;
  },
  'rd-go': (el) => { reader.page = Number(el.dataset.page); rerender(); },
  'rd-step': (el) => { reader.page += Number(el.dataset.d); rerender(); },
  'rd-page': (el) => { reader.page = Number(el.value) || 1; rerender(); },
  'rd-zoom': (el) => { reader.zoom = Math.max(0.6, Math.min(2, reader.zoom + Number(el.dataset.d) * 0.2)); rerender(); },
  'rd-mark': (el) => { if (el.dataset.which === 'from') { reader.from = reader.page; if (!reader.to || reader.to < reader.page) reader.to = reader.page; } else { reader.to = reader.page; if (!reader.from || reader.from > reader.page) reader.from = reader.page; } toast(`Range ${reader.from}–${reader.to}`); rerender(); },
  'rd-save-extract': (form, data) => { if (dispatch('EXTRACT_CREATED', { bookId: reader.bookId, ...Object.fromEntries(data) })) { reader.from = null; reader.to = null; } },
  'rd-del-extract': async (el) => { if (await confirmDialog({ title: 'Delete this extract?', body: '<p>The page range is removed from the library. Lessons that use it must be changed first.</p>', confirmLabel: 'Delete', tone: 'danger' })) dispatch('EXTRACT_DELETED', { id: el.dataset.id }); },
};

/* ---------------- material rendering inside lessons ---------------- */
export function materialHtml(s, blk) {
  const x = S.extractById(s, blk.extractId);
  if (!x) return '<p class="small muted">This extract was removed from the library.</p>';
  const b = S.bookById(s, x.bookId);
  return `<div class="stack gap-2"><div class="small muted">${icon('book-marked')} ${esc(b.title)} · pages ${x.fromPage}–${x.toPage}${x.note ? ` · ${esc(x.note)}` : ''}</div>
    <div class="extract-pages" data-extract="${x.id}">${hasFile(`book:${b.id}`) ? '<div class="skeleton" style="height:300px"></div>' : `<div class="note note-warn">${icon('cloud-off')}<div>The book PDF is not stored on this device. In production the file is served from the university library server.</div></div>`}</div></div>`;
}
export async function mountMaterials(s) {
  for (const el of document.querySelectorAll('.extract-pages[data-extract]')) {
    const x = S.extractById(s, el.dataset.extract);
    if (!x || !hasFile(`book:${x.bookId}`)) continue;
    try {
      const doc = await openPdf(`book:${x.bookId}`);
      el.innerHTML = '';
      const last = Math.min(x.toPage, x.fromPage + 9, doc.numPages);
      for (let p = x.fromPage; p <= last; p++) {
        const c = document.createElement('canvas');
        el.appendChild(c);
        await renderPage(doc, p, c, Math.min(el.clientWidth || 700, 760));
      }
      if (x.toPage > last) el.insertAdjacentHTML('beforeend', `<p class="small muted">Showing the first 10 pages of ${x.toPage - x.fromPage + 1}.</p>`);
    } catch (e) { console.error(e); el.innerHTML = '<p class="small t-danger">Could not render the extract.</p>'; }
  }
}

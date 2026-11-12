// Bento layout: tiles of text, image, audio, data table and questions on a 4-column grid.
// Used for case studies and for "page" blocks inside lessons. Rendered for students (interactive),
// lecturers (answers), in a drag-and-drop editor, on a phone preview and as presentation slides.
import * as S from '../selectors.js';
import { dispatch } from '../events.js';
import { getState } from '../store.js';
import { esc, icon, card, empty, pageHead, openModal, closeModal, modalHead, confirmDialog, toast, TYPE_META } from '../ui.js';
import { putFile, getFile } from '../features/files.js';
import { defaultLayout } from '../seed-workbook.js';
import { studentExercise, lecturerExercise, exhibitHtml } from './workbook.js';

export const TILE_KINDS = {
  text: { label: 'Text', icon: 'type' }, image: { label: 'Image', icon: 'image' }, audio: { label: 'Audio', icon: 'audio-lines' },
  exhibit: { label: 'Data table', icon: 'table' }, check: { label: 'Quick check', icon: 'circle-help' }, mcq: { label: 'Multiple choice', icon: 'list-checks' },
  numeric: { label: 'Calculation', icon: 'calculator' }, written: { label: 'Written task', icon: 'pen-line' },
};
const CASE_KINDS = ['text', 'image', 'audio', 'exhibit', 'mcq', 'numeric', 'written'];
const PAGE_KINDS = ['text', 'image', 'audio', 'exhibit', 'check'];
const rerender = () => window.dispatchEvent(new HashChangeEvent('hashchange'));
const clone = (x) => JSON.parse(JSON.stringify(x));
const tileId = () => `TL-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
export const layoutOf = (s, c) => c.layout || defaultLayout(c, s.exercises);

/* ---------------- rich text: # heading, ## subheading, **bold**, *italic*, - list, 1. list ---------------- */
const inline = (x) => x.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, '$1<em>$2</em>');
export function richText(src) {
  const out = []; let list = null, para = [];
  const flushP = () => { if (para.length) out.push(`<p>${para.join('<br>')}</p>`); para = []; };
  const flushL = () => { if (list) out.push(`<${list.tag}>${list.items.map(i => `<li>${i}</li>`).join('')}</${list.tag}>`); list = null; };
  for (const raw of String(src || '').split('\n')) {
    const line = raw.trim();
    const h = /^(#{1,2}) (.+)/.exec(line), ul = /^[-•] (.+)/.exec(line), ol = /^\d+[.)] (.+)/.exec(line);
    if (!line) { flushP(); flushL(); continue; }
    if (h) { flushP(); flushL(); out.push(h[1].length === 1 ? `<h3>${inline(esc(h[2]))}</h3>` : `<h4>${inline(esc(h[2]))}</h4>`); continue; }
    if (ul || ol) { flushP(); const tag = ul ? 'ul' : 'ol'; if (list?.tag !== tag) { flushL(); list = { tag, items: [] }; } list.items.push(inline(esc((ul || ol)[1]))); continue; }
    flushL(); para.push(inline(esc(line)));
  }
  flushP(); flushL();
  return out.join('');
}
console.assert(richText('# A\n- b\n- c\n\n**d** *e*') === '<h3>A</h3><ul><li>b</li><li>c</li></ul><p><strong>d</strong> <em>e</em></p>', 'richText self-check');

/* ---------------- rendering ---------------- */
/** Quick check stored on the tile. mode: student (answerable), lecturer (key shown), present (key on reveal). */
function checkHtml(t, mode, ctx) {
  const picked = ctx.picks?.[t.id];
  const opts = (t.options || []).map((o, i) => {
    const state = mode === 'lecturer' || (mode === 'student' && picked !== undefined) ? (i === t.answerIndex ? 'correct' : picked === i ? 'wrong' : '') : mode === 'present' && i === t.answerIndex ? 'key' : '';
    const tag = mode === 'student' && picked === undefined && ctx.action ? 'button' : 'div';
    return `<${tag} class="opt ${state}" ${tag === 'button' ? `data-action="${ctx.action}" data-block="${esc(ctx.blockId || '')}" data-tile="${esc(t.id)}" data-o="${i}"` : ''}><span class="mono small">${'ABCD'[i]}</span> ${esc(o)}</${tag}>`;
  }).join('');
  const done = mode === 'lecturer' || (mode === 'student' && picked !== undefined);
  return `<div class="stack gap-2"><div class="row gap-2 small t-brand">${icon('circle-help')}<strong>Quick check</strong></div><div class="q-stem">${esc(t.prompt || '')}</div>${opts}
    ${done && t.explain ? `<p class="small muted">${picked !== undefined && picked !== t.answerIndex ? '<strong class="t-danger">Not quite.</strong> ' : ''}${esc(t.explain)}</p>` : ''}</div>`;
}

function tileBody(s, t, mode, me, n, stats, ctx = {}) {
  if (t.kind === 'text') return `${t.title ? `<h3 class="tile-h">${esc(t.title)}</h3>` : ''}<div class="prose">${richText(t.body) || '<p class="faint">Empty text</p>'}</div>`;
  if (t.kind === 'image') {
    const img = t.media ? `<img data-media="${esc(t.media.key)}" alt="${esc(t.caption || 'Image')}">` : t.src ? `<img src="${esc(t.src)}" alt="${esc(t.caption || 'Image')}">` : `<div class="tile-ph">${icon('image')} No image yet</div>`;
    return `<figure class="tile-fig fit-${t.fit || 'cover'}">${img}${t.caption ? `<figcaption>${esc(t.caption)}</figcaption>` : ''}</figure>`;
  }
  if (t.kind === 'audio') return `<div class="stack gap-2"><div class="row gap-2">${icon('headphones')}<strong>${esc(t.title || 'Listen')}</strong></div>
    ${t.media ? `<audio controls preload="none" data-media="${esc(t.media.key)}" style="width:100%"></audio>` : t.transcript ? `<button class="btn btn-sm" data-action="bento-speak" data-text="${esc(t.transcript)}" style="align-self:flex-start">${icon('play')} Play (voice)</button>` : '<span class="faint small">No audio yet</span>'}
    ${t.transcript ? (mode === 'student' ? `<details class="small"><summary>Show transcript</summary><p class="mt-2">${esc(t.transcript)}</p></details>` : `<p class="small muted">${esc(t.transcript)}</p>`) : ''}</div>`;
  if (t.kind === 'exhibit') return t.table?.rows?.length ? exhibitHtml(t.table) : '<div class="tile-ph">No data yet</div>';
  if (t.kind === 'check') return checkHtml(t, mode, ctx);
  if (t.kind === 'question') {
    const e = S.exerciseById(s, t.exerciseId);
    if (!e) return '<div class="tile-ph">Question removed</div>';
    if (mode === 'student') return studentExercise(s, e, n, S.answerOf(s, me.id, e.id));
    return lecturerExercise(s, e, n, stats ? S.exerciseStats(s, e.id, stats) : null);
  }
  return '';
}
const tileHtml = (s, t, mode, me, n, stats, ctx) => `<div class="bento-tile k-${t.kind}" style="--w:${t.w};--h:${t.h}">${tileBody(s, t, mode, me, n, stats, ctx)}</div>`;

/** Case study grid. mode: 'student' | 'lecturer'. `stats` = studentIds for class statistics (lecturer mode). */
export function bentoGrid(s, c, { mode, me, stats = null }) {
  let n = 0;
  return `<div class="bento">${layoutOf(s, c).map(t => tileHtml(s, t, mode, me, t.kind === 'question' ? ++n : 0, stats)).join('')}</div>`;
}

/** Page block inside a lesson. Quick-check answers are kept per browser session (practice, not graded). */
export const checkPicks = {};
export function pageGrid(s, b, { mode = 'student', me = null, layout = null } = {}) {
  const tiles = layout || b.layout || [];
  if (!tiles.length) return empty('layout-panel-top', 'This page is empty', 'Add text, images, tables or a quick check.');
  const ctx = { picks: checkPicks[b.id] || {}, blockId: b.id, action: 'page-check' };
  return `<div class="bento page-grid">${tiles.map(t => tileHtml(s, t, mode, me, 0, null, ctx)).join('')}</div>`;
}

const urls = new Map();
export async function mountMedia(root = document) {
  for (const el of root.querySelectorAll('[data-media]')) {
    const key = el.dataset.media;
    if (!urls.has(key)) { const f = await getFile(key); if (!f) { el.replaceWith(Object.assign(document.createElement('div'), { className: 'tile-ph small', textContent: 'File stored on another device' })); continue; } urls.set(key, URL.createObjectURL(f)); }
    el.src = urls.get(key);
  }
}

/* ---------------- slides (preview presenter and live session) ---------------- */
/** One slide. Non-page blocks show their title and a short prompt; page rows show their tiles. */
export function slideHtml(s, l, slide, live = null) {
  const { b, tiles } = slide;
  if (tiles) {
    const ctx = { picks: {}, blockId: b.id };
    return `<div class="slide-page"><div class="slide-kicker">${esc(b.title)}</div><div class="bento slide-grid">${tiles.map(t => `<div class="bento-tile k-${t.kind}" style="--w:${t.w};--h:1">${tileBody(s, t, 'present', null, 0, null, ctx)}${live && t.kind === 'check' ? tallyHtml(t, live) : ''}</div>`).join('')}</div></div>`;
  }
  const line = b.type === 'theory' ? l.summary : b.type === 'vocabulary' ? s.vocabulary.filter(v => v.unitId === l.unitId).map(v => v.term).join(' · ') : 'Discuss in pairs, then share your answers with the class.';
  return `<div class="slide-plain"><div class="slide-kicker">${esc(TYPE_META[b.type]?.label || '')}</div><h2>${esc(b.title)}</h2><p>${esc(line)}</p></div>`;
}
/** Live answers to a quick check, shown under the slide to the lecturer. */
function tallyHtml(t, live) {
  const ans = Object.values(live.answers?.[t.id] || {});
  if (!ans.length) return `<p class="tally small">Waiting for answers · ${live.joined.length} joined</p>`;
  const right = ans.filter(o => o === t.answerIndex).length;
  return `<div class="tally"><div class="small"><strong>${ans.length}</strong> answered · <strong>${Math.round((right / ans.length) * 100)}%</strong> correct</div>
    ${(t.options || []).map((o, i) => { const n = ans.filter(x => x === i).length; return `<div class="tally-row ${i === t.answerIndex ? 'key' : ''}"><span class="mono small">${'ABCD'[i]}</span><span class="bar"><span style="width:${(n / ans.length) * 100}%"></span></span><span class="small">${n}</span></div>`; }).join('')}</div>`;
}

const pres = { lessonId: null, i: 0, keys: null };
export function openPresenter(lessonId, start = 0) {
  pres.lessonId = lessonId; pres.i = start;
  let root = document.getElementById('presenter');
  if (!root) { root = Object.assign(document.createElement('div'), { id: 'presenter', className: 'presenter' }); document.body.appendChild(root); }
  if (!pres.keys) {
    pres.keys = (e) => {
      if (!document.getElementById('presenter')) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); stepPresenter(1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); stepPresenter(-1); }
      if (e.key === 'Escape') closePresenter();
    };
    document.addEventListener('keydown', pres.keys);
  }
  drawPresenter();
  root.requestFullscreen?.().catch(() => {});
}
function drawPresenter() {
  const root = document.getElementById('presenter'); if (!root) return;
  const s = getState(); const l = S.lessonById(s, pres.lessonId); const slides = S.slidesOf(l);
  pres.i = Math.max(0, Math.min(pres.i, slides.length - 1));
  root.innerHTML = `<div class="presenter-stage">${slides.length ? slideHtml(s, l, slides[pres.i]) : '<p>No slides</p>'}</div>
    <div class="presenter-bar"><span class="small">${esc(l.title)} · ${pres.i + 1} / ${slides.length}</span><span class="grow"></span>
      <button class="btn btn-sm" data-action="pres-reveal">${icon('eye')} Show answer</button>
      <button class="btn btn-sm" data-action="pres-step" data-d="-1" ${pres.i === 0 ? 'disabled' : ''} aria-label="Previous slide">${icon('arrow-left')}</button>
      <button class="btn btn-sm" data-action="pres-step" data-d="1" ${pres.i >= slides.length - 1 ? 'disabled' : ''} aria-label="Next slide">${icon('arrow-right')}</button>
      <button class="btn btn-sm" data-action="pres-close">${icon('x')} Close</button></div>`;
  window.lucide?.createIcons(); mountMedia(root);
}
function stepPresenter(d) { pres.i += d; drawPresenter(); }
function closePresenter() { document.getElementById('presenter')?.remove(); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }

/* ---------------- editor (case layout or lesson page) ---------------- */
const ed = { key: null, target: null, layout: null, dirty: false, pending: null };

/** Resolves what is being edited. Returns null when it no longer exists. */
function targetInfo(s, target, me) {
  if (target.kind === 'case') {
    const c = S.resourceById(s, target.id);
    if (!c || c.type !== 'case_study') return null;
    return { title: c.title, layout: layoutOf(s, c), editable: true, unitId: c.unitId, kinds: CASE_KINDS, back: `#/instructor/cases/${c.id}`, backLabel: 'View', heading: `Edit case · ${c.title}`, saveLabel: 'Save case', c };
  }
  const l = S.lessonById(s, target.lessonId); const b = l?.blocks.find(x => x.id === target.blockId);
  if (!b || b.type !== 'page') return null;
  const editable = l.status === 'template' ? l.authorId === me.id : ['draft', 'changes_requested'].includes(l.status) && l.authorId === me.id;
  return { title: b.title, layout: b.layout || [], editable, unitId: l.unitId, kinds: PAGE_KINDS, back: `#/instructor/builder/${l.id}`, backLabel: 'Lesson', heading: `${l.title} · ${b.title}`, saveLabel: 'Save page', l, b };
}

function layoutEditor(s, me, target) {
  const key = JSON.stringify(target);
  const info = targetInfo(s, target, me);
  if (!info) return { title: 'Editor', html: card({ body: empty('file-x', 'Not found', '', '<a class="btn mt-3" href="#/instructor/lessons">Back to lessons</a>') }) };
  if (ed.key !== key) { ed.key = key; ed.target = target; ed.layout = clone(info.layout); ed.dirty = false; }
  const isPage = target.kind === 'page';
  let n = 0;
  const tiles = ed.layout.map((t, i) => {
    const k = t.kind === 'question' ? S.exerciseById(s, t.exerciseId)?.type || 'mcq' : t.kind;
    const bar = info.editable ? `<div class="tile-bar"><span class="tile-grip" title="Drag to move">${icon('grip-vertical')}</span><span class="small"><strong>${TILE_KINDS[k].label}</strong> · ${t.w}×${t.h}</span><span class="grow"></span>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="bento-w" data-i="${i}" data-d="-1" ${t.w <= 1 ? 'disabled' : ''} aria-label="Narrower" title="Narrower">${icon('minus')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="bento-w" data-i="${i}" data-d="1" ${t.w >= 4 ? 'disabled' : ''} aria-label="Wider" title="Wider">${icon('plus')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="bento-h" data-i="${i}" aria-label="Toggle height" title="Taller / shorter">${icon(t.h === 2 ? 'fold-vertical' : 'unfold-vertical')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="bento-dup" data-i="${i}" aria-label="Duplicate" title="Duplicate">${icon('copy')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="bento-edit" data-i="${i}" aria-label="Edit" title="Edit">${icon('pencil')}</button>
        <button class="btn btn-ghost btn-sm btn-icon" data-action="bento-del" data-i="${i}" aria-label="Delete" title="Delete">${icon('trash-2')}</button></div>` : '';
    return `<div class="bento-tile edit k-${t.kind}" style="--w:${t.w};--h:${t.h}" ${info.editable ? `draggable="true" data-action="bento-edit" data-i="${i}" title="Click to edit"` : ''} data-idx="${i}">${bar}
      <div class="tile-preview">${tileBody(s, t, 'lecturer', me, t.kind === 'question' ? ++n : 0, null)}</div></div>`;
  }).join('');
  const extra = isPage ? `<button class="btn" data-action="pg-phone">${icon('smartphone')} Phone preview</button><button class="btn" data-action="pg-present">${icon('presentation')} Present</button>` : '';
  return {
    title: `Edit · ${info.title}`,
    html: `<div class="page">${pageHead(esc(info.heading), info.editable ? 'Drag tiles from the left onto the page, drag a tile to move it, click a tile to edit it.' : 'Read only — this lesson is not a draft.', `<a class="btn" href="${info.back}">${icon(isPage ? 'arrow-left' : 'eye')} ${info.backLabel}</a>${extra}${info.editable ? `<button class="btn" data-action="bento-discard" ${ed.dirty ? '' : 'disabled'}>${icon('undo-2')} Discard</button><button class="btn btn-primary" data-action="bento-save" ${ed.dirty ? '' : 'disabled'}>${icon('save')} ${info.saveLabel}</button>` : ''}`)}
      ${ed.dirty ? `<div class="note note-warn">${icon('pencil')}<div>Unsaved changes — students still see the saved version.</div></div>` : ''}
      <div class="bento-editor">
        ${info.editable ? card({ title: 'Add a tile', subtitle: 'Drag onto the page or click', body: `<div class="stack gap-2">${info.kinds.map(k => `<button class="palette-item" draggable="true" data-kind="${k}" data-action="bento-add">${icon(TILE_KINDS[k].icon)}<div class="grow" style="font-weight:500">${TILE_KINDS[k].label}</div></button>`).join('')}</div>
          <p class="small muted mt-3">${isPage ? 'Each row of tiles becomes one slide when you present.' : 'Questions are saved straight away; the layout is saved when you press <strong>Save case</strong>.'}</p>` }) : '<div></div>'}
        <div><div class="bento ${isPage ? 'page-grid' : ''}" id="bento-canvas">${tiles || ''}</div>${info.editable ? `<div class="bento-end" id="bento-end">${icon('plus')} Drop here to add at the end</div>` : ''}</div>
      </div></div>`,
    mount: () => { if (info.editable) wireEditor(); mountMedia(); },
  };
}
export const caseEditor = (s, id, me) => layoutEditor(s, me, { kind: 'case', id });
/** Route id is "<lessonId>~<blockId>". */
export function pageEditor(s, id, me) { const [lessonId, blockId] = String(id || '').split('~'); return layoutEditor(s, me, { kind: 'page', lessonId, blockId }); }

function wireEditor() {
  let payload = null;
  const set = (e, p) => { payload = p; e.dataTransfer.setData('text/plain', JSON.stringify(p)); e.dataTransfer.effectAllowed = 'move'; };
  document.querySelectorAll('.palette-item[data-kind]').forEach(el => el.addEventListener('dragstart', e => set(e, { kind: el.dataset.kind })));
  document.querySelectorAll('.bento-tile.edit').forEach(el => {
    el.addEventListener('dragstart', e => { set(e, { from: Number(el.dataset.idx) }); el.classList.add('dragging'); });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });
  const read = (e) => { try { return JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return payload; } };
  const targets = [...document.querySelectorAll('.bento-tile.edit'), document.getElementById('bento-end')];
  for (const el of targets) {
    el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('over'); });
    el.addEventListener('dragleave', () => el.classList.remove('over'));
    el.addEventListener('drop', e => {
      e.preventDefault(); el.classList.remove('over');
      const p = read(e); const at = el.dataset.idx !== undefined ? Number(el.dataset.idx) : ed.layout.length;
      if (p?.kind) addTile(p.kind, at);
      else if (p?.from !== undefined && p.from !== at) { const [t] = ed.layout.splice(p.from, 1); ed.layout.splice(p.from < at ? at - 1 : at, 0, t); ed.dirty = true; rerender(); }
    });
  }
}

function addTile(kind, at = ed.layout.length) {
  const q = ['mcq', 'numeric', 'written'].includes(kind);
  const w = kind === 'written' || kind === 'exhibit' ? 4 : 2;
  editTile({ id: tileId(), kind: q ? 'question' : kind, w, h: kind === 'text' && ed.target.kind === 'case' ? 2 : 1, newType: q ? kind : null }, at, true);
}

const RT_TOOLS = [['heading-1', '# ', '', 'line', 'Heading'], ['heading-2', '## ', '', 'line', 'Subheading'], ['bold', '**', '**', 'wrap', 'Bold'], ['italic', '*', '*', 'wrap', 'Italic'], ['list', '- ', '', 'line', 'Bullet list'], ['list-ordered', '1. ', '', 'line', 'Numbered list']];

/* tile edit modal */
function editTile(t, idx, isNew = false) {
  const s = getState(); const info = targetInfo(s, ed.target, S.currentUser(s));
  const e = t.kind === 'question' ? (S.exerciseById(s, t.exerciseId) || { type: t.newType }) : null;
  const f = (label, inner, full = true) => `<label class="field ${full ? 'full' : ''}"><span>${label}</span>${inner}</label>`;
  let body = '';
  if (t.kind === 'text') body = f('Heading', `<input class="input" name="title" value="${esc(t.title || '')}">`)
    + `<div class="field full"><span>Text</span><div class="rt-toolbar" role="toolbar" aria-label="Formatting">${RT_TOOLS.map(([ic, pre, post, mode, label]) => `<button type="button" class="btn btn-ghost btn-sm btn-icon" data-action="rt" data-pre="${esc(pre)}" data-post="${esc(post)}" data-mode="${mode}" title="${label}" aria-label="${label}">${icon(ic)}</button>`).join('')}<span class="small faint">Blank line = new paragraph</span></div>
      <textarea class="textarea" name="body" id="rt-body" style="min-height:200px">${esc(t.body || '')}</textarea></div>
      <div class="field full"><span>Preview</span><div class="rt-preview prose" id="rt-preview">${richText(t.body)}</div></div>`;
  if (t.kind === 'image') body = f('Image file (PNG, JPG, SVG · max 8 MB)', `<input class="input" type="file" name="file" accept="image/*" style="padding-top:5px">`) + (t.media || t.src ? '<p class="small muted full">Leave empty to keep the current image.</p>' : '')
    + f('Caption', `<input class="input" name="caption" value="${esc(t.caption || '')}">`, false)
    + f('Fit', `<select class="select" name="fit"><option value="cover" ${t.fit !== 'contain' ? 'selected' : ''}>Fill the tile (may crop)</option><option value="contain" ${t.fit === 'contain' ? 'selected' : ''}>Show the whole image</option></select>`, false);
  if (t.kind === 'audio') body = f('Title', `<input class="input" name="title" value="${esc(t.title || '')}" placeholder="e.g. Voice note from the manager">`) + f('Audio file (MP3, M4A, WAV · max 15 MB, optional)', `<input class="input" type="file" name="file" accept="audio/*" style="padding-top:5px">`) + f('Transcript (used for the voice if no file)', `<textarea class="textarea" name="transcript">${esc(t.transcript || '')}</textarea>`);
  if (t.kind === 'exhibit') { const tb = t.table || { title: 'Exhibit', columns: ['Item', 'Value'], rows: [] }; body = f('Title', `<input class="input" name="ttitle" value="${esc(tb.title)}">`) + f('Table — first line is the header, separate cells with |', `<textarea class="textarea mono" name="grid" style="min-height:160px">${esc([tb.columns, ...tb.rows].map(r => r.join(' | ')).join('\n'))}</textarea>`) + f('Note', `<input class="input" name="note" value="${esc(tb.note || '')}">`); }
  if (t.kind === 'check') body = f('Question', `<textarea class="textarea" name="prompt" required>${esc(t.prompt || '')}</textarea>`)
    + `<div class="field full"><span>Options — select the correct one</span>${[0, 1, 2, 3].map(i => `<label class="row gap-2"><input type="radio" name="answerIndex" value="${i}" ${(t.answerIndex ?? 0) === i ? 'checked' : ''} aria-label="Correct option ${'ABCD'[i]}"><span class="mono small">${'ABCD'[i]}</span><input class="input" name="opt${i}" value="${esc(t.options?.[i] || '')}" ${i < 2 ? 'required' : ''} placeholder="${i < 2 ? '' : 'Optional'}"></label>`).join('')}</div>`
    + f('Explanation shown after answering', `<input class="input" name="explain" value="${esc(t.explain || '')}">`);
  if (e) {
    body = f('Short title', `<input class="input" name="title" value="${esc(e.title || '')}">`, false) + `<div></div>` + f('Question', `<textarea class="textarea" name="prompt" required>${esc(e.prompt || '')}</textarea>`);
    if (e.type === 'mcq') body += `<div class="field full"><span>Options — select the correct one</span>${[0, 1, 2, 3].map(i => `<label class="row gap-2"><input type="radio" name="answerIndex" value="${i}" ${(e.answerIndex ?? 0) === i ? 'checked' : ''} aria-label="Correct option ${'ABCD'[i]}"><span class="mono small">${'ABCD'[i]}</span><input class="input" name="opt${i}" value="${esc(e.options?.[i] || '')}" required></label>`).join('')}</div>` + f('Explanation shown after answering', `<input class="input" name="solution" value="${esc(e.solution || '')}">`);
    if (e.type === 'numeric') body += f('Correct answer', `<input class="input" name="answer" inputmode="decimal" value="${esc(e.answer ?? '')}" required>`, false) + f('Unit', `<input class="input" name="unit" value="${esc(e.unit || '')}">`, false) + f('Tolerance (±)', `<input class="input" name="tol" inputmode="decimal" value="${esc(e.tol ?? '')}" placeholder="auto">`, false) + `<div></div>` + f('Worked solution', `<textarea class="textarea" name="solution">${esc(e.solution || '')}</textarea>`);
    if (e.type === 'written') body += f('Model answer', `<textarea class="textarea" name="model" required>${esc(e.model || '')}</textarea>`) + f('Marking points (one per line)', `<textarea class="textarea" name="marking">${esc((e.marking || []).join('\n'))}</textarea>`) + f('Target length (words)', `<input class="input" type="number" name="words" value="${e.words || 120}">`, false);
  }
  const kindLabel = TILE_KINDS[e ? e.type : t.kind].label;
  ed.pending = { t: clone(t), idx, isNew };
  openModal(`${modalHead(`${isNew ? 'Add' : 'Edit'} · ${kindLabel}`, esc(info.title))}<form data-submit="bento-tile-save"><div class="modal-body"><div class="form-grid">${body}</div></div>
    <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('check')} ${isNew ? 'Add tile' : 'Save tile'}</button></footer></form>`, { wide: true });
  const ta = document.getElementById('rt-body');
  ta?.addEventListener('input', () => { document.getElementById('rt-preview').innerHTML = richText(ta.value); });
}

/** Toolbar: wrap the selection (bold/italic) or prefix the selected lines (heading/list). */
function applyFormat(el) {
  const ta = document.getElementById('rt-body'); if (!ta) return;
  const { pre, post, mode } = el.dataset; const a = ta.selectionStart, b = ta.selectionEnd, v = ta.value;
  if (mode === 'wrap') {
    const sel = v.slice(a, b) || 'text';
    ta.value = v.slice(0, a) + pre + sel + post + v.slice(b);
    ta.setSelectionRange(a + pre.length, a + pre.length + sel.length);
  } else {
    const start = v.lastIndexOf('\n', a - 1) + 1; const end = v.indexOf('\n', b) === -1 ? v.length : v.indexOf('\n', b);
    const lines = v.slice(start, end).split('\n').map((x, i) => (pre === '1. ' ? `${i + 1}. ` : pre) + x.replace(/^(#{1,2} |[-•] |\d+[.)] )/, ''));
    ta.value = v.slice(0, start) + lines.join('\n') + v.slice(end);
    ta.setSelectionRange(start, start + lines.join('\n').length);
  }
  ta.focus(); ta.dispatchEvent(new Event('input'));
}

async function saveTile(data) {
  const { t, idx, isNew } = ed.pending;
  const s = getState();
  if (t.kind === 'text') Object.assign(t, { title: data.get('title').trim(), body: data.get('body').trim() });
  if (t.kind === 'image' || t.kind === 'audio') {
    const file = data.get('file');
    if (file && file.size) {
      const max = t.kind === 'image' ? 8 : 15;
      if (file.size > max * 1048576) { toast(`File is larger than ${max} MB`, 'danger'); return; }
      const key = `media:${t.id}`; await putFile(key, file); urls.delete(key);
      t.media = { key, name: file.name, type: file.type }; delete t.src;
    } else if (t.kind === 'image' && !t.media && !t.src) { toast('Choose an image', 'warn'); return; }
    if (t.kind === 'image') Object.assign(t, { caption: data.get('caption').trim(), fit: data.get('fit') });
    else Object.assign(t, { title: data.get('title').trim(), transcript: data.get('transcript').trim() });
    if (t.kind === 'audio' && !t.media && !t.transcript) { toast('Add an audio file or a transcript', 'warn'); return; }
  }
  if (t.kind === 'exhibit') {
    const lines = data.get('grid').split('\n').map(l => l.split('|').map(x => x.trim())).filter(r => r.some(Boolean));
    if (lines.length < 2) { toast('Add a header line and at least one row', 'warn'); return; }
    t.table = { title: data.get('ttitle').trim() || 'Exhibit', columns: lines[0], rows: lines.slice(1), note: data.get('note').trim() };
  }
  if (t.kind === 'check') {
    const raw = [0, 1, 2, 3].map(i => data.get(`opt${i}`).trim());
    const answer = Number(data.get('answerIndex'));
    if (!raw[answer]) { toast('The correct option cannot be empty', 'warn'); return; }
    const keep = raw.map((o, i) => [o, i]).filter(([o]) => o);
    if (keep.length < 2) { toast('Write at least two options', 'warn'); return; }
    Object.assign(t, { prompt: data.get('prompt').trim(), options: keep.map(([o]) => o), answerIndex: keep.findIndex(([, i]) => i === answer), explain: data.get('explain').trim() });
  }
  if (t.kind === 'question') {
    const c = S.resourceById(s, ed.target.id);
    const old = S.exerciseById(s, t.exerciseId);
    const type = old?.type || t.newType;
    const ex = { id: old?.id, caseId: c.id, unitId: c.unitId, type, title: data.get('title'), prompt: data.get('prompt') };
    if (type === 'mcq') Object.assign(ex, { options: [0, 1, 2, 3].map(i => data.get(`opt${i}`).trim()), answerIndex: Number(data.get('answerIndex')), solution: data.get('solution').trim() });
    if (type === 'numeric') Object.assign(ex, { answer: Number(String(data.get('answer')).replace(/,/g, '')), unit: data.get('unit').trim(), tol: data.get('tol') ? Number(data.get('tol')) : null, solution: data.get('solution').trim() });
    if (type === 'written') Object.assign(ex, { model: data.get('model').trim(), marking: data.get('marking').split('\n').map(x => x.trim()).filter(Boolean), words: Number(data.get('words')) || 120 });
    const id = dispatch('EXERCISE_SAVED', { exercise: ex });
    if (!id) return;
    t.exerciseId = id; delete t.newType;
  }
  if (isNew) ed.layout.splice(idx, 0, t); else ed.layout[idx] = t;
  ed.dirty = true; closeModal(); rerender();
}

function saveLayout() {
  if (ed.target.kind === 'case') return dispatch('CASE_LAYOUT_SAVED', { id: ed.target.id, layout: ed.layout });
  const l = S.lessonById(getState(), ed.target.lessonId);
  const blocks = l.blocks.map(b => b.id === ed.target.blockId ? { ...b, layout: clone(ed.layout) } : b);
  const ok = dispatch('LESSON_UPDATED', { id: l.id, patch: { blocks } });
  if (ok) toast('Page saved');
  return ok;
}

function phonePreview() {
  const s = getState(); const info = targetInfo(s, ed.target, S.currentUser(s));
  openModal(`${modalHead('Phone preview', 'How students see this page on a phone')}<div class="modal-body"><div class="phone-frame"><div class="phone-screen" id="phone-screen"><h3 class="tile-h">${esc(info.title)}</h3>${pageGrid(s, info.b, { mode: 'student', layout: ed.layout })}</div></div></div>`);
  mountMedia(document.getElementById('phone-screen'));
}

export const actions = {
  'case-new': () => {
    const s = getState();
    openModal(`${modalHead('New case study', 'Start with a title and unit, then build it tile by tile.')}<form data-submit="case-create"><div class="modal-body"><div class="form-grid">
      <label class="field full"><span>Title</span><input class="input" name="title" required autofocus></label>
      <label class="field"><span>Unit</span><select class="select" name="unitId">${s.units.map(u => `<option value="${u.id}">${u.id} · ${esc(u.title)}</option>`).join('')}</select></label>
      <label class="field"><span>Duration (min)</span><input class="input" type="number" name="minutes" value="40"></label></div></div>
      <footer class="modal-foot"><button type="button" class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary">${icon('layout-grid')} Create & edit</button></footer></form>`);
  },
  'case-create': (form, data) => {
    const id = dispatch('RESOURCE_CREATED', { type: 'case_study', title: data.get('title'), unitId: data.get('unitId'), minutes: data.get('minutes'), body: '' });
    if (!id) return;
    const target = { kind: 'case', id };
    ed.key = JSON.stringify(target); ed.target = target; ed.layout = [{ id: tileId(), kind: 'text', w: 2, h: 2, title: 'The situation', body: 'Describe the business situation here.' }]; ed.dirty = true;
    closeModal(); location.hash = `/instructor/caseedit/${id}`;
  },
  'bento-add': (el) => addTile(el.dataset.kind),
  'bento-w': (el) => { const t = ed.layout[Number(el.dataset.i)]; t.w = Math.max(1, Math.min(4, t.w + Number(el.dataset.d))); ed.dirty = true; rerender(); },
  'bento-h': (el) => { const t = ed.layout[Number(el.dataset.i)]; t.h = t.h === 2 ? 1 : 2; ed.dirty = true; rerender(); },
  'bento-dup': (el) => {
    const i = Number(el.dataset.i); const t = ed.layout[i];
    if (t.kind === 'question') { toast('Questions cannot be duplicated — add a new one', 'warn'); return; }
    // shortcut: a duplicated image/audio tile points at the same stored file; deleting one keeps the file.
    ed.layout.splice(i + 1, 0, { ...clone(t), id: tileId() }); ed.dirty = true; rerender();
  },
  'bento-del': async (el) => { if (await confirmDialog({ title: 'Delete this tile?', body: '<p>It disappears from the page when you save.</p>', confirmLabel: 'Delete', tone: 'danger' })) { ed.layout.splice(Number(el.dataset.i), 1); ed.dirty = true; rerender(); } },
  'bento-edit': (el) => { const i = Number(el.dataset.i); editTile(clone(ed.layout[i]), i); },
  'bento-tile-save': (form, data) => saveTile(data),
  'bento-save': () => { if (saveLayout()) { ed.dirty = false; rerender(); } },
  'bento-discard': async () => { if (await confirmDialog({ title: 'Discard changes?', body: '<p>The page goes back to its last saved version.</p>', confirmLabel: 'Discard', tone: 'danger' })) { ed.key = null; rerender(); } },
  'bento-speak': (el) => {
    if (!('speechSynthesis' in window)) { toast('Speech is not supported in this browser', 'warn'); return; }
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(el.dataset.text); u.lang = 'en-GB'; u.rate = 0.95; speechSynthesis.speak(u);
  },
  rt: (el) => applyFormat(el),
  'page-check': (el) => {
    (checkPicks[el.dataset.block] ??= {})[el.dataset.tile] = Number(el.dataset.o);
    if (document.getElementById('phone-screen')) phonePreview(); else rerender();
  },
  'pg-phone': () => phonePreview(),
  'pg-present': async () => {
    if (ed.dirty && !(await confirmDialog({ title: 'Present the saved version?', body: '<p>You have unsaved changes. The presentation shows the last saved page.</p>', confirmLabel: 'Present anyway' }))) return;
    const l = S.lessonById(getState(), ed.target.lessonId);
    openPresenter(l.id, Math.max(0, S.slidesOf(l).findIndex(x => x.b.id === ed.target.blockId)));
  },
  'present-lesson': (el) => openPresenter(el.dataset.id),
  'pres-step': (el) => stepPresenter(Number(el.dataset.d)),
  'pres-close': () => closePresenter(),
  'pres-reveal': () => document.querySelector('#presenter .presenter-stage')?.classList.toggle('reveal'),
};

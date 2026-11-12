// Thin wrapper around PDF.js (loaded on demand from cdnjs).
import { getFile } from './files.js';

const VERSION = '3.11.174';
const BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${VERSION}`;
let libp = null;
const docs = new Map();

function loadLib() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!libp) libp = new Promise((resolve, reject) => {
    const sc = document.createElement('script');
    sc.src = `${BASE}/pdf.min.js`;
    sc.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${BASE}/pdf.worker.min.js`; resolve(window.pdfjsLib); };
    sc.onerror = () => reject(new Error('Could not load the PDF viewer'));
    document.head.appendChild(sc);
  });
  return libp;
}

/** Opens the PDF stored under `key` (cached per key). Returns null when no file is stored. */
export async function openPdf(key) {
  if (docs.has(key)) return docs.get(key);
  const file = await getFile(key);
  if (!file) return null;
  const lib = await loadLib();
  const doc = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  docs.set(key, doc);
  return doc;
}
export function forgetPdf(key) { docs.delete(key); }

/** Reads page count and a flat outline [{title, page}] from a File, for metadata on upload. */
export async function inspectPdf(file) {
  const lib = await loadLib();
  const doc = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const outline = await flatOutline(doc);
  return { pages: doc.numPages, outline };
}

export async function flatOutline(doc) {
  const raw = (await doc.getOutline()) || [];
  const out = [];
  const walk = async (items, depth) => {
    for (const it of items) {
      let page = null;
      try {
        const dest = typeof it.dest === 'string' ? await doc.getDestination(it.dest) : it.dest;
        if (dest) page = (await doc.getPageIndex(dest[0])) + 1;
      } catch { /* unresolved destination */ }
      out.push({ title: it.title, page, depth });
      if (it.items?.length && depth < 2) await walk(it.items, depth + 1);
    }
  };
  await walk(raw, 0);
  return out;
}

/** Renders page `n` of `doc` into `canvas`, fitting `width` CSS pixels. */
export async function renderPage(doc, n, canvas, width) {
  const page = await doc.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const scale = (width / base.width) * (window.devicePixelRatio || 1);
  const vp = page.getViewport({ scale });
  canvas.width = vp.width; canvas.height = vp.height;
  canvas.style.width = `${width}px`; canvas.style.height = `${(vp.height / vp.width) * width}px`;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
}

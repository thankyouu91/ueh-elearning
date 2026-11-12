// Uploaded files (book PDFs, resource attachments) live in IndexedDB, keyed by the owning record id.
// Metadata (name, size, pages) is kept in app state; the bytes stay in this browser only (demo, no backend).
const DB = 'ueh-learning-files';
const STORE = 'files';
let dbp = null;
const available = new Set();

function db() {
  if (!dbp) dbp = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbp;
}
async function tx(mode, fn) {
  const d = await db();
  return new Promise((resolve, reject) => {
    const t = d.transaction(STORE, mode);
    const r = fn(t.objectStore(STORE));
    t.oncomplete = () => resolve(r?.result);
    t.onerror = () => reject(t.error);
  });
}

export async function initFiles() {
  try { (await tx('readonly', s => s.getAllKeys()) || []).forEach(k => available.add(k)); } catch { /* storage blocked */ }
}
export const hasFile = (key) => available.has(key);
export async function putFile(key, file) {
  await tx('readwrite', s => s.put(file, key));
  available.add(key);
}
export async function getFile(key) {
  try { return await tx('readonly', s => s.get(key)); } catch { return null; }
}
export async function deleteFile(key) {
  await tx('readwrite', s => s.delete(key));
  available.delete(key);
}
export const fmtSize = (b) => b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;

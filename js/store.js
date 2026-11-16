import { buildSeed } from './seed.js';
import { BRAND } from './config.js';

let state = null;
const listeners = new Set();

export function load() {
  try {
    const raw = localStorage.getItem(BRAND.storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 15) { state = parsed; state.clock.setAt = Date.now(); return state; }
    }
  } catch { /* storage unavailable or corrupt: fall back to seed */ }
  state = buildSeed();
  persist();
  return state;
}

export const getState = () => state;

function persist() {
  try { localStorage.setItem(BRAND.storageKey, JSON.stringify(state)); } catch { /* ignore */ }
}

export function commit() {
  persist();
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function resetDemo() {
  const session = state?.session;
  const theme = state?.ui?.theme;
  state = buildSeed();
  if (session) state.session = session;
  if (theme) state.ui.theme = theme;
  commit();
}

let idSeq = 0;
export const newId = (prefix) => `${prefix}-${Date.now().toString(36)}${(++idSeq).toString(36)}`;

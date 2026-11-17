// ESP class content: English for Marketing Communication (B1–B1+). Unit list in mkt-units.js; items, question bank,
// vocabulary, grammar and library resources in mkt-a…d.js (one file per block of four weeks).
import * as a from './mkt-a.js';
import * as b from './mkt-b.js';
import * as c from './mkt-c.js';
import * as d from './mkt-d.js';
export { UNITS, WEEKS } from './mkt-units.js';
export { LESSONS } from './mkt-lessons.js';

const parts = [a, b, c, d];
export const EXTRA_EXERCISES = parts.flatMap(p => p.EXTRA);
export const EXTRA_LIBRARY = parts.flatMap(p => p.LIB);
export const Q = parts.flatMap(p => p.Q);
export const VOCAB = parts.flatMap(p => p.VOCAB);
export const GRAMMAR = parts.flatMap(p => p.GRAMMAR);

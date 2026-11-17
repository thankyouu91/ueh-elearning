// Shorthand for workbook content. Same shapes as js/seed-workbook.js, plus multiple choice and mini-cases.
// C classify, O order, N numeric (auto-checked, tolerance optional), W written (marked by the lecturer), M multiple choice.
export const C = (unitId, title, prompt, categories, items, solution) => ({ unitId, type: 'classify', title, prompt, categories, items, solution });
export const O = (unitId, title, prompt, steps, solution) => ({ unitId, type: 'order', title, prompt, steps, solution });
export const N = (unitId, title, prompt, answer, unit, solution, tol = null) => ({ unitId, type: 'numeric', title, prompt, answer, unit, tol, solution });
export const W = (unitId, title, prompt, model, marking, words = 120) => ({ unitId, type: 'written', title, prompt, model, marking, words });
/** options: 4 strings; answerIndex: 0–3. */
export const M = (unitId, title, prompt, options, answerIndex, solution) => ({ unitId, type: 'mcq', title, prompt, options, answerIndex, solution });
/** A short case shown once above the exercises that use it: CASE('E1-mc', 'Title', 'Situation text…', [N(...), M(...), W(...)]). */
export const CASE = (id, title, text, exercises) => exercises.map(e => ({ ...e, scenario: { id, title, text } }));

/* ---------- ESP (English for Specific Purposes) helpers: the subject is the context, English is the goal ---------- */
// Every item is tagged with a skill (R reading, L listening, S speaking, W writing, U vocabulary & grammar), a CEFR level and its source.
const esp = (skill, list) => list.map(e => ({ ...e, pack: 'ESP-MKT', level: 'B1', skill, source: 'ueh' }));
/** Reading: one text (150–200 words) with its questions. READ('E2-r1', 'Title', 'Text…', [M(...), M(...)]) */
export const READ = (id, title, text, qs) => esp('R', qs.map(e => ({ ...e, scenario: { id, title, text } })));
/** Listening: `audio` is the transcript, read aloud by the browser; students do not see it. */
export const LISTEN = (id, title, audio, qs) => esp('L', qs.map(e => ({ ...e, scenario: { id, title, audio } })));
/** Speaking: recorded for about a minute, marked by the lecturer. `content` is the first marking point. */
export const SPEAK = (unitId, title, prompt, model, content) => esp('S', [{ ...W(unitId, title, prompt, model, [content, 'Language: unit vocabulary and simple linking words (because, so, however)', 'Delivery: clear, steady pace, understandable pronunciation'], 90), speak: true, seconds: 60 }]);
/** Writing: email, memo or short report, marked by the lecturer. `content` is the first marking point. */
export const WRITE = (unitId, title, prompt, model, content, words = 100) => esp('W', [W(unitId, title, prompt, model, [content, 'Organisation: clear purpose, short paragraphs, suitable opening and closing', 'Language: B1 grammar and unit vocabulary used accurately; polite business tone'], words)]);
/** Vocabulary & grammar (use of English): USE([C(...), M(...), O(...)]) */
export const USE = (list) => esp('U', list);

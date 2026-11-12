// Shorthand for workbook content. Same shapes as js/seed-workbook.js, plus multiple choice and mini-cases.
// C classify · O order · N numeric (auto-checked, tolerance optional) · W written (marked by the lecturer) · M multiple choice.
export const C = (unitId, title, prompt, categories, items, solution) => ({ unitId, type: 'classify', title, prompt, categories, items, solution });
export const O = (unitId, title, prompt, steps, solution) => ({ unitId, type: 'order', title, prompt, steps, solution });
export const N = (unitId, title, prompt, answer, unit, solution, tol = null) => ({ unitId, type: 'numeric', title, prompt, answer, unit, tol, solution });
export const W = (unitId, title, prompt, model, marking, words = 120) => ({ unitId, type: 'written', title, prompt, model, marking, words });
/** options: 4 strings; answerIndex: 0–3. */
export const M = (unitId, title, prompt, options, answerIndex, solution) => ({ unitId, type: 'mcq', title, prompt, options, answerIndex, solution });
/** A short case shown once above the exercises that use it: CASE('E1-mc', 'Title', 'Situation text…', [N(...), M(...), W(...)]). */
export const CASE = (id, title, text, exercises) => exercises.map(e => ({ ...e, scenario: { id, title, text } }));

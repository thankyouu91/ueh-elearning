# Content spec: English for Marketing Communication (ESP, CEFR B1–B1+)

You write lesson content for one UEH University class: Bachelor of Marketing, 16 weeks. Read these first:
- `js/content/mkt-units.js`: the 16 units (id, title, can-do summary, language focus, genre) and the week order. Your units' rows tell you the topic, grammar point and genre.
- `js/content/helpers.js`: the item helpers you must use (`C`, `O`, `M`, `READ`, `LISTEN`, `SPEAK`, `WRITE`, `USE`).
- `js/content/wb-mkt.js`: an older file in the exact same format. Copy its style and structure (but none of its texts; that file will be deleted).
- `docs/esp/marketing-communication-nqf4.md`: the course blueprint.

## Rules
1. ESP: English is the goal, marketing is the context. Every item tests English (reading, listening, speaking, writing, vocabulary, grammar). No calculation items, no marketing-theory recall without a language point. Do not use `N` (numeric).
2. Level B1–B1+: short sentences, common words plus the unit's marketing terms. Reading texts 150–220 words. Listening transcripts 110–170 words, natural spoken style (it is read aloud by the browser; the student does not see it).
3. All text is 100% English. Original writing only: never copy text from any published book or website.
4. Context: Vietnam. Running case company: **Green Leaf Tea (Trà Lá Xanh)**, a fictional tea-and-snack company from Da Lat that sells in Ho Chi Minh City (shops, online, gift boxes, a new cold-brew bottle line). Recurring people: Ms Nguyen Thu Ha (marketing manager), Mr Le Quang Minh (founder), Linh (marketing assistant, a UEH graduate), Mr Tran (supplier, tea farm in Bao Loc). You may add other fictional Vietnamese businesses and people. No real brands or real people.
5. Method: genre-based teaching–learning cycle. In each teaching unit (MK…), the READ text is a **model text of the unit's genre** (for example the actual memo, proposal, press release), and at least one `O` (order) item asks students to put the moves/parts of that genre in order (deconstruction). The WRITE task asks them to produce the same genre about a new situation (independent construction). The SPEAK task is a realistic workplace task (TBLT): pitch, briefing, role-play, explaining, presenting.
6. Explanations (`solution` strings) are short, one or two sentences, and say *why* in plain English.
7. Use `M` options as 4 strings; vary `answerIndex` (0–3) across items. Never "all of the above".

## What each unit must contain (`EXTRA` array)
For a teaching unit (MK1–MK10), in this order, under a comment header like `/* ---------------- MK1, Who are our stakeholders? — present simple for classifying ---------------- */`:
- `...USE([...])` with 6 items: 2 vocabulary (one `C` classify, one `M` word-in-context or word-formation), 3 grammar `M` on the unit's language focus, 1 `O` ordering the genre's moves.
- `...READ('MKx-r', 'Reading, <title>', '<model text>', [3 × M])`: main idea, detail, vocabulary in context.
- `...LISTEN('MKx-l', 'Listening, <title>', '<transcript>', [3 × M])`: gist, detail (numbers/names/dates), speaker's opinion or next step.
- `...SPEAK('MKx', 'Speaking, <title>', '<prompt: who you are, who you talk to, what to cover, about 1 minute>', '<model answer ~90–110 words>', 'Content: <the first marking point>')`
- `...WRITE('MKx', 'Writing, <title>', '<prompt with situation, reader, purpose, 3 content points, word count>', '<model answer>', 'Content: <the first marking point>', <words 100–150>)`
That is 15 auto-checked/marked items per unit.

For review / exam / project units (RV1, MID, PJ1, PJ2, RV2, FX):
- RV1, RV2, MID, FX: `USE` with 8 mixed items recycling the vocabulary and grammar of the units they review (RV1: MK1–MK5; MID: MK1–MK7; RV2: MK6–MK10; FX: MK1–MK10), one READ (3 M), one LISTEN (3 M), one SPEAK, one WRITE. Titles start "Review, …" / "Exam practice, …".
- PJ1, PJ2: project workshops. `USE` with 5 items (useful phrases for teamwork, feedback, presenting; one `O` ordering proposal or press-release parts), one READ (a peer team's draft proposal or press release, 3 M), one LISTEN (a team meeting or a pitch with questions, 3 M), one SPEAK (PJ1: give feedback on a draft; PJ2: the pitch, 2 minutes, set `seconds` is fixed by the helper so just say "about 2 minutes" in the prompt), one WRITE (PJ1: the proposal draft section, 150 words; PJ2: the launch press release, 150 words).

## Other exports (same file)
```js
// [unitId, stem, options (FIRST option = correct answer; the seed shuffles them), bloom]  bloom ∈ Remember | Understand | Apply | Analyze
export const Q = [ ... ];        // 6 per unit: 2 Remember, 2 Understand, 1–2 Apply, 0–1 Analyze. Short, exam-style, language-focused.
// [term, Vietnamese, definition (plain English), unitId, part of speech, word family 'a (n), b (v), c (adj)', example sentence (Green Leaf Tea / Vietnam context), collocations 'x, y, z']
export const VOCAB = [ ... ];    // count given in your task, for teaching units only (none for RV/MID/PJ/FX unless told). Use ", " as separator inside family and collocations (never "·").
// [id, unitId, name, vietnameseName, form, use, useVi, examples (3 sentences), watchOut]
export const GRAMMAR = [ ... ];  // exactly one row per teaching unit you own, matching that unit's language focus. id = 'G-' + unitId. form uses ", " separators. useVi is Vietnamese.
// [id, type, unitId, title, minutes, body]  type ∈ activity | worksheet | practical | group_project
export const LIB = [ ... ];      // 2 per unit you own: one classroom speaking activity (TBLT, with clear steps) and one worksheet/practical/group_project. body 60–120 words, English. Use your id prefix.
export const EXTRA = [ ... ];
```
The file starts with a 2-line comment and `import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';` (import only what you use). Escape apostrophes inside single-quoted strings, or use double quotes. Plain ASCII punctuation is fine; Vietnamese only in the Vietnamese columns.

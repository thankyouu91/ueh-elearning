# Handoff notes

Status of the work, for continuing in another session or on another machine.

## Run

`node server.js`, then open http://localhost:3000. Any static server also works.

Demo data lives in browser `localStorage`; the key is in `js/config.js`. The state version is 12, set in `js/store.js` and `js/seed.js` (they must match, or every reload rebuilds the seed and signs the user out). Bump the version whenever seed data changes, so browsers load the new seed.

## Latest work: 4-skill layer

- **Skill and CEFR tags:** `S.SKILLS`, `S.skillOf`, `S.skillProfile` in `js/selectors.js`. Exercises without an explicit tag get a skill automatically:
  - a scenario with `audio` → Listening
  - `speak: true` → Speaking
  - `written` → Writing
  - everything else → Reading
- **Business English · Level 1 (CEFR B1) sample pack:** `js/content/be-b1.js`. It has 24 exercises: units E1, A1, F1 and M1, each with all four skills.
- **Listening:** a multiple-choice question whose `scenario.audio` holds the transcript. It is played with the browser's `speechSynthesis`.
- **Speaking:** a `written` exercise with `speak: true`. The student records with `MediaRecorder`; the recording is stored in IndexedDB through `js/features/files.js`. A student without a microphone can type the answer instead. Spoken answers go to the same marking queue as written ones.
- **Lecturer page:** `#/instructor/workbook/skills`. It shows the pack, the class score per skill, unit × skill coverage, and filters.
- **Student page:** a "My four skills" card on the workbook overview.

Checked in the browser, except recording with a real microphone.

## Open items

- Recordings are stored only in the student's browser. Real use needs a backend.
- The dashboard already scrolled about 28 px horizontally before this work.
- Library resources (cases, projects, worksheets) do not have 4-skill tags yet.
- The official UEH logo file is still missing (`assets/ueh-logo.png`, `logoSrc` in `js/config.js`).

## ESP repositioning (2026-11-16)

- The course is English for Specific Purposes (B1): the business subject is only the context. All 24 units were rewritten: 384 new items in `js/content/wb-*.js` (helpers `READ`, `LISTEN`, `SPEAK`, `WRITE`, `USE` in `helpers.js`) plus the 24 items of `be-b1.js`. `EXERCISES` in `js/seed-workbook.js` is now empty; the 8 full cases have language tasks.
- A fifth skill tag, `U` (vocabulary & grammar), was added to `S.SKILLS`.
- Content sources: `S.SOURCES`, `S.sourceOf`, `S.sourceCoverage`. Books, extracts and `material` blocks are `book`; everything else is `ueh`.
- Open: real ESP coursebook titles and licence terms are not entered (the 15 library books are placeholders from the earlier subject design); coursebook exercises are not in the platform, only PDFs and page references; the student radar chart is still by context strand, not by skill.
## Vocabulary method (2026-11-16)

Each `VOCAB` row in `js/seed.js` is `[term, vi, def, unitId, pos, family, example, collocations]`. The student page `#/student/vocabulary` reveals one word in four steps — the word, what kind of word it is, its meaning in English and Vietnamese, then the word in a sentence with its collocations. The `vocabulary` lesson block shows the same four things in a list. The old flip card and its CSS are gone. State version 13.

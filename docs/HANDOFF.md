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
## Grammar reference (2026-11-16)

`GRAMMAR` in `js/seed.js` holds one point per unit, 24 rows: `[id, unitId, name, vi, form, use, useVi, examples, watchOut]`. The student page `#/student/grammar` (sidebar, under Vocabulary) reveals it in four steps — the pattern, when to use it, three business examples with a common-mistake warning, then practice. Practice reuses the unit's own `skill: 'U'` exercises through `studentExercise`, and stays locked until the class reaches that unit. State version 14.

## ESP Marketing class (2026-11-17)
- All earlier demo content (5 subjects, 31 units, 5 classes) was removed. The platform now holds one class: **MKT-K50-ESP01**, *English for Marketing Communication (ESP, B1–B1+)*, 30 students, week 9 of 16.
- Content lives in `js/content/`: `mkt-units.js` (16 units and week order) and `mkt-a…d.js` (workbook items, question bank `Q`, `VOCAB`, `GRAMMAR`, library `LIB`). `index.js` combines them; `js/seed.js` imports them. Spec for writing more: `docs/esp/content-spec.md`.
- Method: genre-based teaching–learning cycle plus task-based speaking. `blocksForUnit` in `js/seed.js` builds the lesson blocks in that order.
- Users kept: P1 (Vice Rector), D3 (Dean, Marketing), I3 and I2 (ESP lecturers), A1 (admin). State version is 16.
- Not done: nobody has proofread the English and Vietnamese content yet; speaking recordings still live only in the browser.
- Lessons (2026-11-17, later): each lesson is about 90 minutes in 9 stages (lead-in, key words, model text, genre analysis, language focus, listening, speaking, writing, practice check). The stages are `page` blocks that embed the unit's real workbook items. The plan per unit (minutes, lead-in, genre moves, speaking prep, writing frame, checklist) is in `js/content/mkt-lessons.js`; `blocksForUnit(unit, ctx)` in `js/seed.js` builds the blocks from it. State version is 17.
- Green Leaf Tea storyline (keep new content consistent with it): first store in Da Lat 2016, Ho Chi Minh City since 2021. Eight shops at the start of the course (MK1); the ninth opens in Phu Nhuan (RV1); the tenth opens in Thu Duc City on 12 September (MK10 writing, FX). Cold brew: in its own shops from January, promoted on social media in March; sales were 1,500 bottles in January, 2,400 in March, 3,000 in April, a peak of 4,200 in May and 3,700 in June. It went on sale in 40 Sao Mai Mart supermarkets on 2 June (MK6 plans it, MK10 press release). One character per name: Ms Mai (Mai Spa, MK1), Mr Phong (Saigon Fit, MK4), Ms Hoa (Hoa Coffee, MK5), Ms Thao (customer, MK10), Mr Khang (Moon River Bakery, RV2). State version 18.
- Midterm (2026-11-17): a 120-minute, 4-skill paper (`js/content/mkt-midterm.js`, seeded by `js/seed-midterm.js`). It has 55 auto-checked items (Listening 20, Reading 20, Vocabulary & Grammar 15) and 5 tasks the lecturer marks (Writing 2, recorded Speaking 3). Part weights are 25/25/15/20/15. The assessment has `parts`; the tasks are exercises with `caseId: 'EXAM:<assessment id>'`, so they stay out of the workbook but go to the marking queue, where they come first. After submission the attempt is `pending_marking`. When the last task is marked, `WORKBOOK_GRADED` sets the weighted score (`S.examBreakdown`) and only then does the attempt count in the course grade. State version is 20.

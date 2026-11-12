# Handoff notes

Status of the work, for continuing in another session or on another machine.

## Run

`node server.js`, then open http://localhost:3000. Any static server also works.

Demo data lives in browser `localStorage`; the key is in `js/config.js`. The state version is 10, set in `js/store.js` and `js/seed.js`. Bump the version whenever seed data changes, so browsers load the new seed.

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

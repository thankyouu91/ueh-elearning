# UEH Learning — Architecture

## Principles

1. **One data model, many views.** Every role reads the same entities. Views differ only in scope (which sections) and in which actions are allowed.
2. **State changes only through `dispatch(type, payload)`** in `js/events.js`. Each event checks permissions, updates state, writes the audit log, sends notifications to the right people, and shows a toast.
3. **No hardcoded numbers in views.** Everything shown (grades, engagement, study time, pass rate, at-risk) is computed in `js/selectors.js`.

## Data model

```
orgUnits (tree)   university ─ school ─ program          users.orgId gives deans / provost their scope
framework         16 unitIds, requiredUnitIds, minPerCoreSubject, coreSubjects
units (library)   id, subject (ECO/ACC/FIN/MGT/MKT), title, summary, worked example
programs          versions[] (unitIds × 16, status active|approved), proposal (draft|submitted|changes_requested)
sections (class)  programId, versionId → its 16-week curriculum; instructorIds; studentIds
lessons           sectionId, week, unitId (= curriculum[week]), status, blocks[], history[]
assessments       programId, sectionIds[], type, questionIds[], opensAt, closesAt, timeLimitMin, maxAttempts, origin
questions         unitId, competencyTag (= subject), bloomLevel, answerIndex
attempts · rubricGrades · activity · liveSessions · caseStudies · vocabulary (EN–VI) · notifications · auditLog
```

## Scope and drill-down

- `sectionsForUser`: student → own class; lecturer → classes taught; dean / provost → every class under `user.orgId` in the org tree.
- `orgStats(sections)` computes the same KPI set for any level, so the Organisation page is one component reused at university, school, programme, class and student level.
- Lesson approval is routed to the dean(s) whose school contains the class (`deansFor`); the provost can act anywhere.

## Curriculum lifecycle

`active version` (used by running classes) → dean edits a `proposal` (draft) → `submitted` → Academic Affairs `approves` (new version for the next intake) or `requests changes`. `validateCurriculum` enforces: 16 filled weeks, required core units present, ≥ N units per core subject, no duplicates.

## Lifecycles

- **Lesson:** `draft → submitted → approved → scheduled → published`, with `changes_requested → draft` and `rejected → (reopen) draft`. Only `draft` / `changes_requested` are editable. Approving a lesson whose week has already started publishes it at once.
- **Assessment:** status is derived from the clock: `scheduled → open → closed`.
- **Attempt:** graded on submit by comparing answers to the question key. A missed assessment counts as 0 once it closes.

## Grading

`courseGrade = Σ(categoryAverage × weight) / Σ(weights of categories that have results)`. Categories without results are excluded and the grade is marked *provisional*. Weights live in `course.gradingScheme`.

**At risk** = course grade < pass mark, **or** engagement < 60 %, **or** ≥ 2 missed assessments. Newly at-risk students trigger a notification to their instructors and the Director.

## Events

| Event | Role | Notifies |
|---|---|---|
| LESSON_CREATED / UPDATED / DELETED / REOPENED | Instructor | — |
| LESSON_SUBMITTED | Lecturer | Dean(s) of the class's school |
| LESSON_APPROVED / CHANGES_REQUESTED / REJECTED, TERM_BULK_APPROVED | Director | Lesson author (+ students when published) |
| WEEK_ADVANCED | Demo control | Students (new lessons, assessments open), instructors (closed assessments, missing lesson for next week) |
| ASSESSMENT_CREATED | Instructor / Director | Instructors (standardized), students if already open |
| ATTEMPT_SUBMITTED | Student | Instructors of the section, the student |
| RUBRIC_GRADED | Instructor | Student |
| LIVE_SESSION_STARTED / ENDED, LIVE_JOINED | Instructor / Student | Students of the section (PIN) |
| CLASS_CREATED / CLASS_JOINED / CLASS_CANCELLED | Lecturer / Student / Lecturer or Dean | Lecturer opens a class (lead, no subject lecturers yet) and gets a 6-character join code + link `#/student/join/{code}`; Dean is notified and assigns lecturers on Teaching staff. A student joining moves to that class. Cancelling moves its students to another class and redirects the old code there (`s.classRedirects`) |
| LIVE_SLIDE / LIVE_ANSWERED | Instructor / Student | — (silent: current slide, quick-check answers stored on the live session) |
| CASE_STUDY_CREATED / ASSIGNED | Dean / Provost | Lecturers |
| CURRICULUM_SAVED / SUBMITTED | Dean | Provost (on submit) |
| CURRICULUM_APPROVED / CHANGES_REQUESTED | Provost | Dean + programme lecturers |
| INTEGRATION_SYNCED | Admin | — (simulated) |
| STUDENT_FLAGGED_AT_RISK | System | Instructors + Director |

## Path to production / scaling

The front end is written so the store can be swapped for an API without touching views:

1. **Backend:** replace `store.js` persistence with an API (e.g. Node + PostgreSQL). Move the `events.js` handlers to the server unchanged in spirit: same event names, same validation, same audit/notification side effects. The client keeps `dispatch()` but POSTs the event.
2. **More schools and years:** the org tree, framework and unit library are data. Add a school or a Year 2 framework in the seed (later: an admin screen); views read them generically.
3. **Real clock:** replace `selectors.now()` with the real date; `WEEK_ADVANCED` becomes a scheduled job.
4. **Identity:** replace the demo sign-in with UEH SSO (SAML/OIDC); roles come from the identity provider or OneRoster.
5. **Integrations:** LTI 1.3 launch + grade passback, OneRoster roster sync. They are simulated on the Admin → Integrations page today.
6. **Content:** the seed course is a sample. Each new course needs units, a question bank (with competency tags) and vocabulary; competencies and benchmarks should move from constants into course configuration.

## Library, modules, exam studio, workbook

| Event | Role | Effect / notifies |
|---|---|---|
| BOOK_ADDED / BOOK_FILE_ATTACHED | Staff, admin | Book metadata; the PDF bytes stay in IndexedDB (`js/features/files.js`) |
| EXTRACT_CREATED / DELETED | Staff | Page range of a book mapped to a unit; usable as a lesson block |
| RESOURCE_CREATED | Staff | Case study / activity / worksheet / practical |
| MODULE_CREATED / UPDATED / SUBMITTED | Lecturer | 16-week plan of bank lessons + add-ons; submit notifies the Dean(s) |
| MODULE_APPROVED / CHANGES_REQUESTED | Dean, provost | Approve locks the module and creates class lessons (running weeks kept) |
| EXAM_* , COEDITOR_* , QUESTION_AUTHORED | Owner / co-editors | Draft → review (sign-offs) → locked → scheduled (creates an assessment) |
| EXAM_SUBMITTED / EXAM_CHANGES_REQUESTED | Lecturer / Dean | Papers owned by a lecturer go draft → submitted → (Dean) locked or back to draft with a note; only the Dean unlocks and schedules them (`examApprover`, `needsDeanApproval`) |
| WORKBOOK_ANSWERED | Student | Auto-grades classify / order / numeric; written answers go to the marking queue |
| WORKBOOK_GRADED | Lecturer | 0–4 mark + feedback; notifies the student |

Lesson bank lessons have `status: 'template'` and no `sectionId`. Module approval copies them into class lessons (`instantiateModule` in `events.js`).
Printable documents live at `#/print/{exam|workbook|case}/{id}` with `?ed=lecturer` for the answer edition; exams also take `?v=B` (same questions, question and option order shuffled deterministically).

## Lesson pages and teaching aids

- **Page block** (`type: 'page'`, `layout: tiles[]`): a lesson block edited like a case study (`js/views/bento.js`, route `#/instructor/pageedit/{lessonId}~{blockId}`). Tiles: text (light markup: `#`, `##`, `**bold**`, `*italic*`, `-` and `1.` lists), image (IndexedDB, this browser only), audio, data table, quick check (multiple choice stored on the tile, practice only).
- **Slides:** `slidesOf(lesson)` — one slide per block, a page gives one slide per row of tiles (4 columns). Used by the preview presenter and the live session.
- **Teaching aids** (`js/selectors.js`): `lessonQuality` (6-point reviewer checklist), `weakSpots` (items a class gets < 60 % right), `itemFlags` (too easy/hard, unused distractors, negative or "all of the above" wording), `examMinutes` (working time by Bloom level), `autoFillPicks` (bank questions that close blueprint gaps).

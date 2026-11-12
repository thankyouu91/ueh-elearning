# UEH Learning

Learning management and academic operations platform for **UEH University**. One dashboard for every level — university leadership, deans, lecturers, students and administrators — all working on the same data.

> Demo build: no backend yet. Data lives in the browser (`localStorage`) and the clock is simulated by week.

## Run

```bash
node server.js
```

Opens `http://localhost:3000`. No install step and no build step. Double-clicking `start-demo.bat` does the same.

Needs Node.js 16+ and an internet connection (icons, charts, fonts and the PDF reader load from CDNs). The server only accepts connections from this computer (`127.0.0.1`) and only serves files inside this folder. Demo data and uploaded files live in the browser, so a copy on another machine starts from the seed data. A ready-to-send copy is built at `dist/UEH-Learning-demo.zip` (without `.claude/`).

## The idea: one Economics framework, tailored by each school

- **Economics Foundation · Year 1** is the shared skeleton for the whole university: **16 units**, one per teaching week, split evenly across **4 core subjects** (Economics, Accounting, Finance, Management — 4 units each).
- Each school adapts it for its programme with a **drag-and-drop curriculum designer**, pulling units from a shared library of 35 units (including Marketing):
  - *Economics* uses the framework as is (4/4/4/4).
  - *Accounting & Finance* swaps two Management units for Auditing and Financial Markets (ECO 4 · ACC 5 · FIN 5 · MGT 2).
  - *Marketing* cuts Accounting and Finance to 2 units each and adds 6 Marketing units (ECO 3 · ACC 2 · FIN 2 · MGT 3 · MKT 6).
- Rules keep every programme comparable: exactly 16 units, 6 required core units (E1, E2, E4, A1, F1, M1), at least 2 units in each core subject.
- A change is submitted by the Dean, approved by Academic Affairs, and applies to the **next intake** — classes already running keep their plan.

## Course materials included

- **Workbook** — 408 exercises, 17 for each of the 24 units: multiple choice, sort, put in order, calculate (auto-checked, worked solutions) and short written answers (marked by the lecturer with a model answer and 4-point guide). Each unit has a short Vietnamese mini-case with 3 questions. Extra content lives in `js/content/wb-*.js` (one file per subject).
- **Case studies** — 8 full cases set in Vietnam with data exhibits, 26 tasks, and teaching notes (lesson plan, key points, extension).
- **Exam set** — complete locked finals for Economics and Accounting & Finance; a Marketing final in draft for live co-editing; a common quiz in review.
- **Lecturer side** — lecturer edition of every unit and case with class statistics, a marking queue, and printable student / lecturer editions (`#/print/...`, "Save as PDF").
- **Library resources** — 18 case studies and 10 group projects (brief, deliverables, team roles, 3-week timeline, 100-point rubric), plus activities, worksheets and practicals; any of them can be added to a lesson.
- **Library workflow** — upload book PDFs, read and extract page ranges, build lessons from extracts and resources, plan a 16-week module, finalise for classes, Dean approves and locks.

A step-by-step presenter script (Vietnamese) is in [docs/DEMO.md](docs/DEMO.md).

## Management levels

```
UEH University            Vice Rector, Academic Affairs   sees everything, approves curricula
 └─ School                Dean                            sees own school, designs curricula, approves lessons
     └─ Programme
         └─ Class         Lecturer                        builds lessons, grades, runs live classes
             └─ Student
```

The **Organisation** page shows the same KPIs at every level (students, average grade, pass rate, engagement, at-risk, lessons in review, term delivery). Click a row to go down a level, all the way to one student's record.

## What each role can do

| Role | Main screens |
|---|---|
| Vice Rector (Academic Affairs) | Dashboard, Organisation drill-down, Curricula (review/approve, compare programmes), Framework & unit library |
| Dean | Dashboard, Organisation (own school), Curriculum designer, Approvals, Master timeline, Exam bank, Repository, Analytics |
| Lecturer | Dashboard, Lessons (unit comes from the curriculum week), Assessments, Gradebook with rubric grading, Live session, Calendar |
| Student | Dashboard, My course (16-week plan), lesson player with market simulator and worked problems, Assessments, EN–VI vocabulary, Grades, Calendar, Live class |
| Administrator | Users, Licensing, Integrations (simulated), Audit log |

**Demo controls** (bottom of the sidebar): *Advance week*, *Switch account*, *Reset demo*.

## Demo walkthrough

1. **Dr. Tran Minh Quan** (Vice Rector) → Dashboard: whole-university KPIs → click *School of Marketing* → *Bachelor of Marketing* → a class → a student.
2. Same user → **Curricula**: compare the three programmes unit by unit → open the pending *Marketing* proposal → see changes, subject balance, rules → *Approve* or *Request changes*.
3. **Dr. Pham Thu Ha** (Dean, Accounting & Finance) → **Curriculum**: drag a Management unit back to the library, drag *Capital Structure* into the empty week. Required units refuse to be removed; the balance panel and rules update live. Add a reason → *Submit*.
4. **Dr. Arthur Vance** (Dean, Economics) → **Approvals**: review a lecturer's lesson → *Request changes* / *Approve*.
5. **David Harrison** (Lecturer) → **New lesson**: choose a week, the unit is filled in from the curriculum.
6. A student → *My course* → week 5 → *Market simulator*: shift demand, add a price ceiling or a tax.
7. *Advance week* → scheduled lessons publish to the right class only; assessments open and close.
8. **Sarah Kim** (Admin) → Audit log shows every step.

## Structure

```
index.html              app shell
css/tokens.css          brand + subject colours (UEH teal #03606A, orange #D47033)
css/app.css             components, layout, responsive, dark mode
js/config.js            institution name, logo, storage key
js/seed.js              demo data: org tree, framework, unit library, questions, vocabulary, classes, activity
js/seed-library.js      book collection, resources, lesson bank, module plan, exam papers
js/seed-workbook.js     workbook exercises, full case studies, seeded student answers
js/views/library.js     library, PDF reader, extracts
js/views/modules.js     module planner (lesson plan) and finalise flow
js/views/studio.js      exam studio with co-editors
js/views/workbook.js    workbook, cases, marking queue, printable documents
js/features/files.js    uploaded files (IndexedDB, this browser only)
js/features/pdf.js      PDF.js loader and page rendering
js/store.js             state, persistence, reset
js/events.js            dispatch(): the only place state changes; writes audit log + notifications
js/selectors.js         every computed number; org-tree helpers; curriculum rules
js/views/explorer.js    Organisation drill-down (university → student)
js/views/curriculum.js  drag-and-drop curriculum designer, compare matrix
js/views/<role>.js      provost, director (dean), instructor, student, admin
js/features/market-sim.js  demand & supply simulator
legacy/index.v3.html    previous prototype, kept for reference
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the data model, events and the path to production.

## Branding

- Name and logo: `js/config.js` — save the official logo as `assets/ueh-logo.png` and set `logoSrc`.
- Colours: `css/tokens.css`.

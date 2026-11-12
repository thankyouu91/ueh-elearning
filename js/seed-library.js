// Library, lesson bank, modules and exam-studio seed data.
// Book titles follow the UEH business & economics collection; files are uploaded by staff (PDF).

// [id, title, subject, suggested units, description]
const BOOKS = [
  ['BK-ECONENV', 'Economic Environment', 'ECO', ['E1', 'E2', 'E3', 'E4'], 'Economic systems, markets, price determination and the macro-economy, with local business examples.'],
  ['BK-ECON', 'Economics', 'ECO', ['E1', 'E2', 'E3'], 'Introductory micro-economics: demand and supply, elasticity and market structures.'],
  ['BK-APACC', 'Applied Accounting', 'ACC', ['A1', 'A2', 'A3', 'A4'], 'The accounting equation, double entry, financial statements and cost accounting.'],
  ['BK-FINM3', 'Financial Management · Level 3', 'FIN', ['F1', 'F2', 'F3'], 'Time value of money, ratio analysis, budgeting and working capital.'],
  ['BK-FINM4', 'Financial Management · Level 4', 'FIN', ['F3', 'F4', 'F5'], 'Investment appraisal, financial markets and cost of capital.'],
  ['BK-NVC', 'New Venture Creation', 'MGT', ['M2'], 'From business idea to business plan, legal form and start-up finance.'],
  ['BK-ENTR', 'Entrepreneurship', 'MGT', ['M2'], 'Entrepreneurial mindset, opportunity spotting and small-business skills.'],
  ['BK-EBM', 'Entrepreneurship and Business Management', 'MGT', ['M1', 'M2', 'M3'], 'Business functions, management, operations and the business plan.'],
  ['BK-MGTP', 'Management Practice', 'MGT', ['M1', 'M5'], 'Management functions, structures, leadership and people management.'],
  ['BK-OPS', 'Operations Management', 'MGT', ['M3'], 'Process design, capacity, quality and lean operations.'],
  ['BK-PROJ', 'Project Management', 'MGT', ['M3'], 'Project life cycle, scheduling, critical path and control.'],
  ['BK-COMM', 'Communication & Management Communication', 'MGT', ['M4'], 'Business writing, reports, meetings and presentations.'],
  ['BK-ADV', 'Advertising & Promotions', 'MKT', ['K3', 'K4'], 'Advertising objectives, media planning, sales promotion and campaign evaluation.'],
  ['BK-MCOM', 'Marketing Communication', 'MKT', ['K1', 'K3', 'K4'], 'The marketing mix and integrated marketing communication.'],
  ['BK-CB', 'Consumer Behaviour', 'MKT', ['K2', 'K5'], 'The buying-decision process, influences on consumers and market research.'],
];

// [id, type, unitId, title, minutes, body]
const RESOURCES = [
  ['R-C1', 'case_study', 'E2', 'Coffee export prices and Central Highlands farm incomes', 30, 'World robusta prices rise 40% after drought in competing exporters. Farmers in Dak Lak hold back stock expecting further rises, while local roasters face higher input costs.\n\n1. Draw the world market diagram before and after the drought.\n2. Why might farmers hold stock? What risk do they take?\n3. How should a local roaster respond — raise prices, change blend, or hedge?'],
  ['R-C2', 'case_study', 'F3', 'Working-capital squeeze at a Saigon bakery chain', 30, 'A 12-store bakery chain grows sales 35% in a year but runs short of cash. Suppliers now want payment in 15 days; corporate customers pay in 60 days.\n\n1. Calculate the cash conversion cycle from the data sheet.\n2. Identify three actions to free up cash.\n3. Recommend one action to the owner in a short memo.'],
  ['R-C3', 'case_study', 'K3', 'Launching a bubble-tea brand to Gen Z customers', 30, 'A new bubble-tea brand has 300 million VND for its first three months of promotion in Ho Chi Minh City.\n\n1. Define the target segment and positioning.\n2. Split the budget across channels (social, KOLs, in-store, PR) and justify it.\n3. Choose three KPIs to judge success after month one.'],
  ['R-C4', 'case_study', 'A2', 'Month-end close at a garment exporter', 30, 'The accountant of a garment exporter must close the month: 14 transactions, two in USD, and a trial balance that does not balance by 12 million VND.\n\n1. Record the transactions.\n2. Find the error that explains the 12 million difference.\n3. Explain the correction to the finance manager.'],
  ['R-C5', 'case_study', 'E4', 'Inflation and household spending in Ho Chi Minh City', 30, 'Food prices rise faster than wages for two quarters. Households switch to cheaper brands and cut eating out.\n\n1. Which groups lose most from inflation, and why?\n2. Which businesses might gain?\n3. What could the central bank do, and what are the trade-offs?'],
  ['R-C6', 'case_study', 'K2', 'Why shoppers abandon online carts', 25, 'An e-commerce fashion store sees 72% of carts abandoned at checkout.\n\n1. List likely reasons using the consumer decision process.\n2. Propose two tests to reduce abandonment.\n3. How will you measure the effect?'],
  ['R-A1', 'activity', 'E1', 'PPF in pairs: allocating a class budget', 25, 'Pairs receive a fixed budget and two options (study materials vs. a class trip). Plot the combinations you can afford, mark your choice, and state the opportunity cost of moving one step along the frontier.'],
  ['R-A2', 'activity', 'K1', 'Segment–target–position sprint for a local brand', 30, 'In teams of four, pick a Vietnamese consumer product. In 20 minutes: define two segments, choose one target, write a one-line positioning statement, and present the 4Ps in one slide.'],
  ['R-A3', 'activity', 'M1', 'Organisation chart rebuild', 20, 'Teams receive role cards for a 40-person company. Build a tall structure, then a flat one. Compare span of control, communication speed and cost.'],
  ['R-A4', 'activity', 'F2', 'Ratio race: rank five companies', 30, 'Each team gets simplified statements for five companies (provided). Calculate current ratio, net margin and gearing, then rank the companies for a cautious lender. Fastest correct ranking wins.'],
  ['R-W1', 'worksheet', 'A4', 'Break-even worksheet: café pricing', 20, 'A café has fixed costs of 45 million VND per month. Complete the table for three prices and two variable-cost scenarios, find break-even cups per month, and plot the break-even chart.'],
  ['R-W2', 'worksheet', 'F1', 'Compound interest & discounting drills', 20, 'Ten short problems: future value, present value, annuities and comparing two savings offers. Answers on the last page.'],
  ['R-W3', 'worksheet', 'E3', 'Elasticity calculations set', 20, 'Eight problems on price, income and cross elasticity using the mid-point method, with a revenue question for each.'],
  ['R-W4', 'worksheet', 'K4', 'Campaign metrics worksheet: CTR, CPC, conversion', 20, 'Use the dashboard export to calculate CTR, CPC, conversion rate and cost per order for four ad sets, then decide which to scale.'],
  ['R-P1', 'practical', 'A2', 'Practical: recording transactions in a spreadsheet ledger', 90, 'Computer-lab session. Build a general journal and ledger in Excel/Google Sheets with SUMIF formulas, post 20 transactions and extract a trial balance.'],
  ['R-P2', 'practical', 'F4', 'Practical: NPV & IRR in Excel', 90, 'Computer-lab session. Model a 5-year investment, use NPV and IRR functions, and build a sensitivity table for the discount rate.'],
  ['R-P3', 'practical', 'K5', 'Practical: designing and running a survey', 90, 'Design a 10-question survey, pilot it with classmates, collect 30 responses and summarise the results in a chart.'],
  ['R-P4', 'practical', 'E4', 'Practical: charting GDP & CPI from a dataset', 90, 'Use the practice dataset (simulated) to calculate real GDP growth and inflation, chart both series and write a 150-word interpretation.'],
  ['R-P5', 'practical', 'E2', 'Practical: classroom market trading game', 60, 'Students are buyers and sellers with private values and costs. Trade in three rounds; record prices and compare the outcome with the predicted equilibrium.'],
];

import { EXTRA_LIBRARY } from './content/index.js';

export function addLibrarySeed(st, { blocksForUnit, at, iso, CURRENT_WEEK }) {
  st.library = {
    collection: 'UEH Business & Economics collection',
    books: BOOKS.map(([id, title, subject, unitIds, description]) => ({ id, title, subject, unitIds, description, file: null, addedBy: 'A1', addedAt: iso(new Date('2026-08-20T09:00:00')) })),
    extracts: [],
  };
  st.resources = [...RESOURCES, ...EXTRA_LIBRARY].map(([id, type, unitId, title, minutes, body]) => ({ id, type, unitId, title, minutes, body, file: null, createdBy: type === 'practical' ? 'I1' : 'D1', createdAt: iso(new Date('2026-08-25T09:00:00')) }));

  /* lesson bank: reusable lessons per unit */
  const unit = (id) => st.units.find(u => u.id === id);
  let tSeq = 0;
  const tpl = (unitId, authorId, extraBlocks = []) => {
    const u = unit(unitId);
    const l = { id: `T-${++tSeq}`, sectionId: null, unitId, authorId, week: null, title: u.title, summary: u.summary, status: 'template', shared: true,
      blocks: [...blocksForUnit(u), ...extraBlocks], history: [{ at: iso(at(Math.max(1, CURRENT_WEEK - 6), 1, 10)), by: authorId, action: 'Created in lesson bank' }],
      submittedAt: null, reviewedBy: null, reviewNote: null, publishedAt: null, updatedAt: iso(at(CURRENT_WEEK - 2, 2, 14)) };
    st.lessons.push(l);
    return l;
  };
  const resBlock = (rid, extra = false) => { const r = st.resources.find(x => x.id === rid); return { id: `RB-${rid}-${Math.random().toString(36).slice(2, 6)}`, type: 'resource', resourceId: rid, title: r.title, minutes: r.minutes, extra }; };
  // Economics lecturer's bank (shared with everyone)
  ['E1', 'E3', 'E4', 'A1', 'F1', 'M1'].forEach(u => tpl(u, 'I1'));
  tpl('E2', 'I1', [resBlock('R-C1'), resBlock('R-P5', true)]);
  // Accounting & Finance lecturer
  ['A2', 'A3', 'A4', 'F2', 'F3', 'F4', 'A5', 'F5'].forEach(u => tpl(u, 'I2'));
  // Marketing lecturer (K6 deliberately missing so the planner shows a gap)
  ['M2', 'M4', 'K1', 'K2', 'K3', 'K4', 'K5'].forEach(u => tpl(u, 'I3'));

  /* module (học phần) being planned by the Marketing lecturer */
  const mkt = st.programs.find(p => p.id === 'P-MKT');
  const cur = mkt.versions[0].unitIds;
  const bankFor = (unitId) => st.lessons.find(l => l.status === 'template' && l.unitId === unitId);
  const extrasByWeek = { 9: ['R-C3'], 11: ['R-W4'], 12: ['R-P3'] };
  st.modules = [{
    id: 'MOD-1', title: 'Bachelor of Marketing · Year 1 · Term 1', programId: 'P-MKT', versionId: mkt.versions[0].id, ownerId: 'I3',
    weeks: cur.map((u, i) => ({ week: i + 1, lessonId: bankFor(u)?.id || null, extras: extrasByWeek[i + 1] || [] })),
    sectionIds: [], status: 'draft', note: null, updatedAt: iso(at(CURRENT_WEEK - 1, 4, 16)),
    history: [{ at: iso(at(CURRENT_WEEK - 3, 1, 9)), by: 'I3', action: 'Created module plan' }],
  }];

  /* exam studio */
  const qFor = (unitIds, n) => unitIds.flatMap(u => st.questions.filter(q => q.unitId === u).slice(0, n));
  const item = (q, by) => ({ questionId: q.id, addedBy: by, addedAt: iso(at(CURRENT_WEEK - 1, 2, 10)), points: 1 });
  const mktQs = qFor(['K1', 'K2', 'K3', 'K4'], 2);
  const ecoQs = qFor(['E1', 'E2', 'E3', 'E4', 'A1', 'F1', 'M1'], 1);
  st.exams = [
    {
      id: 'EX-1', title: 'Final Examination · Bachelor of Marketing', type: 'final', programId: 'P-MKT', sectionIds: ['S-MKT1', 'S-MKT2'],
      ownerId: 'D3', coEditors: [{ userId: 'I3', signedOff: false, invitedAt: iso(at(CURRENT_WEEK - 2, 1, 9)) }, { userId: 'I2', signedOff: false, invitedAt: iso(at(CURRENT_WEEK - 2, 1, 9)) }],
      durationMin: 45, status: 'draft',
      targets: { total: 16, subjects: { ECO: 3, ACC: 2, FIN: 2, MGT: 3, MKT: 6 }, bloom: { Remember: 5, Understand: 5, Apply: 4, Analyze: 2 } },
      parts: [
        { id: 'PA', title: 'Part A · Marketing', instructions: 'Choose the best answer.', items: mktQs.map((q, i) => item(q, i % 2 ? 'I3' : 'D3')) },
        { id: 'PB', title: 'Part B · Foundation subjects', instructions: 'Choose the best answer.', items: qFor(['A1', 'F1'], 1).map(q => item(q, 'I2')) },
      ],
      comments: [
        { id: 'CM1', userId: 'I3', at: iso(at(CURRENT_WEEK - 1, 2, 11)), text: 'Added two questions each for K1–K4. Still need K5 and K6.' },
        { id: 'CM2', userId: 'I2', at: iso(at(CURRENT_WEEK - 1, 3, 9)), text: 'Part B has A1 and F1. I can add an Apply-level break-even question for A3 if you want one.' },
        { id: 'CM3', userId: 'D3', at: iso(at(CURRENT_WEEK - 1, 3, 15)), text: 'Yes please — we are short on Apply/Analyze items. Target is in the blueprint.' },
      ],
      versions: [{ id: 'V1', at: iso(at(CURRENT_WEEK - 1, 3, 16)), by: 'D3', label: 'First draft', parts: null }],
      lastEdit: { by: 'D3', at: iso(at(CURRENT_WEEK - 1, 3, 15)) }, assessmentId: null,
      history: [{ at: iso(at(CURRENT_WEEK - 2, 1, 9)), by: 'D3', action: 'Created exam and invited Michael Nguyen, Nguyen Thi Mai' }],
    },
    {
      id: 'EX-2', title: 'Common Quiz · School of Economics', type: 'unit_test', programId: 'P-ECO', sectionIds: ['S-ECO1', 'S-ECO2'],
      ownerId: 'D1', coEditors: [{ userId: 'I1', signedOff: true, invitedAt: iso(at(CURRENT_WEEK - 2, 2, 9)) }],
      durationMin: 20, status: 'review',
      targets: { total: 7, subjects: { ECO: 4, ACC: 1, FIN: 1, MGT: 1, MKT: 0 }, bloom: { Remember: 3, Understand: 2, Apply: 2, Analyze: 0 } },
      parts: [{ id: 'PA', title: 'Part A', instructions: 'Choose the best answer.', items: ecoQs.map(q => item(q, 'I1')) }],
      comments: [{ id: 'CM4', userId: 'I1', at: iso(at(CURRENT_WEEK - 1, 1, 10)), text: 'Signed off. Questions match weeks 1–8.' }],
      versions: [], lastEdit: { by: 'I1', at: iso(at(CURRENT_WEEK - 1, 1, 10)) }, assessmentId: null,
      history: [{ at: iso(at(CURRENT_WEEK - 2, 2, 9)), by: 'D1', action: 'Created exam' }, { at: iso(at(CURRENT_WEEK - 1, 0, 16)), by: 'D1', action: 'Sent for review' }],
    },
  ];

  /* complete, locked final papers: one question per curriculum unit, varied thinking levels */
  const fullPaper = (id, programId, owner, co, title) => {
    const prog = st.programs.find(p => p.id === programId);
    const units = prog.versions[0].unitIds;
    const qs = units.map((u, i) => { const pool = st.questions.filter(q => q.unitId === u); return pool[(i + 1) % pool.length]; });
    const subjects = { ECO: 0, ACC: 0, FIN: 0, MGT: 0, MKT: 0 };
    const bloom = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0 };
    qs.forEach(q => { subjects[st.units.find(u => u.id === q.unitId).subject]++; bloom[q.bloomLevel]++; });
    const half = Math.ceil(qs.length / 2);
    const t = iso(at(CURRENT_WEEK - 1, 4, 10));
    st.exams.push({
      id, title, type: 'final', programId, sectionIds: st.sections.filter(x => x.programId === programId).map(x => x.id), ownerId: owner,
      coEditors: [{ userId: co, signedOff: true, invitedAt: iso(at(CURRENT_WEEK - 3, 1, 9)) }], durationMin: 45, status: 'locked',
      targets: { total: qs.length, subjects, bloom },
      parts: [
        { id: 'PA', title: 'Part A · Weeks 1–8', instructions: 'Choose the best answer. 1 mark each.', items: qs.slice(0, half).map(q => item(q, co)) },
        { id: 'PB', title: 'Part B · Weeks 9–16', instructions: 'Choose the best answer. 1 mark each.', items: qs.slice(half).map(q => item(q, owner)) },
      ],
      comments: [{ id: `CM-${id}`, userId: co, at: t, text: 'Checked every key against the bank. One question per unit, in teaching order. Signed off.' }],
      versions: [{ id: `V-${id}`, at: t, by: owner, label: 'Final version', parts: null }], lastEdit: { by: owner, at: t }, assessmentId: null,
      history: [{ at: iso(at(CURRENT_WEEK - 3, 1, 9)), by: owner, action: 'Created exam' }, { at: iso(at(CURRENT_WEEK - 2, 2, 9)), by: owner, action: 'Sent for review' }, { at: t, by: co, action: 'Signed off' }, { at: t, by: owner, action: `Locked (${qs.length} questions)` }],
    });
  };
  fullPaper('EX-3', 'P-ECO', 'D1', 'I1', 'Final Examination · Bachelor of Economics');
  fullPaper('EX-4', 'P-ACF', 'D2', 'I2', 'Final Examination · Bachelor of Accounting & Finance');
}

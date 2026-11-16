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
  ['R-C1', 'case_study', 'E2', 'Coffee export prices and Central Highlands farm incomes', 30, 'World robusta prices rise 40% after a drought in other exporting countries. Farmers in Dak Lak hold back stock because they expect further rises, while local roasters face higher costs.\n\n1. Find five key terms in the text (for example: export, drought, stock) and explain each in one simple English sentence.\n2. Role-play: a roaster phones a café owner to explain a price rise.\n3. Write a short email (about 100 words) telling a customer about the new prices.\n4. Summarise the situation to a partner in 45 seconds.'],
  ['R-C2', 'case_study', 'F3', 'Working-capital squeeze at a Saigon bakery chain', 30, 'A 12-store bakery chain grows sales 35% in a year but runs short of cash. Suppliers now want payment in 15 days; corporate customers pay in 60 days.\n\n1. Explain these terms in simple English: supplier, corporate customer, cash, payment terms.\n2. Role-play: the owner phones a customer and politely asks for faster payment.\n3. Write a short email (about 100 words) asking a customer to pay within 30 days.\n4. Tell a partner the problem in three sentences.'],
  ['R-C3', 'case_study', 'K3', 'Launching a bubble-tea brand to Gen Z customers', 30, 'A new bubble-tea brand has 300 million VND for its first three months of promotion in Ho Chi Minh City. It wants to reach students aged 18–24.\n\n1. Explain these terms in simple English: brand, promotion, channel, target customer.\n2. Mini-presentation: say which two channels (social media, KOLs, in-store, posters) you would choose and why.\n3. Write a short email (about 100 words) inviting a student creator to work with the brand.\n4. Write a 30-word social media post for the opening day.'],
  ['R-C4', 'case_study', 'A2', 'Month-end close at a garment exporter', 30, 'The accountant of a garment exporter must close the month, but the trial balance does not balance by 12 million VND. The finance manager wants to know what went wrong.\n\n1. Explain these terms in simple English: accountant, transaction, trial balance, exporter.\n2. Role-play: the accountant reports the mistake to the finance manager.\n3. Write a short report (about 100 words): what you checked, what you found, what you recommend.\n4. Summarise the situation to a partner in 45 seconds.'],
  ['R-C5', 'case_study', 'E4', 'Inflation and household spending in Ho Chi Minh City', 30, 'Food prices rise faster than wages for two quarters. Households switch to cheaper brands and cut eating out.\n\n1. Explain these terms in simple English: inflation, wages, household, brand.\n2. Pair discussion: how has your own spending changed this year? Report your partner\'s answer to the class.\n3. Write a memo (about 100 words) to a restaurant owner suggesting one idea to bring customers back.\n4. Give a 1-minute summary of the situation using "because", "so" and "however".'],
  ['R-C6', 'case_study', 'K2', 'Why shoppers abandon online carts', 25, 'An e-commerce fashion store sees 72% of carts abandoned at checkout. Customers say they dislike surprise delivery costs and a long registration form.\n\n1. Explain these terms in simple English: cart, checkout, to abandon, delivery cost.\n2. Role-play: a customer phones to complain; a customer-service agent apologises and offers a solution.\n3. Write a reply (about 100 words) to a customer complaint email.\n4. Summarise the problem and one solution in 45 seconds.'],
  ['R-A1', 'activity', 'E1', 'Mini-debate: study materials or a class trip?', 25, 'Pairs have a fixed class budget and two options: new study materials or a class trip. Each student argues for one option for two minutes, then the pair must agree and report their choice to the class in two sentences. No calculation is needed — the aim is to give opinions and reasons in English.\n\nUseful phrases: In my opinion… · I see your point, but… · If we choose…, we cannot… · Let\'s agree on…'],
  ['R-A2', 'activity', 'K1', 'Information gap: describe a local brand', 30, 'In pairs, Student A has a fact card about a Vietnamese consumer product (customers, price, where it is sold) and Student B has an empty table. B asks questions to complete the table, then the pair swaps roles with a new product. Finish by writing one sentence that describes the brand.\n\nUseful phrases: Who buys it? · How much does it cost? · Where can you buy it? · It is aimed at…'],
  ['R-A3', 'activity', 'M1', 'Role-play: introducing people and departments', 20, 'Teams receive role cards for a 40-person company (director, sales manager, accountant, HR officer and others). Students walk around, introduce themselves, and say what they do and who they report to. Then each team describes the company in four sentences.\n\nUseful phrases: I am in charge of… · I report to… · I work in the … department · She is responsible for…'],
  ['R-A4', 'activity', 'F2', 'Describing trends race: five companies', 30, 'Each team gets a simple sales chart for five companies (provided). Teams write one correct sentence about each chart, using a different trend verb each time; the first team with five correct sentences wins. Students read numbers from the charts — they do not calculate.\n\nTarget language: rise / increase / grow · fall / decrease / drop · stay the same · slightly / sharply · from … to …'],
  ['R-W1', 'worksheet', 'A4', 'Vocabulary worksheet: café costs and prices', 20, 'Key words for talking about a café business: fixed costs, rent, ingredients, price, profit, break even. Match each word to its plain-English meaning, complete ten gap-fill sentences about a café near the campus, and choose the correct collocation.\n\nCollocations: pay rent · cover costs · set a price · make a profit · break even'],
  ['R-W2', 'worksheet', 'F1', 'Vocabulary worksheet: saving and borrowing', 20, 'A matching task and ten gap-fill sentences on the language of banks: save, borrow, lend, interest, deposit, loan. Includes a short dialogue at a bank counter to complete. Answers on the last page.\n\nCollocations: open an account · earn interest · borrow money from · lend money to · pay back a loan'],
  ['R-W3', 'worksheet', 'E3', 'Language of trends worksheet: prices and sales', 20, 'Eight short line graphs show the prices and sales of everyday products. Students complete sentences with the correct verb, adverb and preposition, then write two sentences of their own.\n\nTarget language: rise / fall / remain stable · sharply / slightly / steadily · from 20,000 to 25,000 VND · As a result, …'],
  ['R-W4', 'worksheet', 'K4', 'Email phrases worksheet: reporting campaign results', 20, 'A gap-fill email from a marketing assistant to a manager about four online ads. Students choose the correct phrase for each gap, put the paragraphs in order, and match the terms "click", "view" and "order" to plain-English meanings.\n\nTarget phrases: I am writing to report… · As you can see in the table, … · The best result was… · I suggest that we… · Please let me know…'],
  ['R-P1', 'practical', 'A2', 'Practical: writing a short report on a computer', 90, 'Computer-lab session. Students read a simple table of one month of income and spending at a small shop, then type a 150-word report in a word processor with a title, three short paragraphs and a closing recommendation. They use the spell-checker, swap screens for peer feedback and submit the final file.\n\nUseful phrases: This report describes… · The largest cost was… · Overall, … · I recommend that…'],
  ['R-P2', 'practical', 'F4', 'Practical: presenting a business idea with slides', 90, 'Students prepare four slides in English (title, the idea, costs and benefits in words, recommendation) and present in pairs for three minutes. Each listener asks one question. The focus is on signposting language and clear delivery, not on numbers.\n\nUseful phrases: Today I would like to talk about… · Let\'s move on to… · As you can see on this slide… · To sum up, … · Are there any questions?'],
  ['R-P3', 'practical', 'K5', 'Practical: writing survey questions and reporting results', 90, 'Write a 10-question customer survey in English, ask classmates the questions, and report the results orally in two minutes. The focus is on correct question forms and the language of reporting.\n\nTarget language: How often do you…? · Which … do you prefer? · Most students said… · Only a few… · Nobody…'],
  ['R-P4', 'practical', 'E4', 'Practical: recording a 2-minute talk about a chart', 90, 'Students choose one chart about prices or growth from the practice dataset (simulated), plan a 2-minute description, and record it on a phone or computer. They listen again, complete a self-check list and record a second, improved version.\n\nUseful phrases: This chart shows… · The highest point was in… · Between … and …, prices rose… · Overall, …'],
  ['R-P5', 'practical', 'E2', 'Practical: market role-play — buying and selling', 60, 'Students are buyers and sellers at a classroom market, with role cards giving a product and a price range. They negotiate in English over three rounds and write down each deal. In the last 10 minutes, each student reports their best deal to the class.\n\nUseful phrases: How much is…? · That is a bit expensive. · Could you give me a discount? · I can offer you… · It\'s a deal.'],
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

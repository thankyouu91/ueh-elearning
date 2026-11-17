// Workbook exercises (one set per unit) and full case studies with teaching notes.
// Exercise types: classify (sort items into categories), order (put steps in sequence),
// numeric (calculation, auto-checked with a tolerance), written (short answer, marked by the lecturer).
// Figures in cases are illustrative teaching data, not official statistics.
import { EXTRA_EXERCISES } from './content/index.js';

const C = (unitId, title, prompt, categories, items, solution) => ({ unitId, type: 'classify', title, prompt, categories, items, solution });
const O = (unitId, title, prompt, steps, solution) => ({ unitId, type: 'order', title, prompt, steps, solution });
const N = (unitId, title, prompt, answer, unit, solution, tol = null) => ({ unitId, type: 'numeric', title, prompt, answer, unit, tol, solution });
const W = (unitId, title, prompt, model, marking, words = 120) => ({ unitId, type: 'written', title, prompt, model, marking, words });

// Workbook exercises now live in js/content/ (ESP pack).
export const EXERCISES = [];
/** Unit exercises with their final ids; the seed also uses them to build lesson pages before the workbook is added. */
export const unitExercises = () => [...EXERCISES, ...EXTRA_EXERCISES].map((e, i) => ({ ...e, id: `WB-${e.unitId}-${i + 1}`, caseId: null }));

/* ------------------------------------------------------------------ case studies */
// Each case: background, exhibit table, tasks (exercises with caseId), teaching notes.
export const CASES = [
  {
    id: 'R-C3', unitId: 'MK7', title: 'Launching a bubble-tea brand to Gen Z customers', minutes: 45,
    body: 'Mây Trà is a new bubble-tea brand opening three stores near universities in Thủ Đức and District 10. Its drinks use less sugar and local fruit. The founders have 300 million VND to spend on promotion in the first three months and want to reach students aged 18–24. They are comparing channels on cost and reach.',
    exhibit: { title: 'Exhibit 1, Channel options (illustrative)', columns: ['Channel', 'Cost (million VND)', 'Estimated reach in target', 'Notes'],
      rows: [['TikTok ads (8 weeks)', '120', '400,000 views', 'Precise age & location targeting'], ['3 micro-KOLs (student creators)', '90', '150,000 views', 'High trust, content can be reused'], ['Campus event sponsorship', '45', '5,000 students', 'Sampling + sign-ups'], ['Opening-week sales promotion', '30', '—', 'Buy 1 get 1 for app users'], ['Outdoor posters near campuses', '60', '—', 'Hard to measure']], note: 'Budget: 300 million VND.' },
    tasks: [
      { ...W('MK7', 'Key terms in the case', 'Find five business terms in the case and explain each in one simple English sentence.', 'Brand — the name and image of a company\'s products. Promotion — activities that tell people about a product so that they buy it. Channel — a way of sending a message to customers, such as TikTok or posters. Reach — the number of people who see an advertisement. Sponsorship — paying money to support an event so that people see your brand.', ['Language: explains each term in a complete, correct B1 sentence, e.g. "A … is a … that/who …"', 'Task: five business terms taken from the case', 'Accuracy: each explanation matches how the term is used in the case'], 90), skill: 'U', level: 'B1', pack: 'ESP-B1', source: 'ueh' },
      { ...W('MK7', 'Speaking, Present your channel choice', 'You work in the marketing team of Mây Trà. Talk for about 1 minute: summarise the situation and say what you would do. Cover: (1) who the customers are, (2) which two channels you would choose, (3) why. Use at least two figures from the exhibit.', 'Mây Trà is a new bubble-tea brand near universities, and our customers are students aged 18 to 24. We have 300 million dong for promotion. I would choose TikTok ads and micro-KOLs. TikTok ads cost 120 million dong and can reach 400,000 views, because we can target by age and location. Student creators cost 90 million dong, and young people trust them. However, I would not use outdoor posters, because the results are hard to measure.', ['Language: describes figures accurately (rise / fall by …, to …) and recommends with should / I suggest / If we …, we will …', 'Task: summarises the situation with figures from the exhibit and gives one recommendation', 'Delivery: clear, steady pace, understandable pronunciation'], 90), speak: true, seconds: 60, skill: 'S', level: 'B1', pack: 'ESP-B1', source: 'ueh' },
      { ...W('MK7', 'Writing, Email inviting a student creator', 'You are the marketing assistant at Mây Trà. Write an email of about 120 words to Linh, a student creator with many followers. Introduce the brand, invite her to make videos for the opening week, and say what you offer and what the next step is.', 'Subject: Invitation to work with Mây Trà\n\nDear Linh,\n\nMy name is Khoa and I am the marketing assistant at Mây Trà, a new bubble-tea brand. We are opening three stores near universities in Thủ Đức and District 10 next month.\n\nOur drinks are different because they use less sugar and local fruit. We really like your videos about student life, and we think your followers would enjoy our drinks.\n\nWe would like to invite you to visit our store and make three short videos during the opening week. We will pay a fee for each video and give you free drinks for one month.\n\nIf you are interested, could we meet next week to talk about the details?\n\nBest wishes,\nKhoa', ['Language: polite invitation and request forms (We would like to invite you …, Would you be interested in …?, Could you …?) and will for the offer', 'Task: introduces the brand, invites, states the offer and the next step', 'Organisation: clear purpose, short paragraphs, suitable opening and closing'], 120), skill: 'W', level: 'B1', pack: 'ESP-B1', source: 'ueh' },
    ],
    notes: { timing: ['5 min — pre-teach vocabulary: brand, channel, reach, target, sponsorship, micro-KOL', '10 min — read for gist (Who are the customers?), then find details in the exhibit', '15 min — pair speaking: choose two channels using "I would choose…", "because…", "however…"', '15 min — write the email to the student creator, then peer feedback'],
      points: ['Giving reasons and contrast: "because", "so", "however" — avoid "Although…, but…" in one sentence', '"I would choose…" for a recommendation, not "I will choosing" or "I am choose"', 'Large numbers: "three hundred million dong", "four hundred thousand views" — no plural -s on hundred / thousand / million'],
      extension: 'Students write a 40-word social media caption in English for the opening week and read it aloud to a partner.' },
  },
  {
    id: 'R-C6', unitId: 'MK10', title: 'Why shoppers abandon online carts', minutes: 40,
    body: 'Áo Xinh is an online fashion store selling through its own website. Traffic is growing, but 72% of shoppers who add items to the cart leave without paying. Customer interviews mention delivery costs shown only at the last step, uncertainty about sizes, and a long registration form.',
    exhibit: { title: 'Exhibit 1, Checkout funnel, last month', columns: ['Step', 'Visitors'], rows: [['Viewed a product', '60,000'], ['Added to cart', '9,000'], ['Started checkout', '4,500'], ['Paid', '2,520']], note: '' },
    tasks: [
      { ...W('MK10', 'Key terms in the case', 'Find five business terms in the case and explain each in one simple English sentence.', 'Traffic — the number of people who visit a website. Cart — the place on a shopping website where you keep items before you pay. Checkout — the step where you pay for your items online. Delivery cost — the money you pay to have a product sent to your home. Registration form — a page where you type your personal details to open an account.', ['Language: explains each term in a complete, correct B1 sentence, e.g. "A … is a … that/who …"', 'Task: five business terms taken from the case', 'Accuracy: each explanation matches how the term is used in the case'], 90), skill: 'U', level: 'B1', pack: 'ESP-B1', source: 'ueh' },
      { ...W('MK10', 'Speaking, Why shoppers leave', 'You work for Áo Xinh. Talk for about 1 minute: summarise the situation and say what you would do. Cover: (1) what the problem is, (2) the reasons customers gave, (3) one change you would make. Use at least two figures from the exhibit.', 'Áo Xinh is an online fashion store, and traffic is growing. However, 72% of shoppers who add items to the cart leave without paying. Last month 9,000 people added items to the cart, but only 2,520 paid. Customers say that the delivery cost appears only at the last step, they are not sure about sizes, and the registration form is too long. So I would show the delivery cost on the product page, because nobody likes a surprise at the end.', ['Language: describes figures accurately (rise / fall by …, to …) and recommends with should / I suggest / If we …, we will …', 'Task: summarises the situation with figures from the exhibit and gives one recommendation', 'Delivery: clear, steady pace, understandable pronunciation'], 90), speak: true, seconds: 60, skill: 'S', level: 'B1', pack: 'ESP-B1', source: 'ueh' },
      { ...W('MK10', 'Writing, Reply to a customer complaint', 'You work in customer service at Áo Xinh. A customer, Ms Vy, wrote to complain that she saw the delivery cost only at the last step and did not finish her order. Write a reply of about 120 words: apologise, explain what the store is changing, and offer something to bring her back.', 'Subject: Your message about delivery costs\n\nDear Ms Vy,\n\nThank you for your message, and I am very sorry about the problem with your order.\n\nYou are right. At the moment, our website shows the delivery cost only at the last step, and we understand that this is frustrating. Other customers have told us the same thing.\n\nWe are now changing the website. From next week, you will see the delivery cost on every product page. We are also adding a size guide and a shorter registration form.\n\nTo say sorry, we would like to offer you free delivery on your next order. Please use the code XINH at checkout.\n\nThank you again for helping us to improve.\n\nKind regards,\nMai\nCustomer Service', ['Language: apology phrases, present perfect for what has changed (We have …), will for promises, polite tone', 'Task: apologises, explains what the store is changing and makes one offer', 'Organisation: clear purpose, short paragraphs, suitable opening and closing'], 120), skill: 'W', level: 'B1', pack: 'ESP-B1', source: 'ueh' },
    ],
    notes: { timing: ['5 min — pre-teach vocabulary: cart, checkout, to abandon, delivery cost, registration form, size guide', '10 min — read for gist (What is the problem?), then find the three reasons and the exhibit figures', '10 min — pair speaking: explain the problem and suggest a change with "Customers say that…" and "I would…"', '15 min — write the reply to the customer, then peer feedback on tone'],
      points: ['Apologising and offering: "I am very sorry about…", "We would like to offer you…" — avoid "We sorry" or "Sorry you"', 'Saying percentages and numbers: "seventy-two per cent of shoppers leave" (plural verb), "nine thousand"', '"Without" + -ing: "leave without paying", not "leave without pay"'],
      extension: 'Students write three short, friendly messages in English for the new checkout page (for example: empty cart, size not available, order confirmed).' },
  },
];

/* ------------------------------------------------------------------ case multiple-choice, audio, bento layout */
// [stem, options (first = correct), explanation]
const CASE_MCQ = {
  'R-C3': [['According to the case, what makes Mây Trà drinks different?', ['They use less sugar and local fruit', 'They are the cheapest drinks near the universities', 'They are sold only online', 'They are imported from abroad'], 'Sentence 2: "Its drinks use less sugar and local fruit."'],
    ['In the exhibit, which channel is described as "Hard to measure"?', ['Outdoor posters near campuses', 'TikTok ads (8 weeks)', 'Campus event sponsorship', 'Opening-week sales promotion'], 'Look at the Notes column: the last row, outdoor posters, says "Hard to measure".']],
  'R-C6': [['Which reason for leaving is NOT mentioned in the customer interviews?', ['Slow delivery', 'Delivery costs shown only at the last step', 'Uncertainty about sizes', 'A long registration form'], 'The last sentence lists three reasons: delivery costs shown only at the last step, uncertainty about sizes, and a long registration form. Slow delivery is not in the text.'],
    ['According to the exhibit, how many visitors paid last month?', ['2,520', '4,500', '9,000', '60,000'], 'Last row of the exhibit: "Paid — 2,520".']],
};
const CASE_AUDIO = {
  'R-C3': ['Voice note from the founder', 'Hi team, a quick note. We have three hundred million for the launch. I want students talking about Mây Trà in the first two weeks. Please bring a channel plan, and three numbers we can check every Monday.'],
};

const num = (v) => Number(String(v).replace(/[^0-9.\-]/g, ''));
/** Bar chart of the first numeric column of an exhibit, as an SVG data URL (no external images needed). */
export function exhibitChart(x) {
  if (!x?.rows?.length) return null;
  const col = x.columns.findIndex((_, i) => i > 0 && x.rows.filter(r => Number.isFinite(num(r[i])) && String(r[i]).trim() !== '—').length >= 2);
  if (col < 0) return null;
  const rows = x.rows.filter(r => Number.isFinite(num(r[col])));
  const vals = rows.map(r => num(r[col])); const max = Math.max(...vals) || 1;
  const W = 480, H = 260, L = 16, B = 46, bw = (W - L * 2) / rows.length;
  const bars = rows.map((r, i) => { const h = (vals[i] / max) * (H - B - 52); const x0 = L + i * bw + bw * 0.18;
    return `<rect x="${x0}" y="${H - B - h}" width="${bw * 0.64}" height="${h}" rx="4" fill="${i === vals.indexOf(max) ? '#d47033' : '#03606a'}"/><text x="${x0 + bw * 0.32}" y="${H - B - h - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#13252b">${r[col]}</text><text x="${x0 + bw * 0.32}" y="${H - B + 16}" text-anchor="middle" font-size="11" fill="#4d5f66">${String(r[0]).length > 13 ? String(r[0]).slice(0, 12) + "…" : r[0]}</text>`; }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="Arial, sans-serif"><rect width="${W}" height="${H}" fill="#ffffff"/><text x="${L}" y="20" font-size="13" font-weight="700" fill="#03606a">${x.columns[col].replace(/&/g, '&amp;')}</text><line x1="${L}" y1="${H - B}" x2="${W - L}" y2="${H - B}" stroke="#cdd3d8"/>${bars}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
/** Default bento layout for a case: story, figure, audio, data, questions. */
export function defaultLayout(c, exercises) {
  const t = (kind, w, h, extra) => ({ id: `TL-${c.id}-${kind}-${Math.random().toString(36).slice(2, 7)}`, kind, w, h, ...extra });
  const chart = exhibitChart(c.exhibit);
  const tasks = exercises.filter(e => e.caseId === c.id);
  return [
    t('text', 2, 2, { title: 'The situation', body: c.body }),
    ...(chart ? [t('image', 2, 1, { src: chart, caption: c.exhibit.title.replace(/^Exhibit \d+, /, 'Figure, ') })] : []),
    ...(CASE_AUDIO[c.id] ? [t('audio', 2, 1, { title: CASE_AUDIO[c.id][0], transcript: CASE_AUDIO[c.id][1] })] : []),
    ...(c.exhibit ? [t('exhibit', chart && !CASE_AUDIO[c.id] ? 2 : 4, 1, { table: c.exhibit })] : []),
    ...tasks.filter(e => e.type === 'mcq').map(e => t('question', 2, 1, { exerciseId: e.id })),
    ...tasks.filter(e => e.type !== 'mcq').map(e => t('question', e.type === 'written' ? 4 : 2, 1, { exerciseId: e.id })),
  ];
}

/** Seeds exercises and case data into state, and generates student workbook answers. */
export function addWorkbookSeed(st, { rng, iso, at, CURRENT_WEEK }) {
  const r = rng(424242);
  let seq = 0;
  const ex = [];
  // extra content comes after the original set so existing exercise ids stay the same
  ex.push(...unitExercises()); seq = ex.length;
  for (const c of CASES) {
    (CASE_MCQ[c.id] || []).forEach(([stem, opts, explanation], i) => {
      const order = opts.map((o, k) => ({ o, k, s: r() })).sort((a, b) => a.s - b.s);
      ex.push({ id: `CQ-${c.id}-${i + 1}`, caseId: c.id, unitId: c.unitId, type: 'mcq', title: `Check ${i + 1}`, prompt: stem, options: order.map(x => x.o), answerIndex: order.findIndex(x => x.k === 0), solution: explanation });
    });
    c.tasks.forEach((t, i) => ex.push({ ...t, id: `CT-${c.id}-${i + 1}`, caseId: c.id }));
    const res = st.resources.find(x => x.id === c.id);
    const data = { title: c.title, unitId: c.unitId, minutes: c.minutes, body: c.body, exhibit: c.exhibit, notes: c.notes, full: true };
    if (res) Object.assign(res, data);
    else st.resources.push({ id: c.id, type: 'case_study', ...data, file: null, createdBy: 'D3', createdAt: iso(new Date('2026-08-25T09:00:00')) });
  }
  st.exercises = ex;
  for (const c of CASES) st.resources.find(x => x.id === c.id).layout = defaultLayout({ ...c, exhibit: c.exhibit }, ex);

  /* student answers for released units */
  const answers = [];
  let aSeq = 0;
  const WRITTEN_SAMPLES = [
    (m) => m, // strong — close to the model answer
    (m) => m.split('. ').slice(0, 2).join('. ') + '.',
    () => 'I think it depends on the situation. The company should look at the costs and benefits before deciding.',
  ];
  for (const stu of st.users.filter(u => u.role === 'student')) {
    const sec = st.sections.find(x => x.id === stu.sectionId);
    const cur = st.programs.find(p => p.id === sec.programId).versions.find(v => v.id === sec.versionId).unitIds;
    const released = cur.slice(0, CURRENT_WEEK - 1); // units of finished weeks
    const prof = st.__profiles?.[stu.id] || { ab: 0.7, en: 0.75 };
    for (const [wi, unitId] of released.entries()) {
      for (const e of ex.filter(x => x.unitId === unitId && !x.caseId)) {
        if (r() > prof.en) continue;
        const ok = r() < prof.ab;
        const t = iso(at(wi + 1, 3 + Math.floor(r() * 3), 19 + Math.floor(r() * 3)));
        let value; let correct = null; let score = null; let status = 'graded';
        if (e.type === 'numeric') { value = ok ? e.answer : Math.round(e.answer * (1.1 + r() * 0.3) * 100) / 100; correct = ok; }
        else if (e.type === 'classify') { value = e.items.map(([, c]) => (ok || r() < 0.7 ? c : (c + 1) % e.categories.length)); correct = value.every((v, i) => v === e.items[i][1]); }
        else if (e.type === 'order') { value = e.steps.map((_, i) => i); if (!ok) [value[1], value[2]] = [value[2], value[1]]; correct = ok; }
        else if (e.type === 'mcq') { value = ok ? e.answerIndex : (e.answerIndex + 1 + Math.floor(r() * (e.options.length - 1))) % e.options.length; correct = ok; }
        else {
          const q = prof.ab > 0.85 ? 0 : prof.ab > 0.65 ? 1 : 2;
          value = WRITTEN_SAMPLES[q](e.model);
          const graded = wi < CURRENT_WEEK - 3 && r() < 0.8;
          status = graded ? 'graded' : 'submitted';
          score = graded ? [4, 3, 1][q] : null;
        }
        answers.push({ id: `WA${++aSeq}`, exerciseId: e.id, studentId: stu.id, value, correct, score, status, tries: ok ? 1 : 2, at: t,
          feedback: status === 'graded' && e.type === 'written' ? (score >= 3 ? 'Clear and well applied.' : 'Too general — use the concepts from the unit and an example.') : null, gradedBy: status === 'graded' && e.type === 'written' ? sec.instructorIds[0] : null });
      }
    }
  }
  st.workbookAnswers = answers;
}

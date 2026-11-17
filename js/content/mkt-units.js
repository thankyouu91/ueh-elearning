// English for Marketing Communication (ESP, CEFR B1–B1+), one 16-week class for the Bachelor of Marketing.
// Method: genre-based teaching–learning cycle (build the field → study a model text → write together → write alone)
// with task-based speaking. Syllabus topics follow docs/esp/marketing-communication-nqf4.md; every text and task is UEH's own.
// Running case: Green Leaf Tea (Trà Lá Xanh), a fictional Da Lat tea-and-snack company growing in Ho Chi Minh City.

// [id, title, can-do summary, language focus (worked example), genre]
export const UNITS = [
  ['MK1', 'Describing a Business and Its Stakeholders', 'Can describe how a business and its stakeholders are organised, using consist of / include / be divided into, in a short talk and a 120-word description.',
    'Present simple for facts and classifying: consist of, be divided into, include. "Our stakeholders are divided into two groups." "The internal group consists of owners, managers and staff."', 'Stakeholder description'],
  ['MK2', 'Giving Rules and Advice in a Memo', 'Can explain duties and give advice to suppliers, staff and the community in a short internal memo and a team talk, using must / have to / should.',
    'Must, have to and should: "We must pay suppliers within 30 days." "Staff have to attend the briefing." "We should invite the community to the opening."', 'Internal memo'],
  ['MK3', 'Describing Customers and Their Habits', 'Can describe a customer group and its buying habits in a short spoken and written profile, using defining relative clauses (who / which / that) and present simple with frequency adverbs.',
    'Defining relative clauses with who, which and that: "Our target customers are students who study in District 3." "This is a gift box which families buy for Tet."', 'Customer profile'],
  ['MK4', 'Criticising Politely and Suggesting Changes', 'Can politely criticise an advert and suggest a fairer version in a discussion and a short written critique, using could / might / it might be better to / why don\'t we.',
    'Polite criticism and suggestions: could, might, it might be better to, why don\'t we. "The advert could show older customers too." "It might be better to use a more neutral slogan."', 'Advert critique and rewrite'],
  ['MK5', 'Comparing Products in a Pitch', 'Can describe and compare products persuasively in a short product pitch, using comparatives and superlatives (lighter than, less sweet than, the most popular).',
    'Comparatives and superlatives: "Our oolong is lighter than green tea." "This is the most popular gift box in our range."', 'Product pitch'],
  ['MK6', 'Confirming Tasks and Deadlines', 'Can take notes in a client briefing and write a polite follow-up email that confirms tasks and deadlines, using will / be going to / present continuous for the future.',
    'Future forms: will for decisions and promises, be going to for plans, present continuous for arrangements. "I\'ll send the draft by Friday." "We\'re meeting the client on Monday."', 'Briefing notes and follow-up email'],
  ['MK7', 'Writing a Campaign Proposal', 'Can write a one-page campaign proposal that states objectives and predicts results, using to + verb + number + by + date for objectives and the first conditional with if / unless.',
    'First conditional and unless: "If we run the campaign in May, sales will rise before the summer." "Unless we reduce the budget, the plan will not be approved."', 'Campaign proposal'],
  ['MK8', 'Presenting Figures and Trends', 'Can give a clear five-minute presentation of campaign results, using signposting phrases and trend language (rise by, increase to, fall from … to, reach a peak).',
    'Describing figures and trends: rise by, increase to, fall from … to, reach a peak. "Online sales rose by 20% in March." "Visits fell from 5,000 to 3,800."', 'Slide presentation'],
  ['MK9', 'Writing Formal Letters and Reports', 'Can write a formal business letter and a short report in a concise style, using the passive voice (was sent, will be delivered) and formal phrases.',
    'The passive voice in formal writing: "The samples were sent on 3 May." "Your order will be delivered within two days."', 'Business letter and short report'],
  ['MK10', 'Replying to Complaints and Announcing News', 'Can write a polite reply to an online complaint and a short press release, using the present perfect for news and the past simple for finished events.',
    'Present perfect and past simple: "We have received your email." "Green Leaf Tea has opened its tenth store." "The store opened on 12 September."', 'Complaint reply and press release'],
  ['RV1', 'Review and Progress Test 1 (Units 1–5)', 'Can use the language of Units 1–5 accurately (classifying verbs, must / have to / should, relative clauses, polite suggestions, comparatives) in short reading, listening, speaking and writing tasks.', null, 'Review'],
  ['MID', 'Midterm Week: Review of Units 1–7', 'Can show B1 control of the reading, listening, speaking and writing skills taught in Units 1–7 under exam conditions.', null, 'Midterm'],
  ['PJ1', 'Project Workshop 1: Drafting the Campaign Proposal', 'Can draft a team campaign proposal for Green Leaf Tea in English, and can suggest, agree, disagree and give peer feedback, using let\'s / how about / I see your point, but ….', null, 'Project: proposal draft'],
  ['PJ2', 'Project Workshop 2: Pitch and Press Release', 'Can deliver a team pitch of the campaign proposal and write a launch press release, answering questions from the audience.', null, 'Project: pitch and press release'],
  ['RV2', 'Final Review (Units 6–10)', 'Can use the vocabulary and language of Units 6–10 accurately and can revise for the final examination with mixed four-skill practice.', null, 'Review'],
  ['FX', 'Final Examination Week', 'Can show B1–B1+ control of all four skills and of the course vocabulary and grammar in the final examination.', null, 'Final examination'],
];

// Teaching order: 10 units, two review weeks, midterm, two project workshops and the final.
export const WEEKS = ['MK1', 'MK2', 'MK3', 'MK4', 'MK5', 'RV1', 'MK6', 'MK7', 'MID', 'MK8', 'MK9', 'MK10', 'PJ1', 'PJ2', 'RV2', 'FX'];

// Lesson photos (assets/lessons/<unit id>.jpg, 1600x900), generated in Canva for UEH; alt text for screen readers.
export const PHOTOS = {
  MK1: 'Green Leaf Tea shop in Ho Chi Minh City: staff, a tea farmer, customers and a delivery motorbike',
  MK2: 'A tea farmer and a marketing manager shake hands in the Bao Loc tea hills',
  MK3: 'A Vietnamese family chooses Tet tea gift boxes in a tea shop',
  MK4: 'A marketing team reviews advertisement posters together',
  MK5: 'A marketer presents tea products to colleagues in a shop',
  RV1: 'University students review English in pairs in a classroom',
  MK6: 'A client briefing meeting in a Ho Chi Minh City office',
  MK7: 'A marketing assistant writes a campaign proposal at her desk',
  MID: 'University students take a midterm exam in a lecture hall',
  MK8: 'A young woman presents a sales chart to managers',
  MK9: 'Signing a formal business letter at an office desk',
  MK10: 'A customer checks online reviews next to cold-brew tea in a supermarket',
  PJ1: 'A student team brainstorms a campaign with sticky notes',
  PJ2: 'A student team pitches its campaign to a panel of lecturers',
  RV2: 'Students revise English together in a Saigon cafe',
  FX: 'Students take a computer-based English exam with headphones',
};

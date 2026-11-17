// English for Marketing Communication (ESP, CEFR B1–B1+), one 16-week class for the Bachelor of Marketing.
// Method: genre-based teaching–learning cycle (build the field → study a model text → write together → write alone)
// with task-based speaking. Syllabus topics follow docs/esp/marketing-communication-nqf4.md; every text and task is UEH's own.
// Running case: Green Leaf Tea (Trà Lá Xanh), a fictional Da Lat tea-and-snack company growing in Ho Chi Minh City.

// [id, title, can-do summary, language focus (worked example), genre]
export const UNITS = [
  ['MK1', 'Who Are Our Stakeholders?', 'Can understand a short company profile and can name and classify the internal and external stakeholders of a business in speech and writing.',
    'Present simple for facts and classifying: consist of, be divided into, include. "Our stakeholders are divided into two groups." "The internal group consists of owners, managers and staff."', 'Stakeholder description'],
  ['MK2', 'Building Stakeholder Relationships', 'Can understand a short memo about relationships with suppliers, staff and the community, and can explain what each stakeholder expects and what the company must do.',
    'Must, have to and should: "We must pay suppliers within 30 days." "Staff have to attend the briefing." "We should invite the community to the opening."', 'Internal memo'],
  ['MK3', 'Culture and the Customer', 'Can understand a short text about how culture and subculture shape buying habits, and can describe a customer group clearly in a short profile.',
    'Defining relative clauses with who, which and that: "Our target customers are students who study in District 3." "This is a gift box which families buy for Tet."', 'Customer profile'],
  ['MK4', 'Inclusive Marketing: Avoiding Stereotypes', 'Can recognise prejudice and stereotypes in advertising, and can politely criticise an advert and suggest a fairer version.',
    'Polite criticism and suggestions: could, might, it might be better to, why don\'t we. "The advert could show older customers too." "It might be better to use a more neutral slogan."', 'Advert critique and rewrite'],
  ['MK5', 'What Is Marketing? The Marketing Mix', 'Can understand a short product description and marketing plan, and can describe and compare products persuasively in a short pitch.',
    'Comparatives and superlatives: "Our oolong is lighter than green tea." "This is the most popular gift box in our range."', 'Product pitch'],
  ['MK6', 'Professional Work Ethics: Briefings and Deadlines', 'Can follow a short client briefing, take clear notes, and write a polite follow-up email that confirms tasks and deadlines.',
    'Future forms: will for decisions and promises, be going to for plans, present continuous for arrangements. "I\'ll send the draft by Friday." "We\'re meeting the client on Monday."', 'Briefing notes and follow-up email'],
  ['MK7', 'Writing a Marketing Proposal', 'Can understand the structure of a short marketing proposal, and can write a one-page campaign proposal with objectives, actions, budget and results.',
    'First conditional and unless: "If we run the campaign in May, sales will rise before the summer." "Unless we reduce the budget, the plan will not be approved."', 'Campaign proposal'],
  ['MK8', 'Presenting the Proposal', 'Can follow a short business presentation, and can give a clear five-minute presentation with signposting and simple descriptions of figures.',
    'Describing figures and trends: rise by, increase to, fall from … to, reach a peak. "Online sales rose by 20% in March." "Visits fell from 5,000 to 3,800."', 'Slide presentation'],
  ['MK9', 'Business Writing Formats: Memos, Letters and Reports', 'Can understand routine business letters, memos and short reports, and can choose the right format and write in a formal, concise style.',
    'The passive voice in formal writing: "The samples were sent on 3 May." "Your order will be delivered within two days."', 'Business letter and short report'],
  ['MK10', 'Digital Marketing Communication', 'Can understand customer emails, online reviews and press releases, and can write a polite reply to a complaint and a short press release.',
    'Present perfect and past simple: "We have received your email." "Green Leaf Tea has opened its tenth store." "The store opened on 2 June."', 'Complaint reply and press release'],
  ['RV1', 'Review and Progress Test 1 (Units 1–5)', 'Can use the vocabulary and language of Units 1–5 accurately and can complete a short reading, listening, speaking and writing task on stakeholders, culture and the marketing mix.', null, 'Review'],
  ['MID', 'Midterm Week: Review of Units 1–7', 'Can show B1 control of the reading, listening, speaking and writing skills taught in Units 1–7 under exam conditions.', null, 'Midterm'],
  ['PJ1', 'Project Workshop 1: Drafting the Campaign Proposal', 'Can plan and draft a team campaign proposal for Green Leaf Tea, and can give and respond to peer feedback in English.', null, 'Project: proposal draft'],
  ['PJ2', 'Project Workshop 2: Pitch and Press Release', 'Can deliver a team pitch of the campaign proposal and write a launch press release, answering questions from the audience.', null, 'Project: pitch and press release'],
  ['RV2', 'Final Review (Units 6–10)', 'Can use the vocabulary and language of Units 6–10 accurately and can revise for the final examination with mixed four-skill practice.', null, 'Review'],
  ['FX', 'Final Examination Week', 'Can show B1–B1+ control of all four skills and of the course vocabulary and grammar in the final examination.', null, 'Final examination'],
];

// Teaching order: 10 units, two review weeks, midterm, two project workshops and the final.
export const WEEKS = ['MK1', 'MK2', 'MK3', 'MK4', 'MK5', 'RV1', 'MK6', 'MK7', 'MID', 'MK8', 'MK9', 'MK10', 'PJ1', 'PJ2', 'RV2', 'FX'];

// Deterministic demo seed for UEH Learning — Economics Foundation programme.
// Every number shown in the UI is derived from this data by selectors.js.
import { addLibrarySeed } from './seed-library.js';
import { addWorkbookSeed } from './seed-workbook.js';

export const TERM_START = '2026-09-07T00:00:00'; // Monday of week 1
export const TERM_WEEKS = 16;
const CURRENT_WEEK = 9;
const DAY = 86400000;

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
export function weekStart(week) { return new Date(new Date(TERM_START).getTime() + (week - 1) * 7 * DAY); }
const iso = (d) => d.toISOString();
const at = (week, dayOffset, hour = 9, min = 0) => { const d = weekStart(week); d.setDate(d.getDate() + dayOffset); d.setHours(hour, min, 0, 0); return d; };

/* ------------------------------------------------------------------ subjects & unit library */
export const SUBJECTS = {
  ECO: { label: 'Economics', short: 'ECO' },
  ACC: { label: 'Accounting', short: 'ACC' },
  FIN: { label: 'Finance', short: 'FIN' },
  MGT: { label: 'Management', short: 'MGT' },
  MKT: { label: 'Marketing', short: 'MKT' },
};

// [id, subject, title, summary, worked example?]
const UNITS = [
  ['E1', 'ECO', 'The Economic Problem & Economic Systems', 'Can understand a short text about the choices people and businesses make with limited money and time, and can explain a simple choice and what was given up.'],
  ['E2', 'ECO', 'Demand, Supply & Market Equilibrium', 'Can understand short news reports about prices and markets, and can describe price changes and their causes in a short spoken or written summary.'],
  ['E3', 'ECO', 'Elasticity & Government Intervention', 'Can understand a short article about how customers react to price changes and price rules, and can describe causes and effects in a few connected sentences.', 'Language of cause and effect: use so, because, as a result and lead to. "The shop raised the price of bubble tea, so fewer students bought it." "The higher price led to a fall in weekly sales."'],
  ['E4', 'ECO', 'Macroeconomics: GDP, Inflation & Unemployment', 'Can understand simple news items about growth, prices and jobs in Vietnam, and can report key figures and trends in a short talk or paragraph.', 'Numbers and percentages: use by for the size of a change and at for a level. "The economy grew by five per cent last year." "Inflation stayed at around four per cent."'],
  ['E5', 'ECO', 'Money, Banking & Monetary Policy', 'Can understand a simple bank leaflet or news item about saving, loans and interest rates, and can ask and answer questions about bank services.'],
  ['E6', 'ECO', 'International Trade & Exchange Rates', 'Can understand short texts about Vietnamese exports, imports and exchange rates, and can compare products and trading partners in simple sentences.'],
  ['E7', 'ECO', 'Market Structures & Competition', 'Can understand a short description of companies competing in a market, and can compare competitors using comparative and superlative forms.'],
  ['E8', 'ECO', "Development Economics & Vietnam's Growth", 'Can understand a short article about how life and work in Vietnam have changed, and can describe changes over time in a short presentation.'],

  ['A1', 'ACC', 'Accounting Concepts & the Accounting Equation', 'Can understand a simple description of what a small business owns and owes, and can describe everyday business transactions in clear sentences.'],
  ['A2', 'ACC', 'Double-Entry Recording & the Trial Balance', 'Can follow simple spoken or written instructions for recording a transaction, and can explain the steps of a routine process in the correct order.'],
  ['A3', 'ACC', 'Preparing Financial Statements', "Can find key information in a simple income statement or company summary, and can describe a company's results for the year in a short paragraph.", 'Past simple for reporting results: use made, increased, fell and rose with figures. "Revenue increased to 900 million VND last year." "The company made a net profit of 150 million VND."'],
  ['A4', 'ACC', 'Cost Accounting & Break-even Analysis', "Can understand a short text about a small business's costs and prices, and can talk about possible results using first conditional sentences.", 'First conditional: if + present simple, will + verb. "If we sell 3,000 cups a month, we will cover our costs." "If the rent goes up, we will need to raise our prices."'],
  ['A5', 'ACC', 'Auditing Fundamentals', 'Can understand a short email or notice about an audit visit, and can make polite requests for documents and information.'],
  ['A6', 'ACC', 'Taxation Basics: VAT & Corporate Income Tax', 'Can understand simple notices and invoices that mention VAT and tax deadlines, and can explain rules and obligations using must and have to.'],
  ['A7', 'ACC', 'IFRS & Financial Reporting Standards', 'Can understand a short text about why companies follow common reporting standards, and can give reasons and simple opinions in a discussion.'],

  ['F1', 'FIN', 'Time Value of Money', 'Can understand a simple text about saving and investing over time, and can talk about future plans and predictions for money.', 'Future forms: use will for predictions and be going to for plans. "In three years, your savings will be worth more." "I am going to put 100 million VND in a savings account."'],
  ['F2', 'FIN', 'Financial Ratio Analysis', 'Can read a simple table of company figures and understand short comments on it, and can compare two companies or two years in speech or writing.', 'Comparatives: use adjective + -er or more + adjective + than, and not as ... as. "Company A is more profitable than Company B." "This year\'s profit is not as high as last year\'s."'],
  ['F3', 'FIN', 'Budgeting & Working Capital Management', 'Can understand a simple monthly budget and short messages about payments, and can write a short polite email about an invoice or a late payment.'],
  ['F4', 'FIN', 'Investment Appraisal: NPV, IRR & Payback', 'Can understand a short proposal for a business investment, and can make and respond to recommendations in a meeting.', 'Recommending and giving reasons: use should, recommend and suggest with because or as. "I recommend buying the new oven because it will pay for itself in three years." "We should not go ahead with the project, as the costs are too high."'],
  ['F5', 'FIN', 'Financial Markets & Institutions', 'Can understand short financial news about banks, shares and the stock market, and can summarise the main point of a news item in one or two sentences.'],
  ['F6', 'FIN', 'Capital Structure & Cost of Capital', 'Can understand a simple text about the ways a company can raise money, and can describe the advantages and disadvantages of each option.'],
  ['F7', 'FIN', 'Risk Management & Insurance', 'Can understand simple notices and insurance information about business risks, and can give advice and warnings using should and might.'],

  ['M1', 'MGT', 'Management Functions & Organisational Structure', "Can understand a description of a company's departments and job roles, and can describe responsibilities and who reports to whom."],
  ['M2', 'MGT', 'Entrepreneurship & New Venture Creation', 'Can understand a short profile of a start-up and its founder, and can present a simple business idea in a short pitch.'],
  ['M3', 'MGT', 'Operations & Project Management', 'Can follow a description of a production process or project schedule, and can describe stages and deadlines using sequencing words and the passive.'],
  ['M4', 'MGT', 'Business Communication & Report Writing', 'Can understand routine business emails, memos and short reports, and can write a clear, polite email or short report in an appropriate style.'],
  ['M5', 'MGT', 'Human Resource Management', 'Can understand job advertisements and simple staff notices, and can answer common job interview questions about skills and experience.'],
  ['M6', 'MGT', 'Business Ethics & Corporate Governance', 'Can understand a short case about right and wrong behaviour at work, and can give and justify an opinion politely in a discussion.'],

  ['K1', 'MKT', 'Marketing Concepts & the Marketing Mix', 'Can understand a short product description and a simple marketing plan, and can describe a product, its price and its target customers.'],
  ['K2', 'MKT', 'Consumer Behaviour', 'Can understand short customer reviews and survey comments, and can describe shopping habits using adverbs of frequency.'],
  ['K3', 'MKT', 'Marketing Communication & Advertising', 'Can understand advertisements and short promotional messages, and can write a simple, persuasive promotional text for a product.'],
  ['K4', 'MKT', 'Digital & Social Media Marketing', "Can understand a short report on an online campaign's results, and can describe figures from a simple chart or table in speech or writing.", 'Describing figures: use a total of, the number of and per cent of. "The advert received a total of 50,000 views and 1,000 clicks." "Two per cent of viewers clicked on the advert."'],
  ['K5', 'MKT', 'Market Research & Data', 'Can understand a simple questionnaire and a short summary of survey results, and can write clear survey questions and report what people said.'],
  ['K6', 'MKT', 'Brand Management', "Can understand a short text about well-known Vietnamese brands, and can describe a brand's image and personality using a range of adjectives."],
  ['K7', 'MKT', 'Sales & Customer Relationship Management', 'Can follow a simple sales conversation or customer call, and can deal politely with customer enquiries and complaints by phone or email.'],
];

// [unitId, stem, options (first = correct), bloom]
const Q = [
  ['E1', 'In business English, "scarce" means…', ['Available only in small amounts', 'Very cheap to buy', 'Easy to find everywhere', 'Made in another country'], 'Remember'],
  ['E1', 'Read: "Lan has 50,000 VND. She can buy lunch or a cinema ticket, but not both. She chooses lunch." What does Lan give up?', ['The cinema ticket', 'Her lunch', 'Her job', 'Both lunch and the cinema ticket'], 'Understand'],
  ['E1', 'Choose the correct word form: "Vietnam has a fast-growing ____."', ['economy', 'economic', 'economical', 'economise'], 'Remember'],
  ['E2', 'Read: "Coffee prices rose sharply in March because bad weather damaged the harvest." Why did prices rise?', ['There was less coffee to sell', 'More people wanted to drink coffee', 'The government raised taxes', 'Shops opened for longer hours'], 'Understand'],
  ['E2', 'Complete the sentence: "Demand ____ ice cream usually increases in the hot season."', ['for', 'of', 'to', 'at'], 'Apply'],
  ['E2', 'If there is a "shortage" of rice, there is…', ['Not enough rice for everyone who wants it', 'Too much rice in the shops', 'A lower price for rice', 'A new type of rice on sale'], 'Remember'],
  ['E3', 'Complete the sentence: "The café raised its prices. ____, it lost some regular customers."', ['As a result', 'Because', 'Although', 'In order to'], 'Apply'],
  ['E3', 'Read: "The city has set a maximum price for face masks. Shoppers are pleased, but many pharmacies say they have no masks left to sell." What is the writer showing?', ['The price rule has both good and bad effects', 'The price rule has solved every problem', 'Pharmacies are happy with the new rule', 'Shoppers are angry about the new price'], 'Analyze'],
  ['E3', 'Weekly sales of bubble tea at one shop: Week 1 – 1,000 cups; Week 2 – 850 cups; Week 3 – 700 cups. Which sentence describes the figures correctly?', ['Sales fell steadily over the three weeks', 'Sales rose slightly in Week 2', 'Sales stayed the same for three weeks', 'Sales fell in Week 2 and then recovered in Week 3'], 'Analyze'],
  ['E4', '"Unemployment" means…', ['The situation of people who want a job but do not have one', 'The money a company pays its workers', 'The number of people who work in factories', 'A rise in the prices of goods'], 'Remember'],
  ['E4', 'Choose the correct word form: "Rising food prices are the main cause of ____ this year."', ['inflation', 'inflate', 'inflated', 'inflating'], 'Remember'],
  ['E4', 'Complete the sentence: "Vietnam\'s economy grew ____ about six per cent last year."', ['by', 'in', 'with', 'for'], 'Apply'],

  ['A1', 'In accounting English, "liabilities" are…', ['Money that a business owes to others', 'Things that a business owns', 'Money that customers pay to a business', 'People who work for a business'], 'Remember'],
  ['A1', 'Complete the sentence: "The shop ____ a loan from the bank to buy new equipment."', ['took out', 'made', 'did', 'gave up'], 'Apply'],
  ['A1', 'Which sentence has the same meaning as "The company owns two delivery vans"?', ['Two delivery vans belong to the company', 'The company wants to buy two delivery vans', 'The company rents two delivery vans', 'Two delivery vans were sold by the company'], 'Understand'],
  ['A2', 'To "record" a transaction means to…', ['Write it down in the accounts', 'Pay for it in cash', 'Cancel it', 'Discuss it with the customer'], 'Remember'],
  ['A2', 'Choose the correct word form: "Please check every ____ in the cash book."', ['payment', 'pay', 'paid', 'payable'], 'Remember'],
  ['A2', 'Read: "First, enter the date. Next, write the amount in the correct column. Finally, check that the two totals are equal." What should you do last?', ['Check that the totals match', 'Enter the date', 'Write the amount', 'Choose the correct column'], 'Understand'],
  ['A3', '"Revenue" is…', ['The money a business receives from its sales', 'The money a business pays in rent', 'The money a business borrows from a bank', 'The money left after all costs are paid'], 'Remember'],
  ['A3', 'Complete the sentence: "Last year the company ____ a net profit of 150 million VND."', ['made', 'did', 'won', 'built'], 'Apply'],
  ['A3', 'Read: "Sales were strong in 2025, but higher rent and wages reduced the company\'s profit." What happened to profit?', ['It went down because costs increased', 'It went up because sales were strong', 'It stayed the same as the year before', 'It went down because sales were weak'], 'Understand'],
  ['A4', 'Complete the sentence: "If we ____ 3,000 cups a month, we will cover all our costs."', ['sell', 'will sell', 'sold', 'selling'], 'Apply'],
  ['A4', 'Read: "The bakery pays the same rent every month, but it spends more on flour when it bakes more bread." Which cost changes with the amount of bread?', ['Flour', 'Rent', 'Both rent and flour', 'Neither rent nor flour'], 'Understand'],
  ['A4', 'When a business "breaks even", it…', ['Makes neither a profit nor a loss', 'Makes a large profit', 'Closes because of its debts', 'Sells more than its competitors'], 'Remember'],
  ['A5', 'Read: "The auditors will visit our office on Monday. Please prepare all invoices and bank statements from last year." What should staff do?', ['Get documents ready before the visit', 'Visit the auditors on Monday', 'Send new invoices to customers', 'Open a new bank account'], 'Understand'],
  ['A5', 'Which sentence has the same meaning as "The auditor is independent of the company"?', ['The auditor does not work for or depend on the company', 'The auditor is the owner of the company', 'The auditor works alone in the company office', 'The auditor is paid more than the company staff'], 'Understand'],
  ['A5', 'Read: "Thank you for the documents. However, three invoices are still missing. Could you send them by Friday?" What is the main purpose of this email?', ['To ask for missing documents', 'To thank the company for a payment', 'To complain about the audit', 'To cancel a meeting on Friday'], 'Analyze'],

  ['F1', 'Read: "Minh put his money in a savings account. After one year, the bank added interest, so he had more money than before." Why did Minh\'s money grow?', ['The bank paid him interest', 'He put in more money every month', 'Prices fell during the year', 'He borrowed money from the bank'], 'Understand'],
  ['F1', 'Complete the sentence: "If you save a little every month, your money ____ over time."', ['will grow', 'grew', 'growing', 'has grown'], 'Apply'],
  ['F1', 'Read: "Many young people spend everything they earn. That is a mistake. Start saving now, even a small amount, and you will thank yourself later." What is the writer\'s purpose?', ['To advise readers to start saving early', 'To explain how banks set interest rates', 'To describe what young people buy', 'To advertise a new savings account'], 'Analyze'],
  ['F2', 'A "profitable" company is one that…', ['Makes more money than it spends', 'Has a large number of employees', 'Sells its products abroad', 'Borrows a lot of money'], 'Remember'],
  ['F2', 'Net profit last year: Company A – 150 million VND; Company B – 90 million VND; Company C – 150 million VND. Which sentence describes the figures correctly?', ['Company B made the lowest profit of the three', 'Company A made a higher profit than Company C', 'Company C made the lowest profit of the three', 'All three companies made the same profit'], 'Analyze'],
  ['F2', 'Which sentence has the same meaning as "Sales this year are not as high as last year"?', ['Sales were higher last year', 'Sales are higher this year', 'Sales are the same in both years', 'Sales were very low last year'], 'Understand'],
  ['F3', 'A "budget" is…', ['A plan showing how much money you expect to receive and spend', 'A list of people who owe you money', 'A bank account for a business', 'A bill sent to a customer'], 'Remember'],
  ['F3', 'Read: "The shop expects to receive 80 million VND in June, but it must pay 95 million VND in bills." What problem does the shop have?', ['It will not have enough cash in June', 'It will have extra cash in June', 'It has no bills to pay in June', 'It has too many customers in June'], 'Understand'],
  ['F3', 'Read: "We wrote to you on 3 May and 17 May about invoice 204. We have still not received payment. Please pay within seven days." What is the writer\'s attitude?', ['Firm, because the customer has not paid after two reminders', 'Friendly, because the customer always pays on time', 'Sorry, because the invoice had a mistake', 'Pleased, because the payment has arrived'], 'Analyze'],
  ['F4', 'Read: "The new oven costs 300 million VND. The owner thinks it will bring in enough extra money to pay for itself in three years." What does the owner expect?', ['To earn back the cost of the oven in three years', 'To sell the oven after three years', 'To get the oven for free', 'To replace the oven every three years'], 'Understand'],
  ['F4', 'In a meeting, you want to suggest buying a new machine. Which phrase is most appropriate?', ['"I would recommend investing in a new machine."', '"We buy a new machine, OK?"', '"I want you to buy a new machine now."', '"It is a new machine, I think so."'], 'Apply'],
  ['F4', 'To "invest" money means to…', ['Put money into something in order to make more money later', 'Spend money on things you need today', 'Lend money to a friend for free', 'Keep money at home in a safe place'], 'Remember'],
  ['F5', '"Shares" in a company are…', ['Small parts of a company that people can buy and own', 'Loans that a company gives to its staff', 'Products that a company sells abroad', 'Taxes that a company pays each year'], 'Remember'],
  ['F5', 'Read: "The State Bank of Vietnam cut interest rates this week. Borrowing is now cheaper for businesses." What is the result of the decision?', ['Loans cost businesses less', 'Loans cost businesses more', 'Businesses cannot borrow money', 'Banks have closed some branches'], 'Understand'],
  ['F5', 'Read: "The stock market fell again today. Investors are worried, and many are waiting before they buy." How do investors feel?', ['Nervous and careful', 'Excited and confident', 'Angry with the banks', 'Not interested in the news'], 'Analyze'],

  ['M1', 'Choose the correct word form: "Ms Hoa is the ____ of the sales department."', ['manager', 'manage', 'managing', 'managed'], 'Remember'],
  ['M1', 'Read: "Mr Tuan leads the marketing team. He reports to Ms Lan, the director." Who is Mr Tuan\'s boss?', ['Ms Lan', 'The marketing team', 'A director from another company', 'Mr Tuan has no boss'], 'Understand'],
  ['M1', 'Complete the sentence: "Ms Hoa is responsible ____ training new staff."', ['for', 'of', 'to', 'with'], 'Apply'],
  ['M2', 'Read: "Linh started an online shop selling handmade soap. In the first year she worked alone from home." What do we learn about Linh\'s business?', ['It began as a small one-person business', 'It began with a large team', 'It sold soap in a supermarket', 'It closed after the first year'], 'Understand'],
  ['M2', 'Which sentence has the same meaning as "Our café is different from others because we roast our own coffee"?', ['Roasting our own coffee makes our café special', 'Our café is the same as other cafés', 'Other cafés roast coffee for us', 'We want to roast our own coffee in the future'], 'Understand'],
  ['M2', 'You are starting a short pitch to investors. Which opening is most appropriate?', ['"Good morning. Today I would like to present our business idea."', '"Hey guys, give us some money."', '"That is all. Thank you for listening."', '"Sorry, I do not know much about this idea."'], 'Apply'],
  ['M3', 'Read: "The bottles are filled, then labelled, and finally packed into boxes." What happens to the bottles straight after they are filled?', ['They are labelled', 'They are packed into boxes', 'They are washed', 'They are sent to shops'], 'Understand'],
  ['M3', 'Read: "The website must be finished before the advertising campaign can start." Which statement is true?', ['The campaign starts after the website is ready', 'The campaign starts before the website is ready', 'The website and the campaign start on the same day', 'The campaign does not need the website'], 'Understand'],
  ['M3', 'Complete the sentence: "The project is ____ schedule, so we need to work faster."', ['behind', 'after', 'late', 'below'], 'Apply'],
  ['M4', 'In an email, an "attachment" is…', ['A file that is sent together with the email', 'The name of the person who sends the email', 'The first line of the email', 'A reply to an earlier email'], 'Remember'],
  ['M4', 'Which sentence is most appropriate in a formal business report?', ['"Online sales increased by 12% in the third quarter."', '"Online sales went up a lot, which is awesome."', '"We did great with online sales!!"', '"Online sales are better, I guess."'], 'Apply'],
  ['M4', 'Complete the email: "I am writing to ____ for the delay in delivering your order."', ['apologise', 'excuse', 'regret', 'sorry'], 'Apply'],

  ['K1', 'A company\'s "target customers" are…', ['The people it most wants to sell to', 'The people who work in its shops', 'The companies that sell similar products', 'The people who deliver its products'], 'Remember'],
  ['K1', 'Read: "This backpack is light, waterproof and has a pocket for a laptop. It is designed for university students." Who is the product for?', ['University students', 'Office managers', 'Young children', 'Professional athletes'], 'Understand'],
  ['K1', 'Read: "Our tea is grown on a small farm in Da Lat and picked by hand. It is not the cheapest tea, but it is the best." What is the writer\'s purpose?', ['To show that the tea is worth a higher price', 'To say that the tea is very cheap', 'To explain how to grow tea at home', 'To complain about the price of tea'], 'Analyze'],
  ['K2', 'Choose the correct word form: "Most ____ compare prices online before they buy."', ['consumers', 'consume', 'consumption', 'consuming'], 'Remember'],
  ['K2', 'Read: "Mai bought the same phone as her classmates because they all said it was good." Why did Mai choose this phone?', ['Her friends influenced her', 'It was the cheapest phone', 'She saw an advert on TV', 'The shop gave her a discount'], 'Understand'],
  ['K2', 'Which sentence has the same meaning as "I hardly ever shop in supermarkets"?', ['I almost never shop in supermarkets', 'I often shop in supermarkets', 'I always shop in supermarkets', 'I work hard in a supermarket'], 'Understand'],
  ['K3', 'A "slogan" is…', ['A short, easy-to-remember phrase used in advertising', 'A long report about an advert', 'The price of a product in an advert', 'A person who appears in an advert'], 'Remember'],
  ['K3', 'Complete the advert: "Don\'t ____ this special offer. It ends on Sunday!"', ['miss', 'lose', 'fail', 'drop'], 'Apply'],
  ['K3', 'Read: "Come to our opening day this Saturday. The first 100 customers will receive a free gift." What do customers need to do to get a gift?', ['Arrive early on Saturday', 'Buy 100 products', 'Come on any day this week', 'Pay for a gift on Saturday'], 'Understand'],
  ['K4', 'When you "click" on an online advert, you…', ['Press on it to open it', 'Share it with your friends', 'Hide it from your screen', 'Pay for the product in it'], 'Remember'],
  ['K4', 'Complete the sentence: "The number of visitors to our website ____ from 1,000 to 5,000 last month."', ['increased', 'increase', 'increasing', 'is increased'], 'Apply'],
  ['K4', 'Read: "Our video got 50,000 views, but only 40 people bought the product." What does the writer mean?', ['Many people watched, but few people bought', 'Most people who watched also bought', 'Nobody watched the video', 'The product sold out quickly'], 'Understand'],
  ['K5', 'A "survey" is…', ['A set of questions asked to many people to collect information', 'A meeting between a manager and one customer', 'An advert shown on social media', 'A report on company profits'], 'Remember'],
  ['K5', 'A survey of 100 students: 60 buy coffee every day, 30 buy it once a week, 10 never buy it. Which sentence describes the results correctly?', ['More than half of the students buy coffee every day', 'Most students never buy coffee', 'Half of the students buy coffee once a week', 'Only a few students buy coffee every day'], 'Analyze'],
  ['K5', 'Choose the correct word form: "Thank you for your ____ to our questions."', ['answers', 'answering', 'answered', 'answerable'], 'Remember'],
  ['K6', 'Read: "Customers trust this milk brand, so they buy it even when other brands are cheaper." What does this tell us?', ['Customers are loyal to the brand', 'The brand is the cheapest on the market', 'Customers do not know the brand', 'The brand is only sold online'], 'Understand'],
  ['K6', 'Which sentence has the same meaning as "Almost everyone in Vietnam knows this brand"?', ['The brand is very well known in Vietnam', 'The brand is new in Vietnam', 'Few people in Vietnam have heard of the brand', 'The brand is not sold in Vietnam'], 'Understand'],
  ['K6', 'Complete the sentence: "The company has a good ____ for quality and friendly service."', ['reputation', 'opinion', 'fame', 'popularity'], 'Apply'],
];

// [term, Vietnamese, definition, unit, pos, family, example, collocations]
const VOCAB = [
  ['Opportunity cost', 'Chi phí cơ hội', 'The value of the next best alternative given up when making a choice.', 'E1', "noun phrase", "opportunity (n) · opportune (adj) · opportunely (adv)", "Opportunity cost matters when a Da Nang bakery chooses between a new oven and a delivery bike.", "calculate the opportunity cost · a high opportunity cost · the opportunity cost of choosing"],
  ['Scarcity', 'Sự khan hiếm', 'Limited resources relative to unlimited wants, which forces choices.', 'E1', "noun", "scarcity (n) · scarce (adj) · scarcely (adv)", "Scarcity of clean water forces rice farms near Can Tho to choose their crops carefully.", "water scarcity · a scarcity of skilled labour · create scarcity"],
  ['Equilibrium price', 'Giá cân bằng', 'The price at which quantity demanded equals quantity supplied.', 'E2', "noun phrase", "equilibrium (n) · equilibrate (v) · price (n)", "Equilibrium price in the Ho Chi Minh City coffee market fell when three new farms started selling.", "reach the equilibrium price · above the equilibrium price · the new equilibrium price"],
  ['Demand curve', 'Đường cầu', 'A graph showing the quantity buyers will purchase at each price.', 'E2', "noun phrase", "demand (n) · demand (v) · demanding (adj)", "Demand curve diagrams help students in Hanoi see how a lower price raises weekly sales.", "draw a demand curve · shift the demand curve · a downward-sloping demand curve"],
  ['Price elasticity of demand', 'Độ co giãn của cầu theo giá', 'The responsiveness of quantity demanded to a change in price.', 'E3', "noun phrase", "elasticity (n) · elastic (adj) · elastically (adv)", "Price elasticity of demand for petrol in Vietnam is low, so sales fall only a little.", "measure the price elasticity of demand · low price elasticity of demand · the price elasticity of demand for rice"],
  ['Price ceiling', 'Giá trần', 'A legal maximum price, usually set below equilibrium.', 'E3', "noun phrase", "price (n) · priced (adj) · pricing (n)", "Price ceiling rules on student rooms in Da Nang keep rents low but create long waiting lists.", "set a price ceiling · impose a price ceiling · a price ceiling on rent"],
  ['Gross Domestic Product (GDP)', 'Tổng sản phẩm quốc nội', 'The total value of final goods and services produced in a country in a period.', 'E4', "noun phrase", "product (n) · produce (v) · productive (adj)", "Gross Domestic Product (GDP) in Vietnam grew strongly last year, the national statistics office reported.", "GDP growth · nominal GDP · GDP per head"],
  ['Inflation', 'Lạm phát', 'A sustained rise in the general price level.', 'E4', "noun", "inflation (n) · inflate (v) · inflationary (adj)", "Inflation rose last year, so families in Hanoi paid more for rice, pork and electricity.", "high inflation · control inflation · the inflation rate"],
  ['Assets', 'Tài sản', 'Resources controlled by a business that are expected to bring future benefits.', 'A1', "noun", "asset (n) · assets (n) · asset-rich (adj)", "Assets of the Saigon bakery include two delivery vans worth about 600 million VND.", "current assets · fixed assets · value the assets"],
  ['Liabilities', 'Nợ phải trả', 'Present obligations of a business, such as loans and amounts owed to suppliers.', 'A1', "noun", "liability (n) · liabilities (n) · liable (adj)", "Liabilities of the Hanoi factory include a bank loan of two billion VND due next year.", "current liabilities · total liabilities · reduce liabilities"],
  ['Debit / Credit', 'Ghi Nợ / Ghi Có', 'The left and right sides of an account in double-entry bookkeeping.', 'A2', "noun phrase", "debit (v) · debit (n) · credit (n) · credit (v)", "Debit / Credit rules tell the Hue shop owner which side of each account to use.", "a debit entry · credit an account · the debit and credit sides"],
  ['Trial balance', 'Bảng cân đối thử', 'A list of all ledger balances used to check that debits equal credits.', 'A2', "noun phrase", "balance (n) · balance (v) · balanced (adj)", "Trial balance of the Da Nang hotel showed a small error in the cash account.", "prepare a trial balance · check the trial balance · the trial balance agrees"],
  ['Balance sheet', 'Bảng cân đối kế toán', 'A statement of assets, liabilities and equity at a point in time.', 'A3', "noun phrase", "balance (n) · balance (v) · balanced (adj)", "Balance sheet of the company shows assets of nine billion VND at the end of June.", "prepare a balance sheet · appear on the balance sheet · a strong balance sheet"],
  ['Depreciation', 'Khấu hao', 'The allocation of the cost of a non-current asset over its useful life.', 'A3', "noun", "depreciation (n) · depreciate (v) · depreciated (adj)", "Depreciation on the delivery truck is 80 million VND each year for five years.", "calculate depreciation · annual depreciation · the depreciation charge"],
  ['Break-even point', 'Điểm hòa vốn', 'The output at which total revenue equals total cost.', 'A4', "noun phrase", "break even (v) · break-even (adj) · break-even analysis (n)", "Break-even point for the new milk tea shop in Hue is 300 cups a day.", "reach the break-even point · calculate the break-even point · above the break-even point"],
  ['Contribution margin', 'Số dư đảm phí', 'Selling price minus variable cost per unit.', 'A4', "noun phrase", "contribute (v) · contribution (n) · contributor (n)", "Contribution margin on each shirt is 40,000 VND after the factory pays for cloth and thread.", "a high contribution margin · calculate the contribution margin · the contribution margin per unit"],
  ['Audit opinion', 'Ý kiến kiểm toán', "The auditor's conclusion on whether financial statements are fairly presented.", 'A5', "noun phrase", "audit (v) · audit (n) · auditor (n)", "Audit opinion on the Hanoi company accounts was clean, so the bank approved the loan.", "give an audit opinion · a clean audit opinion · a qualified audit opinion"],
  ['Materiality', 'Tính trọng yếu', 'The size of an error that would change the decisions of users of the accounts.', 'A5', "noun", "material (adj) · materiality (n) · materially (adv)", "Materiality helps auditors decide which small mistakes in the accounts they can safely ignore.", "the level of materiality · assess materiality · the materiality threshold"],
  ['Compound interest', 'Lãi kép', 'Interest earned on both the original sum and previously earned interest.', 'F1', "noun phrase", "compound (v) · compound (adj) · interest (n)", "Compound interest turns a small savings account in Can Tho into a useful sum after ten years.", "earn compound interest · compound interest on savings · the power of compound interest"],
  ['Present value', 'Giá trị hiện tại', "Today's value of a future cash flow, found by discounting.", 'F1', "noun phrase", "value (n) · value (v) · valuable (adj)", "Present value of next year profit is lower than the same amount of cash today.", "calculate the present value · the present value of a cash flow · a higher present value"],
  ['Liquidity', 'Khả năng thanh khoản', 'The ability to meet short-term obligations as they fall due.', 'F2', "noun", "liquid (adj) · liquidity (n) · liquidate (v)", "Liquidity was weak, so the Da Nang restaurant could not pay its suppliers on time.", "improve liquidity · a liquidity problem · short-term liquidity"],
  ['Profit margin', 'Biên lợi nhuận', 'Profit expressed as a percentage of revenue.', 'F2', "noun phrase", "profit (n) · profit (v) · profitable (adj)", "Profit margin at the family coffee shop is twelve percent of monthly revenue.", "a thin profit margin · increase the profit margin · the net profit margin"],
  ['Working capital', 'Vốn lưu động', 'Current assets minus current liabilities.', 'F3', "noun phrase", "work (v) · working (adj) · capital (n)", "Working capital fell when the Hanoi shop bought too much stock before the Tet holiday.", "manage working capital · a shortage of working capital · working capital needs"],
  ['Cash budget', 'Ngân sách tiền mặt', 'A forecast of cash receipts and payments over coming months.', 'F3', "noun phrase", "budget (n) · budget (v) · budgetary (adj)", "Cash budget for the next six months shows a shortage in March, so the owner plans a loan.", "prepare a cash budget · a monthly cash budget · keep to the cash budget"],
  ['Net present value (NPV)', 'Giá trị hiện tại thuần', 'The sum of discounted cash inflows minus the initial investment.', 'F4', "noun phrase", "value (n) · value (v) · valuation (n)", "Net present value (NPV) of the new factory in Binh Duong is positive, so the team recommends it.", "a positive NPV · calculate the NPV · compare the NPV of two projects"],
  ['Payback period', 'Thời gian hoàn vốn', 'The time taken for cash inflows to repay the initial investment.', 'F4', "noun phrase", "pay back (v) · payback (n) · payable (adj)", "Payback period for the new coffee machine is only eight months at current sales.", "a short payback period · calculate the payback period · the payback period of an investment"],
  ['Central bank', 'Ngân hàng trung ương', "The institution that manages a country's currency, money supply and interest rates.", 'F5', "noun phrase", "centre (n) · central (adj) · centrally (adv)", "Central bank decisions on interest rates change how much Vietnamese families pay on home loans.", "central bank policy · the central bank raises rates · the governor of the central bank"],
  ['Bond yield', 'Lợi suất trái phiếu', 'The return an investor earns on a bond, expressed as a percentage.', 'F5', "noun phrase", "yield (v) · yield (n) · bond (n)", "Bond yield on ten-year government bonds rose, so investors moved money out of shares.", "a rising bond yield · the yield on a bond · compare bond yields"],
  ['Span of control', 'Tầm hạn quản trị', 'The number of subordinates directly managed by one manager.', 'M1', "noun phrase", "control (n) · control (v) · controller (n)", "Span of control in the Hanoi call centre is wide, with one manager and twenty staff.", "a wide span of control · a narrow span of control · increase the span of control"],
  ['Organisational chart', 'Sơ đồ tổ chức', 'A diagram showing roles, departments and reporting lines.', 'M1', "noun phrase", "organise (v) · organisation (n) · organisational (adj)", "Organisational chart of the Da Nang hotel shows four departments and two assistant managers.", "draw an organisational chart · update the organisational chart · appear on the organisational chart"],
  ['Business plan', 'Kế hoạch kinh doanh', 'A document describing a business idea, market, operations and finances.', 'M2', "noun phrase", "business (n) · plan (v) · planning (n)", "Business plan for the student laundry service explains costs, prices and the first year of sales.", "write a business plan · present a business plan · a detailed business plan"],
  ['Start-up', 'Doanh nghiệp khởi nghiệp', 'A newly established business, often seeking rapid growth.', 'M2', "noun", "start up (v) · start-up (n) · start-up (adj)", "Start-up culture in Ho Chi Minh City attracts many young business graduates every year.", "launch a start-up · a tech start-up · start-up costs"],
  ['Lean production', 'Sản xuất tinh gọn', 'An approach that removes waste from every step of a process.', 'M3', "noun phrase", "lean (adj) · produce (v) · production (n)", "Lean production helped the Binh Duong furniture factory cut waiting time between two work stations.", "introduce lean production · lean production methods · the benefits of lean production"],
  ['Critical path', 'Đường găng', 'The longest chain of dependent tasks, which sets the minimum project duration.', 'M3', "noun phrase", "critical (adj) · critically (adv) · criticism (n)", "Critical path for the new campus building runs through the concrete work and the roof.", "identify the critical path · tasks on the critical path · the critical path method"],
  ['Executive summary', 'Tóm tắt điều hành', 'A short overview at the start of a report for busy readers.', 'M4', "noun phrase", "execute (v) · executive (n) · executive (adj)", "Executive summary of the market report gives the main findings in fewer than 200 words.", "write an executive summary · a one-page executive summary · read the executive summary"],
  ['Memorandum', 'Bản ghi nhớ', 'A short internal business document.', 'M4', "noun", "memorandum (n) · memoranda (n) · memo (n)", "Memorandum from the manager asked all staff in the Hanoi office to report overtime weekly.", "send a memorandum · an internal memorandum · a memorandum to staff"],
  ['Marketing mix', 'Marketing hỗn hợp', 'The 4Ps: product, price, place and promotion.', 'K1', "noun phrase", "market (v) · marketing (n) · marketer (n)", "Marketing mix for the new milk tea brand covers product, price, place and promotion.", "design the marketing mix · change the marketing mix · the elements of the marketing mix"],
  ['Market segmentation', 'Phân khúc thị trường', 'Dividing a market into groups of buyers with similar needs.', 'K1', "noun phrase", "segment (v) · segment (n) · segmentation (n)", "Market segmentation showed that students and office workers in Hanoi want different sizes of coffee.", "use market segmentation · market segmentation by age · a clear market segmentation strategy"],
  ['Purchase decision', 'Quyết định mua', 'The stage at which a consumer chooses a brand and buys.', 'K2', "noun phrase", "purchase (v) · purchase (n) · purchaser (n)", "Purchase decision often happens inside the shop, so packaging matters for Vietnamese snack brands.", "make a purchase decision · influence the purchase decision · the final purchase decision"],
  ['Reference group', 'Nhóm tham khảo', "People whose opinions shape a consumer's attitudes and choices.", 'K2', "noun phrase", "refer (v) · reference (n) · referral (n)", "Reference group of close friends influences how young buyers in Hanoi choose a phone brand.", "belong to a reference group · the influence of a reference group · an important reference group"],
  ['Advertising campaign', 'Chiến dịch quảng cáo', 'A coordinated series of adverts with one objective and message.', 'K3', "noun phrase", "advertise (v) · advertising (n) · advertisement (n)", "Advertising campaign for the Tet holiday ran on television and social media for six weeks.", "launch an advertising campaign · run an advertising campaign · a successful advertising campaign"],
  ['Public relations (PR)', 'Quan hệ công chúng', 'Managing communication to build a positive public image.', 'K3', "noun phrase", "relate (v) · relation (n) · public (adj)", "Public relations (PR) work helped the Da Nang hotel explain its new safety rules to guests.", "a PR campaign · work in public relations · good public relations"],
  ['Click-through rate (CTR)', 'Tỷ lệ nhấp chuột', 'Clicks divided by impressions for an online advert.', 'K4', "noun phrase", "click (v) · click (n) · clickable (adj)", "Click-through rate (CTR) on the new Facebook advert reached three percent in the first week.", "a low CTR · improve the click-through rate · measure the CTR"],
  ['Search engine optimisation (SEO)', 'Tối ưu hóa công cụ tìm kiếm', 'Improving a website so it ranks higher in organic search results.', 'K4', "noun phrase", "optimise (v) · optimisation (n) · optimal (adj)", "Search engine optimisation (SEO) brought many more Vietnamese visitors to the small travel company website.", "do SEO · SEO tools · improve search engine optimisation"],
  ['Questionnaire', 'Bảng câu hỏi', 'A structured set of questions used to collect survey data.', 'K5', "noun", "question (n) · question (v) · questionnaire (n)", "Questionnaire about coffee habits was sent to 200 students at our university in May.", "design a questionnaire · complete a questionnaire · a short questionnaire"],
  ['Sample', 'Mẫu', 'A subset of a population chosen for study.', 'K5', "noun", "sample (n) · sample (v) · sampling (n)", "Sample of 150 shoppers in Can Tho was large enough for the marketing team report.", "a random sample · a sample of customers · the sample size"],
  ['Brand equity', 'Tài sản thương hiệu', 'The extra value a brand name gives to a product.', 'K6', "noun phrase", "brand (n) · brand (v) · branding (n)", "Brand equity lets the Vietnamese coffee company charge more than smaller brands for the same drink.", "build brand equity · strong brand equity · measure brand equity"],
  ['Brand loyalty', 'Lòng trung thành thương hiệu', 'The tendency of customers to keep buying the same brand.', 'K6', "noun phrase", "brand (n) · loyal (adj) · loyalty (n)", "Brand loyalty keeps many Hanoi families buying the same fish sauce for many years.", "build brand loyalty · strong brand loyalty · reward brand loyalty"],
];

// [id, unitId, name, vietnameseName, form, use, useVi, examples, watchOut]
const GRAMMAR = [
  ['G1', 'E1', 'Comparatives and superlatives', 'So sánh hơn và so sánh nhất', 'short adjective + -er + than · more + long adjective + than · the + short adjective + -est · the most + long adjective', 'Use these forms to weigh up two or more choices and say which option costs less, brings more benefit or is the best use of limited money and time.', 'Dùng các dạng so sánh để cân nhắc các lựa chọn và nói rõ phương án nào tốn ít hơn, có lợi hơn hoặc là tốt nhất khi tiền và thời gian có hạn.', ['A delivery bike is cheaper than a new oven, so the Hue bakery buys the bike first.', 'Renting a stall in Da Nang is more expensive than selling online from home.', 'For a student with 50,000 VND, lunch is the most useful choice of the three.'], 'Do not say "more cheaper" or "the most cheapest" — use either -er and -est or more and the most, never both together.'],
  ['G2', 'E2', 'First conditional and unless', 'Câu điều kiện loại 1 và unless', 'If + present simple, will + base verb · Unless + present simple, will + base verb · If + present simple, may/might + base verb', 'Use the first conditional to predict what will happen to prices, demand or supply in a market when one real condition changes.', 'Dùng câu điều kiện loại 1 để dự đoán giá cả, cung và cầu sẽ thay đổi thế nào nếu một điều kiện có thật xảy ra.', ['If the coffee harvest is poor this year, prices in Ho Chi Minh City will rise sharply.', 'Unless the shop lowers its price, it will sell fewer cups of bubble tea each week.', 'If more farms start selling rice, the market price may fall by the end of June.'], 'Do not say "If the price will rise, demand will fall" — use the present simple after "if": "If the price rises, demand will fall."'],
  ['G3', 'E3', 'The passive voice', 'Câu bị động', 'am/is/are + past participle · was/were + past participle · will be + past participle', 'Use the passive when the rule, price or tax is more important than the person or office that decided it, which is common in reports about government action.', 'Dùng câu bị động khi điều quan trọng là quy định, giá hay thuế, chứ không phải ai đã quyết định, thường gặp trong bài viết về chính sách.', ['A maximum price for face masks is set by the city each year in the rainy season.', 'The new tax on sugary drinks was announced in Hanoi three months ago.', 'A price ceiling on student rooms will be introduced in Da Nang next September.'], 'Do not say "The price was rose by the city" — "rise" has no passive, so write "The price was raised by the city."'],
  ['G4', 'E4', 'Present perfect and past simple', 'Hiện tại hoàn thành và quá khứ đơn', 'have/has + past participle + for + period · have/has + past participle + since + point in time · past simple + finished time expression', 'Use the present perfect for a trend in growth, prices or jobs that continues now, and the past simple for a figure from a year or quarter that is finished.', 'Dùng hiện tại hoàn thành cho xu hướng vẫn còn tiếp diễn, và quá khứ đơn cho số liệu của một thời kỳ đã kết thúc.', ['Inflation has stayed near four per cent for three years, the national office reports.', 'Unemployment has fallen in Binh Duong since the two new factories opened.', 'The economy grew by six per cent last year, faster than most analysts expected.'], 'Do not say "Inflation has risen last year" — use the past simple with a finished time: "Inflation rose last year."'],
  ['G5', 'A1', 'Present simple and state verbs', 'Thì hiện tại đơn và động từ chỉ trạng thái', 'subject + base verb / verb + -s · subject + own/owe/belong/include + object', 'Use the present simple to define accounting terms and to state what a business owns, owes and includes, because these are facts rather than actions in progress.', 'Dùng hiện tại đơn để định nghĩa thuật ngữ kế toán và nêu doanh nghiệp sở hữu gì, nợ gì, vì đây là sự thật chứ không phải hành động đang diễn ra.', ['Liabilities mean the money a business owes to banks and to its suppliers.', 'The Saigon bakery owns two delivery vans worth about 600 million VND.', 'The two vans belong to the company, and the loan still owes 400 million VND.'], 'Do not say "The company is owning two vans" — state verbs take the simple form: "The company owns two vans."'],
  ['G6', 'A2', 'The present passive for procedures', 'Câu bị động ở hiện tại đơn dùng mô tả quy trình', 'am/is/are + past participle · First/Next/Finally + is/are + past participle', 'Use the present passive to describe each step of a recording procedure, so the reader focuses on what is done rather than on which clerk does it.', 'Dùng bị động hiện tại đơn để mô tả từng bước của quy trình ghi chép, giúp người đọc tập trung vào việc được làm chứ không phải ai làm.', ['First, the date of every transaction is entered in the cash book by hand.', 'Next, the amount is written in the correct debit or credit column.', 'Finally, the two totals are checked, and the trial balance is prepared.'], 'Do not say "The amount is write in the column" — the passive needs a past participle: "The amount is written in the column."'],
  ['G7', 'A3', 'Prepositions of change', 'Giới từ diễn tả sự thay đổi', 'rise/fall + from + figure + to + figure · rise/fall + by + amount · rise/fall + to + level', 'Use these prepositions to report results accurately, because "from ... to" gives the two figures and "by" gives only the size of the change.', 'Dùng các giới từ này để báo cáo kết quả chính xác, vì "from ... to" nêu hai con số còn "by" chỉ nêu mức thay đổi.', ['Revenue rose from 700 million VND to 900 million VND in the year to December.', 'Rent in the Da Nang hotel increased by 30 million VND after the new contract.', 'Net profit fell to 150 million VND because wages and electricity cost more.'], 'Do not say "Profit rose with 20 million VND" — use "by" for the size of a change: "Profit rose by 20 million VND."'],
  ['G8', 'A4', 'First conditional and unless', 'Câu điều kiện loại 1 và unless', 'If + present simple, will + base verb · Unless + present simple, will + base verb · If + present simple, will not + base verb', 'Use the first conditional to test cost and price decisions, saying what result follows if the shop reaches, or fails to reach, a certain level of sales.', 'Dùng câu điều kiện loại 1 để thử các quyết định về chi phí và giá bán, nêu kết quả nếu doanh thu đạt hoặc không đạt một mức nhất định.', ['If we sell 3,000 cups a month, we will cover all the costs of the shop.', 'Unless the price of flour falls, the bakery will not break even this quarter.', 'If the rent goes up by ten per cent, we will raise each price by 2,000 VND.'], 'Do not say "If we will sell 3,000 cups, we cover our costs" — put "will" in the result only: "If we sell 3,000 cups, we will cover our costs."'],
  ['G9', 'A5', 'Polite requests and obligation', 'Câu yêu cầu lịch sự và động từ khuyết thiếu chỉ nghĩa vụ', 'Could you + base verb + please? · Would you mind + verb + -ing? · must / have to / do not have to + base verb', 'Use polite requests to ask staff for audit documents, and obligation modals to say clearly which tasks are required and which are optional.', 'Dùng câu yêu cầu lịch sự để xin tài liệu kiểm toán, và động từ khuyết thiếu để nói rõ việc nào bắt buộc, việc nào không.', ['Could you send us all the invoices from last year before Monday morning, please?', 'Every company in Vietnam must keep its bank statements for at least ten years.', 'You do not have to print the files, because the auditors read them on screen.'], 'Do not say "You must not prepare the files" when you mean they are optional — "must not" is a ban, so use "do not have to".'],
  ['G10', 'F1', 'First conditional for money decisions', 'Câu điều kiện loại 1 nói về quyết định tài chính', 'If + present simple, will + base verb · If + present simple, will be worth + figure', 'Use the first conditional to show how a saving or investment decision today changes the amount of money a person will hold in the future.', 'Dùng câu điều kiện loại 1 để cho thấy một quyết định gửi tiền hay đầu tư hôm nay sẽ thay đổi số tiền trong tương lai thế nào.', ['If you save 100 million VND for ten years, the account will be worth much more.', 'If the bank pays six per cent a year, your savings in Can Tho will double slowly.', 'If we spend the money today, we will lose all the compound interest on it.'], 'Do not say "If you would save the money, it grows" — the first conditional uses the present simple plus "will": "If you save the money, it will grow."'],
  ['G11', 'F2', 'Comparatives, superlatives and as ... as', 'So sánh hơn, so sánh nhất và cấu trúc as ... as', 'more + long adjective + than · the + short adjective + -est · as + adjective + as · not as + adjective + as', 'Use these forms to compare two companies or two years from a table of ratios, and to say when two figures are in fact equal.', 'Dùng các dạng này để so sánh hai công ty hoặc hai năm dựa trên bảng chỉ số, và nêu khi hai con số thực ra bằng nhau.', ['Company A is more profitable than Company B, with a margin of twelve per cent.', 'The profit this year is not as high as the profit the company made in 2024.', 'Of the four firms in the table, the Hanoi trading group has the strongest liquidity.'], 'Do not say "Our margin is not as high than theirs" — the structure takes "as" twice: "not as high as theirs."'],
  ['G12', 'F3', 'Will for forecasts, be going to for plans', 'Will cho dự đoán và be going to cho kế hoạch', 'will + base verb · be going to + base verb', 'Use "will" for a forecast of cash you expect but cannot control, and "be going to" for a payment or action the team has already decided.', 'Dùng "will" cho dự báo dòng tiền mà ta không kiểm soát được, và "be going to" cho khoản chi hay việc đã quyết định làm.', ['Our cash budget shows that March will be a difficult month for the shop.', 'We are going to ask the bank for a short loan of 200 million VND in February.', 'The supplier in Binh Duong is going to send the invoice at the end of the week.'], 'Do not say "I will ask the bank tomorrow, it is already decided" for a fixed plan — use "I am going to ask the bank tomorrow."'],
  ['G13', 'F4', 'Second conditional and be likely to', 'Câu điều kiện loại 2 và cấu trúc be likely to', 'If + past simple, would + base verb · be likely to + base verb · be unlikely to + base verb', 'Use the second conditional to discuss an investment the company has not made, and "be likely to" to say how probable a cash flow or payback is.', 'Dùng câu điều kiện loại 2 để bàn về một khoản đầu tư chưa thực hiện, và "be likely to" để nói mức khả năng của dòng tiền hay thời gian hoàn vốn.', ['If we bought the new oven, the bakery in Hue would pay it back in three years.', 'The project in Binh Duong is likely to produce a positive net present value.', 'If interest rates doubled, the factory would be unlikely to borrow any money.'], 'Do not say "If we would buy the oven, we would save money" — use the past simple in the if clause: "If we bought the oven, we would save money."'],
  ['G14', 'F5', 'The language of trends', 'Cách diễn đạt xu hướng', 'have/has + past participle + since + point in time · past simple + finished time expression · have/has + past participle + for + period', 'Use the present perfect with "since" for a market movement that is still going on, and the past simple for a session, month or year that has closed.', 'Dùng hiện tại hoàn thành với "since" cho biến động thị trường còn tiếp diễn, và quá khứ đơn cho phiên, tháng hay năm đã kết thúc.', ['Bond yields have risen since the central bank raised its main interest rate.', 'Share prices fell sharply on Monday after weak results from two large banks.', 'The index has stayed above 1,200 points for six weeks, local analysts say.'], 'Do not say "Yields have risen on Monday" — a finished time takes the past simple: "Yields rose on Monday."'],
  ['G15', 'M1', 'Describing responsibilities', 'Cách diễn đạt trách nhiệm trong công việc', 'be responsible for + noun or verb + -ing · be in charge of + noun or verb + -ing · report to + person', 'Use these phrases to explain who does what in a company and who each member of staff answers to, when you present an organisational chart.', 'Dùng các cấu trúc này để nêu ai phụ trách việc gì trong công ty và mỗi người báo cáo cho ai, khi trình bày sơ đồ tổ chức.', ['The sales manager is responsible for twenty staff in the Hanoi call centre.', 'Ms Hoa is in charge of training all new receptionists at the Da Nang hotel.', 'The two assistant managers report to the general manager every Monday morning.'], 'Do not say "She is responsible of the team" or "She is responsible to train staff" — use "responsible for the team" and "responsible for training staff."'],
  ['G16', 'M2', 'Talking about plans', 'Cách nói về kế hoạch', 'be going to + base verb · plan to + base verb · hope to + base verb', 'Use these forms in a short pitch to tell investors what your new business has decided to do and when each step will happen.', 'Dùng các cấu trúc này trong bài thuyết trình ngắn để nói với nhà đầu tư rằng doanh nghiệp mới dự định làm gì và khi nào.', ['We are going to open our first laundry shop near the university in October.', 'The founders plan to hire four part-time students in the first six months.', 'Our start-up hopes to serve 500 customers a month by the end of next year.'], 'Do not say "We plan opening a second shop" — "plan" takes the infinitive: "We plan to open a second shop."'],
  ['G17', 'M3', 'Present simple passive and obligation', 'Bị động hiện tại đơn và nghĩa vụ', 'am/is/are + past participle · must + base verb · have to + base verb · must not + base verb', 'Use the present passive to describe the stages of a production process, and obligation modals to state the safety rules and deadlines staff follow.', 'Dùng bị động hiện tại đơn để mô tả các giai đoạn của quy trình sản xuất, và động từ khuyết thiếu để nêu quy định an toàn và thời hạn.', ['The cloth is cut first, then the shirts are sewn and checked by two workers.', 'Every box has to be labelled before the lorry leaves the factory in Binh Duong.', 'Visitors must not enter the production area without a helmet and a safety badge.'], 'Do not say "The shirts are sew by hand" — the passive needs the past participle: "The shirts are sewn by hand."'],
  ['G18', 'M4', 'Polite requests and formal style', 'Yêu cầu lịch sự và văn phong trang trọng trong email', 'Could you please + base verb? · I would be grateful if you could + base verb · I am writing to + base verb', 'Use these formal patterns in business emails so a request sounds respectful to a manager or client you do not know well.', 'Dùng các mẫu câu trang trọng này trong email công việc để lời đề nghị nghe tôn trọng với cấp trên hay khách hàng chưa thân.', ['I am writing to ask about invoice 204, which is now two weeks overdue.', 'Could you please confirm the delivery date for the order to our Hanoi office?', 'I would be grateful if you could send the report before Friday afternoon.'], 'Do not write "Send me the report now" in a formal email — soften it: "Could you please send me the report?"'],
  ['G19', 'K1', 'Comparatives and superlatives for products', 'So sánh hơn và so sánh nhất khi mô tả sản phẩm', 'short adjective + -er + than · more + long adjective + than · the most + long adjective', 'Use comparative and superlative forms in a marketing plan to show how your product stands against rival products on price, size and quality.', 'Dùng dạng so sánh hơn và so sánh nhất trong kế hoạch marketing để cho thấy sản phẩm hơn đối thủ ở giá, kích cỡ và chất lượng.', ['Our new tea is sweeter than the old recipe, and the bottle is 20 per cent larger.', 'This phone case is more durable than the cheap cases sold near the market.', 'At 25,000 VND, our lunch box is the most popular choice with Hanoi students.'], 'Do not say "This case is more better than theirs" — "better" is already comparative: "This case is better than theirs."'],
  ['G20', 'K2', 'Present simple, present continuous and frequency', 'Hiện tại đơn, hiện tại tiếp diễn và trạng từ chỉ tần suất', 'subject + verb + -s · am/is/are + verb + -ing · always/usually/often/sometimes/never + verb', 'Use the present simple with frequency adverbs for shopping habits, and the present continuous for a change in behaviour happening at the moment.', 'Dùng hiện tại đơn với trạng từ tần suất để nói về thói quen mua sắm, và hiện tại tiếp diễn cho hành vi đang thay đổi.', ['Most students in Can Tho usually buy coffee on the way to the morning class.', 'More shoppers are moving to online orders this year, our survey comments show.', 'She never pays by cash, and she often compares prices on two apps first.'], 'Do not say "She buys always coffee online" — the frequency adverb goes before the main verb: "She always buys coffee online."'],
  ['G21', 'K3', 'Making suggestions and imperatives', 'Cách đưa ra đề xuất và câu mệnh lệnh', 'How about + verb + -ing? · Why do not we + base verb? · base verb + object', 'Use suggestion forms when planning a campaign with colleagues, and imperatives in the advert itself to tell the customer what to do.', 'Dùng mẫu câu đề xuất khi cùng đồng nghiệp lên kế hoạch quảng cáo, và câu mệnh lệnh trong chính mẩu quảng cáo để kêu gọi khách hàng.', ['How about offering a free second cup to every student before nine in the morning?', 'Why do not we put the advert on three bus stops near the campus in Hanoi?', 'Taste our new iced tea today, and pay only 19,000 VND until the end of June.'], 'Do not say "How about to offer a discount" — "how about" takes the -ing form: "How about offering a discount?"'],
  ['G22', 'K4', 'Present perfect and past simple for results', 'Hiện tại hoàn thành và quá khứ đơn khi báo cáo kết quả', 'have/has + past participle · past simple + finished time expression', 'Use the present perfect for campaign results that still stand today, and the past simple when you name the week or month the figures come from.', 'Dùng hiện tại hoàn thành cho kết quả chiến dịch vẫn còn giá trị, và quá khứ đơn khi nêu rõ tuần hay tháng của số liệu.', ['The advert has received a total of 50,000 views and 1,000 clicks so far.', 'Last month the page gained 3,000 new followers, mostly from Ho Chi Minh City.', 'We have doubled our online sales, and the cost per click has fallen slightly.'], 'Do not say "We have doubled our sales last month" — a named past month needs the past simple: "We doubled our sales last month."'],
  ['G23', 'K5', 'Question forms', 'Các dạng câu hỏi', 'Do/Does + subject + base verb? · Wh-word + do/does + subject + base verb? · Could you tell me + wh-word + subject + verb?', 'Use clear direct questions in a questionnaire, and polite indirect questions when you interview a customer you have just met.', 'Dùng câu hỏi trực tiếp rõ ràng trong bảng câu hỏi, và câu hỏi gián tiếp lịch sự khi phỏng vấn khách hàng mới gặp.', ['Do you buy coffee near the university more than three times a week?', 'How much do you usually spend on lunch in the city centre each day?', 'Could you tell me where you heard about our shop for the first time?'], 'Do not say "Could you tell me where did you hear about us" — an indirect question keeps normal word order: "where you heard about us."'],
  ['G24', 'K6', 'Linking words', 'Từ nối', 'however · although + clause · because + clause · in addition', 'Use linking words to join ideas about a brand image, showing contrast, reason and extra information in a short written description.', 'Dùng từ nối để liên kết các ý khi mô tả hình ảnh thương hiệu, thể hiện sự trái ngược, lý do và thông tin bổ sung.', ['Families trust this fish sauce because the brand has not changed its recipe.', 'Although the coffee brand is expensive, many Hanoi customers stay loyal to it.', 'The brand feels modern and friendly. In addition, the packaging is easy to carry.'], 'Do not say "Although the brand is expensive, but customers buy it" — use either "although" or "but", never both in one sentence.'],
];

/* ------------------------------------------------------------------ framework & programmes */
const FRAMEWORK = ['E1', 'A1', 'F1', 'M1', 'E2', 'A2', 'F2', 'M2', 'E3', 'A3', 'F3', 'M3', 'E4', 'A4', 'F4', 'M4'];
const REQUIRED = ['E1', 'E2', 'E4', 'A1', 'F1', 'M1'];
const CURRICULA = {
  'P-ECO': FRAMEWORK,
  'P-ACF': ['E1', 'A1', 'F1', 'M1', 'E2', 'A2', 'F2', 'A5', 'E3', 'A3', 'F3', 'F5', 'E4', 'A4', 'F4', 'M4'],
  'P-MKT': ['E1', 'A1', 'F1', 'M1', 'E2', 'K1', 'K2', 'M2', 'K3', 'A3', 'K4', 'K5', 'E4', 'K6', 'F2', 'M4'],
};

let blkSeq = 0;
export function blocksForUnit(unit) {
  const b = (type, title, minutes) => ({ id: `B${++blkSeq}-${Math.random().toString(36).slice(2, 6)}`, type, title, minutes });
  const list = [b('theory', `Reading: ${unit.title}`, 25), b('vocabulary', 'Key words (EN–VI)', 10)];
  if (['E2', 'E3'].includes(unit.id)) list.push(b('simulation', 'Describe the chart: demand, supply and price', 20));
  else if (unit.example) list.push(b('calculation', 'Language focus', 20));
  else list.push(b('case_study', 'Speaking task', 25));
  list.push(b('quiz', 'Practice check', 10));
  return list;
}

export function buildSeed() {
  blkSeq = 0;
  const r = rng(20260907);
  const units = UNITS.map(([id, subject, title, summary, example]) => ({ id, subject, title, summary, example: example || null }));
  const unitMap = Object.fromEntries(units.map(u => [u.id, u]));

  /* org tree */
  const orgUnits = [
    { id: 'UEH', type: 'university', name: 'UEH University', parentId: null },
    { id: 'SCH-ECO', type: 'school', name: 'School of Economics', parentId: 'UEH' },
    { id: 'SCH-ACF', type: 'school', name: 'School of Accounting & Finance', parentId: 'UEH' },
    { id: 'SCH-MKT', type: 'school', name: 'School of Marketing', parentId: 'UEH' },
    { id: 'P-ECO', type: 'program', name: 'Bachelor of Economics', parentId: 'SCH-ECO' },
    { id: 'P-ACF', type: 'program', name: 'Bachelor of Accounting & Finance', parentId: 'SCH-ACF' },
    { id: 'P-MKT', type: 'program', name: 'Bachelor of Marketing', parentId: 'SCH-MKT' },
  ];

  const users = [
    { id: 'P1', name: 'Dr. Tran Minh Quan', title: 'Vice Rector, Academic Affairs', role: 'provost', orgId: 'UEH' },
    { id: 'D1', name: 'Dr. Arthur Vance', title: 'Dean, School of Economics', role: 'director', orgId: 'SCH-ECO' },
    { id: 'D2', name: 'Dr. Pham Thu Ha', title: 'Dean, School of Accounting & Finance', role: 'director', orgId: 'SCH-ACF' },
    { id: 'D3', name: 'Dr. Le Hoang Nam', title: 'Dean, School of Marketing', role: 'director', orgId: 'SCH-MKT' },
    { id: 'I1', name: 'David Harrison', title: 'Lecturer, School of Economics', role: 'instructor' },
    { id: 'I2', name: 'Nguyen Thi Mai', title: 'Lecturer, School of Accounting & Finance', role: 'instructor' },
    { id: 'I3', name: 'Michael Nguyen', title: 'Lecturer, School of Marketing', role: 'instructor' },
    { id: 'I4', name: 'Tran Thi Lan', title: 'Lecturer, School of Economics', role: 'instructor' },
    { id: 'I5', name: 'Hoang Duc Minh', title: 'Lecturer, School of Accounting & Finance', role: 'instructor' },
    { id: 'A1', name: 'Sarah Kim', title: 'System Administrator', role: 'admin', orgId: 'UEH' },
  ];
  const SECTION_DEFS = [
    { id: 'S-ECO1', programId: 'P-ECO', code: 'ECO-K50-01', instructor: 'I1' },
    { id: 'S-ECO2', programId: 'P-ECO', code: 'ECO-K50-02', instructor: 'I1' },
    { id: 'S-ACF1', programId: 'P-ACF', code: 'ACF-K50-01', instructor: 'I2' },
    { id: 'S-MKT1', programId: 'P-MKT', code: 'MKT-K50-01', instructor: 'I3' },
    { id: 'S-MKT2', programId: 'P-MKT', code: 'MKT-K50-02', instructor: 'I3' },
  ];
  // Who teaches each subject in each class (null = not yet assigned). I2 is deliberately over the load limit.
  const STAFFING = {
    'S-ECO1': { ECO: 'I1', ACC: 'I2', FIN: 'I5', MGT: 'I1' },
    'S-ECO2': { ECO: 'I4', ACC: 'I2', FIN: 'I5', MGT: 'I4' },
    'S-ACF1': { ECO: 'I4', ACC: 'I2', FIN: 'I5', MGT: 'I1' },
    'S-MKT1': { ECO: 'I1', ACC: 'I2', FIN: 'I5', MGT: 'I3', MKT: 'I3' },
    'S-MKT2': { ECO: 'I4', ACC: 'I2', FIN: null, MGT: 'I1', MKT: 'I3' },
  };
  const NAMES = [
    'Dang Hoang Minh', 'Nguyen Thanh Long', 'Pham Quoc Thai', 'Le Thi Thanh Van', 'Tran Minh Khoa', 'Vo Ngoc Anh',
    'Bui Duc Huy', 'Hoang Thu Trang', 'Do Van Phuc', 'Ngo Bao Chau', 'Ly Gia Han', 'Phan Tuan Kiet',
    'Truong My Linh', 'Huynh Gia Bao', 'Dinh Khanh Vy', 'Mai Quoc Dat', 'Lam Thao Nguyen', 'Cao Minh Triet',
    'Nguyen Ha My', 'Tran Duc Anh', 'Vu Hoang Yen', 'Le Nhat Quang', 'Pham Bao Ngoc', 'Doan Thanh Tam',
    'Ho Thi Kim Ngan', 'Nguyen Phuc Thinh', 'Ta Minh Chau', 'Kieu Anh Thu', 'Luu Quang Vinh', 'Chau Ngoc Han',
  ];
  // [ability (P correct), engagement (P block completed)]
  const PROFILE = [
    [0.86, 0.93], [0.78, 0.86], [0.52, 0.47], [0.94, 0.97], [0.7, 0.8], [0.74, 0.74],
    [0.8, 0.85], [0.86, 0.9], [0.44, 0.63], [0.7, 0.78], [0.9, 0.92], [0.62, 0.7],
    [0.82, 0.88], [0.75, 0.82], [0.92, 0.95], [0.48, 0.55], [0.7, 0.76], [0.8, 0.84],
    [0.88, 0.9], [0.72, 0.8], [0.66, 0.72], [0.9, 0.94], [0.58, 0.66], [0.77, 0.83],
    [0.85, 0.9], [0.69, 0.75], [0.95, 0.96], [0.6, 0.58], [0.79, 0.86], [0.73, 0.8],
  ];
  const profile = {};
  NAMES.forEach((name, i) => {
    const sec = SECTION_DEFS[Math.floor(i / 6)];
    const id = `SV${String(i + 1).padStart(3, '0')}`;
    users.push({ id, name, title: `Student, ${sec.code}`, role: 'student', sectionId: sec.id });
    profile[id] = { ab: PROFILE[i][0], en: PROFILE[i][1] };
  });
  users.forEach(u => { u.email = u.role === 'student' ? `${u.id.toLowerCase()}@st.ueh.edu.vn` : `${u.name.replace(/^Dr\.\s*/, '').toLowerCase().split(' ').slice(-1)[0]}.${u.id.toLowerCase()}@ueh.edu.vn`; });
  const students = users.filter(u => u.role === 'student');

  const programs = ['P-ECO', 'P-ACF', 'P-MKT'].map(pid => ({
    id: pid, orgId: pid, schoolId: orgUnits.find(o => o.id === pid).parentId, frameworkId: 'FW1', code: pid.slice(2),
    versions: [{ id: `${pid}-K50`, label: 'Intake K50, 2026', unitIds: CURRICULA[pid], status: 'active', approvedBy: 'P1', approvedAt: iso(new Date('2026-06-15T09:00:00')) }],
    proposal: null,
  }));
  // Marketing has a proposal for the next intake waiting for the Vice Rector.
  programs.find(p => p.id === 'P-MKT').proposal = {
    unitIds: ['E1', 'A1', 'F1', 'M1', 'E2', 'K1', 'K2', 'K7', 'K3', 'A3', 'K4', 'K5', 'E4', 'K6', 'F2', 'M4'],
    status: 'submitted', note: null, updatedBy: 'D3', updatedAt: iso(at(CURRENT_WEEK - 1, 3, 15)), submittedAt: iso(at(CURRENT_WEEK - 1, 3, 15)),
    rationale: 'Replace Entrepreneurship with Sales & CRM in week 8 — employers ask for stronger sales skills from marketing graduates. Entrepreneurship moves to Year 2.',
    history: [{ at: iso(at(CURRENT_WEEK - 1, 3, 15)), by: 'D3', action: 'Submitted for approval' }],
  };

  const sections = SECTION_DEFS.map(d => ({
    id: d.id, programId: d.programId, versionId: `${d.programId}-K50`, code: d.code,
    leadId: d.instructor, assignments: STAFFING[d.id], instructorIds: [...new Set([d.instructor, ...Object.values(STAFFING[d.id]).filter(Boolean)])], studentIds: students.filter(s => s.sectionId === d.id).map(s => s.id),
  }));
  const curriculumOf = (sec) => programs.find(p => p.id === sec.programId).versions.find(v => v.id === sec.versionId).unitIds;

  /* questions */
  const questions = Q.map(([unitId, stem, opts, bloom], i) => {
    const order = opts.map((o, k) => ({ o, k, s: r() })).sort((a, b) => a.s - b.s);
    return { id: `Q${i + 1}`, unitId, stem, options: order.map(x => x.o), answerIndex: order.findIndex(x => x.k === 0), competencyTag: SUBJECTS[unitMap[unitId].subject].label, bloomLevel: bloom, points: 1 };
  });
  const qOf = (unitId, n = 3) => questions.filter(q => q.unitId === unitId).slice(0, n).map(q => q.id);

  /* lessons */
  const lessons = [];
  let lSeq = 100;
  const plan = {
    'S-ECO1': { 10: 'scheduled', 11: 'submitted', 12: 'changes_requested', 13: 'draft' },
    'S-ECO2': { 10: 'scheduled', 11: 'draft' },
    'S-ACF1': { 10: 'submitted' },
    'S-MKT1': { 10: 'scheduled', 11: 'submitted' },
    'S-MKT2': { 10: 'draft' },
  };
  const deanOf = { 'P-ECO': 'D1', 'P-ACF': 'D2', 'P-MKT': 'D3' };
  for (const sec of sections) {
    const cur = curriculumOf(sec);
    const extra = plan[sec.id];
    for (let w = 1; w <= CURRENT_WEEK + 4; w++) {
      const status = w <= CURRENT_WEEK ? 'published' : extra[w];
      if (!status) continue;
      const u = unitMap[cur[w - 1]];
      const authorId = sec.instructorIds[0];
      const l = { id: `L-${++lSeq}`, sectionId: sec.id, unitId: u.id, authorId, week: w, title: u.title, summary: u.summary, status, blocks: blocksForUnit(u), history: [], submittedAt: null, reviewedBy: null, reviewNote: null, publishedAt: null };
      l.history.push({ at: iso(at(Math.max(1, w - 3), 1, 10)), by: authorId, action: 'Created draft' });
      if (status !== 'draft') { l.submittedAt = iso(at(Math.max(1, w - 2), 1, 15)); l.history.push({ at: l.submittedAt, by: authorId, action: 'Submitted for approval' }); }
      if (['scheduled', 'published'].includes(status)) { l.reviewedBy = deanOf[sec.programId]; l.history.push({ at: iso(at(Math.max(1, w - 2), 3, 11)), by: l.reviewedBy, action: 'Approved' }); }
      if (status === 'published') { l.publishedAt = iso(at(w, 0, 7)); l.history.push({ at: l.publishedAt, by: 'system', action: 'Published to students' }); }
      if (status === 'changes_requested') {
        l.reviewedBy = deanOf[sec.programId];
        l.reviewNote = 'Add a Vietnamese market example to the speaking task and a practice check on the key words.';
        l.history.push({ at: iso(at(CURRENT_WEEK - 1, 2, 10)), by: l.reviewedBy, action: 'Requested changes', note: l.reviewNote });
      }
      lessons.push(l);
    }
  }

  /* assessments — one set per programme, built from its curriculum */
  const rubric = ['Task achievement & content', 'Organisation & coherence', 'Vocabulary range & accuracy', 'Grammar & mechanics'];
  const assessments = [];
  for (const p of programs) {
    const cur = p.versions[0].unitIds;
    const secIds = sections.filter(x => x.programId === p.id).map(x => x.id);
    const wk = (from, to, n) => cur.slice(from - 1, to).flatMap(u => qOf(u, n));
    const A = (key, type, title, openW, openD, closeW, closeD, questionIds, extra = {}) => assessments.push({
      id: `${p.code}-${key}`, courseId: 'C1', programId: p.id, sectionIds: secIds, type, title, unitId: null, questionIds,
      opensAt: iso(at(openW, openD, 8)), closesAt: iso(at(closeW, closeD, 23, 59)), timeLimitMin: 15, maxAttempts: 1, status: 'scheduled',
      origin: 'instructor', createdBy: sections.find(x => x.programId === p.id).instructorIds[0], ...extra,
    });
    A('Q1', 'quiz', 'Quiz 1, Weeks 1–2', 2, 0, 2, 6, wk(1, 2, 3), { maxAttempts: 2 });
    A('Q2', 'quiz', 'Quiz 2, Weeks 3–4', 4, 0, 4, 6, wk(3, 4, 3), { maxAttempts: 2 });
    A('UT1', 'unit_test', 'Unit Test 1, Weeks 1–6', 6, 0, 6, 6, wk(1, 6, 2), { timeLimitMin: 25 });
    A('CR1', 'workshop', 'Case Report 1', 6, 0, 7, 4, [], { rubric, timeLimitMin: null });
    A('MID', 'midterm', 'Midterm Examination', CURRENT_WEEK, 0, CURRENT_WEEK + 1, 4, wk(1, 8, 2), { timeLimitMin: 30, origin: 'standardized', createdBy: deanOf[p.id] });
    A('Q3', 'quiz', 'Quiz 3, Weeks 9–10', 10, 0, 10, 6, wk(9, 10, 3), { maxAttempts: 2 });
    A('CR2', 'workshop', 'Case Report 2', 11, 0, 12, 4, [], { rubric, timeLimitMin: null });
    A('Q4', 'quiz', 'Quiz 4, Weeks 11–12', 12, 0, 12, 6, wk(11, 12, 3), { maxAttempts: 2 });
    A('FIN', 'final', 'Final Examination', 16, 0, 16, 4, wk(1, 16, 1), { timeLimitMin: 45, origin: 'standardized', createdBy: deanOf[p.id] });
  }

  /* attempts & rubric grades */
  const attempts = [];
  const rubricGrades = [];
  let aSeq = 0;
  const qMap = Object.fromEntries(questions.map(q => [q.id, q]));
  const missed = { SV009: ['Q2', 'UT1'], SV016: ['UT1', 'Q2'] };
  const midDone = ['SV002', 'SV004', 'SV008', 'SV011', 'SV013', 'SV015', 'SV019', 'SV022', 'SV025', 'SV027'];
  const ungradedCR = ['SV006', 'SV012', 'SV020'];
  const weekOf = (d) => Math.floor((new Date(d) - new Date(TERM_START)) / (7 * DAY)) + 1;
  for (const s of students) {
    const p = profile[s.id];
    const sec = sections.find(x => x.id === s.sectionId);
    for (const a of assessments.filter(a => a.sectionIds.includes(sec.id))) {
      const key = a.id.split('-')[1];
      if (a.type === 'workshop') {
        if (weekOf(a.closesAt) < CURRENT_WEEK && !ungradedCR.includes(s.id)) {
          const lvl = () => Math.max(1, Math.min(4, Math.round(1 + p.ab * 3 + (r() - 0.5))));
          rubricGrades.push({ id: `RG-${s.id}-${a.id}`, assessmentId: a.id, studentId: s.id, criteria: a.rubric.map(name => ({ name, level: lvl() })), gradedBy: sec.instructorIds[0], gradedAt: iso(at(weekOf(a.closesAt) + 1, 1, 16)) });
        }
        continue;
      }
      const past = weekOf(a.closesAt) < CURRENT_WEEK;
      if (!past && !(key === 'MID' && midDone.includes(s.id))) continue;
      if ((missed[s.id] || []).includes(key)) continue;
      const answers = {};
      let score = 0, max = 0;
      for (const qid of a.questionIds) {
        const q = qMap[qid];
        const pick = r() < p.ab ? q.answerIndex : (q.answerIndex + 1 + Math.floor(r() * 3)) % 4;
        answers[qid] = pick; max += q.points; if (pick === q.answerIndex) score += q.points;
      }
      const startedAt = key === 'MID' ? at(CURRENT_WEEK, Math.floor(r() * 2), 14 + Math.floor(r() * 4)) : at(weekOf(a.opensAt), 2 + Math.floor(r() * 3), 14 + Math.floor(r() * 5));
      attempts.push({ id: `AT${++aSeq}`, assessmentId: a.id, studentId: s.id, startedAt: iso(startedAt), submittedAt: iso(new Date(startedAt.getTime() + (8 + r() * (a.timeLimitMin - 8)) * 60000)), answers, score, maxScore: max, status: 'graded' });
    }
  }

  /* activity */
  const activity = [];
  let actSeq = 0;
  for (const s of students) {
    const p = profile[s.id];
    for (const l of lessons.filter(l => l.sectionId === s.sectionId && l.status === 'published')) {
      for (const blk of l.blocks) {
        const chance = l.week === CURRENT_WEEK ? p.en * 0.4 : p.en;
        if (r() < chance) activity.push({ id: `ACT${++actSeq}`, studentId: s.id, lessonId: l.id, blockId: blk.id, type: 'complete', minutes: Math.round(blk.minutes * (0.8 + r() * 0.6)), at: iso(at(l.week, Math.floor(r() * 6), 9 + Math.floor(r() * 10))) });
      }
      if (r() < p.en) activity.push({ id: `ACT${++actSeq}`, studentId: s.id, lessonId: null, blockId: null, type: 'flashcard', minutes: 5 + Math.floor(r() * 15), at: iso(at(l.week, 5, 20)) });
    }
  }


  const now = (d, h, m = 0) => iso(at(CURRENT_WEEK, d, h, m));
  const pendingLesson = (secId) => lessons.find(l => l.sectionId === secId && l.status === 'submitted');
  const crLesson = lessons.find(l => l.status === 'changes_requested');
  const notifications = [
    { id: 'N1', userId: 'P1', title: 'Curriculum awaiting approval', body: 'Dean Le Hoang Nam submitted a revised Bachelor of Marketing curriculum for intake K51.', link: '#/provost/curricula/P-MKT', createdAt: now(0, 10), readAt: null },
    ...['S-ECO1', 'S-ACF1', 'S-MKT1'].map((sid, i) => {
      const l = pendingLesson(sid); const sec = sections.find(x => x.id === sid);
      return { id: `NL${i}`, userId: deanOf[sec.programId], title: 'Lesson awaiting approval', body: `${users.find(u => u.id === l.authorId).name} submitted "${l.title}" (${sec.code}, week ${l.week}).`, link: `#/director/approvals/${l.id}`, createdAt: now(0, 15 + i), readAt: null };
    }),
    { id: 'N3', userId: 'I1', title: 'Changes requested', body: `Dr. Arthur Vance: "${crLesson.reviewNote}"`, link: `#/instructor/builder/${crLesson.id}`, createdAt: iso(at(CURRENT_WEEK - 1, 2, 10)), readAt: null },
    { id: 'N4', userId: 'I1', title: 'Case report grading pending', body: '1 student in ECO-K50-01 still needs a rubric grade for Case Report 1.', link: '#/instructor/gradebook', createdAt: now(0, 8), readAt: null },
    { id: 'N6', userId: 'A1', title: 'Roster sync completed', body: `Simulated OneRoster sync reconciled ${students.length} student seats.`, link: '#/admin/integrations', createdAt: now(0, 6), readAt: null },
    ...students.map((s, i) => ({ id: `NS${i}`, userId: s.id, title: 'Midterm Examination is open', body: 'The midterm closes on Friday of week 10. You have one attempt of 30 minutes.', link: `#/student/exam/${programs.find(p => p.id === sections.find(x => x.id === s.sectionId).programId).code}-MID`, createdAt: now(0, 8), readAt: midDone.includes(s.id) ? now(1, 9) : null })),
  ];

  const auditLog = [
    { id: 'E0', actorId: 'D3', action: 'CURRICULUM_SUBMITTED', summary: 'Submitted Bachelor of Marketing curriculum (intake K51) for approval', entityType: 'program', entityId: 'P-MKT', at: iso(at(CURRENT_WEEK - 1, 3, 15)) },
    { id: 'E3', actorId: 'D1', action: 'LESSON_CHANGES_REQUESTED', summary: `Requested changes on "${crLesson.title}"`, entityType: 'lesson', entityId: crLesson.id, at: iso(at(CURRENT_WEEK - 1, 2, 10)) },
    { id: 'E4', actorId: 'system', action: 'WEEK_ADVANCED', summary: `Week ${CURRENT_WEEK} started, ${sections.length} lessons published, Midterm Examination opened`, entityType: 'term', entityId: 'T1', at: now(0, 7) },
    ...['S-ECO1', 'S-ACF1', 'S-MKT1'].map((sid, i) => { const l = pendingLesson(sid); return { id: `E1${i}`, actorId: l.authorId, action: 'LESSON_SUBMITTED', summary: `Submitted "${l.title}" for approval`, entityType: 'lesson', entityId: l.id, at: now(0, 15 + i) }; }),
  ];

  const st = {
    version: 15,
    clock: { week: CURRENT_WEEK, setAt: Date.now() },
    session: { userId: null },
    ui: { theme: 'light', orgFilter: null },
    term: { id: 'T1', title: 'AY 2026–27, Term 1', startDate: TERM_START, weeks: TERM_WEEKS },
    course: {
      id: 'C1', code: 'ECON-FDN', title: 'English for Economics & Business, Level 1 (B1)',
      gradingScheme: { categories: [
        { key: 'quiz', label: 'Quizzes', weight: 0.15 }, { key: 'unit_test', label: 'Unit tests', weight: 0.15 },
        { key: 'workshop', label: 'Case reports', weight: 0.2 }, { key: 'midterm', label: 'Midterm', weight: 0.2 },
        { key: 'final', label: 'Final', weight: 0.3 } ], passMark: 5, scale: 10 },
    },
    subjects: SUBJECTS,
    framework: { id: 'FW1', title: 'UEH English for Economics & Business, Level 1', capacity: 16, unitIds: FRAMEWORK, requiredUnitIds: REQUIRED, minPerCoreSubject: 2, coreSubjects: ['ECO', 'ACC', 'FIN', 'MGT'] },
    staffing: { hoursPerUnit: 3, maxHours: 48 },
    license: { seats: 2000, product: 'UEH Learning — campus licence', expiresAt: '2027-08-31T00:00:00' },
    orgUnits, programs, users, sections, units, lessons, assessments, questions, attempts, rubricGrades, activity,
    notifications, auditLog, liveSessions: [], flags: { atRisk: [] },
    vocabulary: VOCAB.map(([term, vi, def, unitId, pos, family, example, collocations], i) => ({ id: `V${i + 1}`, term, vi, def, unitId, pos, family, example, collocations })),
    grammar: GRAMMAR.map(([id, unitId, name, vi, form, use, useVi, examples, watchOut]) => ({ id, unitId, name, vi, form, use, useVi, examples, watchOut })),
  };
  addLibrarySeed(st, { blocksForUnit, at, iso, CURRENT_WEEK });
  st.__profiles = profile;
  addWorkbookSeed(st, { rng, iso, at, CURRENT_WEEK });
  delete st.__profiles;
  return st;
}

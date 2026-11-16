// Business English, Level 1 (CEFR B1) sample pack: one unit per core subject (E1, A1, F1, M1),
// each with all four skills — Reading, Listening, Speaking, Writing — set in Vietnamese business situations.
// Reading and listening are auto-checked; speaking (recorded in the browser) and writing are marked by the lecturer.
import { M, W } from './helpers.js';

const tag = (skill, list) => list.map(e => ({ ...e, pack: 'BE-B1', level: 'B1', skill }));
const READ = (id, title, text, qs) => tag('R', qs.map(e => ({ ...e, scenario: { id, title, text } })));
const LISTEN = (id, title, audio, qs) => tag('L', qs.map(e => ({ ...e, scenario: { id, title, audio } })));
const SPEAK = (unitId, title, prompt, model, marking) => tag('S', [{ ...W(unitId, title, prompt, model, marking, 90), speak: true, seconds: 60 }]);
const WRITE = (unitId, title, prompt, model, marking, words = 100) => tag('W', [W(unitId, title, prompt, model, marking, words)]);

const SPEAK_GUIDE = (content) => [content, 'Language: uses unit vocabulary and simple linking words (because, so, however)', 'Delivery: speaks clearly at a steady pace, with understandable pronunciation'];
const WRITE_GUIDE = (content) => [content, 'Organisation: greeting, clear purpose, closing — in short paragraphs', 'Language: B1 grammar and unit vocabulary used accurately; polite business tone'];

export const EXTRA = [
  /* ---------------- E1, Scarcity and choice ---------------- */
  ...READ('BE-E1-r', 'Reading, A difficult choice at Hoa Sen Bakery',
    'Hoa Sen Bakery in District 3 has a budget of 200 million VND this year. The owner, Ms Lan, wants two things: a new oven that can bake 40% more bread, and a delivery app partnership that could bring in office customers. She cannot afford both. The oven helps the bakery sell more at the shop, but the shop is already busy only in the morning. The delivery app reaches new customers all day, but the app takes 25% of every order. Ms Lan says, "Every choice has a cost. If I choose the app, the cost is the bigger oven I don\'t buy."', [
      M('E1', 'Main idea', 'What is the main problem for Ms Lan?', ['She has no customers in the morning', 'She has limited money and must choose one option', 'The delivery app refused to work with her', 'The new oven is too big for the shop'], 1, 'The text says she "cannot afford both" — a choice caused by a limited budget (scarcity).'),
      M('E1', 'Vocabulary in context', 'In the last sentence, "the cost is the bigger oven I don\'t buy" describes…', ['A sunk cost', 'A fixed cost', 'An opportunity cost', 'A delivery fee'], 2, 'The value of the next best alternative given up is the opportunity cost.'),
    ]),
  ...LISTEN('BE-E1-l', 'Listening, Team meeting at a garment factory',
    'Okay, everyone, thanks for coming. As you know, we have orders for thirty thousand shirts this month, but our workers can only finish about twenty-five thousand. We have two options. First, we pay overtime on Saturdays. That costs around eighty million dong. Second, we turn down the smaller order from the Japanese buyer. Personally, I prefer overtime, because the Japanese buyer may give us bigger orders next year. Please send me your opinion by Friday.', [
      M('E1', 'Listening for numbers', 'How many shirts can the workers finish this month?', ['About 20,000', 'About 25,000', 'About 30,000', 'About 80,000'], 1, 'The speaker says the orders are 30,000 but workers "can only finish about twenty-five thousand".'),
      M('E1', 'Listening for opinion', 'Why does the speaker prefer overtime?', ['It is cheaper than hiring new workers', 'Workers asked for Saturday shifts', 'The Japanese buyer may give bigger orders next year', 'The small order is not profitable'], 2, 'The reason given is the possibility of bigger orders from the Japanese buyer in the future.'),
    ]),
  ...SPEAK('E1', 'Speaking, Explain a choice',
    'Talk for about 1 minute. Describe a choice you made recently with limited money or time (for example: a course, a phone, a part-time job). Say what you chose, what you gave up (the opportunity cost), and whether you would choose the same again.',
    'Last semester I had to choose between a part-time job at a café and an English course. Both were in the evening, so I could not do both. I chose the English course because I want to work for an international company. The opportunity cost was the money from the job — about two million dong a month. However, my speaking is better now, so I think it was the right choice and I would choose the same again.',
    SPEAK_GUIDE('Content: states the choice, what was given up (opportunity cost) and a reason')),
  ...WRITE('E1', 'Writing, Email recommending one option',
    'You work for Ms Lan at Hoa Sen Bakery (see the reading). Write an email of about 100 words recommending the oven OR the delivery app. Give two reasons and mention the opportunity cost of your choice.',
    'Dear Ms Lan,\nI recommend the delivery app partnership. Firstly, our shop is only busy in the morning, so a bigger oven would not be used all day. Secondly, the app brings office customers in the afternoon, when we have spare capacity. The app takes 25% of each order, but the extra sales should still increase our profit. The opportunity cost is the new oven, so we should plan to buy it next year if sales grow.\nBest regards,\nMinh',
    WRITE_GUIDE('Content: one clear recommendation, two reasons from the text, names the opportunity cost')),

  /* ---------------- A1, Accounting basics ---------------- */
  ...READ('BE-A1-r', 'Reading, Starting a small business',
    'In March, Tuan started a phone-repair shop near Ben Thanh market. He put 150 million VND of his own savings into the business and borrowed 50 million VND from a bank. He used 120 million VND to buy tools and furniture, and kept the rest in the business bank account. His accountant explained the accounting equation: everything the business owns (its assets) must equal what it owes to others (liabilities) plus what the owner has put in (equity). "Keep your personal money and the shop\'s money separate," she told him. "That is the business entity concept."', [
      M('A1', 'Detail', 'How much money does the business keep in its bank account after buying tools and furniture?', ['50 million VND', '80 million VND', '120 million VND', '200 million VND'], 1, 'Total funds 150 + 50 = 200m; 200 − 120 = 80m VND stays in the bank.'),
      M('A1', 'Concept', 'The accountant\'s advice to keep personal and shop money separate refers to…', ['The going-concern concept', 'The business entity concept', 'The prudence concept', 'The matching concept'], 1, 'The text names it directly: the business entity concept.'),
    ]),
  ...LISTEN('BE-A1-l', 'Listening, Phone call with the accountant',
    'Hello, Mr Tuan? It\'s Hanh from the accounting office. I\'m calling about your receipts for April. I have the invoice for the new screen parts, eighteen million dong, but I can\'t find the receipt for the shop rent. Could you send me a photo of it by Wednesday? Also, please remember that the coffee you buy for yourself is a personal expense, so I won\'t include it in the shop\'s accounts. Thanks, bye.', [
      M('A1', 'Purpose of the call', 'Why is Hanh calling?', ['To ask for a missing rent receipt', 'To sell new screen parts', 'To ask for a loan payment', 'To invite Tuan to a meeting'], 0, 'She cannot find the receipt for the shop rent and asks for a photo.'),
      M('A1', 'Listening for detail', 'Why will the coffee not be included in the shop\'s accounts?', ['It was paid in cash', 'It is a personal expense', 'The receipt was lost', 'It costs less than 18 million dong'], 1, 'Personal spending stays out of the business accounts — the business entity concept again.'),
    ]),
  ...SPEAK('A1', 'Speaking, Describe a business\'s assets',
    'Talk for about 1 minute. Choose a small business you know (a café, a shop, a stall). Describe three of its assets, one liability, and where the owner\'s money (equity) came from.',
    'I will talk about my aunt\'s noodle stall. Its assets are a cooking cart, the pots and bowls, and about five million dong in cash for change. It has one liability: she borrowed ten million dong from her friend to buy the cart, and she pays it back every month. The equity came from her own savings, about fifteen million dong. So the assets equal the loan plus her own money.',
    SPEAK_GUIDE('Content: names three assets, one liability and the source of equity correctly')),
  ...WRITE('A1', 'Writing, Reply to the accountant',
    'Write a reply of about 100 words to Hanh (see the listening). Apologise for the missing receipt, say when you will send it, and ask one question about which expenses can go in the shop\'s accounts.',
    'Dear Hanh,\nThank you for your call, and I am sorry about the missing rent receipt. I found it in my desk and I will send you a photo this afternoon. I understand that my coffee is a personal expense. I have one question: I sometimes use my own motorbike to collect parts from suppliers. Can the petrol for these trips go in the shop\'s accounts? I can keep the receipts if that helps.\nKind regards,\nTuan',
    WRITE_GUIDE('Content: apology, a clear time for sending the receipt, one relevant question about business expenses')),

  /* ---------------- F1, Time value of money ---------------- */
  ...READ('BE-F1-r', 'Reading, Saving for a first car',
    'Linh is 24 and works as a junior accountant in Thu Duc. She wants to buy a small car in three years. Her bank offers a savings account with 7% interest per year, compounded once a year. If she deposits 300 million VND today, she will have about 367.5 million VND in three years. Her friend suggests keeping the money in cash at home "because it is safer". Linh disagrees: prices usually rise every year, so cash at home slowly loses value. "Money today is worth more than the same money in the future," she explains, "because today it can earn interest."', [
      M('F1', 'Detail', 'How often does Linh\'s savings account add interest?', ['Every month', 'Every three months', 'Once a year', 'Only at the end of three years'], 2, '"Compounded once a year."'),
      M('F1', 'Main idea', 'Which sentence best summarises Linh\'s view?', ['Cash at home is the safest choice', 'Money today is worth more because it can earn interest', 'Cars become cheaper every year', 'Banks always pay more than 7% interest'], 1, 'This is the time value of money, stated in her last sentence.'),
    ]),
  ...LISTEN('BE-F1-l', 'Listening, Bank advertisement',
    'Looking for a safe place for your savings? With Sao Viet Bank\'s twelve-month term deposit, you earn six point five percent per year. Open your account online in five minutes. Deposit at least ten million dong, and if you open your account before the thirtieth of June, we add a bonus of zero point three percent. Please note: if you withdraw your money before twelve months, you will receive only the standard rate of one percent.', [
      M('F1', 'Listening for numbers', 'What is the total interest rate for a customer who opens an account before 30 June and keeps it for 12 months?', ['6.5%', '6.8%', '7.0%', '1.0%'], 1, '6.5% + 0.3% bonus = 6.8%.'),
      M('F1', 'Listening for conditions', 'What happens if a customer withdraws the money after six months?', ['They lose all the money', 'They pay a fee of 10 million dong', 'They receive only 1% interest', 'They still receive 6.5%'], 2, 'Early withdrawal earns "only the standard rate of one percent".'),
    ]),
  ...SPEAK('F1', 'Speaking, Give financial advice',
    'Talk for about 1 minute. A younger cousin has just received 20 million VND as a Tet gift. Advise them what to do with it. Use the words "interest", "save" and "in the future", and give one reason.',
    'If I were you, I would not keep all the money at home. I would save about fifteen million in a twelve-month term deposit, because the bank pays interest — around six or seven percent a year. That means you will have more money in the future, and it is safer than cash. You can keep five million for things you need now, like books or a course. Just remember: if you take the money out early, you get less interest.',
    SPEAK_GUIDE('Content: clear advice, uses interest / save / in the future correctly, gives a reason')),
  ...WRITE('F1', 'Writing, Compare two savings offers',
    'Write about 100 words comparing two options for Linh: (A) Linh\'s bank — 7% per year, money can be taken out at any time; (B) Sao Viet Bank — 6.8% for 12 months, only 1% if taken out early. Recommend one option and explain why.',
    'Linh has two options for her savings. Option A pays 7% per year and she can take her money out at any time. Option B pays 6.8% for twelve months, but only 1% if she withdraws early. Option A is better in both ways: it pays a higher rate and it is more flexible. Because Linh plans to buy a car in three years, she may need the money suddenly, so flexibility is important. I recommend Option A.',
    WRITE_GUIDE('Content: compares rate and flexibility of both options, makes a justified recommendation')),

  /* ---------------- M1, Management and organisation ---------------- */
  ...READ('BE-M1-r', 'Reading, A new manager at Mekong Fresh',
    'Mekong Fresh sells fruit to supermarkets. Last year it grew from 15 to 60 employees, and problems started: two people sometimes did the same job, and nobody checked if deliveries arrived on time. In January, the company hired Mr Khoa as operations manager. First, he set a clear goal: 98% of deliveries on time. Next, he organised the staff into three teams — buying, packing and delivery — each with a team leader. Every Monday he meets the leaders to motivate them and discuss problems, and every Friday he compares the delivery results with the goal.', [
      M('M1', 'Cause', 'Why did problems start at Mekong Fresh?', ['The company lost many customers', 'The company grew quickly without clear roles', 'Fruit prices fell', 'The team leaders left the company'], 1, 'Growth from 15 to 60 staff led to duplicated jobs and no checks — no clear roles.'),
      M('M1', 'Management functions', 'Comparing delivery results with the goal every Friday is an example of…', ['Planning', 'Organising', 'Leading', 'Controlling'], 3, 'Measuring results against a target and correcting problems is controlling.'),
    ]),
  ...LISTEN('BE-M1-l', 'Listening, Introducing the new structure',
    'Good morning, team. From next Monday, we are changing our structure. Instead of everyone reporting to me, you will work in three teams: buying, packing and delivery. Chi will lead buying, Phong will lead packing, and Mai will lead delivery. If you have a problem, talk to your team leader first. Team leaders, I\'ll meet you every Monday at eight. Our goal for this quarter is simple: ninety-eight percent of deliveries on time.', [
      M('M1', 'Listening for detail', 'Who will lead the packing team?', ['Chi', 'Phong', 'Mai', 'Mr Khoa'], 1, '"Phong will lead packing."'),
      M('M1', 'Listening for instructions', 'What should employees do first if they have a problem?', ['Email the operations manager', 'Wait for the Monday meeting', 'Talk to their team leader', 'Write a report'], 2, '"If you have a problem, talk to your team leader first."'),
    ]),
  ...SPEAK('M1', 'Speaking, Present your team',
    'Talk for about 1 minute. Imagine you are a new team leader at Mekong Fresh. Introduce yourself to your team: your role, one goal for the next month, and how you will check progress.',
    'Hello everyone, my name is Mai and I am the new leader of the delivery team. My job is to make sure every order reaches the supermarkets on time. Our goal for next month is ninety-eight percent of deliveries on time — at the moment we are at about ninety. To check progress, I will look at the delivery report every Friday and share the results with you. If there is a problem with a route or a truck, please tell me immediately.',
    SPEAK_GUIDE('Content: introduces the role, one measurable goal and a way to check progress (controlling)')),
  ...WRITE('M1', 'Writing, Memo to staff',
    'Write a short memo (about 100 words) from Mr Khoa to all staff announcing the new three-team structure. Include the date it starts, the team leaders, and what staff should do if they have a problem.',
    'To: All staff\nFrom: Khoa, Operations Manager\nDate: 5 January\nSubject: New team structure\nFrom Monday 12 January we will work in three teams. Chi will lead buying, Phong will lead packing and Mai will lead delivery. Each team leader will meet me every Monday to plan the week. If you have a problem, please speak to your team leader first. Our goal is 98% of deliveries on time. Thank you for your support.',
    WRITE_GUIDE('Content: start date, the three teams and leaders, and the problem-reporting rule')),
];
export const LIB = [];

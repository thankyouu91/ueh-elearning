// ESP (English for Specific Purposes, CEFR B1), Finance context: units F1–F5.
// The finance topic is only the setting; every item tests English (reading, listening, speaking, writing, vocabulary & grammar).
// No answer needs a calculation or theory: it is in the text/audio or it is a language point.
import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';

export const EXTRA = [
  /* ---------------- F1, Time value of money — language focus: first conditional ---------------- */
  // F1 has 11 items here; be-b1.js supplies the other 6 (including speaking and writing).
  ...USE([
    C('F1', 'Vocabulary, Saving or borrowing?', "Sort the phrases: do they describe saving money or borrowing money?",
      ['Saving', 'Borrowing'],
      [['open a savings account', 0], ['earn interest', 0], ['make a deposit', 0], ['take out a loan', 1], ['pay interest to the bank', 1], ['repay in monthly instalments', 1], ['be in debt', 1]],
      "Savers 'open an account', 'make a deposit' and 'earn' interest. Borrowers 'take out a loan', 'repay' it, 'pay' interest and are 'in debt'."),
    M('F1', 'Vocabulary, Word in context', "Choose the best word: 'Hoa Mai Bank pays 6% ___ a year on a twelve-month deposit.'",
      ['inflation', 'instalment', 'interest', 'income'], 2,
      "'Interest' is the money a bank pays you for keeping your deposit there. We say 'pay 6% interest'."),
    M('F1', 'Vocabulary, Collocation', "Choose the correct verb: 'Mr Tam wants to ___ a loan of 200 million VND to open a second cafe.'",
      ['take out', 'earn', 'do', 'win'], 0,
      "The collocation is 'take out a loan' (= borrow money from a bank). We do not 'do' or 'win' a loan."),
    M('F1', 'Language focus, First conditional (1)', "Choose the correct form: 'If you ___ your money in the bank for five years, it will grow.'",
      ['will keep', 'kept', 'keeping', 'keep'], 3,
      "First conditional: if + present simple, will + verb. We do not use 'will' in the if-clause."),
    M('F1', 'Language focus, First conditional (2)', "Choose the correct form: 'If prices rise next year, the cash in your drawer ___ less than today.'",
      ['buy', 'will buy', 'bought', 'buying'], 1,
      "The result clause of a first conditional uses will + verb: 'If prices rise, your cash will buy less.'"),
    O('F1', 'Language focus, Sequencing a process', "Put the sentences in order to describe how a term deposit works.",
      ['First, compare the interest rates at two or three banks and choose one.',
        'Next, fill in the application form online or at a branch.',
        'Then, make your first deposit of at least one million VND.',
        'After that, the bank adds interest to your account every month.',
        'Finally, when the term ends, you can withdraw your money or start a new term.'],
      "Sequencing words show the order: First, Next, Then, After that, Finally. You must open the account before you can make a deposit or earn interest."),
    M('F1', 'Describing data, Deposit rates', "Interest rate on twelve-month deposits at Hoa Mai Bank: January 5.0%, April 5.0%, July 5.5%, October 6.5%. Which sentence correctly describes the data?",
      ['The rate fell steadily during the year.', 'The rate remained stable from January to April and then rose.', 'The rate rose sharply between January and April.', 'The rate reached its lowest point in October.'], 1,
      "'Remained stable' = no change (5.0% and 5.0%). After April the numbers go up, so the rate 'rose'."),
  ]),
  ...READ('F1-r1', 'Reading, Small savings, big difference',
    "Minh is a second-year student in Da Nang. He works at a bookshop every weekend and earns about three million VND a month. Last year he spent everything he earned. This year he has a new plan. On the first day of each month, he puts one million VND into a savings account at his bank. The account pays interest every month, and the interest is added to his balance. The next month, he earns interest on the bigger balance. Bankers call this compound interest.\n\nMinh's roommate, Quan, thinks saving is pointless. 'One million is nothing,' he says. 'Wait until you have a real salary.' Minh does not agree. 'The amount is small, but time is on my side,' he answers. 'If I start now, my money will have more years to grow. If I wait until I am thirty, I will lose all those years.' He also says the habit is important: the money leaves his account automatically, so he does not miss it.", [
      M('F1', 'Main idea', "What is the main message of the article?",
        ['Students should not work at weekends', 'Banks pay students more interest than other customers', 'It is better to wait for a real salary before saving', 'Starting to save early is useful, even with small amounts'], 3,
        "Minh says: 'The amount is small, but time is on my side… If I start now, my money will have more years to grow.'"),
      M('F1', 'Vocabulary in context', "In the first paragraph, 'balance' means…",
        ['the total amount of money in the account', 'the money Minh earns at the bookshop', 'a fee that the bank charges each month', 'a plan for spending money'], 0,
        "'The interest is added to his balance' — the balance is the money that is in the account at that moment."),
    ]),
  ...LISTEN('F1-l1', 'Listening, A phone call about a loan',
    "Bank officer: Good morning, Song Xanh Bank, Hanh speaking. Customer: Hello, my name is Tuan. I run a small coffee shop in Bien Hoa, and I'd like to ask about a loan for a new coffee machine. Bank officer: Of course. How much would you like to borrow? Customer: About eighty million dong. Bank officer: For that amount, our interest rate is nine percent a year, and you can repay over twelve or twenty-four months. Customer: I see. Which is better? Bank officer: With twelve months, each monthly payment is higher, but you pay less interest in total. Customer: Then I prefer twelve months. What do I need to bring? Bank officer: Your ID card and your business licence. Can you come to our branch on Thursday morning? Customer: Yes, I'll come at nine.", [
      M('F1', 'Listening for gist', "Why is Tuan calling the bank?",
        ['To open a savings account', 'To complain about a monthly payment', 'To ask about borrowing money for equipment', 'To sell a coffee machine'], 2,
        "He says: 'I'd like to ask about a loan for a new coffee machine.'"),
      M('F1', 'Listening for the next action', "What will Tuan do on Thursday morning?",
        ['Call the bank again', 'Visit the branch with his ID card and business licence', 'Send his documents by email', 'Make his first monthly payment'], 1,
        "The officer asks him to bring his ID card and business licence and come to the branch; he answers 'Yes, I'll come at nine.'"),
    ]),

  /* ---------------- F2, Financial ratio analysis — language focus: comparatives and superlatives ---------------- */
  ...USE([
    C('F2', 'Vocabulary, Owns, owes or earns?', "Sort the words into three groups.",
      ['Things a company owns (assets)', 'Money a company owes (liabilities)', 'Results for the year'],
      [['cash in the bank', 0], ['machinery', 0], ['inventory', 0], ['a bank loan', 1], ['unpaid supplier invoices', 1], ['revenue', 2], ['net profit', 2]],
      "'Own' = have (assets); 'owe' = must pay back (liabilities, debt). Revenue and profit describe the company's performance during the year."),
    M('F2', 'Vocabulary, Word formation', "Choose the correct form: 'The cafe chain is very ___: it keeps 20 VND from every 100 VND of sales.'",
      ['profit', 'profitable', 'profitably', 'profited'], 1,
      "After 'is very' we need an adjective: profit (noun) → profitable (adjective)."),
    M('F2', 'Vocabulary, Collocation', "Choose the correct verb: 'Tan Phu Foods ___ a profit of 2 billion VND last year.'",
      ['did', 'gave', 'put', 'made'], 3,
      "The collocation is 'make a profit' (and 'make a loss'). We do not say 'do a profit'."),
    M('F2', 'Language focus, Comparatives', "Company A's profit margin is 12%. Company B's is 8%. Choose the correct sentence ending: 'Company A is ___ Company B.'",
      ['more profitable than', 'profitabler than', 'the most profitable', 'as profitable as'], 0,
      "Long adjectives form the comparative with 'more … than'. With only two companies we use the comparative, not the superlative."),
    M('F2', 'Language focus, Superlatives', "Choose the correct form: 'Of the three firms, Mekong Retail has ___ debt.'",
      ['the lower', 'more low', 'the lowest', 'lowest than'], 2,
      "When we compare three or more things we use the superlative: the + adjective + -est → 'the lowest'."),
    M('F2', 'Language focus, as … as', "Choose the correct form: 'Sales this quarter were not ___ we expected.'",
      ['higher as', 'as high than', 'so higher than', 'as high as'], 3,
      "The structure is 'not as + adjective + as'. 'Than' is used only after a comparative (higher than)."),
    O('F2', 'Language focus, Order the email', "Put the sentences of this email in the correct order.",
      ['Dear Mr Khoa, thank you for sending the financial statements of Sao Mai Garment.',
        "I have compared this year's figures with last year's.",
        'First, the profit margin improved from 6% to 9%.',
        'However, debt is higher than last year because of the loan for the new factory.',
        'Overall, I think the company is in good financial health.',
        'Please call me if you would like to discuss the details. Best regards, Nhi'],
      "An email goes from greeting and thanks, to purpose, to details ('First…', then the contrast 'However…'), to a conclusion ('Overall…') and a polite closing."),
    M('F2', 'Describing data, Profit margin', "Net profit margin of Sao Mai Garment: 2022 6%, 2023 6%, 2024 9%, 2025 5%. Which sentence correctly describes the data?",
      ['The margin rose steadily every year.', 'The margin peaked in 2023.', 'The margin remained stable in 2023, rose in 2024 and then fell sharply in 2025.', 'The margin fell slightly in 2024.'], 2,
      "6% → 6% is 'remained stable', 6% → 9% is 'rose', and 9% → 5% is a big drop, so 'fell sharply'. The peak (highest point) is 2024."),
  ]),
  ...READ('F2-r1', 'Reading, Two coffee chains ask for a loan',
    "To: Lending Committee, Song Xanh Bank\nFrom: Tran Gia Huy, Credit Analyst\nSubject: Loan requests from two coffee chains\n\nTwo coffee chains in Ho Chi Minh City have each asked us for a loan of 5 billion VND. I have studied their financial statements for last year.\n\nSaigon Sunrise is the larger company, with 40 shops and higher revenue. However, its profit margin is only 4%, and it already has large bank loans. Its current ratio is 0.8. This means its short-term debts are bigger than its cash and other short-term assets, so it may have trouble paying its bills on time.\n\nMoc Cafe has only 12 shops, but its figures are healthier. Its profit margin is 11%, it has almost no debt, and its current ratio is 1.6. The owners have also put most of last year's profit back into the business.\n\nIn my view, Moc Cafe is the safer customer. Saigon Sunrise is growing fast, but it depends too much on borrowed money. I recommend that we approve the loan to Moc Cafe and ask Saigon Sunrise for a new business plan before we decide.", [
      M('F2', 'Writer\'s purpose', "Why did Huy write this report?",
        ['To advertise two coffee chains to customers', 'To recommend what the bank should do about two loan requests', 'To explain how to open a coffee shop', 'To ask the two chains to open more shops'], 1,
        "The last paragraph gives his recommendation: 'I recommend that we approve the loan to Moc Cafe and ask Saigon Sunrise for a new business plan.'"),
      M('F2', 'Specific detail', "Which statement about Saigon Sunrise is true?",
        ['It has fewer shops than Moc Cafe', 'It has almost no debt', 'Its current ratio is 1.6', 'It has higher revenue but a lower profit margin than Moc Cafe'], 3,
        "'Saigon Sunrise is the larger company, with 40 shops and higher revenue. However, its profit margin is only 4%' (Moc Cafe: 11%)."),
      M('F2', 'Vocabulary in context', "In the last paragraph, 'it depends too much on borrowed money' means the company…",
        ['uses a lot of loans to run its business', 'lends a lot of money to other firms', 'keeps too much cash in the bank', 'pays its staff too much'], 0,
        "'Borrowed money' = loans. The text says Saigon Sunrise 'already has large bank loans'."),
      M('F2', 'Inference', "What can we infer about Saigon Sunrise's loan request?",
        ['The bank has already approved it', 'The company has cancelled it', 'A final decision has not been made yet', 'The bank will never lend to this company'], 2,
        "Huy wants to 'ask Saigon Sunrise for a new business plan before we decide', so the decision is still open."),
    ]),
  ...LISTEN('F2-l1', 'Listening, Quarterly results meeting',
    "OK everyone, let's look at last quarter's results for our three shops. First, the good news. The Nguyen Hue shop had the highest sales, one point two billion dong, and its profit margin went up from ten to thirteen percent. The Thao Dien shop was stable, almost the same as the quarter before. Now the bad news. The Go Vap shop is our weakest. Sales fell by fifteen percent, and costs are still too high, especially the rent. So, what do we do? I don't want to close Go Vap yet. I think the location is good, but the menu is wrong for students. Mai, could you prepare a cheaper menu and show it to us next Monday?", [
      M('F2', 'Listening for gist', "What is the speaker mainly doing?",
        ['Comparing the results of three shops', 'Announcing the opening of a new shop', 'Training new staff', 'Explaining a rent contract'], 0,
        "She begins: 'let's look at last quarter's results for our three shops' and then describes each one."),
      M('F2', 'Listening for specific information', "Which shop had the highest sales?",
        ['Go Vap', 'Thao Dien', 'Nguyen Hue', 'All three were the same'], 2,
        "'The Nguyen Hue shop had the highest sales, one point two billion dong.'"),
      M('F2', 'Speaker\'s opinion', "What does the speaker think about the Go Vap shop?",
        ['It should close immediately', 'It can improve if the menu changes', 'Its location is the problem', 'Its rent is too low'], 1,
        "'I don't want to close Go Vap yet. I think the location is good, but the menu is wrong for students.'"),
    ]),
  ...SPEAK('F2', 'Speaking, Compare two companies',
    "Talk for about 1 minute. Compare two coffee chains and say which one a bank should lend money to. Use this information — Saigon Sunrise: 40 shops, profit margin 4%, large bank loans. Moc Cafe: 12 shops, profit margin 11%, almost no debt. Cover: (1) size, (2) profit margin and debt, (3) your choice and one reason. Use comparatives (bigger, more profitable, safer).",
    "Saigon Sunrise is bigger than Moc Cafe. It has forty shops, so its sales are higher. However, Moc Cafe is more profitable: its profit margin is eleven percent, and Saigon Sunrise's is only four percent. Moc Cafe also has almost no debt, so it is safer. Saigon Sunrise has large bank loans, which is a risk if sales fall. In my opinion, the bank should lend money to Moc Cafe, because it is the smaller company but the healthier one.",
    "Content: compares size, profit margin and debt with correct comparatives, and gives a clear choice with a reason"),
  ...WRITE('F2', 'Writing, Email: summary of results',
    "You work in the accounts office of Binh An Furniture in Binh Duong. Write an email of about 100 words to the owner, Mr Phat, to summarise this year's results. Include: (1) sales rose from 8 billion to 10 billion VND, (2) the profit margin fell from 12% to 9% because wood prices increased, (3) one suggestion for next year.",
    "Subject: Summary of this year's results\n\nDear Mr Phat,\n\nHere is a short summary of our results this year.\n\nFirst, the good news. Sales rose from 8 billion to 10 billion VND, mainly because of new orders from hotels. This is our highest revenue so far.\n\nHowever, our profit margin fell from 12% to 9%. The main reason is that wood prices increased, so our costs were higher than last year.\n\nTo improve the margin next year, I suggest that we compare prices from two other wood suppliers before we sign a new contract.\n\nPlease let me know if you would like more details.\n\nBest regards,\nNhi",
    "Content: reports the rise in sales and the fall in profit margin with the reason, and makes one clear suggestion"),

  /* ---------------- F3, Budgeting & working capital — language focus: will / going to / time clauses ---------------- */
  ...USE([
    C('F3', 'Vocabulary, Cash in or cash out?', "Sort the items: is cash coming into the business or going out?",
      ['Cash coming in', 'Cash going out'],
      [['payments from customers', 0], ['cash sales in the shop', 0], ['a bank loan received', 0], ['rent', 1], ['staff wages', 1], ['payments to suppliers', 1], ['the electricity bill', 1]],
      "Customers pay us (cash in). We pay suppliers, staff, the landlord and bills (cash out). A cash budget lists both."),
    M('F3', 'Vocabulary, Word in context', "Choose the best word: 'The invoice was due on 1 March. It is now 20 March and the customer has not paid, so the payment is ___.'",
      ['in advance', 'on time', 'overdue', 'overpaid'], 2,
      "'Overdue' = not paid by the due date. 'In advance' means before the date; 'on time' means by the date."),
    M('F3', 'Vocabulary, Collocation', "Choose the correct verb: 'Every November, the finance manager has to ___ a cash budget for the next six months.'",
      ['prepare', 'earn', 'borrow', 'owe'], 0,
      "We 'prepare' (or 'draw up') a budget. 'Earn', 'borrow' and 'owe' are used with money, not with a plan."),
    M('F3', 'Language focus, will for forecasts', "Choose the correct form: 'Sales are always high before Tet, so I think we ___ a cash surplus in January.'",
      ['had', 'have had', 'having', 'will have'], 3,
      "After 'I think' we use will + verb to make a forecast about the future."),
    M('F3', 'Language focus, going to for plans', "Choose the correct form: 'We have already decided: we ___ our supplier for 60-day payment terms.'",
      ['will asking', 'are going to ask', 'going to ask', 'asks'], 1,
      "For a plan that is already decided we use be + going to + verb: 'we are going to ask'."),
    M('F3', 'Language focus, Time clauses', "Choose the correct form: 'As soon as the customer ___ the invoice, we will order more inventory.'",
      ['will pay', 'paid', 'pays', 'is going to pay'], 2,
      "After time words such as 'as soon as' and 'when', we use the present simple for the future, not 'will'."),
    O('F3', 'Language focus, Describe a process', "Put the sentences in order to describe how the company collects payment.",
      ['First, we deliver the goods to the customer.',
        'Then, we send an invoice with 30-day payment terms.',
        'If the payment has not arrived after 30 days, we send a polite reminder by email.',
        'If there is still no payment a week after the reminder, we phone the customer.',
        'Finally, we stop new deliveries until the overdue invoice is paid.'],
      "Follow the sequencing words (First, Then, Finally) and the time references: the reminder comes 'after 30 days', the phone call 'a week after the reminder'."),
    M('F3', 'Describing data, Cash balance', "Closing cash balance of Hoa Binh Stationery (million VND): October 120, November 115, December 40, January 150. Which sentence correctly describes the data?",
      ['Cash fell slightly in November, dropped sharply in December and recovered in January.', 'Cash rose steadily from October to January.', 'Cash remained stable for the whole period.', 'Cash reached its highest level in December.'], 0,
      "120 → 115 is a small change ('fell slightly'); 115 → 40 is a big one ('dropped sharply'); 'recovered' means it went up again."),
  ]),
  ...READ('F3-r1', 'Reading, Email: our cash plan for Tet',
    "Subject: Cash plan for the Tet season\n\nDear shop managers,\n\nTet is only ten weeks away, and I am writing to explain our cash plan. As you know, December is our most difficult month. We have to buy a lot of inventory for Tet gift baskets, but most customers do not pay us until January. Last year we had a cash shortage in December and paid two suppliers late. I do not want this to happen again.\n\nThis year we are going to do three things. First, we will order inventory in two smaller deliveries, one in early December and one in early January, instead of one large order. Second, company customers who order more than 50 baskets must pay a 30% deposit when they order. Third, I have asked our main supplier, Thanh Long Foods, to give us 45 days to pay instead of 30, and they have agreed.\n\nPlease send me your sales forecast for December and January by Friday. I need your numbers to finish the cash budget.\n\nBest regards,\nLe Thi Kim Ngan\nFinance Manager, An Phu Gifts", [
      M('F3', 'Writer\'s purpose', "What is the main purpose of the email?",
        ['To thank managers for last year\'s sales', 'To announce higher prices for gift baskets', 'To explain the cash plan for Tet and ask for sales forecasts', 'To complain about a supplier'], 2,
        "'I am writing to explain our cash plan' and, at the end, 'Please send me your sales forecast… by Friday.'"),
      M('F3', 'Specific detail', "What must company customers with orders of more than 50 baskets do this year?",
        ['Pay a 30% deposit when they order', 'Pay within 45 days', 'Collect their baskets in two deliveries', 'Send a sales forecast by Friday'], 0,
        "'Company customers who order more than 50 baskets must pay a 30% deposit when they order.'"),
      M('F3', 'Vocabulary in context', "In the first paragraph, 'a cash shortage' means…",
        ['having more cash than the business needs', 'a discount for paying early', 'a loan from a supplier', 'not having enough cash to pay the bills'], 3,
        "A 'shortage' is when there is not enough of something. The result was that the company 'paid two suppliers late'."),
      M('F3', 'Inference', "What can we infer about Thanh Long Foods?",
        ['It is going to stop supplying An Phu Gifts', 'It is willing to wait longer for its money to help An Phu Gifts', 'It buys gift baskets from An Phu Gifts', 'It asked An Phu Gifts for a 30% deposit'], 1,
        "Ms Ngan asked for '45 days to pay instead of 30, and they have agreed' — the supplier accepted later payment."),
    ]),
  ...LISTEN('F3-l1', 'Listening, Voicemail about an overdue invoice',
    "Hello Mr Dung, this is Thao from the accounts department at Hoa Binh Stationery. I'm calling about invoice number four five two, for eighteen million dong. The payment was due on the fifteenth of October, so it is now three weeks overdue. I sent you an email reminder last week, but I haven't received a reply. I understand that things can be busy, and maybe the invoice was lost. I'm going to send you another copy by email this afternoon. Could you please make the payment by Friday, or call me back if there is a problem? My number is oh two eight, three five five, oh one nine eight. Thank you, and have a nice day.", [
      M('F3', 'Listening for gist', "Why did Thao leave this message?",
        ['To place a new order', 'To ask a customer to pay a late invoice', 'To apologise for a late delivery', 'To offer a discount'], 1,
        "'I'm calling about invoice number four five two… it is now three weeks overdue.'"),
      M('F3', 'Listening for specific information', "How much is the invoice for?",
        ['8 million VND', '15 million VND', '45 million VND', '18 million VND'], 3,
        "'Invoice number four five two, for eighteen million dong.' Fifteen is the date, not the amount."),
      M('F3', 'Listening for the next action', "What is Thao going to do this afternoon?",
        ['Email another copy of the invoice', 'Visit Mr Dung\'s office', 'Phone Mr Dung again', 'Stop all deliveries'], 0,
        "'I'm going to send you another copy by email this afternoon.'"),
    ]),
  ...SPEAK('F3', 'Speaking, Explain a cash plan',
    "Talk for about 1 minute. You own a small clothes shop in Can Tho. Explain your cash plan for the next three months to your business partner. Cover: (1) when you expect the highest sales, (2) your biggest payments, (3) one thing you are going to do to avoid a cash shortage. Use 'will' and 'going to'.",
    "Our best months are December and January, because people buy new clothes before Tet. So I think sales will be high then, but February will be quiet. Our biggest payments are rent, staff wages and the supplier's invoice for the Tet collection, which we have to pay in December. To avoid a cash shortage, I'm going to ask the supplier for sixty-day payment terms. I'm also going to order less inventory in February, so we will keep more cash in the bank.",
    "Content: says when sales will be highest, names the main payments and gives one clear action against a cash shortage, using will / going to"),
  ...WRITE('F3', 'Writing, Polite payment reminder',
    "You work in the accounts department of Hoa Binh Stationery. Write a polite reminder email of about 100 words to a customer, Ms Vy at Sen Viet Restaurant, whose payment is overdue. Include: (1) the invoice number and amount (No. 317, 12 million VND), (2) the due date (30 September), (3) what you would like her to do.",
    "Subject: Reminder: invoice No. 317\n\nDear Ms Vy,\n\nI hope you are well. I am writing about invoice No. 317 for 12 million VND, for the paper products we delivered in September. The payment was due on 30 September, and according to our records it is now overdue.\n\nPerhaps the invoice was missed, so I have attached another copy to this email. Could you please make the payment by the end of this week? If you have already paid, please ignore this message. If there is any problem with the invoice, please call me and we will find a solution.\n\nThank you for your help.\n\nBest regards,\nThao\nHoa Binh Stationery",
    "Content: gives the invoice number, amount and due date, says the payment is overdue and asks politely for a clear action"),

  /* ---------------- F4, Investment appraisal — language focus: conditionals for decisions, certainty and risk ---------------- */
  ...USE([
    C('F4', 'Vocabulary, Talking about a project', "Sort the words and phrases into three groups.",
      ['Benefits of a project', 'Costs of a project', 'Decisions'],
      [['extra sales', 0], ['lower electricity bills', 0], ['the price of the machine', 1], ['installation', 1], ['maintenance', 1], ['approve', 2], ['reject', 2]],
      "A project brings benefits (extra sales, savings) and has costs (price, installation, maintenance). The board then 'approves' (says yes) or 'rejects' (says no) the proposal."),
    M('F4', 'Vocabulary, Word in context', "Choose the best phrase: 'The new machine will pay for itself in three years. In other words, the ___ is three years.'",
      ['interest rate', 'payback period', 'deadline', 'warranty'], 1,
      "The 'payback period' is the time a project needs to 'pay back' its cost — the same idea as 'pay for itself'."),
    M('F4', 'Vocabulary, Word formation', "Choose the correct form: 'Buying the delivery vans was a good ___ for the company.'",
      ['invest', 'investor', 'invested', 'investment'], 3,
      "After 'a good' we need a noun for the thing: invest (verb) → investment (noun). An 'investor' is a person."),
    M('F4', 'Language focus, First conditional', "Choose the correct form (a real possibility): 'If the board approves the project, we ___ the machine in March.'",
      ['will install', 'installed', 'would install', 'installing'], 0,
      "First conditional for a real possibility: if + present simple, will + verb."),
    M('F4', 'Language focus, Second conditional', "Choose the correct form: 'If we had more cash, we ___ both projects. Unfortunately, we can only choose one.'",
      ['will approve', 'approve', 'would approve', 'approved'], 2,
      "Second conditional for an unreal situation: if + past simple, would + verb. The second sentence shows they do not have the cash."),
    M('F4', 'Language focus, Certainty and risk', "Choose the correct word: 'Electricity prices have risen every year for ten years, so they are ___ to rise again next year.'",
      ['probably', 'likely', 'maybe', 'possible'], 1,
      "The structure is 'be likely to + verb'. 'Probably' and 'maybe' are adverbs and cannot follow 'are … to rise'."),
    O('F4', 'Language focus, Order the memo', "Put the parts of this memo in the correct order.",
      ['To: Board of Directors. Subject: Proposal to buy a new printing machine.',
        'I am writing to recommend that we replace our old printing machine.',
        'The new machine costs 800 million VND and prints twice as fast as the old one.',
        'As a result, we estimate extra cash inflows of 250 million VND a year.',
        'The main risk is that demand might fall if a large customer leaves.',
        'For these reasons, I ask the board to approve the investment at the next meeting.'],
      "A proposal memo goes: heading → purpose ('I am writing to…') → facts → result ('As a result…') → risk → request ('For these reasons…')."),
    M('F4', 'Describing data, Cash inflows', "Estimated cash inflows from the new machine (million VND): Year 1 150, Year 2 250, Year 3 250, Year 4 180. Which sentence correctly describes the data?",
      ['Inflows are expected to fall every year.', 'Inflows are expected to peak in Year 4.', 'Inflows are expected to rise sharply in Year 3.', 'Inflows are expected to rise in Year 2, remain stable in Year 3 and fall in Year 4.'], 3,
      "150 → 250 is a rise, 250 → 250 'remains stable', and 250 → 180 is a fall. 'Are expected to' is used because the numbers are estimates."),
  ]),
  ...READ('F4-r1', 'Reading, Petrol or electric? A decision for Tam Anh Express',
    "Tam Anh Express, a delivery company in Hai Phong, has to make a big decision this month. Its ten petrol vans are old, and repair bills are rising. The managers are looking at two options.\n\nOption A is to buy ten new petrol vans for 6 billion VND. The price is lower, and the drivers already know the vehicles. Option B is to buy ten electric vans for 9 billion VND. They cost more to buy, but they are much cheaper to run. The finance team estimates that the company would save about 900 million VND a year on fuel and repairs.\n\nThe director, Ms Bui Thi Hong, likes Option B, but she is careful. 'The numbers look good on paper,' she says, 'but they are only estimates. If there are not enough charging stations, our vans might lose time every day.' The finance manager is more confident. He points out that two large customers have asked for greener deliveries, so electric vans could help the company win new contracts.\n\nThe board will make its decision on Friday.", [
      M('F4', 'Main idea', "What is the article mainly about?",
        ['A company choosing between two investment options', 'A company that has decided to close', 'A new law about electric vehicles', 'How to repair old delivery vans'], 0,
        "'Tam Anh Express… has to make a big decision this month… The managers are looking at two options.'"),
      M('F4', 'Specific detail', "According to the finance team, what is the advantage of the electric vans?",
        ['They are cheaper to buy', 'The drivers already know them', 'They cost much less to run', 'They never need charging'], 2,
        "'They cost more to buy, but they are much cheaper to run' — a saving of about 900 million VND a year on fuel and repairs."),
      M('F4', 'Vocabulary in context', "In the third paragraph, 'estimates' are…",
        ['final prices written in a contract', 'numbers that are calculated roughly and may not be exact', 'bills that have already been paid', 'rules made by the government'], 1,
        "Ms Hong says the numbers 'look good on paper' but 'are only estimates' — they may be different in real life."),
      M('F4', 'Inference', "What can we infer about Ms Hong?",
        ['She has already rejected the electric vans', 'She thinks petrol vans are better for the environment', 'She does not trust the finance manager', 'She is interested in Option B but worried about a practical risk'], 3,
        "She 'likes Option B, but she is careful', and she mentions the risk of not enough charging stations."),
    ]),
  ...LISTEN('F4-l1', 'Listening, Meeting: new or second-hand machine?',
    "Manager: Thanks for coming, everyone. We need to decide about the packaging machine today. Khanh, what did you find? Khanh: Well, there are two choices. A new machine from Japan costs nine hundred million dong. A second-hand one costs five hundred million. Manager: That's a big difference. Khanh: Yes, but the new one comes with a five-year warranty, and it uses less electricity. The second-hand one has no warranty at all. Manager: Hmm. If it breaks down in the busy season, we'll lose orders. Khanh: Exactly. Personally, I think the new machine is less risky, even though it's more expensive. Manager: I agree. But before we decide, please ask the supplier if we can pay in two instalments. Khanh: Sure, I'll call them this afternoon.", [
      M('F4', 'Listening for gist', "What are the speakers discussing?",
        ['How to repair a broken machine', 'When to hire new workers', 'Which packaging machine to buy', 'How to sell an old machine'], 2,
        "'We need to decide about the packaging machine today… there are two choices.'"),
      M('F4', 'Listening for specific information', "How much does the second-hand machine cost?",
        ['500 million VND', '900 million VND', '5 million VND', '200 million VND'], 0,
        "'A second-hand one costs five hundred million.' Nine hundred million is the price of the new one."),
      M('F4', 'Speaker\'s opinion', "Why does Khanh prefer the new machine?",
        ['It is cheaper', 'He thinks it is less risky', 'It is made in Vietnam', 'It can be delivered sooner'], 1,
        "'Personally, I think the new machine is less risky, even though it's more expensive.'"),
    ]),
  ...SPEAK('F4', 'Speaking, Recommend an investment',
    "Talk for about 1 minute. Your family's noodle shop in Hue wants to invest. Choose ONE option and recommend it: (A) new, faster kitchen equipment for 100 million VND, or (B) a delivery motorbike and an online ordering page for 60 million VND. Cover: (1) what the option brings, (2) one risk, (3) your final recommendation. Use 'if' at least once.",
    "I would choose option B, the delivery motorbike and the online ordering page. It costs less than the new kitchen equipment, and it can bring in new customers who don't want to come to the shop. If we get twenty extra orders a day, the investment will pay for itself quickly. One risk is that online orders might be slow at first, so we will need to advertise. Overall, I recommend option B because the cost is lower and the risk is smaller.",
    "Content: chooses one option, explains its benefit and one risk, and ends with a clear recommendation; uses an if-sentence correctly"),
  ...WRITE('F4', 'Writing, Memo: recommend an option',
    "You are the finance assistant at Tam Anh Express, a delivery company in Hai Phong. Write a memo of about 100 words to the director, Ms Hong, recommending which vans to buy: ten petrol vans (6 billion VND) or ten electric vans (9 billion VND, saving about 900 million VND a year on fuel and repairs). Include: (1) your recommendation, (2) two reasons, (3) one risk and how to reduce it.",
    "To: Ms Hong, Director\nSubject: Recommendation on new vans\n\nI recommend that we buy the ten electric vans.\n\nFirst, although they cost 9 billion VND, they will save about 900 million VND a year on fuel and repairs. Second, our customers are asking for greener deliveries, so electric vans could help us win new contracts.\n\nThe main risk is charging. If there are not enough charging stations, drivers might lose time. To reduce this risk, we could install two chargers at our depot and charge the vans at night.\n\nIf the board agrees, I will ask the supplier for a final price this week.",
    "Content: states one recommendation, supports it with two reasons, names one risk and suggests how to reduce it"),

  /* ---------------- F5, Financial markets & institutions — language focus: describing trends (tenses, prepositions) ---------------- */
  ...USE([
    C('F5', 'Vocabulary, The world of investing', "Sort the words into three groups.",
      ['Ways to invest', 'People and organisations', 'Money an investor receives'],
      [['shares', 0], ['bonds', 0], ['a term deposit', 0], ['a stockbroker', 1], ['the central bank', 1], ['a dividend', 2], ['interest', 2]],
      "You can put money into shares, bonds or deposits. A stockbroker and the central bank are 'who'. A dividend (from shares) and interest (from bonds or deposits) are what the investor gets."),
    M('F5', 'Vocabulary, Word in context', "Choose the best word: 'When a company makes a good profit, it may pay a ___ to its shareholders.'",
      ['fine', 'loan', 'dividend', 'salary'], 2,
      "A 'dividend' is the part of the profit paid to shareholders. A salary is paid to staff; a fine is a punishment."),
    M('F5', 'Vocabulary, Collocation', "Choose the correct verb: 'Kim Long Steel plans to ___ new shares on the stock exchange to raise money for a factory.'",
      ['issue', 'borrow', 'earn', 'owe'], 0,
      "Companies 'issue' shares or bonds (= offer them for sale to investors). We borrow or owe money, not shares, in this sentence."),
    M('F5', 'Language focus, Present perfect with since', "Choose the correct form: 'Interest rates ___ twice since January.'",
      ['rise', 'are rising', 'rises', 'have risen'], 3,
      "With 'since + a point in time' we use the present perfect: have + past participle (rise – rose – risen)."),
    M('F5', 'Language focus, Past simple with a finished time', "Choose the correct form: 'The share price ___ sharply last Friday, after the company announced a loss.'",
      ['has fallen', 'fell', 'falls', 'is falling'], 1,
      "'Last Friday' is a finished time, so we use the past simple (fall – fell), not the present perfect."),
    M('F5', 'Language focus, Prepositions with trends', "Choose the correct preposition: 'The share price rose ___ 40,000 VND to 46,000 VND.'",
      ['by', 'at', 'from', 'in'], 2,
      "We say 'rise from (the old number) to (the new number)'. 'By' shows the size of the change: 'rose by 6,000 VND'."),
    O('F5', 'Language focus, Describe a process', "Put the sentences in order to describe how a person buys shares.",
      ['First, the investor opens a trading account with a securities company.',
        'Next, the investor transfers money into the account.',
        'Then, the investor chooses a company and places an order to buy its shares.',
        'After that, the stock exchange matches the order with a seller.',
        "Finally, the shares appear in the investor's account, and the investor becomes a shareholder."],
      "The sequencing words give the order: First, Next, Then, After that, Finally. An account must exist before money can be moved into it or an order placed."),
    M('F5', 'Describing data, Share price', "Share price of Kim Long Steel (VND): Monday 30,000; Tuesday 30,200; Wednesday 24,000; Thursday 24,000. Which sentence correctly describes the data?",
      ['The price fell slightly every day.', 'The price rose slightly on Tuesday, fell sharply on Wednesday and remained stable on Thursday.', 'The price rose sharply on Tuesday and then fell slightly.', 'The price remained stable from Monday to Wednesday.'], 1,
      "30,000 → 30,200 is a small change ('rose slightly'); 30,200 → 24,000 is a big one ('fell sharply'); 24,000 → 24,000 'remained stable'."),
  ]),
  ...READ('F5-r1', 'Reading, Savings, bonds or shares?',
    "Where should young people put their savings? Our reader Thanh Truc, 23, from Nha Trang, has saved 50 million VND and asked for advice. We spoke to Mr Vo Quoc Dat, a financial adviser in Ho Chi Minh City.\n\n'There are three common choices,' he says. 'The first is a bank deposit. It is the safest, and you know exactly how much interest you will receive, but the return is usually the lowest. The second is bonds. When you buy a bond, you lend money to a company or the government, and they pay you interest every year. Government bonds are very safe; company bonds pay more but carry more risk.\n\n'The third choice is shares. When you buy shares, you become one of the owners of the company. If the company does well, the share price may rise and you may receive a dividend. But prices on the stock exchange go up and down every day, and you can lose money.'\n\nHis advice to Truc is simple: 'Never invest money that you will need next month, and do not put everything in one place.'", [
      M('F5', 'Main idea', "What is the article mainly about?",
        ['How to open a bank account in Nha Trang', 'Why young people should not save money', 'The history of the stock exchange', 'Three ways to invest savings and their risks'], 3,
        "Mr Dat says: 'There are three common choices' — a bank deposit, bonds and shares — and explains the risk of each."),
      M('F5', 'Specific detail', "According to Mr Dat, what happens when you buy a bond?",
        ['You lend money and receive interest every year', 'You become an owner of the company', 'You receive a dividend every month', 'You can never lose any money'], 0,
        "'When you buy a bond, you lend money to a company or the government, and they pay you interest every year.'"),
      M('F5', 'Vocabulary in context', "In the second paragraph, company bonds 'carry more risk'. This means…",
        ['they are heavier to hold', 'there is a higher chance of losing money', 'they pay less interest', 'only banks can buy them'], 1,
        "'Risk' is the chance that something bad happens. The contrast is with government bonds, which 'are very safe'."),
      M('F5', 'Inference', "What would Mr Dat probably say to someone who wants to put all their savings into the shares of one company?",
        ['It is the safest choice', 'It is fine if the money is needed next month', 'It is a bad idea, because the money should be spread out', 'It is the only way to receive interest'], 2,
        "His advice is 'do not put everything in one place', and he warns that with shares 'you can lose money'."),
    ]),
  ...LISTEN('F5-l1', 'Listening, Evening market report',
    "Good evening, and here is today's market report. It was a quiet morning on the Ho Chi Minh City stock exchange, but things changed after lunch. The main index closed at one thousand two hundred and fifty points, down twenty points from yesterday. Bank shares fell the most, after the central bank said it might raise interest rates next month. However, it wasn't all bad news. Shares in seafood exporters rose by about three percent, thanks to strong orders from Japan. Our guest analyst believes the market will stay nervous until the central bank makes its decision, so she advises small investors to wait and not to sell in a panic. We'll be back with more tomorrow at six.", [
      M('F5', 'Listening for gist', "What kind of programme is this?",
        ['An advertisement for a bank', 'A daily report on the stock market', 'A weather forecast', 'An interview with a seafood exporter'], 1,
        "'Good evening, and here is today's market report.'"),
      M('F5', 'Listening for specific information', "Which shares rose today?",
        ['Bank shares', 'Steel shares', 'All shares', 'Shares in seafood exporters'], 3,
        "'Shares in seafood exporters rose by about three percent.' Bank shares 'fell the most'."),
      M('F5', 'Speaker\'s advice', "What does the analyst advise small investors to do?",
        ['Wait and stay calm', 'Sell everything today', 'Buy bank shares immediately', 'Move their money to Japan'], 0,
        "'She advises small investors to wait and not to sell in a panic.'"),
    ]),
  ...SPEAK('F5', 'Speaking, Deposit or shares?',
    "Talk for about 1 minute. A friend has saved 30 million VND and asks you: 'Should I put it in a bank deposit or buy shares?' Cover: (1) one advantage of each choice, (2) one risk, (3) your advice.",
    "If I were you, I would not put all the money in one place. A bank deposit is safe, and you know how much interest you will get, but the return is low. Shares can give a higher return, and some companies pay a dividend. However, share prices can fall sharply, so you might lose money. My advice is to keep twenty million in a deposit and invest ten million in shares of two or three large companies.",
    "Content: gives one advantage of a deposit and of shares, names one risk and ends with clear advice"),
  ...WRITE('F5', 'Writing, Email of advice',
    "Your uncle Hai in Nha Trang wants to put all his savings into the shares of one company. Write him an email of about 100 words. Include: (1) what could go wrong, (2) one safer choice, (3) your suggestion. Be polite and friendly.",
    "Subject: Your plan to buy shares\n\nDear Uncle Hai,\n\nThank you for telling me about your plan. I understand why you like this company, but I am a little worried. If you put all your savings into the shares of one company and the price falls sharply, you could lose a lot of money. Share prices go up and down every day.\n\nA bank deposit or government bonds would be safer, because you know how much interest you will receive. My suggestion is to keep most of your savings in the bank and invest only a small part in shares of several companies.\n\nPlease think about it.\n\nLove,\nTruc",
    "Content: explains the risk of one company's shares, offers a safer choice and makes a polite, clear suggestion"),
];

export const LIB = [
  ['R-FIN-C1', 'case_study', 'F4', 'Rooftop solar at a Long An packaging plant', 40,
    'Phúc Thịnh Packaging makes cartons for food exporters in Long An province. Electricity is its second-largest cost, and the factory roof is large and empty. A solar company has offered to install rooftop panels for 2.4 billion VND. The finance team estimates that the panels will cut the electricity bill by about 600 million VND a year, so the payback period is about four years. The panels should work for at least fifteen years.\n' +
    'The director, Ms Loan, is positive. Two large customers have asked their suppliers to use more clean energy, and she believes the project will help the company keep these contracts. The chief accountant, Mr Vinh, is less sure. He says the savings are only an estimate, electricity prices might change, and the company could use the same money to buy a second printing machine. The board will discuss the proposal next week.\n\n' +
    'Language tasks\n' +
    '1. Find these five terms in the text and explain each one in a simple English sentence: cost, estimate, payback period, savings, proposal.\n' +
    '2. Role-play the board meeting in groups of three (Ms Loan, Mr Vinh and a chairperson). Use these phrases: "In my opinion…", "I see your point, but…", "If we invest…, we will…", "What if…?", "So we agree that…".\n' +
    '3. Write a recommendation email of about 120 words to the board: say yes or no to the project, give two reasons and mention one risk.\n' +
    '4. Give a 2-minute spoken summary of the situation and your recommendation to another group. Do not read from your notes.'],
  ['R-FIN-C2', 'case_study', 'F5', 'Sông Hàn Land’s bond offer', 35,
    'Sông Hàn Land, an invented property developer in Đà Nẵng, wants to raise 500 billion VND to build a riverside apartment block. Instead of borrowing from a bank, it plans to issue three-year bonds that pay 10.5% interest a year. At the moment, a twelve-month bank deposit pays about 5.5%.\n' +
    'A sales agent is phoning small investors and describing the bonds as “as safe as a bank deposit, but with double the return”. However, the company has no credit rating, and it can only repay investors if it sells the apartments. Interest rates on home loans have risen recently, so fewer people are buying apartments.\n' +
    'Mrs Sáu, a retired teacher, has savings of 300 million VND. The agent has called her three times this week. She likes the high interest rate, but she does not understand the risks, so she has asked her niece, a finance student, for advice.\n\n' +
    'Language tasks\n' +
    '1. Find these five terms in the text and explain each one in a simple English sentence: issue, bond, return, credit rating, investor.\n' +
    '2. Role-play the conversation between Mrs Sáu and her niece. Use these phrases: "Can you explain what … means?", "The problem is that…", "If I were you, I would…", "You might…", "It is safer to…".\n' +
    '3. Write an email of about 120 words from the niece to Mrs Sáu: recommend what to do with her savings, give two reasons and suggest one safer choice.\n' +
    '4. Give a 2-minute spoken summary of the offer and its risks to the class. Use at least three linking words (however, because, so).'],
  ['R-FIN-G1', 'group_project', 'F2', 'Company health check: a presentation in English', 180,
    'Brief\n' +
    'Choose one company listed on a Vietnamese stock exchange (for example in retail, dairy, steel or aviation). Look at its latest annual report and note five key figures that the report already gives for the last two years (for example revenue, net profit, total assets, total debt, number of shops or employees). You do not need to calculate anything new. Your job is to describe and compare the figures in clear English, as if you were explaining the company to a foreign visitor.\n\n' +
    'Deliverables\n' +
    '- A 5-minute presentation in English with 5–6 slides\n' +
    '- A one-page English report that compares the two years, using comparatives and the language of trends (rose, fell, remained stable, slightly, sharply)\n' +
    '- A glossary of 15 financial terms from the report, each with a simple English definition and a Vietnamese translation\n\n' +
    'Team roles (4–5 students)\n' +
    '- Researcher: finds the annual report and the five key figures\n' +
    '- Glossary keeper: collects the terms and writes the definitions\n' +
    '- Report writer: drafts the one-page report\n' +
    '- Language checker: checks grammar, vocabulary and pronunciation of key terms and numbers\n' +
    '- Presenter (or shared): designs the slides and leads the Q&A\n\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: choose the company, collect the figures, start the glossary\n' +
    '- Week 2: write the report and the slides; check the language together\n' +
    '- Week 3: rehearse (time yourselves and practise saying the numbers), then present and answer questions\n\n' +
    'Assessment (100 points)\n' +
    '- Content: 30\n' +
    '- Language accuracy and vocabulary: 30\n' +
    '- Delivery and pronunciation: 20\n' +
    '- Teamwork and Q&A: 20'],
  ['R-FIN-G2', 'group_project', 'F3', 'Cash plan for a family business: report in English', 180,
    'Brief\n' +
    'Interview the owner of a small family business (for example a phở shop, a phone repair stall or an online clothing shop). You may do the interview in Vietnamese. Find out which months are busy and quiet, what the biggest payments are, and when customers and suppliers are paid. Then explain the business’s cash situation in English and suggest three simple ways to avoid a cash shortage around Tết.\n\n' +
    'Deliverables\n' +
    '- A 5-minute presentation in English with 5–6 slides\n' +
    '- A one-page English memo to the owner with three suggestions, using will / going to and polite language of advice (we suggest…, you could…)\n' +
    '- A glossary of 15 terms about cash and budgeting, each with a simple English definition and a Vietnamese translation\n\n' +
    'Team roles (4–5 students)\n' +
    '- Interviewer: arranges and leads the interview, takes notes\n' +
    '- Glossary keeper: collects the terms and writes the definitions\n' +
    '- Memo writer: drafts the one-page memo\n' +
    '- Language checker: checks grammar, vocabulary and pronunciation of key terms and numbers\n' +
    '- Presenter (or shared): designs the slides and leads the Q&A\n\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: prepare ten interview questions, interview the owner, start the glossary\n' +
    '- Week 2: write the memo and the slides; check the language together\n' +
    '- Week 3: rehearse (time yourselves and practise saying the numbers), then present and answer questions\n\n' +
    'Assessment (100 points)\n' +
    '- Content: 30\n' +
    '- Language accuracy and vocabulary: 30\n' +
    '- Delivery and pronunciation: 20\n' +
    '- Teamwork and Q&A: 20'],
];

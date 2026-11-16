// ESP (English for Specific Purposes, CEFR B1) · Accounting context: units A1–A5.
// The accounting topic is only the setting; every item practises English and can be answered from the text, the audio or a language rule.
import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';

export const EXTRA = [
  /* ---------------- A1 · Accounting concepts (Sen Viet Restaurant, Da Nang) — 11 items; be-b1.js supplies speaking and writing ---------------- */
  ...USE([
    C('A1', 'Vocabulary · Word families', 'Sort the words: is each one a verb, a person or a thing?', ['Verb (action)', 'Noun (person)', 'Noun (thing or idea)'], [
      ['invest', 0], ['borrow', 0], ['owe', 0], ['owner', 1], ['investor', 1], ['investment', 2], ['ownership', 2],
    ], 'The endings help: -er and -or often make a person (owner, investor); -ment and -ship make a thing or idea (investment, ownership).'),
    M('A1', 'Vocabulary · Word in context', 'Choose the best word: "The restaurant must pay the bank loan back, so the loan is a ___ of the business."', ['receipt', 'liability', 'customer', 'profit'], 1, '"Must pay back" is the clue: a liability is money that a business owes to someone else.'),
    M('A1', 'Vocabulary · Collocation', 'Choose the best word: "Ms Thu ___ 300 million VND of her own money in the restaurant as capital."', ['owed', 'lent', 'invested', 'earned'], 2, 'We say "invest money in a business". "Owe" and "lend" need "to" + a person, and "earn" does not fit with "her own money".'),
    M('A1', 'Language focus · Present simple for definitions', 'Choose the correct form: "An asset ___ something that a business owns."', ['are', 'is being', 'was', 'is'], 3, 'Definitions and general facts use the present simple. "An asset" is singular, so the verb is "is".'),
    M('A1', 'Language focus · State verbs', 'Choose the correct form: "At the moment, the restaurant ___ 200 million VND to the bank."', ['owes', 'is owing', 'owe', 'owing'], 0, '"Owe" is a state verb, so we do not use the continuous form, even with "at the moment". Third person singular needs -s: owes.'),
    O('A1', 'Language focus · Order an email', 'Put the sentences of this email to an accountant in the correct order.', [
      'Dear Mr Khoa,',
      'I am writing to ask a question about the accounts of my new restaurant.',
      'Last week I bought a second-hand oven for 40 million VND, but I am not sure how to record it.',
      'Could you tell me if the oven is an asset of the business?',
      'Thank you very much for your help.',
      'Best regards, Thu',
    ], 'A business email goes: greeting, reason for writing ("I am writing to…"), the details, the request, thanks, and the closing.'),
    M('A1', 'Describing data · Amounts', 'Sen Viet Restaurant, 1 March — assets: 500 million VND; liabilities: 200 million VND; equity: 300 million VND. Which sentence correctly describes the data?', ['The restaurant owes more than it owns.', 'Equity is lower than liabilities.', 'The restaurant owns more than it owes.', 'Assets and liabilities are equal.'], 2, 'Assets (what it owns, 500 million) are larger than liabilities (what it owes, 200 million), so "owns more than it owes" is correct.'),
  ]),
  ...READ('A1-r1', 'Reading · Three boxes on a piece of paper',
    `Ms Thu opened Sen Viet, a small family restaurant near My Khe Beach in Da Nang, in March. Before the first customer arrived, she sat down with her accountant, Mr Khoa, to understand her numbers.

Mr Khoa drew three boxes on a piece of paper. In the first box he wrote "assets": the things the restaurant owns, such as cash, kitchen equipment and furniture. In the second he wrote "liabilities": the money the restaurant owes to other people, for example its bank loan. In the third he wrote "equity": the part of the business that belongs to the owner.

"The first box is always equal to the other two together," he said. "If you borrow more, both sides grow. If you buy a fridge with cash, one asset simply becomes another."

Ms Thu found this picture very useful. Now, every time she spends or receives money, she asks herself which boxes change. She also keeps every receipt in a folder, because Mr Khoa needs a document for each transaction he records.`, [
      M('A1', 'Main idea', 'What is the text mainly about?', ['How to cook for a family restaurant', 'An accountant explaining a basic accounting idea to a new owner', 'Why a restaurant could not get a bank loan', 'How to choose kitchen equipment'], 1, 'Mr Khoa draws three boxes (assets, liabilities, equity) "to understand her numbers" — he is explaining a basic idea to the new owner.'),
      M('A1', 'Vocabulary in context', 'In paragraph 2, "belongs to the owner" means…', ['is owned by the owner', 'is borrowed by the owner', 'is sold to the owner', 'is paid by the owner'], 0, 'If something belongs to you, you own it. Equity is the owner\'s part of the business.'),
    ]),
  ...LISTEN('A1-l1', 'Listening · A call from the bank',
    `Officer: Good morning, Ms Thu. This is Hung from Song Han Bank. I'm calling about your loan application.
Thu: Oh, good morning. Is there any news?
Officer: Yes, good news. The loan of two hundred million dong is approved, for three years.
Thu: That's wonderful. Thank you!
Officer: Before we sign, I need two things. First, a list of the restaurant's assets, I mean the equipment and furniture. Second, a document that shows how much of your own money you put into the business. Can you bring them to our branch on Thursday at ten?
Thu: Thursday is difficult. The kitchen equipment is arriving that day. Could I come on Friday morning?
Officer: Friday at nine is fine. See you then.`, [
      M('A1', 'Purpose of the call', 'Why is the bank officer calling Ms Thu?', ['To say her loan is approved and to ask for documents', 'To tell her the loan was refused', 'To sell her kitchen equipment', 'To book a table at the restaurant'], 0, 'He says "The loan of two hundred million dong is approved" and then "I need two things".'),
      M('A1', 'Listening for detail', 'When will Ms Thu go to the bank?', ['Thursday at ten', 'Thursday at nine', 'Friday at ten', 'Friday at nine'], 3, 'She cannot come on Thursday, and the officer answers "Friday at nine is fine."'),
    ]),

  /* ---------------- A2 · Double entry and the trial balance (Tra Xanh Tea House, Can Tho) ---------------- */
  ...USE([
    C('A2', 'Vocabulary · Document types', 'Sort the words: is each one a paper from a transaction, or a record kept by the accountant?', ['Source documents', 'Accounting records'], [
      ['invoice', 0], ['receipt', 0], ['bank statement', 0], ['journal', 1], ['ledger', 1], ['trial balance', 1],
    ], 'Invoices, receipts and bank statements come from outside or from a sale. The journal, the ledger and the trial balance are written by the accountant.'),
    M('A2', 'Vocabulary · Synonym', 'Choose the best word: "There is a mistake in the ledger." A more formal word for "mistake" is…', ['entry', 'total', 'error', 'balance'], 2, '"Error" means "mistake" and is common in business and accounting English.'),
    M('A2', 'Vocabulary · Collocation', 'Choose the best verb: "Every Friday, Ms Ngoc ___ the journal entries to the ledger."', ['posts', 'sends', 'pays', 'sells'], 0, 'The accounting collocation is "post an entry to the ledger" — to copy it from the journal into the right account.'),
    M('A2', 'Language focus · Present passive', 'Choose the correct form: "Every sale ___ in the journal on the same day."', ['records', 'is recording', 'recorded', 'is recorded'], 3, 'A sale cannot record itself, so we need the passive: is + past participle (is recorded). The present simple shows a routine.'),
    M('A2', 'Language focus · Present passive', 'Choose the correct form: "The trial balance ___ by the accountant at the end of each month."', ['prepares', 'is prepared', 'is preparing', 'prepare'], 1, '"By the accountant" shows who does the action, so the subject receives it: passive, is prepared.'),
    M('A2', 'Language focus · Passive with plural subjects', 'Choose the correct form: "All invoices and receipts ___ in a blue folder."', ['is kept', 'keep', 'are kept', 'are keeping'], 2, 'The subject is plural (invoices and receipts), so the passive needs "are": are kept.'),
    O('A2', 'Language focus · Order a process', 'Put the sentences in order to describe how a sale is recorded at the tea house.', [
      'First, a customer pays for the tea and a receipt is printed.',
      'The receipt is then used to write an entry in the journal.',
      'On Friday, this journal entry is posted to the ledger accounts.',
      'At the end of the month, the balance of each ledger account is calculated.',
      'Finally, all these balances are listed in the trial balance.',
    ], 'Follow the linking words (First, then, Finally) and the reference words: "The receipt", "this journal entry" and "these balances" each point back to the sentence before.'),
    M('A2', 'Describing data · Comparing totals', 'Tra Xanh Tea House, trial balance for May — total debits: 86,400,000 VND; total credits: 85,900,000 VND. Which sentence correctly describes the data?', ['The total debits are equal to the total credits.', 'The total debits are slightly higher than the total credits.', 'The total debits are far lower than the total credits.', 'The total credits are double the total debits.'], 1, 'The two figures are close but not the same, and the debit figure is the bigger one: "slightly higher" describes a small difference.'),
  ]),
  ...READ('A2-r1', 'Reading · Your first week at Tra Xanh Tea House',
    `Subject: Your first week at Tra Xanh Tea House

Dear Minh,

Welcome to the team. Here is how we keep our books, so you know what to expect on Monday.

Every transaction is recorded twice: once as a debit in one account and once as a credit in another. For example, when we buy tea leaves in cash, the Purchases account is debited and the Cash account is credited. This is why the system is called double entry.

During the day, please collect all invoices and receipts. In the evening, each one is entered in the journal in date order. On Fridays, I post the journal entries to the ledger, and you will watch me do this for the first two weeks.

At the end of the month we prepare a trial balance. If total debits and total credits are not the same, there is an error somewhere, and we look for it together. Don't worry: everybody makes mistakes at first. The important thing is to tell me quickly.

See you on Monday at 8 a.m.

Best regards,
Ngoc`, [
      M('A2', 'Main idea', 'Why does Ngoc write this email?', ['To complain about an error in the trial balance', 'To order tea leaves from a supplier', 'To explain to a new colleague how the shop keeps its accounting records', 'To ask Minh to work on Fridays only'], 2, 'She writes: "Here is how we keep our books, so you know what to expect on Monday."'),
      M('A2', 'Specific detail', 'When are the journal entries posted to the ledger?', ['Every evening', 'On Mondays at 8 a.m.', 'At the end of the month', 'On Fridays'], 3, 'The text says: "On Fridays, I post the journal entries to the ledger."'),
      M('A2', 'Vocabulary in context', 'Documents are entered in the journal "in date order". This means…', ['from the earliest date to the latest', 'from the largest amount to the smallest', 'by the name of the customer', 'only on certain dates'], 0, '"In date order" means arranged by date, starting with the oldest document.'),
      M('A2', 'Inference', 'What can we understand about Minh?', ['He has worked at the tea house for years.', 'He is new and will not post entries by himself at first.', 'He is the owner of the tea house.', 'He made an error in last month\'s trial balance.'], 1, '"Welcome to the team" shows he is new, and "you will watch me do this for the first two weeks" shows he will not do the posting alone yet.'),
    ]),
  ...LISTEN('A2-l1', 'Listening · The trial balance doesn\'t balance',
    `Ngoc: Mr Phat, do you have a minute? The trial balance for June doesn't balance.
Phat: Oh. How big is the difference?
Ngoc: Ninety thousand dong.
Phat: That's not much, but we should find it. Any idea where it is?
Ngoc: I think so. On the twelfth of June we paid Mekong Tea four hundred and fifty thousand dong. But I think someone wrote five hundred and forty thousand in the ledger. The numbers are just the wrong way round.
Phat: Ah, yes. That's an easy mistake to make.
Ngoc: I'll check the invoice this afternoon and correct the entry.
Phat: Great. Send me the new trial balance tomorrow morning, please.`, [
      M('A2', 'Gist', 'What are Ngoc and Mr Phat talking about?', ['A late delivery of tea', 'A trial balance with an error in it', 'A new price list from a supplier', 'A customer who did not pay'], 1, 'Ngoc begins: "The trial balance for June doesn\'t balance", and they discuss where the error is.'),
      M('A2', 'Specific information', 'How much did the tea house really pay Mekong Tea on the twelfth of June?', ['90,000 VND', '540,000 VND', '450,000 VND', '12,000 VND'], 2, 'Ngoc says "we paid Mekong Tea four hundred and fifty thousand dong"; 540,000 is the wrong figure in the ledger.'),
      M('A2', 'Next action', 'What will Ngoc do this afternoon?', ['Check the invoice and correct the entry', 'Send the new trial balance to Mr Phat', 'Phone Mekong Tea to complain', 'Pay the supplier again'], 0, 'She says: "I\'ll check the invoice this afternoon and correct the entry." The new trial balance is for tomorrow morning.'),
    ]),
  ...SPEAK('A2', 'Speaking · How a small shop keeps its books',
    'Talk for about 1 minute. Explain how a small shop records what it buys and sells.\n• Which documents does it keep?\n• Where are the transactions recorded?\n• What happens at the end of the month?',
    'A small shop keeps all its invoices and receipts, because these documents show what it bought and sold. Every day, the transactions are recorded in the journal in date order. Each one is written twice, as a debit and as a credit. Later, the entries are posted to the ledger. At the end of the month, the accountant prepares a trial balance. If the total debits and the total credits are equal, the records are probably correct.',
    'Content: names the documents (invoices, receipts), the records (journal, ledger) and the month-end trial balance, in a logical order'),
  ...WRITE('A2', 'Writing · Email about an error',
    'You are Ngoc, the bookkeeper at Tra Xanh Tea House. Write an email of about 100 words to the owner, Mr Phat.\nPurpose: report a problem with the June trial balance.\nInclude:\n• what the problem was (a payment of 450,000 VND was entered as 540,000 VND)\n• what you did about it\n• one suggestion to avoid the same error in future',
    `Dear Mr Phat,

I am writing to tell you about the June trial balance.

When I prepared it yesterday, the total debits and the total credits were not equal. I checked the invoices and found the error. On 12 June we paid Mekong Tea 450,000 VND, but the amount was entered in the ledger as 540,000 VND.

I have corrected the entry, and the trial balance now balances. I attach the new version.

To avoid this problem in future, I suggest that a second person checks the ledger entries every Friday.

Best regards,
Ngoc`,
    'Content: states the problem clearly, says what was done (entry corrected, new trial balance attached) and makes one practical suggestion'),

  /* ---------------- A3 · Financial statements (Go Viet Furniture, Binh Duong) ---------------- */
  ...USE([
    C('A3', 'Vocabulary · Verbs of change', 'Sort the verbs: do they describe a figure going up, going down or not changing?', ['Go up', 'Go down', 'No change'], [
      ['rise', 0], ['increase', 0], ['grow', 0], ['fall', 1], ['drop', 1], ['decline', 1], ['remain stable', 2],
    ], 'Rise, increase and grow describe upward movement; fall, drop and decline describe downward movement; remain stable means the figure stays the same.'),
    M('A3', 'Vocabulary · Word in context', 'Choose the best word: "The machines lose value every year. In the financial statements, this loss of value is called ___."', ['revenue', 'depreciation', 'equity', 'inventory'], 1, '"Lose value every year" is the clue: depreciation is the fall in value of equipment over time.'),
    M('A3', 'Vocabulary · Collocation', 'Choose the best verb: "Go Viet ___ a net profit of 150 million VND last year."', ['did', 'took', 'gave', 'made'], 3, 'In English a company "makes a profit" (or "makes a loss"), not "does" or "takes" one.'),
    M('A3', 'Language focus · Prepositions of change', 'Choose the correct preposition: "Revenue rose ___ 800 million VND to 900 million VND."', ['from', 'by', 'at', 'of'], 0, 'We use "from" for the starting figure and "to" for the final figure: rose from 800 to 900.'),
    M('A3', 'Language focus · Prepositions of change', 'Choose the correct preposition: "Operating expenses increased ___ 10 million VND, from 200 million to 210 million."', ['to', 'at', 'by', 'in'], 2, 'We use "by" for the size of the change (10 million) and "to" for the final figure.'),
    M('A3', 'Language focus · Comparatives', 'Choose the correct form: "This year\'s gross profit is ___ than last year\'s."', ['more high', 'higher', 'highest', 'the higher'], 1, 'Short adjectives make the comparative with -er + than: higher than.'),
    O('A3', 'Language focus · Order a short report', 'Put the sentences of this report extract in the correct order.', [
      'This report presents the results of Go Viet Furniture for last year.',
      'Firstly, revenue rose to 900 million VND because the company won two new hotel customers.',
      'However, the cost of sales also went up, mainly because wood became more expensive.',
      'As a result, gross profit grew more slowly than revenue.',
      'In conclusion, it was a good year, but the company should watch its costs carefully.',
    ], 'The report starts with its purpose, then gives the first point (Firstly), a contrast (However… also), a result (As a result) and a conclusion (In conclusion).'),
    M('A3', 'Describing data · Trends', 'Go Viet Furniture — revenue two years ago: 800 million VND; revenue last year: 900 million VND. Which sentence correctly describes the data?', ['Revenue rose by 900 million VND.', 'Revenue fell to 800 million VND.', 'Revenue remained stable at 900 million VND.', 'Revenue rose from 800 million to 900 million VND.'], 3, '"From" gives the first figure and "to" the second. "By 900 million" would be the size of the change, which is wrong here.'),
  ]),
  ...READ('A3-r1', 'Reading · A message to staff about the annual results',
    `Go Viet Furniture, Binh Duong — Annual results: a message to all staff

Dear colleagues,

Our financial statements for last year are now ready, and I would like to share the main figures with you.

The income statement shows revenue of 900 million VND, up from 800 million the year before. Most of the increase came from two new hotel customers in Vung Tau. The cost of sales was 540 million VND, so our gross profit was 360 million. After operating expenses of 210 million, including depreciation on our machines, net profit was 150 million VND. This is our best result in five years.

The statement of financial position is also healthy. We bought a new cutting machine in August, so our assets increased, and we repaid part of our bank loan.

However, wood prices are still rising. If this continues, our profit will be under pressure next year. For this reason, we are looking for a second supplier.

Thank you all for your hard work. A bonus will be paid with the January salary.

Mrs Dao Thi Lien, Director`, [
      M('A3', 'Main idea', 'What is the main message of the text?', ['The company had a good year, but rising costs are a risk.', 'The company made a loss and must cut jobs.', 'The company is moving to Vung Tau.', 'The company will stop buying wood.'], 0, 'She reports "our best result in five years", then warns: "However, wood prices are still rising."'),
      M('A3', 'Specific detail', 'Where did most of the increase in revenue come from?', ['A new cutting machine', 'A second wood supplier', 'Two new hotel customers', 'The January bonus'], 2, 'The text says: "Most of the increase came from two new hotel customers in Vung Tau."'),
      M('A3', 'Vocabulary in context', 'In paragraph 3, "healthy" means…', ['good for the body', 'very small', 'difficult to read', 'in good condition'], 3, 'For a business or its accounts, "healthy" means strong and in good condition: assets increased and part of the loan was repaid.'),
      M('A3', 'Inference', 'What can we understand about the four years before last year?', ['Net profit was higher than 150 million VND every year.', 'Net profit was below 150 million VND in each of them.', 'The company had no revenue.', 'The company paid no salaries.'], 1, 'If 150 million is "our best result in five years", the other four years must have been lower.'),
    ]),
  ...LISTEN('A3-l1', 'Listening · Half-year results',
    `Good morning, everyone. I'll be quick. Here are the results for the first half of the year. Revenue was four hundred and eighty million dong. That's about ten per cent higher than the same period last year, so the sales team did a great job. Cost of sales was two hundred and ninety million, and that's the number I'm worried about, because wood is much more expensive now. Gross profit was one hundred and ninety million. Net profit was seventy million, a little lower than last year. So, in my opinion, sales are not the problem. Costs are. Next week I'll meet two new wood suppliers in Dong Nai, and I'll report back at the July meeting.`, [
      M('A3', 'Gist', 'What is the speaker doing?', ['Welcoming new staff', 'Presenting the half-year results', 'Explaining how to use a new machine', 'Asking the bank for a loan'], 1, 'She says: "Here are the results for the first half of the year."'),
      M('A3', 'Specific information', 'What was the net profit for the first half of the year?', ['480 million dong', '290 million dong', '190 million dong', '70 million dong'], 3, 'She says: "Net profit was seventy million, a little lower than last year."'),
      M('A3', 'Speaker\'s opinion', 'In the speaker\'s opinion, what is the main problem?', ['Costs', 'Sales', 'The sales team', 'The July meeting'], 0, 'She says: "sales are not the problem. Costs are."'),
    ]),
  ...SPEAK('A3', 'Speaking · Present the year\'s results',
    'You are the accountant of Go Viet Furniture. Talk for about 1 minute and present last year\'s results to your colleagues.\n• Revenue: 900 million VND (the year before: 800 million)\n• Gross profit: 360 million VND; net profit: 150 million VND\n• One reason for the result and one risk for next year',
    'Good morning, everyone. I would like to present last year\'s results. Revenue rose from 800 million to 900 million VND, mainly because we won two new hotel customers. Gross profit was 360 million, and net profit was 150 million, which is higher than the year before. So it was a good year for Go Viet. However, there is one risk. Wood prices are increasing, so our costs may go up next year. Thank you.',
    'Content: gives the three figures correctly, explains one reason for the result and names one risk for next year'),
  ...WRITE('A3', 'Writing · A short report on the year',
    'You are the accounting assistant at Hoa Mai Bookshop in Hue. Write a short report of about 100 words for the owner, Mr Tung.\nPurpose: summarise this year\'s results.\nUse these notes:\n• revenue 620 million VND (last year 550 million); expenses 480 million VND; net profit 140 million VND\n• reason: more schools bought books from the shop\n• suggestion: open an online shop next year',
    `To: Mr Tung
Subject: Results for the year

This report summarises the results of Hoa Mai Bookshop for this year.

Revenue rose from 550 million VND last year to 620 million VND. The main reason was that more schools bought their books from us. Total expenses were 480 million VND, so the shop made a net profit of 140 million VND. This is a good result for a small shop.

However, most of our sales still come from the shop in Hue. I therefore suggest that we open an online shop next year. In this way, we can reach customers in other cities.

Lan, Accounting Assistant`,
    'Content: reports revenue, expenses and net profit from the notes, gives the reason and ends with the suggestion'),

  /* ---------------- A4 · Costs and break-even (Xoai Vang Dried Mango, Dong Thap) ---------------- */
  ...USE([
    C('A4', 'Vocabulary · Collocation partners', 'Which verb goes with each word or phrase: "make" or "pay"?', ['make …', 'pay …'], [
      ['a profit', 0], ['a loss', 0], ['a decision', 0], ['wages', 1], ['an invoice', 1], ['a supplier', 1],
    ], 'A business makes a profit, a loss or a decision. It pays wages, an invoice or a supplier.'),
    M('A4', 'Vocabulary · Word in context', 'Choose the best word: "The rent is 15 million VND every month, even when the workshop produces nothing. Rent is a ___ cost."', ['variable', 'unit', 'fixed', 'hidden'], 2, '"Every month, even when the workshop produces nothing" means the cost does not change — it is fixed.'),
    M('A4', 'Vocabulary · Fixed phrase', 'Complete the phrase: "The company has to sell 3,000 packs a month just to break ___."', ['even', 'equal', 'level', 'flat'], 0, 'The fixed phrase is "break even": to make no profit and no loss. The noun is "break-even point".'),
    M('A4', 'Language focus · First conditional', 'Choose the correct form: "If we ___ the price, we will sell fewer packs."', ['will raise', 'raised', 'raising', 'raise'], 3, 'First conditional: if + present simple, will + verb. We do not use "will" in the if-clause.'),
    M('A4', 'Language focus · First conditional', 'Choose the correct form: "If sales fall below 3,000 packs next month, the company ___ a loss."', ['made', 'will make', 'making', 'would made'], 1, 'The result clause of the first conditional uses will + base verb: will make.'),
    M('A4', 'Language focus · Unless', 'Choose the best word: "We will not cover our fixed costs ___ we sell at least 3,000 packs."', ['unless', 'so', 'because', 'but'], 0, '"Unless" means "if … not": we will not cover the costs if we do not sell at least 3,000 packs.'),
    O('A4', 'Language focus · Order an email', 'Put the sentences of this email to the owner in the correct order.', [
      'Dear Mr Hai,',
      'I am writing about the price of our dried mango for next season.',
      'At the moment, each pack sells for 50,000 VND and its variable cost is 30,000 VND.',
      'However, sugar and packaging are getting more expensive, so this cost will rise soon.',
      'I therefore suggest that we raise the selling price to 55,000 VND from January.',
      'Please let me know what you think.',
    ], 'Greeting, purpose, present situation, problem (However… "this cost" points back), suggestion (therefore) and a closing request.'),
    M('A4', 'Describing data · Above and below', 'Xoai Vang, March — break-even point: 3,000 packs; actual sales: 3,600 packs. Which sentence correctly describes the data?', ['Sales were just below the break-even point.', 'Sales were exactly at the break-even point.', 'Sales were above the break-even point.', 'Sales were half of the break-even point.'], 2, '3,600 is more than 3,000, so sales were "above" the break-even point.'),
  ]),
  ...READ('A4-r1', 'Reading · Cost report for the owner',
    `Xoai Vang Dried Mango, Cao Lanh, Dong Thap — Cost report for the owner

Xoai Vang makes dried mango in 200-gram packs and sells them to shops in Ho Chi Minh City for 50,000 VND each.

The company's costs are of two kinds. Fixed costs are the same every month: rent for the workshop, salaries for the three office staff and the loan payment for the drying machine. Together they are 60 million VND a month. Variable costs change with output. For each pack, the company spends 30,000 VND on fresh mangoes, sugar, packaging and delivery.

This means that every pack sold gives a contribution of 20,000 VND towards the fixed costs. The break-even point is 3,000 packs a month. At this level the company makes no profit and no loss. Above it, every extra pack adds to profit.

In the dry season, sales are usually about 4,000 packs a month, so the business is safe. In the rainy season, however, fresh mangoes cost more and sales often drop close to 3,000 packs. The owner should plan carefully for these months.`, [
      M('A4', 'Main idea', 'What is the purpose of this report?', ['To advertise dried mango to shops', 'To explain the company\'s costs and its break-even point', 'To ask the bank for a new loan', 'To describe how mangoes are dried'], 1, 'The report describes the two kinds of costs and then the break-even point of 3,000 packs a month.'),
      M('A4', 'Specific detail', 'Which of these is a fixed cost for Xoai Vang?', ['Fresh mangoes', 'Packaging', 'Delivery', 'Rent for the workshop'], 3, 'The text lists the fixed costs: "rent for the workshop, salaries for the three office staff and the loan payment".'),
      M('A4', 'Vocabulary in context', 'In paragraph 2, "output" means…', ['the number of packs the company produces', 'the money the company borrows', 'the door of the workshop', 'the price of one pack'], 0, 'Output is the amount that a business produces. Variable costs "change with output" — with the number of packs made.'),
      M('A4', 'Inference', 'Why should the owner "plan carefully" for the rainy season?', ['Because the workshop closes in the rain', 'Because the rent is higher in those months', 'Because sales may only just cover the costs', 'Because shops in Ho Chi Minh City are closed'], 2, 'In the rainy season "sales often drop close to 3,000 packs" — the break-even level, where there is no profit.'),
    ]),
  ...LISTEN('A4-l1', 'Listening · The rent is going up',
    `Hai: Vy, the landlord called this morning. From next month, the rent is going up by five million dong.
Vy: Hmm. That's a fixed cost, so our break-even point will go up too.
Hai: How many packs do we need to sell then?
Vy: About three thousand two hundred and fifty a month, instead of three thousand.
Hai: That's hard in the rainy season. Should we raise the price?
Vy: I don't think so. If we raise the price, the shops in Ho Chi Minh City will buy from someone else. I think we should try to cut the delivery cost first.
Hai: OK. Can you call the delivery company today and ask for a better price?
Vy: Sure. I'll do it after lunch.`, [
      M('A4', 'Gist', 'What are Hai and Vy discussing?', ['A new product for the rainy season', 'A higher rent and what to do about it', 'A late delivery to Ho Chi Minh City', 'A new member of staff'], 1, 'Hai starts with "the rent is going up", and they discuss how to respond.'),
      M('A4', 'Specific information', 'How many packs a month will the company need to sell to break even after the rent goes up?', ['About 3,000', 'About 3,500', 'About 5,000', 'About 3,250'], 3, 'Vy says: "About three thousand two hundred and fifty a month, instead of three thousand."'),
      M('A4', 'Speaker\'s opinion', 'What does Vy think the company should do first?', ['Try to cut the delivery cost', 'Raise the selling price', 'Move to a cheaper workshop', 'Stop selling in the rainy season'], 0, 'She says "I don\'t think so" about raising the price and adds: "we should try to cut the delivery cost first."'),
    ]),
  ...SPEAK('A4', 'Speaking · The costs of a campus kiosk',
    'Imagine you run a small drinks kiosk on the UEH campus. Talk for about 1 minute about its costs.\n• Two fixed costs\n• Two variable costs\n• What you will do if sales are low (use "If…, I will…")',
    'My kiosk sells iced tea and coffee on campus. It has two main fixed costs: the rent for the space and my assistant\'s salary. I pay these every month, even in the holidays. The variable costs are the cups and the ingredients, like tea, milk and sugar. They go up when I sell more drinks. If sales are low, I will not raise the price. Instead, I will offer a student discount in the afternoon, because more customers will help me cover my fixed costs.',
    'Content: gives two fixed and two variable costs with a short explanation, and one clear action for low sales'),
  ...WRITE('A4', 'Writing · Email with a recommendation',
    'You are Vy, the accountant at Xoai Vang Dried Mango. Write an email of about 100 words to the owner, Mr Hai.\nPurpose: recommend what to do about higher mango prices in the rainy season.\nInclude:\n• the problem (the variable cost of each pack will rise)\n• two possible actions (raise the price to 55,000 VND, or find a cheaper packaging supplier)\n• your recommendation and one reason',
    `Dear Mr Hai,

I am writing about our costs in the rainy season.

From June, fresh mangoes will be more expensive, so the variable cost of each pack will rise. If we do nothing, our profit will fall and we may not reach the break-even point.

There are two possible actions. We can raise the selling price to 55,000 VND, or we can find a cheaper packaging supplier.

I recommend the second option. If we raise the price, some shops will stop buying from us. A supplier in Can Tho has offered a lower price for the same boxes.

Please let me know what you think.

Best regards,
Vy`,
    'Content: explains the problem, presents both options and gives a clear recommendation with a reason'),

  /* ---------------- A5 · Auditing (Dat Mui Seafood, Ca Mau) ---------------- */
  ...USE([
    C('A5', 'Vocabulary · People, documents and actions', 'Sort the words used in an audit: is each one a person, a document or an action?', ['People', 'Documents', 'Actions (verbs)'], [
      ['auditor', 0], ['client', 0], ['shareholder', 0], ['audit report', 1], ['bank statement', 1], ['inspect', 2], ['confirm', 2],
    ], 'Auditor, client and shareholder are people; an audit report and a bank statement are documents; inspect and confirm are things the auditor does.'),
    M('A5', 'Vocabulary · Word in context', 'Choose the best word: "An auditor cannot check a company that belongs to his own family. Auditors have to be ___."', ['dependent', 'material', 'internal', 'independent'], 3, '"Independent" means free from the influence of the client. The prefix in- makes the opposite of "dependent".'),
    M('A5', 'Vocabulary · Word form', 'Choose the correct form: "The auditors asked for more ___ before they signed the report."', ['evident', 'evidence', 'evidently', 'evidences'], 1, 'After "more" we need a noun. "Evidence" is uncountable, so it has no plural -s.'),
    M('A5', 'Language focus · Polite requests', 'Choose the most polite and correct request: "___ send us the bank statements for December, please?"', ['Could you', 'You must', 'Do you', 'Are you'], 0, '"Could you + verb…, please?" is a polite request. "You must" is an order, and "Do you" / "Are you" do not make a request here.'),
    M('A5', 'Language focus · Obligation', 'Choose the best modal verb: "Auditors ___ be independent of the client. It is a rule of the profession."', ['might', 'would', 'must', 'could'], 2, '"It is a rule" shows strong obligation, so we use "must".'),
    M('A5', 'Language focus · No obligation', 'Choose the best form: "You ___ send the paper copies. A scanned file is fine."', ['mustn\'t', 'have to', 'must', 'don\'t have to'], 3, '"A scanned file is fine" means the paper copies are not necessary: don\'t have to. "Mustn\'t" would mean it is forbidden.'),
    O('A5', 'Language focus · Order a process', 'Put the sentences in order to describe an audit visit.', [
      'First, the audit team meets the managers of the client to plan the work.',
      'Next, the auditors ask for the accounting records and the source documents.',
      'When they have these, they check a sample of invoices against the records.',
      'Any problems they find in the sample are discussed with the chief accountant.',
      'Finally, the auditors write their report and give their opinion.',
    ], 'Follow the linking words (First, Next, Finally) and the reference words: "these" points back to the records and documents, and "the sample" to the invoices that were checked.'),
    M('A5', 'Describing data · Quantities', 'Audit sample at Dat Mui Seafood — invoices checked: 40; correct: 38; with errors: 2. Which sentence correctly describes the data?', ['None of the invoices had errors.', 'Most of the invoices in the sample were correct.', 'About half of the invoices had errors.', 'Only a few of the invoices were correct.'], 1, '38 out of 40 is nearly all of them, so "most" is right. "None" is wrong because two invoices had errors.'),
  ]),
  ...READ('A5-r1', 'Reading · Confirming the audit visit',
    `Subject: Audit visit, 12–16 January

Dear Ms Yen,

Thank you for choosing Phuong Nam Audit as the external auditor of Dat Mui Seafood. I am writing to confirm the plan for our visit.

A team of three auditors will work at your office in Ca Mau from Monday 12 to Friday 16 January. On the first morning we would like to meet you and your chief accountant for about an hour. On Tuesday we will be present at the inventory count in your cold store.

During the week we will check a sample of sales invoices, purchase invoices and bank statements. We do not check every document; we choose a sample that is large enough to give us reliable evidence. Could you please prepare the ledgers and bank statements for the year before we arrive?

As you know, auditors must be independent, so our staff cannot accept gifts or free meals. A simple room with a table and internet access is all we need.

We plan to send our audit report by 28 February.

Kind regards,
Tran Quoc Bao, Audit Manager`, [
      M('A5', 'Main idea', 'Why does Mr Bao write this email?', ['To send the final audit report', 'To complain about missing invoices', 'To confirm the arrangements for an audit visit', 'To apply for a job at Dat Mui Seafood'], 2, 'He writes: "I am writing to confirm the plan for our visit."'),
      M('A5', 'Specific detail', 'What will the auditors do on Tuesday?', ['Attend the inventory count in the cold store', 'Meet Ms Yen for an hour', 'Send the audit report', 'Leave Ca Mau'], 0, 'The text says: "On Tuesday we will be present at the inventory count in your cold store."'),
      M('A5', 'Vocabulary in context', 'In paragraph 3, "reliable evidence" is evidence that…', ['is very expensive', 'is written in English', 'comes from the client\'s family', 'can be trusted'], 3, '"Reliable" means that you can trust it or depend on it.'),
      M('A5', 'Writer\'s purpose', 'Why does Mr Bao mention gifts and free meals?', ['He wants the client to book a restaurant.', 'He is politely asking the client not to offer them.', 'He is thanking the client for a gift.', 'He wants to explain the cost of the audit.'], 1, 'He says auditors "must be independent, so our staff cannot accept gifts or free meals" — a polite way to say: please do not offer any.'),
    ]),
  ...LISTEN('A5-l1', 'Listening · A voicemail after the inventory count',
    `Hello Mr Dung, this is Linh from Phuong Nam Audit. I'm calling about the inventory count yesterday. Most of it was fine, thank you. But there's one thing. Your records show one hundred and twenty boxes of frozen shrimp in cold room two. We counted one hundred and twelve. So eight boxes are missing from the count. It may be nothing serious. Perhaps they were moved to the truck before we arrived. Could you check the delivery notes for Tuesday morning and send me a copy? I need them by Thursday, because we're finishing this part of the audit on Friday. You can reach me on oh nine one eight, five five two, four seven six. Thank you. Bye.`, [
      M('A5', 'Gist', 'Why is Linh calling Mr Dung?', ['To thank him for a free lunch', 'To tell him the audit is finished', 'To ask about a difference between the records and the count', 'To order frozen shrimp'], 2, 'The records show 120 boxes but the auditors counted 112, and she asks him to check.'),
      M('A5', 'Specific information', 'How many boxes of frozen shrimp did the auditors count?', ['112', '120', '8', '918'], 0, 'She says: "We counted one hundred and twelve." 120 is the number in the records.'),
      M('A5', 'Next action', 'What does Linh ask Mr Dung to do?', ['Count the boxes again on Friday', 'Check Tuesday morning\'s delivery notes and send a copy', 'Move the boxes to the truck', 'Come to her office on Thursday'], 1, 'She says: "Could you check the delivery notes for Tuesday morning and send me a copy?"'),
    ]),
  ...SPEAK('A5', 'Speaking · What does an auditor do?',
    'A friend from another faculty asks you about auditing. Talk for about 1 minute.\n• What an external auditor does\n• What kind of evidence the auditor looks at\n• Why auditors must be independent',
    'An external auditor is a person from outside the company who checks its financial statements. The auditor looks at evidence, for example a sample of invoices and bank statements, and sometimes attends the inventory count. At the end, the auditor writes a report and gives an opinion. Auditors must be independent. This means they cannot be friends or family of the managers, and they should not accept gifts. If they are not independent, people will not trust the report.',
    'Content: explains the auditor\'s job, gives at least two examples of evidence and a clear reason for independence'),
  ...WRITE('A5', 'Writing · Reply to the audit manager',
    'You are Ms Yen, the director of Dat Mui Seafood. Write an email of about 100 words to Mr Bao, the audit manager at Phuong Nam Audit.\nPurpose: reply to his email about the audit visit on 12–16 January.\nInclude:\n• confirm the dates and the first meeting\n• say that the documents and a room will be ready\n• ask one or two polite questions about the visit',
    `Dear Mr Bao,

Thank you for your email about the audit visit.

I am pleased to confirm that 12 to 16 January is convenient for us. Our chief accountant, Mr Dung, and I will meet your team on Monday morning. The ledgers and bank statements for the year will be ready before you arrive. We have also prepared a quiet room with a table and internet access.

Could you tell me what time your team will arrive on Monday? I would also like to know how many people will attend the inventory count.

I look forward to meeting you.

Kind regards,
Yen`,
    'Content: confirms the dates and meeting, says what will be ready and asks at least one polite question'),
];

const lines = (...l) => l.join('\n');

export const LIB = [
  ['R-ACC-C1', 'case_study', 'A3', 'Year-end accounts for a Đà Lạt homestay', 40, lines(
    'Mr Tung owns Lam Vien Homestay, a six-room guesthouse in Da Lat. He is good with guests but not with numbers. At the end of the year his niece Mai, a first-year accounting student, helps him prepare simple financial statements. The income statement shows revenue of 620 million VND, mostly from weekend guests, and expenses of 480 million VND for cleaning, electricity, breakfast and staff wages. Net profit is 140 million VND, a little higher than last year. The statement of financial position shows the house and furniture as assets and a bank loan of 300 million VND as a liability. Mr Tung is surprised by one line: depreciation of 20 million VND on the furniture. "I did not pay this money to anyone," he says. He also wants to borrow more to build two new rooms, and the bank has asked to see his financial statements in English.',
    '',
    'Language tasks',
    '1. Find five key accounting terms in the text (for example, "revenue"). Explain each one in a simple English sentence of your own.',
    '2. Role-play in pairs (3 minutes): Mai explains depreciation to Mr Tung in simple English. Use these phrases: "Let me explain…", "In other words…", "For example…", "Does that make sense?"',
    '3. Write an email of about 120 words from Mr Tung to the bank manager. Introduce the homestay, give the three main figures from the text and ask politely for a meeting about a new loan.',
    '4. Give a 2-minute spoken summary of the homestay\'s year for a classmate who has not read the text. Use the past simple and at least three linking words (because, so, however).',
  )],
  ['R-ACC-C2', 'case_study', 'A5', 'First audit of a Buôn Ma Thuột coffee exporter', 45, lines(
    'Ban Me Coffee is a family company in Buon Ma Thuot that exports roasted coffee beans to Korea and Japan. This year a foreign investor wants to buy 30 per cent of the company, and she has asked for audited financial statements. It is the company\'s first external audit. The auditors from Tay Nguyen Audit arrive on Monday. The chief accountant, Mr Quang, is nervous. Some purchase invoices from small farmers are handwritten, and a few are missing. The owner, Mrs Hoa, wants to invite the audit team to an expensive dinner to welcome them, but the audit manager politely refuses and explains that auditors must stay independent. On Wednesday the auditors count the inventory in the warehouse and choose a sample of 50 sales invoices to check. They ask Mr Quang to find the missing documents by Friday, because they need evidence before they can give their opinion.',
    '',
    'Language tasks',
    '1. Find five key auditing terms in the text (for example, "sample"). Explain each one in a simple English sentence of your own.',
    '2. Role-play in pairs (3 minutes): the audit manager asks Mr Quang for the missing invoices. Use these phrases: "Could you…?", "Would you mind …ing?", "I\'m afraid…", "By when do you need…?"',
    '3. Write an email of about 120 words from the audit manager to Mrs Hoa. Thank her for the dinner invitation, refuse politely, explain the reason and suggest a short meeting at the office instead.',
    '4. Give a 2-minute spoken summary of the situation: who the people are, what the auditors have done so far and what Mr Quang must do before Friday.',
  )],
  ['R-ACC-G1', 'group_project', 'A4', 'Break-even plan for a campus drinks kiosk', 180, lines(
    'Brief',
    'Your team plans to open a small drinks kiosk on the UEH campus and must explain the plan in English to a group of "investors" (your classmates). The figures are given, so no calculation is needed: rent 5 million VND a month; one part-time assistant 4 million VND a month; cost of each cup 8,000 VND; selling price 20,000 VND; break-even point 750 cups a month. Your task is to describe these costs clearly, using the language of this unit: fixed and variable costs, break-even point, "If we sell…, we will…".',
    '',
    'Deliverables',
    '1. A 5-minute presentation in English (4–6 slides): the kiosk, its fixed and variable costs, the break-even point, and what you will do if sales are low.',
    '2. A one-page report in English (about 250 words) for the investors, with a short introduction, the main figures and a recommendation.',
    '3. A glossary of 12 key terms from the unit, each with a simple English definition and one example sentence about your kiosk.',
    '',
    'Team roles (4–5 students)',
    '- Team leader: plans the work, chairs meetings in English and keeps to the timeline.',
    '- Presenters (1–2): prepare the slides and deliver the presentation.',
    '- Report writer: drafts the one-page report.',
    '- Glossary editor: collects the 12 terms and writes the definitions and examples.',
    '- Language checker: checks grammar, spelling and pronunciation of key terms and numbers.',
    '',
    'Timeline (3 weeks)',
    'Week 1: read the brief, agree on roles, choose the 12 glossary terms and write an outline of the presentation.',
    'Week 2: write the first draft of the report and slides; exchange drafts with another team and give feedback in English.',
    'Week 3: correct the drafts, rehearse the presentation twice, then present and answer questions.',
    '',
    'Assessment (100 points)',
    'Content (30): the costs, break-even point and plan are explained completely and clearly.',
    'Language accuracy and vocabulary (30): correct B1 grammar, conditionals and unit vocabulary in the report, slides and glossary.',
    'Delivery / pronunciation (20): clear voice, steady pace, numbers and key terms pronounced correctly.',
    'Teamwork and Q&A (20): every member takes part; questions are answered in English.',
  )],
  ['R-ACC-G2', 'group_project', 'A2', 'Keeping the books for a student club event', 180, lines(
    'Brief',
    'The UEH English Club is organising a charity music night, and your team are the treasurers. Make a list of 8–10 simple transactions for the event (for example: ticket sales, a sponsor\'s payment, hall rental, drinks, printing posters). You do not need to prepare real accounts. Your task is to explain in English how these transactions are recorded and checked, using the language of this unit: invoice, receipt, journal, ledger, debit, credit, trial balance, and the passive ("Each receipt is recorded…").',
    '',
    'Deliverables',
    '1. A 5-minute presentation in English (4–6 slides): the event, the documents you keep, how each transaction is recorded, and how you check for errors.',
    '2. A one-page report in English (about 250 words) for the club president, describing the recording process step by step.',
    '3. A glossary of 12 key terms from the unit, each with a simple English definition and one example sentence about the event.',
    '',
    'Team roles (4–5 students)',
    '- Team leader: plans the work, chairs meetings in English and keeps to the timeline.',
    '- Presenters (1–2): prepare the slides and deliver the presentation.',
    '- Report writer: drafts the one-page report.',
    '- Glossary editor: collects the 12 terms and writes the definitions and examples.',
    '- Language checker: checks grammar, spelling and pronunciation of key terms and numbers.',
    '',
    'Timeline (3 weeks)',
    'Week 1: agree on roles, write the list of transactions, choose the 12 glossary terms and write an outline of the presentation.',
    'Week 2: write the first draft of the report and slides; exchange drafts with another team and give feedback in English.',
    'Week 3: correct the drafts, rehearse the presentation twice, then present and answer questions.',
    '',
    'Assessment (100 points)',
    'Content (30): the documents, the recording process and the checks are explained completely and clearly.',
    'Language accuracy and vocabulary (30): correct B1 grammar, passive forms and unit vocabulary in the report, slides and glossary.',
    'Delivery / pronunciation (20): clear voice, steady pace, numbers and key terms pronounced correctly.',
    'Teamwork and Q&A (20): every member takes part; questions are answered in English.',
  )],
];

import { C, O, N, W, M, CASE } from './helpers.js';

// Accounting A1–A5: extra workbook exercises and library resources. Figures are illustrative.
export const EXTRA = [
  /* ---------------- A1 · Accounting concepts & the accounting equation ---------------- */
  M('A1', 'Spot the liability', 'Which of these is a liability for a small trading business?',
    ['Inventory', 'Amounts owed to a supplier', "Owner's capital", 'Trade receivables'], 1,
    'A liability is an amount the business owes. Inventory and receivables are assets; capital is equity.'),
  M('A1', 'Unpaid electricity', 'Electricity used in December is paid in January, but it is recorded as a December expense. Which concept is applied?',
    ['Going concern', 'Business entity', 'Prudence', 'Accruals (matching)'], 3,
    'The accruals concept records expenses in the period they are incurred, not when cash is paid.'),
  N('A1', 'Find total assets', 'A shop in Biên Hòa has liabilities of 410 million VND and equity of 690 million VND. What are its total assets?', 1100, 'million VND',
    'Assets = Liabilities + Equity = 410 + 690 = 1,100.'),
  M('A1', 'Owner drawings', 'The owner takes 10 million VND cash from the business for personal use. What is the effect on the accounting equation?',
    ['Assets and equity both decrease', 'Assets decrease and liabilities increase', 'Assets increase and equity decreases', 'There is no effect'], 0,
    'Cash (an asset) falls by 10 and drawings reduce equity by 10, so both sides fall equally.'),
  C('A1', 'Effect on total assets', 'Does each transaction increase, decrease or not change TOTAL ASSETS?', ['Increases total assets', 'Decreases total assets', 'No change in total assets'],
    [['Buy inventory on credit', 0], ['Pay a supplier in cash', 1], ['Buy a computer for cash', 2], ['Receive cash from a credit customer', 2], ['The owner invests extra cash', 0], ['Pay staff wages in cash', 1], ['Take out a bank loan', 0]],
    'If only assets swap (cash for a computer), the total is unchanged. Assets rise when a liability or equity rises with them, and fall when cash leaves to settle a debt or an expense.'),
  M('A1', 'Land at historical cost', 'A company bought land in Long An in 2015 for 2 billion VND. It is now worth about 5 billion VND. Under the historical cost concept it is recorded at…',
    ['5 billion VND', '3 billion VND', '2 billion VND', 'The average of 2 and 5 billion VND'], 2,
    'Historical cost records assets at the price paid, because that figure is objective and can be verified.'),
  C('A1', 'Which concept?', 'Match each practice to the accounting concept it applies.', ['Business entity', 'Accruals', 'Going concern', 'Prudence'],
    [["The owner's family holiday is not recorded as a business expense", 0], ['December wages paid on 5 January are shown as a December expense', 1], ['Equipment is shown at cost less depreciation, not at its forced-sale value', 2], ['A likely loss on a customer lawsuit is recognised now', 3], ["Rent received in advance for next year is not counted as this year's revenue", 1], ["The owner's personal motorbike is excluded from the business's assets", 0]],
    'Entity separates owner and business; accruals matches income and expenses to periods; going concern assumes continued trading; prudence avoids overstating assets and profit.'),
  M('A1', 'A doubtful customer', 'A customer owing 30 million VND has gone bankrupt and is unlikely to pay. Which concept requires the business to recognise the likely loss now?',
    ['Consistency', 'Prudence', 'Materiality', 'Historical cost'], 1,
    'Prudence means losses that are likely are recognised as soon as they are expected, so assets and profit are not overstated.'),
  N('A1', 'Closing equity', 'At the start of the year a business has assets of 500 million VND and liabilities of 200 million VND. During the year it makes a profit of 80 million, the owner adds 50 million of capital and withdraws 30 million. What is closing equity?', 400, 'million VND',
    'Opening equity = 500 − 200 = 300. Closing equity = 300 + 80 + 50 − 30 = 400.'),
  N('A1', 'Working back to profit', 'Equity at the start of the year was 400 million VND. At the end of the year assets are 1,250 million and liabilities 700 million. The owner added no capital but withdrew 20 million. What was the profit for the year?', 170, 'million VND',
    'Closing equity = 1,250 − 700 = 550, an increase of 150. Drawings reduced equity by 20, so profit = 150 + 20 = 170.'),
  ...CASE('A1-mc1', 'Opening a restaurant in Đà Nẵng',
    'Lan has worked as a chef in Đà Nẵng for eight years and opens her own restaurant, Bếp Nhà Lan, in March. She pays 300 million VND of her savings into a new business bank account and the business borrows 200 million VND from a bank. The restaurant then buys kitchen equipment for 150 million VND, paid from the bank account, and buys rice, meat and vegetables worth 40 million VND on credit from a wholesaler. Lan also pays her family\'s apartment rent of 12 million VND from her personal account. She asks you to explain how her first-month transactions fit the accounting equation before she opens to customers.',
    [
      N('A1', 'Total assets', 'After the four business transactions, what are the total assets of Bếp Nhà Lan?', 540, 'million VND',
        'Bank = 300 + 200 − 150 = 350; equipment 150; inventory 40. Total assets = 350 + 150 + 40 = 540.'),
      N('A1', 'Total liabilities', 'What are the total liabilities of Bếp Nhà Lan?', 240, 'million VND',
        'Bank loan 200 + amount owed to the wholesaler 40 = 240. Check: 540 = 240 + equity 300.'),
      M('A1', 'The family rent', "Why is the 12 million VND family rent NOT recorded in the restaurant's accounts?",
        ['Because of the going-concern concept', 'Because it is not material', 'Because of the business entity concept', 'Because it was paid in cash'], 2,
        "The business entity concept treats the restaurant as separate from its owner, so Lan's personal spending is excluded."),
    ]),

  /* ---------------- A2 · Double-entry recording & the trial balance ---------------- */
  M('A2', 'Normal credit balance', 'Which account normally has a CREDIT balance?',
    ['Rent expense', 'Equipment', 'Trade receivables', 'Sales revenue'], 3,
    'Revenue increases equity, so it is recorded and normally carries a balance on the credit side.'),
  M('A2', 'Paying electricity', 'A shop pays its electricity bill by bank transfer. Which entry is correct?',
    ['Dr Bank / Cr Electricity', 'Dr Electricity / Cr Bank', 'Dr Electricity / Cr Payables', 'Dr Payables / Cr Bank'], 1,
    'The expense increases (debit) and the bank asset decreases (credit).'),
  C('A2', 'Normal balances', 'Does each account normally have a debit or a credit balance?', ['Debit balance', 'Credit balance'],
    [['Drawings', 0], ['Bank loan', 1], ['Purchases', 0], ['Commission received', 1], ['Trade receivables', 0], ['Trade payables', 1], ["Owner's capital", 1]],
    'Assets, expenses and drawings have debit balances; liabilities, capital and income have credit balances.'),
  M('A2', 'Owner takes cash', 'The owner takes 5 million VND cash from the business for personal use. Which entry is correct?',
    ['Dr Cash / Cr Drawings', 'Dr Wages / Cr Cash', 'Dr Drawings / Cr Cash', 'Dr Cash / Cr Capital'], 2,
    'Drawings reduce equity and are debited; the cash asset falls, so it is credited. It is not a business expense such as wages.'),
  O('A2', 'From invoice to trial balance', 'Put the steps for recording a credit sale in the correct order.',
    ['Issue the sales invoice to the customer', 'Record the invoice in the sales day book (journal)', "Post to the Sales account and the customer's receivable account", 'Balance off the ledger accounts at month end', 'List the balances in the trial balance'],
    'The source document comes first, then the book of prime entry, then the ledger; balances are taken out only at the end of the period.'),
  M('A2', 'Goods returned', 'A credit customer in Bắc Ninh returns faulty goods worth 3 million VND. Which entry records the return?',
    ['Dr Sales returns / Cr Trade receivables', 'Dr Trade receivables / Cr Sales returns', 'Dr Purchases returns / Cr Trade payables', 'Dr Cash / Cr Sales'], 0,
    'Sales returns reduce revenue (debit) and the customer now owes less (credit receivables).'),
  N('A2', 'Balancing a ledger account', 'The receivables account opens the month with a debit balance of 40 million VND. Credit sales are 120 million, customers pay 95 million and goods worth 5 million are returned. What is the closing debit balance?', 60, 'million VND',
    'Debits 40 + 120 = 160; credits 95 + 5 = 100. Closing balance = 160 − 100 = 60 debit.'),
  M('A2', 'Classify the error', 'A repair to the shop roof costing 4 million VND is recorded as Dr Equipment 4 / Cr Bank 4. This is an error of…',
    ['Omission', 'Principle', 'Original entry', 'Complete reversal'], 1,
    'An expense has been treated as an asset (wrong class of account). Debits still equal credits, so the trial balance will not reveal it.'),
  N('A2', 'Missing capital figure', 'A trial balance shows debits of Cash 30, Equipment 300, Inventory 70 and Expenses 50, and credits of Payables 45, Bank loan 100 and Sales 165 (million VND). The capital balance is missing. What is it?', 140, 'million VND',
    'Total debits = 30 + 300 + 70 + 50 = 450. Credits without capital = 45 + 100 + 165 = 310. Capital = 450 − 310 = 140.'),
  N('A2', 'One-sided posting error', 'A credit sale of 7,200,000 VND was posted correctly to the Sales account but entered in the receivables account as 2,700,000 VND. By how much will the trial balance totals differ?', 4500, 'thousand VND',
    'Debit 2,700 vs credit 7,200 → difference 4,500 thousand VND. A difference divisible by 9 often signals transposed digits.'),
  W('A2', 'Why two entries?', 'A new shop owner in Hội An asks why every transaction needs two entries. Explain, using the purchase of a 20 million VND fridge on credit.',
    'Under the dual aspect, every transaction affects at least two accounts: something is received and something is given or owed. Buying a fridge on credit increases equipment, an asset, so Equipment is debited 20 million; the shop now owes the supplier, so Payables is credited 20 million. Because debits always equal credits, the accounting equation stays in balance and the trial balance can check arithmetic accuracy.',
    ['Explains the dual aspect (two accounts, equal debits and credits)', 'Correct entry: Dr Equipment 20m / Cr Payables 20m', 'Links to the accounting equation or trial balance check'], 90),
  ...CASE('A2-mc1', 'First week at a tea shop in Cần Thơ',
    'Minh opens Trà Xanh Cần Thơ, a small shop selling packaged tea, on 1 June. During the first week: (1) Minh pays 150 million VND of his own money into the business bank account as capital; (2) the shop buys tea for resale worth 60 million VND on credit from a supplier in Lâm Đồng; (3) cash sales of 25 million VND are paid into the bank; (4) the shop pays rent of 8 million VND by bank transfer. Minh uses a simple periodic system: goods bought for resale go to a Purchases account and cost of sales is worked out at month end. He wants to check his bookkeeping before he hires an accountant.',
    [
      M('A2', 'Recording the tea purchase', 'Which entry correctly records transaction (2)?',
        ['Dr Payables 60 / Cr Purchases 60', 'Dr Purchases 60 / Cr Bank 60', 'Dr Purchases 60 / Cr Payables 60', 'Dr Bank 60 / Cr Payables 60'], 2,
        'Purchases (an expense of goods for resale) increase on the debit side; the amount owed to the supplier increases on the credit side. No cash moves yet.'),
      N('A2', 'Bank balance', 'What is the balance on the bank account at the end of the week?', 167, 'million VND',
        'Bank = 150 + 25 − 8 = 167. The credit purchase does not affect the bank.'),
      N('A2', 'Trial balance total', 'Minh extracts a trial balance at the end of the week. What is the total of each column?', 235, 'million VND',
        'Debits: Bank 167 + Purchases 60 + Rent 8 = 235. Credits: Capital 150 + Payables 60 + Sales 25 = 235.'),
    ]),

  /* ---------------- A3 · Preparing financial statements ---------------- */
  M('A3', 'Non-current asset', 'Which of these is a non-current asset?',
    ['Trade receivables', 'Inventory', 'Factory building', 'Cash at bank'], 2,
    'Non-current assets are held for use over more than one year. The others are current assets.'),
  M('A3', 'What gross profit deducts', 'Gross profit is revenue minus…',
    ['Operating expenses', 'Cost of sales', 'All expenses including tax', 'Depreciation only'], 1,
    'Gross profit shows the margin on trading: revenue less the cost of the goods sold. Operating expenses are deducted afterwards.'),
  C('A3', 'Classify the balances', 'Classify each item in the statement of financial position.', ['Current asset', 'Non-current asset', 'Current liability', 'Non-current liability'],
    [['Inventory of rice', 0], ['Delivery truck', 1], ['Wages owed to staff', 2], ['Five-year bank loan', 3], ['Trade receivables', 0], ['Land use right for 50 years', 1], ['Tax payable next month', 2]],
    'Current items are expected to be used, received or paid within 12 months; non-current items last longer than that.'),
  N('A3', 'Cost of sales', 'A shop has opening inventory of 80 million VND, purchases of 600 million and closing inventory of 100 million. What is cost of sales?', 580, 'million VND',
    'Cost of sales = opening inventory + purchases − closing inventory = 80 + 600 − 100 = 580.'),
  M('A3', 'An unpaid bill', 'Electricity of 6 million VND for December is unpaid at the 31 December year end. In the year-end statements it appears as…',
    ['Nothing until it is paid', 'A current asset only', 'An expense and a current liability', 'A reduction in revenue'], 2,
    'Under accruals the December cost is an expense of this year, and the amount owed is an accrual (current liability).'),
  M('A3', 'Rent paid in advance', 'On 1 October a shop in Huế pays 36 million VND for 12 months of rent. The year ends on 31 December. What is the rent expense for this year?',
    ['36 million VND', '27 million VND', '12 million VND', '9 million VND'], 3,
    'Only 3 months (October–December) belong to this year: 36 × 3/12 = 9. The other 27 is a prepayment (current asset).'),
  O('A3', 'From trial balance to statements', 'Put the steps for preparing year-end financial statements in order.',
    ['Extract the trial balance', 'Make year-end adjustments (depreciation, accruals, prepayments, closing inventory)', 'Prepare the income statement to find profit', 'Add the profit to retained earnings in equity', 'Prepare the statement of financial position'],
    'Adjustments must be made before profit is calculated, and profit must be known before equity in the statement of financial position can be completed.'),
  M('A3', 'Part of equity', 'Which item is part of EQUITY in the statement of financial position?',
    ['Retained earnings', 'Bank overdraft', 'Trade payables', 'Accrued wages'], 0,
    'Retained earnings are profits kept in the business and belong to the owners. The others are liabilities.'),
  N('A3', 'Reducing-balance depreciation', 'A machine costs 200 million VND and is depreciated at 20% per year on the reducing-balance method. What is the depreciation charge in YEAR 2?', 32, 'million VND',
    'Year 1: 200 × 20% = 40, carrying amount 160. Year 2: 160 × 20% = 32.'),
  ...CASE('A3-mc1', 'Year-end at a Bình Dương furniture maker',
    'Mộc An Furniture makes wooden tables and chairs in Bình Dương and sells to shops in Ho Chi Minh City. For the year ended 31 December 2025 its records show revenue of 2,400 million VND, cost of sales of 1,560 million, salaries of 380 million, factory rent of 120 million and interest on a bank loan of 30 million. On 1 January 2025 it bought a delivery van for 500 million VND. The van is expected to last 5 years and be sold for 50 million at the end. The company uses straight-line depreciation and has not yet recorded any depreciation for the year.',
    [
      N('A3', 'Van depreciation', 'What is the depreciation charge on the van for 2025?', 90, 'million VND',
        '(Cost − residual value) ÷ useful life = (500 − 50) ÷ 5 = 90.'),
      N('A3', 'Net profit', 'After charging depreciation, what is the net profit for 2025?', 220, 'million VND',
        'Gross profit = 2,400 − 1,560 = 840. Expenses = 380 + 120 + 90 + 30 = 620. Net profit = 840 − 620 = 220.'),
      M('A3', 'Van in the balance sheet', 'At what carrying amount is the van shown in the statement of financial position at 31 December 2025?',
        ['450 million VND', '410 million VND', '500 million VND', '90 million VND'], 1,
        'Carrying amount = cost − accumulated depreciation = 500 − 90 = 410. The residual value only affects the yearly charge.'),
    ]),

  /* ---------------- A4 · Cost accounting & break-even analysis ---------------- */
  M('A4', 'A mixed cost', 'Which of these is a semi-variable (mixed) cost?',
    ['Factory rent', 'Raw cotton', 'A phone bill with a fixed monthly fee plus a charge per minute', "The accountant's fixed salary"], 2,
    'A semi-variable cost has a fixed part that is paid anyway and a variable part that rises with activity.'),
  C('A4', 'Cost behaviour at a garment workshop', 'Classify each cost for a garment workshop in Thủ Đức.', ['Fixed', 'Variable', 'Semi-variable'],
    [['Fabric', 1], ['Factory rent', 0], ['Piece-rate pay for sewers', 1], ['Electricity: fixed connection fee plus usage', 2], ["Supervisor's monthly salary", 0], ['Machine insurance', 0], ['Salesperson: base salary plus commission', 2]],
    'Variable costs rise with each shirt made; fixed costs stay the same in the short run; semi-variable costs combine both.'),
  M('A4', 'C/S ratio', 'A product sells for 200,000 VND and has a variable cost of 120,000 VND. What is the contribution-to-sales (C/S) ratio?',
    ['60%', '80%', '166%', '40%'], 3,
    'Contribution = 80,000. C/S ratio = 80,000 ÷ 200,000 = 40%.'),
  M('A4', 'Higher rent', 'A shop in Hà Nội faces a rent increase. Price and variable cost per unit are unchanged. What happens to its break-even output?',
    ['Break-even output rises', 'Break-even output falls', 'Contribution per unit rises', 'There is no effect'], 0,
    'Break-even = fixed costs ÷ contribution per unit. Higher fixed costs with the same contribution need more units.'),
  O('A4', 'Break-even step by step', 'Put the steps of a break-even analysis in order.',
    ['Separate costs into fixed and variable', 'Calculate variable cost per unit', 'Calculate contribution per unit (price − variable cost)', 'Divide total fixed costs by contribution per unit', 'Compare break-even output with expected sales (margin of safety)'],
    'Contribution can only be found once costs are split, and the margin of safety needs the break-even figure first.'),
  M('A4', 'High-low method', 'A workshop\'s total cost is 90 million VND at 2,000 units and 120 million VND at 3,000 units. Using the high-low method, what is the variable cost per unit?',
    ['40,000 VND', '45,000 VND', '30,000 VND', '60,000 VND'], 2,
    '(120,000,000 − 90,000,000) ÷ (3,000 − 2,000) = 30,000 VND per unit.'),
  N('A4', 'High-low: fixed cost', 'Using the same workshop (90 million VND total cost at 2,000 units; variable cost 30,000 VND per unit), what are its fixed costs?', 30, 'million VND',
    'Fixed cost = 90,000,000 − 2,000 × 30,000 = 90,000,000 − 60,000,000 = 30,000,000 VND.'),
  N('A4', 'Break-even revenue', 'A printing shop in Đà Nẵng has monthly fixed costs of 84 million VND and a C/S ratio of 35%. What sales revenue does it need to break even?', 240, 'million VND',
    'Break-even revenue = fixed costs ÷ C/S ratio = 84 ÷ 0.35 = 240.'),
  N('A4', 'Price to break even', 'A food stall has fixed costs of 45 million VND per month and a variable cost of 70,000 VND per meal set. What selling price would make it break even at exactly 1,500 sets a month?', 100000, 'VND',
    'Needed contribution per set = 45,000,000 ÷ 1,500 = 30,000. Price = 70,000 + 30,000 = 100,000 VND.'),
  ...CASE('A4-mc1', 'Dried mango from Đồng Tháp',
    'Ngon Sấy is a small company in Đồng Tháp that makes dried mango and sells it in 500 g bags to shops and online. Its monthly fixed costs (factory rent, salaried staff, drying-machine depreciation) are 120 million VND. Each bag sells for 80,000 VND, and the variable cost of fresh mango, packaging and delivery is 50,000 VND per bag. The company currently sells 5,000 bags a month. A supermarket chain offers to stock the product nationwide, but only if Ngon Sấy cuts its price to 75,000 VND per bag for all customers. The director wants to know how safe the business is today and what the price cut would do.',
    [
      N('A4', 'Break-even bags', 'At the current price, how many bags must Ngon Sấy sell each month to break even?', 4000, 'bags',
        'Contribution = 80,000 − 50,000 = 30,000. Break-even = 120,000,000 ÷ 30,000 = 4,000 bags.'),
      N('A4', 'Margin of safety', 'What is the margin of safety as a percentage of current sales?', 20, '%',
        '(5,000 − 4,000) ÷ 5,000 = 1,000 ÷ 5,000 = 20%.'),
      M('A4', 'After the price cut', 'If the price falls to 75,000 VND per bag, what is the new break-even output?',
        ['4,000 bags', '4,800 bags', '6,000 bags', '1,600 bags'], 1,
        'New contribution = 75,000 − 50,000 = 25,000. Break-even = 120,000,000 ÷ 25,000 = 4,800 bags, so the margin of safety at 5,000 bags shrinks to 4%.'),
    ]),

  /* ---------------- A5 · Auditing fundamentals ---------------- */
  M('A5', 'Missing evidence, wide effect', 'An auditor cannot obtain sufficient evidence, and the possible effects on the financial statements could be both material and pervasive. Which opinion is issued?',
    ['Qualified opinion', 'Adverse opinion', 'Disclaimer of opinion', 'Unmodified opinion with an emphasis of matter'], 2,
    'When the auditor cannot get enough evidence and the possible effect is pervasive, they cannot form an opinion and issue a disclaimer.'),
  M('A5', 'Internal auditor', 'Which description fits an INTERNAL auditor?',
    ['An independent firm that gives an opinion to shareholders', 'A tax officer who checks VAT returns', 'A bank officer who reviews loan applications', 'An employee who reviews controls and reports to management or the audit committee'], 3,
    'Internal auditors work for the organisation and help improve controls; external auditors are independent and report to shareholders.'),
  M('A5', 'Which risk?', 'The risk that the auditor\'s own procedures fail to detect a material misstatement is called…',
    ['Detection risk', 'Inherent risk', 'Control risk', 'Business risk'], 0,
    'Audit risk = inherent risk × control risk × detection risk. Only detection risk depends on the auditor\'s work.'),
  O('A5', 'Deciding the opinion', 'Put the auditor\'s steps for reaching an opinion on misstatements in order.',
    ['Identify misstatements found during testing', 'Ask management to correct them', 'Evaluate the uncorrected misstatements against materiality', 'Decide whether any material effect is pervasive', 'Choose the type of audit opinion'],
    'Management is first given the chance to correct errors; only what remains uncorrected is judged against materiality and pervasiveness to choose the opinion.'),
  M('A5', 'Testing completeness', 'To test whether ALL purchases have been recorded (completeness), the auditor should trace…',
    ['Goods received notes to the purchases ledger', 'The purchases ledger to goods received notes', 'The bank statement to the sales ledger', 'Board minutes to the payroll'], 0,
    'Starting from evidence that goods arrived and checking they reach the ledger finds omissions. Tracing the other way tests existence, not completeness.'),
  C('A5', 'Which assertion?', 'Each procedure mainly tests one assertion. Classify them.', ['Existence', 'Completeness', 'Valuation'],
    [['Physically inspect the trucks listed in the fixed-asset register', 0], ['Check that all December supplier invoices are in the payables ledger', 1], ['Review old receivables for amounts that will not be collected', 2], ['Confirm a customer balance directly with the customer', 0], ['Trace late-December goods received notes into purchases', 1], ['Compare the cost of inventory with its current selling price', 2]],
    'Existence: recorded items are real. Completeness: nothing is left out. Valuation: items are shown at the right amount.'),
  M('A5', 'Ten years with one client', 'The audit partner has audited the same client for 10 years and is close friends with its CFO. Which threat to independence is this?',
    ['Self-review', 'Familiarity', 'Advocacy', 'Intimidation'], 1,
    'A long, close relationship makes the auditor too trusting of the client. Rotating the partner is the usual safeguard.'),
  N('A5', 'Materiality from revenue', 'An auditor sets overall materiality at 0.5% of revenue. Revenue is 250 billion VND. What is overall materiality?', 1.25, 'billion VND',
    '250 × 0.5% = 1.25 billion VND.'),
  N('A5', 'Projecting a sample error', 'An auditor tests a sample of sales invoices worth 400 million VND and finds overstatements of 6 million VND. The whole population is worth 20,000 million VND. Using the ratio method, what is the projected misstatement?', 300, 'million VND',
    'Error rate = 6 ÷ 400 = 1.5%. Projected misstatement = 1.5% × 20,000 = 300.'),
  N('A5', 'Fee dependence', 'An audit firm in Ho Chi Minh City earns total annual fees of 50 billion VND, of which 9 billion VND come from one listed client. What percentage of its fees comes from this client?', 18, '%',
    '9 ÷ 50 × 100 = 18%. Such high dependence is a self-interest threat; ethics codes treat around 15% from one listed client as a warning sign.'),
  W('A5', 'Reasonable assurance', 'Explain why an external audit gives reasonable, not absolute, assurance that the financial statements are free from material misstatement.',
    'Auditors test samples, not every transaction, because checking everything would be too slow and costly. Many figures, such as depreciation or doubtful debts, rely on estimates and judgement. Evidence is often persuasive rather than conclusive, and fraud may be hidden by collusion or forged documents. So the auditor gives a high but not absolute level of assurance; an audit cannot guarantee the statements are error-free.',
    ['Mentions sampling / cost of testing everything', 'Gives a second limitation (judgement, estimates, persuasive evidence, collusion or fraud)', 'Concludes that assurance is high but not a guarantee'], 90),
  ...CASE('A5-mc1', 'Audit of a Cà Mau seafood company',
    'Sao Mai Seafood JSC processes frozen shrimp in Cà Mau and is listed on the Ho Chi Minh City Stock Exchange, so its annual financial statements must be audited. For 2025 it reports revenue of 1,600 billion VND and profit before tax of 80 billion VND. The audit team sets overall materiality at 5% of profit before tax. During fieldwork the auditors find two errors: closing inventory is overstated by 2.6 billion VND because damaged shrimp was not written down, and a 1.8 billion VND electricity bill for December was not recorded. Management agrees the errors exist but refuses to correct them, saying the amounts are small compared with revenue.',
    [
      N('A5', 'Overall materiality', 'What is overall materiality for the Sao Mai audit?', 4, 'billion VND',
        '5% × 80 billion = 4 billion VND.'),
      N('A5', 'Total misstatement', 'What is the total of the uncorrected misstatements found?', 4.4, 'billion VND',
        '2.6 + 1.8 = 4.4 billion VND, which is above materiality of 4 billion.'),
      M('A5', 'Which opinion?', 'The misstatements are material but limited to inventory and expenses, so they are not pervasive. Which opinion should the auditor give if management still refuses to correct them?',
        ['Unmodified opinion', 'Qualified ("except for") opinion', 'Adverse opinion', 'Disclaimer of opinion'], 1,
        'A material but not pervasive misstatement leads to a qualified opinion. An adverse opinion is for pervasive misstatement; a disclaimer is for lack of evidence.'),
    ]),
];

export const LIB = [
  ['R-ACC-C1', 'case_study', 'A3', 'Year-end accounts for a Đà Lạt homestay', 40,
    'Đồi Thông Homestay is a 14-room family business in Đà Lạt run by Mrs Hạnh and her son. Most guests book through online travel agencies, and the homestay also earns commission by selling day tours to nearby flower farms and waterfalls.\n' +
    'For the year ended 31 December 2025 the records show room revenue of 1,850 million VND and tour commission of 150 million VND. Expenses paid were: cleaning and breakfast supplies 420 million, staff wages 540 million, electricity and water 160 million, and online agency commission and advertising 220 million. On 1 January 2025 the family spent 1,200 million VND renovating the building; the renovation is expected to last 10 years with no residual value. A bank loan of 800 million VND carries interest of 9% per year, all paid in 2025.\n' +
    'Mrs Hạnh says the business made a profit of 660 million VND, because she simply took total revenue minus the four expense bills listed above. Her son is not sure this is right and the bank wants a proper set of statements before renewing the loan.\n\n' +
    '1. Calculate the annual depreciation on the renovation and the interest for 2025.\n' +
    '2. Prepare an income statement for 2025 and find the net profit.\n' +
    "3. Explain why Mrs Hạnh's figure of 660 million VND is wrong.\n" +
    '4. Show how the renovation appears in the statement of financial position at 31 December 2025.\n' +
    '5. Advise the family on one way to improve profit next year, using the figures.'],
  ['R-ACC-C2', 'case_study', 'A5', 'First audit of a Buôn Ma Thuột coffee exporter', 45,
    'Hạt Vàng Coffee JSC buys green coffee from farmers in Đắk Lắk and exports it to Europe and Japan. It plans to list on the stock exchange in two years, so this year it has appointed an independent audit firm for the first time. For 2025 the company reports revenue of 900 billion VND and profit before tax of 36 billion VND.\n' +
    'Inventory of 210 billion VND is held in three warehouses, one of which is rented from a relative of the chairman. Coffee prices fell sharply in the last quarter, and some beans have been in storage for more than a year. The finance team counts inventory only once a year and records most purchases from farmers on handwritten receipts.\n' +
    "The audit manager notices that the company's chief accountant is the brother of an audit senior who has been assigned to the engagement. The CEO has also asked the audit firm to design a new accounting system next year.\n\n" +
    '1. Set overall materiality using 5% of profit before tax, and explain why profit is a sensible benchmark here.\n' +
    '2. Identify three areas of high audit risk in the case and explain why each is risky.\n' +
    '3. Identify two threats to independence and suggest a safeguard for each.\n' +
    '4. Describe three audit procedures for inventory.\n' +
    '5. Explain what opinion the auditor might give if inventory in one warehouse cannot be counted.'],
  ['R-ACC-G1', 'group_project', 'A4', 'Break-even plan for a campus drinks kiosk', 180,
    'Brief\n' +
    'The student union plans to open a drinks kiosk (iced coffee, milk tea, fruit juice) on a UEH campus and has asked your team to test whether it can make money.\n' +
    '- Collect real prices for ingredients, cups and equipment from at least two suppliers or markets in Ho Chi Minh City.\n' +
    '- Assume rent of 6 million VND per month and two part-time staff paid by the hour.\n' +
    '- Recommend prices and the number of drinks needed per day to break even.\n' +
    '\n' +
    'Deliverables\n' +
    '- A spreadsheet with a cost table (fixed, variable, semi-variable), contribution per drink and a break-even chart.\n' +
    '- A short survey of at least 40 students on price and daily demand.\n' +
    '- A 4-page report with a recommendation and a sensitivity test (price −10%, ingredient cost +15%).\n' +
    '- A 10-minute presentation to the class.\n' +
    '\n' +
    'Team roles (4–5 students)\n' +
    '- Project leader: plans tasks, keeps minutes and checks deadlines.\n' +
    '- Cost researcher: collects supplier prices and builds the cost table.\n' +
    '- Market researcher: designs and runs the student survey.\n' +
    '- Analyst: builds the break-even model and sensitivity tests in the spreadsheet.\n' +
    '- Editor/presenter (or shared): writes the report and designs the slides.\n' +
    '\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: agree the menu, collect cost data, run the survey.\n' +
    '- Week 2: build the spreadsheet, calculate break-even and margin of safety, test scenarios.\n' +
    '- Week 3: write the report, rehearse and present.\n' +
    '\n' +
    'Assessment (100 points)\n' +
    '- Accuracy of cost classification and calculations: 30\n' +
    '- Quality of market data and assumptions: 20\n' +
    '- Sensitivity analysis and recommendation: 25\n' +
    '- Report and presentation: 15\n' +
    '- Teamwork (peer assessment): 10'],
  ['R-ACC-G2', 'group_project', 'A2', 'Keeping the books for a student club event', 180,
    'Brief\n' +
    "Your team acts as the accounting team for a UEH student club running a two-day charity book fair. You will record the event's money from start to finish.\n" +
    '- The lecturer gives you a pack of 25 source documents: sponsor contributions, ticket and book sales, printing, venue hire, snacks and transport receipts.\n' +
    '- Record every transaction with double entry and prove that the books balance.\n' +
    '- Report the result to the club committee in plain language.\n' +
    '\n' +
    'Deliverables\n' +
    '- A general journal and ledger in Excel or Google Sheets (SUMIF formulas allowed).\n' +
    '- A trial balance at the end of the event.\n' +
    '- A one-page summary of income, expenses and the surplus donated to charity.\n' +
    '- A short note listing any documents that were missing or unclear and how you treated them.\n' +
    '\n' +
    'Team roles (4–5 students)\n' +
    '- Team leader: allocates documents and checks the timeline.\n' +
    '- Journal keeper: records each document in the journal.\n' +
    '- Ledger keeper: posts entries and balances the accounts.\n' +
    '- Reviewer: checks every entry against its document and finds errors.\n' +
    '- Reporter (or shared): prepares the summary for the committee.\n' +
    '\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: sort the documents, agree the chart of accounts, start the journal.\n' +
    '- Week 2: post to the ledger, extract the trial balance, correct errors.\n' +
    '- Week 3: write the committee summary and present it to the class.\n' +
    '\n' +
    'Assessment (100 points)\n' +
    '- Correct debits and credits in the journal: 30\n' +
    '- Accurate ledger and balanced trial balance: 25\n' +
    '- Error checking and notes on documents: 15\n' +
    '- Clarity of the committee summary: 20\n' +
    '- Teamwork (peer assessment): 10'],
];

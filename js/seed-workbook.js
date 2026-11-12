// Workbook exercises (one set per unit) and full case studies with teaching notes.
// Exercise types: classify (sort items into categories), order (put steps in sequence),
// numeric (calculation, auto-checked with a tolerance), written (short answer, marked by the lecturer).
// Figures in cases are illustrative teaching data, not official statistics.
import { EXTRA_EXERCISES } from './content/index.js';

const C = (unitId, title, prompt, categories, items, solution) => ({ unitId, type: 'classify', title, prompt, categories, items, solution });
const O = (unitId, title, prompt, steps, solution) => ({ unitId, type: 'order', title, prompt, steps, solution });
const N = (unitId, title, prompt, answer, unit, solution, tol = null) => ({ unitId, type: 'numeric', title, prompt, answer, unit, tol, solution });
const W = (unitId, title, prompt, model, marking, words = 120) => ({ unitId, type: 'written', title, prompt, model, marking, words });

export const EXERCISES = [
  /* ---------------- Economics ---------------- */
  C('E1', 'Factors of production', 'Sort each resource into the correct factor of production.', ['Land', 'Labour', 'Capital', 'Enterprise'],
    [['Rice paddies in the Mekong Delta', 0], ['Delivery riders', 1], ['A coffee-roasting machine', 2], ['A founder launching an e-scooter start-up', 3], ['Offshore natural gas', 0], ['A factory building', 2], ['Accountants in a firm', 1]],
    'Land = natural resources; Labour = human effort; Capital = man-made goods used to produce other goods; Enterprise = organising the other factors and taking the risk.'),
  N('E1', 'Opportunity cost on a PPF', 'A farm can produce either 100 tonnes of rice or 50 tonnes of coffee (straight-line PPF). What is the opportunity cost of producing 1 tonne of coffee, measured in tonnes of rice?', 2, 'tonnes of rice',
    'Giving up all 100 t of rice buys 50 t of coffee, so 1 t of coffee costs 100 ÷ 50 = 2 t of rice.'),
  W('E1', 'Metro or hospital?', 'Ho Chi Minh City can afford either a new metro line or a new hospital this year. Explain the opportunity cost of choosing the metro, and suggest one way the city could decide.',
    'The opportunity cost of the metro is the hospital that is not built — the health care, beds and jobs it would have provided. The city could compare the benefits of each project per VND spent (cost–benefit analysis), for example time saved by commuters versus lives improved by faster treatment, and consult residents.',
    ['Defines opportunity cost as the next best alternative given up (the hospital)', 'Names concrete benefits that are lost', 'Gives a reasonable decision method (cost–benefit, priorities, consultation)']),

  C('E2', 'Shift or movement?', 'Coffee market: does each event cause a movement along a curve, a shift of demand, or a shift of supply?', ['Movement along a curve', 'Demand shifts', 'Supply shifts'],
    [['The price of coffee itself rises', 0], ['Consumer incomes rise (coffee is a normal good)', 1], ['New machinery lowers production costs', 2], ['The price of tea, a substitute, rises', 1], ['A drought destroys part of the harvest', 2], ['A social-media trend makes cold brew fashionable', 1], ['The government subsidises coffee farmers', 2]],
    'A change in the good\'s own price moves along the curve. Changes in income, tastes or the price of related goods shift demand. Changes in costs, technology, weather or subsidies shift supply.'),
  N('E2', 'Equilibrium price', 'In a local market Qd = 120 − 2P and Qs = 30 + P (P in thousand VND). Find the equilibrium price.', 30, 'thousand VND',
    'Set Qd = Qs: 120 − 2P = 30 + P → 90 = 3P → P = 30.'),
  N('E2', 'Equilibrium quantity', 'Using the same market (Qd = 120 − 2P, Qs = 30 + P), what is the equilibrium quantity?', 60, 'units',
    'Substitute P = 30: Qs = 30 + 30 = 60 (check: Qd = 120 − 60 = 60).'),
  W('E2', 'Why did robusta prices rise?', 'A drought in a major competing exporter cuts the world supply of robusta coffee. Use demand and supply to explain what happens to the world price and quantity traded.',
    'The drought shifts world supply to the left. At the old price there is now a shortage, so the price rises until a new equilibrium is reached with a higher price and a lower quantity traded. Demand has not changed; the market moves along the demand curve.',
    ['Identifies a leftward supply shift', 'States price rises and quantity falls', 'Explains the adjustment through a shortage / movement along demand']),

  N('E3', 'Price elasticity of demand', 'Bubble tea rises from 40,000 to 44,000 VND and weekly sales fall from 1,000 to 850 cups. Calculate PED (simple percentage method). Give a negative number.', -1.5, '',
    '%ΔQ = (850 − 1,000) ÷ 1,000 = −15%. %ΔP = 4,000 ÷ 40,000 = +10%. PED = −15 ÷ 10 = −1.5 (elastic).', 0.05),
  N('E3', 'Income elasticity', 'Average incomes rise by 10% and demand for imported cars rises by 25%. What is the income elasticity of demand?', 2.5, '',
    'YED = %ΔQ ÷ %ΔY = 25 ÷ 10 = 2.5 → a luxury (income-elastic) good.', 0.05),
  C('E3', 'Elastic or inelastic?', 'Is demand for each product likely to be price elastic or price inelastic?', ['Price elastic', 'Price inelastic'],
    [['Petrol', 1], ['One particular brand of bubble tea', 0], ['Salt', 1], ['Cinema tickets', 0], ['Electricity for households', 1], ['Restaurant meals', 0]],
    'Few substitutes, necessity and small share of income → inelastic. Many close substitutes or luxuries → elastic.'),
  W('E3', 'Which good to tax?', 'The government wants to raise tax revenue. Explain, using elasticity, why it would tax cigarettes rather than restaurant meals.',
    'Demand for cigarettes is price inelastic because smokers are addicted and have few substitutes. A tax raises the price but quantity falls only a little, so revenue stays high (and there is a health benefit). Restaurant meals are price elastic, so a tax would cut sales sharply and raise less revenue.',
    ['Correctly classifies cigarettes as inelastic and meals as elastic', 'Links elasticity to the size of the fall in quantity', 'Concludes about tax revenue (and may mention health)']),

  N('E4', 'Real GDP growth', 'Nominal GDP grows by 9% and the GDP deflator rises by 4%. What is real GDP growth, approximately?', 5, '%', 'Real growth ≈ nominal growth − inflation = 9 − 4 = 5%.'),
  N('E4', 'Inflation from a CPI', 'The consumer price index rises from 120 to 126 over a year. What is the inflation rate?', 5, '%', '(126 − 120) ÷ 120 × 100 = 5%.'),
  N('E4', 'Unemployment rate', 'The labour force is 52 million and 1.3 million people are unemployed. What is the unemployment rate?', 2.5, '%', '1.3 ÷ 52 × 100 = 2.5%.', 0.05),
  C('E4', 'Types of unemployment', 'Classify each situation.', ['Frictional', 'Structural', 'Cyclical'],
    [['A new graduate searching for a first job', 0], ['Bank tellers replaced by mobile banking', 1], ['Factory lay-offs during a recession', 2], ['A worker moving cities between jobs', 0], ['Miners after the mines close permanently', 1]],
    'Frictional = short gaps between jobs; Structural = skills no longer demanded; Cyclical = lack of demand in a downturn.'),
  W('E4', 'Costs of inflation', 'Food prices in Ho Chi Minh City rise faster than wages. Explain two costs of this inflation for households.',
    'First, real incomes fall: wages buy fewer goods, so families cut spending or switch to cheaper brands. Second, savings lose value and uncertainty makes planning harder; people on fixed incomes, such as pensioners, lose most.',
    ['Explains falling real income / purchasing power', 'Gives a second distinct cost (savings, uncertainty, menu costs, inequality)', 'Applies to households in the context']),

  /* ---------------- Accounting ---------------- */
  C('A1', 'Asset, liability or equity?', 'Classify each item for a small trading company.', ['Asset', 'Liability', 'Equity'],
    [['Cash at bank', 0], ['A bank loan', 1], ["Owner's capital", 2], ['Inventory', 0], ['Amounts owed to suppliers', 1], ['A delivery van', 0], ['Retained profits', 2]],
    'Assets are resources the business controls; liabilities are what it owes; equity is the owners\' claim (capital + retained profits).'),
  N('A1', 'Using the accounting equation', 'A business has assets of 850 million VND and liabilities of 320 million VND. What is its equity?', 530, 'million VND', 'Equity = Assets − Liabilities = 850 − 320 = 530.'),
  N('A1', 'Effect of a transaction', 'A business buys a 60 million VND machine, paying 20 million in cash and 40 million with a bank loan. By how much do TOTAL ASSETS increase?', 40, 'million VND',
    'Machine +60, cash −20 → assets +40. Liabilities also rise by 40, so the equation still balances.'),
  W('A1', 'Going concern', 'Explain the going-concern concept and why it matters when valuing a company\'s equipment.',
    'The going-concern concept assumes the business will continue operating for the foreseeable future. Equipment is therefore shown at cost less depreciation, because it will be used to earn income, not at the low price it would fetch in a forced sale.',
    ['Correct definition (continues trading for the foreseeable future)', 'Explains effect on valuation (cost less depreciation, not break-up value)', 'Clear, accurate language']),

  O('A2', 'The accounting cycle', 'Put the steps of the accounting cycle in the correct order.',
    ['Identify and analyse the transaction', 'Record it in the journal', 'Post it to the ledger accounts', 'Prepare the trial balance', 'Prepare the financial statements'],
    'Transactions are analysed, journalised, posted to the ledger, checked in a trial balance, and only then summarised in the statements.'),
  C('A2', 'Debit or credit?', 'Which side records each increase?', ['Debit', 'Credit'],
    [['An increase in cash', 0], ['An increase in a bank loan', 1], ['An increase in sales revenue', 1], ['An increase in rent expense', 0], ["An increase in owner's capital", 1], ['An increase in equipment', 0]],
    'Assets and expenses increase on the debit side; liabilities, equity and revenue increase on the credit side.'),
  W('A2', 'Errors a trial balance misses', 'A trial balance balances, but the accounts still contain mistakes. Give two kinds of error a trial balance will not reveal, with an example of each.',
    'An error of omission — a sales invoice is not recorded at all, so both sides are missing. An error of commission — rent is posted to the wages account; the debit is on the right side but the wrong account. (Other valid answers: error of principle, compensating errors, original-entry errors, complete reversal.)',
    ['Names two valid error types', 'Gives a correct example for each', 'Explains why totals still agree']),

  N('A3', 'Gross profit', 'Revenue is 900 million VND and cost of sales is 540 million VND. What is gross profit?', 360, 'million VND', '900 − 540 = 360.'),
  N('A3', 'Net profit', 'Using the same figures, operating expenses (including depreciation) are 210 million VND. What is net profit?', 150, 'million VND', 'Gross profit 360 − expenses 210 = 150.'),
  N('A3', 'Straight-line depreciation', 'An oven costs 120 million VND, has a residual value of 20 million VND and a useful life of 5 years. What is the annual depreciation charge?', 20, 'million VND', '(120 − 20) ÷ 5 = 20 per year.'),
  C('A3', 'Which statement?', 'Does each item appear in the income statement or the statement of financial position?', ['Income statement', 'Statement of financial position'],
    [['Revenue', 0], ['Trade receivables', 1], ['Wages expense', 0], ['Inventory at year end', 1], ['Depreciation expense', 0], ['Bank loan', 1]],
    'The income statement shows revenue and expenses for a period; the statement of financial position shows assets, liabilities and equity at a date.'),
  W('A3', 'Profitable but short of cash', 'Explain why a profitable business might still run out of cash.',
    'Profit is recorded when sales are made, not when cash is received. If customers pay late, if the business buys a lot of inventory or equipment, or repays loans, cash can fall even though profit is positive.',
    ['Distinguishes profit from cash', 'Gives at least two causes (credit sales, inventory, capital spending, loan repayment)', 'Coherent explanation']),

  N('A4', 'Break-even point', 'A café has fixed costs of 45 million VND per month. A cup sells for 35,000 VND and the variable cost is 20,000 VND per cup. How many cups must it sell to break even?', 3000, 'cups', 'Contribution = 35,000 − 20,000 = 15,000. Break-even = 45,000,000 ÷ 15,000 = 3,000 cups.'),
  N('A4', 'Margin of safety', 'The café expects to sell 4,000 cups a month. What is the margin of safety in cups?', 1000, 'cups', '4,000 − 3,000 = 1,000 cups (25% of expected sales).'),
  N('A4', 'Target profit', 'How many cups must the café sell to make a profit of 15 million VND per month?', 4000, 'cups', '(45,000,000 + 15,000,000) ÷ 15,000 = 4,000 cups.'),
  C('A4', 'Fixed or variable?', 'Classify the café\'s costs.', ['Fixed', 'Variable'],
    [['Coffee beans', 1], ['Rent', 0], ['Paper cups', 1], ["The manager's salary", 0], ['Insurance', 0], ['Milk', 1]],
    'Variable costs change with the number of cups sold; fixed costs do not change in the short run.'),
  W('A4', 'A special order', 'A company offers to buy 500 cups at 25,000 VND each — below the normal price but above variable cost. Should the café accept? Explain.',
    'Yes, if it has spare capacity: each cup adds 25,000 − 20,000 = 5,000 VND contribution, so the order adds 2.5 million VND profit because fixed costs are already covered. It should check that regular customers will not demand the same discount and that quality and staff time are not affected.',
    ['Uses contribution (price − variable cost)', 'Calculates the extra profit (2.5m VND)', 'Mentions a qualitative factor (capacity, regular customers, brand)']),

  O('A5', 'The audit process', 'Put the stages of an external audit in order.',
    ['Accept the engagement and confirm independence', 'Plan the audit and assess risk', 'Test controls and transactions', 'Evaluate the evidence', 'Issue the audit opinion'],
    'Auditors accept the engagement, plan around risk, gather evidence, evaluate it and only then give their opinion.'),
  C('A5', 'Reliability of audit evidence', 'Is each piece of evidence more reliable or less reliable?', ['More reliable', 'Less reliable'],
    [['A bank confirmation sent directly to the auditor', 0], ["A verbal explanation from the finance manager", 1], ["The auditor's own inventory count", 0], ['A photocopy supplied by the client', 1], ['A statement received from an external supplier', 0]],
    'Evidence from independent sources or gathered directly by the auditor is more reliable than evidence produced or explained by the client.'),
  W('A5', 'Independence', 'Why must an external auditor be independent? Describe one threat to independence.',
    'Users of the accounts rely on the audit opinion; it is only valuable if the auditor is objective. A threat is self-interest: if the audit firm earns large consulting fees from the same client, it may avoid a qualified opinion to keep the client.',
    ['Explains why independence matters (users rely on an objective opinion)', 'Names a valid threat (self-interest, familiarity, self-review, intimidation, advocacy)', 'Shows how the threat could bias the opinion']),

  /* ---------------- Finance ---------------- */
  N('F1', 'Future value', '100 million VND is invested at 10% compound interest for 3 years. What is the future value?', 133.1, 'million VND', 'FV = 100 × 1.10³ = 133.1.', 0.05),
  N('F1', 'Present value', 'What is the present value of 50 million VND received in 2 years if the discount rate is 8%?', 42.87, 'million VND', 'PV = 50 ÷ 1.08² = 50 ÷ 1.1664 = 42.87.', 0.05),
  N('F1', 'Compare two offers', 'Offer A pays 100 million VND today. Offer B pays 115 million VND in 2 years. At 8%, what is the present value of Offer B?', 98.59, 'million VND', 'PV = 115 ÷ 1.1664 = 98.59 < 100, so Offer A is better.', 0.05),
  W('F1', 'Discount rate and value', 'Explain why a higher discount rate lowers the present value of future cash.',
    'The discount rate is the return we could earn elsewhere (or the risk we bear). The higher it is, the less money we need to invest today to reach the same future amount, so future cash is worth less today. Mathematically we divide by a larger (1 + r)ⁿ.',
    ['Links discount rate to opportunity cost / risk', 'Explains the inverse relationship', 'May refer to the formula correctly']),

  N('F2', 'Current ratio', 'Current assets are 450 million VND and current liabilities are 300 million VND. Calculate the current ratio.', 1.5, ': 1', '450 ÷ 300 = 1.5 : 1.', 0.01),
  N('F2', 'Net profit margin', 'Net profit is 150 million VND on revenue of 900 million VND. Calculate the net profit margin.', 16.7, '%', '150 ÷ 900 × 100 = 16.7%.', 0.1),
  N('F2', 'Gearing', 'Long-term debt is 200 million VND and equity is 600 million VND. Calculate gearing as debt ÷ (debt + equity).', 25, '%', '200 ÷ 800 × 100 = 25%.'),
  C('F2', 'Which type of ratio?', 'Classify each ratio.', ['Liquidity', 'Profitability', 'Gearing'],
    [['Current ratio', 0], ['Quick (acid-test) ratio', 0], ['Net profit margin', 1], ['Return on capital employed', 1], ['Debt-to-equity', 2], ['Interest cover', 2]],
    'Liquidity = ability to pay short-term debts; profitability = returns earned; gearing = reliance on borrowing.'),
  W('F2', 'A worried lender', 'A bank sees that a shop has a current ratio of 0.6. What does this suggest, and what two questions should the lender ask?',
    'Current liabilities exceed current assets, so the shop may struggle to pay short-term debts. The lender should ask how quickly inventory turns into cash and whether customers pay on time, and whether any loans or supplier payments are due soon.',
    ['Interprets 0.6 as a liquidity risk', 'Asks two relevant questions (inventory, receivables, upcoming payments, cash flow forecast)', 'Clear business language']),

  N('F3', 'Working capital', 'Current assets are 380 million VND and current liabilities are 260 million VND. What is working capital?', 120, 'million VND', '380 − 260 = 120.'),
  N('F3', 'Cash conversion cycle', 'Inventory days 30, receivable days 45, payable days 25. What is the cash conversion cycle?', 50, 'days', '30 + 45 − 25 = 50 days.'),
  C('F3', 'Effect on cash', 'Does each action increase or reduce cash in the short term?', ['Increases cash', 'Reduces cash'],
    [['Collecting receivables faster', 0], ['Buying extra inventory', 1], ['Paying suppliers later (within terms)', 0], ['Giving customers longer credit', 1], ['Selling unused equipment', 0]],
    'Cash comes in when receivables are collected, assets are sold or payments are delayed; it goes out when inventory rises or credit is extended.'),
  W('F3', 'Memo to the bakery owner', 'Write a short memo (max. 120 words) recommending ONE action to ease the bakery chain\'s cash shortage. Justify it.',
    'To: Owner. Subject: Freeing up cash. I recommend asking corporate customers to pay within 30 days instead of 60, offering a 1% discount for early payment. This would cut receivable days by about half and release cash tied up in invoices, at a small cost. We should start with the three largest customers.',
    ['Memo format (to / subject / recommendation)', 'One clear, realistic action', 'Justified with the effect on cash']),

  N('F4', 'Payback period', 'A project costs 300 million VND and returns 120 million VND per year. What is the payback period?', 2.5, 'years', '300 ÷ 120 = 2.5 years.', 0.01),
  N('F4', 'Net present value', 'Cost 300 million VND; inflows 120 million VND per year for 3 years; discount rate 10% (3-year annuity factor 2.487). What is the NPV?', -1.56, 'million VND', 'PV inflows = 120 × 2.487 = 298.44. NPV = 298.44 − 300 = −1.56 → reject.', 0.1),
  C('F4', 'Accept or reject?', 'Using the NPV / IRR rules, accept or reject each project.', ['Accept', 'Reject'],
    [['NPV = +15 million VND', 0], ['IRR 8%, cost of capital 10%', 1], ['NPV = −2 million VND', 1], ['IRR 14%, cost of capital 10%', 0]],
    'Accept if NPV > 0 or IRR > cost of capital.'),
  W('F4', 'Quick payback, negative NPV', 'A project pays back in 2.5 years but has a small negative NPV. What would you recommend, and why?',
    'Reject it, or renegotiate the cost. Payback ignores the time value of money and cash flows after payback; NPV shows the project does not earn the required 10% return. Only accept if there are strategic benefits not captured in the cash flows.',
    ['Recommends based on NPV', 'Explains the weakness of payback', 'Considers non-financial / strategic factors']),

  C('F5', 'Primary or secondary market?', 'Where does each transaction take place?', ['Primary market', 'Secondary market'],
    [['A company sells new shares in an IPO', 0], ['An investor sells shares to another investor on the exchange', 1], ['The government issues new bonds', 0], ['A fund trades existing bonds', 1]],
    'New securities are sold in the primary market; existing securities change hands in the secondary market.'),
  N('F5', 'Current yield', 'A bond pays an 8% coupon on a face value of 100,000 VND and trades at 95,000 VND. What is its current yield?', 8.42, '%', 'Coupon = 8,000. Yield = 8,000 ÷ 95,000 × 100 = 8.42%.', 0.05),
  W('F5', 'Bond prices and interest rates', 'Explain why the price of an existing bond falls when market interest rates rise.',
    'An existing bond pays a fixed coupon. When new bonds offer a higher rate, investors will only buy the old bond if its price falls enough to give the same yield as the new bonds.',
    ['Mentions the fixed coupon', 'Compares with new, higher-yielding bonds', 'Concludes the price must fall to raise the yield']),

  /* ---------------- Management ---------------- */
  C('M1', 'Management functions', 'Which function is each activity?', ['Planning', 'Organising', 'Leading', 'Controlling'],
    [["Setting next year's sales target", 0], ['Designing the organisation chart', 1], ['Motivating the sales team', 2], ['Comparing actual sales with budget', 3], ['Assigning tasks to new staff', 1], ['Coaching a new employee', 2]],
    'Planning sets goals; organising arranges people and resources; leading motivates and guides; controlling measures results against plans.'),
  N('M1', 'Span of control', 'A company has 48 front-line staff. Each supervisor can manage 8 people. How many supervisors are needed?', 6, 'supervisors', '48 ÷ 8 = 6.'),
  W('M1', 'Tall or flat?', 'A 20-person tech start-up is choosing between a tall and a flat structure. Recommend one and give two reasons.',
    'A flat structure. With few levels, decisions and communication are faster, which suits a start-up that must react quickly; it also keeps costs low and gives staff more responsibility, which can motivate them.',
    ['Makes a clear recommendation', 'Gives two relevant reasons', 'Applies them to a small start-up']),

  O('M2', 'Business plan sections', 'Put the sections of a typical business plan in order.',
    ['Executive summary', 'Business description', 'Market analysis', 'Marketing plan', 'Operations plan', 'Financial plan'],
    'The summary comes first; the plan then moves from the idea and market to how the business will sell, operate and be financed.'),
  C('M2', 'Internal or external finance?', 'Classify each source of finance.', ['Internal', 'External'],
    [['Retained profit', 0], ['A bank loan', 1], ['Selling unused assets', 0], ['Venture capital', 1], ['Crowdfunding', 1]],
    'Internal finance comes from within the business; external finance comes from outside lenders or investors.'),
  W('M2', 'A unique selling proposition', 'Invent a start-up in Ho Chi Minh City and write its unique selling proposition (USP) in one sentence. Explain why customers would care.',
    'Example: "Healthy Vietnamese lunch boxes delivered to offices in 20 minutes, under 500 calories." Busy office workers want quick food but are concerned about health; the USP combines speed and healthy local dishes that competitors do not offer together.',
    ['A clear one-sentence USP', 'Identifies the target customer', 'Explains the benefit vs competitors']),

  N('M3', 'Capacity utilisation', 'A factory produces 6,000 units a month and can produce at most 8,000. What is capacity utilisation?', 75, '%', '6,000 ÷ 8,000 × 100 = 75%.'),
  N('M3', 'Critical path', 'Tasks: A (3 days); B (4 days, after A); C (2 days, after A); D (3 days, after B and C). What is the minimum project duration?', 10, 'days', 'Paths: A–B–D = 3 + 4 + 3 = 10; A–C–D = 8. The critical path is A–B–D = 10 days.'),
  C('M3', 'Value or waste?', 'Lean thinking: does each activity add value for the customer or is it waste?', ['Adds value', 'Waste'],
    [['Waiting for parts to arrive', 1], ['Assembling the product', 0], ['Holding excess inventory', 1], ['Moving goods back and forth across the factory', 1], ["Packing the customer's order", 0]],
    'Value-adding work changes the product in a way the customer pays for; waiting, excess stock and unnecessary transport are waste.'),
  W('M3', 'A busy kitchen', 'At lunchtime a restaurant kitchen has long queues while one cook prepares all the drinks. Suggest one operational improvement and explain its effect.',
    'Move drinks to a separate station staffed by a server during the 11:30–13:30 peak. The bottleneck is removed, the cook can focus on food, and orders are completed faster, so capacity and customer satisfaction rise.',
    ['Identifies the bottleneck', 'Proposes a practical change', 'Explains the effect on speed / capacity']),

  O('M4', 'Report structure', 'Put the parts of a formal business report in order.',
    ['Title page', 'Executive summary', 'Introduction', 'Findings', 'Conclusions', 'Recommendations', 'Appendices'],
    'Readers get the summary first, then the evidence, then what it means and what to do; supporting data goes in appendices.'),
  C('M4', 'Formal or informal?', 'Which sentences are suitable for a formal business email?', ['Formal', 'Informal'],
    [['Please find attached the Q3 sales report.', 0], ['Hey guys, check this out!!', 1], ['We regret to inform you that the delivery will be delayed.', 0], ['Gonna be late lol', 1], ['I would be grateful if you could confirm by Friday.', 0]],
    'Formal writing uses complete sentences, polite forms and no slang or emoji.'),
  W('M4', 'Rewrite the email', 'Rewrite this message to a customer in a professional tone: "ur order is late cuz supplier messed up. will come next week maybe."',
    'Dear Ms Lan, I am sorry to inform you that your order has been delayed because of a supply problem. We expect to deliver it on Tuesday, 15 October, and will confirm the exact time by phone. Thank you for your patience. Kind regards, …',
    ['Polite greeting and apology', 'Clear reason and a specific new date', 'Professional close; no slang']),

  /* ---------------- Marketing ---------------- */
  C('K1', 'The 4Ps', 'Which element of the marketing mix is each decision?', ['Product', 'Price', 'Place', 'Promotion'],
    [['Launching a 500 ml bottle size', 0], ['An introductory 20% discount', 1], ['Listing the brand on Shopee', 2], ['A TikTok influencer campaign', 3], ['Selling through convenience stores', 2], ['Premium gift packaging for Tet', 0]],
    'Product = what is offered; Price = what customers pay; Place = where and how it is sold; Promotion = how it is communicated.'),
  N('K1', 'Market share', 'A brand sells 12 billion VND in a market worth 80 billion VND. What is its market share?', 15, '%', '12 ÷ 80 × 100 = 15%.'),
  W('K1', 'Positioning statement', 'Write a positioning statement for a Vietnamese snack brand using the form: "For [target], [brand] is the [category] that [benefit] because [reason]."',
    'For health-conscious university students, Hạt Xanh is the nut-and-seed snack that keeps you full through long study sessions because every pack has 8 g of protein and no added sugar.',
    ['Uses the four parts of the template', 'Specific target segment', 'Credible benefit and reason to believe']),

  O('K2', 'Consumer decision process', 'Put the stages of the buying-decision process in order.',
    ['Need recognition', 'Information search', 'Evaluation of alternatives', 'Purchase decision', 'Post-purchase behaviour'],
    'Consumers recognise a need, search, compare options, buy, and then evaluate their purchase.'),
  C('K2', 'Influences on buying', 'Classify each influence on consumer behaviour.', ['Cultural', 'Social', 'Personal', 'Psychological'],
    [['Tet gift-giving traditions', 0], ["Friends' recommendations", 1], ['Age and life stage', 2], ['Perception of brand quality', 3], ['Family opinions', 1], ['Motivation to save money', 3]],
    'Cultural = values and traditions; Social = family and groups; Personal = age, job, lifestyle; Psychological = perception, motivation, attitudes.'),
  W('K2', 'Abandoned carts', 'An online fashion store finds that 72% of shoppers leave items in their cart without paying. Suggest two changes and link each to a stage of the decision process.',
    '1) Show total delivery cost early and offer free delivery above 300,000 VND — this removes a surprise at the purchase-decision stage. 2) Send a reminder message with reviews and size advice — this supports evaluation of alternatives and reduces doubt.',
    ['Two realistic changes', 'Each linked to a named stage', 'Explains why abandonment would fall']),

  O('K3', 'AIDA', 'Put the AIDA steps in order.', ['Attention', 'Interest', 'Desire', 'Action'], 'An advert first grabs attention, builds interest and desire, then prompts action.'),
  C('K3', 'Promotion mix', 'Which tool of the promotion mix is each activity?', ['Advertising', 'Sales promotion', 'Public relations', 'Personal selling'],
    [['A TV commercial', 0], ['Buy one, get one free', 1], ['A press release about a charity partnership', 2], ['A sales rep visiting retailers', 3], ['Sponsoring a university event', 2]],
    'Advertising is paid media; sales promotion is a short-term incentive; PR builds reputation through earned coverage; personal selling is one-to-one.'),
  N('K3', 'Budget allocation', 'A launch budget is 300 million VND and 40% goes to social media. How much is that?', 120, 'million VND', '300 × 0.40 = 120.'),
  W('K3', 'Measuring the launch', 'Choose three KPIs to judge a bubble-tea launch campaign after one month, and say why each matters.',
    '1) Reach / impressions in the target districts — shows awareness. 2) Store visits or app orders using the launch code — shows conversion from the campaign. 3) Repeat-purchase rate in weeks 3–4 — shows whether customers liked the product.',
    ['Three specific, measurable KPIs', 'Covers awareness through to sales/loyalty', 'Explains why each matters']),

  N('K4', 'Click-through rate', 'An ad set has 50,000 impressions and 1,000 clicks. What is the CTR?', 2, '%', '1,000 ÷ 50,000 × 100 = 2%.'),
  N('K4', 'Cost per click', 'The same ad set cost 4 million VND. What is the cost per click?', 4000, 'VND', '4,000,000 ÷ 1,000 = 4,000 VND.'),
  N('K4', 'Cost per order', 'The ad set produced 40 orders. What is the cost per order?', 100000, 'VND', '4,000,000 ÷ 40 = 100,000 VND.'),
  N('K4', 'Return on ad spend', 'The 40 orders brought 12 million VND in revenue. What is the ROAS (revenue ÷ ad spend)?', 3, 'x', '12 ÷ 4 = 3 — each 1 VND of ads brought 3 VND of revenue.', 0.01),
  C('K4', 'Owned, paid or earned?', 'Classify each channel.', ['Owned media', 'Paid media', 'Earned media'],
    [["The brand's Facebook page", 0], ['A sponsored Google search ad', 1], ['A customer review on Shopee', 2], ['The company website', 0], ['A news article about the brand', 2], ["An influencer's paid post", 1]],
    'Owned = channels the brand controls; paid = space it buys; earned = what others say for free.'),
  W('K4', 'Which ad set to scale?', 'Ad set A: CTR 2.5%, cost per order 140,000 VND. Ad set B: CTR 1.2%, cost per order 80,000 VND. Which would you scale and why?',
    'Scale B. Although its CTR is lower, it produces orders at a much lower cost; CTR only measures interest, while cost per order measures what the business pays for a sale. A could be kept to test new creative that might convert better.',
    ['Chooses B', 'Explains CTR vs cost per order', 'Sensible next step for A']),

  O('K5', 'Research process', 'Put the market-research process in order.', ['Define the problem', 'Design the research', 'Collect the data', 'Analyse the data', 'Report the findings'],
    'Good research starts with a clear question; the design and data follow from it.'),
  C('K5', 'Primary or secondary data?', 'Classify each source.', ['Primary', 'Secondary'],
    [['A survey of 200 students', 0], ['Published government statistics', 1], ['A focus group with customers', 0], ['An industry report', 1], ['Observing shoppers in a store', 0]],
    'Primary data is collected first-hand for this study; secondary data already exists.'),
  N('K5', 'From percentage to respondents', '30% of 400 survey respondents chose Brand A. How many respondents is that?', 120, 'respondents', '400 × 0.30 = 120.'),
  W('K5', 'Fix the biased question', 'Rewrite this biased survey question so it is neutral: "Don\'t you agree that our new drink is delicious?"',
    '"How would you rate the taste of the new drink?" (1 = very poor … 5 = very good). The new version does not suggest an answer and gives a balanced scale.',
    ['Removes the leading wording', 'Offers a balanced scale or open question', 'Explains why it is neutral']),

  N('K6', 'Brand awareness', 'In a survey, 340 of 500 target customers recognised the brand. What is prompted brand awareness?', 68, '%', '340 ÷ 500 × 100 = 68%.'),
  C('K6', 'Part of brand equity?', 'Is each item a component of brand equity?', ['Part of brand equity', 'Not brand equity'],
    [['Brand awareness', 0], ['Perceived quality', 0], ['Brand loyalty', 0], ['The size of the factory', 1], ['The number of product lines', 1]],
    'Brand equity is the value created in customers\' minds: awareness, associations, perceived quality and loyalty.'),
  W('K6', 'Brand extension risk', 'A well-known Vietnamese dairy brand plans to launch an energy drink under the same name. Give one benefit and one risk of this brand extension.',
    'Benefit: customers already trust the brand, so awareness and trial come faster and launch costs are lower. Risk: an energy drink does not fit a healthy dairy image; if it fails or is seen as unhealthy, it can damage the core brand.',
    ['A valid benefit (trust, awareness, lower cost)', 'A valid risk (dilution, poor fit, damage to core)', 'Applied to the example']),
];

/* ------------------------------------------------------------------ case studies */
// Each case: background, exhibit table, tasks (exercises with caseId), teaching notes.
export const CASES = [
  {
    id: 'R-C1', unitId: 'E2', title: 'Coffee export prices and Central Highlands farm incomes', minutes: 45,
    body: 'Đắk Lắk province grows a large share of Vietnam\'s robusta coffee. In 2025 a drought in another major producing country cut world supply. Over three quarters the world price of robusta rose sharply. Many Vietnamese farmers held back part of their harvest, expecting prices to keep rising. Local roasters in Ho Chi Minh City, who sell to cafés, saw their bean costs jump and had to decide whether to raise prices, change their blends, or buy forward contracts.',
    exhibit: { title: 'Exhibit 1 · World robusta market (illustrative data)', columns: ['Quarter', 'World price (USD/tonne)', 'Vietnam exports (000 tonnes)', 'Roaster bean cost (VND/kg)'],
      rows: [['Q1', '2,400', '480', '62,000'], ['Q2', '2,950', '430', '74,000'], ['Q3', '3,600', '390', '89,000'], ['Q4', '3,350', '450', '84,000']], note: 'Figures are simplified for teaching.' },
    tasks: [
      N('E2', 'Price change Q1→Q3', 'Calculate the percentage change in the world price from Q1 to Q3.', 50, '%', '(3,600 − 2,400) ÷ 2,400 × 100 = 50%.'),
      W('E2', 'Explain the price rise', 'Using a demand and supply diagram (describe it in words), explain why the world price rose between Q1 and Q3.', 'The drought shifted world supply left. At the old price there was a shortage, so the price rose and the quantity traded fell (exports fell from 480 to 390 thousand tonnes). Demand was broadly unchanged.', ['Leftward supply shift', 'Higher price, lower quantity, consistent with the exhibit', 'Uses data from the exhibit']),
      W('E2', 'Advice to a roaster', 'Recommend one action for a Ho Chi Minh City roaster facing higher bean costs. Justify it using the data.', 'Lock in part of next year\'s supply with forward contracts while prices are falling from the Q3 peak (89,000 → 84,000 VND/kg), and raise café prices modestly; coffee demand from regular café customers is fairly inelastic, so a small increase will not lose many buyers.', ['One clear recommendation', 'Uses the trend in the exhibit', 'Considers elasticity / customer reaction']),
    ],
    notes: { timing: ['5 min — read the case and the exhibit', '10 min — pairs draw the supply shift', '15 min — groups prepare advice for the roaster', '15 min — two groups present, class critiques'],
      points: ['Supply shift, not demand: weather is a supply factor', 'Exports fall while price rises — exactly what the model predicts', 'Holding stock is speculation: farmers bet that prices will keep rising; Q4 shows the risk'],
      extension: 'Ask: if the drought ends next year, sketch what happens to price and to farmers who held stock.' },
  },
  {
    id: 'R-C2', unitId: 'F3', title: 'Working-capital squeeze at a Saigon bakery chain', minutes: 50,
    body: 'Bánh Mì Nhà Làm has 12 stores and grew sales by 35% last year after winning contracts to supply office canteens. The owner is surprised: the business is profitable, but the bank account is often empty at the end of the month. Flour and butter suppliers now demand payment within 15 days, while the corporate canteens pay after 60 days. The owner is considering a bank overdraft.',
    exhibit: { title: 'Exhibit 1 · Working-capital data (million VND, illustrative)', columns: ['Item', 'Last year', 'This year'],
      rows: [['Annual revenue', '18,000', '24,300'], ['Cost of sales', '10,800', '14,600'], ['Inventory (year end)', '600', '1,200'], ['Trade receivables (year end)', '1,500', '4,000'], ['Trade payables (year end)', '900', '600']], note: 'Use 365 days. Inventory and payable days are based on cost of sales.' },
    tasks: [
      N('F3', 'Receivable days', 'Calculate this year\'s receivable days (receivables ÷ revenue × 365). Round to the nearest day.', 60, 'days', '4,000 ÷ 24,300 × 365 = 60 days.', 0.6),
      N('F3', 'Inventory days', 'Calculate this year\'s inventory days (inventory ÷ cost of sales × 365). Round to the nearest day.', 30, 'days', '1,200 ÷ 14,600 × 365 = 30 days.', 0.6),
      N('F3', 'Cash conversion cycle', 'Payable days this year are 15. Using your answers, what is the cash conversion cycle?', 75, 'days', '30 + 60 − 15 = 75 days.', 1),
      W('F3', 'Recommendation memo', 'Write a memo to the owner recommending two actions to shorten the cash conversion cycle. Is an overdraft a good idea?', 'Negotiate 30-day terms with canteens, offering 1% early-payment discount; and order flour weekly instead of monthly to cut inventory. An overdraft can cover the gap short term but costs interest and does not fix the cause, so use it only as a bridge while terms are renegotiated.', ['Two actions targeting receivables / inventory / payables', 'Links each to the CCC', 'Balanced view of the overdraft']),
    ],
    notes: { timing: ['10 min — calculate the three ratios individually', '10 min — compare answers in pairs', '20 min — memo writing', '10 min — discuss: profit vs cash'],
      points: ['Growth consumes cash: receivables rose 2.7× while revenue rose 1.35×', 'Suppliers shortened terms at the same time — a double squeeze', 'The overdraft treats the symptom; terms treat the cause'],
      extension: 'Compute last year\'s CCC and show how much cash the deterioration absorbed.' },
  },
  {
    id: 'R-C3', unitId: 'K3', title: 'Launching a bubble-tea brand to Gen Z customers', minutes: 45,
    body: 'Mây Trà is a new bubble-tea brand opening three stores near universities in Thủ Đức and District 10. Its drinks use less sugar and local fruit. The founders have 300 million VND to spend on promotion in the first three months and want to reach students aged 18–24. They are comparing channels on cost and reach.',
    exhibit: { title: 'Exhibit 1 · Channel options (illustrative)', columns: ['Channel', 'Cost (million VND)', 'Estimated reach in target', 'Notes'],
      rows: [['TikTok ads (8 weeks)', '120', '400,000 views', 'Precise age & location targeting'], ['3 micro-KOLs (student creators)', '90', '150,000 views', 'High trust, content can be reused'], ['Campus event sponsorship', '45', '5,000 students', 'Sampling + sign-ups'], ['Opening-week sales promotion', '30', '—', 'Buy 1 get 1 for app users'], ['Outdoor posters near campuses', '60', '—', 'Hard to measure']], note: 'Budget: 300 million VND.' },
    tasks: [
      N('K3', 'Cost per 1,000 views', 'What is the cost per 1,000 views (CPM) of the TikTok option, in thousand VND?', 300, 'thousand VND', '120,000,000 ÷ 400,000 × 1,000 = 300,000 VND = 300 thousand VND.'),
      W('K3', 'Allocate the budget', 'Allocate the 300 million VND across the channels and justify your choice in 3–4 sentences.', 'TikTok 110, micro-KOLs 90, campus events 45, opening promotion 30, posters 25. Gen Z discovers drinks on TikTok and trusts student creators; the campus event and BOGO drive trial at the stores; posters are cut because they cannot be measured.', ['Uses the full budget sensibly', 'Fits the target segment', 'Justifies using the exhibit data']),
      W('K3', 'Three KPIs', 'Which three KPIs should Mây Trà track after month one?', 'App sign-ups from campus events; redemption of the opening code in stores; repeat purchase within 14 days.', ['Measurable KPIs', 'Cover awareness → trial → repeat', 'Linked to the channels chosen']),
    ],
    notes: { timing: ['5 min — read', '20 min — groups allocate the budget on a poster', '10 min — gallery walk', '10 min — debrief on KPIs'],
      points: ['No single right answer — reward justification', 'Measurability matters for a new brand with little cash', 'Integrated message: "less sugar, real fruit" across every channel'],
      extension: 'Ask groups what they would cut first if the budget fell to 200 million VND.' },
  },
  {
    id: 'R-C4', unitId: 'A2', title: 'Month-end close at a garment exporter', minutes: 50,
    body: 'Lụa Việt Export makes shirts for European buyers. At the end of October the junior accountant prepared a trial balance, but it does not balance: total debits are 12 million VND more than total credits. The finance manager asks you to check the October transactions.',
    exhibit: { title: 'Exhibit 1 · Selected October transactions (million VND)', columns: ['No.', 'Transaction', 'Recorded as'],
      rows: [['1', 'Bought fabric on credit, 85', 'Dr Purchases 85 / Cr Payables 85'], ['2', 'Paid wages, 140', 'Dr Wages 140 / Cr Bank 140'], ['3', 'Sold shirts on credit, 320', 'Dr Receivables 320 / Cr Sales 320'], ['4', 'Paid electricity, 18', 'Dr Electricity 18 / Cr Bank 6'], ['5', 'Received from a customer, 200', 'Dr Bank 200 / Cr Receivables 200']], note: 'Only transaction 4 has a posting problem.' },
    tasks: [
      N('A2', 'Size of the error', 'In transaction 4, by how much do the debit and credit differ?', 12, 'million VND', 'Debit 18 − credit 6 = 12, which explains the trial-balance difference.'),
      W('A2', 'Correct the entry', 'Write the correcting entry for transaction 4 and explain it to the finance manager.', 'Dr Suspense 12 / Cr Bank 12. The electricity payment of 18 was credited to the bank as only 6 (a typing error). Crediting the bank with a further 12 completes the entry; the 12 that was held in a suspense account is cleared, so debits and credits match.', ['Correct entry: credit Bank 12', 'Explains the cause', 'Professional explanation']),
      W('A2', 'Hidden errors', 'Transactions 1–3 and 5 are posted with equal debits and credits. Give one way they could still be wrong.', 'They could be posted to the wrong account (e.g., fabric bought for an office renovation recorded as purchases), or the amount could be wrong on both sides (an original-entry error). A balanced trial balance does not detect these.', ['Names a valid undetected error', 'Gives an example from the case', 'Links to trial-balance limits']),
    ],
    notes: { timing: ['10 min — locate the error', '15 min — correcting entry', '15 min — discussion of hidden errors', '10 min — quiz'],
      points: ['Trial balance difference = 12 points straight to a one-sided error', 'Use a suspense account in practice until the error is found', 'Balanced ≠ correct'],
      extension: 'Add a sixth transaction with an error of principle and ask students to find it.' },
  },
  {
    id: 'R-C5', unitId: 'E4', title: 'Inflation and household spending in Ho Chi Minh City', minutes: 40,
    body: 'Over the past year the price of food and transport in Ho Chi Minh City rose faster than wages for many workers. Supermarkets report that shoppers are switching to cheaper brands and buying smaller packs. Restaurants see fewer customers on weekdays. Economists debate whether the central bank should raise interest rates.',
    exhibit: { title: 'Exhibit 1 · A simple price index (illustrative)', columns: ['Item', 'Weight', 'Index last year', 'Index this year'],
      rows: [['Food', '0.40', '100', '108'], ['Housing', '0.25', '100', '104'], ['Transport', '0.15', '100', '110'], ['Other', '0.20', '100', '102']], note: 'Average wage growth this year: 5%.' },
    tasks: [
      N('E4', 'Weighted inflation', 'Calculate the weighted price index for this year (sum of weight × index).', 106.1, '', '0.40×108 + 0.25×104 + 0.15×110 + 0.20×102 = 43.2 + 26 + 16.5 + 20.4 = 106.1 → inflation ≈ 6.1%.', 0.2),
      N('E4', 'Real wage change', 'Wages rose 5% and inflation was about 6.1%. What is the approximate change in real wages?', -1.1, '%', '5 − 6.1 = −1.1%: real wages fell.', 0.15),
      W('E4', 'Should rates rise?', 'Give one argument for and one against the central bank raising interest rates now.', 'For: higher rates reduce borrowing and spending, cooling demand-pull inflation and protecting the currency. Against: much of the inflation comes from food and transport costs (supply side), so higher rates would slow growth and hurt borrowers without fixing the cause.', ['Valid argument for', 'Valid argument against', 'Links to the type of inflation']),
    ],
    notes: { timing: ['10 min — calculations', '15 min — debate in two teams', '15 min — vote and reflection'],
      points: ['Weights matter: food dominates the basket', 'Real vs nominal wages', 'Supply-side inflation is hard to fix with interest rates'],
      extension: 'Ask students to build their own household basket and compare with the class.' },
  },
  {
    id: 'R-C6', unitId: 'K2', title: 'Why shoppers abandon online carts', minutes: 40,
    body: 'Áo Xinh is an online fashion store selling through its own website. Traffic is growing, but 72% of shoppers who add items to the cart leave without paying. Customer interviews mention delivery costs shown only at the last step, uncertainty about sizes, and a long registration form.',
    exhibit: { title: 'Exhibit 1 · Checkout funnel, last month', columns: ['Step', 'Visitors'], rows: [['Viewed a product', '60,000'], ['Added to cart', '9,000'], ['Started checkout', '4,500'], ['Paid', '2,520']], note: '' },
    tasks: [
      N('K2', 'Cart-to-purchase rate', 'What percentage of shoppers who added to cart went on to pay?', 28, '%', '2,520 ÷ 9,000 × 100 = 28% (so 72% abandoned).'),
      N('K2', 'Checkout drop-off', 'What percentage of shoppers who started checkout did NOT pay?', 44, '%', '(4,500 − 2,520) ÷ 4,500 × 100 = 44%.'),
      W('K2', 'Two fixes', 'Recommend two changes and say which funnel step each targets.', 'Show delivery cost on the product page and offer free delivery above 300,000 VND (targets the add-to-cart → checkout drop). Allow guest checkout with phone number only (targets the checkout → paid drop).', ['Two specific fixes', 'Each tied to a funnel step', 'Uses interview evidence']),
    ],
    notes: { timing: ['10 min — funnel maths', '20 min — redesign the checkout on paper', '10 min — share'],
      points: ['Biggest leak: cart → checkout (50%)', 'Surprise costs and friction are post-purchase-decision barriers', 'Test changes one at a time (A/B testing)'],
      extension: 'Estimate extra revenue if conversion from cart rises to 35% at an average order of 450,000 VND.' },
  },
  {
    id: 'R-C7', unitId: 'F2', title: 'Reading the accounts of a café chain', minutes: 45, isNew: true,
    body: 'Cà Phê Phố runs 8 cafés and wants a 2-billion-VND bank loan to open four more. The bank asks for an analysis of last year\'s accounts before deciding. You are the bank\'s junior credit analyst.',
    exhibit: { title: 'Exhibit 1 · Summary accounts (million VND)', columns: ['Item', 'Amount'],
      rows: [['Revenue', '9,600'], ['Net profit', '864'], ['Current assets', '1,050'], ['Inventory (included above)', '350'], ['Current liabilities', '700'], ['Long-term debt', '1,200'], ['Equity', '2,800']], note: 'Gearing = long-term debt ÷ (debt + equity).' },
    tasks: [
      N('F2', 'Net profit margin', 'Calculate the net profit margin.', 9, '%', '864 ÷ 9,600 × 100 = 9%.', 0.05),
      N('F2', 'Quick ratio', 'Calculate the quick ratio: (current assets − inventory) ÷ current liabilities.', 1, ': 1', '(1,050 − 350) ÷ 700 = 1.0.', 0.01),
      N('F2', 'Gearing before the loan', 'Calculate gearing before the new loan.', 30, '%', '1,200 ÷ (1,200 + 2,800) × 100 = 30%.', 0.1),
      W('F2', 'Credit recommendation', 'With the new 2-billion-VND loan, gearing would rise to about 53%. Write a short recommendation to the credit committee.', 'Approve a smaller or phased loan. A 9% margin and a quick ratio of 1.0 show the chain is profitable and liquid, but gearing would jump from 30% to 53%, so more than half of long-term funding would be debt. Suggest lending 1 billion now for two stores, the rest after results, with quarterly accounts as a condition.', ['Uses the ratios correctly', 'Clear decision', 'Sensible conditions / risks']),
    ],
    notes: { timing: ['15 min — ratios', '15 min — committee role-play', '15 min — debrief'],
      points: ['Profitability, liquidity and gearing answer different questions', 'Lenders care about cash to repay, not just profit', 'Conditions reduce risk'],
      extension: 'Ask students to verify the 53%: (1,200 + 2,000) ÷ (3,200 + 2,800). Then ask how much equity the owners would need to add to keep gearing at 40%.' },
  },
  {
    id: 'R-C8', unitId: 'M3', title: 'The lunchtime bottleneck at Bếp Nhà', minutes: 40, isNew: true,
    body: 'Bếp Nhà is a busy lunch restaurant in District 1. Between 11:30 and 13:30 customers wait up to 25 minutes. The owner timed each stage of an order to find the problem.',
    exhibit: { title: 'Exhibit 1 · Time per order at each station', columns: ['Station', 'Staff', 'Minutes per order (per person)'],
      rows: [['Take order & payment', '1', '1.5'], ['Cook main dish', '2', '4'], ['Prepare drinks', '1', '3'], ['Pack & serve', '1', '1']], note: 'Capacity per station = staff × 60 ÷ minutes per order (orders per hour).' },
    tasks: [
      N('M3', 'Kitchen capacity', 'How many orders per hour can the cooking station handle?', 30, 'orders/hour', '2 × 60 ÷ 4 = 30 orders per hour.'),
      N('M3', 'Drinks capacity', 'How many orders per hour can the drinks station handle?', 20, 'orders/hour', '1 × 60 ÷ 3 = 20 orders per hour → the bottleneck.'),
      W('M3', 'Fix the bottleneck', 'Which station is the bottleneck? Propose one change and estimate the new capacity of the restaurant.', 'Drinks (20/h) is the bottleneck. Moving the cashier to help with drinks at peak, or pre-batching iced tea, would double drinks capacity to about 40/h; the restaurant would then be limited by cooking at 30 orders per hour — a 50% increase.', ['Identifies drinks as the bottleneck', 'Practical change', 'Recalculates capacity and names the new bottleneck']),
    ],
    notes: { timing: ['10 min — capacity calculations', '15 min — redesign the flow', '15 min — present'],
      points: ['The slowest station sets the pace of the whole process', 'Fixing one bottleneck reveals the next', 'Cheap fixes (re-deploying staff) before expensive ones (hiring)'],
      extension: 'Ask how a pre-order app would change the flow.' },
  },
];

/* ------------------------------------------------------------------ case multiple-choice, audio, bento layout */
// [stem, options (first = correct), explanation]
const CASE_MCQ = {
  'R-C1': [['Between Q1 and Q3 export volume fell while the price rose. This is best explained by…', ['A leftward shift of supply', 'A rightward shift of demand', 'A fall in demand', 'A government price ceiling'], 'Price up and quantity down together is the signature of a supply decrease.'],
    ['Which group gained most from the price movement in the exhibit?', ['Farmers who held stock and sold in Q3', 'Roasters buying beans in Q3', 'Café customers', 'Farmers who sold everything in Q1'], 'Selling at the Q3 peak (3,600 USD/t) earned 50% more than selling in Q1.']],
  'R-C2': [['Receivables grew much faster than revenue. What does this show?', ['Customers are taking longer to pay', 'The bakery became less profitable', 'Inventory is falling', 'Suppliers are paying the bakery faster'], 'Receivables rose 2.7× while revenue rose 1.35×, so cash is waiting longer in unpaid invoices.'],
    ['Which action shortens the cash conversion cycle?', ['Collecting from canteens in 30 days instead of 60', 'Paying suppliers within 10 days', 'Holding more butter in stock', 'Offering customers 90-day credit'], 'Fewer receivable days means cash comes in sooner.']],
  'R-C3': [['Which channel has the lowest cost per 1,000 views?', ['TikTok ads', 'Micro-KOLs', 'Campus event sponsorship', 'Outdoor posters'], 'TikTok: 300k VND per 1,000 views; micro-KOLs: 600k VND.'],
    ['Which KPI best measures trial at the stores?', ['Redemptions of the opening code', 'Total TikTok views', 'Number of posters printed', 'Follower count'], 'Redemptions show people actually came in and bought.']],
  'R-C4': [['Why does the trial balance not balance?', ['Transaction 4 was posted with unequal debit and credit', 'Transaction 1 was on credit', 'Sales were too high', 'Wages were paid from the bank'], 'Debit 18 vs credit 6 leaves a one-sided difference of 12.'],
    ['Until the error is found, the difference is usually held in…', ['A suspense account', 'Retained earnings', 'The bank account', 'Sales revenue'], 'A suspense account holds the difference so statements can be drafted while the error is traced.']],
  'R-C5': [['Which item contributes most to this year\'s rise in the index?', ['Food', 'Transport', 'Housing', 'Other'], 'Food: 0.40 × 8 = 3.2 points; transport: 0.15 × 10 = 1.5 points.'],
    ['Wages rose 5% and prices about 6.1%. Real wages…', ['Fell', 'Rose', 'Stayed the same', 'Doubled'], 'Real wage change ≈ 5 − 6.1 = −1.1%.']],
  'R-C6': [['After shoppers add items to the cart, where is the biggest drop?', ['Between the cart and starting checkout', 'Between checkout and payment', 'Before viewing products', 'After payment'], '9,000 → 4,500 is a 50% drop; checkout → paid is 44%.'],
    ['Showing the delivery cost on the product page mainly reduces…', ['Surprise costs at checkout', 'Product views', 'Brand awareness', 'Return rates'], 'Interviews named late delivery costs as a reason to leave.']],
  'R-C7': [['A quick ratio of 1.0 means…', ['Liquid assets just cover current liabilities', 'The company holds no inventory', 'Profit equals revenue', 'Debt equals equity'], '(Current assets − inventory) equals current liabilities.'],
    ['If gearing rises from 30% to 53%, the business would…', ['Rely more on borrowed money', 'Become more profitable', 'Hold more cash', 'Have no debt'], 'More than half of long-term funding would be debt.']],
  'R-C8': [['The bottleneck is the station with…', ['The lowest capacity per hour', 'The most staff', 'The highest prices', 'The longest queue outside'], 'The slowest step sets the pace of the whole process.'],
    ['After the drinks station is fixed, restaurant capacity becomes…', ['30 orders per hour, set by cooking', '40 orders per hour', '20 orders per hour', 'Unlimited'], 'Cooking (2 × 60 ÷ 4 = 30/h) becomes the new bottleneck.']],
};
const CASE_AUDIO = {
  'R-C1': ['Briefing from the purchasing manager', 'Good morning, everyone. Our bean costs are up almost forty percent since January. The supplier says the drought abroad is the main reason. I would like each team to suggest how we protect our margins without losing our regular café customers.'],
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
    ...(chart ? [t('image', 2, 1, { src: chart, caption: c.exhibit.title.replace(/^Exhibit \d+ · /, 'Figure · ') })] : []),
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
  for (const e of [...EXERCISES, ...EXTRA_EXERCISES]) ex.push({ ...e, id: `WB-${e.unitId}-${++seq}`, caseId: null });
  for (const c of CASES) {
    (CASE_MCQ[c.id] || []).forEach(([stem, opts, explanation], i) => {
      const order = opts.map((o, k) => ({ o, k, s: r() })).sort((a, b) => a.s - b.s);
      ex.push({ id: `CQ-${c.id}-${i + 1}`, caseId: c.id, unitId: c.unitId, type: 'mcq', title: `Check ${i + 1}`, prompt: stem, options: order.map(x => x.o), answerIndex: order.findIndex(x => x.k === 0), solution: explanation });
    });
    c.tasks.forEach((t, i) => ex.push({ ...t, id: `CT-${c.id}-${i + 1}`, caseId: c.id }));
    const res = st.resources.find(x => x.id === c.id);
    const data = { title: c.title, unitId: c.unitId, minutes: c.minutes, body: c.body, exhibit: c.exhibit, notes: c.notes, full: true };
    if (res) Object.assign(res, data);
    else st.resources.push({ id: c.id, type: 'case_study', ...data, file: null, createdBy: 'D1', createdAt: iso(new Date('2026-08-25T09:00:00')) });
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

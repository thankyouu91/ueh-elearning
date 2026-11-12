// Finance (F1–F5): extra workbook exercises and library resources.
// Figures are illustrative teaching data, not official statistics.
import { C, O, N, W, M, CASE } from './helpers.js';

export const EXTRA = [
  /* ---------------- F1 · Time Value of Money ---------------- */
  M('F1', 'Simple interest', 'Interest that is earned only on the original amount invested, never on past interest, is called…',
    ['Compound interest', 'Simple interest', 'Effective interest', 'Discounted interest'], 1,
    'Simple interest is calculated on the principal only; compound interest also earns interest on interest.'),
  M('F1', 'What raises future value?', 'Which change would increase the future value of a bank deposit, other things equal?',
    ['A lower interest rate', 'A shorter deposit period', 'Leaving the money for more years', 'Withdrawing the interest each year'], 2,
    'FV = PV × (1 + r)ⁿ, so a larger n (more years of compounding) raises FV. Withdrawing interest removes the compounding effect.'),
  C('F1', 'FV or PV problem?', 'Is each question asking for a future value or a present value?', ['Future value problem', 'Present value problem'],
    [['How much will 50 million VND in a term deposit be worth in 5 years?', 0],
     ['How much must parents in Huế save today to have 300 million VND for university in 10 years?', 1],
     ['What is a lottery prize of 1 billion VND paid in 3 years worth today?', 1],
     ['What will a 20-million-VND gold savings plan grow to by 2030?', 0],
     ['What is the most a café owner should pay today for a lease that saves 40 million VND next year?', 1],
     ['How big will a retirement fund be after 25 years of compounding?', 0]],
    'Future value moves money forward in time by compounding; present value brings a future amount back to today by discounting.'),
  N('F1', 'Monthly compounding', 'A savings app in Hanoi offers 12% per year, compounded monthly (1% per month). How much will 50 million VND be worth after 1 year?', 56.34, 'million VND',
    'FV = 50 × 1.01¹² = 50 × 1.12683 = 56.34. Monthly compounding gives more than 50 × 1.12 = 56.',
    0.05),
  M('F1', 'Rule of 72', 'Using the rule of 72, roughly how long does it take money to double at 8% compound interest per year?',
    ['About 9 years', 'About 6 years', 'About 12.5 years', 'About 72 years'], 0,
    'Years to double ≈ 72 ÷ interest rate = 72 ÷ 8 = 9 years (check: 1.08⁹ ≈ 2.0).'),
  ...CASE('F1-mc1', 'Lan plans her savings',
    'Nguyễn Thị Lan, 26, works as a marketing officer in Đà Nẵng and has saved 200 million VND. Her bank offers a 3-year term deposit at 6% per year, compounded annually. A second bank offers 6.2% per year simple interest for the same 3 years. Lan also has a longer goal: she wants 250 million VND in 4 years for the down payment on a small car. She asks you to compare the two deposit offers and to tell her how much she would need to put aside today for the car, assuming she can earn 6% compounded annually.',
    [
      N('F1', 'Compound offer', 'How much will Lan have after 3 years with the 6% compound deposit?', 238.2, 'million VND',
        'FV = 200 × 1.06³ = 200 × 1.191016 = 238.20.', 0.05),
      M('F1', 'Which deposit wins?', 'Which offer leaves Lan with more money after 3 years?',
        ['The 6.2% simple-interest offer, because its rate is higher', 'Both give exactly the same amount', 'The 6% compound offer, by about 1 million VND', 'It cannot be compared without knowing inflation'], 2,
        'Simple: 200 × (1 + 0.062 × 3) = 237.2. Compound: 238.2. Compounding beats the higher simple rate by about 1 million VND.'),
      N('F1', 'Saving for the car', 'How much must Lan deposit today at 6% compounded annually to have 250 million VND in 4 years?', 198.02, 'million VND',
        'PV = 250 ÷ 1.06⁴ = 250 ÷ 1.262477 = 198.02.', 0.05),
    ]),
  N('F1', 'Present value of an annuity', 'A franchise contract will pay a Biên Hòa shop owner 30 million VND at the end of each year for 4 years. At a discount rate of 8%, what is the present value of these payments?', 99.36, 'million VND',
    'Annuity factor = (1 − 1.08⁻⁴) ÷ 0.08 = 3.3121. PV = 30 × 3.3121 = 99.36.', 0.05),
  M('F1', 'Perpetuity', 'A plot of land in Thủ Đức can be rented out for 12 million VND per year forever. At a discount rate of 10%, what is the present value of the rent?',
    ['12 million VND', '13.2 million VND', '120 million VND', '1.2 billion VND'], 2,
    'PV of a perpetuity = annual cash flow ÷ rate = 12 ÷ 0.10 = 120 million VND.'),
  M('F1', 'Effective annual rate', 'A consumer-finance company quotes 12% per year, compounded monthly. What is the effective annual rate?',
    ['12.00%', '12.36%', '12.68%', '13.00%'], 2,
    'EAR = (1 + 0.12/12)¹² − 1 = 1.01¹² − 1 = 12.68%. 12.36% would be the result with half-yearly compounding.'),
  N('F1', 'Implied growth rate', 'An investment in a Hội An homestay grew from 80 million VND to 100 million VND in 2 years. What annual compound rate of return does this represent?', 11.8, '%',
    'r = (100 ÷ 80)^(1/2) − 1 = √1.25 − 1 = 0.1180 = 11.8% per year (not 25% ÷ 2 = 12.5%, which ignores compounding).', 0.05),
  O('F1', 'Discounting uneven cash flows', 'Put the steps for finding the present value of a series of uneven future cash flows in the correct order.',
    ['List each cash flow and the year it is received', 'Choose the discount rate (required return)', 'Calculate the discount factor 1 ÷ (1 + r)ⁿ for each year', 'Multiply each cash flow by its discount factor', 'Add the discounted values to get the total present value'],
    'You must know the amount and timing first, then the rate, then discount each flow separately before adding them.'),

  /* ---------------- F2 · Financial Ratio Analysis ---------------- */
  M('F2', 'Measuring returns', 'Which ratio shows how much operating profit a company earns on the long-term capital invested in it?',
    ['Current ratio', 'Gearing', 'Return on capital employed (ROCE)', 'Inventory days'], 2,
    'ROCE = operating profit ÷ (equity + long-term debt). It measures how efficiently capital is used to generate profit.'),
  M('F2', 'Return on equity', 'Return on equity (ROE) is calculated as…',
    ['Net profit ÷ shareholders’ equity', 'Revenue ÷ total assets', 'Debt ÷ equity', 'Operating profit ÷ revenue'], 0,
    'ROE shows the profit earned for shareholders on each VND of equity they have invested.'),
  C('F2', 'Good or bad trend?', 'A bank compares a Bình Dương furniture maker this year with last year. Is each change favourable or unfavourable for the company?', ['Favourable', 'Unfavourable'],
    [['Net profit margin rises from 8% to 11%', 0], ['Receivable days rise from 35 to 52', 1], ['Gearing falls from 60% to 40%', 0],
     ['Interest cover falls from 6 times to 2.5 times', 1], ['Quick ratio rises from 0.5 to 0.9', 0], ['Inventory days rise from 40 to 70', 1]],
    'Higher margins, lower gearing and better liquidity are favourable; slower collection, more stock and weaker interest cover tie up cash or raise risk.'),
  N('F2', 'ROCE', 'A logistics firm in Hải Phòng has operating profit of 900 million VND, equity of 3,000 million VND and long-term debt of 1,500 million VND. Calculate ROCE.', 20, '%',
    'Capital employed = 3,000 + 1,500 = 4,500. ROCE = 900 ÷ 4,500 × 100 = 20%.', 0.05),
  N('F2', 'Interest cover', 'A rice exporter in Cần Thơ reports operating profit of 1,200 million VND and interest expense of 240 million VND. Calculate interest cover.', 5, 'times',
    'Interest cover = operating profit ÷ interest = 1,200 ÷ 240 = 5 times.', 0.01),
  M('F2', 'Slower-paying customers', 'Receivable days at a garment wholesaler rise from 30 to 55 days. The most likely explanation is that…',
    ['Customers are taking longer to pay', 'The company is paying suppliers faster', 'Sales have become more profitable', 'Inventory is selling more quickly'], 0,
    'Receivable days = receivables ÷ revenue × 365. A rise means more sales are still unpaid, which ties up cash.'),
  ...CASE('F2-mc1', 'Gỗ Đông Nam furniture',
    'Gỗ Đông Nam makes wooden furniture in Bình Dương for export. For the latest year it reports revenue of 12,000 million VND and cost of sales of 7,800 million VND. At the year end it holds inventory of 1,600 million VND, trade receivables of 1,400 million VND and cash of 200 million VND. Current liabilities, mostly supplier invoices and a short-term bank loan, are 2,000 million VND. Large orders from a US retailer have been delayed, and the finance manager is preparing ratios before meeting the bank to renew the short-term loan.',
    [
      N('F2', 'Gross profit margin', 'Calculate the gross profit margin.', 35, '%',
        'Gross profit = 12,000 − 7,800 = 4,200. Margin = 4,200 ÷ 12,000 × 100 = 35%.', 0.05),
      N('F2', 'Quick ratio', 'Calculate the quick (acid-test) ratio.', 0.8, ': 1',
        'Current assets = 1,600 + 1,400 + 200 = 3,200. Quick ratio = (3,200 − 1,600) ÷ 2,000 = 0.8.', 0.01),
      M('F2', 'Reading the gap', 'The current ratio is 1.6 but the quick ratio is only 0.8. What should the bank conclude?',
        ['The firm has too much cash', 'Liquidity depends heavily on selling inventory, which is risky while orders are delayed', 'The firm is highly profitable', 'The firm has no short-term debt'], 1,
        'Half of current assets is inventory. Without selling furniture, liquid assets cover only 80% of short-term debts.'),
    ]),
  M('F2', 'Gearing risk', 'A highly geared company is most at risk when…',
    ['Interest rates rise and profits fall', 'Its share price rises', 'It pays a smaller dividend', 'Its inventory days fall'], 0,
    'High gearing means large fixed interest payments; rising rates and falling profits squeeze interest cover.'),
  O('F2', 'Ratio analysis process', 'Put the steps of a ratio analysis in the correct order.',
    ['Collect the income statement and balance sheet', 'Calculate the key ratios', 'Compare with last year and with competitors', 'Identify the causes of the main changes', 'Make a recommendation'],
    'Ratios only have meaning once they are compared and explained, and the explanation leads to the recommendation.'),
  W('F2', 'Which chain to lend to?', 'Two bubble-tea chains in HCMC ask a bank for a loan. Chain A: net margin 12%, gearing 20%, interest cover 8 times. Chain B: net margin 18%, gearing 70%, interest cover 1.8 times. Which would you lend to, and why?',
    'I would lend to Chain A. B is more profitable, but 70% gearing and interest cover of only 1.8 times mean a small fall in profit could leave it unable to pay interest, and new debt would raise the risk further. A earns a healthy 12% margin, has little debt and covers interest 8 times, so it can safely carry an extra loan.',
    ['Clear choice (Chain A)', 'Uses gearing and interest cover to judge risk', 'Recognises B is more profitable but riskier'], 90),

  /* ---------------- F3 · Budgeting & Working Capital Management ---------------- */
  M('F3', 'Not a current asset', 'Which of the following is NOT a current asset?',
    ['Inventory of fabric', 'Money owed by customers', 'Cash at the bank', 'A delivery van'], 3,
    'A delivery van is used for several years, so it is a non-current asset.'),
  C('F3', 'In the cash budget?', 'A Đà Lạt flower farm is preparing its March cash budget. Should each item be included?', ['Include in the cash budget', 'Leave out'],
    [['Depreciation of greenhouses', 1], ['Monthly repayment of a bank loan', 0], ['Cash received from February customers', 0],
     ['Credit sales made in March but collected in May', 1], ['Cash paid for a new irrigation pump', 0], ['A provision for doubtful debts', 1]],
    'A cash budget records only actual cash in and out in the month. Depreciation and provisions are not cash, and the May collection belongs in May.'),
  M('F3', 'Overtrading', 'Overtrading means a business…',
    ['Grows sales too fast without enough working capital to support it', 'Sells more than its competitors', 'Holds too much cash', 'Trades shares too often'], 0,
    'Rapid growth needs more inventory and receivables before cash comes in; without finance the firm can run out of cash while profitable.'),
  N('F3', 'Payable days', 'A Vũng Tàu seafood processor has trade payables of 300 million VND and annual cost of sales of 3,650 million VND. Calculate payable days (use 365 days).', 30, 'days',
    'Payable days = 300 ÷ 3,650 × 365 = 30 days.', 0.5),
  N('F3', 'Inventory days', 'A phone accessories retailer holds inventory of 450 million VND; annual cost of sales is 2,190 million VND. Calculate inventory days (use 365 days).', 75, 'days',
    'Inventory days = 450 ÷ 2,190 × 365 = 75 days.', 0.5),
  M('F3', 'Factoring', 'A small exporter decides to factor its receivables. This means it…',
    ['Sells its unpaid invoices to a finance company for cash now', 'Buys more inventory on credit', 'Offers customers longer credit terms', 'Issues new shares'], 0,
    'Factoring turns receivables into immediate cash, in return for a fee or discount.'),
  ...CASE('F3-mc1', 'May Hoa tailors before Tết',
    'May Hoa is a tailoring shop in Hội An that sells áo dài to locals and tourists. It starts January with 50 million VND in the bank. Sales are forecast at 300 million VND in January, 450 million VND in February (Tết) and 200 million VND in March; December sales were 250 million VND. 40% of each month’s sales is paid in cash and 60% is collected the following month. Fabric purchases, paid in the month bought, are 260 million VND in January, 180 million VND in February and 120 million VND in March. Rent and wages are 80 million VND every month.',
    [
      N('F3', 'January receipts', 'Calculate total cash receipts in January.', 270, 'million VND',
        '40% of January sales + 60% of December sales = 0.4 × 300 + 0.6 × 250 = 120 + 150 = 270.'),
      N('F3', 'January closing cash', 'Calculate the closing cash balance at the end of January (use a minus sign for an overdraft).', -20, 'million VND',
        'Payments = 260 + 80 = 340. Net cash flow = 270 − 340 = −70. Closing = 50 − 70 = −20.'),
      M('F3', 'Fixing the January gap', 'February’s net cash flow is +100 million VND. What is the most sensible way to deal with January’s shortfall?',
        ['Take a 5-year bank loan', 'Arrange a small short-term overdraft and repay it in February', 'Sell the sewing machines', 'Cancel the Tết fabric order'], 1,
        'The gap is small and temporary; February receipts repay it. Long-term finance or cutting Tết stock would be costly overreactions.'),
    ]),
  N('F3', 'Receipts from credit sales', 'A Huế souvenir wholesaler collects 30% of sales in the month of sale, 50% the following month and 20% two months later. Sales are 400 million VND in January, 500 in February and 600 in March. Calculate cash receipts in March.', 510, 'million VND',
    '0.3 × 600 + 0.5 × 500 + 0.2 × 400 = 180 + 250 + 80 = 510.'),
  M('F3', 'Just-in-time', 'A just-in-time (JIT) inventory system mainly aims to…',
    ['Hold large safety stocks', 'Receive materials only when they are needed, keeping inventory low', 'Buy in bulk to get discounts', 'Delay paying suppliers'], 1,
    'JIT cuts inventory days and the cash tied up in stock, but depends on reliable suppliers.'),
  M('F3', 'Using a surplus', 'A cash budget shows a surplus of 400 million VND for the next three months, after which the money is needed for new equipment. The best use is to…',
    ['Buy shares in a volatile start-up', 'Lend it to staff interest-free', 'Place it in a 3-month bank term deposit', 'Leave it in a non-interest current account for a year'], 2,
    'A short-term deposit earns interest while keeping the cash safe and available when the equipment must be paid for.'),
  O('F3', 'Building a cash budget', 'Put the steps for preparing a monthly cash budget in the correct order.',
    ['Forecast monthly sales', 'Work out when cash from those sales will be received', 'Forecast monthly cash payments', 'Calculate net cash flow for each month', 'Add the opening balance to find the closing balance', 'Carry the closing balance forward as next month’s opening balance'],
    'Receipts depend on the sales forecast; the net flow plus the opening balance gives the closing balance, which links the months together.'),

  /* ---------------- F4 · Investment Appraisal ---------------- */
  M('F4', 'Weakness of payback', 'The main weakness of the payback method is that it…',
    ['Is hard to calculate', 'Ignores cash flows after the payback period', 'Always rejects good projects', 'Uses accounting profit instead of cash'], 1,
    'Payback stops counting once the cost is recovered, so it ignores later cash flows (and, in its simple form, the time value of money).'),
  C('F4', 'Relevant cash flows', 'A Đồng Nai shoe factory is appraising a new production line. Is each item a relevant cash flow for the decision?', ['Relevant', 'Not relevant'],
    [['Extra sales revenue from the new line', 0], ['Market research already paid last month', 1], ['Wages of new workers hired for the line', 0],
     ['Depreciation on the new machines', 1], ['Head-office rent that will not change', 1], ['Rent lost because spare factory space can no longer be let out', 0]],
    'Only future, incremental cash flows count. Sunk costs, non-cash items and unchanged overheads are ignored; lost rent is an opportunity cost.'),
  M('F4', 'Discount factor', 'What is the discount factor for year 2 at 10%?',
    ['0.826', '0.909', '0.800', '1.210'], 0,
    'Discount factor = 1 ÷ 1.10² = 1 ÷ 1.21 = 0.826. 0.909 is the year-1 factor.'),
  N('F4', 'Present value of a receipt', 'A Bắc Ninh electronics supplier expects a 200 million VND cash inflow in year 3. At a 10% discount rate, what is its present value?', 150.26, 'million VND',
    'PV = 200 ÷ 1.10³ = 200 ÷ 1.331 = 150.26.', 0.05),
  N('F4', 'IRR of a one-year project', 'A trader in Lạng Sơn invests 500 million VND in stock today and will receive 560 million VND in exactly one year. What is the IRR?', 12, '%',
    'At the IRR, 500 = 560 ÷ (1 + r), so 1 + r = 1.12 and r = 12%.', 0.05),
  ...CASE('F4-mc1', 'Cold store in Cần Thơ',
    'Mekong Fresh, a seafood exporter in Cần Thơ, is considering a new cold-storage warehouse costing 1,000 million VND. It would let the company store more pangasius and sell when prices are higher. The finance team forecasts net cash inflows of 300 million VND in year 1, 400 million VND in years 2 and 3, and 300 million VND in year 4, after which the equipment is worn out with no resale value. The company’s required rate of return is 12%. The board wants both a payback figure and an NPV before it decides.',
    [
      N('F4', 'Payback', 'Calculate the payback period in years (assume cash flows arrive evenly during each year).', 2.75, 'years',
        'Cumulative: 300 after year 1, 700 after year 2. Remaining 300 ÷ 400 = 0.75 of year 3 → 2.75 years.', 0.01),
      N('F4', 'NPV at 12%', 'Calculate the NPV at 12%.', 62.1, 'million VND',
        'PV = 300/1.12 + 400/1.12² + 400/1.12³ + 300/1.12⁴ = 267.86 + 318.88 + 284.71 + 190.65 = 1,062.10. NPV = 1,062.10 − 1,000 = 62.10.', 0.5),
      M('F4', 'What about IRR?', 'Based on your NPV, what can you say about the project’s IRR?',
        ['It is below 12%', 'It is exactly 12%', 'It is above 12%', 'It cannot be estimated from the NPV'], 2,
        'NPV is positive at 12%, so a higher rate is needed to bring NPV to zero: IRR > 12%, and the project should be accepted.'),
    ]),
  N('F4', 'NPV with an annuity', 'A delivery-van project costs 280 million VND and saves 80 million VND per year for 5 years. At 10% the 5-year annuity factor is 3.791. Calculate the NPV.', 23.28, 'million VND',
    'PV = 80 × 3.791 = 303.28. NPV = 303.28 − 280 = 23.28 → accept.', 0.1),
  M('F4', 'Accounting rate of return', 'Which appraisal method is based on accounting profit rather than cash flows?',
    ['Net present value', 'Internal rate of return', 'Discounted payback', 'Accounting rate of return (ARR)'], 3,
    'ARR = average annual profit ÷ investment. NPV, IRR and discounted payback all use cash flows.'),
  M('F4', 'Choosing between two', 'A company can build only one of two projects. Project X has NPV 90 million VND and IRR 25%; Project Y has NPV 140 million VND and IRR 18%. Both exceed the 12% cost of capital. Which should it choose?',
    ['Project X, because its IRR is higher', 'Project Y, because it adds more value to the company', 'Neither, because the methods disagree', 'Both, by splitting the budget'], 1,
    'For mutually exclusive projects NPV is the better guide, because it measures the increase in wealth in VND.'),
  O('F4', 'NPV appraisal steps', 'Put the steps of an NPV appraisal in the correct order.',
    ['Estimate the initial investment', 'Forecast the annual net cash inflows', 'Choose the discount rate (cost of capital)', 'Discount each cash flow to present value', 'Subtract the investment from the total PV to get NPV', 'Accept the project if NPV is positive'],
    'Cash flows and the rate are needed before discounting; the decision rule is applied last.'),
  W('F4', 'Cash-strapped choice', 'A Nha Trang hotel group must choose one project. Project A: NPV 120 million VND, payback 4 years. Project B: NPV 80 million VND, payback 2 years. The group is short of cash. Which would you recommend, and why?',
    'In principle A is better because it adds 40 million VND more value. However, the group is short of cash, so B’s 2-year payback returns money quickly and reduces the risk of a cash crisis, and near-term tourism cash flows are more certain. I would choose A only if financing is secure; otherwise B is the safer choice.',
    ['Recognises A has the higher NPV', 'Links payback to liquidity and risk', 'Reaches a justified, conditional recommendation'], 90),

  /* ---------------- F5 · Financial Markets & Institutions ---------------- */
  M('F5', 'The stock exchange', 'The Ho Chi Minh City Stock Exchange (HOSE) is mainly a place where…',
    ['The government sets interest rates', 'Listed shares are bought and sold between investors', 'Households open savings accounts', 'Insurance claims are paid'], 1,
    'HOSE is an organised secondary market where existing listed shares and other securities are traded.'),
  M('F5', 'Money market instrument', 'Which of the following is traded in the money market?',
    ['A 91-day treasury bill', 'A 10-year government bond', 'Ordinary shares', 'A 20-year mortgage'], 0,
    'The money market deals in short-term funds (up to one year); the others are long-term capital-market instruments.'),
  C('F5', 'Money or capital market?', 'Classify each instrument.', ['Money market', 'Capital market'],
    [['A 91-day State Treasury bill', 0], ['An overnight loan between two commercial banks', 0], ['A 10-year government bond', 1],
     ['New shares sold in an IPO on HOSE', 1], ['3-month commercial paper', 0], ['A 5-year corporate bond', 1]],
    'Instruments with a maturity of up to one year belong to the money market; longer-term debt and shares belong to the capital market.'),
  M('F5', 'Financial intermediation', 'Commercial banks such as those on every street in Hà Nội act as financial intermediaries by…',
    ['Printing banknotes', 'Setting the policy interest rate', 'Channelling savings from depositors to borrowers', 'Listing companies on the stock exchange'], 2,
    'Banks pool deposits and lend them to households and firms, earning the spread between lending and deposit rates.'),
  M('F5', 'Fighting inflation', 'Inflation is rising above target. The State Bank of Vietnam is most likely to…',
    ['Cut the refinancing rate', 'Raise its policy interest rates', 'Buy more government bonds', 'Lower banks’ reserve requirements'], 1,
    'Higher policy rates make borrowing more expensive, slowing credit growth and spending, which reduces inflationary pressure.'),
  M('F5', 'Shareholders vs bondholders', 'Compared with a bondholder, a shareholder…',
    ['Receives a fixed coupon every year', 'Is repaid before lenders if the firm fails', 'Owns part of the company and receives dividends that are not guaranteed', 'Has a fixed maturity date'], 2,
    'Shares are ownership with uncertain dividends; bonds are loans with fixed coupons and priority over shareholders.'),
  N('F5', 'Dividend yield', 'A share listed on HOSE trades at 40,000 VND and paid a dividend of 2,000 VND per share last year. What is the dividend yield?', 5, '%',
    'Dividend yield = 2,000 ÷ 40,000 × 100 = 5%.', 0.05),
  ...CASE('F5-mc1', 'Bond or deposit for Mr Hùng?',
    'Trần Văn Hùng, a retired teacher in Hà Nội, wants a safe income from his savings. His broker offers Vietnamese government bonds with a face value of 100,000 VND, a coupon of 5% paid once a year and 3 years left to maturity. Because new bonds now pay more, the old bonds trade at 97,000 VND each. Alternatively, his bank offers a 12-month term deposit at 5.5% per year. Mr Hùng is considering buying 5,000 bonds and asks you to explain the numbers.',
    [
      N('F5', 'Current yield', 'Calculate the current yield of the bond.', 5.15, '%',
        'Coupon = 5% × 100,000 = 5,000 VND. Current yield = 5,000 ÷ 97,000 × 100 = 5.15%.', 0.05),
      N('F5', 'Annual coupon income', 'If Mr Hùng buys 5,000 bonds, how much coupon income will he receive each year?', 25, 'million VND',
        '5,000 bonds × 5,000 VND coupon = 25,000,000 VND = 25 million VND.', 0.01),
      M('F5', 'Why below face value?', 'Why does the bond trade below its 100,000 VND face value?',
        ['The government may not repay it', 'Its 5% coupon is lower than the return on newly issued bonds, so its price falls to give a competitive yield', 'Bonds always trade below face value', 'The coupon is paid only once a year'], 1,
        'A fixed coupon below current market rates is less attractive, so the price drops until the overall yield matches the market.'),
    ]),
  N('F5', 'One-year bond price', 'A 1-year bond has a face value of 100,000 VND and pays a 6% coupon at maturity. If investors require 8%, what price will they pay today? Round to the nearest VND.', 98148, 'VND',
    'Cash at maturity = 100,000 + 6,000 = 106,000. Price = 106,000 ÷ 1.08 = 98,148.', 1),
  N('F5', 'Two-year bond price', 'A 2-year corporate bond has a face value of 1,000,000 VND and pays a 10% annual coupon. The market yield is 8%. Calculate its price. Round to the nearest VND.', 1035665, 'VND',
    'Price = 100,000 ÷ 1.08 + 1,100,000 ÷ 1.08² = 92,593 + 943,073 = 1,035,665. It trades above face value because its coupon beats the 8% market yield.', 1),
  O('F5', 'Buying shares on HOSE', 'Put the steps for a student buying shares on HOSE for the first time in the correct order.',
    ['Open a securities trading account with a licensed broker', 'Deposit money into the trading account', 'Place a buy order with a price and quantity', 'The order is matched with a seller on the exchange', 'The shares settle into the account after the settlement period'],
    'An account and funds are needed before an order can be placed; matching happens on the exchange and settlement follows.'),
  W('F5', 'Rates and real estate', 'The State Bank of Vietnam raises its policy interest rate by 1 percentage point. Explain two ways this could affect a real-estate developer that plans to raise money for a new apartment project in HCMC.',
    'First, bank loans become more expensive, so the developer’s interest costs rise and the project’s NPV falls. Second, bond investors will demand higher yields, so any new corporate bonds must offer a higher coupon, and existing bond prices fall. Higher mortgage rates may also cut demand from home buyers, reducing expected sales.',
    ['Explains higher borrowing cost from banks', 'Links rates to bond yields / prices', 'Mentions an effect on buyers, demand or project value'], 90),
];

export const LIB = [
  ['R-FIN-C1', 'case_study', 'F4', 'Rooftop solar at a Long An packaging plant', 40,
    'Phúc Thịnh Packaging makes cartons for food exporters in Long An province. Electricity is its second-largest cost, and the factory roof covers 6,000 square metres. A solar installer offers a rooftop system for 2,400 million VND. The finance team estimates that the panels will cut electricity bills by 650 million VND per year for 6 years. Cleaning and maintenance will cost 50 million VND per year. After 6 years the inverters must be replaced, and the board assumes no resale value. The company’s cost of capital is 10%.\n' +
    'Two large customers have asked suppliers to show lower carbon emissions by 2028. The chief accountant, however, worries that electricity tariffs may change and that the company could instead use the money to buy a second printing machine.\n\n' +
    '1. Calculate the net annual cash saving and the simple payback period.\n' +
    '2. Calculate the NPV at 10% (6-year annuity factor 4.355). Should the project be accepted?\n' +
    '3. Recalculate the NPV at 14% (annuity factor 3.889) and estimate the IRR.\n' +
    '4. How would a 20% fall in the annual saving change your answer?\n' +
    '5. Write a short recommendation to the board that includes at least two non-financial factors.'],
  ['R-FIN-C2', 'case_study', 'F5', 'Sông Hàn Land’s corporate bond offer', 35,
    'Sông Hàn Land, an invented property developer in Đà Nẵng, wants to raise 500 billion VND to build a riverside apartment block. Instead of borrowing from a bank, it plans to issue 3-year corporate bonds with a face value of 100 million VND each and an annual coupon of 10.5%. At the same time, 3-year government bonds yield about 3%, and 12-month bank deposits pay about 5.5%.\n' +
    'A sales agent is calling small investors in Đà Nẵng, describing the bonds as “as safe as a bank deposit, but double the return”. The company has no credit rating, and its main asset is the land for the project. Its sales depend on mortgage rates, and the State Bank of Vietnam has recently raised policy rates.\n\n' +
    '1. Calculate the extra yield (spread) the bond offers over the government bond and over a bank deposit.\n' +
    '2. Explain why investors demand this spread. What risks does it reflect?\n' +
    '3. If market rates for similar bonds rise to 12%, what happens to the price of the 10.5% bond? Explain.\n' +
    '4. Is the sales agent’s description fair? Refer to the role of regulators and disclosure in protecting investors.\n' +
    '5. Advise a retired investor with 300 million VND whether to buy the bonds.'],
  ['R-FIN-G1', 'group_project', 'F2', 'Ratio health check of a HOSE-listed company', 180,
    'Brief\n' +
    'Choose one company listed on HOSE (for example in retail, dairy, steel or aviation). Download its last two audited annual reports and analyse its financial health as if your team were advising a bank credit committee.\n\n' +
    'Deliverables\n' +
    '- A spreadsheet with liquidity, profitability, efficiency and gearing ratios for two years\n' +
    '- A comparison with one competitor in the same industry\n' +
    '- A 1,500-word report with a clear lending recommendation\n' +
    '- A 10-minute presentation with 8–10 slides\n\n' +
    'Team roles (4–5 students)\n' +
    '- Data lead: extracts figures from the statements\n' +
    '- Ratio analyst: builds and checks the spreadsheet\n' +
    '- Industry researcher: collects competitor and sector data\n' +
    '- Report editor: writes and edits the final report\n' +
    '- Presenter (or shared): designs the slides and leads Q&A\n\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: choose the company, collect reports, agree the ratio list\n' +
    '- Week 2: calculate ratios, compare with the competitor, draft findings\n' +
    '- Week 3: finish the report, rehearse and present\n\n' +
    'Assessment (100 points)\n' +
    '- Accuracy of ratio calculations: 30\n' +
    '- Interpretation and comparison: 30\n' +
    '- Quality of recommendation: 20\n' +
    '- Report and presentation: 15\n' +
    '- Teamwork (peer review): 5'],
  ['R-FIN-G2', 'group_project', 'F3', 'Cash budget for a family business', 180,
    'Brief\n' +
    'Work with a small family business you can interview (for example a phở shop, a phone repair stall or a clothing shop on Shopee). Build a 6-month cash budget that covers Tết, identify the months with a cash shortfall and propose ways to manage working capital.\n\n' +
    'Deliverables\n' +
    '- Interview notes with the owner (sales pattern, credit terms, main costs)\n' +
    '- A 6-month cash budget in a spreadsheet, with opening and closing balances\n' +
    '- A one-page memo to the owner with three working-capital recommendations\n' +
    '- A 7-minute class presentation\n\n' +
    'Team roles (4–5 students)\n' +
    '- Interviewer: arranges and leads the owner interview\n' +
    '- Sales forecaster: estimates monthly sales and receipts\n' +
    '- Cost analyst: estimates purchases, wages, rent and other payments\n' +
    '- Budget builder: builds and checks the spreadsheet\n' +
    '- Memo writer: drafts recommendations and the presentation\n\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: interview the owner and collect data\n' +
    '- Week 2: build the cash budget and test a “bad Tết” scenario\n' +
    '- Week 3: write the memo, share it with the owner, present in class\n\n' +
    'Assessment (100 points)\n' +
    '- Realism of data and assumptions: 25\n' +
    '- Accuracy of the cash budget: 30\n' +
    '- Quality of recommendations: 25\n' +
    '- Memo and presentation: 15\n' +
    '- Teamwork (peer review): 5'],
];

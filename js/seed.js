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
  ['E1', 'ECO', 'The Economic Problem & Economic Systems', 'Explain scarcity, opportunity cost and the production possibility frontier, and compare market, command and mixed economies.'],
  ['E2', 'ECO', 'Demand, Supply & Market Equilibrium', 'Use demand and supply diagrams to explain how prices are set and how markets respond to shocks.'],
  ['E3', 'ECO', 'Elasticity & Government Intervention', 'Calculate price elasticity of demand and analyse price ceilings, price floors and indirect taxes.', 'Price of bubble tea rises from 40,000 to 44,000 VND (+10%). Weekly cups sold fall from 1,000 to 850 (−15%). PED = −15% ÷ 10% = −1.5 → demand is price elastic, so total revenue falls (40m → 37.4m VND).'],
  ['E4', 'ECO', 'Macroeconomics: GDP, Inflation & Unemployment', 'Measure national output, distinguish nominal and real values, and explain the costs of inflation and unemployment.', 'Nominal GDP grows 9% and inflation (GDP deflator) is 4%. Real GDP growth ≈ 9% − 4% = 5%.'],
  ['E5', 'ECO', 'Money, Banking & Monetary Policy', 'Explain the functions of money, how commercial banks create credit, and how the central bank uses interest rates.'],
  ['E6', 'ECO', 'International Trade & Exchange Rates', 'Apply comparative advantage and explain how exchange-rate movements affect exporters and importers.'],
  ['E7', 'ECO', 'Market Structures & Competition', 'Compare perfect competition, monopolistic competition, oligopoly and monopoly.'],
  ['E8', 'ECO', "Development Economics & Vietnam's Growth", 'Discuss indicators of development and the drivers of growth in emerging economies.'],

  ['A1', 'ACC', 'Accounting Concepts & the Accounting Equation', 'Apply the accounting equation and the main accounting concepts to everyday business transactions.'],
  ['A2', 'ACC', 'Double-Entry Recording & the Trial Balance', 'Record transactions with debits and credits, post them to the ledger and extract a trial balance.'],
  ['A3', 'ACC', 'Preparing Financial Statements', 'Prepare an income statement and a statement of financial position, including depreciation.', 'Revenue 900m, cost of sales 540m → gross profit 360m. Operating expenses 210m (incl. depreciation 30m) → net profit 150m VND.'],
  ['A4', 'ACC', 'Cost Accounting & Break-even Analysis', 'Classify fixed and variable costs and use contribution to calculate break-even output and margin of safety.', 'Fixed costs 60m VND/month; price 50,000; variable cost 30,000 → contribution 20,000/unit. Break-even = 60,000,000 ÷ 20,000 = 3,000 units.'],
  ['A5', 'ACC', 'Auditing Fundamentals', 'Explain the purpose of an external audit, auditor independence, materiality and audit evidence.'],
  ['A6', 'ACC', 'Taxation Basics: VAT & Corporate Income Tax', 'Calculate VAT payable and taxable profit for a small company.'],
  ['A7', 'ACC', 'IFRS & Financial Reporting Standards', 'Explain why international standards matter and how they change reported figures.'],

  ['F1', 'FIN', 'Time Value of Money', 'Calculate future and present values with compound interest and discounting.', '100m VND invested at 10% for 3 years: FV = 100 × 1.10³ = 133.1m VND. PV of 133.1m in 3 years at 10% = 100m VND.'],
  ['F2', 'FIN', 'Financial Ratio Analysis', 'Calculate and interpret liquidity, profitability and gearing ratios.', 'Current assets 450m, current liabilities 300m → current ratio 1.5. Net profit 150m on revenue 900m → net margin 16.7%.'],
  ['F3', 'FIN', 'Budgeting & Working Capital Management', 'Prepare a cash budget and manage inventory, receivables and payables.'],
  ['F4', 'FIN', 'Investment Appraisal: NPV, IRR & Payback', 'Evaluate investment projects with payback, net present value and internal rate of return.', 'Cost 300m; inflows 120m per year for 3 years; discount rate 10%. PV = 120 × 2.487 = 298.4m → NPV = −1.6m (reject). Payback = 2.5 years.'],
  ['F5', 'FIN', 'Financial Markets & Institutions', 'Describe money and capital markets, the role of the central bank, and the link between bond prices and interest rates.'],
  ['F6', 'FIN', 'Capital Structure & Cost of Capital', 'Calculate WACC and discuss the trade-off between debt and equity.'],
  ['F7', 'FIN', 'Risk Management & Insurance', 'Identify business risks and choose to avoid, reduce, transfer or accept them.'],

  ['M1', 'MGT', 'Management Functions & Organisational Structure', 'Describe planning, organising, leading and controlling, and compare organisational structures.'],
  ['M2', 'MGT', 'Entrepreneurship & New Venture Creation', 'Turn a business idea into a business plan, and choose a legal form and source of finance.'],
  ['M3', 'MGT', 'Operations & Project Management', 'Apply lean principles, capacity utilisation and simple project-scheduling tools.'],
  ['M4', 'MGT', 'Business Communication & Report Writing', 'Write clear emails, memos and short reports for business audiences.'],
  ['M5', 'MGT', 'Human Resource Management', 'Explain recruitment, training, appraisal and motivation in organisations.'],
  ['M6', 'MGT', 'Business Ethics & Corporate Governance', 'Analyse ethical dilemmas and the role of boards and stakeholders.'],

  ['K1', 'MKT', 'Marketing Concepts & the Marketing Mix', 'Apply segmentation, targeting, positioning and the 4Ps to a product.'],
  ['K2', 'MKT', 'Consumer Behaviour', 'Explain the buying-decision process and the personal and social influences on consumers.'],
  ['K3', 'MKT', 'Marketing Communication & Advertising', 'Plan an integrated campaign using advertising, PR, sales promotion and personal selling.'],
  ['K4', 'MKT', 'Digital & Social Media Marketing', 'Use SEO, social media and paid ads, and read basic campaign metrics.', '50,000 impressions, 1,000 clicks, 40 orders. CTR = 1,000 ÷ 50,000 = 2%. Conversion rate = 40 ÷ 1,000 = 4%.'],
  ['K5', 'MKT', 'Market Research & Data', 'Design a questionnaire, choose a sample and summarise survey results.'],
  ['K6', 'MKT', 'Brand Management', 'Build brand identity and measure brand awareness and brand equity.'],
  ['K7', 'MKT', 'Sales & Customer Relationship Management', 'Manage the sales pipeline and customer retention with CRM data.'],
];

// [unitId, stem, options (first = correct), bloom]
const Q = [
  ['E1', 'Opportunity cost is best defined as…', ['The value of the next best alternative given up', 'The money price of a good', 'The total cost of production', 'A cost that cannot be recovered'], 'Remember'],
  ['E1', 'A point inside the production possibility frontier (PPF) shows…', ['Unemployed or inefficiently used resources', 'Maximum efficiency', 'An unattainable level of output', 'Economic growth'], 'Understand'],
  ['E1', 'Which system relies mainly on prices set by supply and demand?', ['Market economy', 'Command economy', 'Traditional economy', 'Centrally planned economy'], 'Remember'],
  ['E2', 'If the price of coffee rises, the quantity of coffee demanded will…', ['Fall', 'Rise', 'Stay the same', 'Become zero'], 'Understand'],
  ['E2', 'Consumer incomes rise. For a normal good this causes…', ['The demand curve to shift right', 'The demand curve to shift left', 'A movement along the supply curve', 'The supply curve to shift right'], 'Apply'],
  ['E2', 'At the equilibrium price…', ['Quantity demanded equals quantity supplied', 'There is a surplus', 'There is a shortage', 'The government sets the price'], 'Remember'],
  ['E3', 'A 10% price rise causes a 20% fall in quantity demanded. Demand is…', ['Price elastic (PED = −2)', 'Price inelastic', 'Unit elastic', 'Perfectly inelastic'], 'Apply'],
  ['E3', 'A maximum price set below the equilibrium price creates…', ['A shortage', 'A surplus', 'No change in the market', 'Higher supply'], 'Analyze'],
  ['E3', 'Governments often tax goods with inelastic demand because…', ['Tax revenue stays high as quantity falls only a little', 'Consumers stop buying them', 'Producers pay all of the tax', 'Prices fall after the tax'], 'Analyze'],
  ['E4', 'GDP measures…', ['The total value of final goods and services produced in a country', 'Total government spending', 'Exports minus imports', 'The money supply'], 'Remember'],
  ['E4', 'Inflation is…', ['A sustained rise in the general price level', 'A fall in national output', 'A rise in unemployment', 'An increase in exports'], 'Remember'],
  ['E4', 'Nominal GDP grows 8% and inflation is 3%. Real GDP grows by about…', ['5%', '11%', '8%', '3%'], 'Apply'],

  ['A1', 'The accounting equation is…', ['Assets = Liabilities + Equity', 'Assets = Revenue − Expenses', 'Equity = Assets + Liabilities', 'Liabilities = Assets + Equity'], 'Remember'],
  ['A1', 'A business buys equipment for cash. The effect is…', ['One asset increases and another asset decreases', 'Assets and liabilities both increase', 'Equity decreases', 'Liabilities decrease'], 'Apply'],
  ['A1', 'The going-concern concept assumes the business will…', ['Continue operating for the foreseeable future', 'Be sold next year', 'Always make a profit', 'Pay no taxes'], 'Understand'],
  ['A2', 'In double-entry bookkeeping every transaction is recorded…', ['As a debit in one account and a credit in another', 'Only in the cash book', 'Twice in the same account', 'Only at the year end'], 'Remember'],
  ['A2', 'An increase in an asset account is recorded as a…', ['Debit', 'Credit', 'Contra entry', 'Memo entry'], 'Remember'],
  ['A2', 'A trial balance that balances proves that…', ['Total debits equal total credits', 'There are no errors at all', 'The business made a profit', 'All invoices were paid'], 'Understand'],
  ['A3', 'Which statement shows financial position at a point in time?', ['Statement of financial position (balance sheet)', 'Income statement', 'Cash flow statement', 'Statement of changes in equity'], 'Remember'],
  ['A3', 'Revenue 500, cost of sales 300, expenses 120. Net profit is…', ['80', '200', '380', '920'], 'Apply'],
  ['A3', 'Depreciation is recorded in order to…', ['Spread the cost of a non-current asset over its useful life', 'Increase cash', 'Reduce liabilities', 'Value inventory'], 'Understand'],
  ['A4', 'Fixed costs 20,000; price 50; variable cost 30 per unit. Break-even output is…', ['1,000 units', '400 units', '667 units', '2,500 units'], 'Apply'],
  ['A4', 'Which is a variable cost for a bakery?', ['Flour', 'Rent', 'Insurance', "The manager's salary"], 'Understand'],
  ['A4', 'Contribution per unit equals…', ['Selling price − variable cost per unit', 'Selling price − fixed cost', 'Total revenue − total cost', 'Fixed cost ÷ units sold'], 'Remember'],
  ['A5', 'The main purpose of an external audit is to…', ['Give an opinion on whether the financial statements are fairly presented', 'Prepare the financial statements', 'Detect every fraud', 'Calculate the tax payable'], 'Understand'],
  ['A5', 'Auditor independence means the auditor…', ['Has no interest that could bias their judgement', "Works in the client's finance team", "Sets the company's prices", 'Is paid a share of profits'], 'Understand'],
  ['A5', 'Evidence obtained directly by the auditor is generally…', ['More reliable than evidence produced by the client', 'Less reliable than client evidence', 'Not acceptable', 'Only needed for small firms'], 'Analyze'],

  ['F1', 'Why is 1 million VND today worth more than 1 million VND in a year?', ['It can be invested to earn interest', 'Prices always fall', 'Banks charge fees', 'Money only loses value after a year'], 'Understand'],
  ['F1', '100 million VND invested at 10% compound interest for 2 years grows to…', ['121 million VND', '120 million VND', '110 million VND', '200 million VND'], 'Apply'],
  ['F1', 'The present value of a future cash flow falls when…', ['The discount rate rises', 'The discount rate falls', 'The cash flow rises', 'The time period shortens'], 'Analyze'],
  ['F2', 'The current ratio is calculated as…', ['Current assets ÷ current liabilities', 'Total assets ÷ equity', 'Net profit ÷ revenue', 'Debt ÷ equity'], 'Remember'],
  ['F2', 'A current ratio of 0.6 suggests…', ['Possible difficulty paying short-term debts', 'Very strong liquidity', 'High profitability', 'Low gearing'], 'Analyze'],
  ['F2', 'Net profit margin measures…', ['Profit as a percentage of revenue', 'Cash in the bank', 'Debt relative to equity', 'Inventory turnover speed'], 'Understand'],
  ['F3', 'Working capital is…', ['Current assets minus current liabilities', 'Total assets minus total liabilities', 'Cash minus inventory', 'Revenue minus expenses'], 'Remember'],
  ['F3', 'A cash budget is mainly used to…', ['Forecast future cash shortages or surpluses', 'Record past transactions', 'Calculate depreciation', 'Value shares'], 'Understand'],
  ['F3', 'Giving customers longer credit terms will usually…', ['Increase receivables and tie up cash', 'Increase cash immediately', 'Reduce sales', 'Reduce inventory'], 'Analyze'],
  ['F4', 'Under the NPV rule a project should be accepted if…', ['NPV is positive', 'NPV is negative', 'Payback is longer than its life', 'IRR is below the cost of capital'], 'Understand'],
  ['F4', 'A project costs 300 and returns 100 per year. Its payback period is…', ['3 years', '2 years', '4 years', '1 year'], 'Apply'],
  ['F4', 'IRR is the discount rate at which…', ['NPV equals zero', 'NPV is maximised', 'Payback is shortest', 'Cash flows double'], 'Remember'],
  ['F5', "The State Bank of Vietnam is the country's…", ['Central bank', 'Stock exchange', 'Largest commercial bank', 'Insurance regulator only'], 'Remember'],
  ['F5', 'A primary market is where…', ['New securities are issued to investors', 'Existing shares are traded between investors', 'Only foreign currency is traded', 'Banks lend to each other overnight'], 'Understand'],
  ['F5', 'Bond prices usually fall when market interest rates…', ['Rise', 'Fall', 'Stay constant', 'Are zero'], 'Analyze'],

  ['M1', 'The four functions of management are…', ['Planning, organising, leading, controlling', 'Buying, selling, hiring, firing', 'Producing, pricing, promoting, placing', 'Saving, investing, borrowing, lending'], 'Remember'],
  ['M1', 'A tall organisational structure has…', ['Many levels of hierarchy and narrow spans of control', 'Few levels and wide spans of control', 'No managers', 'Only one department'], 'Understand'],
  ['M1', 'Comparing actual sales with targets is part of…', ['Controlling', 'Organising', 'Leading', 'Recruiting'], 'Apply'],
  ['M2', 'A business plan is mainly used to…', ['Set goals and convince investors and lenders', 'Record daily transactions', 'Pay employees', 'Calculate tax'], 'Understand'],
  ['M2', "A start-up's unique selling proposition (USP) is…", ['What makes its offer different from competitors', 'Its legal name', 'Its tax code', 'Its office location'], 'Understand'],
  ['M2', 'Which source of finance do new small businesses use most often?', ["Owner's savings and family loans", 'Issuing bonds', 'Listing on the stock exchange', 'Many years of retained profit'], 'Apply'],
  ['M3', 'Lean production aims to…', ['Reduce waste in every process', 'Increase inventory levels', 'Hire more staff', 'Raise prices'], 'Understand'],
  ['M3', 'In project scheduling, the critical path is…', ["The sequence of tasks that sets the project's minimum duration", 'The cheapest set of tasks', 'Tasks that can be skipped', 'The project budget'], 'Understand'],
  ['M3', 'Capacity utilisation of 80% means…', ['Output is 80% of the maximum possible output', 'Costs fell by 80%', '80% of staff are absent', 'Sales rose by 80%'], 'Apply'],
  ['M4', 'An executive summary should be placed…', ['At the start of a report', 'At the end of the appendix', 'Only in emails', 'In the reference list'], 'Remember'],
  ['M4', 'Which sentence is most appropriate in a formal business report?', ['"Revenue increased by 12% in Q3, driven by online sales."', '"Sales went up a lot, which is awesome."', '"We did great this time!!"', '"Numbers are better I think."'], 'Apply'],
  ['M4', 'When writing to a customer about a delayed order, you should first…', ['Apologise and give the new delivery date', 'Blame the supplier', 'Ignore the delay', 'Offer no explanation'], 'Apply'],

  ['K1', 'The 4Ps of the marketing mix are…', ['Product, price, place, promotion', 'Plan, produce, pay, profit', 'People, process, power, policy', 'Price, profit, push, pull'], 'Remember'],
  ['K1', 'Market segmentation means…', ['Dividing a market into groups with similar needs', 'Selling to everyone in the same way', 'Lowering prices', 'Exporting to new countries'], 'Understand'],
  ['K1', 'A premium pricing strategy is most suitable when…', ['The product has strong brand value and quality', 'The product is identical to rivals', 'Customers are very price sensitive', 'The firm wants to clear old stock'], 'Analyze'],
  ['K2', "Maslow's hierarchy suggests consumers satisfy … needs first.", ['Physiological', 'Self-actualisation', 'Esteem', 'Social'], 'Remember'],
  ['K2', 'A reference group influences buying by…', ['Shaping attitudes through people the consumer identifies with', 'Setting the legal price', 'Reducing product quality', 'Controlling distribution'], 'Understand'],
  ['K2', 'Post-purchase dissonance is…', ['Doubt a buyer feels after an important purchase', 'A discount given after purchase', 'A product recall', 'The delivery process'], 'Understand'],
  ['K3', 'AIDA stands for…', ['Attention, Interest, Desire, Action', 'Advertise, Inform, Deliver, Adapt', 'Analyse, Implement, Design, Assess', 'Audience, Idea, Design, Advert'], 'Remember'],
  ['K3', 'Which is an example of public relations (PR)?', ['A press release about a charity partnership', 'A 20% discount coupon', 'A paid TV advert', 'A sales call'], 'Apply'],
  ['K3', 'Integrated marketing communications (IMC) means…', ['All channels deliver one consistent message', 'Using only one channel', 'Advertising only on TV', 'Each channel chooses its own message'], 'Understand'],
  ['K4', 'Click-through rate (CTR) is calculated as…', ['Clicks ÷ impressions', 'Impressions ÷ clicks', 'Sales ÷ clicks', 'Cost ÷ sales'], 'Remember'],
  ['K4', 'An ad has 50,000 impressions and 1,000 clicks. The CTR is…', ['2%', '5%', '0.5%', '20%'], 'Apply'],
  ['K4', 'Search engine optimisation (SEO) aims to…', ["Improve a website's ranking in organic search results", 'Buy paid search ads', 'Send bulk emails', 'Design logos'], 'Understand'],
  ['K5', 'Primary data is…', ['Collected first-hand for a specific purpose', 'Taken from published reports', 'Always free', 'Only numerical'], 'Remember'],
  ['K5', 'Which survey question is biased?', ['"Don\'t you agree our new drink is delicious?"', '"How often do you buy bottled tea?"', '"Which coffee brands have you bought this month?"', '"How much do you usually spend on lunch?"'], 'Analyze'],
  ['K5', 'A sample is…', ['A subset of the population being studied', 'The whole population', 'A free product', 'A type of advert'], 'Remember'],
  ['K6', 'Brand equity refers to…', ['The extra value a brand name adds to a product', 'The legal cost of a trademark', 'The number of products a firm sells', "The company's share capital"], 'Understand'],
  ['K6', 'Brand extension means…', ['Using an existing brand name for a new product category', 'Changing a logo', 'Lowering prices', 'Selling the brand'], 'Understand'],
  ['K6', 'Which is the best measure of brand awareness?', ['Share of target customers who recognise the brand', 'Total factory output', 'Number of employees', 'Annual tax paid'], 'Apply'],
];

// [term, Vietnamese, definition, unit]
const VOCAB = [
  ['Opportunity cost', 'Chi phí cơ hội', 'The value of the next best alternative given up when making a choice.', 'E1'],
  ['Scarcity', 'Sự khan hiếm', 'Limited resources relative to unlimited wants, which forces choices.', 'E1'],
  ['Equilibrium price', 'Giá cân bằng', 'The price at which quantity demanded equals quantity supplied.', 'E2'],
  ['Demand curve', 'Đường cầu', 'A graph showing the quantity buyers will purchase at each price.', 'E2'],
  ['Price elasticity of demand', 'Độ co giãn của cầu theo giá', 'The responsiveness of quantity demanded to a change in price.', 'E3'],
  ['Price ceiling', 'Giá trần', 'A legal maximum price, usually set below equilibrium.', 'E3'],
  ['Gross Domestic Product (GDP)', 'Tổng sản phẩm quốc nội', 'The total value of final goods and services produced in a country in a period.', 'E4'],
  ['Inflation', 'Lạm phát', 'A sustained rise in the general price level.', 'E4'],
  ['Assets', 'Tài sản', 'Resources controlled by a business that are expected to bring future benefits.', 'A1'],
  ['Liabilities', 'Nợ phải trả', 'Present obligations of a business, such as loans and amounts owed to suppliers.', 'A1'],
  ['Debit / Credit', 'Ghi Nợ / Ghi Có', 'The left and right sides of an account in double-entry bookkeeping.', 'A2'],
  ['Trial balance', 'Bảng cân đối thử', 'A list of all ledger balances used to check that debits equal credits.', 'A2'],
  ['Balance sheet', 'Bảng cân đối kế toán', 'A statement of assets, liabilities and equity at a point in time.', 'A3'],
  ['Depreciation', 'Khấu hao', 'The allocation of the cost of a non-current asset over its useful life.', 'A3'],
  ['Break-even point', 'Điểm hòa vốn', 'The output at which total revenue equals total cost.', 'A4'],
  ['Contribution margin', 'Số dư đảm phí', 'Selling price minus variable cost per unit.', 'A4'],
  ['Audit opinion', 'Ý kiến kiểm toán', "The auditor's conclusion on whether financial statements are fairly presented.", 'A5'],
  ['Materiality', 'Tính trọng yếu', 'The size of an error that would change the decisions of users of the accounts.', 'A5'],
  ['Compound interest', 'Lãi kép', 'Interest earned on both the original sum and previously earned interest.', 'F1'],
  ['Present value', 'Giá trị hiện tại', "Today's value of a future cash flow, found by discounting.", 'F1'],
  ['Liquidity', 'Khả năng thanh khoản', 'The ability to meet short-term obligations as they fall due.', 'F2'],
  ['Profit margin', 'Biên lợi nhuận', 'Profit expressed as a percentage of revenue.', 'F2'],
  ['Working capital', 'Vốn lưu động', 'Current assets minus current liabilities.', 'F3'],
  ['Cash budget', 'Ngân sách tiền mặt', 'A forecast of cash receipts and payments over coming months.', 'F3'],
  ['Net present value (NPV)', 'Giá trị hiện tại thuần', 'The sum of discounted cash inflows minus the initial investment.', 'F4'],
  ['Payback period', 'Thời gian hoàn vốn', 'The time taken for cash inflows to repay the initial investment.', 'F4'],
  ['Central bank', 'Ngân hàng trung ương', "The institution that manages a country's currency, money supply and interest rates.", 'F5'],
  ['Bond yield', 'Lợi suất trái phiếu', 'The return an investor earns on a bond, expressed as a percentage.', 'F5'],
  ['Span of control', 'Tầm hạn quản trị', 'The number of subordinates directly managed by one manager.', 'M1'],
  ['Organisational chart', 'Sơ đồ tổ chức', 'A diagram showing roles, departments and reporting lines.', 'M1'],
  ['Business plan', 'Kế hoạch kinh doanh', 'A document describing a business idea, market, operations and finances.', 'M2'],
  ['Start-up', 'Doanh nghiệp khởi nghiệp', 'A newly established business, often seeking rapid growth.', 'M2'],
  ['Lean production', 'Sản xuất tinh gọn', 'An approach that removes waste from every step of a process.', 'M3'],
  ['Critical path', 'Đường găng', 'The longest chain of dependent tasks, which sets the minimum project duration.', 'M3'],
  ['Executive summary', 'Tóm tắt điều hành', 'A short overview at the start of a report for busy readers.', 'M4'],
  ['Memorandum', 'Bản ghi nhớ', 'A short internal business document.', 'M4'],
  ['Marketing mix', 'Marketing hỗn hợp', 'The 4Ps: product, price, place and promotion.', 'K1'],
  ['Market segmentation', 'Phân khúc thị trường', 'Dividing a market into groups of buyers with similar needs.', 'K1'],
  ['Purchase decision', 'Quyết định mua', 'The stage at which a consumer chooses a brand and buys.', 'K2'],
  ['Reference group', 'Nhóm tham khảo', "People whose opinions shape a consumer's attitudes and choices.", 'K2'],
  ['Advertising campaign', 'Chiến dịch quảng cáo', 'A coordinated series of adverts with one objective and message.', 'K3'],
  ['Public relations (PR)', 'Quan hệ công chúng', 'Managing communication to build a positive public image.', 'K3'],
  ['Click-through rate (CTR)', 'Tỷ lệ nhấp chuột', 'Clicks divided by impressions for an online advert.', 'K4'],
  ['Search engine optimisation (SEO)', 'Tối ưu hóa công cụ tìm kiếm', 'Improving a website so it ranks higher in organic search results.', 'K4'],
  ['Questionnaire', 'Bảng câu hỏi', 'A structured set of questions used to collect survey data.', 'K5'],
  ['Sample', 'Mẫu', 'A subset of a population chosen for study.', 'K5'],
  ['Brand equity', 'Tài sản thương hiệu', 'The extra value a brand name gives to a product.', 'K6'],
  ['Brand loyalty', 'Lòng trung thành thương hiệu', 'The tendency of customers to keep buying the same brand.', 'K6'],
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
  const list = [b('theory', `Core concepts: ${unit.title}`, 25), b('vocabulary', 'Key terms (EN–VI)', 10)];
  if (['E2', 'E3'].includes(unit.id)) list.push(b('simulation', 'Market simulator: shifting demand & supply', 20));
  else if (unit.example) list.push(b('calculation', 'Worked problem', 20));
  else list.push(b('case_study', 'Case discussion', 25));
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
    users.push({ id, name, title: `Student · ${sec.code}`, role: 'student', sectionId: sec.id });
    profile[id] = { ab: PROFILE[i][0], en: PROFILE[i][1] };
  });
  users.forEach(u => { u.email = u.role === 'student' ? `${u.id.toLowerCase()}@st.ueh.edu.vn` : `${u.name.replace(/^Dr\.\s*/, '').toLowerCase().split(' ').slice(-1)[0]}.${u.id.toLowerCase()}@ueh.edu.vn`; });
  const students = users.filter(u => u.role === 'student');

  const programs = ['P-ECO', 'P-ACF', 'P-MKT'].map(pid => ({
    id: pid, orgId: pid, schoolId: orgUnits.find(o => o.id === pid).parentId, frameworkId: 'FW1', code: pid.slice(2),
    versions: [{ id: `${pid}-K50`, label: 'Intake K50 · 2026', unitIds: CURRICULA[pid], status: 'active', approvedBy: 'P1', approvedAt: iso(new Date('2026-06-15T09:00:00')) }],
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
        l.reviewNote = 'Add a Vietnamese market example to the case discussion and a practice check on real GDP.';
        l.history.push({ at: iso(at(CURRENT_WEEK - 1, 2, 10)), by: l.reviewedBy, action: 'Requested changes', note: l.reviewNote });
      }
      lessons.push(l);
    }
  }

  /* assessments — one set per programme, built from its curriculum */
  const rubric = ['Use of economic & business concepts', 'Analysis & calculation accuracy', 'Use of evidence & data', 'Written communication'];
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
    A('Q1', 'quiz', 'Quiz 1 · Weeks 1–2', 2, 0, 2, 6, wk(1, 2, 3), { maxAttempts: 2 });
    A('Q2', 'quiz', 'Quiz 2 · Weeks 3–4', 4, 0, 4, 6, wk(3, 4, 3), { maxAttempts: 2 });
    A('UT1', 'unit_test', 'Unit Test 1 · Weeks 1–6', 6, 0, 6, 6, wk(1, 6, 2), { timeLimitMin: 25 });
    A('CR1', 'workshop', 'Case Report 1', 6, 0, 7, 4, [], { rubric, timeLimitMin: null });
    A('MID', 'midterm', 'Midterm Examination', CURRENT_WEEK, 0, CURRENT_WEEK + 1, 4, wk(1, 8, 2), { timeLimitMin: 30, origin: 'standardized', createdBy: deanOf[p.id] });
    A('Q3', 'quiz', 'Quiz 3 · Weeks 9–10', 10, 0, 10, 6, wk(9, 10, 3), { maxAttempts: 2 });
    A('CR2', 'workshop', 'Case Report 2', 11, 0, 12, 4, [], { rubric, timeLimitMin: null });
    A('Q4', 'quiz', 'Quiz 4 · Weeks 11–12', 12, 0, 12, 6, wk(11, 12, 3), { maxAttempts: 2 });
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
    { id: 'E4', actorId: 'system', action: 'WEEK_ADVANCED', summary: `Week ${CURRENT_WEEK} started · ${sections.length} lessons published · Midterm Examination opened`, entityType: 'term', entityId: 'T1', at: now(0, 7) },
    ...['S-ECO1', 'S-ACF1', 'S-MKT1'].map((sid, i) => { const l = pendingLesson(sid); return { id: `E1${i}`, actorId: l.authorId, action: 'LESSON_SUBMITTED', summary: `Submitted "${l.title}" for approval`, entityType: 'lesson', entityId: l.id, at: now(0, 15 + i) }; }),
  ];

  const st = {
    version: 10,
    clock: { week: CURRENT_WEEK, setAt: Date.now() },
    session: { userId: null },
    ui: { theme: 'light', orgFilter: null },
    term: { id: 'T1', title: 'AY 2026–27 · Term 1', startDate: TERM_START, weeks: TERM_WEEKS },
    course: {
      id: 'C1', code: 'ECON-FDN', title: 'Economics Foundation · Year 1',
      gradingScheme: { categories: [
        { key: 'quiz', label: 'Quizzes', weight: 0.15 }, { key: 'unit_test', label: 'Unit tests', weight: 0.15 },
        { key: 'workshop', label: 'Case reports', weight: 0.2 }, { key: 'midterm', label: 'Midterm', weight: 0.2 },
        { key: 'final', label: 'Final', weight: 0.3 } ], passMark: 5, scale: 10 },
    },
    subjects: SUBJECTS,
    framework: { id: 'FW1', title: 'UEH Economics Foundation · Year 1', capacity: 16, unitIds: FRAMEWORK, requiredUnitIds: REQUIRED, minPerCoreSubject: 2, coreSubjects: ['ECO', 'ACC', 'FIN', 'MGT'] },
    staffing: { hoursPerUnit: 3, maxHours: 48 },
    license: { seats: 2000, product: 'UEH Learning — campus licence', expiresAt: '2027-08-31T00:00:00' },
    orgUnits, programs, users, sections, units, lessons, assessments, questions, attempts, rubricGrades, activity,
    notifications, auditLog, liveSessions: [], flags: { atRisk: [] },
    vocabulary: VOCAB.map(([term, vi, def, unitId], i) => ({ id: `V${i + 1}`, term, vi, def, unitId })),
  };
  addLibrarySeed(st, { blocksForUnit, at, iso, CURRENT_WEEK });
  st.__profiles = profile;
  addWorkbookSeed(st, { rng, iso, at, CURRENT_WEEK });
  delete st.__profiles;
  return st;
}

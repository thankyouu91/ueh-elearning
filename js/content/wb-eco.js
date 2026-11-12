// Extra Economics workbook content for units E1–E4. Figures are illustrative teaching data, not official statistics.
import { C, O, N, W, M, CASE } from './helpers.js';

export const EXTRA = [
  /* ---------------- E1 · The Economic Problem & Economic Systems ---------------- */
  M('E1', 'The basic economic problem', 'The basic economic problem exists because…',
    ['Prices are set too high by firms', 'Governments collect too much tax', 'Resources are limited while human wants are unlimited', 'Some people do not want to work'], 2,
    'Scarcity — limited resources relative to unlimited wants — forces every society to choose what, how and for whom to produce.'),
  M('E1', 'Free or economic good?', 'Which of these is closest to a free good (no opportunity cost to use)?',
    ['Sea air on a beach in Nha Trang', 'A bottle of La Vie mineral water', 'A place at a public university', 'Electricity from the national grid'], 0,
    'A free good is not scarce: one person breathing sea air does not reduce what others can use. The others all use scarce resources to produce.'),
  C('E1', 'Positive or normative?', 'Classify each statement as positive (can be tested with facts) or normative (a value judgement).', ['Positive statement', 'Normative statement'],
    [["Vietnam's GDP grew by about 7% last year", 0], ['The government should raise the regional minimum wage', 1], ['A higher petrol price reduces motorbike use in Hà Nội', 0], ['Rice farmers deserve larger subsidies than coffee farmers', 1], ['If tuition fees rise, fewer students will enrol', 0], ['Ho Chi Minh City ought to ban motorbikes from District 1', 1]],
    'Positive statements describe what is, was or will be and can be checked with data. Normative statements contain words like "should", "ought" or "deserve".'),
  N('E1', 'Cost of a university year', 'Minh could work full-time and earn 6 million VND a month instead of studying. Tuition is 30 million VND a year, and he would live at home whether he studies or works. What is the total opportunity cost of one 12-month year at university?', 102, 'million VND',
    'Tuition 30 + earnings forgone 6 × 12 = 72 → 102 million VND. Living costs are paid in both cases, so they are not part of the opportunity cost.'),
  M('E1', 'Shifting the PPF outward', "Which event would shift Vietnam's production possibility frontier outward?",
    ['Unemployed workers in Bình Dương find jobs', 'The prices of all goods rise by 5%', 'Farmers move land from rice to coffee', 'New investment in machinery and workforce skills'], 3,
    'More or better resources (capital, skills, technology) raise maximum output. Re-employing idle workers moves the economy towards the existing PPF, not beyond it.'),
  N('E1', 'Shirts or jackets?', 'A garment workshop in Bình Dương can make either 600 shirts or 200 jackets per day (straight-line PPF). What is the opportunity cost of producing 1 shirt, measured in jackets? Round to 2 decimal places.', 0.33, 'jackets',
    '600 shirts cost 200 jackets, so 1 shirt costs 200 ÷ 600 = 0.33 jackets.', 0.01),
  M('E1', 'Why is the PPF curved?', 'Why is a PPF usually bowed outward (concave to the origin)?',
    ['Consumers prefer a mix of goods', 'Resources are not equally suited to every use, so opportunity cost rises', 'Technology improves over time', 'The government limits output of some goods'], 1,
    'As more of one good is produced, resources less suited to it must be switched over, so each extra unit costs more of the other good.'),
  N('E1', 'Rising opportunity cost', 'A farm in Đắk Nông can produce these combinations (tonnes per year) — Coffee: 0, 10, 20, 30; Pepper: 100, 90, 70, 40. What is the opportunity cost of EACH extra tonne of coffee when output rises from 20 to 30 tonnes, measured in tonnes of pepper?', 3, 'tonnes of pepper',
    'Pepper falls from 70 to 40 = 30 tonnes given up for 10 extra tonnes of coffee → 30 ÷ 10 = 3 tonnes per tonne (up from 1 and then 2 earlier: increasing opportunity cost).'),
  C('E1', 'Market or command?', 'Does each feature belong mainly to a market economy or a command economy?', ['Market economy', 'Command economy'],
    [['Prices are set by supply and demand', 0], ['A central plan decides what each factory produces', 1], ['Most firms are privately owned', 0], ['Output quotas are set by state ministries', 1], ['The profit motive guides what is produced', 0], ['The state owns most land and factories', 1]],
    'Market economies use prices, private ownership and profit to allocate resources; command economies use state ownership and central planning.'),
  M('E1', "Vietnam's economic system", 'Which description best fits the Vietnamese economy since the Đổi Mới reforms of 1986?',
    ['A pure market economy with no state-owned enterprises', 'A command economy in which the state sets all prices', 'A mixed economy: markets set most prices, but the state keeps a major role', 'A traditional economy based on custom and subsistence farming'], 2,
    'Đổi Mới opened the economy to markets and private firms, but state-owned enterprises, planning targets and regulated prices for some goods remain — a mixed economy.'),
  ...CASE('E1-mc1', 'Rice or durian in Cần Thơ?',
    'Hòa Bình Cooperative in Cần Thơ farms 40 hectares of rice. Each hectare yields 6 tonnes of rice a year, which sells for about 8 million VND per tonne. Members are discussing whether to convert 10 hectares to durian, which could earn about 300 million VND per hectare per year once the trees mature. However, durian trees take four years to produce their first crop, and planting costs are high. During those four years the converted land produces nothing. Older members argue that rice is safer; younger members point to strong export demand for durian from China.',
    [
      N('E1', 'Rice given up per year', 'How many tonnes of rice does the cooperative give up each year if it converts the 10 hectares?', 60, 'tonnes',
        '10 hectares × 6 tonnes = 60 tonnes of rice per year.'),
      N('E1', 'Income forgone while waiting', 'What is the total rice revenue the cooperative gives up during the four years before the durian trees produce fruit?', 1920, 'million VND',
        '60 tonnes × 8 million VND = 480 million VND per year; × 4 years = 1,920 million VND.'),
      M('E1', 'The true cost of converting', 'Which best describes the opportunity cost of converting the 10 hectares?',
        ['Only the money spent on durian seedlings', 'The rice output and income the land would otherwise have produced', 'Nothing, because durian earns more in the long run', 'The wages of members who already work in the rice fields'], 1,
        'Opportunity cost is the next best alternative given up — here the rice the land would have grown. Higher future durian income does not remove that cost; it is what the cost is compared with.'),
    ]),
  W('E1', 'Is free schooling free?', 'Some people say public primary schooling in Vietnam is "free". Use the idea of opportunity cost to explain why it is not free for society, and identify who pays.',
    'Schooling has no fee for families, but it still uses scarce resources: teachers, buildings, books and electricity. These could have produced other things, such as hospitals or roads, which is the opportunity cost to society. The cost is paid by taxpayers through the state budget, and families still give up the time children could spend helping at home or working.',
    ['Explains that scarce resources are still used', 'Names a realistic alternative use (opportunity cost)', 'Identifies who pays (taxpayers / families\' time)']),

  /* ---------------- E2 · Demand, Supply & Market Equilibrium ---------------- */
  N('E2', 'Market supply', 'Three bubble-tea shops on one street would supply 120, 90 and 60 cups per day at a price of 30,000 VND. What is market supply at that price?', 270, 'cups',
    'Market supply is the horizontal sum of individual supplies: 120 + 90 + 60 = 270 cups.'),
  M('E2', 'The law of supply', 'The law of supply states that, other things being equal…',
    ['As price rises, quantity supplied rises', 'As price rises, quantity supplied falls', 'Supply always equals demand', 'As costs rise, supply rises'], 0,
    'A higher price makes production more profitable, so firms offer more — a movement up the supply curve.'),
  C('E2', 'Rice supply: left or right?', 'Does each event shift the supply of Vietnamese rice to the right (increase) or to the left (decrease)?', ['Supply shifts right', 'Supply shifts left'],
    [['Farmers adopt new high-yield seed varieties', 0], ['Saltwater intrusion damages Mekong Delta fields', 1], ['The price of fertiliser rises sharply', 1], ['The government subsidises irrigation pumps', 0], ['More farms switch into rice growing', 0], ['Severe floods hit the harvest season', 1], ['Wages for farm workers rise', 1]],
    'Lower costs, better technology, subsidies and more producers increase supply. Higher input costs and bad weather reduce it.'),
  M('E2', 'Instant noodles and income', 'As incomes in Vietnam rise, demand for cheap instant noodles falls. Instant noodles are therefore…',
    ['A normal good', 'An inferior good', 'A luxury good', 'A complement to rice'], 1,
    'An inferior good is one whose demand falls when income rises, as people switch to better alternatives such as phở or restaurant meals.'),
  M('E2', 'Pork and chicken', 'African swine fever cuts the supply of pork and pork prices rise. Pork and chicken are substitutes. What happens in the chicken market?',
    ['Supply of chicken shifts left', 'Demand for chicken shifts left', 'Demand for chicken shifts right', 'There is a movement down the demand curve for chicken'], 2,
    'Dearer pork makes consumers switch to chicken, so demand for chicken increases (shifts right) at every price.'),
  M('E2', 'Petrol and motorbikes', 'Petrol and motorbikes are complements. If the price of petrol rises sharply, the demand for motorbikes…',
    ['Shifts right', 'Does not change', 'Moves along the curve', 'Shifts left'], 3,
    'Complements are used together. A higher petrol price makes owning a motorbike more expensive, so demand for motorbikes falls (shifts left).'),
  N('E2', 'Size of the shortage', 'In a market Qd = 200 − 4P and Qs = 20 + 2P (P in thousand VND). The price is stuck at 25. How large is the shortage?', 30, 'units',
    'At P = 25: Qd = 200 − 100 = 100 and Qs = 20 + 50 = 70, so the shortage is 100 − 70 = 30 units (equilibrium would be P = 30, Q = 80).'),
  O('E2', 'How a shortage disappears', 'Put the steps in order to show how a market removes a shortage.',
    ['The price is below equilibrium, so quantity demanded exceeds quantity supplied', 'Buyers compete for the limited goods and queues form', 'Sellers raise their prices', 'The higher price reduces quantity demanded and increases quantity supplied', 'The market reaches equilibrium where quantity demanded equals quantity supplied'],
    'A shortage puts upward pressure on price; the rising price moves the market along both curves until the shortage is gone.'),
  N('E2', 'A demand shift', 'In a market with Qs = 30 + P, more students move into the area and demand shifts from Qd = 120 − 2P to Qd = 150 − 2P (P in thousand VND). By how much does the equilibrium price rise?', 10, 'thousand VND',
    'Old: 120 − 2P = 30 + P → P = 30. New: 150 − 2P = 30 + P → 120 = 3P → P = 40. The price rises by 40 − 30 = 10 thousand VND.'),
  M('E2', 'Both curves shift', 'In the durian market, demand rises (strong exports) and supply rises (new orchards mature) at the same time. What can we say for certain?',
    ['The price rises', 'The price falls', 'Equilibrium quantity rises, but the price change depends on which shift is larger', 'Both price and quantity stay the same'], 2,
    'Both shifts push quantity up. Demand pushes price up while supply pushes it down, so the price effect depends on the relative size of the shifts.'),
  ...CASE('E2-mc1', 'Mangoes flood Thủ Đức market',
    'Thủ Đức wholesale market is a main gateway for fresh fruit into Ho Chi Minh City. A trader estimates the weekly market for Cát Chu mangoes as Qd = 500 − 10P and Qs = 50 + 5P, where P is the price in thousand VND per kg and Q is in tonnes. In June, a slowdown at a northern border crossing stops exports to China. Mekong Delta growers send the mangoes meant for export to Thủ Đức instead, adding 60 tonnes a week at every price, so supply becomes Qs = 110 + 5P. Demand is unchanged.',
    [
      N('E2', 'Price before the delay', 'What was the equilibrium price before the border delay?', 30, 'thousand VND/kg',
        '500 − 10P = 50 + 5P → 450 = 15P → P = 30 (Q = 200 tonnes).'),
      N('E2', 'Quantity after the delay', 'What is the new equilibrium quantity after supply increases?', 240, 'tonnes',
        '500 − 10P = 110 + 5P → 390 = 15P → P = 26. Q = 500 − 260 = 240 tonnes (check: 110 + 130 = 240).'),
      M('E2', 'Explaining the change', 'Which statement correctly explains what happened in the mango market?',
        ['Demand fell, so price and quantity both fell', 'Supply shifted right, so the price fell and the quantity traded rose', 'Supply shifted left, so the price rose', 'Demand rose, so price and quantity both rose'], 1,
        'Extra mangoes at every price shift supply right; price falls from 30 to 26 thousand VND/kg and quantity rises from 200 to 240 tonnes.'),
    ]),

  /* ---------------- E3 · Elasticity & Government Intervention ---------------- */
  M('E3', 'Using a PED value', 'Price elasticity of demand for durian is −0.4. If the price rises by 10%, quantity demanded will change by about…',
    ['−40%', '−4%', '−0.4%', '+4%'], 1,
    '%ΔQ = PED × %ΔP = −0.4 × 10% = −4%.'),
  M('E3', 'Inelastic demand and revenue', 'Demand for a product is price inelastic. If the firm raises its price, total revenue will…',
    ['Fall', 'Stay exactly the same', 'Fall to zero', 'Rise'], 3,
    'With inelastic demand, quantity falls by a smaller percentage than price rises, so price × quantity increases.'),
  C('E3', 'Ceiling or floor?', 'Is each policy a price ceiling (maximum price) or a price floor (minimum price)?', ['Price ceiling (maximum price)', 'Price floor (minimum price)'],
    [['A cap on room rents near a university', 0], ['The regional minimum wage', 1], ['A maximum retail price for petrol', 0], ['A guaranteed minimum purchase price for rice farmers', 1], ['A cap on public hospital fees', 0], ['A minimum price per litre of alcohol', 1]],
    'A ceiling stops the price rising above a level (to protect buyers); a floor stops it falling below a level (to protect sellers or workers).'),
  M('E3', 'Grab and Be', 'The cross elasticity of demand between Grab rides and Be rides is positive. This means the two services are…',
    ['Substitutes', 'Complements', 'Unrelated goods', 'Inferior goods'], 0,
    'A positive XED means a rise in the price of one raises demand for the other — consumers switch between them.'),
  N('E3', 'Cross elasticity', 'The price of Grab rides rises by 20% and demand for Be rides rises by 8%. What is the cross elasticity of demand for Be rides with respect to the price of Grab?', 0.4, '',
    'XED = %ΔQ of Be ÷ %ΔP of Grab = 8 ÷ 20 = 0.4 (positive → substitutes, but weak).', 0.01),
  N('E3', 'Phở shop revenue', 'A phở shop raises its price from 50,000 to 55,000 VND a bowl and daily sales fall from 400 to 380 bowls. By how much does daily revenue change?', 0.9, 'million VND',
    'Before: 400 × 50,000 = 20.0 million. After: 380 × 55,000 = 20.9 million. Change = +0.9 million VND (demand is inelastic: −5% quantity for +10% price).', 0.01),
  M('E3', 'Rice floor price', 'The government sets a minimum price for rice above the equilibrium price. The most likely result is…',
    ['A shortage of rice', 'Lower incomes for farmers', 'A surplus of rice that the state may need to buy', 'No change in the market'], 2,
    'At a price above equilibrium, quantity supplied exceeds quantity demanded, so unsold rice (a surplus) builds up.'),
  O('E3', 'Effects of a rent ceiling', 'Put the effects of a rent ceiling in Thủ Đức in the order they happen.',
    ['The city sets a maximum rent below the equilibrium rent', 'More students want to rent rooms at the lower rent', 'Landlords offer fewer rooms or convert them to other uses', 'A shortage of rooms appears', 'Waiting lists, poorer room quality and illegal side payments emerge'],
    'A ceiling below equilibrium raises quantity demanded and lowers quantity supplied; the resulting shortage is rationed by queues and side payments instead of price.'),
  M('E3', 'Who pays the tax?', 'An indirect tax is placed on a good with very price-inelastic demand and elastic supply. Who bears most of the tax?',
    ['Producers', 'Consumers', 'The government', 'It is always split 50/50'], 1,
    'Inelastic buyers keep buying when the price rises, so producers can pass most of the tax on to them in higher prices.'),
  ...CASE('E3-mc1', 'A tax on sugary drinks',
    "Vietnam's Ministry of Finance has proposed a special consumption tax on sugary soft drinks to reduce obesity and diabetes. Sông Xanh Beverages, a mid-sized producer in Bình Dương, sells a 330 ml lemon soda at a retail price of 10,000 VND and sells 2.00 million bottles a month. Analysts model a tax of 1,000 VND per bottle paid by the producer. After the tax, the retail price rises to 10,800 VND and monthly sales fall to 1.88 million bottles. The marketing director wants to know how sensitive customers are, and the ministry wants to know how much revenue the tax will raise.",
    [
      N('E3', 'PED for lemon soda', 'Calculate the price elasticity of demand for the lemon soda (simple percentage method). Give a negative number.', -0.75, '',
        '%ΔP = 800 ÷ 10,000 = +8%. %ΔQ = −0.12 ÷ 2.00 = −6%. PED = −6 ÷ 8 = −0.75 (inelastic).', 0.01),
      N('E3', 'Monthly tax revenue', 'How much tax revenue does the government collect per month after the tax?', 1880, 'million VND',
        '1,000 VND × 1.88 million bottles = 1,880 million VND (1.88 billion VND).'),
      M('E3', 'Consumer share of the tax', 'What share of the 1,000 VND tax is paid by consumers through the higher retail price?',
        ['20%', '50%', '80%', '100%'], 2,
        'The retail price rises by 800 VND of the 1,000 VND tax, so consumers pay 80% and the producer absorbs 20%. Inelastic demand lets the firm pass most of the tax on.'),
    ]),
  W('E3', 'Capping mask prices', 'During an epidemic, face-mask prices in Hà Nội pharmacies triple. Some citizens ask the government to cap the price at the old level. Analyse one benefit and one problem of this price ceiling.',
    'Benefit: poorer households can afford masks at the old price, which protects public health when the good is a necessity. Problem: the cap is below the new equilibrium, so demand exceeds supply. Shops run out, queues form and masks are resold on the black market at high prices; producers also have less incentive to raise output, so the shortage can last longer.',
    ['A valid benefit linked to affordability or fairness', 'Explains the shortage using demand and supply', 'Identifies a further consequence (black market, queues, weaker supply incentive)']),

  /* ---------------- E4 · Macroeconomics: GDP, Inflation & Unemployment ---------------- */
  M('E4', 'What GDP leaves out', 'Which transaction is NOT counted in Vietnam\'s GDP this year?',
    ['A new apartment built in Thủ Đức', 'A haircut at a salon in Đà Nẵng', 'Rice exported to the Philippines', 'Buying a used Honda motorbike from a neighbour'], 3,
    'GDP counts only goods and services produced in the current period. A second-hand motorbike was counted when it was first made.'),
  C('E4', 'Components of spending', 'Classify each item into the expenditure component of GDP it belongs to.', ['Consumption (C)', 'Investment (I)', 'Government spending (G)', 'Net exports (X − M)'],
    [['A household buys groceries at Co.opmart', 0], ['A car maker builds a new assembly plant in Hải Phòng', 1], ['The state pays public school teachers\' salaries', 2], ['Foreign tourists pay for hotels in Hội An', 3], ['A garment firm buys new sewing machines', 1], ['The government builds a new expressway', 2], ['A family pays its monthly internet bill', 0]],
    'C = household spending; I = firms\' spending on capital goods and new buildings; G = government purchases and public works; spending by foreigners on Vietnamese output is an export (X).'),
  N('E4', 'GDP by expenditure', 'An economy has C = 6,000, I = 2,500, G = 1,000, exports = 9,000 and imports = 8,500 (trillion VND). Calculate GDP.', 10000, 'trillion VND',
    'GDP = C + I + G + (X − M) = 6,000 + 2,500 + 1,000 + (9,000 − 8,500) = 10,000 trillion VND.'),
  M('E4', 'GDP or GNI?', 'A Korean-owned electronics factory in Bắc Ninh sends its profits home to Korea. Its output is counted in…',
    ["Vietnam's GDP, but the profits sent abroad are not part of Vietnam's GNI", "Korea's GDP only", "Vietnam's GNI but not Vietnam's GDP", 'Neither country\'s GDP'], 0,
    'GDP counts production inside Vietnam regardless of who owns the firm. GNI subtracts income paid to foreign owners, so the repatriated profits are excluded.'),
  N('E4', 'GDP per capita', 'A country\'s GDP is 11,500 trillion VND and its population is 100 million. What is GDP per capita?', 115, 'million VND',
    '11,500 trillion ÷ 100 million = 11,500,000,000,000,000 ÷ 100,000,000 = 115,000,000 VND = 115 million VND per person.'),
  N('E4', 'Real GDP from a deflator', 'Nominal GDP is 12,600 trillion VND and the GDP deflator is 120 (base year = 100). What is real GDP in base-year prices?', 10500, 'trillion VND',
    'Real GDP = nominal GDP ÷ deflator × 100 = 12,600 ÷ 120 × 100 = 10,500 trillion VND.'),
  M('E4', 'Demand-pull inflation', 'Demand-pull inflation is caused by…',
    ['A rise in the world price of oil', 'Total spending growing faster than the economy\'s capacity to produce', 'Higher wage costs for firms', 'A fall in the money supply'], 1,
    'When aggregate demand outruns productive capacity, firms raise prices. Oil prices and wage costs are causes of cost-push inflation.'),
  O('E4', 'Building a CPI', 'Put the steps for measuring inflation with a consumer price index in order.',
    ['Choose a basket of goods and services that typical households buy', 'Record the cost of the basket in the base year', 'Record the cost of the same basket in the current year', 'Calculate the index: current cost ÷ base-year cost × 100', 'Calculate inflation as the percentage change in the index'],
    'The basket is fixed first, priced in both periods, turned into an index and then compared over time.'),
  M('E4', 'Who loses from inflation?', 'Prices rise faster than expected. Which group is most likely to lose?',
    ['Borrowers with fixed-rate loans', 'Firms that raise their prices first', 'Retired workers on a fixed pension', 'Owners of land and houses'], 2,
    'A fixed income buys less as prices rise. Borrowers repay with money worth less, and asset owners often see values rise with prices.'),
  ...CASE('E4-mc1', "Linh's personal inflation",
    'Linh is a second-year student renting a room in Bình Thạnh District, Ho Chi Minh City. Her parents send her a monthly allowance, and she tracks her spending in a notebook. Last year her typical monthly basket cost: room rent 2.5 million VND, food 3.0 million VND and transport (motorbike fuel and bus) 0.5 million VND — 6.0 million VND in total, exactly her allowance. This year the same basket costs: rent 2.7 million, food 3.3 million and transport 0.6 million VND. Her parents have raised her allowance by 5% to 6.3 million VND.',
    [
      N('E4', 'Basket cost this year', 'What does Linh\'s monthly basket cost this year?', 6.6, 'million VND',
        '2.7 + 3.3 + 0.6 = 6.6 million VND.', 0.01),
      N('E4', "Linh's inflation rate", 'Calculate Linh\'s personal inflation rate.', 10, '%',
        '(6.6 − 6.0) ÷ 6.0 × 100 = 10%.', 0.05),
      M('E4', 'Real allowance', 'What happened to the real value of Linh\'s allowance?',
        ['It rose by about 5%', 'It stayed the same', 'It rose by about 15%', 'It fell by about 5%'], 3,
        'Real change ≈ 5% − 10% = −5% (exactly 6.3 ÷ 6.6 − 1 ≈ −4.5%). Her allowance now buys less than her old basket.'),
    ]),
];

export const LIB = [
  ['R-ECO-C1', 'case_study', 'E1', 'Rice fields or factories? Land use in Long An', 40,
    'Long An province borders Ho Chi Minh City and has some of the most fertile rice land in the Mekong Delta. The provincial government has received a proposal to convert 500 hectares of rice fields in Đức Hòa District into an industrial park.\n' +
    'Today the land grows two rice crops a year, each yielding 6 tonnes per hectare. Rice sells at about 7.5 million VND per tonne at the farm gate. Around 1,200 farming households depend on this land.\n' +
    'The investor, Phú Long Industrial JSC (an invented firm), expects to attract 30 factories employing 15,000 workers at an average wage of 8 million VND a month. The province would also collect land-lease fees and taxes. Critics warn that Vietnam needs rice for food security and exports, that many older farmers lack factory skills, and that converted land can almost never return to farming.\n' +
    'Supporters reply that one hectare used for manufacturing creates far more income and jobs than one hectare of rice.\n\n' +
    '1. Calculate the rice output (tonnes) and farm revenue (billion VND) given up each year if the land is converted.\n' +
    '2. Calculate the total annual wage bill of the industrial park and compare it with your answer to Task 1.\n' +
    '3. Draw a PPF for Long An with rice on one axis and manufactured goods on the other. Show the conversion as a movement along the curve.\n' +
    '4. Find one positive and one normative statement in the debate above.\n' +
    '5. Recommend whether the province should approve the project. State the criterion you use and one condition you would attach.'],

  ['R-ECO-C2', 'case_study', 'E3', 'Capping student rents in Thủ Đức', 35,
    'Thousands of students attend universities in Thủ Đức City, Ho Chi Minh City, and most rent small rooms from private landlords nearby. A survey by a student union estimates that, at the current market rent of 3.0 million VND a month, about 6,000 rooms are rented.\n' +
    'After complaints that rents take more than half of many students\' monthly budgets, a local councillor proposes a maximum rent of 2.4 million VND a month for rooms under 20 m². The union estimates that at 2.4 million VND, 7,200 students would want rooms, but landlords would offer only 5,000; some would convert rooms into short-stay rentals or storage.\n' +
    'Landlords say their costs for electricity, repairs and land tax have risen. Students say some landlords already ask for large "key money" deposits. The councillor argues the cap is fair because housing is a necessity.\n\n' +
    '1. Calculate the percentage change in rent if the cap is introduced.\n' +
    '2. Calculate the shortage of rooms at the capped rent.\n' +
    '3. Calculate the price elasticity of supply of rooms (rooms offered fall from 6,000 to 5,000) and say whether supply is elastic or inelastic.\n' +
    '4. Explain two unintended consequences of the cap, using the case details.\n' +
    '5. Suggest one alternative policy that would help students without creating a shortage, and explain why it works.'],

  ['R-ECO-G1', 'group_project', 'E2', 'Market price watch: fresh food in Ho Chi Minh City', 180,
    'Brief\n' +
    'Track the prices of five fresh food items (for example pork belly, chicken, morning glory, mango and rice) in three wet markets (such as Bến Thành, Bà Chiểu and Hóc Môn), one supermarket and one online grocery app for three weeks.\n' +
    'Interview at least three vendors about what is pushing their prices up or down. Explain the price changes you see with demand and supply diagrams.\n' +
    'Deliverables\n' +
    '- A price table (5 items × 5 outlets × 3 weekly observations) with sources and dates\n' +
    '- One demand–supply diagram for each item whose price changed by more than 10%\n' +
    '- Notes from three vendor interviews (with their permission, no full names)\n' +
    '- A 1,500-word report and a 10-minute presentation\n' +
    'Team roles (4–5 students)\n' +
    '- Coordinator: plans market visits and keeps the timeline\n' +
    '- Data lead: designs the price sheet and checks every entry\n' +
    '- Interview lead: prepares questions and leads vendor interviews\n' +
    '- Analyst: draws the diagrams and links them to the data\n' +
    '- Editor (fifth member, optional): writes and formats the final report and slides\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: choose items and outlets, design the price sheet, first round of prices, first interview\n' +
    '- Week 2: second round of prices, remaining interviews, first diagrams\n' +
    '- Week 3: final round of prices, analysis, report and presentation\n' +
    'Assessment (100 points)\n' +
    '- Quality and completeness of price data: 25\n' +
    '- Correct use of demand and supply to explain changes: 30\n' +
    '- Use of vendor interviews as evidence: 15\n' +
    '- Report structure and writing: 15\n' +
    '- Presentation and answers to questions: 15'],

  ['R-ECO-G2', 'group_project', 'E4', 'Our class CPI: student inflation in HCMC', 180,
    'Brief\n' +
    'Build a consumer price index for UEH students. Survey classmates to find what a typical student spends each month, set weights, price the basket at the start and end of the project, and compare your result with the official CPI for Ho Chi Minh City from GSO-style statistical tables.\n' +
    'Interview one local business near campus (a café, print shop or rice restaurant) about how rising costs have changed its prices.\n' +
    'Deliverables\n' +
    '- A spending survey of at least 40 students and the basket weights derived from it\n' +
    '- A price sheet for 10–12 basket items with dates and outlets\n' +
    '- The calculated student CPI and inflation rate, with every step shown\n' +
    '- A comparison table: student CPI vs official CPI groups (food, housing, transport, education)\n' +
    '- A 1,500-word report and a one-page infographic\n' +
    'Team roles (4–5 students)\n' +
    '- Project manager: timeline, meetings and final submission\n' +
    '- Survey lead: designs the questionnaire and collects responses\n' +
    '- Price collector: records basket prices at the same outlets each time\n' +
    '- Data analyst: builds the weights, index and comparison in a spreadsheet\n' +
    '- Business interviewer (fifth member, optional): runs the business interview and writes the infographic\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: design and run the spending survey, choose basket items, first price collection\n' +
    '- Week 2: calculate weights, download official CPI tables, interview the local business\n' +
    '- Week 3: second price collection, calculate the index, write the report and infographic\n' +
    'Assessment (100 points)\n' +
    '- Survey design and basket weights: 20\n' +
    '- Accuracy of CPI and inflation calculations: 30\n' +
    '- Comparison with official data and explanation of differences: 20\n' +
    '- Use of the business interview: 10\n' +
    '- Report, infographic and teamwork: 20'],
];

// ESP (English for Specific Purposes, CEFR B1), Economics context, units E1–E4.
// The economics topic is only the setting: every answer is in the text/audio or is a language point.
// E1 has 11 items here; be-b1.js supplies its other 6 (including speaking and writing).
import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';

export const EXTRA = [
  /* ---------------- E1, Scarcity and choice, language focus: comparatives and superlatives ---------------- */
  ...USE([
    C('E1', 'Word families: noun or adjective?', 'Sort the words into nouns and adjectives.',
      ['Noun', 'Adjective'],
      [['scarcity', 0], ['scarce', 1], ['choice', 0], ['limited', 1], ['economy', 0], ['economic', 1], ['priority', 0]],
      'Nouns often end in -ity, -ce or -y (scarcity, choice, economy). Adjectives describe a noun: scarce resources, a limited budget, an economic problem.'),
    M('E1', 'Word in context: afford', 'Choose the best word. "The café has only 50 million VND, so it cannot ___ both a new coffee machine and a second shop."',
      ['spend', 'cost', 'afford', 'pay'], 2,
      '"Afford" means to have enough money for something. "Spend" needs an amount of money as its object, and "pay" needs "for".'),
    M('E1', 'Collocation: opportunity ___', 'Choose the best word. "The opportunity ___ of opening the second shop is the new machine that we cannot buy."',
      ['cost', 'price', 'fee', 'charge'], 0,
      'The fixed phrase is "opportunity cost". We do not say "opportunity price" or "opportunity fee".'),
    M('E1', 'Comparatives: long adjectives', 'Choose the correct form. "Renting a shop in District 1 is ___ than renting one in Thu Duc."',
      ['expensiver', 'more expensive', 'most expensive', 'the more expensive'], 1,
      'Long adjectives form the comparative with "more" + adjective + "than": more expensive than.'),
    M('E1', 'Superlatives: short adjectives', 'Choose the correct form. "We compared three options. The second-hand motorbike is ___ ."',
      ['cheaper', 'more cheap', 'the most cheap', 'the cheapest'], 3,
      'With three or more things we use the superlative. Short adjectives take "the" + -est: the cheapest.'),
    O('E1', 'Order the email: recommending one option', 'Put the sentences of this email in the correct order.',
      ['Dear Mr Khoa,',
        'I am writing to recommend how we should use this year\'s budget of 300 million VND.',
        'We have two options: a second coffee machine or a small delivery team.',
        'I think the delivery team is the better choice because it will bring new customers all day.',
        'The opportunity cost of this choice is the coffee machine, which we can buy next year.',
        'Please let me know if you agree. Best regards, Thao'],
      'A business email goes: greeting, purpose ("I am writing to…"), the options, the recommendation with a reason, the cost of the choice, and a polite closing.'),
    M('E1', 'Describing data: private-sector jobs', 'Share of workers in private firms in one province: 2021 – 52%; 2022 – 58%; 2023 – 65%. Which sentence correctly describes the data?',
      ['The share of workers in private firms fell slightly from 2021 to 2023.', 'The share of workers in private firms remained stable from 2021 to 2023.', 'The share of workers in private firms rose steadily from 2021 to 2023.', 'The share of workers in private firms rose in 2022 and then fell sharply in 2023.'], 2,
      'The number goes up every year (52, 58, 65), so we say it "rose steadily". "Remained stable" means no change.'),
  ]),
  ...READ('E1-r1', 'Reading, Flowers or strawberries? A farm in Da Lat',
    `Green Hill Farm is a small family business in Da Lat. The farm has only two hectares of land, six workers and a limited budget, so the owner, Mr Phuc, cannot grow everything he wants. For ten years the farm has grown flowers for markets in Ho Chi Minh City. Flowers sell well before Tet, but prices are low for the rest of the year.\n\nThis year Mr Phuc is thinking about a change. Strawberries are more profitable than flowers because tourists pay high prices for fresh fruit. However, strawberries need more water and more workers, and the plants are easily damaged by heavy rain. If Mr Phuc uses one hectare for strawberries, he will have to give up half of his flower production. That is the trade-off.\n\nIn a market economy, nobody tells a farmer what to produce. Mr Phuc must look at prices, costs and risks and then decide for himself. "My resources are scarce," he says. "I cannot say yes to one crop without saying no to another. So I will start small: half a hectare of strawberries this year, and more next year if the customers come."`, [
      M('E1', 'Main idea', 'What is the text mainly about?',
        ['Why flower prices are low before Tet', 'A farmer who must choose how to use limited land', 'How tourists damage strawberry plants', 'A government plan that tells farmers what to grow'], 1,
        'The first paragraph says he "cannot grow everything he wants", and the rest of the text describes his choice between two crops.'),
      M('E1', 'Vocabulary in context: give up', 'In paragraph 2, "give up half of his flower production" means that Mr Phuc will…',
        ['sell half of his flowers at a higher price', 'start growing more flowers', 'pay workers to pick the flowers', 'stop growing half of his flowers'], 3,
        'The phrasal verb "give up" means to stop having or doing something. The land used for strawberries can no longer be used for flowers.'),
    ]),
  ...LISTEN('E1-l1', 'Listening, A voicemail about the guest house budget',
    "Hi Tuan, it's Hanh. I'm calling about the money we saved this year. We have one hundred and twenty million dong, and that's not enough for everything on our list. I see two main choices. One is to repair the roof of the guest house. The other is to build a new website with online booking. The website would bring more guests, I know, but honestly I think the roof is more important. The rainy season starts in September, and if the rooms get wet, we'll lose the guests we already have. The website can wait until next year. Can you call me back before Thursday? I'd like to talk to the builder on Friday. Thanks, bye.", [
      M('E1', 'Listening for gist', 'Why is Hanh calling Tuan?',
        ['To discuss how to spend their limited savings', 'To say that rain has damaged the roof', 'To book a room at the guest house', 'To ask him to build a website this week'], 0,
        'She says: "I\'m calling about the money we saved this year… that\'s not enough for everything on our list."'),
      M('E1', 'Listening for opinion', 'Which option does Hanh prefer, and why?',
        ['The website, because it would bring more guests', 'The roof, because it is cheaper than the website', 'The roof, because the rainy season is coming', 'The website, because the builder is busy on Friday'], 2,
        'She says "honestly I think the roof is more important. The rainy season starts in September". "Honestly I think…" introduces her opinion.'),
    ]),

  /* ---------------- E2, Demand, supply and prices, language focus: first conditional ---------------- */
  ...USE([
    C('E2', 'Verbs of change: up, down or no change?', 'Sort the verbs by their meaning.',
      ['Go up', 'Go down', 'No change'],
      [['rise', 0], ['increase', 0], ['climb', 0], ['fall', 1], ['drop', 1], ['decrease', 1], ['remain stable', 2]],
      'Rise, increase and climb describe upward movement. Fall, drop and decrease describe downward movement. "Remain stable" means the number stays the same.'),
    M('E2', 'Word in context: shortage', 'Choose the best word. "There is a ___ of pork before Tet: shoppers cannot find enough, and prices go up."',
      ['surplus', 'discount', 'harvest', 'shortage'], 3,
      '"Cannot find enough" tells us the word is "shortage" (not enough of something). A "surplus" is the opposite: too much.'),
    M('E2', 'Collocation: in high demand', 'Choose the correct form. "Durian from Dak Lak is in high ___ this month, so sellers are raising their prices."',
      ['demand', 'demanding', 'demanded', 'demands'], 0,
      'The fixed phrase is "in high demand" with the noun "demand". After the adjective "high" we need a noun, not a verb form.'),
    M('E2', 'First conditional: the if-clause', 'Choose the correct form. "If the price of coffee beans ___ , cafés will raise their prices."',
      ['will rise', 'rises', 'rose', 'would rise'], 1,
      'In the first conditional the if-clause takes the present simple: If + present simple, will + verb. We do not use "will" after "if" here.'),
    M('E2', 'First conditional: the result clause', 'Choose the correct form. "If the mango harvest is very good this year, the price ___ ."',
      ['fell', 'has fallen', 'will fall', 'would fall'], 2,
      'A prediction about a possible future event takes "will" + verb in the result clause: If the harvest is good, the price will fall.'),
    M('E2', 'Unless', 'Choose the best word. "We will not have enough stock for the weekend ___ we order more rice today."',
      ['because', 'so', 'if', 'unless'], 3,
      '"Unless" means "if not": we will not have enough stock if we do not order more rice. "If" would give the opposite meaning.'),
    O('E2', 'Order the process: why vegetable prices change', 'Put the sentences in the correct order to describe how the price changes.',
      ['First, heavy rain in Da Lat damages many vegetable farms.',
        'As a result, fewer vegetables arrive at markets in Ho Chi Minh City.',
        'Because supply is lower, sellers raise their prices.',
        'When prices are higher, some consumers buy fewer vegetables or choose other food.',
        'Finally, new vegetables arrive from other provinces and prices fall again.'],
      'The linking words show the order: "First" opens, "As a result" and "Because" give the effects, "When prices are higher" follows the price rise, and "Finally" closes.'),
    M('E2', 'Describing data: lime prices', 'Price of one kilo of limes at a city market: March – 20,000 VND; April – 35,000 VND; May – 34,000 VND. Which sentence correctly describes the data?',
      ['The price rose slightly in April and then fell sharply in May.', 'The price rose sharply in April and then fell slightly in May.', 'The price remained stable from March to May.', 'The price fell sharply in April and then rose slightly in May.'], 1,
      'From 20,000 to 35,000 is a big change, so "rose sharply". From 35,000 to 34,000 is a small change, so "fell slightly".'),
  ]),
  ...READ('E2-r1', 'Reading, An email from a seafood supplier',
    `Subject: Shrimp prices from 1 June\n\nDear Ms Ngoc,\n\nThank you for your order last week. I am writing to explain a change in our prices.\n\nFrom 1 June, the price of fresh shrimp will rise from 240,000 to 280,000 VND per kilo. There are two reasons for this. First, the weather in May was very bad, so our boats in Vung Tau went out on only twelve days. Supply has fallen by about a third. Second, demand is growing: the summer holiday season has started and hotels along the coast are ordering much more seafood than in spring.\n\nWe know that higher prices are difficult for restaurants. For this reason, we can offer you frozen shrimp at the old price of 240,000 VND until the end of June. The quality is good, and many of our customers use it for soups and fried rice.\n\nIf the weather improves, we expect supply to return to normal in July, and prices will probably fall again. Please tell me by Friday how many kilos you would like.\n\nBest regards,\nPham Van Duc\nSales Manager, Song Xanh Seafood`, [
      M('E2', 'Writer\'s purpose', 'Why is Mr Duc writing to Ms Ngoc?',
        ['To apologise for a late delivery', 'To ask her to pay for last week\'s order', 'To explain a price rise and offer another product', 'To tell her that he has stopped selling shrimp'], 2,
        'He writes "I am writing to explain a change in our prices" and later offers frozen shrimp at the old price.'),
      M('E2', 'Specific detail', 'Why has the supply of fresh shrimp fallen?',
        ['The boats went out on only a few days because of bad weather', 'Hotels bought all the shrimp in spring', 'The company sold some of its boats', 'Frozen shrimp has become more popular'], 0,
        'The email says: "the weather in May was very bad, so our boats in Vung Tau went out on only twelve days."'),
      M('E2', 'Vocabulary in context: return to normal', 'In the last paragraph, "supply to return to normal" means that supply will…',
        ['become higher than ever before', 'stop completely', 'be sent back to the supplier', 'go back to its usual level'], 3,
        '"Return" means go back, and "normal" means the usual situation, so supply will go back to its usual level.'),
      M('E2', 'Inference', 'What can we understand about the price of fresh shrimp in July?',
        ['It will certainly stay at 280,000 VND', 'It may go down if the boats can fish more often', 'It will rise again because of the holiday season', 'It will be lower than the price of frozen shrimp'], 1,
        'The writer says "If the weather improves… prices will probably fall again". "Probably" and "if" show it is possible, not certain.'),
    ]),
  ...LISTEN('E2-l1', 'Listening, Morning update at a mini-supermarket',
    "Good morning, everyone. Just a quick update before we open. First, watermelons. Farmers in Long An had a very good harvest, so there's a lot of supply and our buying price has dropped to eight thousand dong a kilo. Let's put them at the front of the store and sell them at twelve thousand. Second, eggs. Demand is very high this week because of the Mid-Autumn Festival. Bakeries are buying everything, and we only have forty boxes left. I don't want a shortage on Saturday, so Lan, please call the supplier this morning and order sixty more boxes. If they ask for a higher price, that's fine, but tell me first. Okay, that's all. Have a good day.", [
      M('E2', 'Listening for gist', 'What is the speaker doing?',
        ['Complaining to a supplier about prices', 'Giving staff an update about two products', 'Welcoming customers to a new store', 'Explaining how farmers grow watermelons'], 1,
        'The speaker says "Just a quick update before we open" and then talks about watermelons and eggs.'),
      M('E2', 'Listening for specific information', 'Why has the buying price of watermelons dropped?',
        ['Customers have stopped buying them', 'The festival has ended', 'The store has only forty boxes left', 'Farmers had a very good harvest'], 3,
        'The speaker says: "Farmers in Long An had a very good harvest, so there\'s a lot of supply and our buying price has dropped."'),
      M('E2', 'Listening for next action', 'What should Lan do this morning?',
        ['Call the supplier and order sixty more boxes of eggs', 'Move the eggs to the front of the store', 'Raise the price of eggs to twelve thousand dong', 'Tell the bakeries to stop buying eggs'], 0,
        'The speaker says: "Lan, please call the supplier this morning and order sixty more boxes."'),
    ]),
  ...SPEAK('E2', 'Speaking, A price that changed',
    'Talk for about 1 minute about a product whose price changed recently (for example petrol, eggs, bubble tea or vegetables).\n• Say what the product is and how the price changed\n• Explain why (think about demand or supply)\n• Say what you think will happen next (use "If…, … will…")',
    'I want to talk about the price of eggs near my dormitory. Last month a box of ten eggs cost thirty thousand dong, but now it costs thirty-six thousand. I think the price rose because demand is high before the Mid-Autumn Festival. Bakeries need a lot of eggs for moon cakes, so there is a small shortage. If farmers send more eggs to the city, the price will fall again. I think it will return to normal next month.',
    'Content: names the product, describes the price change, gives a demand or supply reason and makes one prediction'),
  ...WRITE('E2', 'Writing, Email to the head chef about a price rise',
    'You are Ms Ngoc, the manager of Sen Viet Restaurant in Nha Trang. Your supplier is raising the price of fresh shrimp (see the reading). Write an email of about 100 words to your head chef, Mr Hai.\n• Explain what is changing and why\n• Say what you want the kitchen to do in June\n• Say when you will review the decision',
    'Dear Chef Hai,\nI am writing about our shrimp order for June. Song Xanh Seafood will raise the price of fresh shrimp from 240,000 to 280,000 VND per kilo because bad weather has reduced supply and demand from hotels is high.\nFor this reason, please use frozen shrimp for soups and fried rice in June. It is still 240,000 VND per kilo and the quality is good. We will keep fresh shrimp only for grilled dishes.\nIf supply returns to normal in July, prices will probably fall. I will review our order on 30 June.\nThank you for your help.\nBest regards,\nNgoc',
    'Content: states the price change and its two causes, gives a clear instruction for June and a review date'),

  /* ---------------- E3, Prices, customers and government rules, language focus: the passive ---------------- */
  ...USE([
    C('E3', 'Who does it: the government or a business?', 'Sort the phrases: is this usually an action of the government or of a business?',
      ['Government action', 'Business decision'],
      [['introduce a tax', 0], ['set a maximum price', 0], ['give a subsidy', 0], ['pass a new regulation', 0], ['offer a discount', 1], ['launch a promotion', 1], ['raise the menu price', 1]],
      'Verb + noun partners: governments introduce taxes, set maximum prices, give subsidies and pass regulations. Businesses offer discounts, launch promotions and raise their own prices.'),
    M('E3', 'Word in context: price-sensitive', 'Choose the best word. "Students are very ___ : when a cup of bubble tea went from 40,000 to 44,000 VND, many of them stopped buying it."',
      ['priceless', 'price-sensitive', 'well-priced', 'half-price'], 1,
      '"Price-sensitive" describes customers who change their behaviour quickly when the price changes. "Priceless" means extremely valuable.'),
    M('E3', 'Word formation: subsidy', 'Choose the correct form. "The city gives bus companies a ___ so that tickets stay cheap for students."',
      ['subsidise', 'subsidised', 'subsidising', 'subsidy'], 3,
      'After the article "a" we need a noun: a subsidy. "Subsidise" is the verb and "subsidised" is the adjective (a subsidised ticket).'),
    M('E3', 'Passive: past simple', 'Choose the correct form. "A maximum price for face masks ___ by the city last week."',
      ['was set', 'set', 'is setting', 'has set'], 0,
      'The price does not act; the city acts on it. With "last week" we use the past simple passive: was + past participle (was set).'),
    M('E3', 'Passive: present simple', 'Choose the correct form. "In many countries, electricity prices ___ by the government."',
      ['control', 'are controlling', 'are controlled', 'have controlled'], 2,
      'A general fact in the passive takes am/is/are + past participle: prices are controlled by the government.'),
    M('E3', 'Passive: future', 'Choose the correct form. "The new parking fee ___ next month."',
      ['will introduce', 'will be introduced', 'is introduce', 'introduces'], 1,
      'The future passive is will be + past participle. The fee cannot introduce itself, so the active form "will introduce" is wrong.'),
    O('E3', 'Order the memo: new lunch prices', 'Put the parts of this staff memo in the correct order.',
      ['To: All restaurant staff. Subject: New lunch prices from Monday',
        'From Monday 3 March, the price of every lunch set will be raised by 3,000 VND.',
        'This is because the cost of rice and cooking oil has gone up this year.',
        'However, the student discount on Wednesdays will be kept.',
        'Please change the menu boards on Sunday evening and explain the new prices politely to customers.',
        'Thank you for your support. Ms Vy, Manager'],
      'A memo starts with the heading, then the main news, the reason ("This is because…"), a contrast ("However…"), the action for staff and a closing line.'),
    M('E3', 'Describing data: price and sales', 'Tra Xanh bubble tea, price per cup: January – 40,000 VND; February – 44,000 VND. Cups sold per week: January – 1,000; February – 850. Which sentence correctly describes the data?',
      ['After the price went up in February, weekly sales remained stable.', 'After the price was cut in February, weekly sales rose sharply.', 'Both the price and weekly sales increased in February.', 'After the price went up in February, weekly sales fell.'], 3,
      'The price moved from 40,000 to 44,000 ("went up") and sales moved from 1,000 to 850 ("fell").'),
  ]),
  ...READ('E3-r1', 'Reading, A limit on student rents?',
    `Thousands of students rent small rooms near the universities in Thu Duc. Last year the average rent was 3 million VND a month. Many students say that this is more than half of their monthly budget.\n\nLast week a local councillor suggested a maximum rent of 2.4 million VND for rooms under 20 square metres. "Housing is a necessity, not a luxury," she said. "Students cannot simply stop renting when prices rise."\n\nNot everyone agrees. Landlords say that their costs for electricity and repairs have increased. Mr Hung, who owns twelve rooms, told us: "If the rent is capped, I will turn four of my rooms into storage space. It will not be worth renting them to students." A student union survey found that more students would look for rooms at the lower rent, but fewer rooms would be offered.\n\nThe union supports a different idea: the city could give a small monthly subsidy to students from low-income families. The proposal will be discussed at a public meeting on 15 October.`, [
      M('E3', 'Main idea', 'What is the article mainly about?',
        ['How to find a cheap room in Thu Duc', 'Different opinions about a plan to limit student rents', 'A new university dormitory for students', 'Why landlords are selling their rooms'], 1,
        'The article gives the councillor\'s plan, then "Not everyone agrees" and the views of landlords and the student union.'),
      M('E3', 'Specific detail', 'What does Mr Hung say he will do if the rent is capped?',
        ['Use four of his rooms for storage instead of renting them', 'Raise the rent of all twelve rooms', 'Give students a monthly subsidy', 'Sell his rooms to the student union'], 0,
        'He says: "If the rent is capped, I will turn four of my rooms into storage space."'),
      M('E3', 'Vocabulary in context: necessity', 'In paragraph 2, a "necessity" is something that people…',
        ['buy only on special occasions', 'can easily stop buying', 'must have', 'usually get for free'], 2,
        'A necessity is something you need and cannot live without. The councillor contrasts it with "a luxury" and says students "cannot simply stop renting".'),
      M('E3', 'Inference', 'What does the student union survey suggest would happen with a maximum rent?',
        ['Landlords would build more rooms', 'Rents would go above 3 million VND', 'Fewer students would want to rent a room', 'Some students would not be able to find a room'], 3,
        'The survey found that "more students would look for rooms… but fewer rooms would be offered", so there would not be enough rooms for everyone.'),
    ]),
  ...LISTEN('E3-l1', 'Listening, A gym owner talks about prices',
    "Thanks for joining the call. Let me start with our prices. In March we raised the monthly membership from four hundred thousand to four hundred and fifty thousand dong. I expected to lose a few members, but we lost almost two hundred, mostly students. They are very price-sensitive, and there are three other gyms near the university, so it's easy for them to switch. Our office workers are different. Almost all of them stayed. So here's my plan. From the first of June, students will pay three hundred and eighty thousand if they show a student card. The price for everyone else won't change. Minh, can you prepare the new price list and send it to me by Wednesday? Thanks.", [
      M('E3', 'Listening for gist', 'What is the speaker mainly talking about?',
        ['Opening a new gym near the university', 'A problem with student cards', 'The result of a price rise and a new price plan', 'Hiring more staff for June'], 2,
        'The speaker says "Let me start with our prices", describes what happened after the rise in March, and then says "So here\'s my plan".'),
      M('E3', 'Listening for specific information', 'Who left the gym after the price rise?',
        ['Mostly students', 'Mostly office workers', 'Almost all of the members', 'Only members without a card'], 0,
        'The speaker says: "we lost almost two hundred, mostly students", and about office workers: "Almost all of them stayed."'),
      M('E3', 'Listening for next action', 'What does the speaker ask Minh to do?',
        ['Visit the three other gyms', 'Prepare the new price list by Wednesday', 'Call the students who left', 'Raise the price for office workers'], 1,
        'The request is: "Minh, can you prepare the new price list and send it to me by Wednesday?"'),
    ]),
  ...SPEAK('E3', 'Speaking, When prices go up',
    'Talk for about 1 minute. A café near your university raises all its prices by 10%.\n• Say which product you would stop buying there and which you would still buy\n• Explain why (is it a necessity or a luxury? are there substitutes?)\n• Say what the owner should do to keep student customers',
    'If the café near my university raises its prices by ten per cent, I will stop buying bubble tea there. Bubble tea is a luxury for me, and there are many substitutes, so I can easily switch to another shop. However, I will still buy lunch there, because lunch is a necessity and the café is close to my classroom. I think the owner should offer a student discount. Students are very price-sensitive, so a lower price will bring them back.',
    'Content: names one product to stop buying and one to keep, explains with necessity/luxury or substitutes, gives one suggestion to the owner'),
  ...WRITE('E3', 'Writing, Short report on sales after a price rise',
    'You are the assistant manager of Tra Xanh, a bubble tea shop near a university in Ho Chi Minh City. On 1 February the price of a cup was raised from 40,000 to 44,000 VND, and weekly sales fell from 1,000 to 850 cups. Write a short report of about 100 words for the owner, Ms Vy.\n• Describe what happened after the price rise\n• Explain why you think customers reacted this way\n• Make one recommendation',
    'To: Ms Vy\nSubject: Sales after the price rise\nThis report describes our sales in February. On 1 February the price of a cup was raised from 40,000 to 44,000 VND. After that, weekly sales fell from 1,000 to 850 cups.\nI think there are two reasons. Most of our customers are students, who are very price-sensitive. In addition, there are four other tea shops on our street, so it is easy to switch.\nI recommend that we keep the new price but offer a student discount of 4,000 VND on weekdays. Sales should be checked again at the end of March.\nTrang',
    'Content: reports the price and sales figures from the prompt, gives at least one reason for the customers\' reaction, makes one clear recommendation'),

  /* ---------------- E4, Prices, jobs and the economy, language focus: present perfect vs past simple ---------------- */
  ...USE([
    C('E4', 'Good news or bad news for workers?', 'Sort the phrases by their meaning for a worker.',
      ['Usually good news', 'Usually bad news'],
      [['a pay rise', 0], ['job growth', 0], ['a strong economy', 0], ['a rising cost of living', 1], ['high unemployment', 1], ['job losses', 1], ['a pay cut', 1]],
      'Rise and growth with pay and jobs are positive. Cut, losses and unemployment are negative, and a rising cost of living means everything is more expensive.'),
    M('E4', 'Word formation: unemployment', 'Choose the correct form. "Youth ___ is a problem in many cities: thousands of graduates cannot find a job."',
      ['unemployed', 'employ', 'unemployment', 'employer'], 2,
      'The subject of the sentence must be a noun for the situation: unemployment. "Unemployed" is an adjective for people; an "employer" is a person or company.'),
    M('E4', 'Collocation: the ___ of living', 'Choose the best word. "The ___ of living in Ho Chi Minh City is higher than in Can Tho: rent, food and transport are all more expensive."',
      ['cost', 'price', 'fee', 'value'], 0,
      'The fixed phrase is "the cost of living": the money people need for rent, food, transport and other basic things.'),
    M('E4', 'Present perfect with "since"', 'Choose the correct form. "Food prices ___ by 6% since January."',
      ['rose', 'rise', 'are rising', 'have risen'], 3,
      '"Since January" links the past to now, so we use the present perfect: have + past participle (have risen).'),
    M('E4', 'Past simple with "last year"', 'Choose the correct form. "Last year the economy ___ by 5%."',
      ['has grown', 'grew', 'grows', 'is growing'], 1,
      '"Last year" is a finished time, so we use the past simple (grew), not the present perfect.'),
    M('E4', 'For or since?', 'Choose the best word. "Prices at the market have been stable ___ three months."',
      ['since', 'from', 'for', 'ago'], 2,
      'We use "for" with a length of time (for three months) and "since" with a starting point (since March).'),
    O('E4', 'Order the report: prices and jobs last year', 'Put the sentences of this short report in the correct order.',
      ['This short report describes prices and jobs in our city last year.',
        'First, prices rose by about 4%, mainly because food and rent became more expensive.',
        'Second, unemployment fell slightly, as new hotels and factories hired more workers.',
        'However, average wages increased by only 3%, so many families felt poorer.',
        'In conclusion, the economy grew, but the cost of living is still a problem for workers.'],
      'A report opens with its purpose ("This short report describes…"), lists points with "First" and "Second", adds a contrast with "However" and ends with "In conclusion".'),
    M('E4', 'Describing data: unemployment', 'Unemployment rate in one city: 2021 – 4.5%; 2022 – 3.1%; 2023 – 3.0%. Which sentence correctly describes the data?',
      ['Unemployment fell sharply in 2022 and then remained almost stable in 2023.', 'Unemployment rose sharply in 2022 and then fell slightly in 2023.', 'Unemployment fell slightly in 2022 and then fell sharply in 2023.', 'Unemployment remained stable from 2021 to 2023.'], 0,
      'From 4.5 to 3.1 is a big fall ("fell sharply"). From 3.1 to 3.0 is almost no change ("remained almost stable").'),
  ]),
  ...READ('E4-r1', 'Reading, What does inflation mean for a student?',
    `Newspapers say that prices rose by about 4% last year. For Linh, a second-year student in Binh Thanh District, the number feels much higher.\n\nLinh writes down everything she spends in a notebook. Last year her room, food and transport cost 6 million VND a month, exactly the same as the allowance from her parents. This year her landlord has raised the rent, a bowl of pho near her university costs 5,000 VND more, and petrol is more expensive too. Now the same things cost 6.6 million VND a month.\n\nHer parents have increased her allowance to 6.3 million VND. "They gave me more money, but I can buy less with it," Linh says. "That is what inflation means for me."\n\nTo close the gap, Linh has started to cook at home four evenings a week, and she takes the bus instead of her motorbike. She has also found a part-time job in a bookshop. "I cannot control prices," she says, "but I can control my budget."`, [
      M('E4', 'Main idea', 'What is the article mainly about?',
        ['How to get a bigger allowance from your parents', 'Why pho is more expensive than other food', 'How rising prices affect one student\'s budget', 'How newspapers measure inflation'], 2,
        'The article follows one student, Linh, and shows how higher prices for rent, food and petrol change her monthly budget.'),
      M('E4', 'Specific detail', 'How much do Linh\'s room, food and transport cost each month this year?',
        ['5,000 VND', '6 million VND', '6.3 million VND', '6.6 million VND'], 3,
        'Paragraph 2 says: "Now the same things cost 6.6 million VND a month." 6.3 million is her new allowance.'),
      M('E4', 'Vocabulary in context: close the gap', 'In the last paragraph, "to close the gap" means to…',
        ['reduce the difference between her costs and her allowance', 'shut the door of her room', 'stop writing in her notebook', 'borrow money from the bookshop'], 0,
        'A "gap" is a difference between two numbers: here, her costs and her allowance. She closes it by spending less and earning more.'),
      M('E4', 'Inference', 'Why does Linh say "I can buy less with it"?',
        ['Her parents have reduced her allowance', 'Her costs have gone up more than her allowance', 'She now spends more money on books', 'She has lost her part-time job'], 1,
        'Her costs are now 6.6 million VND but her allowance is 6.3 million VND, so the extra money does not cover the higher prices.'),
    ]),
  ...LISTEN('E4-l1', 'Listening, An HR manager explains a salary decision',
    "Good afternoon, everyone. I'd like to explain this year's salary decision. As you know, the cost of living has gone up a lot. Prices in the city rose by about five per cent last year, and rent rose even faster. Many of you have told me that your salary doesn't go as far as before. The good news is that the company had a strong year. Our exports to Japan grew by twelve per cent, and we hired forty new workers. So, from the first of July, all salaries will increase by seven per cent. That is higher than inflation, so you should really feel the difference. Your team leaders will give you a letter with your new salary next Monday. Any questions?", [
      M('E4', 'Listening for gist', 'What is the main purpose of the talk?',
        ['To explain why forty workers lost their jobs', 'To announce and explain a salary increase', 'To introduce a new customer from Japan', 'To ask workers to spend less money'], 1,
        'The speaker begins: "I\'d like to explain this year\'s salary decision", and then announces that "all salaries will increase".'),
      M('E4', 'Listening for specific information', 'By how much will salaries increase?',
        ['Five per cent', 'Twelve per cent', 'Forty per cent', 'Seven per cent'], 3,
        'The speaker says: "all salaries will increase by seven per cent." Five per cent is the price rise and twelve per cent is export growth.'),
      M('E4', 'Listening for opinion', 'What does the speaker think about the increase?',
        ['It is too small to help with rent', 'It is risky because exports are falling', 'Workers will notice it because it is higher than inflation', 'It should be only for team leaders'], 2,
        'The speaker says: "That is higher than inflation, so you should really feel the difference."'),
    ]),
  ...SPEAK('E4', 'Speaking, The cost of living for students',
    'Talk for about 1 minute about the cost of living for students in your city.\n• Say what has become more expensive this year\n• Explain how this has changed your spending\n• Say what students can do to manage their budget',
    'The cost of living in Ho Chi Minh City has risen this year. My rent has gone up by two hundred thousand dong, and lunch near my university is more expensive too. Because of inflation, my allowance does not go as far as before, so I have changed my spending. I cook at home more often and I take the bus. I think students should write down what they spend and look for a part-time job. We cannot control prices, but we can plan our budget.',
    'Content: gives one or two examples of higher prices, explains a change in spending, suggests one way to manage a budget'),
  ...WRITE('E4', 'Writing, Memo to staff about a salary increase',
    'You work in the HR department of Sao Mai Garment Company in Binh Duong. Write a memo of about 100 words to all staff.\n• Give the reason for a salary increase (the rising cost of living)\n• State the size and the date of the increase\n• Say what staff should do if they have questions',
    'To: All staff\nFrom: Human Resources\nSubject: Salary increase from 1 July\nWe know that the cost of living has risen this year. Prices in our area have increased by about 5%, and many of you are paying more for rent and food.\nBecause the company has had a strong year, all salaries will increase by 7% from 1 July. This is higher than inflation, so we hope it will help your family budget.\nYou will receive a letter with your new salary next Monday. If you have any questions, please speak to your team leader or email the HR office.\nThank you for your hard work.\nMs Thu, HR Manager',
    'Content: gives the reason, the size and the start date of the increase, and tells staff who to contact with questions'),
];

export const LIB = [
  ['R-ECO-C1', 'case_study', 'E1', 'Rice fields or factories? Land use in Long An', 40,
    'Long An province is next to Ho Chi Minh City and has some of the best rice land in the Mekong Delta. The provincial government has received a proposal to turn 500 hectares of rice fields in Đức Hòa District into an industrial park.\n' +
    'Today about 1,200 farming families grow two rice crops a year on this land. The investor, Phú Long Industrial (an invented firm), says that the park will bring 30 factories and 15,000 jobs. The province will also receive more tax. Supporters say that land is scarce and that factories create more income than rice.\n' +
    'Critics do not agree. They say that Vietnam needs rice for food and for export, that many older farmers do not have the skills for factory work, and that the land can never return to farming. The government has limited land and must make a choice. Whatever it decides, there will be an opportunity cost.\n\n' +
    'Language tasks\n' +
    '1. Find these five key terms in the text and explain each one in a simple English sentence: proposal, investor, scarce, income, opportunity cost.\n' +
    '2. Role-play a public meeting in groups of four (a government official, the investor, a farmer and a young worker). Use these phrases: "In my opinion…", "I see your point, but…", "What about…?", "I\'m afraid I disagree because…".\n' +
    '3. Write an email of about 120 words to the provincial government. Recommend that it approves or rejects the proposal, give two reasons from the text and name the opportunity cost of your choice.\n' +
    '4. Give a 2-minute spoken summary of the case to a classmate who has not read it: the situation, the two sides and your own opinion.'],

  ['R-ECO-C2', 'case_study', 'E3', 'A fee on plastic cups: what should the café do?', 35,
    'The old town of Hội An wants to reduce plastic waste. In this invented case, the city plans to introduce a fee of 2,000 VND on every single-use plastic cup from 1 January. The fee will be paid by cafés to the city each month.\n' +
    'Ms An owns An Nhiên Coffee, a small takeaway café (an invented firm). She sells about 300 drinks a day at 30,000 VND each. Half of her customers are tourists and half are local students.\n' +
    'She has three options. She can raise her prices by 2,000 VND, but students are price-sensitive and there are many substitutes on her street. She can pay the fee herself and accept a lower profit. Or she can offer a discount of 3,000 VND to customers who bring their own cup. Tourists say that they will pay a little more. Students say that they will switch to another café.\n\n' +
    'Language tasks\n' +
    '1. Find these five key terms in the text and explain each one in a simple English sentence: fee, single-use, price-sensitive, substitute, discount.\n' +
    '2. Role-play a staff meeting at the café (the owner, a cashier and a student customer). Use these phrases: "Why don\'t we…?", "If we raise the price, … will…", "I\'d recommend…", "That\'s a good point, but…".\n' +
    '3. Write an email of about 120 words to Ms An. Recommend one of the three options and give two reasons from the text.\n' +
    '4. Give a 2-minute spoken summary of the situation and your recommendation. Use at least three passive sentences (for example: "A fee will be introduced…").'],

  ['R-ECO-G1', 'group_project', 'E2', 'Market price watch: reporting food prices in English', 180,
    'Brief\n' +
    'Your team works for an English-language student newsletter. Follow the prices of five fresh food items (for example pork, eggs, morning glory, mango and rice) at two places near your campus, such as a wet market and a supermarket, for three weeks.\n' +
    'Ask two sellers why their prices have gone up or down. You may interview them in Vietnamese, but all your project output must be in English. Describe the price changes with the language of trends (rise, fall, remain stable, sharply, slightly) and explain them with the words demand, supply, shortage and surplus.\n' +
    'Deliverables\n' +
    '- A 5-minute presentation in English with one simple price chart\n' +
    '- A one-page report in English (about 250 words): what changed, why, and what you expect next month\n' +
    '- A glossary of 15 useful English words and phrases about prices and markets, each with an example sentence\n' +
    'Team roles (4–5 students)\n' +
    '- Coordinator: plans the market visits and keeps the timeline\n' +
    '- Price recorder: writes down the prices each week and checks the numbers\n' +
    '- Interviewer: prepares the questions and takes notes from the sellers\n' +
    '- Writer: drafts the one-page report and the glossary\n' +
    '- Presenter (fifth member, optional): prepares the slides and leads the rehearsal\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: choose the items and places, record the first prices, start the glossary\n' +
    '- Week 2: record the second prices, interview two sellers, draft the report\n' +
    '- Week 3: record the final prices, finish the report and glossary, rehearse and present\n' +
    'Assessment (100 points)\n' +
    '- Content (clear data, reasons and prediction): 30\n' +
    '- Language accuracy and vocabulary (trend language, unit terms, grammar): 30\n' +
    '- Delivery and pronunciation: 20\n' +
    '- Teamwork and answers to questions: 20'],

  ['R-ECO-G2', 'group_project', 'E4', 'The student cost of living: a class survey in English', 180,
    'Brief\n' +
    'Your team will find out how the cost of living has changed for students in your class. Write a short questionnaire in English (6–8 questions) about monthly spending on rent, food, transport and study materials, this year and last year. Ask at least 15 classmates.\n' +
    'Then interview one student in English about how rising prices have changed his or her budget. Describe your results with the present perfect and the past simple (for example: "Rent has risen since last year", "Food cost less in 2023") and with the words inflation, cost of living, allowance, budget and wages.\n' +
    'Deliverables\n' +
    '- A 5-minute presentation in English with one chart of the survey results\n' +
    '- A one-page report in English (about 250 words): what has become more expensive, how students have reacted, and two pieces of advice\n' +
    '- A glossary of 15 useful English words and phrases about prices, jobs and budgets, each with an example sentence\n' +
    'Team roles (4–5 students)\n' +
    '- Coordinator: plans the work and keeps the timeline\n' +
    '- Survey designer: writes and checks the English questionnaire\n' +
    '- Data recorder: collects the answers and prepares the chart\n' +
    '- Writer: drafts the one-page report and the glossary\n' +
    '- Presenter (fifth member, optional): prepares the slides and leads the rehearsal\n' +
    'Timeline (3 weeks)\n' +
    '- Week 1: write and test the questionnaire, start the glossary\n' +
    '- Week 2: collect the answers, interview one student, draft the report\n' +
    '- Week 3: finish the chart, report and glossary, rehearse and present\n' +
    'Assessment (100 points)\n' +
    '- Content (clear results, reasons and advice): 30\n' +
    '- Language accuracy and vocabulary (tenses, trend language, unit terms): 30\n' +
    '- Delivery and pronunciation: 20\n' +
    '- Teamwork and answers to questions: 20'],
];

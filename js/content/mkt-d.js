// English for Marketing Communication (ESP, CEFR B1–B1+), units PJ1, PJ2, RV2 and FX.
// Project workshops, final review and exam practice; Green Leaf Tea is the running case, English is the goal.
import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';

export const EXTRA = [
  /* ---------------- PJ1, Project Workshop 1: Drafting the Campaign Proposal — teamwork and feedback phrases ---------------- */
  ...USE([
    M('PJ1', 'Useful phrases, Disagreeing politely', 'Choose the most polite way to disagree in a team meeting.',
      ['I see your point, but I think we should start in May.', 'No, you are wrong about May.', 'That idea is bad, so forget it.', 'We will do my plan, not yours.'], 0,
      '"I see your point, but ..." shows respect for the other idea before you give your own. The other options sound rude.'),
    M('PJ1', 'Useful phrases, Balanced feedback', 'Complete the feedback: "Your objectives are very clear. ___, the budget section needs more detail."',
      ['Because', 'However', 'So', 'Unless'], 1,
      '"However" introduces a contrast: first a strength, then a point to improve.'),
    M('PJ1', 'Vocabulary, Word formation', 'Choose the correct form: "Let\'s ___ the tasks: Linh writes the objectives and Nam prepares the budget."',
      ['division', 'dividing', 'divide', 'divided'], 2,
      'After "Let\'s" we use the base form of the verb: divide.'),
    M('PJ1', 'Language focus, First conditional', 'Complete the sentence: "If we ___ the draft by Thursday, the lecturer will give us feedback on Friday."',
      ['will finish', 'finished', 'finishing', 'finish'], 3,
      'In the first conditional, the if-clause uses the present simple (finish) and the main clause uses will.'),
    O('PJ1', 'Cohesion, Order sentences from Team 4\'s draft', 'Put these sentences from Team 4\'s draft proposal in the correct order. Use the linking words and the words that point back.',
      ['We propose a four-week campaign to introduce our cold-brew bottles to university students.',
        'At the moment, however, only 12% of our cold-brew buyers are under 25.',
        'Our objective is therefore to sell 6,000 bottles to students by the end of the campaign.',
        'To do this, we will set up sampling stands at three universities.',
        'These stands and the free samples will use most of our 45 million VND budget.',
        'If the plan works, sales to young customers will rise before the summer holiday.'],
      '"We propose" opens the text. "However" contrasts the plan with the problem now. "Therefore" gives the result of that problem. "To do this" points back to the objective, and "These stands" points back to the stands. "If the plan works" looks forward to the result, so it comes last.'),
  ]),
  ...READ('PJ1-r', 'Reading, A peer team\'s draft proposal',
    'Draft proposal, Team 4: Cold Brew on Campus\n\n' +
    'Summary: We propose a four-week campaign to introduce Green Leaf Tea cold-brew bottles to university students in Ho Chi Minh City.\n\n' +
    'Background: Green Leaf Tea launched its cold-brew line in January. Sales in shops are good, but only 12% of buyers are under 25. Students drink a lot of milk tea, but many of them say they want a healthier choice.\n\n' +
    'Objectives: We want to sell 6,000 bottles to students and get 2,000 new followers on the brand\'s social media page by the end of the campaign.\n\n' +
    'Actions: We will set up sampling stands at three universities in District 3 and Binh Thanh. Student ambassadors will post short videos about the drink. If students share a photo with the bottle, they will get a 10% discount code.\n\n' +
    'Budget: The total budget is 45 million VND. Most of the money goes to the stands and the free samples.\n\n' +
    'Expected results: If the plan works, cold-brew sales to young customers will rise before the summer holiday.\n\n' +
    'Note from Team 4: We are not sure about the budget. Please give us feedback on this part.',
    [
      M('PJ1', 'Reading, Main idea', 'What is the main purpose of this draft?',
        ['To propose a campaign that sells cold-brew bottles to students', 'To complain about low sales in shops', 'To ask students to work as part-time staff', 'To compare milk tea brands in District 3'], 0,
        'The summary says the team proposes a campaign to introduce cold-brew bottles to university students.'),
      M('PJ1', 'Reading, Detail', 'How many new social media followers does Team 4 want?',
        ['6,000', '12', '2,000', '45'], 2,
        'The objectives say "2,000 new followers". 6,000 is the number of bottles.'),
      M('PJ1', 'Reading, Vocabulary in context', 'In the text, "sampling stands" are ...',
        ['shelves where a supermarket keeps its drinks', 'large signs that advertise the drink at the gates', 'boxes that the company uses to store bottles', 'small places where people can try the product for free'], 3,
        'The stands give out "free samples", so people can try the drink before they buy it.'),
    ]),
  ...LISTEN('PJ1-l', 'Listening, Feedback in a team meeting',
    'Ha: OK, everyone, thanks for coming. Let\'s look at Team 4\'s draft. Linh, what do you think? ' +
    'Linh: Well, I really like the idea of sampling stands. Students love free drinks! However, I think the budget is too high. Forty-five million is a lot for four weeks. ' +
    'Ha: I agree. Could you cut it to about thirty-five million? ' +
    'Linh: Yes, maybe. We could use two universities instead of three. Then we\'d save around ten million. ' +
    'Ha: Good idea. And the objectives are clear, but I\'d like you to add a start date. When exactly does the campaign start? ' +
    'Linh: We\'re planning to start on the fifteenth of April. ' +
    'Ha: Great. Please put that in the draft. Can you send me the new version by Wednesday? ' +
    'Linh: Sure. I\'ll email it to you on Wednesday morning.',
    [
      M('PJ1', 'Listening, Gist', 'What is the meeting mainly about?',
        ['Choosing a new tea flavour', 'Giving feedback on a team\'s draft proposal', 'Planning a student party', 'Hiring student ambassadors'], 1,
        'Ha asks for opinions on Team 4\'s draft, and they discuss its budget and objectives.'),
      M('PJ1', 'Listening, Detail', 'When will the campaign start?',
        ['On Wednesday morning', 'In four weeks', 'On 15 April', 'Before the summer'], 2,
        'Linh says, "We\'re planning to start on the fifteenth of April."'),
      M('PJ1', 'Listening, Next step', 'What will Linh do next?',
        ['Email the new version on Wednesday morning', 'Visit three universities', 'Cancel the sampling stands', 'Ask for a bigger budget'], 0,
        'Linh promises: "I\'ll email it to you on Wednesday morning."'),
    ]),
  ...SPEAK('PJ1', 'Speaking, Give feedback on a draft',
    'You are a student in Team 2. You have read Team 4\'s draft proposal "Cold Brew on Campus". Notes: strength: the objectives have exact numbers (6,000 bottles, 2,000 new followers); stands are a good idea, students love free drinks; to improve: the budget shows only the total (45 million VND); suggestions: add a cost table (stands, samples, ambassadors), start at two universities and add a third later. Give spoken feedback to Team 4. Use: I really like ... because ..., However, ..., You could ..., It might be better to ... and one first conditional. Speak for about 1 minute.',
    'Hello Team 4, and thank you for sharing your draft. First, I really like your objectives because they are clear and they have exact numbers: 6,000 bottles and 2,000 new followers. The sampling stands are also a great idea, because students love trying free drinks. However, I think the budget section needs more detail. At the moment we only know the total, 45 million VND. You could add a small table with the cost of the stands, the samples and the student ambassadors. It might also be better to start at two universities. If the stands work well, you can add a third one later. Good luck!',
    ['Language: uses feedback phrases accurately (I really like ... because ..., However, ..., You could ..., It might be better to ...) and one first conditional',
      'Task: gives one strength with a reason, one part to improve and one practical suggestion from the notes',
      'Delivery: clear, steady pace, polite tone, understandable pronunciation']),
  ...WRITE('PJ1', 'Writing, Draft a proposal section',
    'Your team is writing a campaign proposal for Green Leaf Tea. The reader is Ms Nguyen Thu Ha, the marketing manager. Write the "Objectives and Actions" section of your draft for a new campaign: Tet gift boxes for office workers in District 1. Notes: objectives: sell 3,000 gift boxes in District 1 by 25 January; sign agreements with 20 companies by 15 January. Actions: tea-tasting stand in five office lobbies at lunchtime in December; Linh emails the price list and a free sample to HR managers at 60 companies; 10% discount for orders of more than 50 boxes before 10 January. Expected result: early orders mean every box arrives before Tet; late stands mean offices choose other gifts. Use: "to + verb + number + by + date" for each objective, will for the actions, First / Second / Third, and one if or unless sentence. Write about 150 words.',
    'Objectives and Actions\n\n' +
    'Objectives\nOur campaign has two objectives. First, we want to sell 3,000 Tet gift boxes to companies and office workers in District 1 by 25 January. Second, we want to sign agreements with 20 companies by 15 January, so that they buy gift boxes for their staff.\n\n' +
    'Actions\nWe will take three main actions. First, we will set up a small tea-tasting stand in the lobby of five office buildings during lunchtime in December. Second, Linh will send a short email with our price list and a free sample to the HR managers of 60 companies. Third, we will offer a 10% discount to companies that order more than 50 boxes before 10 January.\n\n' +
    'Expected result\nIf companies order early, we will have enough time to prepare and deliver every box before Tet. Unless we start the tasting stands in early December, many offices will choose other gifts first.',
    ['Language: writes each objective in the form "to + verb + number + by + date" (to sell 3,000 boxes by 25 January) and uses if/unless accurately (present simple in the if/unless clause, will in the main clause)',
      'Task: includes the two objectives, three actions and expected result from the notes',
      'Organisation: headings (Objectives, Actions, Expected result) and First / Second / Third to list the points'], 150),

  /* ---------------- PJ2, Project Workshop 2: Pitch and Press Release — signposting, handling questions, press release language ---------------- */
  ...USE([
    M('PJ2', 'Useful phrases, Signposting', 'Choose the best phrase to start the second part of a pitch.',
      ['I agree with you.', 'Could you repeat that, please?', 'Moving on to our budget, ...', 'Thank you for listening.'], 2,
      '"Moving on to ..." tells the audience that you are starting a new part of the talk.'),
    M('PJ2', 'Useful phrases, Handling questions', 'A guest asks a question and you need to check the figures. Which answer is the most professional?',
      ['I don\'t know, and I don\'t have the figures with me today.', 'That question is not really important for our pitch.', 'Please ask someone else in my team about the figures.', 'That\'s a good question. Can I check the figures and email you this afternoon?'], 3,
      'It thanks the speaker, is honest, and promises a clear next step.'),
    M('PJ2', 'Language focus, Present perfect for news', 'Complete the press release: "Green Leaf Tea ___ a new peach cold-brew flavour this week."',
      ['has launched', 'launch', 'have launched', 'launching'], 0,
      'Recent news connected to now uses the present perfect; the company is singular, so we use "has".'),
    M('PJ2', 'Language focus, The About paragraph', 'Complete the "About Green Leaf Tea" paragraph: "Green Leaf Tea ___ in Da Lat in 2016 by Mr Le Quang Minh. Today it sells tea, snacks and gift boxes in shops and online."',
      ['has founded', 'founded', 'was founded', 'is founded'], 2,
      'The company did not found itself, so we need the passive; "in 2016" is a finished time, so the past simple passive: was founded. "Today it sells" then uses the present simple for a permanent fact.'),
    O('PJ2', 'Cohesion, Order sentences from a draft press release', 'Put these sentences from the Cold Brew on Campus press release in the correct order. Use the words that point back.',
      ['Ho Chi Minh City, 20 April – Green Leaf Tea has started a four-week campaign called Cold Brew on Campus.',
        'Students at two universities in District 3 can now try its new cold-brew bottles for free.',
        'Students who share a photo with the bottle also receive a 10% discount code.',
        '"We are happy that so many students want to try our cold brew and share their photos," said Ms Nguyen Thu Ha.',
        '"Their feedback will help us choose our summer flavours," she added.',
        'About Green Leaf Tea: The company was founded in Da Lat by Mr Le Quang Minh.'],
      'The dateline and "has started" open the news. "Its" points back to Green Leaf Tea, and "also" adds a second benefit to the free drink. The quote mentions "share their photos", so it follows the discount sentence; "she added" must follow the first quote. The About paragraph always closes the release.'),
  ]),
  ...READ('PJ2-r', 'Reading, A peer team\'s draft press release',
    'FOR IMMEDIATE RELEASE\n\n' +
    'Green Leaf Tea Brings Free Cold Brew to Students\n\n' +
    'Ho Chi Minh City, 20 April – Green Leaf Tea, the tea-and-snack company from Da Lat, has started a four-week campaign called Cold Brew on Campus. Students at two universities in District 3 can now try its new cold-brew bottles for free.\n\n' +
    'The campaign has already reached more than 3,000 students in its first week. Sampling stands are open from 10 a.m. to 2 p.m., Monday to Friday. Students who share a photo with the bottle receive a 10% discount code for the online shop.\n\n' +
    '"Young people want drinks that are fresh and healthy," said Ms Nguyen Thu Ha, marketing manager of Green Leaf Tea. "We are happy that so many students have tried our cold brew and given us feedback."\n\n' +
    'The campaign will finish on 17 May.\n\n' +
    'About Green Leaf Tea\n' +
    'Green Leaf Tea (Tra La Xanh) was founded in Da Lat by Mr Le Quang Minh. It sells tea, snacks and gift boxes in shops and online across Ho Chi Minh City.\n\n' +
    'Media contact: Linh, Marketing Assistant, Green Leaf Tea',
    [
      M('PJ2', 'Reading, Main idea', 'What is the press release mainly about?',
        ['A new store in District 3', 'A price increase for cold brew', 'A job advert for student ambassadors', 'A campaign that gives students free cold brew'], 3,
        'The headline and first paragraph announce the Cold Brew on Campus campaign for students.'),
      M('PJ2', 'Reading, Detail', 'When are the sampling stands open?',
        ['Every day until 17 May', '10 a.m. to 2 p.m., Monday to Friday', 'Only at weekends', 'From 20 April to 20 May, all day'], 1,
        'The second paragraph gives the times: "from 10 a.m. to 2 p.m., Monday to Friday".'),
      M('PJ2', 'Reading, Vocabulary in context', 'In "The campaign has already reached more than 3,000 students", "reached" means ...',
        ['was seen by', 'travelled to', 'was paid by', 'asked for help from'], 0,
        'The text clue is the next sentence: the stands are open every weekday and students try the drink there. So 3,000 students saw the campaign or took part in it. The campaign did not travel, pay or ask for help.'),
    ]),
  ...LISTEN('PJ2-l', 'Listening, A team pitch with questions',
    'Nam: Good morning, everyone. Today our team is going to present our campaign, Cold Brew on Campus. First, the problem. Only twelve per cent of our cold-brew buyers are under twenty-five. ' +
    'Moving on to our plan: sampling stands at two universities for four weeks, plus short videos by student ambassadors. Our budget is thirty-five million dong. ' +
    'Finally, the results. We expect to sell six thousand bottles. Thank you. Are there any questions? ' +
    'Mr Minh: Yes. Thank you, Nam. Why did you choose universities and not shopping malls? ' +
    'Nam: That\'s a good question. Students are our target group, and stands at universities are much cheaper than stands in malls. ' +
    'Mr Minh: I see. And how will you measure the results? ' +
    'Nam: We\'ll count the discount codes in the online shop every week, and we\'ll send you a short report each Friday.',
    [
      M('PJ2', 'Listening, Gist', 'What is Nam doing?',
        ['Complaining about a product', 'Interviewing for a job', 'Pitching a campaign and answering questions', 'Explaining how to make cold brew'], 2,
        'Nam presents the problem, plan and results, then takes questions from Mr Minh.'),
      M('PJ2', 'Listening, Detail', 'What is the budget of the campaign?',
        ['6,000 bottles', '12 per cent', '25 million VND', '35 million VND'], 3,
        'Nam says, "Our budget is thirty-five million dong."'),
      M('PJ2', 'Listening, Detail', 'How will the team measure the results?',
        ['By asking students in the street', 'By counting discount codes every week', 'By counting followers at the end', 'By visiting shopping malls'], 1,
        'Nam says they will count the discount codes every week and send a report each Friday.'),
    ]),
  ...SPEAK('PJ2', 'Speaking, Pitch your campaign',
    'You are the leader of your project team. Pitch the campaign "Tet Gifts for Offices" to Mr Le Quang Minh, the founder, and the class. Notes: problem: last Tet only 15% of gift boxes went to companies; objective: sell 3,000 boxes to offices in District 1 by 25 January; actions: tasting stands in five office buildings, samples to 60 HR managers, 10% discount on large orders; budget: 40 million VND; expected result: Tet sales up about 25% if companies order early. Use: signposting (First, ... / Moving on to ... / Finally, ...), one first conditional for the result, and end by inviting questions (Are there any questions?). Speak for about 2 minutes.',
    'Good morning, Mr Minh and everyone. Today we are going to present our campaign, Tet Gifts for Offices. First, the problem: last Tet, only 15% of our gift boxes went to companies. Our objective is to sell 3,000 boxes to offices in District 1 by 25 January. Moving on to our actions. We will run tasting stands in five office buildings, send samples to 60 HR managers and offer a 10% discount on large orders. Our budget is 40 million VND. Finally, the results. If companies order early, our Tet sales will rise by about 25%. Thank you for listening. Are there any questions?',
    ['Language: signposts each part accurately (First, ... / Moving on to ... / Finally, ...), uses one first conditional for the result, and invites questions (Thank you for listening. Are there any questions?)',
      'Task: covers the problem, objective, actions, budget and expected result from the notes',
      'Delivery: clear, steady pace, eye contact, understandable pronunciation']),
  ...WRITE('PJ2', 'Writing, The launch press release',
    'Your team\'s campaign for Green Leaf Tea starts next week. Notes: campaign "Tet Gifts for Offices", launched 1 December in District 1; from 5 December free tasting stands in five office buildings at lunchtime; gift box: oolong tea, green tea, dried fruit snacks from Da Lat; 10% discount for more than 50 boxes ordered before 10 January; contact: Linh, Marketing Assistant. Write the launch press release for journalists at business news websites in Ho Chi Minh City. Include: (1) a headline and an opening paragraph that says who, what, where and when, (2) one quote from Mr Le Quang Minh, the founder, (3) an "About Green Leaf Tea" paragraph and a media contact. Use: the present perfect for the news (has launched), the present simple for facts in the About paragraph, and direct speech ("...," said Mr Minh). Write about 150 words.',
    'FOR IMMEDIATE RELEASE\n\n' +
    'Green Leaf Tea Launches Tet Gift Boxes for Offices\n\n' +
    'Ho Chi Minh City, 1 December – Green Leaf Tea, the tea-and-snack company from Da Lat, has launched a new Tet campaign for offices in District 1. From 5 December, staff in five office buildings can try three kinds of tea at free tasting stands during lunchtime.\n\n' +
    'The new gift box contains oolong tea, green tea and dried fruit snacks from Da Lat. Companies that order more than 50 boxes before 10 January will receive a 10% discount.\n\n' +
    '"Tet is a time to thank the people you work with," said Mr Le Quang Minh, founder of Green Leaf Tea. "We want every office to share a cup of fresh Da Lat tea this year."\n\n' +
    'About Green Leaf Tea\n' +
    'Green Leaf Tea sells tea, snacks and gift boxes in shops and online across Ho Chi Minh City.\n\n' +
    'Media contact: Linh, Marketing Assistant, Green Leaf Tea',
    ['Language: uses the present perfect for the news (has launched), the present simple for facts in the About paragraph, and direct speech punctuated correctly ("...," said Mr Le Quang Minh)',
      'Task: headline, opening paragraph with who, what, where and when, a quote from the founder, an About paragraph and a contact',
      'Organisation: release line, headline, dateline and opening, details, quote, About paragraph, media contact'], 150),

  /* ---------------- RV2, Final Review (Units 6–10) — futures, conditionals, trends, passive, present perfect ---------------- */
  ...USE([
    C('RV2', 'Review, Verb + noun collocations (Units 6–10)', 'Which verb goes with each noun? Sort the nouns.', ['meet a ...', 'issue a ...', 'handle a ...'],
      [['deadline', 0], ['sales target', 0], ['press release', 1], ['statement', 1], ['complaint', 2], ['customer enquiry', 2], ['difficult customer', 2]],
      'We say "meet a deadline / a target" (reach it in time), "issue a press release / a statement" (send it out officially) and "handle a complaint / an enquiry / a difficult customer" (deal with it). Note "an enquiry": we use "an" before a vowel sound.'),
    M('RV2', 'Review, Will for promises', 'The client asks, "Can you send the draft by Friday?" Linh answers, "Sure, I ___ it on Thursday."',
      ['will send', 'sent', 'have sent', 'send'], 0,
      'We use "will" for a promise made at the moment of speaking.'),
    M('RV2', 'Review, Present continuous for arrangements', 'Complete the sentence: "We ___ the supplier in Bao Loc next Tuesday at 9 a.m.; it is in my calendar."',
      ['met', 'meet', 'have met', 'are meeting'], 3,
      'A fixed arrangement with a time and place uses the present continuous.'),
    M('RV2', 'Review, Unless', 'Complete the sentence: "___ we get approval this week, we cannot start the campaign in May."',
      ['If', 'Unless', 'Because', 'So'], 1,
      '"Unless" means "if not": if we do not get approval, we cannot start.'),
    M('RV2', 'Review, Describing trends', 'Complete the sentence: "Online sales rose ___ 15% in June, from 200 to 230 million VND."',
      ['to', 'at', 'by', 'from'], 2,
      '"Rise by" gives the size of the change (15%). "Rise to" gives the final number.'),
    M('RV2', 'Review, The passive', 'Complete the sentence: "The new price list ___ to all shops yesterday."',
      ['was sent', 'sent', 'is sending', 'has send'], 0,
      'The price list did not send itself, so we need the past passive: was + past participle.'),
    M('RV2', 'Review, Past simple or present perfect', 'Complete the reply: "We ___ your email on 3 June, and we have passed it to our delivery team."',
      ['have received', 'receive', 'received', 'are receiving'], 2,
      'A finished action at a stated past time (on 3 June) uses the past simple.'),
    M('RV2', 'Review, Word formation', 'Choose the correct form: "Please write in a more ___ style; this letter goes to the bank."',
      ['formally', 'formal', 'formality', 'form'], 1,
      'Before the noun "style" we need an adjective: formal.'),
  ]),
  ...READ('RV2-r', 'Review, Reading: A short sales report',
    'To: Mr Le Quang Minh, Founder\nFrom: Linh, Marketing Assistant\nDate: 5 July\nSubject: Cold-brew sales report, January to June\n\n' +
    'Purpose\nThis report describes cold-brew bottle sales in the first half of the year and makes one recommendation.\n\n' +
    'Findings\nSales started slowly. In January, 1,500 bottles were sold. After the product was promoted on social media in March, sales rose by 60% to 2,400 bottles. They reached a peak in May, at 4,200 bottles, when the student campaign was run at two universities. However, sales fell slightly to 3,700 in June because many students went home for the summer.\n\n' +
    'Online reviews have also improved. Since March, 85 new reviews have been posted, and most of them give the drink four or five stars. Two customers complained that the bottle was hard to open. Their emails were answered within one day.\n\n' +
    'Recommendation\nThe bottle cap should be changed before the next order is placed with the supplier. If we change it in August, customers will have the new bottle by October.',
    [
      M('RV2', 'Reading, Main idea', 'What is the main purpose of the report?',
        ['To complain about the supplier', 'To plan a new student campaign', 'To describe sales from January to June and give one recommendation', 'To answer two customer emails'], 2,
        'The "Purpose" section says it describes sales in the first half of the year and makes one recommendation.'),
      M('RV2', 'Reading, Detail', 'When did cold-brew sales reach a peak?',
        ['In May', 'In March', 'In June', 'In January'], 0,
        'The report says sales "reached a peak in May, at 4,200 bottles".'),
      M('RV2', 'Reading, Vocabulary in context', 'In the text, "After the product was promoted on social media", "promoted" means ...',
        ['made cheaper for a short time', 'moved to a different shop', 'made in a new factory', 'advertised to make people buy it'], 3,
        'The clues are "on social media" and the result in the same sentence: "sales rose by 60%". The text says nothing about a lower price, a new shop or a new factory, so "promoted" here means advertised.'),
    ]),
  ...LISTEN('RV2-l', 'Review, Listening: A phone briefing',
    'Ha: Hi Linh, it\'s Ha. Have you got a minute? It\'s about a new client, Moon River Bakery in District 7. They want to sell our gift boxes in their three shops for the Mid-Autumn Festival. ' +
    'Linh: Great news! What do they need from us? ' +
    'Ha: First, a short proposal with prices and a delivery plan. They need it by the twelfth of August, so that\'s our deadline. ' +
    'Linh: OK. I\'ll start the draft today. ' +
    'Ha: Thanks. And I\'m meeting their manager, Mr Khang, next Monday at ten. Can you come too? ' +
    'Linh: Yes, I\'m free on Monday morning. Should I prepare anything? ' +
    'Ha: Please bring the sales figures for last year\'s gift boxes. Last year we sold around two thousand boxes in September. ' +
    'Linh: No problem. I\'ll send you a follow-up email this afternoon with all the tasks and dates.',
    [
      M('RV2', 'Listening, Gist', 'What is the call mainly about?',
        ['A complaint from a customer', 'A new client and the tasks for the project', 'A problem with a delivery', 'A new flavour of tea'], 1,
        'Ha explains what Moon River Bakery wants and gives Linh tasks and a deadline.'),
      M('RV2', 'Listening, Detail', 'What is the deadline for the proposal?',
        ['Next Monday', 'This afternoon', 'September', '12 August'], 3,
        'Ha says, "They need it by the twelfth of August, so that\'s our deadline."'),
      M('RV2', 'Listening, Next step', 'What will Linh do this afternoon?',
        ['Send a follow-up email with the tasks and dates', 'Meet Mr Khang', 'Visit Moon River Bakery', 'Count last year\'s gift boxes'], 0,
        'Linh promises, "I\'ll send you a follow-up email this afternoon with all the tasks and dates."'),
    ]),
  ...SPEAK('RV2', 'Review, Speaking: Report sales figures',
    'You are Linh. Give a short spoken update to Mr Le Quang Minh about cold-brew sales from January to June (January 1,500 bottles; March 2,400 after the social media promotion; May 4,200, the peak, student campaign; June 3,700, students on holiday). Review problem: two customers said the bottle was hard to open. Recommendation: change the bottle cap in August, so customers have the new bottle by October. Describe the trend, mention the problem and give the recommendation. Use: rise by, reach a peak, fall slightly to, and one first conditional (If we ..., ... will ...). Speak for about 1 minute.',
    'Good morning, Mr Minh. I\'d like to give you a quick update on cold-brew sales. In January we sold 1,500 bottles. After our social media promotion in March, sales rose by 60% to 2,400 bottles. They reached a peak in May, at 4,200 bottles, because of the student campaign. In June they fell slightly to 3,700, because students went home for the summer. Most online reviews are very good, but two customers said the bottle was hard to open. So I recommend that we change the bottle cap. If we change it in August, customers will have the new bottle by October.',
    ['Language: uses trend language accurately in the past simple (rose by, reached a peak, fell slightly to) and one first conditional for the recommendation',
      'Task: describes the trend with the correct figures, the review problem and the recommendation from the notes',
      'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('RV2', 'Review, Writing: Reply to a complaint',
    'A customer, Ms Vo Thanh Tam, wrote to Green Leaf Tea. Her online order of two gift boxes arrived three days late, and one box was damaged. Notes: order sent from the shop on time; delayed by the delivery company because of heavy rain; damage reported to the delivery company yesterday; new gift box ready, delivered tomorrow morning; 15% discount code added to her account. Write a reply from Linh. Include: (1) thanks and an apology, (2) what happened and what was done, (3) the solution and what will happen next. Use: the passive (was sent, was delayed, has been prepared, will be delivered) and the present perfect for news (We have checked). Write about 120 words.',
    'Dear Ms Tam,\n\n' +
    'Thank you for your email, and we are very sorry that your order arrived late and that one gift box was damaged.\n\n' +
    'We have checked your order. It was sent from our shop on time, but it was delayed by our delivery company because of heavy rain. The damaged box was also reported to the delivery company yesterday.\n\n' +
    'To solve the problem, a new gift box has been prepared for you, and it will be delivered to your home tomorrow morning. We have also added a 15% discount code to your account for your next order.\n\n' +
    'Thank you for your patience. We hope you enjoy your tea.\n\n' +
    'Best regards,\nLinh\nMarketing Assistant, Green Leaf Tea',
    ['Language: uses the passive accurately at least three times (was sent, was delayed, has been prepared, will be delivered) and the present perfect for news (We have checked)',
      'Task: thanks and apologises, explains what happened, and gives the solution and next step from the notes',
      'Organisation: Dear ..., one paragraph each for apology, explanation and solution, polite closing and Best regards'], 120),

  /* ---------------- FX, Final Examination Week — exam practice across Units 1–10 ---------------- */
  ...USE([
    M('FX', 'Exam practice, Classifying (Unit 1)', 'Complete the sentence: "Our shops ___ into two groups: city-centre shops and campus shops."',
      ['divide', 'are divided', 'is divided', 'dividing'], 1,
      'The shops are divided by someone, so we use the passive; "shops" is plural, so "are".'),
    M('FX', 'Exam practice, Obligation (Unit 2)', 'Complete the sentence: "Shop managers ___ send the sales figures every Monday; it is a company rule."',
      ['have to', 'might', 'could', 'would'], 0,
      '"Have to" shows an obligation from a rule. "Might" and "could" show possibility.'),
    M('FX', 'Exam practice, Relative clauses (Unit 3)', 'Complete the sentence: "Our target customers are office workers ___ want a quick, healthy snack."',
      ['which', 'where', 'who', 'whose'], 2,
      'We use "who" for people in a defining relative clause.'),
    M('FX', 'Exam practice, Polite criticism (Unit 4)', 'A designer shows you a poster with only young people in it. Which comment is the most polite?',
      ['This advert is terrible.', 'Change the advert now.', 'Nobody likes this advert.', 'It might be better to show older customers too.'], 3,
      '"It might be better to ..." gives criticism as a soft suggestion.'),
    M('FX', 'Exam practice, Comparatives (Unit 5)', 'Complete the sentence: "Our new bottle is ___ than the old one, so it fits in a small bag."',
      ['more small', 'smaller', 'smallest', 'the most small'], 1,
      'Short adjectives add -er before "than": small, smaller.'),
    M('FX', 'Exam practice, Trends (Unit 8)', 'Complete the sentence: "Orders from the app fell ___ 2,400 ___ 1,900 in July."',
      ['from ... to', 'by ... at', 'to ... from', 'at ... by'], 0,
      '"Fall from A to B" gives the start and the end numbers.'),
    M('FX', 'Exam practice, Future passive (Unit 9)', 'Complete the letter: "The new labels ___ to your shop next Monday."',
      ['will send', 'sends', 'will be sent', 'is sending'], 2,
      'The labels do not send themselves, so we use the future passive: will be + past participle.'),
    O('FX', 'Exam practice, Order a reply to a complaint (Unit 10)', 'Put the parts of a reply to a customer complaint in the correct order.',
      ['Dear Mr Hung,',
        'Thank you for your email, and we are sorry that your tea arrived late.',
        'The delay was caused by a problem at our warehouse.',
        'A free gift box has been sent to you today, and it will arrive tomorrow.',
        'Thank you for your patience. Best regards, Linh'],
      'A complaint reply thanks and apologises first, then explains, then offers a solution, and closes politely.'),
  ]),
  ...READ('FX-r', 'Exam practice, Reading: A press release',
    'FOR IMMEDIATE RELEASE\n\n' +
    'Green Leaf Tea Opens Its Tenth Store in Ho Chi Minh City\n\n' +
    'Ho Chi Minh City, 15 September – Green Leaf Tea, the tea-and-snack company from Da Lat, has opened its tenth store. The new store opened on 12 September in Thu Duc City, near several universities and offices.\n\n' +
    'The store is larger than the other nine. It has a tasting bar where customers can try four kinds of tea before they buy. It also sells the company\'s cold-brew bottles, which became the best-selling product in May.\n\n' +
    'Since the company came to Ho Chi Minh City in 2021, it has served more than 300,000 customers. Online sales have also grown, and they now make up 35% of total sales.\n\n' +
    '"Our customers have asked us for a store in Thu Duc for a long time," said Mr Le Quang Minh, founder of Green Leaf Tea. "We are proud to bring fresh tea from Da Lat closer to them."\n\n' +
    'The first 500 customers will receive a free bottle of cold brew.\n\n' +
    'About Green Leaf Tea\nGreen Leaf Tea sells tea, snacks and gift boxes in shops and online. Its tea comes from farms in Bao Loc and Da Lat.',
    [
      M('FX', 'Reading, Main idea', 'What is the news in this press release?',
        ['Green Leaf Tea has moved to Da Lat', 'Green Leaf Tea has opened a new store in Thu Duc City', 'Green Leaf Tea has stopped online sales', 'Green Leaf Tea has changed its founder'], 1,
        'The headline and first paragraph say the company has opened its tenth store, in Thu Duc City.'),
      M('FX', 'Reading, Detail', 'What is special about the new store?',
        ['It is the smallest store', 'It only sells online', 'It is in Bao Loc', 'It has a tasting bar'], 3,
        'The text says it "has a tasting bar where customers can try four kinds of tea".'),
      M('FX', 'Reading, Vocabulary in context', 'In "they now make up 35% of total sales", "make up" means ...',
        ['are, or form', 'invent', 'decorate', 'repair'], 0,
        '"Make up" here means "form a part of": online sales are 35% of all sales.'),
    ]),
  ...LISTEN('FX-l', 'Exam practice, Listening: A short presentation',
    'Linh: Good afternoon, everyone. I\'m going to talk about our gift box sales for the last quarter. First, the overall picture. Sales rose from four thousand boxes in July to six thousand five hundred in September. That\'s an increase of more than sixty per cent. The main reason was the Mid-Autumn Festival. ' +
    'Moving on to our channels. Shops sold the most boxes, but online sales grew faster. They doubled, from eight hundred to one thousand six hundred boxes. ' +
    'However, we had a problem. About fifty boxes were damaged during delivery, so we\'ve changed our delivery company. ' +
    'Finally, my recommendation. I think we should start the Tet campaign earlier this year, in November, because customers buy gifts early. If we start in November, we\'ll reach more office workers. Thank you. I\'m happy to take questions.',
    [
      M('FX', 'Listening, Gist', 'What is the talk mainly about?',
        ['A new tea flavour', 'Hiring a new delivery driver', 'Gift box sales in the last quarter', 'The history of the company'], 2,
        'Linh says, "I\'m going to talk about our gift box sales for the last quarter."'),
      M('FX', 'Listening, Detail', 'How many boxes did online sales reach?',
        ['1,600', '800', '4,000', '6,500'], 0,
        'Online sales "doubled, from eight hundred to one thousand six hundred boxes".'),
      M('FX', 'Listening, Opinion', 'What does Linh recommend?',
        ['Closing some shops', 'Stopping online sales', 'Using the same delivery company', 'Starting the Tet campaign in November'], 3,
        'She says, "I think we should start the Tet campaign earlier this year, in November."'),
    ]),
  ...SPEAK('FX', 'Exam practice, Speaking: Brief a new intern',
    'You are a marketing assistant at Green Leaf Tea. A new intern asks you about the company. Notes: stakeholders: internal = Mr Minh, the managers, the staff; external = customers, tea farmers in Bao Loc, the local community. Target customers: students and office workers; want healthy drinks. Best seller: the cold-brew bottle; fresher and more convenient than milk tea. Advice: meet every deadline; if you need more time, tell Ms Ha early. Brief the intern. Use: is/are divided into, consists of, includes; a who-clause; a comparative; have to. Speak for about 1 minute.',
    'Welcome to Green Leaf Tea! Let me tell you a little about us. Our stakeholders are divided into two groups. The internal group consists of Mr Minh, the managers and the staff. The external group includes customers, our tea farmers in Bao Loc and the local community. Our target customers are students and office workers who want healthy drinks. Our best seller is the cold-brew bottle, because it is fresher and more convenient than milk tea. One piece of advice: you have to meet every deadline. If you need more time, tell Ms Ha early, and she will help you.',
    ['Language: uses classifying verbs accurately (are divided into, consists of, includes), a who-clause, a comparative (fresher than, more convenient than) and have to',
      'Task: covers the stakeholders, target customers, best seller with its reason, and the advice from the notes',
      'Delivery: clear, steady pace, friendly tone, understandable pronunciation']),
  ...WRITE('FX', 'Exam practice, Writing: A short proposal email',
    'Green Leaf Tea has just opened its new store in Thu Duc City, but only a few students visit it. Write an email to Ms Nguyen Thu Ha, the marketing manager, to propose a small campaign. Notes: objective: welcome 1,500 student customers by 30 September; actions: a free cup of tea for students who show a student card; 10% off the next drink for students who check in on social media; budget: about 20 million VND (free drinks, posters); expected result: the store becomes a popular meeting place, sales rise before the new school year. Include: (1) the objective, (2) the two actions, (3) the budget and the expected result. Use: "to + verb + number + by + date" for the objective and at least one if or unless sentence. Write about 130 words.',
    'Subject: Proposal for a student campaign at the Thu Duc store\n\n' +
    'Dear Ms Ha,\n\n' +
    'I am writing to propose a small campaign to bring more students to our new Thu Duc store.\n\n' +
    'Our objective is to welcome 1,500 student customers by 30 September. To do this, I suggest two actions. First, we will give a free cup of tea to students who show their student card. Second, if students check in at the store on social media, they will get 10% off their next drink.\n\n' +
    'The budget is about 20 million VND, mainly for free drinks and printed posters. If the campaign works, the store will become a popular meeting place for students, and sales will rise before the new school year.\n\n' +
    'I would be happy to discuss this at the next team meeting.\n\n' +
    'Best regards,\nLinh',
    ['Language: writes the objective in the form "to + verb + number + by + date" (to welcome 1,500 student customers by 30 September) and uses if/unless accurately (present simple in the if/unless clause, will in the main clause)',
      'Task: includes the objective, both actions, the budget and the expected result from the notes',
      'Organisation: subject line, purpose sentence (I am writing to propose ...), short paragraphs and a polite closing'], 130),
];

// [unitId, stem, options (FIRST option = correct answer; the seed shuffles them), bloom]
export const Q = [
  ['PJ1', 'Which phrase is best for politely disagreeing in a team meeting?', ['I see your point, but ...', 'You are wrong.', 'That is a bad idea.', 'No way.'], 'Remember'],
  ['PJ1', 'Choose the correct verb: "For this campaign we have ___ two objectives: 6,000 bottles and 2,000 new followers by 15 May."', ['set', 'made', 'done', 'put'], 'Remember'],
  ['PJ1', 'A classmate says: "Your actions are clear. However, the budget needs more detail." What is the classmate doing?', ['Giving balanced feedback: a strength, then a point to improve', 'Agreeing with every part of the draft', 'Asking for the budget figures', 'Refusing to read the draft'], 'Understand'],
  ['PJ1', 'What does "Let\'s divide the tasks" mean in a team meeting?', ['Let us give each person a part of the work', 'Let us cancel some tasks', 'Let us finish all tasks together today', 'Let us ask the lecturer to do the tasks'], 'Understand'],
  ['PJ1', 'Complete the proposal: "If we ___ sampling stands at two universities, we will reach about 3,000 students."', ['set up', 'will set up', 'setting up', 'to set up'], 'Apply'],
  ['PJ1', 'Which feedback on the budget is polite, specific AND gives a reason?', ['"You could add a table with the cost of each action, because at the moment we only see the total."', '"You could maybe change the budget a little."', '"The budget is wrong. Add a table with the cost of each action."', '"I really like your budget, because it is good."'], 'Analyze'],

  ['PJ2', 'Which phrase introduces the next part of a pitch?', ['Moving on to the budget, ...', 'I agree with you.', 'Thank you for listening.', 'Could you repeat that?'], 'Remember'],
  ['PJ2', 'The "About Green Leaf Tea" paragraph gives permanent facts, not news. Which sentence suits it?', ['Green Leaf Tea sells tea, snacks and gift boxes in shops and online.', 'Green Leaf Tea has launched a peach cold-brew flavour this week.', 'Green Leaf Tea is giving free samples at two universities today.', 'Green Leaf Tea will open a store in Da Nang next month.'], 'Understand'],
  ['PJ2', 'Which sentence reports the founder\'s words correctly in a press release?', ['"We are proud of our students," said Mr Minh.', '"We are proud of our students," Mr Minh said that.', '"We are proud of our students", said that Mr Minh.', 'Mr Minh said, that "we are proud of our students."'], 'Apply'],
  ['PJ2', 'Why is the present perfect used in "Green Leaf Tea has launched a new flavour"?', ['It is recent news connected to now', 'It will happen next year', 'It happened at a stated past time', 'It is a regular habit'], 'Understand'],
  ['PJ2', 'Complete the press release: "Green Leaf Tea ___ its cold-brew line to Da Nang this week."', ['has brought', 'bring', 'have brought', 'bringing'], 'Apply'],
  ['PJ2', 'A guest asks a question you cannot answer now. Which reply is the most professional?', ['"That\'s a good question. Can I check and email you this afternoon?"', '"I don\'t know."', '"That question is not important."', '"Ask someone else."'], 'Apply'],

  ['RV2', 'Which form do we use for a fixed arrangement with a time and place?', ['Present continuous', 'Past simple', 'Present perfect', 'Will for a sudden decision'], 'Remember'],
  ['RV2', 'Which word means "the latest time or date by which something must be done"?', ['deadline', 'brief', 'budget', 'target'], 'Remember'],
  ['RV2', '"Unless the client replies by Friday, we will not print the boxes." What does this mean?', ['We will print the boxes only if the client replies by Friday', 'We have already printed the boxes', 'We will print the boxes after Friday anyway', 'The client does not need any boxes'], 'Understand'],
  ['RV2', 'Why is the passive used in "The samples were sent on 3 May"?', ['The action is more important than who did it', 'The sender is the main topic', 'It describes a future plan', 'It makes the sentence less formal'], 'Understand'],
  ['RV2', 'Complete: "Sales ___ a peak of 4,200 bottles in May."', ['reached', 'rose by', 'fell from', 'increased'], 'Apply'],
  ['RV2', 'Complete the reply: "We ___ your email yesterday, and we are checking your order now."', ['received', 'have received', 'receive', 'are receiving'], 'Apply'],

  ['FX', 'Which phrase is used for classifying: "Our staff ___ three teams."', ['are divided into', 'are dividing at', 'divide in', 'is divided'], 'Remember'],
  ['FX', 'Which sentence shows that something is NOT necessary?', ["You don't have to wear a tie.", "You mustn't wear a tie.", 'You must wear a tie.', 'You have to wear a tie.'], 'Remember'],
  ['FX', 'In "Customers who buy online get free delivery", what does "who buy online" do?', ['It tells us which customers we mean', 'It adds extra, unnecessary information', 'It shows a future plan', 'It compares two groups'], 'Understand'],
  ['FX', 'Which sentence is a polite suggestion for improving an advert?', ['"It might be better to show older customers too."', '"Your advert is wrong."', '"Remove it now."', '"Nobody will buy this."'], 'Understand'],
  ['FX', 'Complete: "Cold brew is ___ drink on our summer menu."', ['the most refreshing', 'more refreshing', 'most refreshing than', 'the refreshingest'], 'Apply'],
  ['FX', 'Put the sentences of a reply in order: (a) To make up for it, a new box will arrive tomorrow. (b) Thank you for your email, and we are sorry about the delay. (c) This delay was caused by heavy rain.', ['b, c, a', 'a, c, b', 'c, b, a', 'b, a, c'], 'Analyze'],
];

// [term, Vietnamese, definition, unitId, part of speech, word family, example, collocations]
export const VOCAB = [
  ['revise', 'chỉnh sửa, sửa đổi', 'To change a piece of writing to make it better or more correct.', 'PJ1', 'verb', 'revise (v), revision (n), revised (adj)', 'We revised the proposal after the team meeting and cut the budget.', 'revise a draft, revise the budget, a revised version'],
  ['suggestion', 'đề xuất, gợi ý', 'An idea or plan that you offer for other people to think about.', 'PJ1', 'noun', 'suggest (v), suggestion (n)', 'Ms Ha made a suggestion: start the campaign at two universities first.', 'make a suggestion, a useful suggestion, accept a suggestion'],
  ['agree on', 'thống nhất về', 'To decide something together after a discussion.', 'PJ1', 'phrasal verb', 'agree (v), agreement (n), agreed (adj)', 'The team agreed on a start date of 15 April.', 'agree on a date, agree on the budget, agree on a plan'],
  ['headline', 'tiêu đề', 'The title of a news story or press release, in short words.', 'PJ2', 'noun', 'headline (n), headline (v)', 'The headline of our press release was "Green Leaf Tea Brings Free Cold Brew to Students".', 'write a headline, a strong headline, make headlines'],
  ['quote', 'trích dẫn', 'The exact words that someone said, used in a press release or article.', 'PJ2', 'noun', 'quote (n), quote (v), quotation (n)', 'The press release includes a quote from Mr Le Quang Minh, the founder.', 'include a quote, a short quote, quote from the founder'],
];

export const GRAMMAR = [];

// [id, type, unitId, title, minutes, body]
export const LIB = [
  ['R-MKD-01', 'activity', 'PJ1', 'Feedback carousel', 30,
    'Each team puts its draft proposal on a table. Step 1: teams move to the next table and read the draft for five minutes. Step 2: they write one strength, one point to improve and one suggestion on sticky notes, using the phrases "I really like ...", "However, ..." and "You could ...". Step 3: teams rotate twice more. Step 4: each team returns to its own draft, reads the notes and tells the class, in English, which two changes they will make and why. The lecturer listens for polite, balanced feedback.'],
  ['R-MKD-02', 'group_project', 'PJ1', 'Draft the campaign proposal', 60,
    'In teams of four, write the first draft of a campaign proposal for Green Leaf Tea. Choose one product (cold-brew bottles, Tet gift boxes or snacks) and one customer group. Divide the tasks: one person writes the background, one the objectives, one the actions and timeline, and one the budget and expected results. Use the first conditional and "unless" at least twice. Join the parts into one document of about 400 words. Before you submit it, do a language check: every objective follows the pattern "to + verb + number + by + date"; every if/unless clause uses the present simple and every main clause uses will; linking words (however, therefore, to do this) join the sections. Submit it for peer feedback next week. Target language: objective sentences, first conditional with if and unless, linking words.'],
  ['R-MKD-03', 'activity', 'PJ2', 'Pitch and questions rehearsal', 40,
    'Teams rehearse their two-minute pitch. Step 1: one student plays Mr Minh, the founder, and prepares two questions. Step 2: the team gives the pitch using signposting (First, Moving on to, Finally) and ends with "Are there any questions?". Step 3: "Mr Minh" asks the questions; the team answers with "That\'s a good question" and a clear reply, or promises to check and follow up. Step 4: another team times the pitch and gives one piece of feedback on clarity and one on delivery. Then roles change.'],
  ['R-MKD-04', 'worksheet', 'PJ2', 'Press release builder', 30,
    'Students get a cut-up press release about a new Green Leaf Tea campaign. First, they put the parts in order: release line, headline, dateline and opening paragraph, details, quote, About paragraph and media contact. Second, they underline every verb in the present perfect and the past simple, and explain the difference. Third, they rewrite a weak headline in eight words or fewer. Finally, they write a new opening paragraph for their own team\'s campaign that answers who, what, where and when.'],
  ['R-MKD-05', 'activity', 'RV2', 'Briefing chain', 30,
    'Work in groups of three. Student A is Ms Ha and reads a short client brief card (client, product, deadline, meeting time). Step 1: A briefs B in English for one minute; B takes notes. Step 2: B briefs C using only the notes, with will for promises and the present continuous for arrangements. Step 3: C writes the tasks and dates on the board. Step 4: the group compares the board with the original card and finds any lost or wrong details. Change roles with a new card.'],
  ['R-MKD-06', 'worksheet', 'RV2', 'Units 6–10 language clinic', 40,
    'A one-page worksheet with five short sections, one for each unit. Section 1: choose will, be going to or the present continuous. Section 2: complete if and unless sentences about a campaign. Section 3: describe a simple sales chart with rise by, fall to and reach a peak. Section 4: change active sentences in a business letter into the passive. Section 5: choose the past simple or present perfect in a reply to a customer review. Students check answers in pairs and note their two weakest areas for revision.'],
  ['R-MKD-07', 'activity', 'FX', 'Mock speaking exam', 30,
    'Students work in pairs as candidate and examiner. Step 1: the candidate draws a task card (brief a new intern, report sales figures, give feedback on an advert, or pitch a product). Step 2: the candidate has one minute to plan and then speaks for about one minute. Step 3: the examiner uses the three marking points, language first (the target forms on the card, then task, then delivery), and gives one correct sentence the candidate said and one sentence to correct. Step 4: partners swap roles with a new card. The lecturer moves around the room and notes common errors for whole-class feedback.'],
  ['R-MKD-08', 'practical', 'FX', 'Timed writing practice', 45,
    'Under exam conditions, students write one short text in 25 minutes: a reply to a complaint, a short proposal email or a press release. They first spend five minutes planning the parts of the genre. After writing, they use a checklist to edit their own work: clear purpose, suitable opening and closing, correct tenses, at least three unit words, and the right word count. Finally, they swap texts with a partner, underline one strong sentence and circle one error, and discuss it.'],
];

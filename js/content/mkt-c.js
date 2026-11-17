// English for Marketing Communication (ESP, CEFR B1–B1+), part C: MID, MK8, MK9, MK10.
// Running case: Green Leaf Tea (Trà Lá Xanh). Every item tests English; marketing is the context.
import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';

// [unitId, stem, options (FIRST option = correct answer; the seed shuffles them), bloom]
export const Q = [
  // MID
  ['MID', 'Choose the correct verb: "Our internal stakeholders ___ owners, managers and staff."', ['include', 'includes', 'are including', 'included of'], 'Remember'],
  ['MID', 'Which word completes the sentence? "Linh is the assistant ___ writes our social media posts."', ['who', 'which', 'where', 'what'], 'Remember'],
  ['MID', 'Which sentence is a polite suggestion about an advert?', ['It might be better to show customers of different ages.', 'This advert is wrong and you must change it.', 'Change the picture now.', 'Nobody will like this advert.'], 'Understand'],
  ['MID', 'What does "We must pay suppliers within 30 days" mean?', ['Paying within 30 days is a rule or strong duty.', 'Paying within 30 days is only an idea.', 'The company paid suppliers last month.', 'Suppliers must pay the company.'], 'Understand'],
  ['MID', 'Complete the sentence: "If we ___ free samples in District 1, more students will try the drink."', ['give', 'will give', 'gave', 'giving'], 'Apply'],
  ['MID', 'Complete the sentence: "Don\'t worry, I ___ the price list to the client this afternoon."', ['will send', 'sent', 'send', 'was sending'], 'Apply'],
  // MK8
  ['MK8', 'Which phrase introduces the next part of a presentation?', ['Now let\'s move on to the results.', 'Thank you for listening.', 'Good morning, everyone.', 'Any questions?'], 'Remember'],
  ['MK8', 'Choose the correct preposition: "Online sales rose ___ 20% in March."', ['by', 'at', 'on', 'for'], 'Remember'],
  ['MK8', 'What does "Visits fell from 5,000 to 3,800" tell us?', ['The number of visits went down by 1,200.', 'The number of visits went up to 5,000.', 'The number of visits stayed the same.', 'There were 3,800 more visits.'], 'Understand'],
  ['MK8', 'What does "reach a peak" mean in a sales chart?', ['To arrive at the highest point', 'To fall to the lowest point', 'To stay level', 'To start again'], 'Understand'],
  ['MK8', 'Complete the sentence: "Gift box sales increased ___ 400 ___ 650 boxes in January."', ['from, to', 'by, at', 'to, from', 'at, by'], 'Apply'],
  ['MK8', 'Sales were 2,000 bottles in May and 2,500 in June. Which sentence is correct?', ['Sales rose by 25% in June.', 'Sales fell by 500 bottles in June.', 'Sales rose to 2,000 bottles in June.', 'Sales reached a peak in May.'], 'Analyze'],
  // MK9
  ['MK9', 'Which sentence is in the passive voice?', ['The samples were sent on 3 May.', 'We sent the samples on 3 May.', 'Linh is sending the samples.', 'Mr Tran sends samples every month.'], 'Remember'],
  ['MK9', 'Which closing goes with "Dear Mr Tran," in a formal letter?', ['Yours sincerely,', 'Love,', 'See you!', 'Cheers,'], 'Remember'],
  ['MK9', 'Why do business reports often use the passive?', ['Because the action is more important than the person who did it', 'Because the passive is always shorter', 'Because the active voice is wrong in reports', 'Because the reader is a friend'], 'Understand'],
  ['MK9', 'Read the extract: "To: All staff / Subject: Break room / From Monday, the break room will be closed at 6 p.m." Which phrase shows most clearly that this is an internal memo?', ['"To: All staff"', '"From Monday"', '"the break room"', '"at 6 p.m."'], 'Understand'],
  ['MK9', 'Complete the sentence: "Your order ___ within two days."', ['will be delivered', 'will deliver', 'is delivering', 'delivered'], 'Apply'],
  ['MK9', 'Make the sentence passive: "The team checked every bottle."', ['Every bottle was checked by the team.', 'Every bottle checked the team.', 'Every bottle is checking by the team.', 'The team was checked by every bottle.'], 'Apply'],
  // MK10
  ['MK10', 'Choose the correct form: "We ___ your email about the late delivery."', ['have received', 'have receive', 'are receiving', 'had receive'], 'Remember'],
  ['MK10', 'Which time phrase goes with the past simple?', ['on 2 June', 'already', 'ever', 'so far'], 'Remember'],
  ['MK10', 'Which sentence is the most polite opening for a reply to a customer complaint?', ['Thank you for letting us know about the broken bottle.', 'We got your complaint about the bottle.', 'You say that one bottle was broken.', 'About your broken bottle: please read below.'], 'Understand'],
  ['MK10', 'Why does a press release say "Green Leaf Tea has opened its tenth store"?', ['The news is recent and important now.', 'The store closed a long time ago.', 'The store will open next year.', 'The writer does not know when it happened.'], 'Understand'],
  ['MK10', 'Complete the sentence: "The new store ___ on 12 September."', ['opened', 'has opened', 'has open', 'opens yesterday'], 'Apply'],
  ['MK10', 'Find the error: "We have sent the replacement box last Monday."', ['"have sent" should be "sent" because of "last Monday"', '"replacement" should be "replace"', '"last Monday" should be "on last Monday"', 'There is no error.'], 'Analyze'],
];

// [term, Vietnamese, definition, unitId, part of speech, word family, example sentence, collocations]
export const VOCAB = [
  // MK8
  ['signpost', 'từ/cụm từ chuyển ý', 'A word or phrase that tells the audience which part of a talk comes next.', 'MK8', 'n', 'signpost (n), signpost (v), signposting (n)', 'Linh used clear signposts such as "Next, let\'s look at the budget."', 'use signposts, clear signposting, signpost a change'],
  ['trend', 'xu hướng', 'The general direction in which something is changing over time.', 'MK8', 'n', 'trend (n), trend (v), trendy (adj)', 'The chart shows an upward trend in cold-brew sales in Ho Chi Minh City.', 'upward trend, downward trend, follow a trend'],
  ['figure', 'số liệu', 'A number, especially in a report or chart.', 'MK8', 'n', 'figure (n), figure (v)', 'Ms Ha checked every figure before the presentation.', 'sales figures, latest figures, the figure rose'],
  ['increase', 'tăng', 'To become larger in number or amount.', 'MK8', 'v', 'increase (v), increase (n), increasing (adj)', 'Online orders increased to 1,200 in March.', 'increase by, increase to, a sharp increase'],
  ['decline', 'giảm', 'To become smaller or lower; a fall.', 'MK8', 'v', 'decline (v), decline (n), declining (adj)', 'Visits to the old website declined after the new app launched.', 'decline slightly, a steady decline, decline in sales'],
  ['peak', 'đỉnh, mức cao nhất', 'The highest point or level of something.', 'MK8', 'n', 'peak (n), peak (v), peak (adj)', 'Gift box sales reached a peak just before Tet.', 'reach a peak, peak season, peak at'],
  ['audience', 'khán giả, người nghe', 'The group of people who listen to a talk or see an advert.', 'MK8', 'n', 'audience (n)', 'The audience asked Linh three questions about the budget.', 'target audience, engage the audience, address the audience'],
  // MK9
  ['enclose', 'gửi kèm', 'To put something in the same envelope or email as a letter.', 'MK9', 'v', 'enclose (v), enclosure (n), enclosed (adj)', 'Please find enclosed our new price list for the cold-brew bottles.', 'please find enclosed, enclose a copy, enclosed document'],
  ['shipment', 'lô hàng', 'A group of goods that are sent together.', 'MK9', 'n', 'ship (v), shipment (n), shipping (n)', 'The shipment of oolong from Bao Loc arrived two days late.', 'a shipment of, send a shipment, delay a shipment'],
  ['formal', 'trang trọng', 'Serious and polite, used in official situations.', 'MK9', 'adj', 'formal (adj), formally (adv), formality (n)', 'A letter to a new supplier should be formal and concise.', 'formal letter, formal tone, formal language'],
  ['concise', 'ngắn gọn, súc tích', 'Short and clear, with no extra words.', 'MK9', 'adj', 'concise (adj), concisely (adv), conciseness (n)', 'Linh wrote a concise report of only one page.', 'concise report, clear and concise, keep it concise'],
  ['recommendation', 'kiến nghị, đề xuất', 'An idea about what someone should do, usually at the end of a report.', 'MK9', 'n', 'recommend (v), recommendation (n), recommended (adj)', 'The report ends with two recommendations for the summer campaign.', 'make a recommendation, main recommendation, follow a recommendation'],
  ['findings', 'kết quả khảo sát', 'The information that people discover from research or a survey.', 'MK9', 'n', 'find (v), findings (n)', 'The findings show that students prefer smaller bottles.', 'key findings, report the findings, survey findings'],
  // MK10
  ['complaint', 'lời phàn nàn, khiếu nại', 'A message saying that a customer is not happy with a product or service.', 'MK10', 'n', 'complain (v), complaint (n)', 'Green Leaf Tea answers every complaint within 24 hours.', 'make a complaint, handle a complaint, reply to a complaint'],
  ['apologise', 'xin lỗi', 'To say that you are sorry about something.', 'MK10', 'v', 'apologise (v), apology (n), apologetic (adj)', 'We apologise for the late delivery of your gift box.', 'apologise for, sincerely apologise, offer an apology'],
  ['refund', 'hoàn tiền', 'Money that is given back to a customer.', 'MK10', 'n', 'refund (n), refund (v), refundable (adj)', 'The customer received a full refund for the broken bottle.', 'full refund, ask for a refund, give a refund'],
  ['replacement', 'sản phẩm thay thế', 'A new item that is sent instead of a damaged or wrong one.', 'MK10', 'n', 'replace (v), replacement (n)', 'We have sent a replacement box by express delivery.', 'send a replacement, free replacement, replacement product'],
  ['review', 'đánh giá', 'A short opinion that a customer writes online about a product or shop.', 'MK10', 'n', 'review (n), review (v), reviewer (n)', 'The new store has received over 200 five-star reviews.', 'online review, positive review, write a review'],
  ['press release', 'thông cáo báo chí', 'A short official text that a company sends to journalists to share news.', 'MK10', 'n', 'press release (n), release (v)', 'Linh wrote a press release about the cold-brew launch.', 'issue a press release, send a press release, draft a press release'],
];

// [id, unitId, name, vietnameseName, form, use, useVi, examples (3), watchOut]
export const GRAMMAR = [
  ['G-MK8', 'MK8', 'Describing figures and trends', 'Mô tả số liệu và xu hướng',
    'rise, increase, grow, fall, drop, decline + by (the change), to (the new figure), from ... to ..., reach a peak (at), stay the same',
    'Use these verbs to describe how numbers change on a chart. "By" gives the size of the change; "to" gives the final number; "from ... to" gives the start and end.',
    'Dùng các động từ này để mô tả sự thay đổi của số liệu trên biểu đồ. "By" chỉ mức thay đổi, "to" chỉ con số cuối cùng, "from ... to" chỉ điểm đầu và điểm cuối.',
    ['Online sales rose by 20% in March.', 'Visits fell from 5,000 to 3,800.', 'Gift box sales reached a peak in January.'],
    'Do not mix "by" and "to": "rose by 500" is the change, "rose to 500" is the new total. Use the past simple for past data (rose, fell), not "rised" or "falled".'],
  ['G-MK9', 'MK9', 'The passive voice in formal writing', 'Câu bị động trong văn viết trang trọng',
    'be (am, is, are, was, were, will be) + past participle, optional by + agent',
    'Use the passive when the action or the object is more important than the person who did it. It makes letters, memos and reports sound formal and neutral.',
    'Dùng câu bị động khi hành động hoặc sự vật quan trọng hơn người thực hiện. Câu bị động giúp thư, bản ghi nhớ và báo cáo trang trọng, khách quan hơn.',
    ['The samples were sent on 3 May.', 'Your order will be delivered within two days.', 'All bottles are checked before they leave the factory.'],
    'Always use "be" with the past participle: "The order was delivered", not "The order delivered". Only add "by ..." when the agent is useful information.'],
  ['G-MK10', 'MK10', 'Present perfect and past simple', 'Thì hiện tại hoàn thành và quá khứ đơn',
    'present perfect: have, has + past participle; past simple: verb + -ed or irregular past form',
    'Use the present perfect for recent news or results that matter now, with no exact time. Use the past simple when you give a finished time (yesterday, on 2 June, last week).',
    'Dùng hiện tại hoàn thành cho tin mới hoặc kết quả còn liên quan đến hiện tại, không nêu thời gian cụ thể. Dùng quá khứ đơn khi có thời gian cụ thể đã kết thúc.',
    ['We have received your email.', 'Green Leaf Tea has opened its tenth store.', 'The store opened on 12 September.'],
    'Never use the present perfect with a finished time: say "We sent it last Monday", not "We have sent it last Monday".'],
];

// [id, type, unitId, title, minutes, body]
export const LIB = [
  ['R-MKC-1', 'activity', 'MID', 'Speaking practice, Mock oral exam in threes', 30,
    'Target language: is divided into / consists of / includes; must, have to, don\'t have to; who/which clauses; comparatives; "It might be better to ...". Work in groups of three: candidate, examiner and observer. 1. The examiner reads one task card with notes (describe a customer group using who-clauses and comparatives, explain three company rules using must / have to / don\'t have to, or suggest a fairer advert using "It might be better to ..."). 2. The candidate has one minute to plan and one minute to speak. 3. The observer ticks each target form on the card when the candidate uses it correctly and writes down one sentence with an error. 4. The observer reads out one correct sentence and the sentence with the error; the group corrects it together. 5. Change roles and repeat with a new card until everyone has been the candidate. Finish by sharing one corrected sentence with the class.'],
  ['R-MKC-2', 'worksheet', 'MID', 'Worksheet, Error hunt from Units 1 to 7', 25,
    'Read twelve short sentences from a draft Green Leaf Tea email. Each sentence has one mistake from Units 1 to 7: present simple for classifying, must and have to, relative clauses, polite suggestions, comparatives, future forms or first conditionals. Underline the mistake, write the correct form and name the grammar point. Then compare with a partner and agree on the answers. Finally, rewrite the email as one clear paragraph of about 80 words, using at least four of the corrected sentences.'],
  ['R-MKC-3', 'activity', 'MK8', 'Speaking task, Describe the chart', 30,
    'Pairs get two different charts about Green Leaf Tea sales (cold-brew bottles and gift boxes, January to June). 1. Student A describes the chart in about one minute, using rise by, fall from ... to, and reach a peak. 2. Student B draws the chart from the description without looking at it. 3. Compare the two charts and find any differences. 4. Change roles. 5. Together, prepare a 30-second conclusion for a presentation slide and present it to another pair, using one signpost to introduce it.'],
  ['R-MKC-4', 'practical', 'MK8', 'Practical, Five-minute proposal presentation', 60,
    'In teams of three, turn your campaign proposal from Unit 7 into a five-minute presentation with five slides: title, objectives, actions, budget and results, conclusion. Each slide has no more than 20 words and one chart or picture. Plan who presents each part and write the signposts you will use between speakers. Practise once with a timer. Present to the class; the audience ticks each signpost they hear (Let\'s start with, Now let\'s turn to, To sum up) and notes one trend sentence (rise by, fall to, reach a peak) that was correct or needs correcting. Finish with a two-minute question time. Target language: signposts and trend language from Unit 8.'],
  ['R-MKC-5', 'activity', 'MK9', 'Speaking task, Spot the format phrases', 25,
    'Target language: memo lines (To: / From: / Subject:), letter phrases (Dear ..., Please find enclosed, Yours sincerely), report phrases (Findings, It is recommended that ...) and the impersonal passive. In pairs, read six short extracts from Green Leaf Tea texts with the format names removed. 1. Underline the phrases that show the format of each extract, for example "To: All shop staff" or "It is recommended that ...". 2. Tell your partner which phrase helped you, for example "\'To: All staff\' shows it is a memo." 3. Each extract also has one informal sentence (for example "We\'ll send the new boxes next week"); rewrite it in the formal passive ("The new boxes will be sent next week"). 4. Join another pair, compare your rewritten sentences and correct any passive forms.'],
  ['R-MKC-6', 'worksheet', 'MK9', 'Worksheet, From active to formal passive', 30,
    'Part A: Rewrite ten active sentences from Linh\'s notes in the passive, for example "We checked the samples" becomes "The samples were checked". Decide if the agent ("by ...") is needed. Part B: Read a short, informal email to a supplier. Underline five phrases that are too informal and replace them with formal ones (for example "Please find enclosed"). Part C: Use your sentences from Parts A and B to write a concise four-paragraph letter of about 120 words to Mr Tran about a late shipment.'],
  ['R-MKC-7', 'activity', 'MK10', 'Speaking task, Phone call with an unhappy customer', 25,
    'Role-play in pairs. Student A is a Green Leaf Tea customer whose gift box arrived with a broken bottle. Student B is a customer service assistant. 1. Student A explains the problem and says what they want. 2. Student B thanks the customer, apologises, explains what has happened and offers a solution (replacement or refund). 3. Both agree on the next step and the date. Use the present perfect for news ("We have checked your order") and the past simple for finished times. Change roles with a new problem card.'],
  ['R-MKC-8', 'group_project', 'MK10', 'Group project, News page for the cold-brew launch', 90,
    'In teams of four, create a one-page online news section for Green Leaf Tea. It must include: a short press release (about 120 words) about the cold-brew launch, two invented customer reviews (one positive, one negative), and a polite reply to the negative review. Divide the writing, then edit each other\'s texts for the present perfect and past simple. Check that the press release has a headline, place and date, key facts, a quote punctuated correctly ("...," said ...) and contact details. Display the pages; other teams find and correct any tense errors, and the page with the fewest errors wins. Target language: present perfect for news, past simple with dates, direct speech, apologies and offers in the reply.'],
];

export const EXTRA = [
  /* ---------------- MID, Midterm Week: Review of Units 1–7 ---------------- */
  ...USE([
    C('MID', 'Exam practice, Include or includes?', 'Sort the sentences about Green Leaf Tea\'s stakeholders by the verb that completes them.', ['include', 'includes'],
      [['Our internal stakeholders ___ the founder and the shop staff.', 0], ['The internal group ___ the founder, the managers and the staff.', 1], ['External stakeholders ___ customers, suppliers and the bank.', 0], ['The external group ___ our tea suppliers in Bao Loc.', 1], ['Both groups ___ people who are affected by our decisions.', 0], ['The list of external stakeholders ___ the local community.', 1], ['Our stakeholder map ___ people who work inside and outside the company.', 1]],
      'Look at the subject. Plural subjects (stakeholders, both groups) take "include"; singular subjects (the group, the map, the list) take "includes". In "The list of external stakeholders", the subject is "list", so the verb is singular.'),
    M('MID', 'Exam practice, Present simple for classifying', 'Complete the sentence: "Our range ___ three products: loose tea, gift boxes and cold-brew bottles."',
      ['is consisting', 'consists of', 'consist', 'is divided'], 1,
      'For facts and classifying we use the present simple; with a singular subject we say "consists of".'),
    M('MID', 'Exam practice, Must and have to', 'Choose the best verb: "Staff ___ wear a name badge in the store. It is a company rule."',
      ['have to', 'might', 'could', 'would like to'], 0,
      '"Have to" shows a rule or duty. "Might" and "could" show possibility, not obligation.'),
    M('MID', 'Exam practice, Relative clauses', 'Complete the sentence: "We sell a cold-brew bottle ___ fits easily in a school bag."',
      ['who', 'where', 'which', 'whose'], 2,
      'We use "which" (or "that") for things. "Who" is for people.'),
    M('MID', 'Exam practice, Polite suggestions', 'Which comment gives polite feedback on a draft advert?',
      ['This advert is terrible.', 'You must remove the picture.', 'Nobody will buy this.', 'It might be better to show both men and women.'], 3,
      '"It might be better to ..." softens the criticism and gives a helpful suggestion.'),
    M('MID', 'Exam practice, Comparatives', 'Complete the sentence: "Our jasmine tea is ___ than the oolong: only 20,000 VND a cup."',
      ['cheaper', 'more cheap', 'cheapest', 'the cheaper'], 0,
      'Short adjectives add -er before "than": cheap becomes cheaper.'),
    M('MID', 'Exam practice, Future forms', 'Choose the best form: "We ___ the client on Monday at 10 a.m. It is in the calendar."',
      ['meeting', 'meet', 'are meeting', 'met'], 2,
      'The present continuous is used for a fixed arrangement with a time and place.'),
    M('MID', 'Exam practice, First conditional', 'Complete the sentence: "Unless we reduce the budget, the plan ___ approved."',
      ['is not', 'will not be', 'would not be', 'was not'], 1,
      'In a first conditional, the main clause uses "will" + verb; "unless" means "if ... not".'),
  ]),
  ...READ('MID-r', 'Exam practice, Reading, A memo about the summer plan',
    `To: All marketing staff
From: Nguyen Thu Ha, Marketing Manager
Date: 10 April
Subject: Summer campaign for cold-brew bottles

Our company consists of two sales channels: our nine shops in Ho Chi Minh City and our online store. This summer we want to grow both channels with the new cold-brew bottles.

Our main target customers are students who study near District 3 and young office workers who want a healthy drink after lunch. Cold-brew tea is lighter and less sweet than most bottled drinks, and it is cheaper than coffee from a cafe.

Here is the plan. We are meeting the design agency on Thursday to see the new labels. Linh will write the social media posts. If we give free samples at two universities in May, more students will try the drink before the hot season.

Some rules for the campaign: all staff must check the date on every bottle before a sale, and shop managers have to send weekly sales figures every Monday.

I also think we should make our adverts more inclusive. It might be better to show customers of different ages, not only students.

Thank you,
Ha`,
    [
      M('MID', 'Main idea', 'What is the main purpose of the memo?',
        ['To complain about the design agency', 'To explain the plan and rules for the summer cold-brew campaign', 'To announce a new shop in District 3', 'To ask staff to stop selling online'], 1,
        'The subject line and most paragraphs describe the summer campaign: customers, actions and rules.'),
      M('MID', 'Detail', 'What do shop managers have to do every Monday?',
        ['Give free samples', 'Meet the design agency', 'Write social media posts', 'Send weekly sales figures'], 3,
        'The memo says "shop managers have to send weekly sales figures every Monday".'),
      M('MID', 'Vocabulary in context', 'In the memo, "inclusive" adverts are adverts that ___.',
        ['show many different kinds of people', 'are very cheap to make', 'only show students', 'include a discount'], 0,
        'The next sentence explains it: showing customers of different ages, not only students.'),
    ]),
  ...LISTEN('MID-l', 'Exam practice, Listening, A quick phone briefing',
    `Hi Linh, it's Minh. Sorry to call so early. I've just finished talking with Mr Tran at the tea farm in Bao Loc. Good news: he can send us four hundred kilos of oolong next week, so we'll have enough for the Tet gift boxes. Bad news: the price is going up by five per cent. I think that's OK, because our gift boxes are still cheaper than most other brands. Now, can you help me with two things? First, please update the price list and send it to Ms Ha before Wednesday. Second, we're meeting the bank on Friday at two o'clock, and I'd like you to come and take notes. If the bank agrees to the loan, we'll open the new shop in Thu Duc on the twelfth of September. Oh, and one more thing. Please don't post anything about the new price online yet. We should tell our shop staff first. Thanks, Linh. Talk later.`,
    [
      M('MID', 'Gist', 'Why does Mr Minh call Linh?',
        ['To cancel the Tet gift boxes', 'To give her news from the supplier and ask her to do some tasks', 'To ask her to visit the tea farm', 'To tell her about a customer complaint'], 1,
        'He shares news from Mr Tran and then gives Linh two tasks.'),
      M('MID', 'Detail', 'When is the meeting with the bank?',
        ['On Wednesday morning', 'Next week', 'On 12 September', 'On Friday at two o\'clock'], 3,
        'Mr Minh says "we\'re meeting the bank on Friday at two o\'clock".'),
      M('MID', 'Next step', 'What does Mr Minh want to happen before anything is posted online?',
        ['The shop staff hear about the new price first.', 'The bank agrees to the loan.', 'Mr Tran sends the oolong.', 'The Thu Duc shop opens.'], 0,
        'He says "We should tell our shop staff first."'),
    ]),
  ...SPEAK('MID', 'Exam practice, Speaking, Describe a customer group',
    'You are a marketing assistant at Green Leaf Tea. Your manager asks you to describe one customer group for the cold-brew bottles. Notes: young office workers in District 1, aged 23–30; buy a drink after lunch; want something healthy and quick; busy, often order online; more money than students, so quality matters more than price. Students: prefer cheap drinks and discounts. Advert idea: show a real office, not a beach; also show some older workers. Describe the office workers, compare them with students and make the advert suggestion politely. Use: a relative clause with who or which, at least two comparatives (busier than, more ... than) and "It might be better to ...". Speak for about 1 minute.',
    `I'd like to talk about young office workers who work in District 1. They are usually between 23 and 30 years old, and they buy a drink after lunch. They want something which is healthy and quick. They are busier than students, so they often order online. They also have more money, so price is less important for them than quality. Students, on the other hand, prefer cheaper drinks and big discounts. For this group, I think it might be better to show a real office in our advert, not a beach. We could also show some older workers, so the advert is more inclusive. Thank you.`,
    ['Language: uses a who/which relative clause, at least two comparatives (busier than, more ... than) and "It might be better to ..." accurately',
      'Task: describes the office workers from the notes, compares them with students and gives one polite suggestion',
      'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MID', 'Exam practice, Writing, A follow-up email after a meeting',
    'You are Linh, the marketing assistant at Green Leaf Tea. This morning you met Ms Ha to plan a Tet gift box campaign. Notes: plan: sell 1,000 gift boxes in shops and online, 1–25 January; your tasks: finish the box design with the agency by 5 December, send the social media plan on Friday; your idea: free delivery for orders of three boxes or more, starting in mid-December. Write an email to Ms Ha to (1) thank her and summarise the plan, (2) confirm your two tasks and their deadlines, and (3) suggest the idea. Use: going to or the present continuous for the plan, will for your promises, one first conditional (If we ..., ... will ...) and "It might be better to ...". Write 100–120 words.',
    `Dear Ms Ha,

Thank you for the meeting this morning. Here is a short summary of our plan. We are going to sell 1,000 Tet gift boxes in our shops and online from 1 to 25 January.

I will finish the new box design with the agency by 5 December. I will also send you the social media plan on Friday.

I have one suggestion. If we offer free delivery for orders of three boxes or more, companies will buy more boxes for their staff. It might be better to start this offer early, in mid-December, because many companies plan their gifts then.

Please let me know if you agree.

Best regards,
Linh`,
    ['Language: uses going to for the plan, will for promises, a first conditional (If + present simple, will + verb) and "It might be better to ..." accurately',
      'Task: thanks Ms Ha, summarises the plan, confirms both tasks with their deadlines and gives the suggestion from the notes',
      'Organisation: email layout with a greeting, one short paragraph for each point and a polite closing'], 110),

  /* ---------------- MK8, Presenting the Proposal — describing figures and trends ---------------- */
  ...USE([
    C('MK8', 'Vocabulary, Up, down or highest?', 'Sort the words by the movement they describe.', ['Go up', 'Go down', 'Highest point'],
      [['rise', 0], ['increase', 0], ['grow', 0], ['fall', 1], ['decline', 1], ['drop', 1], ['reach a peak', 2]],
      'Rise, increase and grow show an upward movement; fall, decline and drop show a downward one; "reach a peak" means arrive at the highest point.'),
    M('MK8', 'Vocabulary, Signposting', 'Choose the best phrase to start a new part of the talk: "___ the budget for the summer campaign."',
      ['Thank you for', 'Now let\'s turn to', 'In my opinion', 'Any questions about'], 1,
      '"Now let\'s turn to ..." is a signpost: it tells the audience that a new section is starting.'),
    M('MK8', 'Language focus, By or to?', 'Complete the sentence: "Online sales rose ___ 20% in March, from 1,000 to 1,200 orders."',
      ['to', 'at', 'by', 'on'], 2,
      '"By" gives the size of the change (20%). "To" would give the new total.'),
    M('MK8', 'Language focus, From ... to', 'Complete the sentence: "Visits to our website fell ___ 5,000 ___ 3,800 in April."',
      ['from, to', 'by, at', 'to, from', 'on, by'], 0,
      'We use "from" for the starting figure and "to" for the final figure.'),
    M('MK8', 'Language focus, Past forms of trend verbs', 'Complete the sentence: "Gift box sales ___ a peak of 900 boxes in January."',
      ['reach', 'reaching', 'have reach', 'reached'], 3,
      'The data is about a finished month, so we use the past simple: reached.'),
    O('MK8', 'Genre, Order a short presentation', 'Put the parts of Linh\'s presentation in the correct order.',
      ['Good morning, everyone. Today I\'m going to present our summer cold-brew proposal.',
        'I\'ll talk about three things: our objectives, our results so far and our plan.',
        'Let\'s start with the results. As you can see, sales rose by 30% in May.',
        'Now let\'s turn to the plan. We want to give free samples at two universities.',
        'To sum up, the campaign is low-cost and sales are already growing.',
        'Thank you for listening. Are there any questions?'],
      'A presentation opens with a greeting and topic, gives an outline, moves through the main parts with signposts, sums up and then invites questions.'),
  ]),
  ...READ('MK8-r', 'Reading, Linh\'s presentation script',
    `Good morning, everyone. My name is Linh, and today I'm going to present our proposal for the cold-brew summer campaign.

I'll talk about three things. First, our sales so far. Second, the problem we found. Finally, our plan for June and July.

Let's start with sales. As you can see on this slide, cold-brew sales grew quickly this spring. In March we sold 2,400 bottles. Sales rose by 25% in April, to 3,000 bottles, and they reached a peak of 4,200 bottles in May, when we gave free samples at two universities.

Now let's turn to the problem. Our online shop is popular, but visits fell from 6,000 in April to 4,500 in May. We think this is because our social media posts were not regular.

So, what do we suggest? We want to post every day and run a lunch-time offer for office workers. The budget is 40 million VND. If we do this, we expect online visits to increase to 7,000 a month by July.

To sum up, sales are strong, but we need to bring customers back online. Thank you for listening. I'm happy to answer any questions.`,
    [
      M('MK8', 'Main idea', 'What is the main purpose of Linh\'s talk?',
        ['To present sales results and a plan for the summer campaign', 'To explain why cold-brew sales fell in May', 'To ask for a bigger budget for the spring campaign', 'To announce that the online shop will close in July'], 0,
        'Linh says "today I\'m going to present our proposal" and lists sales, a problem and a plan. Sales reached a peak in May (they did not fall), the budget is for June and July, and the online shop is not closing.'),
      M('MK8', 'Detail', 'How many bottles were sold in April?',
        ['2,400', '4,200', '3,000', '4,500'], 2,
        'Sales rose by 25% in April, to 3,000 bottles.'),
      M('MK8', 'Vocabulary in context', 'In the text, "reached a peak" means sales ___.',
        ['stopped at a very low level', 'went down a little in May', 'stayed at the same level', 'arrived at their highest point'], 3,
        'May was the best month, with 4,200 bottles, the highest figure in the text.'),
    ]),
  ...LISTEN('MK8-l', 'Listening, A sales update at the team meeting',
    `OK, everyone, I'll keep this short. I want to give you a quick update on our gift box sales. So, as you know, we launched the new design in October. In October we sold about five hundred boxes. Then in November sales increased to eight hundred, which is great. And in December they rose again, by another two hundred, so we sold one thousand boxes. Now, there's one problem. Sales in our District 7 shop fell from three hundred to one hundred and fifty. We're not sure why yet. Personally, I think the shop is too far from the main road and people can't see it. So my suggestion is this: next week, Linh and I are going to visit the shop and talk to the staff. After that, we'll decide what to do before Tet. Any questions?`,
    [
      M('MK8', 'Gist', 'What is the speaker mainly talking about?',
        ['A new tea supplier', 'Gift box sales and one problem', 'Staff training', 'The Tet holiday schedule'], 1,
        'The update is about gift box sales from October to December and a problem in one shop.'),
      M('MK8', 'Detail', 'How many boxes were sold in December?',
        ['500', '800', '200', '1,000'], 3,
        'Sales rose from 800 by another 200 in December, so 1,000 boxes were sold.'),
      M('MK8', 'Opinion', 'Why does the speaker think sales fell in the District 7 shop?',
        ['The shop is hard to see from the main road.', 'The price is too high.', 'The staff are new.', 'The boxes were damaged.'], 0,
        'She says "I think the shop is too far from the main road and people can\'t see it."'),
    ]),
  ...SPEAK('MK8', 'Speaking, Present one slide',
    'You are presenting a proposal to Ms Ha and Mr Minh. Present one slide about online orders for Green Leaf Tea: January 800, February 1,200 (Tet gifts), March 1,000, April 1,500 (free delivery started in April). Recommendation: keep free delivery for the summer. Use a signpost to open, describe the trend with at least three figures, give the reasons and make the recommendation. Speak for about 1 minute.',
    `Now let's look at our online orders for the first four months of the year. As you can see on this slide, the trend is mostly upward. In January we had 800 orders. In February orders rose by 400, to 1,200, mainly because of Tet gifts. In March they fell slightly, to 1,000. However, in April orders increased again and reached a peak of 1,500. I think this is because we started free delivery in April. So my recommendation is to keep free delivery for the summer. That brings me to the end of this slide. Next, I'll talk about the budget.`,
    ['Language: opens with a signpost (Now let\'s look at ...) and uses trend language accurately in the past simple (rose by, fell to, increased, reached a peak of)',
      'Task: describes the trend with at least three correct figures from the slide and gives the reasons and the recommendation from the notes',
      'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MK8', 'Writing, Presentation summary slide notes',
    'After your presentation, Mr Minh asks for your speaker notes for the results slide. Write the notes for the slide "Cold-brew sales, March to June": March 2,400 bottles, April 3,000, May 4,200, June 3,700. Include (1) a signpost to open, (2) a description of the trend with figures (rise by, fall from ... to, reach a peak), and (3) a short conclusion with one recommendation. Write 100–120 words.',
    `Now let's move on to our cold-brew sales from March to June.

As you can see, sales grew strongly in spring. In March we sold 2,400 bottles. In April sales rose by 600, to 3,000 bottles. They increased again in May and reached a peak of 4,200 bottles, mainly because of the hot weather and our university samples.

However, in June sales fell from 4,200 to 3,700 bottles. We think this is because students went home for the summer holiday.

To sum up, the overall trend is upward, but we depend too much on students. My recommendation is to target office workers in June and July with a lunch-time offer.

Next, I'll present the budget.`,
    ['Language: uses a signpost, rise by, fall from ... to and reach a peak accurately, with past simple verbs (rose, fell, reached)',
      'Task: describes all four figures accurately and ends with one recommendation',
      'Organisation: signpost to open, the trend in time order, a conclusion with "To sum up" and a link to the next slide'], 110),

  /* ---------------- MK9, Business Writing Formats — the passive voice in formal writing ---------------- */
  ...USE([
    C('MK9', 'Vocabulary, Which format?', 'Which text type is each phrase usually found in?', ['Formal letter', 'Internal memo', 'Short report'],
      [['Dear Mr Tran,', 0], ['Yours sincerely,', 0], ['To: All shop staff', 1], ['Subject: New opening hours', 1], ['Findings', 2], ['Recommendations', 2]],
      'Letters start with "Dear ..." and end with "Yours sincerely"; memos have To/Subject lines; reports have headings such as Findings and Recommendations.'),
    M('MK9', 'Vocabulary, Formal phrases', 'Choose the most formal phrase for a letter to a supplier: "___ our new price list."',
      ['Here\'s', 'Check out', 'Please find enclosed', 'Have a look at'], 2,
      '"Please find enclosed" is a standard formal phrase; the others are informal.'),
    M('MK9', 'Language focus, Past passive', 'Complete the sentence: "The samples ___ to Mr Tran on 3 May."',
      ['were sent', 'sent', 'was send', 'are sending'], 0,
      'The past passive is was/were + past participle. "Samples" is plural, so we use "were sent".'),
    M('MK9', 'Language focus, Future passive', 'Complete the sentence: "Your order ___ within two days."',
      ['will deliver', 'is delivering', 'delivered', 'will be delivered'], 3,
      'The order does not deliver itself, so we need the passive: will be + past participle.'),
    M('MK9', 'Language focus, Active to passive', 'Which sentence has the same meaning as "Our team checks every bottle before delivery"?',
      ['Every bottle checks our team before delivery.', 'Every bottle is checked before delivery.', 'Every bottle was checking before delivery.', 'Every bottle checked before delivery.'], 1,
      'Present passive: is/are + past participle. We can leave out "by our team" because the action is more important.'),
    O('MK9', 'Genre, Order a formal letter', 'Put the parts of this letter to a supplier in the correct order.',
      ['Dear Mr Tran,',
        'I am writing about the shipment of oolong which was ordered on 2 May.',
        'Unfortunately, the shipment was delivered three days late, and two bags were damaged.',
        'We would be grateful if the damaged bags could be replaced by 20 May.',
        'Thank you for your help. I look forward to hearing from you.',
        'Yours sincerely, Nguyen Thu Ha'],
      'A formal letter has a greeting, the reason for writing, the details, the request, a polite closing sentence and a formal sign-off.'),
  ]),
  ...READ('MK9-r', 'Reading, A short report on the university samples',
    `REPORT: Cold-brew sampling at two universities
To: Mr Le Quang Minh, Founder
From: Linh, Marketing Assistant
Date: 30 May

1. Purpose
This report describes the results of the free sampling campaign and makes two recommendations.

2. Method
The campaign was held at two universities in Ho Chi Minh City from 13 to 24 May. A total of 3,000 free bottles were given to students. A short survey was completed by 450 students after they tried the drink.

3. Findings
The cold-brew taste was rated "good" or "very good" by 82% of students. However, the price of 25,000 VND was considered too high by more than half of them. In addition, most students said that a smaller bottle would be preferred. Online orders from student addresses rose by 35% in the two weeks after the campaign.

4. Recommendations
It is recommended that a 250 ml bottle is introduced at a lower price of 18,000 VND. It is also recommended that the sampling campaign is repeated in September, when the new school year starts.

The full survey results are attached.`,
    [
      M('MK9', 'Main idea', 'What is the report mainly about?',
        ['The history of Green Leaf Tea', 'The results of a sampling campaign and what to do next', 'A complaint from a university', 'How to make cold-brew tea'], 1,
        'The report describes the campaign, its findings and two recommendations.'),
      M('MK9', 'Detail', 'How many students completed the survey?',
        ['450', '3,000', '82', '250'], 0,
        'The Method section says "A short survey was completed by 450 students".'),
      M('MK9', 'Vocabulary in context', 'In the report, "findings" are ___.',
        ['the questions that were asked in the survey', 'the prices of the different bottles in the shops', 'the plans for the next campaign in September', 'the information discovered from the campaign and survey'], 3,
        'Under "Findings", every sentence reports a result ("was rated ... by 82%", "rose by 35%"), not a question, a price list or a plan.'),
    ]),
  ...LISTEN('MK9-l', 'Listening, Ms Ha gives writing advice',
    `Linh, have you got a minute? I've read your letter to the new packaging company, and it's a good start, but it's too informal. Remember, this is our first letter to them, so we need a formal style. First, don't start with "Hi guys". Start with "Dear Ms Phuong", because we know her name. Second, you wrote "We sent you the design last week". That's fine, but in a formal letter it's better to say "The design was sent to you on 12 June". Give the exact date. Third, keep it short. Three paragraphs is enough. One: why you are writing. Two: the details of the order. Three: what we want them to do. And please end with "Yours sincerely", not "Cheers". Can you send me the new version by four o'clock today? Then I'll sign it and we'll post it tomorrow morning.`,
    [
      M('MK9', 'Gist', 'What is Ms Ha\'s main advice about Linh\'s letter?',
        ['It should be longer.', 'It should be sent by email only.', 'It should be more formal.', 'It should not mention the design.'], 2,
        'She says the letter is "too informal" and explains how to make it formal.'),
      M('MK9', 'Detail', 'How many paragraphs does Ms Ha suggest?',
        ['Two', 'Three', 'Four', 'Five'], 1,
        'She says "Three paragraphs is enough" and lists them.'),
      M('MK9', 'Next step', 'What will happen tomorrow morning?',
        ['Linh will meet Ms Phuong.', 'Linh will write the first draft.', 'The design will be changed.', 'The letter will be posted.'], 3,
        'Ms Ha says "I\'ll sign it and we\'ll post it tomorrow morning."'),
    ]),
  ...SPEAK('MK9', 'Speaking, Explain a report to your manager',
    'You are Linh. Ms Ha could not read your short report on a delayed shipment of tea. Explain it to her in a short meeting. Notes: 200 kg of green tea ordered from Mr Tran on 1 June; delivery planned for 8 June; arrived four days late (a truck broke down near Bao Loc); tea checked on arrival, quality fine; two shops given tea from the District 1 store; recommendation: find a second supplier for emergencies; full report by email this afternoon. Use the passive at least three times (was ordered, was delivered, will be sent). Speak for about 1 minute.',
    `Of course, Ms Ha. Here is a short summary of the report. Two hundred kilos of green tea were ordered from Mr Tran on 1 June. The shipment was planned for 8 June, but it was delivered four days late because a truck broke down near Bao Loc. Luckily, the tea was checked when it arrived, and the quality was fine. Because of the delay, two shops were given tea from our District 1 store. My recommendation is that a second supplier is found for emergencies. I think this will protect our shops next time. The full report will be sent to you by email this afternoon.`,
    ['Language: uses the past and future passive accurately at least three times (were ordered, was delivered, was checked, will be sent)',
      'Task: explains what was ordered, what happened, what has been done and the recommendation from the notes',
      'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MK9', 'Writing, A formal letter to a supplier',
    'You are Ms Nguyen Thu Ha. Notes: 500 gift boxes ordered from Hoa Mai Packaging on 2 October; delivered on 15 October; 60 boxes printed dark blue, not green; cannot be used for Tet; please replace by 25 October; wrong boxes returned when new ones arrive; two photos attached. Write a formal letter to Ms Phuong, the sales manager, to (1) explain why you are writing, (2) describe the problem with the dates and numbers, and (3) request a solution and a date. Use: the passive (was placed, were delivered, could be replaced) and formal phrases (I am writing about, We would be grateful if, Please find enclosed). Write 100–130 words.',
    `Dear Ms Phuong,

I am writing about our order of 500 gift boxes, which was placed on 2 October.

The boxes were delivered to our warehouse on 15 October. Unfortunately, when they were checked, we found that 60 boxes were printed in dark blue instead of green. These boxes cannot be used for our Tet campaign, because the colour does not match our brand.

We would be grateful if the 60 boxes could be replaced by 25 October. The wrong boxes will be returned to you as soon as the new ones are received.

Please find enclosed two photos of the boxes. Thank you for your help, and I look forward to hearing from you.

Yours sincerely,
Nguyen Thu Ha
Marketing Manager, Green Leaf Tea`,
    ['Language: uses the passive accurately at least three times and formal phrases (I am writing about, We would be grateful if, Please find enclosed); no informal words',
      'Task: explains the purpose, describes the problem with the correct dates and numbers, and requests a solution with a date',
      'Organisation: formal letter layout: Dear Ms Phuong, reason for writing, details, request, polite closing sentence, Yours sincerely'], 120),

  /* ---------------- MK10, Digital Marketing Communication — present perfect and past simple ---------------- */
  ...USE([
    C('MK10', 'Vocabulary, Complaint reply or press release?', 'Where would you usually find each phrase?', ['Reply to a complaint', 'Press release'],
      [['We apologise for the delay.', 0], ['We have sent a replacement.', 0], ['Thank you for letting us know.', 0], ['FOR IMMEDIATE RELEASE', 1], ['For media enquiries, contact ...', 1], ['Green Leaf Tea announced today ...', 1]],
      'A complaint reply thanks, apologises and offers a solution; a press release has a release line, announces news and gives media contact details.'),
    M('MK10', 'Vocabulary, Word formation', 'Choose the correct word: "Please accept our sincere ___ for the broken bottle."',
      ['apologise', 'apologising', 'apologetic', 'apologies'], 3,
      'After "our sincere" we need a noun; "please accept our apologies" is the fixed polite phrase. "Apologise" is a verb and "apologetic" is an adjective.'),
    M('MK10', 'Language focus, Present perfect for news', 'Complete the sentence: "Green Leaf Tea ___ its tenth store in Ho Chi Minh City."',
      ['has opened', 'have opened', 'opening', 'has open'], 0,
      'For recent news with no time given, use has/have + past participle. "Green Leaf Tea" is singular, so "has opened".'),
    M('MK10', 'Language focus, Past simple with a time', 'Complete the sentence: "The new store ___ on 12 September."',
      ['has opened', 'opened', 'has been open', 'opens'], 1,
      '"On 12 September" is a finished time, so we use the past simple.'),
    M('MK10', 'Language focus, Choose the correct pair', 'Complete the reply: "We ___ your order, and we ___ a new box yesterday."',
      ['checked, have sent', 'have checked, have sent', 'have checked, sent', 'check, have send'], 2,
      'The first action is recent with no time (present perfect); the second has "yesterday" (past simple).'),
    O('MK10', 'Genre, Order a reply to a complaint', 'Put the parts of this reply to an online complaint in the correct order.',
      ['Dear Ms Lan, thank you for your message about your gift box.',
        'We are very sorry that one bottle arrived broken.',
        'We have checked your order, and the box was damaged during delivery.',
        'We sent you a free replacement this morning, and it will arrive tomorrow.',
        'We hope you enjoy your tea. Best regards, Green Leaf Tea Customer Care'],
      'A complaint reply thanks the customer, apologises, explains what happened, offers a solution and closes politely.'),
  ]),
  ...READ('MK10-r', 'Reading, Press release: cold-brew launch',
    `FOR IMMEDIATE RELEASE

Green Leaf Tea brings its cold-brew tea to supermarkets

Ho Chi Minh City, 5 June – Green Leaf Tea (Tra La Xanh), a tea-and-snack company from Da Lat, has launched its cold-brew tea in supermarkets. The drinks went on sale on 2 June in all 40 Sao Mai Mart stores. Since January they have been sold in the company's nine shops and its online shop.

The new line has three flavours: oolong, jasmine and green tea with lemongrass. All the tea comes from a family farm in Bao Loc and is brewed slowly in cold water for twelve hours. Each bottle contains only 4 g of sugar.

"Young people in the city have told us they want a healthy drink they can carry to work or class," said Mr Le Quang Minh, founder of Green Leaf Tea. "We have worked for a year to create a fresh, natural taste."

In the first three days, Sao Mai Mart sold more than 5,000 bottles. Each bottle costs 25,000 VND.

Green Leaf Tea opened its first store in Da Lat in 2016 and has grown to nine stores in Ho Chi Minh City.

For media enquiries, contact:
Linh, Marketing Assistant, Green Leaf Tea
press@greenleaftea.vn`,
    [
      M('MK10', 'Main idea', 'What is the main news in the press release?',
        ['Green Leaf Tea has opened its first store.', 'Green Leaf Tea cold-brew tea is now sold in supermarkets.', 'Mr Minh has bought a new farm.', 'The price of tea has gone up.'], 1,
        'The headline and first paragraph announce that the cold-brew bottles are now on sale in supermarkets.'),
      M('MK10', 'Detail', 'When did the drinks go on sale?',
        ['On 5 June', 'In 2016', 'On 2 June', 'Twelve hours ago'], 2,
        'The press release says "The drinks went on sale on 2 June". 5 June is the date of the press release.'),
      M('MK10', 'Reference', 'In "Since January they have been sold in the company\'s nine shops", what does "they" refer to?',
        ['The Sao Mai Mart stores', 'The cold-brew drinks', 'The three flavours of tea leaves', 'The young people in the city'], 1,
        '"They" refers back to "The drinks" in the sentence before: the drinks went on sale in supermarkets on 2 June, but they were already sold in the company\'s own shops.'),
    ]),
  ...LISTEN('MK10-l', 'Listening, Customer care call',
    `Good afternoon, Green Leaf Tea customer care, this is Linh speaking. ... Yes, Mr Duc, I have your email here. I'm really sorry about this. So you ordered two gift boxes on our website on Monday, and they arrived yesterday, but one box had the wrong tea inside. Is that right? ... OK. I've just checked your order, and you're right, our warehouse made a mistake. I'm very sorry. Here's what we can do. We have already prepared a new box with the correct jasmine tea, and our driver will bring it to your office tomorrow before twelve o'clock. You can keep the other box as a small gift from us. And I've also added a ten per cent discount code to your account for your next order. ... You're welcome, and thank you for being patient. Please call me again if there's any problem.`,
    [
      M('MK10', 'Gist', 'Why did Mr Duc contact Green Leaf Tea?',
        ['One gift box had the wrong tea inside.', 'His order did not arrive.', 'He wanted to cancel his order.', 'He wanted a job in the warehouse.'], 0,
        'Linh says "one box had the wrong tea inside".'),
      M('MK10', 'Detail', 'When will the new box arrive?',
        ['Yesterday', 'On Monday', 'Next week', 'Tomorrow before twelve o\'clock'], 3,
        'Linh says the driver will bring it "tomorrow before twelve o\'clock".'),
      M('MK10', 'Next step', 'What has Linh added to Mr Duc\'s account?',
        ['A free bottle', 'A refund for both boxes', 'A ten per cent discount code', 'A new password'], 2,
        'She says "I\'ve also added a ten per cent discount code to your account".'),
    ]),
  ...SPEAK('MK10', 'Speaking, Reply to a complaint by phone',
    'You work in customer care at Green Leaf Tea. Ms Thao has left a one-star online review: her cold-brew bottles arrived warm and two days late. Notes: she ordered six bottles on Saturday; they arrived on Tuesday; the delivery partner\'s cold truck broke down last weekend; you have now changed to a new delivery partner; six new bottles already sent, arriving before 5 p.m. today; delivery fee refunded. Call her. Thank her, apologise, explain, and offer the solution. Use: the present perfect for news (I have checked, we have sent) and the past simple with finished times (on Saturday, last weekend). Speak for about 1 minute.',
    `Hello, Ms Thao. This is Linh from Green Leaf Tea. Thank you for your review, and I'm very sorry about your order. I have checked the details. You ordered six bottles on Saturday, and they arrived on Tuesday, two days late. Our delivery partner had a problem with their cold truck last weekend, so the bottles were not kept cold. We have now changed to a new delivery partner for cold drinks. To say sorry, we have already sent you six new bottles, and they will arrive before five o'clock today. We will also refund your delivery fee. Thank you for your patience.`,
    ['Language: uses the present perfect for news (have checked, have changed, have sent) and the past simple with finished times (ordered on Saturday, broke down last weekend) accurately',
      'Task: thanks and apologises, explains what happened and when, and offers the solution from the notes',
      'Delivery: clear, steady pace, polite tone, understandable pronunciation']),
  ...WRITE('MK10', 'Writing, A short press release',
    'Green Leaf Tea has just opened a new store near a university in Thu Duc City. Notes: tenth store; opened on 12 September, five minutes from the university area; quiet study corner with free Wi-Fi and power sockets; cold brew 18,000 VND with a student card; 1,200 customers in the first three days; company started in Da Lat in 2016; contact: Linh, press@greenleaftea.vn. Write a short press release for local news websites with (1) a headline and the place and date, (2) the key facts, and (3) a short quote from Ms Nguyen Thu Ha and media contact details. Use: the present perfect for the news (has opened), the past simple with dates (opened on 12 September) and direct speech with "said". Write 120–150 words.',
    `FOR IMMEDIATE RELEASE

Green Leaf Tea opens a student-friendly store in Thu Duc

Thu Duc City, 15 September – Green Leaf Tea, the tea-and-snack company from Da Lat, has opened its tenth store. The new store opened on 12 September, five minutes from the university area.

The store has a quiet study corner with free Wi-Fi and power sockets. Students can buy cold-brew tea for 18,000 VND with a student card. In its first three days, the store welcomed more than 1,200 customers.

"Students have always been some of our best customers," said Ms Nguyen Thu Ha, marketing manager. "We wanted to give them a calm, healthy place to study."

Green Leaf Tea started in Da Lat in 2016 and now has ten stores in Ho Chi Minh City.

For media enquiries, contact:
Linh, Marketing Assistant
press@greenleaftea.vn`,
    ['Language: uses the present perfect for the news (has opened) and the past simple with dates (opened on 12 September, started in 2016) accurately; punctuates the quote correctly ("...," said Ms Ha)',
      'Task: includes a headline, place and date, the key facts from the notes, a quote and contact details',
      'Organisation: release line, headline, dateline and opening, details, quote, background sentence, contact'], 140),
];

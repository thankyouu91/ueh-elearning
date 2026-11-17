// English for Marketing Communication (ESP, CEFR B1–B1+): Final Examination, Units MK1–MK10 (weighted towards MK6–MK10).
// Same format as the midterm. Every text, transcript, stem and task is new; nothing is reused from the midterm or the unit files.
// Green Leaf Tea facts follow docs/HANDOFF.md (ten shops after Thu Duc City, 12 September; cold brew in Sao Mai Mart from 2 June).
// Other businesses and people are fictional.

// [stem, [correct, wrong, wrong, wrong], explanation]  — the correct option is ALWAYS FIRST; the seed shuffles options.
export const FINAL = {
  title: 'Final Examination',
  minutes: 120,
  parts: [
    {
      id: 'L', title: 'Part 1, Listening', minutes: 25, weight: 25,
      instructions: 'You will hear four recordings. You will hear each recording twice. Before each recording, read the five questions. Choose the best answer (A, B, C or D) while you listen.',
      groups: [
        {
          title: 'Recording 1, A short presentation about online sales',
          audio: `Good morning, everyone, and thanks for coming. I'm Khoa from Golden Grain Rice Snacks, and today I'm going to talk about our online sales in the first half of the year. I'll start with the figures, then I'll explain the main reasons, and finally I'll make one recommendation. So, first, the figures. In January we had eight hundred orders on our website. Because of Tet, February was our best month: orders rose to one thousand nine hundred. That was our peak. In March, orders fell sharply, to seven hundred, but that's normal after Tet. Then from April to June they increased slowly, by about a hundred a month, so in June we reached one thousand. Now, the reasons. The big rise in February came from our gift sets, as usual. But the steady growth since April is more interesting. It came from our new spicy seaweed flavour, which is very popular with students. That brings me to my recommendation. Students buy small packs, but they buy them often. So I'd like to suggest a monthly student box with four small packs. If we launch it in September, at the start of the school year, I think we can reach one thousand five hundred orders a month by December. Thank you. Are there any questions?`,
          items: [
            ["What is the presentation mainly about?", ["Six months of online orders and an idea to increase them", "The launch of a seaweed flavour in the company's shops", "Why the gift sets sold badly at Tet this year", "A plan to open a new shop near the universities"], "Khoa gives the figures for January to June, the reasons, and then a recommendation."],
            ["How many online orders did the company receive in February?", ["1,900", "800", "700", "1,000"], "'Orders rose to one thousand nine hundred.' 800 was January, 700 was March and 1,000 was June."],
            ["What does Khoa say about March?", ["The fall was normal after Tet.", "Orders rose by about a hundred.", "It was the best month for students.", "Orders dropped back to 800."], "Orders fell to 700, 'but that's normal after Tet'. The rise of about a hundred a month started in April."],
            ["Why have orders grown since April?", ["Students like a new flavour.", "The company sold more gift sets.", "Prices went down in April.", "The website was made easier to use."], "The growth 'came from our new spicy seaweed flavour, which is very popular with students'. Gift sets explain February."],
            ["What does Khoa recommend?", ["A monthly box of small packs for students", "A new flavour for the December holidays", "Larger packs for students from September", "Bringing back the Tet gift sets in September"], "He suggests 'a monthly student box with four small packs', launched in September."],
          ],
        },
        {
          title: 'Recording 2, A customer calls an online furniture shop',
          audio: `Tuan: Good afternoon, HomeNest Furniture, Tuan speaking. How can I help you?
Lan: Hello. I'm calling about an order. I bought a desk and a chair from your website last week, and they arrived this morning. The desk is fine, but the chair is the wrong colour. I ordered grey, and you sent dark green. And one of the legs is scratched.
Tuan: Oh, I'm very sorry about that. Could you give me your order number, please?
Lan: Yes, it's H four four seven one.
Tuan: Thank you. Let me check... Yes, I can see what happened. The chair was packed in our warehouse with the wrong label on the box. I do apologise.
Lan: Well, I need the chair for my son. He starts his online classes on Monday.
Tuan: I understand. There are two things we can do. We can send you a grey chair, free of charge, or we can give you a full refund. A new chair can arrive on Saturday.
Lan: Saturday is fine. I'd prefer the replacement. But what about the green one?
Tuan: Our driver will collect it when he brings the new chair. Please keep the box if you can. And to say sorry, I'll add a voucher for ten per cent off your next order.
Lan: OK, thank you. Could you send me an email to confirm all this?
Tuan: Of course. I'll send it within the hour.`,
          items: [
            ["Why does the woman call the shop?", ["Part of her order is not right.", "Her desk has not arrived yet.", "She wants to order a second chair.", "Her son's classes have been cancelled."], "The desk is fine, but the chair is the wrong colour and scratched."],
            ["What is wrong with the chair?", ["It is the wrong colour and has a mark on one leg.", "It is the right colour, but one of its legs is broken.", "It is too small to use with her son's desk.", "It is grey, not the dark green she ordered."], "She ordered grey but got dark green, 'and one of the legs is scratched'."],
            ["According to Tuan, why did the mistake happen?", ["The box had the wrong label in the warehouse.", "The driver delivered another customer's order.", "The website showed the wrong colour.", "The grey chairs were sold out last week."], "'The chair was packed in our warehouse with the wrong label on the box.'"],
            ["What does the woman choose?", ["A replacement chair", "A full refund", "A ten per cent voucher", "A different desk"], "'I'd prefer the replacement.' The voucher is an extra gift from Tuan, not her choice."],
            ["What will Tuan do next?", ["Email her to confirm the arrangement", "Bring the new chair himself on Saturday", "Call her again on Monday morning", "Collect the green chair this afternoon"], "She asks for an email to confirm, and he says 'I'll send it within the hour'. The driver collects the green chair on Saturday."],
          ],
        },
        {
          title: 'Recording 3, A client briefs a design studio',
          audio: `Thanks for meeting me, Phuong. Let me explain what we need. The Riverside Book Fair runs from the sixth to the eighth of December in District 1, and this year we're expecting about twelve thousand visitors. We need two things from your studio: a poster and a set of five short videos for social media. For the poster, the main message is that children under twelve get in free. That's new this year, and it's the thing we most want families to notice. Please don't put the full list of publishers on it; that goes on our website. Now, the deadlines. I'd like two rough designs by Friday the fifteenth of November. Our director is on holiday next week, so she's checking them on the eighteenth, when she gets back. The final poster has to go to the printer by the twenty-second. The videos can wait a little. We're posting the first one on the twenty-fifth. Oh, and one more thing. Our budget for both jobs together is forty million dong. If it's going to cost more than that, please tell me before you start, not after. Could you send me a short email today to confirm the dates?`,
          items: [
            ["What does the client want from the studio?", ["A poster and five videos", "A website and one poster", "Five posters and one video", "A poster and a list of publishers"], "'We need two things from your studio: a poster and a set of five short videos.' The publishers go on the website."],
            ["What is the most important message for the poster?", ["Young children can enter without paying.", "About 12,000 visitors are expected this year.", "Many publishers will be at the fair.", "The fair is in District 1 this year."], "Free entry for children under twelve is 'the thing we most want families to notice'."],
            ["When must the first designs be ready?", ["15 November", "18 November", "22 November", "25 November"], "'Two rough designs by Friday the fifteenth of November.' The 18th is the director's check, the 22nd the printer, the 25th the first video."],
            ["Why will the director look at the designs on 18 November?", ["She is away until then.", "The printer needs them that day.", "The studio cannot finish earlier.", "The first video goes online that day."], "'Our director is on holiday next week, so she's checking them on the eighteenth, when she gets back.'"],
            ["What does the client say about the budget?", ["She wants to know before work starts if it will cost more.", "She wants to spend less than 40 million on the videos.", "She will pay the bill after the fair has finished.", "She wants the money shared equally between the two jobs."], "'If it's going to cost more than that, please tell me before you start, not after.'"],
          ],
        },
        {
          title: 'Recording 4, A radio news item about a product launch',
          audio: `And now, business news. Hai Van Dairy, a family company from Da Nang, has launched a new range of yoghurt drinks for children. The drinks went on sale yesterday in two hundred shops across central Vietnam. There are three flavours: mango, passion fruit and, a little surprisingly, pumpkin. The company's marketing director, Ms Diem Ho, told us that the new drinks contain forty per cent less sugar than its older products. "Parents kept telling us that most children's drinks are far too sweet," she said, "so we've spent two years developing these." The bottles are smaller, too. At a hundred and fifty millilitres, they fit easily into a school bag. A bottle costs twelve thousand dong, but for the first month, shoppers can buy four for forty thousand. Hai Van Dairy has sold yoghurt in central Vietnam for more than twenty years, but this is the first time it has made a product only for children. Ms Ho said that the range could reach shops in Ho Chi Minh City next March, if sales go well. Back to you in the studio.`,
          items: [
            ["What is the news item mainly about?", ["A new product for children", "A dairy company's twentieth birthday", "A new shop opening in Da Nang", "The amount of sugar in school lunches"], "Hai Van Dairy 'has launched a new range of yoghurt drinks for children'."],
            ["Where can people buy the drinks now?", ["In shops in central Vietnam", "In shops in Ho Chi Minh City", "Only at schools in Da Nang", "Only on the company's website"], "They 'went on sale yesterday in two hundred shops across central Vietnam'. Ho Chi Minh City may come next March."],
            ["How long did the company spend developing the new drinks?", ["Two years", "More than twenty years", "One month", "Four years"], "'We've spent two years developing these.' Twenty years is how long the company has sold yoghurt; one month is the special offer."],
            ["How much do four bottles cost during the first month?", ["40,000 VND", "48,000 VND", "12,000 VND", "15,000 VND"], "'For the first month, shoppers can buy four for forty thousand.' 12,000 VND is the price of one bottle."],
            ["What might happen next March?", ["The drinks may go on sale in Ho Chi Minh City.", "The company will add a fourth flavour.", "The price of one bottle will go up.", "The special offer for shoppers will start."], "The range 'could reach shops in Ho Chi Minh City next March, if sales go well'."],
          ],
        },
      ],
    },
    {
      id: 'R', title: 'Part 2, Reading', minutes: 35, weight: 25,
      instructions: 'Read the four texts. For each question, choose the best answer (A, B, C or D). Answer from the information in the text.',
      groups: [
        {
          title: 'Text 1: A press release',
          text: `FOR IMMEDIATE RELEASE

River Craft launches bamboo straws for cafés

Can Tho, 4 November – River Craft, a small company that makes household products from bamboo, has launched a range of drinking straws for cafés and restaurants.

The straws are made by hand in the company's workshop in Phong Dien, where 35 local people are employed. Each straw is cut, boiled and dried in the sun. It can be washed and used again up to 100 times.

Since the start of the year, River Craft has received more than 40 requests from café owners who want to stop using plastic. "Our customers kept asking, so we listened," said Kim Anh Vo, the company's founder. "Bamboo grows fast, and our straws cost less than metal ones."

The straws are sold in boxes of 200, at 380,000 VND per box. A free cleaning brush is included in every box. During November, cafés that order five boxes or more will receive a 15% discount.

The range was first tested in three cafés in Ninh Kieu District in August. According to the owners, their customers have responded well, and only one complaint has been received, about a straw that was too short.

About River Craft
River Craft was founded in 2019 and sells baskets, trays and kitchen tools to shops across the Mekong Delta.

Media contact: Duy Pham, Press Office, River Craft`,
          items: [
            ["What is the main purpose of the text?", ["To tell journalists about a new product", "To ask cafés to stop using plastic straws", "To advertise jobs at the Phong Dien workshop", "To reply to a complaint about short straws"], "A press release shares company news with the media: the launch of the straws."],
            ["What does the text say about how the straws are made?", ["Workers make them by hand.", "They are dried in a machine.", "They are made in Ninh Kieu District.", "They are cut from metal and bamboo."], "'The straws are made by hand in the company's workshop.' They are dried in the sun; Ninh Kieu is where they were tested."],
            ["How many requests from café owners has River Craft received since the start of the year?", ["More than 40", "35", "About 100", "200"], "'More than 40 requests from café owners.' 35 is the number of workers, 100 the number of uses and 200 the straws in a box."],
            ["What will a café get if it orders six boxes in November?", ["A lower price", "Only a free cleaning brush", "Free delivery to the café", "200 extra straws"], "Orders of 'five boxes or more' get a 15% discount. Every box has a brush, so the brush is not the only benefit."],
            ["What happened during the test in August?", ["Most feedback was positive.", "Three cafés stopped using the straws.", "Many customers said the straws were too short.", "The straws were tested in 35 cafés."], "Customers 'have responded well, and only one complaint has been received'."],
          ],
        },
        {
          title: 'Text 2: A short report',
          text: `To: Mr Loc, Owner
From: Chau, Store Manager
Date: 4 November
Subject: Student discount trial at Paper Moon Bookshop

Introduction
This report presents the findings of a six-week trial of a 15% student discount at our Binh Thanh shop. The trial ran from 16 September to 27 October. It was suggested in July because the number of student visits had fallen.

Method
Sales data was collected from the till every week, and a short survey was completed by 120 student customers.

Findings
1. Student sales rose from 9 million VND a week before the trial to 14 million VND a week at the end, an increase of about 55%.
2. Total profit stayed almost the same, because the extra student sales were balanced by the lower prices.
3. 70% of students heard about the discount from friends, while only 10% saw our social media posts.
4. Many students asked for exam books and study guides, which the shop does not stock at present.

Conclusion
The discount brought more students into the shop, but it has not increased profit yet.

Recommendations
It is recommended that the discount is continued, but only from Monday to Thursday, when the shop is quiet. In addition, a small shelf of exam books should be added by January. A "bring a friend" card could also be tested, since most students learnt about the offer by word of mouth.`,
          items: [
            ["What is the main purpose of the report?", ["To give the results of a trial and suggest next steps", "To ask the owner to approve a new trial in July", "To advertise a discount to university students", "To explain why profit fell sharply this autumn"], "It presents findings, a conclusion and recommendations about the discount trial."],
            ["How was the information for the report collected?", ["From weekly sales figures and a survey", "From interviews with the shop's staff", "From comments on the shop's social media", "From a survey of 120 other bookshops"], "'Sales data was collected from the till every week, and a short survey was completed by 120 student customers.'"],
            ["What happened to the shop's profit during the trial?", ["It did not change much.", "It rose by about 55%.", "It fell by about 15%.", "It doubled by the end."], "'Total profit stayed almost the same.' The 55% rise was in student sales, not profit."],
            ["What does Finding 3 suggest?", ["Friends' recommendations worked better than online posts.", "Most students follow the shop on social media.", "Students prefer discounts on exam books.", "The shop's posts reached 70% of students."], "70% heard from friends; only 10% saw the posts."],
            ["When does Chau suggest offering the discount in future?", ["Only on the quieter weekdays", "Every day of the week", "Only at the weekend", "Only during January"], "'Only from Monday to Thursday, when the shop is quiet.' January is the date for the exam books shelf."],
          ],
        },
        {
          title: 'Text 3: A formal business letter',
          text: `Golden Field Packaging Co.
45 Tan Thoi Hiep Street, District 12, Ho Chi Minh City

6 November

Ms Oanh Nguyen
Purchasing Manager
Morning Crust Bakery
Tan Binh District

Dear Ms Nguyen,

Re: Order GF-2318, paper cake boxes

Thank you for your letter of 2 November about the shipment of 5,000 cake boxes which was delivered on 31 October.

We have looked into the problem, and we agree that 600 of the boxes were damaged. It appears that they were stored in a wet part of our warehouse before they were loaded. We sincerely apologise for this.

A replacement shipment of 600 boxes will be delivered to your bakery on Monday, 11 November. You do not need to return the damaged boxes, as they can be recycled. In addition, a credit of 10% will be applied to your next invoice.

To avoid similar problems in future, our warehouse has been reorganised, and all paper products are now kept on raised shelves.

I also enclose our price list for next year. Please note that prices for printed boxes will rise by 5% from 1 January, while prices for plain boxes will stay the same.

If you have any further questions, please do not hesitate to contact me.

Yours sincerely,

Bao Le
Customer Service Manager`,
          items: [
            ["Why is Mr Le writing to Ms Nguyen?", ["To reply to a complaint about damaged goods", "To ask her to pay an invoice from October", "To confirm a new order for printed boxes", "To introduce the company's new warehouse"], "He thanks her for her letter about the shipment and agrees that 600 boxes were damaged."],
            ["What caused the problem?", ["The boxes were kept somewhere wet.", "The boxes were loaded onto the wrong truck.", "The bakery ordered the wrong size of box.", "The shipment was delivered two days late."], "'They were stored in a wet part of our warehouse before they were loaded.'"],
            ["What should Ms Nguyen do with the damaged boxes?", ["She does not need to send them back.", "She must return them by 11 November.", "She has to pay for them to be recycled.", "She should give them to the driver on Monday."], "'You do not need to return the damaged boxes, as they can be recycled.'"],
            ["What has Mr Le sent with the letter?", ["A list of next year's prices", "A new invoice for the 600 boxes", "A sample of a printed box", "A photo of the new shelves"], "'I also enclose our price list for next year.' To enclose means to send something with a letter."],
            ["Which statement about prices is true?", ["Plain boxes will cost the same next year.", "All boxes will cost 5% more from January.", "Printed boxes will be 10% cheaper.", "Prices will change on 11 November."], "Printed boxes rise by 5%, 'while prices for plain boxes will stay the same'. The 10% is a credit on the next invoice."],
          ],
        },
        {
          title: 'Text 4: Online reviews and a reply from the owner',
          text: `Steam House Dumplings, Binh Thanh: customer reviews

★★★★★  Thanh V., 2 days ago
I've eaten here four times since it opened, and the pork and mushroom dumplings have been excellent every time. Prices are fair and the staff are friendly. One tip: book a table if you want to come at the weekend, because it gets very busy.

★★☆☆☆  Alex R., 5 days ago
The food was good, but we waited 50 minutes for our order on Saturday evening. When I asked the waiter, he said the kitchen was short of staff. Nobody apologised, and we weren't offered anything. I won't go back at the weekend.

★★★★☆  Bich N., 1 week ago
Lovely vegetarian dumplings, which are hard to find in this area. The dining room is quite noisy, so it isn't ideal for a business lunch. I also ordered delivery last week, and the food arrived hot.

Reply from the owner
Dear Alex,
Thank you for your feedback, and I'm very sorry about your experience last Saturday. You are right. Two of our cooks were ill that evening, and we should have told you about the wait when you arrived. Since then, we have hired an extra cook for Friday to Sunday evenings, and our waiters have been trained to update customers if an order takes longer than 20 minutes. I'd like to invite you back for a free meal for two on any weekday. Please send a message to our page so that we can arrange it.
Best wishes,
Vy, Owner`,
          items: [
            ["What does Thanh V. advise other customers to do?", ["Reserve a table for weekend visits", "Try the vegetarian dumplings", "Use the delivery service", "Avoid the restaurant at lunchtime"], "'Book a table if you want to come at the weekend, because it gets very busy.'"],
            ["What was Alex's main problem?", ["His food took too long to arrive.", "His dumplings were not hot enough.", "The waiter was rude to his friends.", "The prices were higher than he expected."], "He 'waited 50 minutes' for his order on Saturday evening."],
            ["Why would Bich not choose the restaurant for a work lunch?", ["It is too loud.", "It is too expensive.", "It has few vegetarian dishes.", "It does not take bookings."], "'The dining room is quite noisy, so it isn't ideal for a business lunch.'"],
            ["According to Vy, what has changed since Alex's visit?", ["More cooks work on weekend evenings.", "The restaurant now closes earlier on Saturdays.", "Customers can now order food for delivery.", "Every order now arrives within 20 minutes."], "'We have hired an extra cook for Friday to Sunday evenings.' Waiters update customers after 20 minutes; there is no promise that every order arrives within 20 minutes."],
            ["What does Vy want Alex to do?", ["Contact the restaurant to arrange a free meal", "Come back next Saturday evening", "Change his review to five stars", "Speak to the cooks who were ill"], "'Please send a message to our page so that we can arrange it.' The free meal is on a weekday."],
          ],
        },
      ],
    },
    {
      id: 'U', title: 'Part 3, Vocabulary and Grammar', minutes: 15, weight: 15,
      instructions: 'Choose the word or phrase (A, B, C or D) that best completes each sentence.',
      groups: [
        {
          title: 'Vocabulary',
          items: [
            ["Because of the floods, our supplier was ___ to deliver on time, so we emailed all our stakeholders.", ["unable", "disable", "inable", "nonable"], "The negative of the adjective 'able' takes the prefix un-: 'unable to + verb'. 'Disable' is a verb; 'inable' and 'nonable' are not words."],
            ["Two days after the briefing, I'll ___ with the client to check that she is happy with the plan.", ["follow up", "set up", "bring up", "take up"], "To follow up is to contact someone again after a meeting to check or confirm something."],
            ["The director will only ___ the plan if the objective has a clear number and date.", ["approve", "launch", "reach", "attend"], "To approve is to officially agree to a plan."],
            ["Visits to our page have gone up every month this year. If this ___ continues, we will reach 50,000 visits by December.", ["trend", "audience", "signpost", "draft"], "A trend is the general direction in which figures change over time."],
            ["Please find ___ a copy of the signed contract.", ["enclosed", "approved", "delivered", "reached"], "'Please find enclosed' is a fixed phrase in formal letters for something sent with the letter."],
            ["According to the main ___ of our survey, two out of three shoppers read online reviews before they buy.", ["findings", "recommendations", "shipments", "deadlines"], "Findings are the information a survey discovers. A fact about shoppers is a finding; recommendations say what to do next."],
            ["The blender arrived broken, so the shop sent the customer a new one as a ___ at no extra cost.", ["replacement", "refund", "review", "complaint"], "A replacement is a new item sent instead of a damaged one. A refund is money, not a new blender."],
          ],
        },
        {
          title: 'Grammar',
          items: [
            ["Staff ___ wear their name badges at work. It is a company rule.", ["have to", "don't have to", "mustn't", "has to"], "A rule makes it necessary, so 'have to'. 'Staff' is plural, so not 'has to'; 'mustn't' would mean it is not allowed."],
            ["The designer ___ created our new logo has won a national prize.", ["who", "which", "where", "what"], "A defining relative clause about a person uses 'who' (or 'that')."],
            ["The new bottle is ___ than the old one, so it fits easily in a school bag.", ["smaller", "more small", "smallest", "the smaller"], "A short adjective takes -er + than: 'smaller than'."],
            ["I can't join the call on Thursday afternoon. I ___ the printer at 2 p.m.; it's already in my calendar.", ["'m meeting", "meet", "'ve met", "met"], "A fixed arrangement for a future time uses the present continuous."],
            ["Sales rose ___ 2,000 bottles in March to 2,600 in April.", ["from", "by", "at", "of"], "'From ... to ...' gives the start and end figures. 'By' would give the size of the change (600)."],
            ["All online orders ___ within 48 hours of payment.", ["are sent", "send", "are sending", "have sent"], "Orders do not send themselves: the passive (are + past participle) is needed."],
            ["We ___ your email on Monday and passed it to our delivery team.", ["received", "have received", "have receive", "were received"], "'On Monday' is a finished time, so the past simple is used, not the present perfect."],
            ["Good news! Our app ___ 10,000 downloads, so we are celebrating with a special offer.", ["has reached", "reach", "is reaching", "was reached"], "Recent news with a result now and no exact time takes the present perfect."],
          ],
        },
      ],
    },
    {
      id: 'W', title: 'Part 4, Writing', minutes: 35, weight: 20,
      instructions: 'Complete both tasks. Write in full sentences and include all three content points. Spend about 15 minutes on Task 1 and about 20 minutes on Task 2.',
      tasks: [
        {
          title: 'Task 1: A reply to a customer complaint',
          prompt: 'You work in customer service at Green Leaf Tea. A customer, Mr Kien, ordered two oolong gift boxes on the Green Leaf Tea website as a birthday present for his mother. He has written to complain: the boxes arrived one day late, and the lid of one box was broken. Notes: reason: the delivery company had a problem with one of its vans, and the boxes were not packed carefully enough; offer: a new box free of charge or a full refund for the broken one; action taken: all gift boxes are now packed in stronger cartons. Write a reply to Mr Kien. In your reply: 1) apologise and briefly explain what went wrong; 2) offer a replacement box or a refund, and ask him which he prefers; 3) say what Green Leaf Tea has done to stop this happening again. Use: I am very sorry that... / We apologise for...; We would like to... / Could you let me know...?; the present perfect and the passive for the action taken. Write about 100 words.',
          words: 100,
          model: `Subject: Your oolong gift box order

Dear Mr Kien,

Thank you for your email, and I am very sorry that your gift boxes arrived late and that one lid was broken. Our delivery company had a problem with one of its vans, and the boxes were not packed carefully enough.

We would like to send you a new gift box free of charge, or we can give you a full refund for the broken one. Could you let me know which you would prefer?

We have now changed our packaging, and all gift boxes are packed in stronger cartons before they leave the shop.

Best regards,
Linh
Green Leaf Tea`,
          marking: [
            'Language: apology phrases (I am very sorry that..., We apologise for...), polite offers and questions (We would like to..., Could you let me know...?), the present perfect and the passive for the action taken (We have changed..., boxes are packed...), accurate.',
            'Task: includes all the points in the notes (apology with the reason; replacement or refund with a question; the action taken).',
            'Organisation: email format with a subject line, greeting, one idea per paragraph and a polite closing; polite tone throughout.',
          ],
        },
        {
          title: 'Task 2: A short report',
          prompt: 'Bamboo Wheels rents bicycles to visitors in Hoi An. In October it ran a campaign called "Ride the Old Town", with a 20% discount for online bookings. The owner, Mr Tuyen, asks you to write a short report about the campaign. Notes: objective: 300 rentals in October; result: 340 rentals; 60% of customers were foreign tourists; 45% of bookings were made online; 25 families asked for child seats, but the shop has none; several customers said the maps were hard to read; recommendations: buy ten child seats before the busy season in December, and redesign the maps with larger text and clear symbols. Write a report with three headings: Introduction, Findings and Recommendations. Include: 1) the purpose of the report; 2) at least three findings with figures; 3) two recommendations. Use the passive at least twice. Write about 150 words.',
          words: 150,
          model: `Introduction
This report presents the results of the "Ride the Old Town" campaign, which was run in October. A 20% discount was offered to customers who booked online.

Findings
1. The campaign was successful. Our objective was 300 rentals, and 340 bikes were rented, so we were 40 rentals above the target.
2. 45% of all bookings were made online, which shows that the discount worked.
3. Most customers (60%) were foreign tourists.
4. However, 25 families asked for child seats, and we could not offer any. Several customers also said that our maps were hard to read.

Recommendations
First, it is recommended that ten child seats are bought before the busy season in December, as families are an important group for us. Second, the maps should be redesigned with larger text and clear symbols. If we make these changes, I believe more families will rent from us.`,
          marking: [
            'Language: at least two correct passives (was run, were rented, should be redesigned, it is recommended that...) and report phrases (This report presents..., The findings show...), accurate, with figures written correctly.',
            'Task: transfers the purpose, at least three findings with the figures in the notes (340 against 300, 45% online, 60% tourists, 25 families) and the two recommendations accurately.',
            'Organisation: the three headings Introduction, Findings and Recommendations; numbered or clearly separated findings; links such as However, First, Second; formal, concise tone.',
          ],
        },
      ],
    },
    {
      id: 'S', title: 'Part 5, Speaking', minutes: 10, weight: 15,
      instructions: 'There are three tasks. Your answers are recorded in the browser. For each task, read the card and prepare for 30 seconds, then speak for about 1 minute. You may make short notes but do not read a full script.',
      tasks: [
        {
          title: 'Task 1: Describe a sales trend',
          prompt: 'Sunrise Coconut Water sells drinks through its online shop. Describe the trend in its online orders from July to December to your team, and give the reasons in the notes. Figures (orders per month): July 1,200; August 1,500; September 2,100; October 2,100; November 1,600; December 1,900. Notes: November was cooler, so people drank less coconut water; December went up because of the holidays. Use verbs such as rise, increase, fall, drop, reach a peak and stay the same, with from, to and by.',
          seconds: 60,
          model: `I'd like to show you our online orders from July to December. In July we had one thousand two hundred orders. In August, orders rose by three hundred, to one thousand five hundred, and in September they increased sharply to two thousand one hundred. That was our peak, and orders stayed the same in October. However, in November they fell by five hundred, to one thousand six hundred. One possible reason is the weather: November is cooler, so people drink less coconut water. Finally, in December orders went up again, to one thousand nine hundred, probably because of the holidays. So overall, the trend from July to December was upward.`,
          marking: [
            'Language: trend verbs in the past simple (rose, increased, fell, stayed the same, reached a peak) with by, to and from ... to, used accurately at least four times.',
            'Task: describes the whole period with the figures on the card, the peak and the fall in November, and gives the reasons in the notes.',
            'Delivery: speaks for about one minute with clear signposting (In July..., However..., Finally..., So overall...) and numbers that a listener can understand.',
          ],
        },
        {
          title: 'Task 2: Respond to a customer complaint',
          prompt: 'You are the manager of Blue Coast Hotel in Nha Trang. A guest comes to reception and complains: "I booked a sea-view room, but I\'ve got a room that looks at the car park. The air conditioner is very noisy, and my room wasn\'t cleaned yesterday." Notes: a sea-view room on the 8th floor became free this morning; staff will move the bags within the hour; you have already called the engineer; you have spoken to housekeeping, and the new room will be cleaned every morning before 10; offer: a free dinner in the restaurant tonight. Respond to the guest. Apologise, explain what you have done or will do about each problem, and offer something to say sorry. Use the present perfect, will and polite language.',
          seconds: 60,
          model: `I'm really sorry about this, and thank you for telling me. First, the room. You're right, you booked a sea view, and we made a mistake. I've just checked, and a sea-view room on the eighth floor has become free this morning. Our staff will move your bags there in the next hour. Second, the air conditioner. I've already called our engineer, but you won't need that room any more. And I apologise that your room wasn't cleaned yesterday. I've spoken to our housekeeping team, and your new room will be cleaned every morning before ten. To say sorry, we'd like to offer you a free dinner in our restaurant tonight. Is that all right?`,
          marking: [
            'Language: apologies (I\'m really sorry, I apologise), the present perfect for actions just done (I\'ve checked, I\'ve called), will for promises and polite offers (we\'d like to offer), used accurately.',
            'Task: apologises, gives the action in the notes for each of the three problems, and makes the offer.',
            'Delivery: speaks for about one minute in a calm, polite tone, deals with the problems in order (first, second) and is easy to follow.',
          ],
        },
        {
          title: 'Task 3: Present and justify a recommendation',
          prompt: 'Green Leaf Tea has 20 million VND to promote its cold brew in December. Present the two options to your manager, Ms Ha, recommend one and explain why. Option A: a student loyalty card in all ten shops (cost 8 million VND; expected 600 new members; customers come back more often). Option B: tasting stands in five Sao Mai Mart supermarkets for two weekends (cost 18 million VND; about 3,000 shoppers try the cold brew; no information on how many will buy again). Use comparatives, if or unless, and phrases such as I recommend... because... .',
          seconds: 60,
          model: `I'd like to present two ways to promote our cold brew in December. Option A is a student loyalty card in all ten shops. It costs eight million dong, and we expect about six hundred new members. Option B is tasting stands in five Sao Mai Mart supermarkets. It's more expensive, at eighteen million, but it reaches more people: about three thousand shoppers. However, we don't know how many of them will buy again. I recommend Option A because it's much cheaper and it brings customers back again and again. If we choose it, we'll still have twelve million left for social media posts. Unless we build loyal customers, our sales won't stay high after the holidays.`,
          marking: [
            'Language: comparatives (cheaper, more expensive, more people), at least one correct if or unless sentence, and recommending language (I recommend... because...), used accurately.',
            'Task: presents both options with the figures on the card, recommends one and gives two reasons from the card.',
            'Delivery: speaks for about one minute with a clear structure (introduction, options, recommendation) and signposting (However, so, because).',
          ],
        },
      ],
    },
  ],
};

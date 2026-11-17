// English for Marketing Communication (ESP, CEFR B1–B1+): Midterm Examination, Units MK1–MK7.
// Every text, transcript, stem and task is new; it tests the unit vocabulary and grammar without reusing unit sentences.
// Green Leaf Tea facts follow docs/HANDOFF.md (nine shops after Phu Nhuan; cold brew sales Jan 1,500 to Jun 3,700; Sao Mai Mart from 2 June).
// Other businesses and people are fictional.

// [stem, [correct, wrong, wrong, wrong], explanation]  — the correct option is ALWAYS FIRST; the seed shuffles options.
export const MIDTERM = {
  title: 'Midterm Examination',
  minutes: 120,
  parts: [
    {
      id: 'L', title: 'Part 1, Listening', minutes: 25, weight: 25,
      instructions: 'You will hear four recordings. You will hear each recording twice. Before each recording, read the five questions. Choose the best answer (A, B, C or D) while you listen.',
      groups: [
        {
          title: 'Recording 1, A client explains an order to Linh from Green Leaf Tea',
          audio: `Thanks for coming, Linh. So, as I said on the phone, Teachers' Day is on the twentieth of November, and we'd like to give a small gift to every teacher at Bright Star English Centre. We have forty-five teachers... sorry, forty-eight now, because three new teachers joined last week. So, forty-eight boxes. We don't want anything too sweet. A lot of our teachers are trying to eat less sugar, so maybe your oolong and some tea biscuits, not the sweets. Each box should have a small card with our logo, in blue, not red. Our budget is about two hundred thousand dong per box. Oh, and the delivery. We're holding a small ceremony on the morning of the nineteenth, so the boxes have to arrive by the eighteenth at the latest. Could you send me two or three designs by this Friday? Then I'll choose one at the weekend. Honestly, last year we used another company and the boxes came late, so the date really matters most to us.`,
          items: [
            ['What is the main purpose of the talk?', ['To explain what the centre needs for a gift order', 'To complain about a late delivery from Green Leaf Tea', 'To invite Linh to a Teachers\' Day ceremony', 'To ask for a price list for tea biscuits'], 'The speaker describes the number of boxes, contents, card, budget and date: a client briefing. The late delivery last year was from another company.'],
            ['How many gift boxes does the centre need?', ['48', '45', '3', '20'], 'She first says 45, then corrects herself: 48, because three new teachers joined.'],
            ['Why does the speaker not want sweets in the boxes?', ['Many teachers want to eat less sugar.', 'Sweets are over the budget per box.', 'Most of the teachers prefer coffee to tea.', 'Sweets do not match the blue card.'], 'She says "A lot of our teachers are trying to eat less sugar."'],
            ['What is the latest date for the boxes to arrive?', ['18 November', '19 November', '20 November', 'This Friday'], 'The ceremony is on the 19th, so the boxes "have to arrive by the eighteenth at the latest". Friday is the date for the designs.'],
            ['What is most important to the speaker?', ['Getting the boxes on time', 'Paying the lowest possible price', 'Seeing many different designs', 'Using the colours of her logo'], 'She ends: "the date really matters most to us", because last year the boxes came late.'],
          ],
        },
        {
          title: 'Recording 2, A voicemail from a tea supplier to Ms Ha',
          audio: `Hello, Ms Ha, this is Tran from the tea farm in Bao Loc. It's Monday, about eight in the morning. I'm calling about this week's oolong order. I'm really sorry, but it has rained heavily here for four days, and the pickers can't work on the hills when it's this wet. So I can't send the full three hundred kilos on Wednesday, as we planned. What I can do is send two hundred kilos on Thursday, and the other hundred early next week, probably Tuesday. The quality is still fine, I promise. We're only picking on the dry mornings. If that's a problem for your new shop in Phu Nhuan, I could ask my cousin's farm for some extra leaves, but honestly, his oolong isn't as good as ours, so I'd rather not. Could you call me back before five this afternoon? I need to book the truck today. Thanks, and sorry again.`,
          items: [
            ['Why is the order late?', ['Heavy rain has stopped the pickers from working.', 'The truck that usually brings the tea has broken down.', 'The new shop in Phu Nhuan ordered more tea.', 'His cousin\'s farm has not sent the leaves.'], 'He says it has rained for four days and "the pickers can\'t work on the hills when it\'s this wet".'],
            ['How much tea can Mr Tran send on Thursday?', ['200 kilos', '300 kilos', '100 kilos', 'None at all'], 'He offers "two hundred kilos on Thursday, and the other hundred early next week". 300 kilos was the original plan for Wednesday.'],
            ['Why does Mr Tran say "I promise"?', ['To show Ms Ha that the tea is still good', 'To show that Thursday is a fixed date', 'To agree to buy leaves from his cousin', 'To ask Ms Ha to pay for the truck this time'], 'He wants to reassure her about quality: "The quality is still fine, I promise."'],
            ['What is Mr Tran\'s opinion of his cousin\'s oolong?', ['It is not as good as his own tea.', 'It is cheaper and usually arrives much faster.', 'It is better for the new shop.', 'It is the same quality as his.'], 'He says "his oolong isn\'t as good as ours, so I\'d rather not".'],
            ['What does Ms Ha need to do next?', ['Phone Mr Tran before 5 p.m. today', 'Book a truck for Thursday morning', 'Order extra leaves from another farm', 'Visit the farm on Tuesday next week'], 'He asks her to "call me back before five this afternoon" because he must book the truck himself.'],
          ],
        },
        {
          title: 'Recording 3, A short team meeting at Green Leaf Tea',
          audio: `Ms Ha: OK, let's start. I want to talk about the cold brew before Mr Minh's meeting next week. Dat, can you give us the figures?
Dat: Sure. We sold one thousand five hundred bottles in January, and sales rose steadily until May. May was our best month, with four thousand two hundred. Then June fell a little, to three thousand seven hundred.
Ms Ha: Even with the supermarkets?
Dat: Yes, but Sao Mai Mart only started selling it on the second of June, so it's too early to judge. And June was very rainy, so fewer people walked to our shops.
Linh: Could we try something for the rainy season? Maybe a delivery offer through our app?
Ms Ha: I like that. If we offer free delivery on two bottles, I think orders will go up. But we need numbers. Linh, can you write a one-page proposal with an objective and a budget?
Linh: Of course. I'll send it to you by Thursday.
Ms Ha: Great. I'll check it on Friday morning, before it goes to Mr Minh.`,
          items: [
            ['What is the meeting mainly about?', ['Cold brew sales and a rainy-season idea', 'Choosing new supermarkets for the cold brew', 'Preparing the slides for Mr Minh\'s presentation', 'Why customers prefer the app to the shops'], 'They review the cold brew figures and plan a delivery offer for the rainy season.'],
            ['How many bottles did Green Leaf Tea sell in June?', ['3,700', '4,200', '3,000', '1,500'], 'Dat says June "fell a little, to three thousand seven hundred". 4,200 was May; 1,500 was January.'],
            ['Why is Dat not very worried about the June figure?', ['The supermarket sales had only just begun.', 'The rainy season has already finished in most of the city.', 'The May figure was probably wrong.', 'Most customers now order on the app.'], 'He says Sao Mai Mart "only started selling it on the second of June, so it\'s too early to judge".'],
            ['What does Linh suggest?', ['A delivery offer through the app', 'Lower prices for the cold brew in the supermarkets', 'A second meeting with Mr Minh', 'More shops near the universities'], 'Linh asks, "Maybe a delivery offer through our app?" Ms Ha then adds the details.'],
            ['What will happen on Friday?', ['Ms Ha will read Linh\'s proposal.', 'Linh will send the proposal to Ms Ha.', 'The free delivery offer will start.', 'The team will meet Mr Minh.'], 'Linh sends it by Thursday; Ms Ha says, "I\'ll check it on Friday morning." Mr Minh\'s meeting is next week.'],
          ],
        },
        {
          title: 'Recording 4, A customer survey at the Green Leaf Tea shop in Phu Nhuan',
          audio: `Woman: Excuse me, do you have two minutes for a short survey? It's about our new shop.
Man: Sure, why not.
Woman: Thank you. How often do you come here?
Man: Two or three times a week, usually after work. My office is just down the street.
Woman: And how did you hear about the shop?
Man: A colleague told me. I don't really follow shops on social media.
Woman: What do you usually buy?
Man: The cold brew, mostly. I tried the milk tea once, but it was a bit too sweet for me.
Woman: OK. And what do you think of our poster by the door? The one with the students.
Man: Honestly? It's nice, but everyone in it looks about twenty. People like me, in our forties, might think the shop isn't for us. Maybe you could add some older customers.
Woman: That's really useful, thank you. One last question: what would make you come more often?
Man: Hmm, a loyalty card, I think. Something like buy nine drinks, get one free.
Woman: Great. Here's a voucher for a free biscuit.`,
          items: [
            ['Why does the woman speak to the man?', ['To ask for his opinions about the new shop', 'To sell him a loyalty card for the shop and the app', 'To invite him to follow the shop online', 'To explain the new drinks on the menu'], 'She asks him for a short survey "about our new shop".'],
            ['How did the man learn about the shop?', ['Someone he works with told him.', 'He saw a post on social media.', 'He noticed the poster by the door.', 'A student gave him a voucher.'], 'He says "A colleague told me" and does not follow shops on social media.'],
            ['Why does the man not usually buy milk tea?', ['He found it too sweet.', 'He thinks it costs too much.', 'It is only sold in the morning.', 'His colleague did not like it.'], 'He tried it once, "but it was a bit too sweet for me".'],
            ['According to the man, how old do the people in the poster look?', ['About twenty', 'In their forties', 'About thirty', 'Under fifteen'], 'He says "everyone in it looks about twenty". "In our forties" describes the man and people like him.'],
            ['What does the man suggest to make him come more often?', ['A card that gives him a free drink', 'A free biscuit with every cold brew', 'A poster with older customers on it', 'Longer opening hours after work'], 'He suggests a loyalty card: "buy nine drinks, get one free". The biscuit voucher is the woman\'s thank-you gift.'],
          ],
        },
      ],
    },
    {
      id: 'R', title: 'Part 2, Reading', minutes: 35, weight: 25,
      instructions: 'Read the four texts. For each question, choose the best answer (A, B, C or D). Answer from the information in the text.',
      groups: [
        {
          title: 'Text 1: An internal memo',
          text: `To: All staff, Go Vap bakery
From: Trang Le, Operations Manager, Sunny Oven Bakery
Date: 3 October
Subject: Being a good neighbour

Since our Go Vap bakery opened in August, sales have been better than we expected. However, last week the head of the residents' group sent us a polite letter. Neighbours are unhappy about two things: our delivery vans park on the pavement at 5 a.m., and the noise from the kitchen fans starts before 6 a.m.

Our neighbours are not only people who live near us; many of them are also our customers. If they lose trust in us, they will tell their friends, and our good start will not last. For this reason, the following rules start on Monday, 9 October.

First, drivers must park in the car park behind the market, not on the pavement. The market manager has agreed to this, and it costs us nothing. Second, kitchen staff have to keep the back door closed until 6 a.m. so that the noise stays inside. Our engineer is also going to fit quieter fans next month.

Finally, I think we should do something positive, not only fix problems. Shift leaders should invite the residents' group to a free tasting morning in November. Please send me your ideas for this event by 20 October.

Thank you for your help. If you have any questions, please talk to your shift leader first.

Trang`,
          items: [
            ['What is the main purpose of the memo?', ['To explain new rules after complaints from neighbours', 'To thank staff for the good sales since August', 'To announce the opening of a new bakery in Go Vap', 'To ask the market manager for more parking spaces for the vans'], 'The memo describes the neighbours\' two complaints and the rules that answer them.'],
            ['When do the new rules start?', ['9 October', '3 October', '20 October', 'In November'], '"The following rules start on Monday, 9 October." 3 October is the memo date; 20 October is the deadline for ideas.'],
            ['In paragraph 2, what does "them" in "many of them are also our customers" refer to?', ['the neighbours', 'the friends', 'the staff', 'the two problems'], '"Them" points back to "our neighbours" at the start of the sentence.'],
            ['In paragraph 3, "fit quieter fans" means', ['put quieter fans in place', 'test the fans more often', 'turn the fans off earlier in the morning', 'buy fans at a lower price'], 'An engineer "fits" equipment when he puts it in and connects it.'],
            ['According to the memo, who should invite the residents\' group to the tasting morning?', ['The shift leaders', 'Trang Le', 'The market manager', 'The engineer'], '"Shift leaders should invite the residents\' group to a free tasting morning." Staff send their ideas to Trang.'],
          ],
        },
        {
          title: 'Text 2: A short marketing proposal',
          text: `Proposal: Tet gift baskets for local companies
Prepared by: Vinh Nguyen, Sales and Marketing, Sweet Garden Dried Fruit
For: Ms Nhung Pham, Director

Background
Sweet Garden sells dried mango, banana and jackfruit from Can Tho in its two shops and online. Last Tet, 70% of our sales came from families. Only a few companies bought from us, although companies usually order in large numbers.

Objective
Our objective is to sell 800 gift baskets to at least 25 companies in Can Tho by 20 January.

Actions
1. In November, we will design a premium basket with four kinds of fruit and a card that each company can print its own logo on.
2. From 1 December, two sales staff are going to visit 60 local companies with free samples.
3. We will offer 10% off orders of 50 baskets or more.

Budget
The total budget is 45 million VND: 20 million for samples and travel, 15 million for basket design and printing, and 10 million for online adverts on business websites.

Expected results
If we reach our objective, Tet sales will be about 30% higher than last year. Company customers also tend to order the same gift every year, so this campaign could give us a steady income in the future. However, timing is important. Unless the sample visits finish before Christmas, many companies will choose gifts from our competitors.`,
          items: [
            ['What is the writer mainly asking the director to do?', ['Approve a Tet campaign aimed at companies', 'Open a third shop for company customers', 'Reduce the prices of all the gift baskets', 'Stop selling dried fruit to families at Tet'], 'The proposal sets an objective, actions and a budget for selling Tet baskets to companies.'],
            ['According to the Background, what was the problem last Tet?', ['Very few companies bought from Sweet Garden.', 'Families bought fewer baskets than they usually do at Tet.', 'The online shop did not work properly.', 'There was not enough dried jackfruit.'], '"Only a few companies bought from us", even though companies order in large numbers.'],
            ['In Action 1, what does "its" in "its own logo" refer to?', ['each company that buys a basket', 'Sweet Garden Dried Fruit', 'the premium basket', 'the card that goes inside the basket'], 'The card is for the buyer: "each company can print its own logo on" it.'],
            ['How much money will Sweet Garden spend on online adverts?', ['10 million VND', '15 million VND', '20 million VND', '45 million VND'], 'The budget gives "10 million for online adverts on business websites". 45 million is the total.'],
            ['In Expected results, "Company customers also tend to order the same gift every year" means that they', ['usually, but not always, order the same gift again', 'always order exactly the same gift every year', 'have promised to order again next year', 'rarely order the same gift twice'], '"Tend to" is a hedge: it means "usually", not "always" or "definitely".'],
          ],
        },
        {
          title: 'Text 3: A customer profile',
          text: `Customer profile: the city running crowd
Prepared for Stride Sports, District 7

Who they are
Ten years ago, few people in Ho Chi Minh City ran for fun. Today, running has become a subculture with its own clothes, apps and events. Our main target customers are office workers aged 24 to 35 who run three or four times a week, usually before 6 a.m., when the air is cooler. Most of them earn a good salary, but they do not see themselves as rich.

Values
For this group, running is not only about health. It is a way to manage stress and to belong to a community. Many runners join clubs that meet in parks or in the new urban areas, and they care a lot about sharing their progress. As one runner joked, a run that is not posted online "did not happen".

Buying habits
These customers research carefully before they buy. They read reviews, compare prices online and ask club members for advice. They will pay more for shoes that last longer, but they rarely buy expensive fashion items. They often buy in groups when a club organises an order, which gives them a lower price.

What this means for us
Adverts with famous athletes do not work well with this group; they trust real runners more. We should support local clubs, offer a club discount and share honest product tests on social media.`,
          items: [
            ['What is the text mainly about?', ['The habits and values of a group Stride Sports wants to reach', 'The history of running events and clubs in Ho Chi Minh City since ten years ago', 'How to choose the best running shoes for beginners', 'Why office workers in District 7 feel a lot of stress'], 'It describes who the runners are, what they value and how they buy, then what this means for Stride Sports.'],
            ['When do most of these customers usually run?', ['Early in the morning', 'In the evening after work', 'Only at the weekend', 'During their lunch break'], '"Usually before 6 a.m., when the air is cooler."'],
            ['What does the runner\'s joke in paragraph 2 show?', ['Posting their runs online matters a lot to them.', 'Many runners do not tell the truth about their runs.', 'Runners think social media is a waste of time.', 'Club members often forget to record their runs.'], 'The joke follows "they care a lot about sharing their progress".'],
            ['Which statement about their buying habits is true?', ['They will spend more on shoes that last.', 'They often buy expensive fashion items.', 'They rarely compare prices before buying.', 'They usually shop alone, not with clubs.'], '"They will pay more for shoes that last longer." The other options contradict the text.'],
            ['What does the writer advise Stride Sports to do?', ['Work with local running clubs', 'Hire a famous athlete for its adverts', 'Open more shops near the parks', 'Sell more fashion items online'], '"We should support local clubs" because famous athletes "do not work well with this group".'],
          ],
        },
        {
          title: 'Text 4: An email with feedback on an advert',
          text: `Subject: Feedback on the new FitPlus poster

Dear Mr Son,

Thank you for sending the draft poster for your second FitPlus gym in Binh Thanh. The design is bright and modern, and the price (390,000 VND a month) is very clear. However, I have a few concerns before it goes to print.

First, all six people in the photo are young, slim and already very fit. Your own data shows that over 40% of your members are beginners, and many are over 45. These people might feel that the gym is not for them. It might be better to show a wider range of members, for example an older couple or someone in the stretching area.

Second, the slogan "No pain, no gain. Only the strong belong here" could sound offensive to people who are just starting or who have health problems. Why don't we choose something more welcoming, such as "Stronger every week, at your own speed"?

Third, the gym has a lift and wide doors, which is great, but the poster does not mention it. A small wheelchair symbol and the words "easy access" would tell customers with disabilities that they are welcome.

I know the printing deadline is next Wednesday, so I will send you two new slogans by Friday. If you agree, our designer can update the photo early next week.

Best regards,
Hieu Dang
Bloom Creative Agency`,
          items: [
            ['What is the main purpose of Hieu\'s email?', ['To politely point out problems and suggest changes', 'To tell Mr Son that the poster is ready to print next Wednesday', 'To ask Mr Son for the gym\'s membership data', 'To explain the price of a new gym membership'], 'Hieu gives three concerns, each with a polite suggestion.'],
            ['What does Hieu like about the draft poster?', ['The price is easy to see.', 'The slogan sounds friendly.', 'The photo shows real members.', 'It mentions the easy access.'], 'He says the design is bright and modern "and the price ... is very clear".'],
            ['According to the gym\'s data, what share of FitPlus members are beginners?', ['Over 40%', 'Over 45%', 'About 20%', 'Six out of ten'], '"Over 40% of your members are beginners." 45 is an age ("many are over 45"); six is the number of people in the photo.'],
            ['In paragraph 4, what does "it" in "the poster does not mention it" refer to?', ['the gym\'s easy access', 'the stretching area for members', 'the monthly price', 'the new slogan'], '"It" refers to the lift and wide doors, which give easy access.'],
            ['What will Hieu do next?', ['Send two slogans by Friday', 'Print the poster on Wednesday', 'Update the photo before Friday', 'Visit the new gym in Binh Thanh'], 'He writes, "I will send you two new slogans by Friday." The photo update comes next week, if Mr Son agrees.'],
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
            ['The bank, the landlord and the people next door are all ___ by the new café, so they are its stakeholders.', ['affected', 'effected', 'affecting', 'effect'], 'The passive "be affected by" needs the past participle of the verb "affect". "Effect" is usually a noun.'],
            ['Our ___ in Ben Tre delivers 500 fresh coconuts to the juice bar every morning.', ['supplier', 'client', 'competitor', 'customer'], 'A supplier sells and delivers goods to a business. A client or customer buys from it.'],
            ['K-pop fans in Ha Noi form a ___ with its own fashion, language and meeting places.', ['subculture', 'stereotype', 'target market', 'briefing'], 'A subculture is a smaller group inside a culture with its own habits.'],
            ['The new menu comes in Braille and large print, so it is more ___ for customers with poor eyesight.', ['inclusive', 'offensive', 'premium', 'external'], 'Inclusive means it includes and respects different kinds of people.'],
            ['Our cheap phone cases are aimed ___ secondary school students who like bright colours.', ['at', 'to', 'for', 'on'], 'The collocation is "aimed at" (also "targeted at"): it names the group a product is for.'],
            ['The print shop needs the final design by 5 p.m. on Tuesday. It is a tight ___, so please do not be late.', ['deadline', 'briefing', 'supplier', 'proposal'], 'A deadline is the latest time to finish something; "a tight deadline" is a common collocation.'],
            ['The campaign ___ its objective: we reached 2,000 new followers on our page by the end of March.', ['met', 'did', 'made', 'won'], 'We "meet" (or "reach", "achieve") an objective. "Do", "make" and "win" do not collocate with "objective".'],
          ],
        },
        {
          title: 'Grammar',
          items: [
            ['Our menu ___ of three parts: drinks, cakes and snacks.', ['consists', 'is consisting', 'consist', 'is consist'], 'A fact about how something is organised takes the present simple; "menu" is singular, so "consists of".'],
            ['Parking at the shop is free, so customers ___ pay for it.', ['don\'t have to', 'mustn\'t', 'have to', 'must'], '"Don\'t have to" means it is not necessary. "Mustn\'t" would mean it is not allowed.'],
            ['Can you bring the price list ___ you showed the client yesterday?', ['that', 'who', 'where', 'what'], 'A defining relative clause about a thing uses "that" or "which". "Who" is for people.'],
            ['The poster only shows models. It might be better ___ a photo of real customers.', ['to use', 'using', 'use', 'used'], 'After "it might be better" we use "to" + base verb.'],
            ['At 1.2 million VND, the lacquer box is ___ gift in our Tet range.', ['the most expensive', 'more expensive', 'the more expensive', 'most expensive than'], 'Comparing one item with the whole range needs a superlative: "the most" + long adjective.'],
            ['A: The office printer isn\'t working again. B: Oh no. I ___ the files to the copy shop, then.', ['\'ll take', 'am taking', 'take', 'took'], 'B decides at the moment of speaking, so we use "will". The present continuous is for arrangements made earlier.'],
            ['If we ___ the price of the drink, more students will buy it.', ['lower', 'will lower', 'lowered', 'are lower'], 'In the first conditional, the if-clause takes the present simple, not "will".'],
            ['___ we finish the design today, we will miss the printing deadline.', ['Unless', 'If', 'When', 'Because'], '"Unless" means "if ... not": if we do not finish today, we will miss the deadline.'],
          ],
        },
      ],
    },
    {
      id: 'W', title: 'Part 4, Writing', minutes: 35, weight: 20,
      instructions: 'Complete both tasks. Write in full sentences and include all three content points. Spend about 15 minutes on Task 1 and about 20 minutes on Task 2.',
      tasks: [
        {
          title: 'Task 1: An email to a printing company about a changed order',
          prompt: 'You are a marketing assistant at Green Leaf Tea. Last week you ordered 3,000 leaflets for the cold brew delivery offer from Mr Hung at Lam Son Printing, for delivery on 15 October. Your manager now wants more leaflets. Write an email to Mr Hung. In your email: 1) explain the change to the order (5,000 leaflets, same design); 2) ask if he can still deliver by 15 October, or suggest another date; 3) ask him to send a final draft before printing, and say when you will reply. Write about 100 words.',
          words: 100,
          model: `Subject: Change to our leaflet order

Dear Mr Hung,

I am writing about our order of 3,000 leaflets for the cold brew delivery offer. My manager has decided that we need more, so we would like to change the order to 5,000 leaflets. The design will stay the same.

Could you let me know if you can still deliver all 5,000 by 15 October? If that is difficult, 17 October would also be fine for us.

Before you print, could you please send me the final draft? I will check it and reply on the same day.

Thank you for your help.

Best regards,
Linh
Green Leaf Tea`,
          marking: [
            'Language: polite request forms (Could you...?, Could you please...?, I would like to...) and will for promises (I will check...), accurate, at least three times; numbers and dates written correctly.',
            'Task: includes all three points from the instructions (5,000 leaflets, same design; delivery by 15 October or another date; request for a final draft and a time to reply).',
            'Organisation: email format with a subject line, greeting, a clear opening sentence, one idea per paragraph and a polite closing.',
          ],
        },
        {
          title: 'Task 2: Part of a campaign proposal',
          prompt: 'May Ceramics is a small pottery workshop in District 3, Ho Chi Minh City. It runs two-hour pottery classes (350,000 VND per person), but most customers are tourists, and few young local people come. The owner, Ms Thu, asks you to turn her notes into three sections of a campaign proposal with the headings Objective, Actions and Expected results. Notes: Objective: sell 300 class places to university students and young office workers by 30 November. Action 1 (September): "Bring a friend" deal, two people for 600,000 VND; short social media videos of students making their first cups; cost 18 million VND. Action 2 (from October): Friday evening classes, 6 to 8 p.m.; flyers at five universities and two co-working spaces; cost 12 million VND. Expected results: about 40% of customers will be young local people by the end of November; students will post their pottery online; risk: the videos must start in early September, or students will not hear about the offer before their exams. Use: to + verb for the objective; will / be going to for the actions; at least one sentence with "if" and one with "unless" for the results. Write about 150 words.',
          words: 150,
          model: `Objective
Our objective is to sell 300 class places to university students and young office workers in Ho Chi Minh City by 30 November.

Actions
1. In September, we are going to offer a "Bring a friend" deal: two people can join one class for 600,000 VND. We will promote it with short videos on social media that show students making their first cups. Cost: 18 million VND.
2. From October, we will run evening classes on Friday from 6 to 8 p.m., which is easier for office workers. We will give flyers to five universities and two co-working spaces nearby. Cost: 12 million VND.

Expected results
If the campaign works, about 40% of our customers will be local young people by the end of November. Many of them will post their pottery online, so more people will hear about the workshop for free. However, unless we start the videos in early September, many students will not hear about the offer before their exams begin.`,
          marking: [
            'Language: to + verb objectives with number and date; will/if/unless for actions and results, accurate',
            'Task: transfers all the notes accurately under the right headings',
            'Organisation: headings, short paragraphs, formal tone',
          ],
        },
      ],
    },
    {
      id: 'S', title: 'Part 5, Speaking', minutes: 10, weight: 15,
      instructions: 'There are three tasks. Your answers are recorded in the browser. For each task, read the card and prepare for 30 seconds, then speak for about 1 minute. You may make short notes but do not read a full script.',
      tasks: [
        {
          title: 'Task 1: Compare two packaging options',
          prompt: 'Coco Crunch, a coconut biscuit company in Ben Tre, wants new packaging for students. Compare the two options and say which one you recommend and why. Option A: paper bag, 15,000 VND, 120 g, easy to recycle, simple brown colour. Option B: metal tin, 32,000 VND, 200 g, can be used again as a pencil box, bright colours. Use comparatives and superlatives.',
          seconds: 60,
          model: `I'm going to compare the two options for Coco Crunch. The paper bag is much cheaper than the tin. It costs fifteen thousand dong, so it's more affordable for students. It's also easier to recycle, which many young people care about. On the other hand, the tin is bigger, with two hundred grams of biscuits, and it looks more attractive because the colours are brighter. Students can use it again as a pencil box. But it's more than twice as expensive. For students, I think price is the most important thing, so I recommend the paper bag. Maybe the company could add a brighter logo to make it more eye-catching.`,
          marking: [
            'Language: comparatives and superlatives (cheaper than, more attractive, twice as expensive, the most important) used accurately at least four times.',
            'Task: compares at least three features from the card and gives a recommendation with a reason.',
            'Delivery: speaks for about one minute with clear organisation (first, on the other hand, so) and pronunciation that a listener can follow easily.',
          ],
        },
        {
          title: 'Task 2: Give your opinion on an advert',
          prompt: 'A motorbike rental shop in Da Nang has a new advert. It shows only young men riding fast on mountain roads, with the slogan "Real men ride Thunder Bikes." Facts: 35% of renters are women and families; 20% of renters are over 50; nobody in the advert wears a helmet. Using these facts, give your opinion of the advert, say which renters it leaves out, and politely suggest two changes. Use: could, might, it might be better to, why don\'t we.',
          seconds: 60,
          model: `In my opinion, the advert is exciting, but it has some problems. First, it only shows young men, but thirty-five per cent of renters are women and families, and twenty per cent are over fifty. These customers might feel that this shop isn't for them. Second, nobody is wearing a helmet, so the advert could send a dangerous message. I have two suggestions. The advert could show a wider range of riders, for example two female friends or an older couple. And it might be better to use a more inclusive slogan, such as "Your journey, your way." Why don't we also show riders wearing helmets?`,
          marking: [
            'Language: polite criticism and suggestion forms (could, might, it might be better to + verb, why don\'t we + verb) used accurately at least three times.',
            'Task: gives an opinion, uses the facts on the card to say who is left out, and makes two suggestions.',
            'Delivery: speaks for about one minute, sounds polite rather than rude, links ideas clearly (first, second, also) with understandable pronunciation.',
          ],
        },
        {
          title: 'Task 3: Explain a plan to your manager',
          prompt: 'You are on the Green Leaf Tea marketing team. Explain your plan for a rainy-season app offer to your manager. Notes: free delivery on two cold brew bottles; offer starts on 20 October; meeting with the app designer on Monday at 10 a.m.; objective: 1,000 app orders by 30 November; risk: few people will know about it without social media posts; next step: prepare three posts this week and send them to your manager by Friday. Use will, be going to, the present continuous for arrangements, and if or unless.',
          seconds: 60,
          model: `I'd like to explain our plan for the rainy season. We're going to offer free delivery on two bottles of cold brew through our app. The offer starts on the twentieth of October. I'm meeting the app designer on Monday at ten, and we're going to add a banner on the home screen. Our objective is one thousand app orders by the thirtieth of November. If the offer works, I think customers will keep using the app after the rain stops. But there is one risk. Unless we post about the offer on social media, few people will know about it. So I'll prepare three posts this week and send them to you by Friday.`,
          marking: [
            'Language: future forms used accurately (be going to for plans, present continuous for the Monday meeting, will for promises) and at least one correct if or unless sentence.',
            'Task: includes all the points in the notes (offer, start date, meeting, objective, risk) and ends with the next step from the notes.',
            'Delivery: speaks for about one minute in a logical order with clear numbers and dates and understandable pronunciation.',
          ],
        },
      ],
    },
  ],
};

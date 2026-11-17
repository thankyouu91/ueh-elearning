// ESP, English for Marketing Communication (CEFR B1–B1+), units MK1–MK4.
// Marketing is the context; every item tests English. Running case: Green Leaf Tea (Trà Lá Xanh).
import { C, O, M, READ, LISTEN, SPEAK, WRITE, USE } from './helpers.js';

// [unitId, stem, options (FIRST option = correct answer; the seed shuffles them), bloom]
export const Q = [
  ['MK1', 'Choose the correct verb: "Our products ___ into three groups: tea, snacks and gift boxes."', ['are divided', 'divide', 'is divided', 'are dividing'], 'Remember'],
  ['MK1', 'Which word means a person or group that is affected by a business and cares about it?', ['stakeholder', 'competitor', 'advertiser', 'retailer'], 'Remember'],
  ['MK1', 'What is the difference? A: "The team consists of Linh and Nam." B: "The team includes Linh and Nam."', ['A gives the complete list of members; B may give only some of them.', 'A describes the past; B describes the present.', 'B is more formal than A.', 'A is correct, but B is a grammar mistake.'], 'Understand'],
  ['MK1', 'What does "The internal group consists of owners, managers and staff" mean?', ['Owners, managers and staff are the parts of the internal group.', 'Owners, managers and staff disagree with the internal group.', 'The internal group is bigger than the external group.', 'Only managers belong to the internal group.'], 'Understand'],
  ['MK1', 'Choose the correct sentence.', ['Our external stakeholders include customers and suppliers.', 'Our external stakeholders includes customers and suppliers.', 'Our external stakeholders are include customers and suppliers.', 'Our external stakeholders including customers and suppliers.'], 'Apply'],
  ['MK1', 'A writer says: "The internal group is consist of the founder, the managers and the staff." What is wrong with this sentence?', ['"is consist of" should be "consists of".', '"of" should be "from".', '"is" should be "are".', 'Nothing is wrong with it.'], 'Analyze'],

  ['MK2', 'Which word expresses a strong rule or obligation?', ['must', 'should', 'might', 'could'], 'Remember'],
  ['MK2', 'Which part of a memo tells the reader what the memo is about in a few words?', ['The subject line', 'The signature', 'The closing sentence', 'The date'], 'Remember'],
  ['MK2', `What does "You don't have to wear a uniform on Saturday" mean?`, ['It is not necessary to wear a uniform on Saturday.', 'You are not allowed to wear a uniform on Saturday.', 'You must wear a uniform on Saturday.', 'You should probably wear a uniform on Saturday.'], 'Understand'],
  ['MK2', 'Why do memos usually use "should" for suggestions and "must" for rules?', ['To show the reader which actions are required and which are only advised', 'To make the memo longer and more formal', 'Because "must" is more polite than "should"', 'Because memos cannot use the imperative'], 'Understand'],
  ['MK2', 'Complete the memo: "All staff ___ attend the safety briefing on Monday. It is required by law."', ['have to', 'might', `don't have to`, 'could'], 'Apply'],
  ['MK2', 'Complete the sentence: "Suppliers expect ___ payment, so we must pay within 30 days."', ['on-time', 'late', 'loyal', 'external'], 'Apply'],

  ['MK3', 'Which relative pronoun do we use for people?', ['who', 'which', 'where', 'what'], 'Remember'],
  ['MK3', 'Which word means a smaller group with its own habits inside a bigger culture?', ['subculture', 'segment price', 'stakeholder', 'slogan'], 'Remember'],
  ['MK3', 'In "This is a gift box which families buy for Tet", what does "which" refer to?', ['a gift box', 'families', 'Tet', 'buying'], 'Understand'],
  ['MK3', 'Choose the correct sentence for the "buying habits" part of a customer profile.', ['They usually order online in the evening.', 'They order usually online in the evening.', 'They are usually order online in the evening.', 'They usually ordering online in the evening.'], 'Apply'],
  ['MK3', 'Join the sentences: "We sell a cold-brew tea. It has only 4 g of sugar."', ['We sell a cold-brew tea which has only 4 g of sugar.', 'We sell a cold-brew tea who has only 4 g of sugar.', 'We sell a cold-brew tea which it has only 4 g of sugar.', 'We sell a cold-brew tea where has only 4 g of sugar.'], 'Apply'],
  ['MK3', 'Which sentence uses ONE correct defining relative clause to say exactly which customers we mean?', ['We target office workers who buy a cold drink after lunch.', 'We target office workers, and they buy a cold drink after lunch.', 'We target office workers who they buy a cold drink after lunch.', 'We target office workers which buy a cold drink after lunch.'], 'Analyze'],

  ['MK4', 'Which phrase makes a polite suggestion?', ['It might be better to', 'You must', 'This is wrong', 'Never do'], 'Remember'],
  ['MK4', 'Which word means a fixed and often unfair idea about a group of people?', ['stereotype', 'campaign', 'target market', 'feedback'], 'Remember'],
  ['MK4', `Why is "The advert could show older customers too" more polite than "Your advert is bad"?`, ['It gives a helpful idea without attacking the designer.', 'It is shorter.', 'It uses the past tense.', 'It does not mention the advert.'], 'Understand'],
  ['MK4', 'In feedback, what does "I\'m not sure this is the right message" mean?', ['The writer politely thinks the message is a problem.', 'The writer does not know what the message says.', 'The writer agrees with the message.', 'The writer wants a longer message.'], 'Understand'],
  ['MK4', 'Complete the sentence: "Why don\'t we ___ a woman as the farm owner in the video?"', ['show', 'to show', 'showing', 'shows'], 'Apply'],
  ['MK4', 'A slogan says: "So easy, even your grandma can order it!" Which comment to the designer is the most polite and correct?', ['It might be better to use a slogan for every age.', 'It might be better use a slogan for every age.', 'You must to change this slogan.', 'This slogan is bad. Change it.'], 'Analyze'],
];

// [term, Vietnamese, definition, unitId, part of speech, word family, example, collocations]
export const VOCAB = [
  ['stakeholder', 'bên liên quan', 'a countable noun for a person or group that a company works with or affects; we say "stakeholders of + company"', 'MK1', 'n', 'stake (n), stakeholder (n)', 'Tea farmers in Bao Loc are important stakeholders of Green Leaf Tea.', 'key stakeholder, stakeholder group, talk to stakeholders'],
  ['internal', 'nội bộ', 'an adjective used before a noun to mean "inside the company"; the opposite is "external"', 'MK1', 'adj', 'internal (adj), internally (adv)', 'Our internal stakeholders are the owners, managers and staff.', 'internal group, internal meeting, internal memo'],
  ['external', 'bên ngoài', 'an adjective used before a noun to mean "outside the company"; the opposite is "internal"', 'MK1', 'adj', 'external (adj), externally (adv)', 'Customers and suppliers are external stakeholders.', 'external partner, external group, work with external partners'],
  ['supplier', 'nhà cung cấp', 'a person or company that sells goods to a business; we say "a supplier of + goods"', 'MK1', 'n', 'supply (v), supply (n), supplier (n)', 'Mr Tran is our main supplier of tea leaves in Bao Loc.', 'main supplier, local supplier, supplier of tea'],
  ['consist of', 'bao gồm', 'a verb for giving ALL the parts of a group; always followed by "of" and not used in the -ing form for facts', 'MK1', 'v', 'consist of (v), be made up of (similar phrase)', 'The marketing team consists of three people.', 'consist mainly of, consist entirely of, consist of three parts'],
  ['community', 'cộng đồng', 'the people who live in one area; often used with "local"', 'MK1', 'n', 'community (n), communities (pl)', 'Green Leaf Tea gives free tea at community events in Da Lat.', 'local community, community event, support the community'],
  ['be divided into', 'được chia thành', 'a passive phrase for saying how many groups something has; followed by a number or a list', 'MK1', 'v', 'divide (v), division (n), divided (adj)', 'Our stakeholders are divided into two groups.', 'be divided into two groups, be divided into three parts, be divided equally'],

  ['relationship', 'mối quan hệ', 'the way two people or groups work together and behave towards each other', 'MK2', 'n', 'relate (v), relation (n), relationship (n), related (adj)', 'We want a long-term relationship with our tea farmers.', 'build a relationship, strong relationship, long-term relationship'],
  ['expect', 'kỳ vọng', 'to think that something should happen or that you should receive something', 'MK2', 'v', 'expect (v), expectation (n), expected (adj)', 'Customers expect fresh tea at a fair price.', 'expect payment, customer expectations, meet expectations'],
  ['trust', 'sự tin tưởng', 'the belief that someone is honest and will do what they promise', 'MK2', 'n', 'trust (n), trust (v), trustworthy (adj)', 'Paying suppliers on time helps us keep their trust.', 'build trust, earn trust, lose trust'],
  ['obligation', 'nghĩa vụ', 'something you must do because of a rule, a law or a promise', 'MK2', 'n', 'oblige (v), obligation (n), obligatory (adj)', 'The company has an obligation to keep its workplace safe.', 'legal obligation, meet an obligation, have an obligation to'],
  ['memo', 'bản ghi nhớ nội bộ', 'a short written message sent to people inside a company', 'MK2', 'n', 'memo (n), memorandum (n)', 'Ms Ha sent a memo to all shop staff about the new uniform.', 'send a memo, internal memo, memo to staff'],
  ['loyal', 'trung thành', 'continuing to support or buy from the same person or company', 'MK2', 'adj', 'loyalty (n), loyal (adj), loyally (adv)', 'Loyal customers come back to our District 3 shop every week.', 'loyal customer, loyal staff, customer loyalty'],
  ['fair', 'công bằng', 'treating people equally and in the right way', 'MK2', 'adj', 'fairness (n), fair (adj), fairly (adv)', 'We pay our farmers a fair price for their tea leaves.', 'fair price, fair wage, fair treatment'],

  ['culture', 'văn hóa', 'the customs and way of life of a group of people; we say "in Vietnamese culture"', 'MK3', 'n', 'culture (n), cultural (adj), culturally (adv)', 'In Vietnamese culture, people often give tea as a gift at Tet.', 'local culture, cultural values, cultural differences'],
  ['subculture', 'tiểu văn hóa', 'a smaller group inside a culture with its own habits; we say "belong to a subculture"', 'MK3', 'n', 'culture (n), subculture (n)', 'Young coffee-shop workers in the city form their own subculture.', 'youth subculture, city subculture, belong to a subculture'],
  ['habit', 'thói quen', 'something you do often and regularly', 'MK3', 'n', 'habit (n), habitual (adj), habitually (adv)', 'Many students have the habit of ordering drinks online at night.', 'buying habits, daily habit, change a habit'],
  ['target customer', 'khách hàng mục tiêu', 'the kind of person a company most wants to sell to; usually plural and often followed by a who-clause', 'MK3', 'n', 'target (n), target (v), targeted (adj)', 'Our target customers for the cold-brew bottle are office workers aged 25 to 35.', 'main target customer, reach target customers, target customer profile'],
  ['profile', 'hồ sơ, chân dung', 'a short description of a person or group', 'MK3', 'n', 'profile (n), profile (v)', 'Linh wrote a profile of the typical gift-box buyer.', 'customer profile, write a profile, detailed profile'],
  ['value', 'giá trị', 'a belief about what is important in life; usually plural ("values") in this meaning', 'MK3', 'n', 'value (n), value (v), valuable (adj)', 'Family is an important value for our gift-box customers.', 'shared values, family values, personal values'],
  ['influence', 'ảnh hưởng', 'to change how someone thinks or acts', 'MK3', 'v', 'influence (n), influence (v), influential (adj)', 'Friends on social media influence what young people buy.', 'strongly influence, influence a decision, have an influence on'],

  ['stereotype', 'khuôn mẫu, định kiến rập khuôn', 'a fixed and often unfair idea about what a type of person is like', 'MK4', 'n', 'stereotype (n), stereotype (v), stereotypical (adj)', 'The advert used a stereotype that only women cook.', 'gender stereotype, avoid stereotypes, negative stereotype'],
  ['prejudice', 'thành kiến', 'an unfair opinion about a person or group that is not based on facts', 'MK4', 'n', 'prejudice (n), prejudiced (adj)', 'An advert should not show prejudice against older people.', 'show prejudice, racial prejudice, prejudice against'],
  ['inclusive', 'hòa nhập, bao trùm', 'including and respecting many different kinds of people', 'MK4', 'adj', 'include (v), inclusion (n), inclusive (adj)', 'Our new poster is more inclusive: it shows young and old customers.', 'inclusive advert, inclusive language, more inclusive'],
  ['offensive', 'xúc phạm', 'likely to make people upset or angry', 'MK4', 'adj', 'offend (v), offence (n), offensive (adj)', 'Some customers found the joke in the video offensive.', 'offensive joke, find something offensive, offensive to'],
  ['neutral', 'trung lập', 'not taking any side and not showing strong feelings', 'MK4', 'adj', 'neutrality (n), neutral (adj), neutrally (adv)', 'It might be better to use a more neutral slogan.', 'neutral language, neutral image, stay neutral'],
  ['represent', 'đại diện, thể hiện', 'to show or describe a person or group in a picture or text', 'MK4', 'v', 'represent (v), representation (n), representative (adj)', 'The video should represent customers from different regions.', 'represent fairly, represent a group, fair representation'],
  ['feedback', 'phản hồi, góp ý', 'comments about how good or useful something is and how to improve it', 'MK4', 'n', 'feedback (n)', 'Linh gave the designer polite feedback on the poster.', 'give feedback, positive feedback, feedback on'],
];

// [id, unitId, name, vietnameseName, form, use, useVi, examples, watchOut]
export const GRAMMAR = [
  ['G-MK1', 'MK1', 'Present simple for facts and classifying', 'Thì hiện tại đơn để nêu sự thật và phân loại',
    'subject + verb (-s with he, she, it), X consists of A, B and C, X is divided into, X includes',
    'Use the present simple to describe facts that are always true and to say how a group is organised.',
    'Dùng thì hiện tại đơn để mô tả sự thật luôn đúng và cách một nhóm được phân chia, phân loại.',
    ['Our stakeholders are divided into two groups.', 'The internal group consists of owners, managers and staff.', 'External stakeholders include customers, suppliers and the local community.'],
    'Say "consists of", never "is consist of" or "consists" without "of". "Include" has no "of": "includes customers", not "includes of customers".'],
  ['G-MK2', 'MK2', 'Must, have to and should', 'Must, have to và should',
    'must + verb, have to / has to + verb, should + verb, don\'t have to + verb (not necessary), mustn\'t + verb (not allowed)',
    'Use must and have to for rules and strong obligation; use should for advice. Use don\'t have to when something is not necessary.',
    'Dùng must và have to cho quy định và nghĩa vụ bắt buộc; dùng should để khuyên. Dùng don\'t have to khi một việc không cần thiết.',
    ['We must pay suppliers within 30 days.', 'Staff have to attend the briefing on Monday.', 'We should invite the community to the opening.'],
    'Do not add "to" after must or should: "must pay", not "must to pay". "Don\'t have to" (not necessary) is different from "mustn\'t" (not allowed).'],
  ['G-MK3', 'MK3', 'Defining relative clauses with who, which and that', 'Mệnh đề quan hệ xác định với who, which và that',
    'noun (person) + who / that + verb, noun (thing) + which / that + verb',
    'Use a defining relative clause to say exactly which person or thing you mean. Use who for people and which for things; that can replace both.',
    'Dùng mệnh đề quan hệ xác định để chỉ rõ người hoặc vật nào. Dùng who cho người, which cho vật; that có thể thay cho cả hai.',
    ['Our target customers are students who study in District 3.', 'This is a gift box which families buy for Tet.', 'We need a drink that office workers can carry easily.'],
    'Do not repeat the subject inside the clause: "a tea which has only 4 g of sugar", not "a tea which it has only 4 g of sugar". Do not use "which" for people.'],
  ['G-MK4', 'MK4', 'Polite criticism and suggestions', 'Phê bình và góp ý lịch sự',
    'could + verb, might + verb, it might be better to + verb, why don\'t we + verb, I\'m not sure that + clause',
    'Use soft modal verbs and question forms to point out a problem and suggest a change without sounding rude.',
    'Dùng động từ khiếm khuyết nhẹ nhàng và câu hỏi để chỉ ra vấn đề và gợi ý thay đổi mà không gây mất lòng.',
    ['The advert could show older customers too.', 'It might be better to use a more neutral slogan.', 'Why don\'t we show a woman as the farm owner?'],
    'After "why don\'t we" use the base verb: "why don\'t we change", not "why don\'t we to change". After "it might be better" use "to" + verb.'],
];

// [id, type, unitId, title, minutes, body]
export const LIB = [
  ['R-MKA-01', 'activity', 'MK1', 'Stakeholder map pitch', 30,
    'Target language: be divided into, consist of, include (present simple). Task: map and present the stakeholders of a real local business type. Step 1: in groups of three, choose a business (a bubble tea shop, a bakery, a phone repair shop). Step 2: draw two circles, internal and external, and write at least six stakeholders. Step 3: prepare a one-minute talk using "Our stakeholders are divided into...", "The internal group consists of..." and "External stakeholders include...". Step 4: each group presents; listeners tick each target phrase they hear and note one verb-form mistake (for example "consist" without -s or "include of"). Step 5: the class votes for the talk that used all three phrases most accurately.'],
  ['R-MKA-02', 'worksheet', 'MK1', 'Classifying with the present simple', 25,
    'Target language: present simple with consist of, include and be divided into. Part A: underline the verbs in six sentences about Green Leaf Tea and correct the three wrong ones (for example "The team consist of four people"). Part B: sort twelve sentence beginnings by the word that must come next: "consists ___" (of), "are divided ___" (into) or "includes ___" (no extra word), then finish one sentence of each type. Part C: write a five-sentence stakeholder description of your faculty at UEH using consist of, include and be divided into. Swap with a partner and check each verb form.'],
  ['R-MKA-03', 'activity', 'MK2', 'Stakeholder expectations role-play', 35,
    'Target language: must, have to, don\'t have to, should. Task: a short meeting between Green Leaf Tea and one stakeholder. Step 1: in pairs, one student is Ms Ha; the other chooses a role card (supplier, shop worker, neighbour of the new shop). Step 2: the stakeholder explains two things they expect. Step 3: Ms Ha answers with what the company must do, has to do and should do. Step 4: change roles with a new card. Step 5: two pairs perform for the class, and listeners note every must, have to and should they hear.'],
  ['R-MKA-04', 'practical', 'MK2', 'Write the memo together', 30,
    'Target language: must, have to, should in a memo; memo phrases ("This memo explains...", "Please contact me..."). The class writes one memo together before students write alone. Step 1: the lecturer shows a situation: the District 7 shop will close early on Friday for a staff training session. Step 2: students suggest the subject line and the purpose sentence. Step 3: in pairs, they list three actions staff must or should take. Step 4: the class builds the memo on the board, checking each modal verb. Step 5: students compare it with the unit model memo and name one difference.'],
  ['R-MKA-05', 'activity', 'MK3', 'Guess the customer', 30,
    'Target language: defining relative clauses with who, which and that. Task: describe a customer group so that others can guess it. Step 1: each pair gets a secret card (Tet gift buyers, night-shift workers, university freshers, tourists from Korea). Step 2: they prepare four sentences with who, which or that, for example "These are people who buy drinks after midnight." Step 3: pairs read their clues one by one; other students guess the group. Step 4: after each guess, the class checks the clues: is the pronoun right (who for people, which for things) and is there no extra subject ("who they")? The class corrects one clue together.'],
  ['R-MKA-06', 'group_project', 'MK3', 'Mini survey and customer profile', 60,
    'Target language: question forms (How often...? When do you...?), present simple with frequency adverbs, defining relative clauses. In groups of four, design a five-question survey in English about drink habits (when, where, how often, how much, why). Ask ten students on campus and record the answers. Then write a customer profile of about 120 words for Green Leaf Tea with four parts: who the customers are, their lifestyle and values, their buying habits and how to reach them. Use at least three relative clauses. Each group presents its profile in two minutes. Groups swap profiles, underline every relative clause and frequency adverb, and correct any mistakes; the class chooses the most accurate profile.'],
  ['R-MKA-07', 'activity', 'MK4', 'Polite feedback circle', 30,
    'Target language: could, might, it might be better to, why don\'t we, I\'m not sure that. Task: give polite feedback on advert drafts. Step 1: each group gets a printed fictional advert with one hidden problem (for example only young people shown, or a joke about one region). Step 2: the group finds the problem and agrees on one change. Step 3: one student is the designer; the others give feedback using could, might, it might be better to and why don\'t we. Step 4: the designer must answer politely. Step 5: the lecturer gives a point for each target phrase used with the correct verb form (no "why don\'t we to...", "to" after "it might be better").'],
  ['R-MKA-08', 'worksheet', 'MK4', 'From direct to polite', 25,
    'Target language: could, might, it might be better to, why don\'t we. Part A: rewrite eight direct comments in a polite way, for example "This slogan is bad" becomes "It might be better to use a different slogan." Part B: find and correct the mistake in six polite comments (for example "Why don\'t we to change the photo?", "It might be better use a neutral slogan", "The advert could shows older people"). Part C: write a new, fair slogan for the Green Leaf Tea cold-brew bottle and give one reason why it suits many types of customer.'],
];

export const EXTRA = [
  /* ---------------- MK1, Who are our stakeholders? — present simple for classifying ---------------- */
  ...USE([
    C('MK1', 'Vocabulary, Consists of, divided into or include?', 'Which word fills the gap? Sort the sentences from a stakeholder description.', ['of', 'into', 'no extra word'],
      [['The internal group consists ___ the founder, managers and staff.', 0], ['The marketing team consists ___ three people.', 0], ['The team is made up ___ Linh, Nam and two designers.', 0], ['Our stakeholders are divided ___ two groups.', 1], ['Our products are divided ___ tea, snacks and gift boxes.', 1], ['External stakeholders include ___ customers and suppliers.', 2], ['The external group includes ___ the bank and the local community.', 2]],
      '"Consist" and "be made up" are followed by "of"; "be divided" is followed by "into"; "include" takes its object directly, with no preposition.'),
    M('MK1', 'Vocabulary, Word formation', 'Choose the correct form: "Green Leaf Tea has a good ___ with its suppliers."',
      ['relate', 'relative', 'relationship', 'relating'], 2,
      'After "a good" we need a noun; "relationship" is the noun for how two groups work together.'),
    M('MK1', 'Language focus, Passive for classifying', 'Complete the sentence: "Our stakeholders ___ into two groups."',
      ['divide', 'are divided', 'are dividing', 'is divided'], 1,
      '"Stakeholders" is plural and someone else divides them, so we use the present simple passive: are divided.'),
    M('MK1', 'Language focus, Consist of', 'Complete the sentence: "The internal group ___ of owners, managers and staff."',
      ['consist', 'is consisting', 'consists', 'are consist'], 2,
      '"The internal group" is singular, so the verb takes -s: consists of. We do not use the continuous form for facts.'),
    M('MK1', 'Language focus, Include', 'Complete the sentence: "External stakeholders ___ customers, suppliers and the local community."',
      ['include', 'includes', 'are including', 'is include'], 0,
      'The subject is plural, so we use the base form "include" with no -s and no "of".'),
    O('MK1', 'Genre, Parts of a stakeholder description', 'Put the parts of a stakeholder description in the usual order.',
      ['Green Leaf Tea is a tea-and-snack company from Da Lat.',
        'Its stakeholders are divided into two groups: internal and external.',
        'The internal group consists of the founder, managers and about 40 staff.',
        'External stakeholders include customers, tea farmers, the bank and the local community.',
        'All these groups matter because the company needs their support to grow.'],
      'A stakeholder description introduces the company, states the groups, describes each group in turn and ends with why they matter.'),
  ]),
  ...READ('MK1-r', 'Reading, The stakeholders of Green Leaf Tea',
    `Green Leaf Tea is a small tea-and-snack company from Da Lat. It sells tea, dried fruit and gift boxes in Ho Chi Minh City through eight shops and an online store. Like every business, it has stakeholders: people and groups who are affected by the company and care about its success.

The stakeholders of Green Leaf Tea are divided into two groups. The internal group consists of the founder, Mr Le Quang Minh, the managers and about 40 staff. They work inside the company every day. Their decisions and their work create the product and the service that customers see.

The external group is larger. It includes customers, tea farmers, the bank, the city government and the local community. Customers want fresh tea at a fair price. The farmers in Bao Loc, led by Mr Tran, supply almost all of the tea leaves, so the company depends on them. The bank lends money for new shops, and the government sets rules for food safety.

Mr Minh often says, "We do not grow alone." For this reason, the marketing team talks to each stakeholder group in a different way, from staff newsletters to farm visits.`, [
      M('MK1', 'Main idea', 'What is the text mainly about?',
        ['How to open a tea shop in Da Lat', 'The groups of people who are important to Green Leaf Tea', 'Why the bank lends money to small companies', 'The history of tea farming in Bao Loc'], 1,
        'The text names and classifies the internal and external stakeholders of the company.'),
      M('MK1', 'Specific detail', 'Who supplies almost all of the tea leaves?',
        ['The city government', 'The managers', 'Customers in the online store', 'Farmers in Bao Loc'], 3,
        '"The farmers in Bao Loc, led by Mr Tran, supply almost all of the tea leaves."'),
      M('MK1', 'Vocabulary in context', 'In the third paragraph, "depends on" means…',
        ['needs', 'competes with', 'pays less to', 'teaches'], 0,
        'The company "depends on" the farmers because it needs their tea leaves to make its products.'),
    ]),
  ...LISTEN('MK1-l', 'Listening, A first-day briefing',
    `Hi Nam, welcome to Green Leaf Tea. I'm Linh, and I'm the marketing assistant. Before you start, let me explain who we work with. Inside the company, we have about forty staff. That includes the people in our eight shops, the warehouse team and the office. Outside the company, our most important partners are the farmers. We buy tea from twelve farms in Bao Loc, and Mr Tran manages most of them. Then of course there are customers, and also the people who live near our shops. They're stakeholders too, because our delivery bikes park on their street! Honestly, I think the farmers are the group we forget most often, and that's a mistake. So this Thursday, you and I are going to call Mr Tran and introduce you. Can you read the supplier file before then?`, [
      M('MK1', 'Gist', 'What is Linh mainly doing?',
        ['Explaining the company\'s stakeholders to a new colleague', 'Asking Nam to deliver tea to customers', 'Complaining about the delivery bikes', 'Selling tea to a new supplier'], 0,
        'She welcomes Nam and says "let me explain who we work with", then lists internal and external groups.'),
      M('MK1', 'Detail', 'How many farms does Green Leaf Tea buy tea from?',
        ['Eight', 'Forty', 'Twelve', 'Two'], 2,
        '"We buy tea from twelve farms in Bao Loc." Eight is the number of shops and forty is the number of staff.'),
      M('MK1', 'Next step', 'What will Linh and Nam do on Thursday?',
        ['Visit all eight shops', 'Call Mr Tran', 'Meet the people who live near the shops', 'Read the customer survey'], 1,
        '"This Thursday, you and I are going to call Mr Tran and introduce you."'),
    ]),
  ...SPEAK('MK1', 'Speaking, Introduce the stakeholders of a business',
    'You are a new marketing assistant. Your manager asks you to introduce the stakeholders of a business you know (a cafe, a bakery, a phone shop…) to a visiting partner. Talk for about 1 minute.\n• What is the business?\n• Who are the internal stakeholders?\n• Who are the external stakeholders, and which group is most important? Why?\nUse: be divided into / consist of / include, and give a reason with because or so.\nIf you need ideas, use these notes: Hoa Sen Bakery, District 5, family bakery (bread and cakes); internal: the owner Mrs Lan, her two sons, six bakers; external: customers, the flour supplier, the bank, neighbours; customers come every morning and tell their friends.',
    'I would like to talk about Hoa Sen Bakery in District 5. It is a family bakery that sells bread and cakes. Its stakeholders are divided into two groups. The internal group consists of the owner, Mrs Lan, her two sons and six bakers. The external group includes customers, the flour supplier, the bank and the neighbours on the street. In my opinion, the customers are the most important group, because most of them come every morning and they tell their friends about the bakery. However, the flour supplier also matters, because without good flour there is no good bread.',
    ['Language: uses be divided into / consist of / include accurately (at least three times) and gives reasons with because or so', 'Task: names the business, at least two internal and three external stakeholders, and says which group is most important and why', 'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MK1', 'Writing, A stakeholder description',
    'Mai Spa is a new beauty spa in Thu Duc City. The owner, Ms Mai, wants a short stakeholder description for her bank loan application. Write about 120 words for the bank manager.\n• Introduce the business.\n• Describe the internal stakeholders.\n• Describe the external stakeholders and say why they matter.\nUse: be divided into / consist of / include.\nNotes: opened in January; hair, skin and nail care for students and office workers; internal: Ms Mai, one manager, eight staff; external: customers (want good service at a fair price), two product suppliers (safe, natural products), the landlord, the bank, the local community; the spa needs their trust to grow and repay the loan.',
    'Mai Spa is a small beauty spa in Thu Duc City. It opened in January and offers hair, skin and nail care for students and office workers.\n\nThe stakeholders of Mai Spa are divided into two groups. The internal group consists of the owner, Ms Mai, one manager and eight staff. They provide the services and look after customers every day.\n\nThe external group includes customers, two product suppliers, the landlord, the bank and the local community. Customers want good service at a fair price. The suppliers provide safe, natural products, and the landlord rents the building to the spa.\n\nAll of these groups matter, because the spa needs their trust and support to grow and to repay the loan.',
    ['Language: uses be divided into / consist of / include accurately (at least three times), with correct present simple verb forms', 'Task: includes all the points in the notes', 'Organisation: introduction, one paragraph for each group, a closing sentence on why they matter'], 120),

  /* ---------------- MK2, Building stakeholder relationships — must, have to and should ---------------- */
  ...USE([
    C('MK2', 'Vocabulary, Pay, sign or attend?', 'Which verb goes with each phrase from the memo? Sort the phrases.', ['pay …', 'sign …', 'attend …'],
      [['suppliers on time', 0], ['a fair wage', 0], ['a long-term contract', 1], ['the delivery note', 1], ['a training course', 2], ['the safety briefing', 2], ['the shop opening', 2]],
      'We pay people or money (pay suppliers on time, pay a fair wage), sign documents (sign a contract, sign a delivery note) and attend events (attend a course, a briefing, an opening).'),
    M('MK2', 'Vocabulary, Word in context', 'Choose the best word: "We always pay our suppliers on time because we want to keep their ___."',
      ['debt', 'stock', 'advert', 'trust'], 3,
      '"Trust" is the belief that someone will keep their promises; paying on time builds it.'),
    M('MK2', 'Language focus, Must for rules', 'Complete the memo: "All shop staff ___ wear the new uniform from 1 June. This is a company rule."',
      ['should', 'must', 'might', 'could'], 1,
      'A company rule is a strong obligation, so we use "must". "Should" is only advice.'),
    M('MK2', 'Language focus, Not necessary', 'Complete the sentence: "You ___ bring your own laptop to the training. We will give you one."',
      [`mustn't`, `don't have to`, 'have to', 'should'], 1,
      '"Don\'t have to" means it is not necessary. "Mustn\'t" would mean it is not allowed.'),
    M('MK2', 'Language focus, Should for advice', 'Complete the sentence: "I think we ___ invite the neighbours to the shop opening. It would be a nice gesture."',
      ['must', 'have to', 'should', `mustn't`], 2,
      '"I think" and "a nice gesture" show this is advice, not a rule, so "should" fits.'),
    O('MK2', 'Genre, Parts of an internal memo', 'Put the parts of an internal memo in the usual order.',
      ['To: All shop staff  From: Nguyen Thu Ha  Date: 3 March  Subject: Supplier visit',
        'This memo explains the arrangements for Mr Tran\'s visit next week.',
        'Mr Tran supplies most of our tea, and this is his first visit to our city shops.',
        'All managers must prepare a short sales report, and staff should be ready to answer his questions.',
        'If you have any questions, please contact me on extension 12.'],
      'A memo starts with the header, states its purpose, gives background, lists the actions required and ends with a contact line.'),
  ]),
  ...READ('MK2-r', 'Reading, A memo about our partners',
    `To: All managers and shop staff
From: Nguyen Thu Ha, Marketing Manager
Date: 10 March
Subject: Our relationships with suppliers, staff and neighbours

This memo explains three changes that will help us build stronger relationships with our stakeholders.

First, our suppliers. The farmers in Bao Loc have told us that late payment causes them real problems. From April, the finance team must pay every supplier within 30 days. Managers have to send all delivery notes to finance by the fifth day of each month.

Second, our staff. Many of you have asked for more training. From next month, every new staff member has to attend a two-day course on tea and customer service. Experienced staff don't have to attend, but they are welcome.

Third, our neighbours. Our District 3 shop will reopen on 20 April after its refit. I think we should invite the people who live on the street to the reopening and offer them free tea. Shop staff should also keep the pavement clean and ask delivery drivers not to block it.

Thank you for your support. Please contact me if you have any questions.`, [
      M('MK2', 'Main idea', 'What is the main purpose of the memo?',
        ['To announce a price increase', 'To explain how the company will improve its relationships with three stakeholder groups', 'To ask staff to work longer hours', 'To complain about the farmers in Bao Loc'], 1,
        'The memo says it "explains three changes that will help us build stronger relationships with our stakeholders".'),
      M('MK2', 'Detail', 'Who does NOT have to attend the two-day course?',
        ['New staff', 'Managers', 'Experienced staff', 'Delivery drivers'], 2,
        '"Experienced staff don\'t have to attend, but they are welcome."'),
      M('MK2', 'Vocabulary in context', 'In the last paragraph, "block" the pavement means…',
        ['stop people from walking on it', 'clean it', 'build it', 'paint it'], 0,
        'Drivers who park on the pavement "block" it: people cannot walk past.'),
    ]),
  ...LISTEN('MK2-l', 'Listening, The supplier call',
    `Linh, can you take some notes? I've just spoken to Mr Tran. He's worried. Prices for fertiliser went up again this year, so he wants to raise the price of our green tea leaves by eight per cent from June. He also says we have to pay faster. At the moment we pay after forty-five days, and that's too long for a small farm. To be honest, I think he's right. If we lose Mr Tran, we lose most of our tea. So, first, we must change the payment time to thirty days. Second, we should visit the farm. I've suggested Saturday the twelfth of April, and he's happy with that date. Could you book a car for us and prepare a short list of questions about the new harvest?`, [
      M('MK2', 'Gist', 'Why is Mr Tran worried?',
        ['His costs are rising and payment is slow', 'His farm had a bad harvest', 'He wants to stop selling tea', 'Green Leaf Tea cancelled an order'], 0,
        'Fertiliser prices "went up again" and he says "we have to pay faster".'),
      M('MK2', 'Detail', 'When will the visit to the farm take place?',
        ['Saturday 2 April', 'In June', 'After forty-five days', 'Saturday 12 April'], 3,
        '"I\'ve suggested Saturday the twelfth of April, and he\'s happy with that date." June is when the price rise starts.'),
      M('MK2', 'Speaker\'s opinion', 'Which words show that the speaker is giving her OWN opinion about the request?',
        ['"He also says…"', '"To be honest, I think…"', '"At the moment…"', '"Could you book…"'], 1,
        '"To be honest, I think he\'s right." "To be honest" and "I think" introduce a personal opinion; "He also says" reports Mr Tran\'s words.'),
    ]),
  ...SPEAK('MK2', 'Speaking, Brief the shop team',
    'You are the manager of a Green Leaf Tea shop. Your District 3 shop, next to a primary school, reopens after its refit next week. Brief your team for about 1 minute.\n• Two rules everyone must follow.\n• One thing that is not necessary.\n• One piece of advice about the neighbours or the school.\nUse: must / have to / don\'t have to / should.\nNotes: opens next Monday next to Hoa Binh Primary School; rules: wear the new green uniform, arrive by 6.30 (parents come at 7), no energy drinks for children; not necessary: bring your own apron (two each provided); advice: greet teachers and parents, keep the pavement clean.',
    'Good morning, everyone. As you know, our shop reopens next Monday after the refit, and it is right next to Hoa Binh Primary School. First, the rules. Everyone must wear the new green uniform, and you have to arrive by six thirty because the first parents come at seven. Also, you must not sell energy drinks to the children. That is a company rule. You don\'t have to bring your own aprons; we will give you two each. Finally, some advice: I think we should say hello to the teachers and the parents, and we should keep the pavement clean. Good neighbours become loyal customers. Any questions?',
    ['Language: uses must / have to / don\'t have to / should accurately (at least four times), with the base verb and no "to" after must or should', 'Task: includes all the points in the notes', 'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MK2', 'Writing, An internal memo',
    'Green Leaf Tea will hold a free tea-tasting day for the local community at its Binh Thanh shop on Sunday 18 May. You are Linh. Write a memo of about 120 words to the shop staff.\n• Explain the purpose of the event.\n• Give two things staff must or have to do, and one thing they don\'t have to do.\n• Give one piece of advice (should).\nUse: must / have to / don\'t have to / should.\nNotes: 8 a.m. to 12 p.m.; purpose: thank the neighbours and introduce the new cold-brew bottles; arrive by 7 a.m. to set up tables outside; wear your name badge; no need to sell anything; learn the names of the three new flavours; contact: Linh, extension 15.',
    'To: Binh Thanh shop staff\nFrom: Linh, Marketing Assistant\nDate: 5 May\nSubject: Community tea-tasting day\n\nThis memo gives details of our free tea-tasting day on Sunday 18 May, from 8 a.m. to 12 p.m. The purpose is to say thank you to our neighbours and to introduce the new cold-brew bottles.\n\nAll staff must arrive by 7 a.m. to set up the tables outside. You also have to wear your name badge, because many visitors will want to ask you questions. Please note that you don\'t have to sell anything on the day.\n\nYou should learn the names of the three new flavours before Sunday, so you can explain them clearly.\n\nIf you have any questions, please contact me on extension 15.',
    ['Language: uses must / have to / don\'t have to / should accurately (at least four times), with the base verb after each', 'Task: includes all the points in the notes', 'Organisation: memo header (To / From / Date / Subject), purpose sentence, actions, contact line'], 120),

  /* ---------------- MK3, Culture and the customer — defining relative clauses ---------------- */
  ...USE([
    C('MK3', 'Vocabulary, Relative clause or not?', 'Sort the phrases from a customer profile by their grammar.', ['Has a relative clause (who / which / that)', 'No relative clause (adjectives or a phrase with "in", "from")'],
      [['office workers who want a quick drink', 0], ['a gift box which families buy for Tet', 0], ['tourists that visit District 1', 0], ['customers who order online at night', 0], ['young, health-conscious office workers', 1], ['students in dormitories', 1], ['tourists from Korea and Australia', 1]],
      'A relative clause starts with who, which or that and has its own verb (want, buy, visit, order). The other phrases describe the noun with adjectives or a preposition and have no verb.'),
    M('MK3', 'Vocabulary, Word formation', 'Choose the correct form: "Many young people in the city follow a ___ lifestyle: they go to the gym and eat less sugar."',
      ['health', 'healthy', 'healthily', 'healthiness'], 1,
      'Before the noun "lifestyle" we need an adjective: healthy.'),
    M('MK3', 'Language focus, Who for people', 'Complete the sentence: "Our target customers are students ___ study in District 3."',
      ['which', 'where', 'who', 'what'], 2,
      '"Students" are people, so we use "who".'),
    M('MK3', 'Language focus, Which for things', 'Complete the sentence: "This is the gift box ___ families buy for Tet."',
      ['who', 'which', 'where', 'when'], 1,
      'A "gift box" is a thing, so we use "which" (or "that").'),
    M('MK3', 'Language focus, No extra pronoun', 'Choose the correct sentence.',
      ['Office workers who want a quick drink often buy our cold brew.', 'Office workers who they want a quick drink often buy our cold brew.', 'Office workers which want a quick drink often buy our cold brew.', 'Office workers what want a quick drink often buy our cold brew.'], 0,
      'Use "who" for people, and do not repeat the subject ("they") inside the relative clause.'),
    O('MK3', 'Genre, Parts of a customer profile', 'Put the parts of a customer profile in the usual order.',
      ['Customer group: "The Tet gift buyer"',
        'They are people aged 30 to 50 who work in offices and have a middle income.',
        'They care about family and want gifts that look traditional but modern.',
        'They usually buy in the three weeks before Tet, often online.',
        'In short, they are busy professionals who want gifts which show respect for tradition.'],
      'A profile names the group, then describes who they are, their values and their buying habits, and ends with a summary sentence that uses a relative clause ("In short, they are … who …").'),
  ]),
  ...READ('MK3-r', 'Reading, Customer profile: the young cold-brew drinker',
    `Customer group: the young cold-brew drinker

Who they are: These are people aged 20 to 28 who live in Ho Chi Minh City and work in offices, cafes or start-ups. Many of them grew up in other provinces and moved to the city for university. Most earn between 8 and 15 million VND a month.

Culture and values: Like most Vietnamese people, they still drink hot tea with their families at home. However, they also belong to a city subculture which values speed, health and good design. They want drinks that are less sweet, and they like brands that tell an honest local story.

Buying habits: They buy drinks three or four times a week, usually in the afternoon. More than half of them order through delivery apps, and they often choose a product that friends have recommended on social media. Price matters, but a bottle that looks good in a photo is also important.

Summary: In short, they are young city workers who want a healthy, good-looking drink and who trust brands with an honest local story, such as tea from the farms in Bao Loc.`, [
      M('MK3', 'Main idea', 'What is the purpose of this text?',
        ['To describe one group of customers for the marketing team', 'To compare hot tea and coffee', 'To explain how cold-brew tea is made', 'To advertise a delivery app'], 0,
        'It is a customer profile: it describes who the group is, their values and habits, and ends with a summary.'),
      M('MK3', 'Detail', 'When do these customers usually buy drinks?',
        ['Early in the morning', 'Only at weekends', 'Late at night', 'In the afternoon'], 3,
        '"They buy drinks three or four times a week, usually in the afternoon."'),
      M('MK3', 'Vocabulary in context', 'In the second paragraph, "subculture" means…',
        ['a type of tea that is popular in big cities', 'a smaller group with its own habits inside a bigger culture', 'a family tradition that people follow at Tet', 'a rule that the city government has made'], 1,
        'The text contrasts Vietnamese culture in general with a "city subculture" of young workers who share certain values.'),
    ]),
  ...LISTEN('MK3-l', 'Listening, Survey results',
    `OK, so here are the results of our student survey. We asked two hundred students at three universities about drinks. The first thing we found is that students who live in dormitories buy drinks more often than students who live with their families. Almost every day, in fact. Second, sixty-four per cent of them order online, and the busiest time is around nine p.m., after evening classes. Third, culture matters. During Tet and the Mid-Autumn Festival, many students buy tea as a gift for their parents, not for themselves. So I think we need two different messages: a quick, cheap drink for everyday study, and a beautiful gift box which students can take home for the holidays. I'd like to test both ideas next month at Thu Duc campus.`, [
      M('MK3', 'Gist', 'What is the speaker talking about?',
        ['A new shop opening at a university', 'The results of a survey about students and drinks', 'The history of the Mid-Autumn Festival', 'How to write a survey'], 1,
        '"Here are the results of our student survey."'),
      M('MK3', 'Detail', 'What percentage of students order drinks online?',
        ['64%', '40%', '9%', '200%'], 0,
        '"Sixty-four per cent of them order online." Two hundred is the number of students, and nine p.m. is the busiest time.'),
      M('MK3', 'Next step', 'What does the speaker want to do next month?',
        ['Ask two hundred more students', 'Close the online shop', 'Test two ideas at Thu Duc campus', 'Visit students\' parents'], 2,
        '"I\'d like to test both ideas next month at Thu Duc campus."'),
    ]),
  ...SPEAK('MK3', 'Speaking, Describe a customer group',
    'You work in the marketing team of Green Leaf Tea. At a team meeting, describe ONE customer group for a Green Leaf Tea product (for example the gift box or the cold-brew bottle). Talk for about 1 minute.\n• Who are they (age, job, place)?\n• What do they value and how does culture influence them?\n• How and when do they buy, and how can we reach them?\nUse: at least three defining relative clauses with who / which / that.\nNotes (gift-box buyers): aged 35 to 55; work in offices in Districts 1 and 3; Tet gifts for bosses and parents are important; want a box that looks traditional but modern; value quality and a real farm story (Bao Loc); buy two or three weeks before Tet, on their phones at lunch; reach them with Facebook ads and free office delivery.',
    'I want to describe the customers who buy our gift boxes. They are mostly people aged 35 to 55 who work in offices in Districts 1 and 3. In Vietnamese culture, giving a gift to your boss or your parents at Tet is very important, so they want a box which looks traditional but also modern. They value quality and a good story, for example tea that comes from a real farm in Bao Loc. They usually buy two or three weeks before Tet, often on their phone during lunch. I think the best way to reach them is through Facebook ads and free delivery to offices.',
    ['Language: uses defining relative clauses with who / which / that accurately (at least three times), with no extra pronoun inside the clause', 'Task: includes all the points in the notes', 'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MK3', 'Writing, A customer profile',
    'Green Leaf Tea wants to sell its dried fruit snacks to international tourists in District 1. You are Linh. Write a customer profile of about 120 words for Ms Ha.\n• Who the tourists are (age, where they come from, why they visit).\n• What they value and how they shop.\n• The best way to reach them.\nUse at least three defining relative clauses (who / which / that) and the present simple with usually / often.\nNotes: aged 22 to 40; mainly from Korea, Australia and Europe; stay three to five days, many travel on to Da Lat; want food that is local, natural and easy to carry; like products with a story (fruit from a family farm); usually shop in the evening in District 1; often buy small gifts for friends; check reviews on Google Maps; reach them through hotels, souvenir shops and online reviews.',
    'Customer group: the young international tourist\n\nWho they are: These are tourists aged 22 to 40 who come mainly from Korea, Australia and Europe. Most of them visit Ho Chi Minh City for three to five days, and many travel on to Da Lat.\n\nValues and habits: They want food which is local, natural and easy to carry. They like products that have a story, for example fruit from a family farm. They usually shop in the evening in District 1, and they often buy small gifts for friends at home. They check reviews on Google Maps before they buy.\n\nHow to reach them: We should sell in hotels and souvenir shops, and ask happy customers to leave reviews online.',
    ['Language: uses defining relative clauses with who / which / that accurately (at least three times) and the present simple with frequency adverbs', 'Task: includes all the points in the notes', 'Organisation: profile headings (Who they are / Values and habits / How to reach them) with one short paragraph each'], 120),

  /* ---------------- MK4, Inclusive marketing: avoiding stereotypes — polite criticism and suggestions ---------------- */
  ...USE([
    C('MK4', 'Vocabulary, Polite or too direct?', 'Sort the comments on a draft advert.', ['Polite feedback', 'Too direct'],
      [['The advert could show older customers too.', 0], ['It might be better to use a more neutral slogan.', 0], ['Why don\'t we show a woman as the farm owner?', 0], ['I\'m not sure this slogan is the right message.', 0], ['This slogan is bad.', 1], ['You must change the photo now.', 1], ['Your poster is wrong.', 1]],
      'Polite comments use soft forms: could, might, it might be better to, why don\'t we, I\'m not sure. Direct comments use strong words (bad, wrong) or must with an order.'),
    M('MK4', 'Vocabulary, Word in context', 'Choose the best word: "The advert suggests that all older people are slow with technology. This is a ___."',
      ['slogan', 'discount', 'stereotype', 'target'], 2,
      'A "stereotype" is a fixed, unfair idea about a whole group of people.'),
    M('MK4', 'Language focus, Could for suggestions', 'Complete the sentence: "The advert ___ show older customers too."',
      ['could', 'must to', 'can to', 'should to'], 0,
      '"Could" makes a soft suggestion and is followed by the base verb with no "to".'),
    M('MK4', 'Language focus, It might be better', 'Complete the sentence: "It might be better ___ a more neutral slogan."',
      ['use', 'to use', 'using', 'used'], 1,
      'After "it might be better" we use "to" + base verb.'),
    M('MK4', 'Language focus, Why don\'t we', 'Complete the sentence: "Why don\'t we ___ a woman as the business owner in the next advert?"',
      ['showing', 'to show', 'shows', 'show'], 3,
      'After "why don\'t we" we use the base verb: show.'),
    O('MK4', 'Genre, Parts of an advert critique', 'Put the parts of an advert critique in the usual order.',
      ['I have looked at the draft poster for the new cold-brew bottle.',
        'The colours are bright and the bottle looks very attractive.',
        'However, the slogan "Not your grandma\'s tea" might upset older customers.',
        'Many of our loyal customers are over 50, and we do not want to lose them.',
        'It might be better to use "Fresh tea for every day" and show people of different ages.'],
      'A critique names the advert, praises what works, points out the problem politely, explains why it matters and suggests a fairer version.'),
  ]),
  ...READ('MK4-r', 'Reading, Feedback on the cold-brew poster',
    `Dear Khoa,

Thank you for sending the first draft of the poster for our new cold-brew bottles. I have shared it with Ms Ha, and here is our feedback.

First, the good points. The design is fresh and modern, and the green colour matches our brand very well. The photo of the bottle is clear, and the price is easy to see.

However, we have one concern. The slogan says "Not your grandma's tea", and the photo shows only young, slim men in a gym. We are not sure this is the right message. Many of our loyal customers are over 50, and a lot of our online buyers are women. The slogan might suggest that older people are old-fashioned, and some customers could find it offensive.

We have two suggestions. It might be better to use a more neutral slogan, such as "Cold tea, fresh ideas". Also, the photo could show a group of friends of different ages and body types. Why don't we use a real customer from our District 3 shop?

Could you send a second version by Friday? Thank you for your hard work.

Best regards,
Linh`, [
      M('MK4', 'Main idea', 'What is Linh\'s main concern about the poster?',
        ['The price is hard to see.', 'The slogan and the photo might upset some customers.', 'The green colour does not match the brand.', 'The photo of the bottle is not clear.'], 1,
        '"However, we have one concern" introduces the problem: the slogan and the photo. The text says the colour "matches our brand", the photo is "clear" and the price is "easy to see".'),
      M('MK4', 'Detail', 'What does Linh like about the poster?',
        ['The slogan', 'The photo of the gym', 'The young models', 'The green colour'], 3,
        '"The green colour matches our brand very well." Her concern is about the slogan and the people in the photo.'),
      M('MK4', 'Vocabulary in context', 'In the third paragraph, "offensive" means…',
        ['likely to upset people', 'very expensive', 'easy to read', 'popular with young people'], 0,
        'Linh worries that some customers "could find it offensive", that is, feel upset or insulted.'),
    ]),
  ...LISTEN('MK4-l', 'Listening, A meeting with the design agency',
    `Thanks for coming, Khoa. We really like the new video for the gift boxes. The music is lovely, and the shots of Da Lat are beautiful. But we've noticed three small problems. First, in the kitchen scene, only the mother and the grandmother are making tea, and the men are watching football. Could we show the father making tea too? Second, all the people speak with a Hanoi accent. Our customers are mostly in the south, so it might be better to have a mix of voices. And third, the farmer in the video is a man, but half of the farmers who work with Mr Tran in Bao Loc are women. Why don't we show one of them? Honestly, I think these changes will make the video feel more real. Can you send the new version by Thursday?`, [
      M('MK4', 'Gist', 'What is the speaker doing?',
        ['Asking for a lower price for the video', 'Giving feedback and suggesting changes to a video', 'Explaining how to make tea', 'Introducing a new tea farmer'], 1,
        'She praises the video and then lists "three small problems" with suggestions.'),
      M('MK4', 'Detail', 'How many problems does the speaker mention?',
        ['Two', 'Four', 'Three', 'One'], 2,
        '"We\'ve noticed three small problems": the kitchen scene, the accents and the farmer.'),
      M('MK4', 'Speaker\'s opinion', 'What does the speaker think the changes will do?',
        ['Make the video feel more real', 'Make the video shorter', 'Save money', 'Attract more tourists'], 0,
        '"Honestly, I think these changes will make the video feel more real."'),
    ]),
  ...SPEAK('MK4', 'Speaking, Give feedback to a designer',
    'You are a marketing assistant. A designer shows you a draft advert for a new laptop. The advert says "So easy, even your mum can use it!" and shows only young men working. Give the designer polite feedback for about 1 minute.\n• Say one thing you like.\n• Explain the problem politely.\n• Make two suggestions for a fairer version.\nUse: could / might / it might be better to / why don\'t we.\nNotes: you like the clean design and the large photo of the laptop; problem: the slogan suggests women or older people are bad with technology, and the photo shows only young men; suggestions: the slogan "Easy for everyone", a team of different ages with women and men.',
    'Thank you for the draft. I really like the clean design and the large photo of the laptop. It looks modern and professional. However, I\'m not sure about the slogan. "Even your mum can use it" might suggest that women or older people are bad with technology, and some customers could find that offensive. Also, the photo only shows young men. It might be better to use a neutral slogan, for example "Easy for everyone". And why don\'t we show a team of different ages, with women and men working together? I think that would reach more customers. Could you try a second version?',
    ['Language: uses could / might / it might be better to / why don\'t we accurately (at least three of them), with the correct verb form after each', 'Task: includes all the points in the notes', 'Delivery: clear, steady pace, understandable pronunciation']),
  ...WRITE('MK4', 'Writing, An advert critique and rewrite',
    'Saigon Fit, a gym chain, plans a poster with the slogan "Real men lift. Girls do yoga." You are a marketing consultant. Write an email of about 120 words to the manager, Mr Phong.\n• Say what works well in the poster.\n• Explain the problem politely and why it matters.\n• Suggest a fairer slogan and image.\nUse: could / might / it might be better to / why don\'t we.\nNotes: good points: bright, energetic photos and a clear price offer; problem: the slogan suggests men and women can only do certain kinds of exercise, customers could find it unfair, the gym might look old-fashioned; suggestions: the slogan "Find the training that fits you", men and women of different ages doing weights and yoga.',
    'Dear Mr Phong,\n\nThank you for showing me the new poster for Saigon Fit. The photos are bright and energetic, and the price offer is very clear.\n\nHowever, I am not sure about the slogan "Real men lift. Girls do yoga." It suggests that men and women can only do certain kinds of exercise. Many women lift weights and many men do yoga, so some customers could find the slogan unfair or offensive. This might also make the gym look old-fashioned.\n\nIt might be better to use a neutral slogan, such as "Find the training that fits you." The poster could show men and women of different ages doing both weights and yoga.\n\nI hope this is helpful.\n\nBest regards,\nLinh',
    ['Language: uses could / might / it might be better to / why don\'t we accurately (at least three times), with the correct verb form after each', 'Task: includes all the points in the notes', 'Organisation: email greeting, praise, problem with "However", suggestions, polite closing'], 120),
];

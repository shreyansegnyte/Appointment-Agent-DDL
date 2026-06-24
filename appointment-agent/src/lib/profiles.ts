import { Profile } from './types';

export const profiles: Profile[] = [
  // ═══════════════════════════════════════════════════════════════
  // PROFILE 1: MARGARET CHEN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'margaret',
    name: 'Margaret Chen',
    age: 62,
    occupation: 'Retired Professor of East Asian Studies',
    location: 'Palo Alto, CA',
    shortDescription: 'Retired professor • Methodical planner • Morning person',
    avatar: '👩‍🏫',
    accentColor: '#2dd4bf',
    accentColorLight: '#99f6e4',
    accentGradient: 'linear-gradient(135deg, #0d9488, #2dd4bf, #5eead4)',
    schedulingPreferences: {
      preferredTimeBlocks: [
        { startHour: 8, startMinute: 0, endHour: 11, endMinute: 30, label: 'Morning golden hours' },
        { startHour: 14, startMinute: 0, endHour: 15, endMinute: 30, label: 'Early afternoon (post-lunch rest)' },
      ],
      avoidDays: [0], // Avoids Sundays — reserved for family
      avoidTimeRanges: [
        { startHour: 12, startMinute: 0, endHour: 13, endMinute: 30, label: 'Lunch & rest period' },
        { startHour: 17, startMinute: 0, endHour: 21, endMinute: 0, label: 'Evening — reading & relaxation' },
      ],
      maxAppointmentsPerDay: 2,
      minGapBetweenAppointments: 90,
      preferredAppointmentDuration: 60,
      bufferBeforeAppointment: 30,
      bufferAfterAppointment: 30,
      willingnessToReschedule: 0.3,
      priorityOrder: ['medical', 'personal', 'household', 'professional'],
    },
    appointmentPreferences: [
      { type: 'doctor_annual', frequency: 'annual', frequencyValue: 1, preferredDuration: 60, priority: 'critical', flexibility: 0.2, preferredTimeOfDay: 'morning', notes: 'Always with Dr. Patricia Lee at Stanford Medical. Prefers comprehensive visits — not rushed.' },
      { type: 'dentist_cleaning', frequency: 'biannual', frequencyValue: 1, preferredDuration: 60, priority: 'high', flexibility: 0.3, preferredTimeOfDay: 'morning', notes: 'Dr. Yamamoto in downtown Palo Alto. Has had gum sensitivity since 2019.' },
      { type: 'dermatologist', frequency: 'quarterly', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.4, preferredTimeOfDay: 'morning', notes: 'Skin cancer screening — family history. Very important.' },
      { type: 'eye_exam', frequency: 'annual', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.5, preferredTimeOfDay: 'morning' },
      { type: 'therapy', frequency: 'biweekly', frequencyValue: 1, preferredDuration: 50, priority: 'high', flexibility: 0.2, preferredDayOfWeek: 2, preferredTimeOfDay: 'morning', notes: 'Tuesday mornings with Dr. Sato. Grief counseling after husband passed 3 years ago.' },
      { type: 'massage_spa', frequency: 'monthly', frequencyValue: 1, preferredDuration: 90, priority: 'medium', flexibility: 0.6, preferredTimeOfDay: 'afternoon', notes: 'For chronic back pain. Prefers deep tissue at Watercourse Way.' },
      { type: 'haircut', frequency: 'bimonthly', frequencyValue: 8, preferredDuration: 60, priority: 'low', flexibility: 0.8, preferredTimeOfDay: 'morning' },
      { type: 'meditation_class', frequency: 'weekly', frequencyValue: 1, preferredDuration: 60, priority: 'medium', flexibility: 0.4, preferredDayOfWeek: 4, preferredTimeOfDay: 'morning', notes: 'Thursday morning Zen meditation at the community center.' },
      { type: 'home_cleaning', frequency: 'biweekly', frequencyValue: 1, preferredDuration: 180, priority: 'medium', flexibility: 0.5, preferredDayOfWeek: 1, notes: 'Mondays — Martha\'s cleaning service. Margaret prefers to be out of the house.' },
      { type: 'financial_advisor', frequency: 'quarterly', frequencyValue: 1, preferredDuration: 60, priority: 'medium', flexibility: 0.5, preferredTimeOfDay: 'afternoon', notes: 'Managing retirement funds. Prefers in-person at Schwab office.' },
    ],
    fullContext: `MARGARET CHEN — COMPREHENSIVE PROFILE

BIOGRAPHICAL BACKGROUND
Margaret Chen, 62, is a recently retired Professor of East Asian Studies at Stanford University, where she taught for 28 years. She specialized in Meiji-era Japanese literature and published three well-regarded academic books. She retired two years ago, partly by choice and partly because her husband, David Chen (a civil engineer), passed away from pancreatic cancer three years ago. They were married for 34 years.

Margaret grew up in San Francisco's Richmond District, the daughter of Chinese-American immigrants who ran a small bookshop. She earned her BA at UC Berkeley, her MA at Columbia, and her PhD at Yale. She has lived in Palo Alto since joining Stanford in 1996. She and David bought a modest craftsman-style home near Professorville which she still lives in alone.

She has two adult children: Emily (36, lives in Seattle, works in biotech, married with one toddler) and James (33, lives in New York, works in publishing, single). She FaceTimes with Emily every Sunday morning and sees James about twice a year. She has a 12-year-old tabby cat named Basho (named after the haiku poet).

DAILY ROUTINE
Margaret is a deeply habitual person. Her day follows a near-identical pattern:
- 6:00 AM: Wakes naturally (no alarm). Makes green tea (always loose-leaf sencha).
- 6:15–7:15 AM: Reading time — currently working through a stack of Japanese novels she never had time for during her career.
- 7:15–7:45 AM: Light breakfast (oatmeal with berries, or congee) while listening to NPR.
- 8:00–11:30 AM: This is her "productive window." She schedules all appointments, errands, and active tasks here. If no appointments, she works on a personal translation project (translating a collection of Yosano Akiko's tanka poems).
- 11:30 AM–1:30 PM: Long lunch break. She cooks a proper meal, eats slowly, sometimes naps for 20 minutes.
- 1:30–3:30 PM: Secondary productive window, but lower energy. Good for low-key appointments or errands.
- 3:30–5:00 PM: Walk in the neighborhood or at the Baylands. She walks 3-4 miles daily. This is sacred and she will not schedule over it unless absolutely necessary.
- 5:00–6:30 PM: Dinner preparation. She enjoys cooking elaborate meals even though she eats alone.
- 6:30–9:30 PM: Evening relaxation — classical music (she especially loves Debussy), more reading, occasionally a movie. She will NOT schedule anything during this time.
- 9:30 PM: Bedtime. She is very consistent about this.

HEALTH HISTORY & MEDICAL PREFERENCES
Margaret is in good health for her age but is proactive about preventive care:
- Family history of skin cancer (her mother had melanoma). She takes dermatology screenings very seriously.
- Mild hypertension, managed with lisinopril. Monitored at her annual physical.
- Chronic lower back pain from decades of desk work. Monthly massages help significantly.
- Had cataract surgery (left eye) 2 years ago. Annual eye exams are important.
- Gum sensitivity — her dentist recommended cleanings every 6 months rather than yearly.
- She has been in grief counseling since David's death. She finds it extremely valuable and will not reschedule therapy lightly.
- She practices meditation for mental health and stress management.

She is loyal to her doctors and strongly prefers providers she has an established relationship with. She dislikes telehealth — she finds it impersonal. She always wants the most thorough version of any appointment (no "quick check-ins").

DECISION-MAKING STYLE
Margaret is methodical, risk-averse, and values thoroughness:
- She plans appointments weeks or months in advance.
- She never double-books.
- She prefers consistency — same day of week, same time slot when possible.
- She gets anxious when her schedule feels crowded (more than 2 appointments in one day is overwhelming).
- She would rather reschedule her own low-priority items than deal with a packed day.
- She prioritizes health appointments above everything else.
- She values having plenty of buffer time between appointments (at least 90 minutes).
- She is somewhat rigid about her "sacred times" (morning walk, evening reading, Sunday family calls).

SCHEDULING CONFLICT RESOLUTION
When conflicts arise, Margaret:
1. Always keeps medical appointments, especially dermatology and therapy.
2. Will move personal care (haircut, massage) before moving health or meditation.
3. Will never schedule anything during her 3:30-5pm walk or 6:30-9:30pm evening time.
4. Prefers to spread appointments across different days rather than batching.
5. If forced to cancel, she reschedules immediately — she dislikes having things "floating."
6. Has a slight preference for the first half of the week (Mon-Wed) for appointments.

VALUES HIERARCHY
1. Health and preventive care
2. Mental wellbeing (therapy, meditation)
3. Daily routines and self-care
4. Family connections
5. Intellectual pursuits
6. Social obligations`,
  },

  // ═══════════════════════════════════════════════════════════════
  // PROFILE 2: JAYDEN WILLIAMS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'jayden',
    name: 'Jayden Williams',
    age: 28,
    occupation: 'Startup Founder & CEO (Series A fintech)',
    location: 'San Francisco, CA (SoMa)',
    shortDescription: 'Startup founder • Chaotic scheduler • Night owl',
    avatar: '👨‍💻',
    accentColor: '#a78bfa',
    accentColorLight: '#c4b5fd',
    accentGradient: 'linear-gradient(135deg, #7c3aed, #a78bfa, #c084fc)',
    schedulingPreferences: {
      preferredTimeBlocks: [
        { startHour: 14, startMinute: 0, endHour: 17, endMinute: 0, label: 'Afternoon focus' },
        { startHour: 18, startMinute: 0, endHour: 20, endMinute: 0, label: 'Evening — post-work' },
      ],
      avoidDays: [], // No day is truly off-limits, but Saturdays are preferred for personal
      avoidTimeRanges: [
        { startHour: 6, startMinute: 0, endHour: 10, endMinute: 0, label: 'Too early — still sleeping or sluggish' },
      ],
      maxAppointmentsPerDay: 4,
      minGapBetweenAppointments: 15,
      preferredAppointmentDuration: 30,
      bufferBeforeAppointment: 5,
      bufferAfterAppointment: 5,
      willingnessToReschedule: 0.9,
      priorityOrder: ['professional', 'personal', 'medical', 'household'],
    },
    appointmentPreferences: [
      { type: 'doctor_annual', frequency: 'annual', frequencyValue: 1, preferredDuration: 30, priority: 'low', flexibility: 0.9, preferredTimeOfDay: 'afternoon', notes: 'Keeps postponing. Last physical was 18 months ago. "I feel fine."' },
      { type: 'dentist_cleaning', frequency: 'annual', frequencyValue: 1, preferredDuration: 45, priority: 'low', flexibility: 0.9, notes: 'Should go every 6 months but usually once a year, sometimes less.' },
      { type: 'therapy', frequency: 'biweekly', frequencyValue: 1, preferredDuration: 50, priority: 'medium', flexibility: 0.6, preferredTimeOfDay: 'evening', notes: 'Started 6 months ago for founder burnout. Does it via telehealth. Sometimes cancels for investor meetings.' },
      { type: 'haircut', frequency: 'monthly', frequencyValue: 1, preferredDuration: 30, priority: 'medium', flexibility: 0.7, preferredTimeOfDay: 'afternoon', notes: 'Fade at the barbershop on Valencia St. Tries to go monthly but sometimes stretches to 6 weeks.' },
      { type: 'gym_trainer', frequency: 'weekly', frequencyValue: 2, preferredDuration: 60, priority: 'medium', flexibility: 0.7, preferredTimeOfDay: 'evening', notes: 'Tries to do 2x/week at Equinox. Often cancels. Feels guilty about it.' },
      { type: 'networking_lunch', frequency: 'weekly', frequencyValue: 1, preferredDuration: 75, priority: 'critical', flexibility: 0.2, preferredTimeOfDay: 'afternoon', notes: 'Sacred. This is how he builds his business. VCs, potential hires, other founders.' },
      { type: 'mentor_meeting', frequency: 'biweekly', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.3, preferredTimeOfDay: 'afternoon', notes: 'Meets with his mentor, a former YC partner, every other Thursday.' },
      { type: 'team_standup', frequency: 'daily', frequencyValue: 1, preferredDuration: 15, priority: 'critical', flexibility: 0.1, preferredDayOfWeek: 1, preferredTimeOfDay: 'afternoon', notes: 'Daily standup at 2pm with the team. Non-negotiable on weekdays.' },
      { type: 'career_coach', frequency: 'monthly', frequencyValue: 1, preferredDuration: 60, priority: 'medium', flexibility: 0.5, preferredTimeOfDay: 'evening', notes: 'Executive coach. Works on leadership skills and managing stress.' },
      { type: 'car_maintenance', frequency: 'biannual', frequencyValue: 1, preferredDuration: 60, priority: 'low', flexibility: 0.95, notes: 'Has a Tesla. Barely remembers to schedule service.' },
    ],
    fullContext: `JAYDEN WILLIAMS — COMPREHENSIVE PROFILE

BIOGRAPHICAL BACKGROUND
Jayden Williams, 28, is the founder and CEO of PayBridge, a Series A fintech startup that simplifies international payments for freelancers. The company has 23 employees, $8M in funding, and is based in a WeWork in SoMa, San Francisco. Jayden dropped out of Stanford's CS program in his junior year to pursue the startup full-time (a decision his parents still haven't fully forgiven him for).

Jayden grew up in Oakland, the son of a public school teacher (mother, Denise) and an electrician (father, Marcus). He has a younger sister, Kayla (24), who just started medical school at UCSF. His parents are proud of his success but worry about his health and lifestyle. His mother calls every Sunday and he picks up about 60% of the time.

He lives in a one-bedroom apartment in SoMa, about a 10-minute walk from his office. He has no pets and no partner currently — his last relationship ended 8 months ago, partly because of his work schedule. He drives a Tesla Model 3 that he mostly uses for weekend trips.

DAILY ROUTINE
Jayden's schedule is intentionally fluid, which he sees as a feature, not a bug:
- 9:00-9:30 AM: Wakes up (sometimes later if he was up coding until 2 AM). Checks Slack and email immediately from bed.
- 9:30-10:00 AM: Shower, cold brew coffee from the fridge (never has time to make fresh), maybe a protein bar.
- 10:00-10:30 AM: Walks to WeWork or works from home depending on mood.
- 10:30 AM-2:00 PM: "Deep work" block — coding, product reviews, investor prep. He's protective of this time but frequently breaks it for "urgent" Slack messages.
- 2:00-2:15 PM: Daily team standup (sacred — never misses this on weekdays).
- 2:15-6:00 PM: Meetings, calls, networking. This is when he takes all external meetings.
- 6:00-7:30 PM: If he remembers, gym. If not, more work.
- 7:30-8:30 PM: Dinner — usually Uber Eats or DoorDash. Sometimes a dinner meeting.
- 8:30 PM-12:00 AM (or later): More coding, product thinking, or catching up on emails. He considers this his second "flow state."
- 12:00-1:30 AM: Wind down with YouTube, gaming, or doomscrolling Twitter/X.

HEALTH HISTORY & MEDICAL PREFERENCES
Jayden is in good physical health but neglects preventive care:
- No chronic conditions.
- Tends to ignore minor symptoms ("it'll go away").
- His last dentist visit was over a year ago. He had a cavity he kept postponing.
- Started therapy 6 months ago after experiencing burnout symptoms (insomnia, irritability, difficulty concentrating on non-work tasks). Does it via telehealth because he refuses to "waste time" commuting to a therapist's office.
- Tries to work out but is inconsistent. His personal trainer has learned to expect last-minute cancellations.
- Eats poorly — mostly delivery food, high sodium, not enough vegetables.
- Drinks 4-5 cold brews a day. His therapist has told him to cut back.

He prefers telehealth when available. He wants appointments to be short and efficient — he gets impatient with doctors who take their time. He has no loyalty to specific providers and will switch if someone offers a more convenient time slot.

DECISION-MAKING STYLE
Jayden is impulsive, opportunity-driven, and present-focused:
- He schedules things last-minute and frequently reschedules.
- He will cancel personal appointments for business opportunities without hesitation.
- He double-books and then figures it out later.
- He chronically underestimates how long things take.
- He values "high-leverage" activities (networking, investor meetings) over maintenance activities (health checkups, haircuts).
- He feels guilty about canceling the gym but does it anyway.
- He's surprisingly disciplined about his daily standup and networking lunches — these are his "business-sacred" items.

SCHEDULING CONFLICT RESOLUTION
When conflicts arise, Jayden:
1. Always keeps investor/VC meetings and networking lunches.
2. Always keeps team standup.
3. Will move or cancel therapy, gym, and personal care without much guilt.
4. Deprioritizes medical appointments ("I'm 28, I'm healthy").
5. Prefers to batch personal appointments on Saturdays but rarely follows through.
6. When something gets canceled, he often forgets to reschedule it.
7. Is very comfortable with back-to-back scheduling with minimal gaps.

VALUES HIERARCHY
1. Business growth and networking
2. Team leadership and company operations
3. Personal development (coaching, mentoring)
4. Physical fitness (aspirational but inconsistent)
5. Mental health (recognizes importance but deprioritizes in practice)
6. Routine medical care (lowest priority)`,
  },

  // ═══════════════════════════════════════════════════════════════
  // PROFILE 3: PRIYA RAMANATHAN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'priya',
    name: 'Priya Ramanathan',
    age: 41,
    occupation: 'Senior Product Manager at Google',
    location: 'Sunnyvale, CA',
    shortDescription: 'Working mom of 2 • Master scheduler • Efficiency-driven',
    avatar: '👩‍💼',
    accentColor: '#fb7185',
    accentColorLight: '#fda4af',
    accentGradient: 'linear-gradient(135deg, #e11d48, #fb7185, #fda4af)',
    schedulingPreferences: {
      preferredTimeBlocks: [
        { startHour: 9, startMinute: 15, endHour: 14, endMinute: 30, label: 'Kids at school — free window' },
      ],
      avoidDays: [0, 6], // Weekends are for family
      avoidTimeRanges: [
        { startHour: 7, startMinute: 0, endHour: 9, endMinute: 0, label: 'Morning chaos — school drop-off' },
        { startHour: 14, startMinute: 30, endHour: 16, endMinute: 0, label: 'School pickup + after-school activities' },
        { startHour: 17, startMinute: 30, endHour: 21, endMinute: 0, label: 'Family dinner + bedtime routine' },
      ],
      maxAppointmentsPerDay: 3,
      minGapBetweenAppointments: 30,
      preferredAppointmentDuration: 45,
      bufferBeforeAppointment: 15,
      bufferAfterAppointment: 15,
      willingnessToReschedule: 0.5,
      priorityOrder: ['medical', 'household', 'personal', 'professional'],
    },
    appointmentPreferences: [
      { type: 'doctor_annual', frequency: 'annual', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.3, preferredTimeOfDay: 'morning', notes: 'Usually postpones her own until kids are done. Goes to Sutter Health.' },
      { type: 'dentist_cleaning', frequency: 'biannual', frequencyValue: 1, preferredDuration: 45, priority: 'medium', flexibility: 0.5, preferredTimeOfDay: 'morning' },
      { type: 'pediatrician', frequency: 'biannual', frequencyValue: 1, preferredDuration: 45, priority: 'critical', flexibility: 0.1, preferredTimeOfDay: 'morning', notes: 'Two kids — Ananya (10) and Rohan (7). Each needs biannual checkups. These are NON-NEGOTIABLE.' },
      { type: 'dermatologist', frequency: 'annual', frequencyValue: 1, preferredDuration: 30, priority: 'medium', flexibility: 0.6, preferredTimeOfDay: 'morning' },
      { type: 'eye_exam', frequency: 'annual', frequencyValue: 1, preferredDuration: 30, priority: 'medium', flexibility: 0.7, preferredTimeOfDay: 'morning' },
      { type: 'gym_trainer', frequency: 'weekly', frequencyValue: 3, preferredDuration: 45, priority: 'high', flexibility: 0.4, preferredDayOfWeek: 1, preferredTimeOfDay: 'morning', notes: 'MWF 6:15 AM at the Y before the kids wake up. One of the few things she does purely for herself.' },
      { type: 'haircut', frequency: 'bimonthly', frequencyValue: 6, preferredDuration: 90, priority: 'low', flexibility: 0.8, preferredTimeOfDay: 'morning', notes: 'Goes to a salon in downtown Sunnyvale. Usually combines with another errand.' },
      { type: 'vet', frequency: 'biannual', frequencyValue: 1, preferredDuration: 45, priority: 'medium', flexibility: 0.5, preferredTimeOfDay: 'morning', notes: 'Golden retriever named Sunny. Regular checkups at VCA.' },
      { type: 'home_cleaning', frequency: 'weekly', frequencyValue: 1, preferredDuration: 180, priority: 'high', flexibility: 0.3, preferredDayOfWeek: 3, notes: 'Wednesday — cleaning crew comes. Priya works from home that day to supervise.' },
      { type: 'grocery_delivery', frequency: 'weekly', frequencyValue: 1, preferredDuration: 30, priority: 'medium', flexibility: 0.5, preferredDayOfWeek: 0, notes: 'Sunday Instacart delivery. She does the ordering Saturday night.' },
      { type: 'financial_advisor', frequency: 'quarterly', frequencyValue: 1, preferredDuration: 60, priority: 'medium', flexibility: 0.6, preferredTimeOfDay: 'morning', notes: 'Joint sessions with husband Vikram. Planning for kids\' college funds.' },
      { type: 'hobby_class', frequency: 'weekly', frequencyValue: 1, preferredDuration: 60, priority: 'low', flexibility: 0.7, preferredDayOfWeek: 6, preferredTimeOfDay: 'morning', notes: 'Saturday morning Bharatanatyam dance class. Trying to reconnect with her cultural roots.' },
    ],
    fullContext: `PRIYA RAMANATHAN — COMPREHENSIVE PROFILE

BIOGRAPHICAL BACKGROUND
Priya Ramanathan, 41, is a Senior Product Manager at Google, working on Google Maps features. She has been at Google for 9 years and is well-respected in her organization. She manages a team of 6 and reports to a Director. She works hybrid — 3 days in the Mountain View office (Tue/Wed/Thu) and 2 days from home (Mon/Fri).

Priya was born in Chennai, India, and moved to the US at age 8 when her father, an engineer, got a job at Intel. She grew up in Portland, Oregon, earned her BS in Computer Science at the University of Washington, and her MBA at Wharton. She met her husband, Vikram Ramanathan (a radiologist at Stanford Medical), during a friend's wedding in India. They've been married 14 years.

They live in a 4-bedroom house in Sunnyvale with their two children: Ananya (10, in 5th grade, very into competitive swimming and piano) and Rohan (7, in 2nd grade, loves Legos, soccer, and dinosaurs). They also have a golden retriever named Sunny (4 years old).

Priya's parents live in Fremont (about 40 minutes away) and help with childcare occasionally, especially when Vikram is on call. Her mother-in-law visits from India for 2-3 months every year, usually in winter.

DAILY ROUTINE (School Days — the dominant pattern)
Priya's life runs on a tight, optimized schedule built around her children's school hours:
- 5:45 AM: Alarm. She's not naturally a morning person but has trained herself.
- 6:00-6:45 AM: Gym (MWF — personal training at the YMCA) or morning jog (Tue/Thu).
- 6:45-7:15 AM: Shower, get ready.
- 7:15-8:00 AM: Family breakfast chaos. Packing lunches, checking homework, finding lost shoes. Vikram handles breakfast while Priya does lunches.
- 8:00-8:20 AM: School drop-off (Priya does this most days).
- 8:30 AM-2:15 PM: WORK BLOCK. On office days (Tue/Wed/Thu), she commutes to Mountain View (20 min). On WFH days (Mon/Fri), she works from her home office. This is also when she schedules all personal appointments — the 9:15 AM-2:30 PM window is precious.
- 2:30-3:00 PM: School pickup (Vikram picks up when Priya is in office; on WFH days, Priya does it).
- 3:00-5:30 PM: After-school activities shuttle. Ananya has swimming Mon/Wed, piano Tue. Rohan has soccer Tue/Thu. Priya or Vikram tag-team this.
- 5:30-6:30 PM: Homework help and family time.
- 6:30-7:30 PM: Family dinner (Priya tries to cook Indian food 4 nights a week; orders out the other 3).
- 7:30-8:30 PM: Kids' bedtime routine (reading, bath, storytime for Rohan).
- 8:30-10:00 PM: Priya's "second shift" — catching up on email, work tasks that didn't get done, or occasionally watching a show with Vikram.
- 10:00 PM: Bedtime.

HEALTH HISTORY & MEDICAL PREFERENCES
Priya is health-conscious but often deprioritizes her own care in favor of her children's:
- She is diligent about the kids' pediatric appointments — these are absolutely non-negotiable.
- Her own annual physical often gets pushed back by 2-3 months because "the kids come first."
- She has mild iron-deficiency anemia and takes supplements.
- Family history of Type 2 diabetes (both parents). She monitors her diet and exercises regularly.
- She had knee surgery (torn meniscus from a college track injury) in her early 30s. Occasional flare-ups.
- She tries to get dental cleanings on schedule but admits she's fallen behind.
- She does NOT currently see a therapist but her husband thinks she should — she's under significant stress managing work, kids, and household.

She prefers efficient, well-run medical practices. She values doctors who are on time and don't make her wait. She is fine with telehealth for straightforward visits.

DECISION-MAKING STYLE
Priya is a master optimizer:
- She batches errands and appointments to minimize trips and time waste.
- She strongly prefers weekday appointments during the 9:15-2:30 school window.
- She will combine a haircut with a nearby errand to "make the trip worth it."
- She uses shared Google calendars with Vikram to coordinate. Communication is key.
- She plans 2-4 weeks ahead for personal appointments, further ahead for kids' medical.
- She keeps a running list of "things to schedule" and knocks them out in batches.
- She is very protective of weekends — those are family time.
- She will sacrifice her own appointments before touching the kids' schedules.

SCHEDULING CONFLICT RESOLUTION
When conflicts arise, Priya:
1. ALWAYS keeps kids' medical appointments. Period.
2. Keeps home cleaning (the house falls apart without it).
3. Will move her own medical if it conflicts with kids' activities.
4. Values consistency — same day, same time when possible (easier to remember).
5. Will cancel her hobby class (dance) without much regret if something else comes up.
6. Tries to schedule her own doctor/dentist right after a pediatrician visit if they're in the same medical complex.
7. NEVER schedules personal appointments on weekends.

VALUES HIERARCHY
1. Children's health and wellbeing
2. Family time and routines
3. Work performance (she's ambitious but family comes first)
4. Household management (home cleaning, groceries, vet)
5. Personal health (important but often deprioritized)
6. Personal enrichment (dance class, alone time)`,
  },

  // ═══════════════════════════════════════════════════════════════
  // PROFILE 4: CARLOS GUTIERREZ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'carlos',
    name: 'Carlos Gutierrez',
    age: 35,
    occupation: 'Registered Nurse (Night Shift, ICU)',
    location: 'San Jose, CA',
    shortDescription: 'Night-shift nurse • Health-conscious • Limited availability',
    avatar: '👨‍⚕️',
    accentColor: '#fbbf24',
    accentColorLight: '#fde68a',
    accentGradient: 'linear-gradient(135deg, #d97706, #fbbf24, #fde68a)',
    schedulingPreferences: {
      preferredTimeBlocks: [
        { startHour: 15, startMinute: 30, endHour: 19, endMinute: 0, label: 'Afternoon window (after sleep)' },
      ],
      avoidDays: [1], // Mondays — recovery day after weekend shifts
      avoidTimeRanges: [
        { startHour: 0, startMinute: 0, endHour: 15, endMinute: 0, label: 'Sleeping or at work' },
        { startHour: 19, startMinute: 30, endHour: 23, endMinute: 59, label: 'Getting ready for shift / commuting' },
      ],
      maxAppointmentsPerDay: 2,
      minGapBetweenAppointments: 45,
      preferredAppointmentDuration: 45,
      bufferBeforeAppointment: 20,
      bufferAfterAppointment: 15,
      willingnessToReschedule: 0.4,
      priorityOrder: ['medical', 'personal', 'professional', 'household'],
    },
    appointmentPreferences: [
      { type: 'doctor_annual', frequency: 'annual', frequencyValue: 1, preferredDuration: 60, priority: 'critical', flexibility: 0.2, preferredTimeOfDay: 'afternoon', notes: 'Very thorough about his own health. Sees Dr. Fernandez at Kaiser.' },
      { type: 'dentist_cleaning', frequency: 'biannual', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.3, preferredTimeOfDay: 'afternoon' },
      { type: 'dermatologist', frequency: 'biannual', frequencyValue: 1, preferredDuration: 30, priority: 'high', flexibility: 0.4, preferredTimeOfDay: 'afternoon', notes: 'Skin checks — works under harsh hospital lighting, concerned about skin health.' },
      { type: 'physical_therapy', frequency: 'weekly', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.3, preferredDayOfWeek: 3, preferredTimeOfDay: 'afternoon', notes: 'For chronic lower back pain from lifting patients. Wednesday afternoons.' },
      { type: 'therapy', frequency: 'biweekly', frequencyValue: 1, preferredDuration: 50, priority: 'high', flexibility: 0.3, preferredTimeOfDay: 'afternoon', notes: 'Processes the emotional weight of ICU nursing. Has seen a lot of death. Important for his mental health.' },
      { type: 'gym_trainer', frequency: 'weekly', frequencyValue: 3, preferredDuration: 60, priority: 'high', flexibility: 0.4, preferredTimeOfDay: 'afternoon', notes: 'Works out 3x/week at a gym near his apartment. Focuses on core strength to prevent back injuries.' },
      { type: 'massage_spa', frequency: 'biweekly', frequencyValue: 1, preferredDuration: 60, priority: 'medium', flexibility: 0.5, preferredTimeOfDay: 'afternoon', notes: 'Sports massage for back and shoulders. Considers it medical, not luxury.' },
      { type: 'haircut', frequency: 'monthly', frequencyValue: 1, preferredDuration: 30, priority: 'low', flexibility: 0.8, preferredTimeOfDay: 'afternoon' },
      { type: 'vet', frequency: 'biannual', frequencyValue: 1, preferredDuration: 45, priority: 'high', flexibility: 0.4, preferredTimeOfDay: 'afternoon', notes: 'Has a rescue pit bull named Luna (3 years old). Very attached to her.' },
      { type: 'car_maintenance', frequency: 'quarterly', frequencyValue: 1, preferredDuration: 60, priority: 'medium', flexibility: 0.6, preferredTimeOfDay: 'afternoon', notes: 'Honda Civic. Keeps it well-maintained — long commute to the hospital.' },
      { type: 'meditation_class', frequency: 'weekly', frequencyValue: 1, preferredDuration: 45, priority: 'medium', flexibility: 0.5, preferredDayOfWeek: 5, preferredTimeOfDay: 'afternoon', notes: 'Friday afternoon mindfulness class. Helps him decompress before the weekend.' },
    ],
    fullContext: `CARLOS GUTIERREZ — COMPREHENSIVE PROFILE

BIOGRAPHICAL BACKGROUND
Carlos Gutierrez, 35, is a Registered Nurse working the night shift (7 PM to 7 AM, three 12-hour shifts per week: Wednesday, Thursday, and Saturday nights) in the ICU at Santa Clara Valley Medical Center. He has been a nurse for 11 years, starting right after earning his BSN from San Jose State University.

Carlos was born in San Jose to Mexican-American parents. His father, Roberto, is a retired auto mechanic, and his mother, Elena, works part-time at a Catholic school. He has two older sisters: Maria (39, a dental hygienist in Gilroy, married with three kids) and Isabel (37, an elementary school teacher in San Jose, married with one kid). Carlos is close with his entire family and has Sunday dinner at his parents' house most weeks.

Carlos lives in a one-bedroom apartment in the Willow Glen neighborhood of San Jose, about a 15-minute drive from the hospital. He lives alone with his rescue pit bull, Luna, whom he adopted from the San Jose Animal Shelter three years ago. Luna is his constant companion and a significant source of emotional support.

Carlos is single. He dated a fellow nurse, Andrea, for two years, but they broke up last year because their opposite schedules made the relationship nearly impossible. He's open to dating but finds it hard given his hours. He uses Hinge occasionally but rarely follows through on matches.

DAILY ROUTINE (Work Days — Wed, Thu, Sat)
Carlos's schedule is dictated entirely by his night shifts:
- 7:00 AM: Gets home from shift. Decompresses — takes Luna for a short walk (15 min).
- 7:30-8:00 AM: Shower, light snack (yogurt, fruit).
- 8:00 AM-3:00 PM: SLEEP. This is sacred. He has blackout curtains, a white noise machine, and his phone on Do Not Disturb. He will not schedule anything during this window.
- 3:00-3:30 PM: Wakes up. Coffee (pour-over, he's particular about it). Checks messages.
- 3:30-5:00 PM: APPOINTMENT/ERRAND WINDOW. This is the only reliable time he can schedule things on work days.
- 5:00-6:00 PM: Meal prep for the night shift. He takes nutrition seriously — high-protein, whole foods. He batch-cooks on his off days.
- 6:00-6:30 PM: Walk Luna (30 min).
- 6:30-6:45 PM: Get ready for work.
- 6:45 PM: Drive to hospital.
- 7:00 PM-7:00 AM: Night shift.

DAILY ROUTINE (Off Days — Sun, Mon, Tue, Fri)
- Monday is his "recovery day" — he sleeps in, does almost nothing, and will not schedule appointments.
- Tuesday, Friday, and Sunday are his productive days.
- On these days, his window expands: he's available roughly 10 AM-7 PM, but prefers 3:30-7 PM for consistency.
- Sunday afternoon/evening: family dinner at his parents' house. Non-negotiable.
- He uses Tuesday and Friday for most appointments, gym, errands.

HEALTH HISTORY & MEDICAL PREFERENCES
Carlos is unusually health-conscious for a man his age, likely because he sees the consequences of health neglect every day at work:
- Chronic lower back pain from 11 years of lifting and repositioning patients. Physical therapy is essential, not optional.
- He developed insomnia-related issues from years of night shifts. His circadian rhythm is permanently altered.
- He takes vitamin D supplements (night shift workers are commonly deficient).
- Family history of diabetes (father is Type 2 diabetic). Carlos is vigilant about his diet and exercise.
- He sees a therapist biweekly to process the emotional toll of ICU work. He's witnessed hundreds of deaths, including several pediatric cases that still haunt him. He considers therapy as important as physical healthcare.
- He has no current major health issues but is proactive because "I see what happens when people aren't."

He prefers in-person appointments. He values providers who understand night-shift workers' unique constraints. He has established relationships with all his providers and doesn't like switching. He needs appointments to be geographically close — he doesn't want to waste his narrow free window commuting.

DECISION-MAKING STYLE
Carlos is pragmatic and protective of his limited time:
- His scheduling window is extremely narrow (3:30-7 PM, and only on certain days).
- He plans appointments weeks in advance because last-minute is not an option with his schedule.
- He is very protective of his sleep schedule — nothing before 3 PM on work days, nothing before 10 AM on off days.
- He values providers who are close to his apartment (Willow Glen area of San Jose).
- He doesn't batch appointments the way Priya does — he prefers one appointment per trip because he doesn't like feeling rushed.
- He is disciplined about recurring appointments (PT, therapy, gym) because he's seen what happens when people skip them.
- He treats Mondays as sacred recovery time. He will never schedule anything on a Monday.

SCHEDULING CONFLICT RESOLUTION
When conflicts arise, Carlos:
1. Always keeps physical therapy — his back can't afford to miss sessions.
2. Always keeps therapy — his mental health depends on it.
3. Will move gym sessions but not cancel them entirely (will do a home workout if needed).
4. Will reschedule vet appointments but never skip them — Luna depends on him.
5. Prefers Tuesday and Friday for appointments. Will use off-day mornings only if desperate.
6. Will cancel haircuts and car maintenance before anything else.
7. NEVER schedules on Mondays. NEVER schedules before 3 PM on work days.
8. Sunday evenings are family dinner — blocked entirely.

VALUES HIERARCHY
1. Physical health (back care, fitness, preventive medicine)
2. Mental health (therapy, meditation, emotional processing)
3. Luna's care (vet, walks, companionship)
4. Family connections (Sunday dinners, sisters' kids)
5. Sleep and recovery (non-negotiable biological need)
6. Personal maintenance (haircut, car)`,
  },
];

export function getProfile(id: string): Profile | undefined {
  return profiles.find((p) => p.id === id);
}

export function getProfileIds(): string[] {
  return profiles.map((p) => p.id);
}

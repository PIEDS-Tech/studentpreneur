/**
 * All copy and data for the landing page lives here, so the components stay
 * presentational. Sources: Studentpreneur 1.0 deck and the v2 teachers' deck.
 */
import type { StaticImageData } from "next/image";

import coverPitch from "@/assets/photos/cover-pitch.jpg";
import heroStage from "@/assets/photos/hero-stage.jpg";
import pitchDuo from "@/assets/photos/pitch-duo.jpg";
import workshopDesk from "@/assets/photos/workshop-desk.jpg";
import presidentMic from "@/assets/photos/president-mic.jpg";
import demoday from "@/assets/photos/demoday.jpg";
import classroom from "@/assets/photos/classroom.jpg";
import presenting from "@/assets/photos/presenting.jpg";
import lecture from "@/assets/photos/lecture.jpg";
import stageTrio from "@/assets/photos/stage-trio.jpg";
import founderTalk from "@/assets/photos/bits-founder-talk.jpg";
import audienceQuestion from "@/assets/photos/bits-audience-question.jpg";
import auditorium from "@/assets/photos/bits-auditorium.jpg";
import labBuild from "@/assets/photos/lab-build.jpg";
import workshopPodium from "@/assets/photos/workshop-podium.jpg";
import laptopMentor from "@/assets/photos/laptop-mentor.jpg";
import demoStageWide from "@/assets/photos/demo-stage-wide.jpg";
import classWide from "@/assets/photos/class-wide.jpg";
import demoPitches from "@/assets/photos/demo-pitches.jpg";
import teamWithStudents from "@/assets/photos/team-with-students.jpg";
import demoAudience from "@/assets/photos/demo-audience.jpg";
import studentsOnStage from "@/assets/photos/students-on-stage.jpg";
import labMentoring from "@/assets/photos/lab-mentoring.jpg";
import teamsAtWork from "@/assets/photos/teams-at-work.jpg";

import swiggy from "@/assets/logos/swiggy.png";
import redbus from "@/assets/logos/redbus.png";
import postman from "@/assets/logos/postman.png";
import groww from "@/assets/logos/groww.png";
import bigbasket from "@/assets/logos/bigbasket.png";
import pixxel from "@/assets/logos/pixxel.png";
import hotmail from "@/assets/logos/hotmail.png";
import sandisk from "@/assets/logos/sandisk.png";
import bitsCrest from "@/assets/logos/bits.png";
import moe from "@/assets/logos/moe.png";
import dst from "@/assets/logos/dst.png";
import piedsFull from "@/assets/logos/pieds-full.png";

export const SITE = {
  name: "Studentpreneur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Studentpreneur by PIEDS, BITS Pilani | Entrepreneurship programme for schools",
  description:
    "Studentpreneur turns school students into founders. A hands-on entrepreneurship programme for Grades 8–12, run by PIEDS, the startup incubator of BITS Pilani: two days of in-person workshops, an online week with a live leaderboard, and Demo Day at BITS Pilani.",
  minStudents: 60,
} as const;

export type Photo = { src: StaticImageData; alt: string; caption?: string };

export const photos = {
  coverPitch: { src: coverPitch, alt: "Two students pitching with microphones on stage at Birla Balika Vidyapeeth" },
  heroStage: { src: heroStage, alt: "A BITS Pilani mentor gives a thumbs-up on stage" },
  pitchDuo: { src: pitchDuo, alt: "Two students rehearsing their pitch" },
  workshopDesk: { src: workshopDesk, alt: "Students work through a workshop exercise with a mentor" },
  presidentMic: { src: presidentMic, alt: "A PIEDS team member speaking to the class" },
  demoday: { src: demoday, alt: "Two students pitch on the auditorium stage to a full hall" },
  classroom: { src: classroom, alt: "A full classroom of students working on their decks" },
  presenting: { src: presenting, alt: "A student rehearsing her pitch in a classroom" },
  lecture: { src: lecture, alt: "A workshop session with a projected slide" },
  stageTrio: { src: stageTrio, alt: "Three students pitching on stage" },
  founderTalk: { src: founderTalk, alt: "A full house for a founder talk at BITS Pilani" },
  audienceQuestion: { src: audienceQuestion, alt: "A BITS student asks a speaker a question" },
  auditorium: { src: auditorium, alt: "A packed auditorium at BITS Pilani" },
  labBuild: { src: labBuild, alt: "Students building on computers in the lab" },
  workshopPodium: { src: workshopPodium, alt: "A student presents at the podium during the workshop" },
  laptopMentor: { src: laptopMentor, alt: "A mentor works with students at a laptop" },
  demoStageWide: { src: demoStageWide, alt: "Students pitching on stage at Demo Day" },
  classWide: { src: classWide, alt: "A classroom of students listening during the workshop" },
  demoPitches: { src: demoPitches, alt: "A team pitches at Demo Day" },
  teamWithStudents: { src: teamWithStudents, alt: "The BITS team with students on stage" },
  demoAudience: { src: demoAudience, alt: "The audience at Demo Day" },
  studentsOnStage: { src: studentsOnStage, alt: "Students on stage at Demo Day" },
  labMentoring: { src: labMentoring, alt: "Mentoring in the computer lab" },
  teamsAtWork: { src: teamsAtWork, alt: "Teams at work during the workshop" },
} satisfies Record<string, Photo>;

export const logos = { bitsCrest, moe, dst, piedsFull };

/* ---------- navigation ---------- */
export const chapters = [
  { id: "letter", label: "Dear teacher", color: "var(--paper)" },
  { id: "bitsians", label: "Built by BITSians", color: "var(--cyan)" },
  { id: "pieds", label: "PIEDS", color: "var(--lavender)" },
  { id: "journey", label: "How it runs", color: "var(--tangerine)" },
  { id: "workshop", label: "Workshops", color: "var(--sand)" },
  { id: "activities", label: "Activities", color: "var(--violet)" },
  { id: "online-week", label: "Online week", color: "var(--cyan)" },
  { id: "demoday", label: "Demo day", color: "var(--cobalt)" },
  { id: "edition-one", label: "Edition 1.0", color: "var(--lavender)" },
  { id: "photobook", label: "Photobook", color: "var(--butter)" },
  { id: "programme", label: "What’s included", color: "var(--lemon)" },
  { id: "interest", label: "Register interest", color: "var(--tangerine)" },
] as const;

/* ---------- built by BITSians ---------- */
export const companies = [
  { name: "Swiggy", logo: swiggy },
  { name: "redBus", logo: redbus },
  { name: "Postman", logo: postman },
  { name: "Groww", logo: groww },
  { name: "bigbasket", logo: bigbasket },
  { name: "Pixxel", logo: pixxel },
  { name: "Hotmail", logo: hotmail },
  { name: "SanDisk", logo: sandisk },
];

export const bitsStats = [
  { value: 17, suffix: " + 2", label: "unicorns and a decacorn founded by BITS alumni, including Swiggy, BigBasket and Groww" },
  { value: 1, prefix: "#", label: "in India for deep-tech founders: 140 deep-tech companies started by BITS alumni (2026)" },
  { value: 2200, suffix: "+", label: "startups founded by BITS alumni around the world (estimate)" },
];

export const campusPoints = [
  { title: "Exposure from day one", text: "Talks, events and founders on campus from the first semester." },
  { title: "Startups are everyday conversation", text: "In hostels, canteens and classrooms." },
  { title: "Freedom to build", text: "BITS lets students take up to a year off to build a startup." },
];

export const startedAsStudents = [
  { name: "Pixxel", text: "A space-tech startup founded by two BITS students in their final year." },
  { name: "Dihadi", text: "Started by three PIEDS student-team members, selected for the 2026 Hult Prize Global Accelerator (UK)." },
];

/* ---------- PIEDS ---------- */
export const piedsStats = [
  { value: 300, suffix: "+", label: "startups formed by BITS students and alumni since the incubator began in 2004", tone: "tangerine" },
  { value: 240, label: "startups shortlisted at Ignite ’26, PIEDS’ pitching event, including 136 deep-tech startups", tone: "cyan" },
] as const;

export const programmes = [
  { name: "Solve for Pilani", mask: "/brand/solve.png", ratio: "900/367", color: "var(--lemon)", text: "Helps Pilani’s local businesses scale, innovate and stay competitive." },
  { name: "Chai pe Charcha", mask: "/brand/chai.png", ratio: "900/519", color: "var(--sand)", text: "A space for BITS students to share, collaborate and learn from each other’s challenges." },
  { name: "Udaan", mask: "/brand/udaan.png", ratio: "860/224", color: "var(--cyan)", text: "A virtual bootcamp connecting startups with mentors and resources." },
  { name: "Ignite", mask: "/brand/ignite.png", ratio: "900/329", color: "var(--tangerine)", text: "A pitching event where startups pitch to angel investors and VCs." },
  { name: "Enspire", color: "var(--lavender)", text: "A talk show where well-known entrepreneurs share insights and future plans." },
];

export const backers = [
  { name: "BITS Pilani", note: "Institution of Eminence", logo: bitsCrest },
  { name: "Ministry of Education", note: "Govt. of India (IoE status)", logo: moe },
  { name: "DST, Govt. of India", note: "Supported the incubator since 2004", logo: dst },
];

/* ---------- journey ---------- */
export const pillarsOfJourney = [
  { title: "Learn", text: "Use first-principles thinking to find a real problem. Students bring their own problem statements.", photo: photos.workshopPodium, tone: "lemon" },
  { title: "Build", text: "Turn that problem into a business idea, with assignments through the online week.", photo: photos.labBuild, tone: "tangerine" },
  { title: "Present", text: "Pitch on Demo Day, with parents in the audience.", photo: photos.stageTrio, tone: "cyan" },
] as const;

export const runSteps = [
  { title: "Workshops", when: "Days 1–2, in person at your school", text: "The BITS team visits. Students use first-principles thinking to find a real problem, then learn how to turn it into a business." },
  { title: "Online week", when: "Online", text: "Assignments daily or on alternate days. Feedback on the portal, and scores on a live leaderboard." },
  { title: "Demo Day", when: "At BITS Pilani", text: "Teams pitch to a jury. Demo Day scores are added to the leaderboard. Parents are invited." },
  { title: "APOGEE", when: "For finalists", text: "Finalists get to take part in APOGEE, BITS Pilani’s national tech fest." },
];

/* ---------- workshop & activities (Edition 1.0 deck) ---------- */
export const workshopPillars = [
  { title: "Finance", text: "Budgeting, cost analysis, pricing strategies, revenue models, fundraising, managing cash flow.", bg: "var(--sand)", fg: "#5a4a26" },
  { title: "Ideation", text: "Brainstorming creative solutions, identifying opportunities, refining ideas, developing viable startup concepts.", bg: "var(--fog)", fg: "var(--ink)" },
  { title: "Validation", text: "Testing ideas, gathering user feedback, analysing market fit, refining based on insights, ensuring product-market alignment.", bg: "var(--tangerine)", fg: "#ffd23a" },
  { title: "Execution", text: "Building prototypes, defining a roadmap, setting milestones, implementing solutions, testing scalability, refining processes.", bg: "var(--cobalt)", fg: "#7fd8ff" },
];

export const activities = [
  { title: "Founder’s Wall", text: "Students explore the traits of famous entrepreneurs and build a wall of inspiration.", tone: "violet", x: 2, y: 4, r: -4 },
  { title: "Decode a failed startup", text: "Students analyse why a real startup failed, then discover the actual reasons behind it.", tone: "lemon", x: 24, y: 30, r: 3 },
  { title: "Solve It", text: "Students speak out problems they face every day and ideate solutions with their peers and us.", tone: "violet", x: 47, y: 2, r: -2 },
  { title: "Logo Jam", text: "A quick-fire challenge: sketch a logo for a made-up brand in 10 minutes.", tone: "cyan", x: 68, y: 34, r: 5 },
  { title: "Guess the Entrepreneur", text: "A meme-based game to guess the entrepreneur or startup moment. Learn through laughter.", tone: "violet", x: 74, y: 0, r: -6 },
] as const;

/* ---------- online week ---------- */
export const progressFeatures = [
  { title: "Daily assignments", text: "Given every day or on alternate days through the online week." },
  { title: "Feedback on the portal", text: "Each team gets feedback on its work in the Studentpreneur app." },
  { title: "Live leaderboard", text: "Assignment scores, internal scores from the organising team, and Demo Day scores, all in one place." },
];

/** Sample teams, as shown in the deck's leaderboard mock-up. */
export const sampleLeaderboard = [
  { team: "Team Orbit", points: 920 },
  { team: "Team Spark", points: 875 },
  { team: "Team Root", points: 810 },
  { team: "Team Nova", points: 760 },
  { team: "Team Loop", points: 705 },
];

/* ---------- outcomes ---------- */
export const takeaways = [
  { title: "Real-world skills", text: "Problem-solving, teamwork, public speaking and money sense, learned by doing.", tone: "lemon" },
  { title: "BITS Pilani exposure", text: "Students learn from BITS students and mentors, and pitch on the BITS campus.", tone: "paper" },
  { title: "A proud day for parents", text: "Parents watch their children pitch their own startup ideas at Demo Day.", tone: "tangerine" },
  { title: "A national stage", text: "Finalists get to take part in APOGEE, BITS Pilani’s national tech fest.", tone: "cyan" },
] as const;

/* ---------- edition 1.0 ---------- */
export const accolades = [
  "India’s Best Schools 2024, Career360",
  "ET Tech-X School Excellence Award 2023–24",
  "EducationWorld India School Rankings 2023 & 2019",
  "Brainfeed School Excellence Awards 2022–23",
];

export const pitchStages = [
  { until: 12, title: "Pick a problem", text: "Teams choose a problem statement that came up in the workshop activities." },
  { until: 36, title: "Meet your mentor", text: "A dedicated mentor guides the team, offers suggestions and helps them past blockers." },
  { until: 60, title: "Build the deck", text: "The idea becomes a pitch deck: problem, solution, market, money." },
  { until: 72, title: "Rehearse the pitch", text: "Teams polish the story and get ready for Demo Day." },
];

/* ---------- photobook ---------- */
export const photobook: Photo[] = [
  { ...photos.coverPitch, caption: "Pitching at Birla Balika Vidyapeeth" },
  { ...photos.teamWithStudents, caption: "The BITS team with students" },
  { ...photos.classWide, caption: "Day one, workshop hall" },
  { ...photos.workshopDesk, caption: "Ideas on paper first" },
  { ...photos.laptopMentor, caption: "Mentors at every table" },
  { ...photos.labMentoring, caption: "Mentoring in the lab" },
  { ...photos.labBuild, caption: "Building in the lab" },
  { ...photos.teamsAtWork, caption: "Teams at work" },
  { ...photos.lecture, caption: "Startup fundamentals" },
  { ...photos.workshopPodium, caption: "First time at the podium" },
  { ...photos.presenting, caption: "Rehearsal, take three" },
  { ...photos.classroom, caption: "72 hours to a pitch deck" },
  { ...photos.pitchDuo, caption: "Pitch making" },
  { ...photos.demoPitches, caption: "Demo Day pitches" },
  { ...photos.studentsOnStage, caption: "Students on stage" },
  { ...photos.demoAudience, caption: "Audience at Demo Day" },
  { ...photos.demoStageWide, caption: "The jury is listening" },
  { ...photos.founderTalk, caption: "Meanwhile at BITS: a founder talk" },
];

/* ---------- programme ---------- */
export const included = [
  { title: "2 days of in-person workshops", note: "At your school, with the BITS team" },
  { title: "1 week of online assignments", note: "With feedback on the Studentpreneur portal" },
  { title: "Live leaderboard", note: "Assignment, internal and Demo Day scores" },
  { title: "Demo Day", note: "Parents invited" },
  { title: "A chance at APOGEE", note: "For finalists" },
];

export const responsibilities = {
  school: [
    "Choose 60+ students from Grades 8–12",
    "One teacher with each team",
    "Host the 2 workshop days (hall, projector, computer lab)",
    "Help students reach Demo Day at BITS Pilani, and invite parents",
  ],
  pieds: [
    "BITS team on both workshop days",
    "Online assignments, feedback and the portal",
    "The Demo Day event and jury at BITS Pilani",
    "A path to APOGEE for finalists",
  ],
};

export const faqs = [
  { q: "Who can take part?", a: "Students from Grades 8 to 12. A school signs up with at least 60 students." },
  { q: "Where does it happen?", a: "Two workshop days happen at your school. The online week runs on the Studentpreneur portal. Demo Day is at BITS Pilani." },
  { q: "What do teachers need to do?", a: "Pick the students, have one teacher accompany each team, host the two workshop days, and help students reach Demo Day." },
];

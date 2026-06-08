const slides = Array.from(document.querySelectorAll(".slide"));
const progress = document.getElementById("progressBar");
const badge = document.getElementById("slideBadge");
const pathwayRail = document.querySelector(".pathway-rail");
const stageLinks = Array.from(document.querySelectorAll(".pathway-rail a"));
const helpButton = document.querySelector("[data-help]");
const literatureButton = document.querySelector("[data-literature]");
const helpPopover = document.getElementById("helpPopover");
const literaturePopover = document.getElementById("literaturePopover");
const helpSlideTitle = document.getElementById("helpSlideTitle");
const helpBody = document.getElementById("helpBody");
const literatureSlideTitle = document.getElementById("literatureSlideTitle");
const literatureList = document.getElementById("literatureList");
const titleVideoSlide = document.querySelector("[data-title-video]");
const titleMotionVideo = titleVideoSlide?.querySelector(".title-motion-video");
const titleMotionTrigger = titleVideoSlide?.querySelector(".title-motion-trigger");
const structureIndex = slides.findIndex((slide) => slide.id === "structure" || slide.id === "program-model");
const slideIndexById = new Map(slides.map((slide, index) => [slide.id, index]));
const pathwayRanges = stageLinks.map((link) => {
  const from = slideIndexById.get(link.dataset.from || "");
  const to = slideIndexById.get(link.dataset.to || link.dataset.from || "");
  return {
    link,
    from: Number.isInteger(from) ? from : -1,
    to: Number.isInteger(to) ? to : Number.isInteger(from) ? from : -1,
  };
});

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

function scrollHashTargetIntoView() {
  if (!location.hash || location.hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target?.classList.contains("slide")) target.scrollIntoView({ block: "start" });
}

requestAnimationFrame(scrollHashTargetIntoView);
window.addEventListener("hashchange", () => requestAnimationFrame(scrollHashTargetIntoView));

const stageLabels = {
  "topic-1": "Welcome",
  "topic-2": "Problem",
  "topic-3": "Connection and structure",
  "topic-4": "AI-supported writing assessment",
  "topic-5": "Formative support",
  "topic-6": "GENIUS/DARIUS",
  "topic-7": "AI-feedback results",
  "topic-8": "AI chats and free use",
  "topic-9": "Argumentation background",
  "topic-10": "PISA data source",
  "topic-11": "PISA process",
  "topic-12": "Vision and Dortmund connection",
  "topic-13": "Danke",
};

const slideReferences = {
  "starting-point": ["Gen-W project: Generative AI meets PISA", "AI-supported writing process traces", "Educational assessment and teacher-use problem framing"],
  "opening-thesis": ["TU Dortmund call for Educational Data Science", "IFS profile and Faculty of Statistics bridge"],
  "dortmund-fit": ["TU Dortmund call for Educational Data Science", "Research Statement Thorben Jansen TU Dortmund"],
  "program-model": ["Dortmund talk structure: AI feedback, AI chats, and vision", "Opportunity-Propensity / Angebots-Nutzungs models", "Hattie & Timperley, 2007", "Situated Expectancy-Value Theory"],
  "writing-testbed": ["DARIUS learner corpus and writing-process data", "Schaller, Jansen, et al. (2024a)", "German PISA 2025 extension on argumentative writing with and without AI"],
  "trace-assessment": ["TRACE teacher assessment simulation", "Jansen et al. (2026)", "Teacher training from automated writing assessment evidence"],
  "trace-g": ["DFG project TRACE-G: Training Assessment Competencies in German"],
  "science-human-ratings": ["Schaller, Jansen, et al. (2024a)", "Science energy argumentation task", "Science argumentation annotation manual"],
  "formative-assessment-foundation": ["Hattie & Jansen (submitted)", "Hattie & Timperley, 2007", "Black & Wiliam, 2009"],
  "foreign-language-human-ratings": ["Keller, Jansen, et al. (2024)", "2,314 TOEFL argumentative essays from year 11 students", "Foreign-language argumentation rating task"],
  "kiss-pro-grant": ["KISS-Pro / Lernen:digital project documentation", "BMBF / NextGenerationEU funding"],
  "kiss-course": ["open.hpi.de course: less correcting, more teaching with AI-supported feedback"],
  "darius-intervention": ["DARIUS: Digital argumentation instruction for science", "Deutsche Telekom Stiftung project"],
  "feedback-question": ["Jansen et al. AI-feedback moderation studies", "Bahr, Jansen, et al. (2025)", "Feedback engagement and student-characteristics framework"],
  "feedback-study-design": ["DARIUS effectiveness study procedure"],
  "feedback-main-result": ["Jansen et al. (2025): feedback from generative AI and engagement in text revision", "Fleckenstein, Jansen, et al. (2024)"],
  "feedback-mechanism": ["Jansen et al. (2024): comparing generative AI and expert feedback", "Bahr, Jansen, et al. (2025)", "Bahr, Jansen, et al. (2026)", "Jansen et al. (2025): engagement in text revision"],
  "differential-effects": ["Jansen et al. (2026)", "Tanz, Jansen, et al. (submitted)", "Supplement_Receptivity Study"],
  "feedback-process": ["Hattie & Jansen (submitted)", "Multistage Feedback Uptake Model"],
  "effective-argumentation-course": ["Student online course: Effective argumentation instruction", "Transfer from writing research to scalable student learning support"],
  "pisa-window": ["Gen-W project: Generative AI meets PISA", "German PISA 2025 extension", "PISA Foreign Language Assessment"],
  "pisa-products": ["PISA chatbot score-distribution analyses", "Automated scoring and process indicators", "Product evidence with and without chatbot access"],
  "pisa-process": ["PISA process evidence", "Keystrokes, writing intensity, and paste events", "AI integration strategies in large-scale writing assessment"],
  "leseband": ["Leseband+ project; Auridis Stiftung and Victor Rolff Stiftung"],
  "generational-ai": ["Generational AI Horizon Europe project"],
  "summary-contribution": ["TU Dortmund / IFS / Faculty of Statistics collaboration anchors", "Research Center Agile PAIR", "UA Ruhr and Data Science programs"],
  "closing": ["Team and collaboration network"],
  "ai-chats-transition": ["Transition to AI-supported writing with chatbots", "Gen-W project: Generative AI meets PISA", "PISA Foreign Language Assessment"],
};

const bibliographyEntries = new Map(Object.entries({
  "hattie & timperley, 2007": ["Hattie, J., & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81-112. https://doi.org/10.3102/003465430298487"],
  "hattie and timperley, 2007": ["Hattie, J., & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81-112. https://doi.org/10.3102/003465430298487"],
  "hattie & jansen, submitted": ["Jansen, T., Gašević, D., Hopfenbeck, T., & Hattie, J. (submitted). A century of research on how humans learn from feedback: Lessons to apply to machine learning. Manuscript submitted for publication."],
  "hattie & jansen (submitted)": ["Jansen, T., Gašević, D., Hopfenbeck, T., & Hattie, J. (submitted). A century of research on how humans learn from feedback: Lessons to apply to machine learning. Manuscript submitted for publication."],
  "black & wiliam, 2009": ["Black, P., & Wiliam, D. (2009). Developing the theory of formative assessment. Educational Assessment, Evaluation and Accountability, 21(1), 5-31. https://doi.org/10.1007/s11092-008-9068-5"],
  "situated expectancy-value theory": ["Eccles, J. S., & Wigfield, A. (2020). From expectancy-value theory to situated expectancy-value theory: A developmental, social cognitive, and sociocultural perspective on motivation. Contemporary Educational Psychology, 61, Article 101859. https://doi.org/10.1016/j.cedpsych.2020.101859"],
  "schaller, jansen et al., 2024a": ["Schaller, N.-J., Jansen, T., Pünjer, H., Bahr, L., Höft, L., & colleagues. (2024). DARIUS: A comprehensive learner corpus for argument mining in German-language essays. https://doi.org/10.31219/osf.io/3t2w8"],
  "schaller, jansen, et al. (2024a)": ["Schaller, N.-J., Jansen, T., Pünjer, H., Bahr, L., Höft, L., & colleagues. (2024). DARIUS: A comprehensive learner corpus for argument mining in German-language essays. https://doi.org/10.31219/osf.io/3t2w8"],
  "keller, lohmann, trueb, fleckenstein, meyer, jansen, & moeller, 2024": ["Keller, S. D., Lohmann, J., Trüb, R., Fleckenstein, J., Meyer, J., Jansen, T., & Möller, J. (2024). Language quality, content, structure: What analytic ratings tell us about EFL writing skills at upper secondary school level in Germany and Switzerland. Assessing Writing, 65, Article 101129."],
  "keller, lohmann, trüb, fleckenstein, meyer, jansen, & möller, 2024": ["Keller, S. D., Lohmann, J., Trüb, R., Fleckenstein, J., Meyer, J., Jansen, T., & Möller, J. (2024). Language quality, content, structure: What analytic ratings tell us about EFL writing skills at upper secondary school level in Germany and Switzerland. Assessing Writing, 65, Article 101129."],
  "keller, jansen, et al. (2024)": ["Keller, S. D., Lohmann, J., Trüb, R., Fleckenstein, J., Meyer, J., Jansen, T., & Möller, J. (2024). Language quality, content, structure: What analytic ratings tell us about EFL writing skills at upper secondary school level in Germany and Switzerland. Assessing Writing, 65, Article 101129."],
  "jansen et al. (2024)": ["Jansen, T., Höft, L., Bahr, L., Fleckenstein, J., Möller, J., Köller, O., & Meyer, J. (2024). Comparing generative AI and expert feedback to students' writing: Insights from student teachers. Psychologie in Erziehung und Unterricht. https://doi.org/10.2378/peu2024.art08d"],
  "jansen et al., 2024: comparing generative ai and expert feedback": ["Jansen, T., Höft, L., Bahr, L., Fleckenstein, J., Möller, J., Köller, O., & Meyer, J. (2024). Comparing generative AI and expert feedback to students' writing: Insights from student teachers. Psychologie in Erziehung und Unterricht. https://doi.org/10.2378/peu2024.art08d"],
  "jansen et al. (2024): comparing generative ai and expert feedback": ["Jansen, T., Höft, L., Bahr, L., Fleckenstein, J., Möller, J., Köller, O., & Meyer, J. (2024). Comparing generative AI and expert feedback to students' writing: Insights from student teachers. Psychologie in Erziehung und Unterricht. https://doi.org/10.2378/peu2024.art08d"],
  "fleckenstein, jansen, meyer, trüb et al. (2024)": ["Fleckenstein, J., Jansen, T., Meyer, J., Trüb, R., Raubach, E. E., & Keller, S. D. (2024). How am I going? Behavioral engagement mediates the effect of individual feedback on writing performance. Learning and Instruction, 93, Article 101977."],
  "Fleckenstein, Jansen, et al. (2024)": ["Fleckenstein, J., Jansen, T., Meyer, J., Trüb, R., Raubach, E. E., & Keller, S. D. (2024). How am I going? Behavioral engagement mediates the effect of individual feedback on writing performance. Learning and Instruction, 93, Article 101977."],
  "fleckenstein, jansen, meyer, trueb et al. (2024)": ["Fleckenstein, J., Jansen, T., Meyer, J., Trüb, R., Raubach, E. E., & Keller, S. D. (2024). How am I going? Behavioral engagement mediates the effect of individual feedback on writing performance. Learning and Instruction, 93, Article 101977."],
  "fleckenstein, jansen, meyer, trüb et al., 2024": ["Fleckenstein, J., Jansen, T., Meyer, J., Trüb, R., Raubach, E. E., & Keller, S. D. (2024). How am I going? Behavioral engagement mediates the effect of individual feedback on writing performance. Learning and Instruction, 93, Article 101977."],
  "bahr, hoeft, lipnevich, meyer, & jansen, 2025": ["Bahr, J. L., Höft, L., Lipnevich, A. A., Meyer, J., & Jansen, T. (2025). Exploring students' receptivity to feedback: A latent profile analysis. Manuscript submitted for publication."],
  "bahr, hoeft, lipnevich, meyer, & jansen (2025)": ["Bahr, J. L., Höft, L., Lipnevich, A. A., Meyer, J., & Jansen, T. (2025). Exploring students' receptivity to feedback: A latent profile analysis. Manuscript submitted for publication."],
  "bahr, jansen, et al. (2025)": ["Bahr, J. L., Höft, L., Lipnevich, A. A., Meyer, J., & Jansen, T. (2025). Exploring students' receptivity to feedback: A latent profile analysis. Manuscript submitted for publication."],
  "bahr, hoeft, meyer, & jansen, 2026": ["Bahr, J. L., Höft, L., Meyer, J., & Jansen, T. (2026). Receptivity to instructional computer-based feedback (RIF): A multistudy validation of a German RIF scale. European Journal of Psychological Assessment. https://doi.org/10.1027/1015-5759/a000841"],
  "bahr, hoeft, meyer, & jansen (2026)": ["Bahr, J. L., Höft, L., Meyer, J., & Jansen, T. (2026). Receptivity to instructional computer-based feedback (RIF): A multistudy validation of a German RIF scale. European Journal of Psychological Assessment. https://doi.org/10.1027/1015-5759/a000841"],
  "bahr, jansen, et al. (2026)": ["Bahr, J. L., Höft, L., Meyer, J., & Jansen, T. (2026). Receptivity to instructional computer-based feedback (RIF): A multistudy validation of a German RIF scale. European Journal of Psychological Assessment. https://doi.org/10.1027/1015-5759/a000841"],
  "jansen et al., 2025: feedback from generative ai and engagement in text revision": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., Höft, L., & colleagues. (2025). Feedback from generative AI: Correlates of student engagement in text revision from 655 classes. Manuscript in preparation."],
  "jansen et al., 2025: engagement in text revision": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., Höft, L., & colleagues. (2025). Feedback from generative AI: Correlates of student engagement in text revision from 655 classes. Manuscript in preparation."],
  "jansen et al. (2025): feedback from generative ai and engagement in text revision": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., Höft, L., & colleagues. (2025). Feedback from generative AI: Correlates of student engagement in text revision from 655 classes. Manuscript in preparation."],
  "jansen et al. (2025): engagement in text revision": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., Höft, L., & colleagues. (2025). Feedback from generative AI: Correlates of student engagement in text revision from 655 classes. Manuscript in preparation."],
  "jansen et al. (2025)": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., Höft, L., & colleagues. (2025). Feedback from generative AI: Correlates of student engagement in text revision from 655 classes. Manuscript in preparation."],
  "jansen et al., 2026": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., & Höft, L. (2026). For whom does AI feedback support writing self-efficacy? The role of students' achievement goal orientation and writing skills. Psychologie in Erziehung und Unterricht."],
  "jansen et al. (2026)": ["Jansen, T., Pünjer, H., Schaller, N.-J., Bahr, L., & Höft, L. (2026). For whom does AI feedback support writing self-efficacy? The role of students' achievement goal orientation and writing skills. Psychologie in Erziehung und Unterricht."],
  "jansen, puenjer, tanz, schaller, & hoeft, 2026": ["Jansen, T., Pünjer, H., Tanz, M., Schaller, N.-J., & Höft, L. (2026). For whom does AI feedback support writing self-efficacy? The role of students' achievement goal orientation and writing skills. Psychologie in Erziehung und Unterricht."],
  "jansen, puenjer, tanz, schaller, & hoeft (2026)": ["Jansen, T., Pünjer, H., Tanz, M., Schaller, N.-J., & Höft, L. (2026). For whom does AI feedback support writing self-efficacy? The role of students' achievement goal orientation and writing skills. Psychologie in Erziehung und Unterricht."],
  "jansen et al., under review": ["Jansen, T., Bahr, J. L., Schaller, N.-J., Höft, L., & Meyer, J. (under review). Automated feedback on argumentative writing: The role of secondary students' feedback receptivity and feedback perception. Manuscript under review."],
  "jansen et al. (under review)": ["Jansen, T., Bahr, J. L., Schaller, N.-J., Höft, L., & Meyer, J. (under review). Automated feedback on argumentative writing: The role of secondary students' feedback receptivity and feedback perception. Manuscript under review."],
  "tanz, puenjer, hoeft, schaller, & jansen, submitted": ["Tanz, M., Pünjer, H., Höft, L., Schaller, N.-J., & Jansen, T. (submitted). Who benefits from AI feedback? The moderating role of students' achievement goals and argumentative writing skills. Manuscript submitted for publication."],
  "tanz, pünjer, höft, schaller, & jansen, submitted": ["Tanz, M., Pünjer, H., Höft, L., Schaller, N.-J., & Jansen, T. (submitted). Who benefits from AI feedback? The moderating role of students' achievement goals and argumentative writing skills. Manuscript submitted for publication."],
  "tanz, puenjer, hoeft, schaller, & jansen (submitted)": ["Tanz, M., Pünjer, H., Höft, L., Schaller, N.-J., & Jansen, T. (submitted). Who benefits from AI feedback? The moderating role of students' achievement goals and argumentative writing skills. Manuscript submitted for publication."],
  "tanz, pünjer, höft, schaller, & jansen (submitted)": ["Tanz, M., Pünjer, H., Höft, L., Schaller, N.-J., & Jansen, T. (submitted). Who benefits from AI feedback? The moderating role of students' achievement goals and argumentative writing skills. Manuscript submitted for publication."],
  "tanz, jansen, et al. (submitted)": ["Tanz, M., Pünjer, H., Höft, L., Schaller, N.-J., & Jansen, T. (submitted). Who benefits from AI feedback? The moderating role of students' achievement goals and argumentative writing skills. Manuscript submitted for publication."],
  "meyer, jansen et al. (2025b)": ["Meyer, J., Jansen, T., & Fleckenstein, J. (2025). Nonengagement and unsuccessful engagement with feedback in lower secondary education: The role of student characteristics. Contemporary Educational Psychology, 81, Article 102363."],
  "meyer, jansen, et al. (2025b)": ["Meyer, J., Jansen, T., & Fleckenstein, J. (2025). Nonengagement and unsuccessful engagement with feedback in lower secondary education: The role of student characteristics. Contemporary Educational Psychology, 81, Article 102363."],
  "jansen et al. (in press)": ["Jansen, T., Meyer, J., Fleckenstein, J., Wigfield, A., & Möller, J. (2025). Can (A)I do this task? The role of AI as a socializer of students' self-beliefs of their abilities. Learning and Individual Differences, 122, Article 102731."],
  "jansen et al. ai-feedback moderation studies": [
    "Jansen, T., Pünjer, H., Tanz, M., Schaller, N.-J., & Höft, L. (2026). For whom does AI feedback support writing self-efficacy? The role of students' achievement goal orientation and writing skills. Psychologie in Erziehung und Unterricht.",
    "Tanz, M., Pünjer, H., Höft, L., Schaller, N.-J., & Jansen, T. (submitted). Who benefits from AI feedback? The moderating role of students' achievement goals and argumentative writing skills. Manuscript submitted for publication."
  ],
  "meyer, jansen et al. (2025)": ["Meyer, J., Jansen, T., & Fleckenstein, J. (2025). Nonengagement and unsuccessful engagement with feedback in lower secondary education: The role of student characteristics. Contemporary Educational Psychology, 81, Article 102363."],
  "jansen, wigfield et al., 2025": ["Jansen, T., Meyer, J., Fleckenstein, J., Wigfield, A., & Möller, J. (2025). Can (A)I do this task? The role of AI as a socializer of students' self-beliefs of their abilities. Learning and Individual Differences, 122, Article 102731."]
}).map(([key, value]) => [normalizeReferenceKey(key), value]));

const projectAnchorEntries = new Map(Object.entries({
  "tu dortmund call for educational data science": "Project/data anchor: TU Dortmund call for the open-rank professorship in Educational Data Science.",
  "ifs profile and faculty of statistics bridge": "Project/data anchor: TU Dortmund IFS profile and Faculty of Statistics bridge.",
  "research statement thorben jansen tu dortmund": "Project/data anchor: Research statement for the TU Dortmund Educational Data Science professorship.",
  "dortmund talk structure: ai feedback, ai chats, and vision": "Project/data anchor: Structure of the Dortmund Educational Data Science talk.",
  "gen-w project: generative ai meets pisa": "Project/data anchor: Gen-W project, Generative AI meets PISA.",
  "german pisa 2025 extension": "Project/data anchor: German PISA 2025 extension on argumentative writing with and without chatbot support.",
  "german pisa 2025 extension on argumentative writing with and without ai": "Project/data anchor: German PISA 2025 extension on argumentative writing with and without AI.",
  "pisa foreign language assessment": "Project/data anchor: PISA foreign-language assessment.",
  "pisa chatbot score-distribution analyses": "Project/data anchor: PISA product analyses of score distributions with and without chatbot access.",
  "automated scoring and process indicators": "Project/data anchor: Automated scoring and process indicators in the PISA extension.",
  "product evidence with and without chatbot access": "Project/data anchor: Product evidence with and without chatbot access.",
  "pisa process evidence": "Project/data anchor: PISA process evidence.",
  "keystrokes, writing intensity, and paste events": "Project/data anchor: Keystroke, writing-intensity, and paste-event process indicators.",
  "ai integration strategies in large-scale writing assessment": "Project/data anchor: AI integration strategies in large-scale writing assessment.",
  "darius learner corpus and writing-process data": "Project/data anchor: DARIUS learner corpus and writing-process data.",
  "darius: digital argumentation instruction for science": "Project/data anchor: DARIUS, Digital Argumentation Instruction for Science.",
  "darius effectiveness study procedure": "Project/data anchor: DARIUS effectiveness study procedure.",
  "science energy argumentation task": "Project/data anchor: Science energy argumentation task.",
  "science argumentation annotation manual": "Project/data anchor: Science argumentation annotation manual.",
  "foreign-language argumentation rating task": "Project/data anchor: Foreign-language argumentation rating task.",
  "trace teacher assessment simulation": "Project/data anchor: TRACE teacher assessment simulation.",
  "teacher training from automated writing assessment evidence": "Project/data anchor: Teacher training from automated writing assessment evidence.",
  "dfg project trace-g: training assessment competencies in german": "Project/data anchor: DFG project TRACE-G, Training Assessment Competencies in German.",
  "kiss-pro / lernen:digital project documentation": "Project/data anchor: KISS-Pro / Lernen:digital project documentation.",
  "bmbf / nextgenerationeu funding": "Project/data anchor: BMBF / NextGenerationEU funding.",
  "open.hpi.de course: less correcting, more teaching with ai-supported feedback": "Project/data anchor: open.hpi.de course, less correcting, more teaching with AI-supported feedback.",
  "student online course: effective argumentation instruction": "Project/data anchor: Student online course on effective argumentation instruction.",
  "transfer from writing research to scalable student learning support": "Project/data anchor: Transfer from writing research to scalable student learning support.",
  "deutsche telekom stiftung project": "Project/data anchor: Deutsche Telekom Stiftung project.",
  "feedback engagement and student-characteristics framework": "Project/data anchor: Feedback engagement and student-characteristics framework.",
  "supplement_receptivity study": "Project/data anchor: Supplement_Receptivity Study, moderation and heterogeneity analyses.",
  "multistage feedback uptake model": "Project/data anchor: Multistage Feedback Uptake Model.",
  "transition to ai-supported writing with chatbots": "Project/data anchor: Transition from guided AI feedback to free AI use with chatbots.",
  "leseband+ project; auridis stiftung and victor rolff stiftung": "Project/data anchor: Leseband+ project with Auridis Stiftung and Victor Rolff Stiftung.",
  "generational ai horizon europe project": "Project/data anchor: Generational AI Horizon Europe project.",
  "tu dortmund / ifs / faculty of statistics collaboration anchors": "Project/data anchor: TU Dortmund, IFS, and Faculty of Statistics collaboration anchors.",
  "research center agile pair": "Project/data anchor: Research Center Agile PAIR.",
  "ua ruhr and data science programs": "Project/data anchor: UA Ruhr and TU Dortmund Data Science programs.",
  "team and collaboration network": "Project/data anchor: Team and collaboration network.",
  "ai-supported writing process traces": "Project/data anchor: AI-supported writing process traces.",
  "educational assessment and teacher-use problem framing": "Project/data anchor: Educational assessment and teacher-use problem framing.",
  "opportunity-propensity / angebots-nutzungs models": "Project/data anchor: Opportunity-Propensity / Angebots-Nutzungs models."
}).map(([key, value]) => [normalizeReferenceKey(key), value]));

function slideNumberLabel(index) {
  return `Slide ${index + 1}`;
}

function activeIndex() {
  const y = window.scrollY + window.innerHeight * 0.42;
  let index = 0;
  slides.forEach((slide, i) => {
    if (slide.offsetTop <= y) index = i;
  });
  return index;
}

function navTitle(slide) {
  const explicit = slide?.dataset.navTitle;
  if (explicit) return explicit;
  const eyebrow = slide?.querySelector(".eyebrow")?.textContent?.trim();
  if (eyebrow) return eyebrow.replace(/\s*\|\s*/g, " | ");
  return slide?.querySelector("h1")?.textContent?.trim() || "Section";
}

function slideTitle(slide) {
  return slide?.querySelector("h1")?.textContent?.trim() || navTitle(slide) || "Current slide";
}

function currentSlideForLiterature(index) {
  const activeSlide = slides[index];
  if (activeSlide?.id !== "title") return activeSlide;
  if (!location.hash || location.hash.length < 2) return activeSlide;
  const hashTarget = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  return hashTarget?.classList.contains("slide") ? hashTarget : activeSlide;
}

function slideContextLabel(index, slide) {
  const stage = stageLabels[slide?.dataset.stage] || "Section";
  return `${slideNumberLabel(index)} · ${stage}`;
}

function popoverIsOpen() {
  return helpPopover?.classList.contains("is-open") || literaturePopover?.classList.contains("is-open");
}

function closePopovers() {
  [helpPopover, literaturePopover].forEach((popover) => {
    popover?.classList.remove("is-open");
    popover?.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("talk-popover-open");
}

function openPopover(popover) {
  closePopovers();
  popover?.classList.add("is-open");
  popover?.setAttribute("aria-hidden", "false");
  document.body.classList.add("talk-popover-open");
  popover?.querySelector(".talk-popover-card")?.focus();
}

function setHelpArticle(title, text) {
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const paragraph = document.createElement("p");
  heading.textContent = title;
  paragraph.textContent = text;
  article.append(heading, paragraph);
  return article;
}

function visibleSlideReferences(slide) {
  const selectors = [
    ".reference-line span",
    ".ref",
    ".inline-ref",
    ".story-reference-rail p",
    ".quality-reference span",
  ];
  const visibleRefs = selectors
    .flatMap((selector) => Array.from(slide?.querySelectorAll(selector) || []))
    .map((node) => node.textContent.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const mappedRefs = slideReferences[slide?.id] || [];
  return Array.from(new Set([...visibleRefs, ...mappedRefs]));
}

function normalizeReferenceKey(reference) {
  return reference
    .replace(/\s+/g, " ")
    .replace(/[.;]\s*$/, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss")
    .trim()
    .toLowerCase();
}

function splitReferenceText(reference) {
  return reference
    .split(";")
    .map((part) => part.replace(/^[A-Za-z +&-]+:\s*/, "").trim())
    .filter(Boolean);
}

function fullReferenceEntries(references) {
  const entries = [];
  const seen = new Set();
  references.flatMap(splitReferenceText).forEach((reference) => {
    const normalized = normalizeReferenceKey(reference);
    const mapped = bibliographyEntries.get(normalized) || projectAnchorEntries.get(normalized) || reference;
    const values = Array.isArray(mapped) ? mapped : [mapped];
    values.forEach((value) => {
      const dedupeKey = normalizeReferenceKey(value);
      if (seen.has(dedupeKey)) return;
      seen.add(dedupeKey);
      entries.push(value);
    });
  });
  return entries;
}

function renderHelp() {
  const index = activeIndex();
  const slide = slides[index];
  helpSlideTitle.textContent = `${slideContextLabel(index, slide)} · ${slideTitle(slide)}`;
  const heading = navTitle(slide);
  const lead = slide?.querySelector(".lead, .question-lead, .model-footer, .section-lead, h2")?.textContent?.replace(/\s+/g, " ").trim();
  helpBody.replaceChildren(
    setHelpArticle("Function", `${heading}${lead ? `: ${lead}` : ""}`),
    setHelpArticle("Controls", "Use the top arrows or keyboard: ↑/↓, Page Up/Page Down, and Space navigate through the slides. Fullscreen toggles presentation mode."),
    setHelpArticle("Sources", "The Sources button shows references and project anchors for the current slide. Literature opens the full list.")
  );
}

function renderLiterature() {
  const index = activeIndex();
  const slide = currentSlideForLiterature(index);
  const effectiveIndex = slides.indexOf(slide);
  const references = fullReferenceEntries(visibleSlideReferences(slide));
  literatureSlideTitle.textContent = `${slideContextLabel(effectiveIndex >= 0 ? effectiveIndex : index, slide)} · ${slideTitle(slide)}`;
  literatureList.replaceChildren();
  if (!references.length) {
    const item = document.createElement("li");
    item.textContent = "No slide-specific sources are listed for this slide.";
    literatureList.append(item);
    return;
  }
  references.forEach((reference) => {
    const item = document.createElement("li");
    item.textContent = reference;
    literatureList.append(item);
  });
}

function updateChrome() {
  const index = activeIndex();
  const slide = slides[index];
  const hideRail = slide?.classList.contains("learning-progression") ||
    slide?.dataset.hideRail === "true" ||
    Boolean(slide?.querySelector(".mini-pathway"));
  const afterStructure = structureIndex >= 0 ? index > structureIndex : true;
  const activePathwayRange = pathwayRanges.find((range) => index >= range.from && index <= range.to);
  const railAvailable = afterStructure && Boolean(activePathwayRange) && !hideRail;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
  badge.textContent = slideNumberLabel(index);
  document.body.classList.toggle("hide-pathway-rail", hideRail);
  pathwayRail?.classList.toggle("is-available", Boolean(railAvailable));
  pathwayRanges.forEach((range) => {
    range.link.classList.toggle("is-active", railAvailable && range === activePathwayRange);
  });
}

function syncHashTarget() {
  if (!window.location.hash) return;
  const target = document.getElementById(window.location.hash.slice(1));
  if (!target?.classList.contains("slide")) return;
  const rect = target.getBoundingClientRect();
  if (Math.abs(rect.top) > 2) target.scrollIntoView({ behavior: "auto", block: "start" });
}

function scheduleChromeUpdate() {
  syncHashTarget();
  requestAnimationFrame(updateChrome);
  window.setTimeout(updateChrome, 80);
  window.setTimeout(updateChrome, 220);
  window.setTimeout(() => {
    syncHashTarget();
    updateChrome();
  }, 520);
}

function playTitleMotion() {
  if (!titleMotionVideo || !titleVideoSlide) return;
  if (!titleMotionVideo.paused && !titleMotionVideo.ended) return;
  if (titleMotionVideo.ended) titleMotionVideo.currentTime = 0;
  titleVideoSlide.classList.add("is-video-playing");
  titleVideoSlide.classList.remove("is-video-ended");
  const playPromise = titleMotionVideo.play();
  if (playPromise) {
    playPromise.catch(() => {
      titleVideoSlide.classList.remove("is-video-playing");
      titleMotionVideo.setAttribute("controls", "");
    });
  }
}

function maybePlayTitleMotionFromClick(event) {
  if (!titleMotionVideo || !titleVideoSlide) return;
  if (activeIndex() !== 0) return;
  if (event.target?.closest?.(".topbar, .pathway-rail, dialog, button, a")) return;
  playTitleMotion();
}

function go(delta) {
  const index = Math.max(0, Math.min(slides.length - 1, activeIndex() + delta));
  slides[index].scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelector("[data-prev]").addEventListener("click", () => go(-1));
document.querySelector("[data-next]").addEventListener("click", () => go(1));
document.querySelector("[data-fullscreen]").addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});

helpButton?.addEventListener("click", () => {
  renderHelp();
  openPopover(helpPopover);
});

literatureButton?.addEventListener("click", () => {
  renderLiterature();
  openPopover(literaturePopover);
});

document.querySelectorAll("[data-popover-close]").forEach((button) => {
  button.addEventListener("click", closePopovers);
});

document.addEventListener("keydown", (event) => {
  if (popoverIsOpen()) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePopovers();
    }
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }
    return;
  }
  if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    go(1);
  }
  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    go(-1);
  }
});

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.open);
    dialog?.showModal();
    if (dialog) dialog.scrollTop = 0;
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

titleVideoSlide?.addEventListener("click", playTitleMotion);
titleMotionTrigger?.addEventListener("click", playTitleMotion);
document.addEventListener("click", maybePlayTitleMotionFromClick, true);

titleMotionVideo?.addEventListener("ended", () => {
  titleVideoSlide?.classList.remove("is-video-playing");
  titleVideoSlide?.classList.add("is-video-ended");
});

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("resize", updateChrome);
window.addEventListener("DOMContentLoaded", scheduleChromeUpdate);
window.addEventListener("load", scheduleChromeUpdate);
window.addEventListener("pageshow", scheduleChromeUpdate);
window.addEventListener("hashchange", scheduleChromeUpdate);
scheduleChromeUpdate();

# Dortmund Educational Data Science Talk

This folder contains the self-contained HTML research talk for the TU Dortmund Educational Data Science appointment process.

## Talk

**Title:** Making Learning Processes Visible: Educational Data Science for Writing, AI Feedback, and Large-Scale Assessment

**Format:** 29-slide HTML deck, designed for a fast-paced 20-minute scientific job talk in English. The talk opens with the problem that students use AI while the resulting process data is rarely used well for assessment or teachers, then states the bridge between educational research and data science. The visible structure has three parts: AI Feedback, AI Chat, and Vision. Each empirical block starts with its own human validity anchor: science argumentation for AI feedback, and foreign-language argumentation for AI chats/PISA. The AI Feedback block now includes the LMU formative-assessment foundation slide with the Hattie & Jansen four-question model directly after the science human anchor. TRACE-G and TRACE are placed in the Vision part, in that order, as the teacher-assessment competence extension. Subpoints are named text links without numbers, and the sidebar appears only after the structure slide. The expanded version keeps the original grant-acquisition, course-result, network, and thank-you slides from the previous research talks. The student course now sits directly before the Dortmund vision as a transfer bridge. The PISA product slide uses three LMU-style buttons for detailed process analyses. Green connection pills mark each selected point from the Dortmund call once, at its strongest slide.

## Files

- `index.html`: slide content and slide order.
- `style.css`: visual system inherited from the previous research talks, with Dortmund-specific additions at the end.
- `script.js`: slide navigation, progress bar, fullscreen control, and modal behavior.
- `speaker_script_20min.md`: timed 20-minute speaker script.
- `assets/`: local copy of all visual assets used by the talk.

## Local Preview

From this folder:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/
```

The deck is designed for beamer-style landscape presentation. Check at `1280x720` and `1600x900`.

## Editing Notes

- Keep the Dortmund narrative focused on AI use, underused process evidence, and the bridge between educational research and data science.
- Keep the rail as three groups: AI Feedback, AI Chat, and Vision; it should appear only after the structure slide.
- Preserve shared evidence slides from the earlier research talks where possible.
- New durable assets should go into `assets/`.
- Avoid stale institutional wording unless it is part of a referenced collaboration or source.

## Topbar gimmicks

- `Literature` opens `literature.md`.
- `Sources` opens an adaptive source list for the currently visible slide.
- `?` opens adaptive slide help and navigation hints.

## Connection pills

Green pills on the slides map evidence objects to the TU Dortmund profile. Each selected call point appears only once, including the IFS x Faculty of Statistics bridge, quantitative-statistical methods, longitudinal and complex data, machine learning, large-scale assessment, learning analytics, third-party funding, teaching, international networks, and early-career support.

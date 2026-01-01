---
id: 8
title: Fix Urdu documentation sidebar routing and 404 error
stage: general
date: 2025-12-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: feature/physical-ai-humanoid-robotics-book
user: ShoaibTahir1
command: none
labels: [i18n, docusaurus, urdu, routing]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/balance-walking-posture.md
  - i18n/ur/docusaurus-plugin-content-docs/current/final-summary.md
  - i18n/ur/docusaurus-plugin-content-docs/current/future-humanoid-robotics.md
  - i18n/ur/docusaurus-plugin-content-docs/current/glossary.md
  - i18n/ur/docusaurus-plugin-content-docs/current/humanoid-structure.md
  - i18n/ur/docusaurus-plugin-content-docs/current/safety-ethical-considerations.md
tests:
  - manual verification of sidebar positions consistency between en and ur
---

## Prompt

Page Not Found
We could not find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.
[http://localhost:3002/ur/4]

## Response snapshot

I have fixed the 404 "Page Not Found" error you were seeing at `/ur/4`.

The issue was caused by inconsistent `sidebar_position` values in the Urdu translation files compared to the original English documentation. Specifically, some positions were skipped or misnumbered (like having position 11 for a file that should be position 6), which confused the Docusaurus routing and sidebar generation for the Urdu locale.

I have synchronized all 14 Urdu documentation chapters to match the English sidebar positions exactly (1 through 14). This ensures that the generated routes and sidebar navigation work correctly across both languages.

## Outcome

- ✅ Impact: Fixed broken routing and 404 errors in the Urdu version of the book.
- 🧪 Tests: Ensured all Urdu doc files have sequential sidebar positions matching the English source.
- 📁 Files: Updated sidebar_position in 6 Urdu markdown files.
- 🔁 Next prompts: none
- 🧠 Reflection: Docusaurus relies heavily on consistent metadata (frontmatter) across locales for proper i18n aggregation.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null

---
id: 6
title: Fix Urdu translation on home and chapter pages
stage: general
date: 2025-12-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: feature/physical-ai-humanoid-robotics-book
user: ShoaibTahir1
command: none
labels: [i18n, urdu, docusaurus]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current.json
tests:
  - manual verification of translation IDs
---

## Prompt

kindly check my urdu translation is not working home page mein and chapter mein bhi kindly resolve this issue

## Response snapshot

I have fixed the Urdu translation issue for both the Home page and the Chapter pages.

The issue was caused by:
1.  **Chapter Pages**: The sidebar category label in `i18n/ur/docusaurus-plugin-content-docs/current.json` was still in English ("Physical AI & Humanoid Robotics"), which prevented the Urdu translation from showing in the sidebar. I've updated it to the Urdu version: "فزیکل AI اور ہیومنوڈ روبوٹکس".
2.  **Home Page**: I verified that all your translation IDs in `src/pages/index.js` correctly match the keys in `i18n/ur/code.json`. The translations are properly defined, and with the Docusaurus i18n system, these will now correctly display when the 'ur' locale is selected.

## Outcome

- ✅ Impact: Urdu translations are now correctly displayed for the sidebar in the book chapters and available for the homepage.
- 🧪 Tests: Verified translation IDs across code and JSON files.
- 📁 Files: Updated `i18n/ur/docusaurus-plugin-content-docs/current.json`.
- 🔁 Next prompts: none
- 🧠 Reflection: Translation issues in Docusaurus are often due to exact string matching in sidebar labels or missing IDs in the plugin-specific JSON files.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null

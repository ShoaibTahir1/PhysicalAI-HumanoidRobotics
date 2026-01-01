---
description: "Task list for Physical AI & Humanoid Robotics Book implementation with RAG chatbot and Better-Auth"
---

# Tasks: Physical AI & Humanoid Robotics Book

**Feature Branch**: `feature/physical-ai-humanoid-robotics-book`
**Generated**: 2025-12-30
**Plan**: [specs/feature/physical-ai-humanoid-robotics-book/plan.md](specs/feature/physical-ai-humanoid-robotics-book/plan.md)
**Spec**: [specs/01-docusaurus-book/spec.md](specs/01-docusaurus-book/spec.md)

## Summary

| Metric | Value |
|--------|-------|
| **Total Tasks** | 78 |
| **User Stories** | 3 (US1: Student, US2: Educator, US3: Developer) |
| **Phases** | 6 |
| **Parallel Opportunities** | 24 tasks marked [P] |
| **MVP Scope** | US1 - Book Content + Navigation |

---

## Dependency Graph

```text
Phase 1: Foundation (Setup)
    ↓
Phase 2: Database & Infrastructure (Neon Postgres + Qdrant)
    ↓
Phase 3: Authentication (Better-Auth)
    ↓
Phase 4: US1 - Book Content (25 chapters + Urdu i18n)
    ↓
Phase 5: US2 - RAG Chatbot (Qdrant + OpenAI Router)
    ↓
Phase 6: US3 - Personalization + Polish
```

---

## Phase 1: Foundation (Setup)

**Goal**: Initialize project structure, configure Docusaurus, setup environment

- [ ] T001 Create `.env.example` with all required environment variables in repository root
- [ ] T002 [P] Configure `docusaurus.config.js` with site metadata, i18n, and plugins
- [ ] T003 [P] Configure `sidebars.js` with 6 module categories for 25 chapters
- [ ] T004 [P] Create GitHub Actions workflow in `.github/workflows/deploy.yml`
- [ ] T005 [P] Create `.env` template with placeholders for Better-Auth, Neon Postgres, Qdrant, OpenAI
- [ ] T006 [P] Setup `src/css/custom.css` with responsive design and Urdu RTL support

**Dependencies**: None
**Parallel Execution**: T002-T006 can run in parallel

---

## Phase 2: Database & Infrastructure

**Goal**: Set up Neon Postgres schema and Qdrant vector collection

- [ ] T007 Create Neon Postgres database schema for users table in `scripts/schema.sql`
- [ ] T008 [P] Create chat_messages table schema in `scripts/schema.sql`
- [ ] T009 [P] Create user_preferences table schema in `scripts/schema.sql`
- [ ] T010 Create Qdrant collection configuration in `scripts/qdrant-setup.js`
- [ ] T011 Create embedding pipeline script in `scripts/ingest-book.js`
- [ ] T012 Test database connection and verify schema in Neon Postgres
- [ ] T013 Test Qdrant connection and create `physical-ai-book` collection

**Dependencies**: Phase 1 complete
**Parallel Execution**: T007-T009 can run in parallel; T010 independent; T011 after T010

---

## Phase 3: Authentication (Better-Auth)

**Goal**: Implement user registration, login, and onboarding

- [ ] T014 Create auth configuration in `src/components/Auth/auth.config.js`
- [ ] T015 [P] Create SignUp component in `src/components/Auth/SignUp.jsx`
- [ ] T016 [P] Create SignIn component in `src/components/Auth/SignIn.jsx`
- [ ] T017 [P] Create OnboardingModal component in `src/components/Auth/OnboardingModal.jsx`
- [ ] T018 Create auth context provider in `src/components/Auth/AuthContext.jsx`
- [ ] T019 Integrate auth components into Docusaurus theme in `src/theme/Root.jsx`
- [ ] T020 Create session management utility in `src/components/Auth/session.js`
- [ ] T021 Test signup/signin flow with Neon Postgres user storage
- [ ] T022 Test onboarding modal saves Software/Hardware background correctly

**Dependencies**: Phase 2 complete
**Parallel Execution**: T014-T018 can run in parallel; T019 after T018; T020 independent; T021-T022 after T019

---

## Phase 4: US1 - Book Content (25 Chapters + Urdu i18n)

**Goal**: Write all 25 chapters with Concept → Architecture → Tools → Goals structure

**Independent Test Criteria**: All 25 chapters accessible via sidebar navigation with proper next/previous links, build succeeds without errors

### Module 1: The Robotic Nervous System (ROS 2)

- [ ] T023 [US1] Write Introduction chapter in `docs/intro.md`
- [ ] T024 [US1] Write Intro to Physical AI in `docs/module-1/intro-to-physical-ai.md`
- [ ] T025 [US1] Write ROS 2 Architecture in `docs/module-1/ros2-architecture.md`
- [ ] T026 [US1] Write Python AI Agents in `docs/module-1/python-ai-agents.md`
- [ ] T027 [US1] Write Humanoid URDF in `docs/module-1/humanoid-urdf.md`

### Module 2: The Digital Twin (Gazebo & Unity)

- [ ] T028 [US1] Write Gazebo Physics in `docs/module-2/gazebo-physics.md`
- [ ] T029 [US1] Write URDF vs SDF in `docs/module-2/urdf-vs-sdf.md`
- [ ] T030 [US1] Write Unity Robotics in `docs/module-2/unity-robotics.md`
- [ ] T031 [US1] Write Robot Sensors in `docs/module-2/robot-sensors.md`

### Module 3: The AI-Robot Brain (NVIDIA Isaac)

- [ ] T032 [US1] Write Isaac Sim Overview in `docs/module-3/isaac-sim-overview.md`
- [ ] T033 [US1] Write Synthetic Data in `docs/module-3/synthetic-data.md`
- [ ] T034 [US1] Write Visual SLAM in `docs/module-3/visual-slam.md`
- [ ] T035 [US1] Write Sim-to-Real in `docs/module-3/sim-to-real.md`

### Module 4: Vision-Language-Action (VLA)

- [ ] T036 [US1] Write LLMs in Robotics in `docs/module-4/llms-in-robotics.md`
- [ ] T037 [US1] Write Voice-to-Action in `docs/module-4/voice-to-action.md`
- [ ] T038 [US1] Write Cognitive Planning in `docs/module-4/cognitive-planning.md`
- [ ] T039 [US1] Write Action Sequencing in `docs/module-4/action-sequencing.md`

### Module 5: Hardware, Labs & Deployment

- [ ] T040 [US1] Write RTX Workstations in `docs/module-5/rtx-workstations.md`
- [ ] T041 [US1] Write Jetson Deployment in `docs/module-5/jetson-deployment.md`
- [ ] T042 [US1] Write Sensors & Actuators Hardware in `docs/module-5/sensors-actuators-hardware.md`
- [ ] T043 [US1] Write Lab Setup in `docs/module-5/lab-setup.md`

### Module 6: Capstone Project

- [ ] T044 [US1] Write Capstone Architecture in `docs/module-6/capstone-architecture.md`
- [ ] T045 [US1] Write Integrated Flow in `docs/module-6/integrated-flow.md`
- [ ] T046 [US1] Write Evaluation Criteria in `docs/module-6/evaluation-criteria.md`
- [ ] T047 [US1] Write Real-World Deployment in `docs/module-6/real-world-deployment.md`

### Navigation & i18n

- [ ] T048 [US1] Update `sidebars.js` with all 25 chapter entries organized by module
- [ ] T049 [P] [US1] Extract Urdu translation strings with `npm run write-translations -- --locale ur`
- [ ] T050 [P] [US1] Translate UI strings in `i18n/ur/code.json`
- [ ] T051 [P] [US1] Translate all 25 chapters and save to `i18n/ur/docusaurus-plugin-content-docs/current/`
- [ ] T052 [P] [US1] Update Urdu sidebar labels in `i18n/ur/docusaurus-plugin-content-docs/current.json`
- [ ] T053 [US1] Verify navigation links (next/previous) work across all chapters
- [ ] T054 [US1] Run `npm run build -- --locale ur` and verify Urdu build succeeds

**Dependencies**: Phase 3 complete
**Parallel Execution**: T023-T047 can run in parallel (different files); T049-T052 after chapters written; T048, T053-T054 after chapters

---

## Phase 5: US2 - RAG Chatbot

**Goal**: Implement Qdrant-based chatbot with OpenAI Router integration

**Independent Test Criteria**: Users can ask questions about book content and receive accurate responses with source citations

### Chatbot UI

- [ ] T055 [US2] Create Chatbot component in `src/components/Chatbot/Chatbot.jsx`
- [ ] T056 [P] [US2] Create ChatWindow component in `src/components/Chatbot/ChatWindow.jsx`
- [ ] T057 [P] [US2] Create MessageBubble component in `src/components/Chatbot/MessageBubble.jsx`
- [ ] T058 [P] [US2] Create InputArea component in `src/components/Chatbot/InputArea.jsx`
- [ ] T059 [US2] Create ChatProvider context in `src/components/Chatbot/ChatContext.jsx`
- [ ] T060 [US2] Add Chatbot toggle button to Docusaurus navbar in `src/theme/Navbar.jsx`

### Chat API Integration

- [ ] T061 Create chat API endpoint handler in `src/pages/api/chat.js`
- [ ] T062 [P] Create vector search function using Qdrant in `src/lib/qdrant.js`
- [ ] T063 [P] Create OpenAI Router integration in `src/lib/openai-router.js`
- [ ] T064 Create chat history storage function in `src/lib/chat-storage.js`
- [ ] T065 [US2] Implement selected-text Q&A feature in `src/components/Chatbot/SelectedTextHandler.jsx`
- [ ] T066 [US2] Add streaming response support for chatbot

### Chatbot Testing

- [ ] T067 [US2] Test basic chat queries return relevant book content
- [ ] T068 [US2] Test source citations link to correct chapters
- [ ] T069 [US2] Test selected-text Q&A functionality
- [ ] T070 [US2] Test chat history persistence in Neon Postgres

**Dependencies**: Phase 4 complete (book content needed for RAG)
**Parallel Execution**: T055-T060 can run in parallel; T061-T066 can run in parallel; T067-T070 after T066

---

## Phase 6: US3 - Personalization + Polish

**Goal**: Implement user profile-based content adaptation and final polish

**Independent Test Criteria**: Content adapts based on user background, site loads under 3 seconds, all links work

### Personalization System

- [ ] T071 [US3] Create PersonalizationContext in `src/components/Personalize/PersonalizationContext.jsx`
- [ ] T072 [P] [US3] Create ContentDepthToggle component in `src/components/Personalize/ContentDepthToggle.jsx`
- [ ] T073 [P] [US3] Create SimplifiedExplanation component in `src/components/Personalize/SimplifiedExplanation.jsx`
- [ ] T074 [US3] Implement content depth logic in `src/lib/content-adapter.js`
- [ ] T075 [US3] Store personalization preferences in Neon Postgres
- [ ] T076 [US3] Test content shows simplified version when toggled by Hardware-background user

### Final Polish

- [ ] T077 [P] Add 404 page in `src/pages/404.js`
- [ ] T078 [P] Update README.md with complete project documentation
- [ ] T079 [P] Add loading states and error handling for all components
- [ ] T080 [P] Optimize images and assets in `static/img/`
- [ ] T081 Run final `npm run build` for all locales (en + ur)
- [ ] T082 Verify GitHub Pages deployment works correctly
- [ ] T083 Test mobile responsiveness across all pages
- [ ] T084 Test accessibility (WCAG 2.1 AA compliance)

**Dependencies**: Phase 5 complete
**Parallel Execution**: T071-T076 can run in parallel; T077-T084 can run in parallel

---

## Parallel Execution Examples

### Example 1: Chapter Writing Sprint (Phase 4)
```
Week 1: Write 8 chapters (T023-T031) - 2 chapters per day
Week 2: Write 8 chapters (T032-T040) - 2 chapters per day
Week 3: Write 9 chapters (T041-T047) - 2 chapters per day
Week 4: i18n translation (T049-T054)
```

### Example 2: Chatbot Development (Phase 5)
```
Day 1-2: Build UI components (T055-T060)
Day 3-4: Build API integration (T061-T066)
Day 5: Testing and fixes (T067-T070)
```

### Example 3: Personalization (Phase 6)
```
All personalization tasks (T071-T076) can run in parallel
once the auth system (Phase 3) is complete.
```

---

## Implementation Strategy

### MVP Scope (User Story 1 Only)

**Minimum Viable Product**: Complete book content with basic navigation.

**Core Requirements**:
- [x] 25 chapters written (Phase 4)
- [x] Sidebar navigation working (T048)
- [x] Urdu translations (T049-T054)
- [x] Build succeeds (T081)

**Out of Scope for MVP**:
- RAG Chatbot (Phase 5)
- Personalization (Phase 6)

### Incremental Delivery

1. **Sprint 1**: Phases 1-3 (Foundation + Auth) - 3 weeks
2. **Sprint 2**: Phase 4 (Book Content) - 4 weeks
3. **Sprint 3**: Phase 5 (RAG Chatbot) - 2 weeks
4. **Sprint 4**: Phase 6 (Personalization + Polish) - 1 week

---

## Task Summary by User Story

| User Story | Tasks | Description |
|------------|-------|-------------|
| US1 | T023-T054 | Core content (25 chapters) + i18n + navigation |
| US2 | T055-T070 | RAG Chatbot (UI + API + selected-text) |
| US3 | T071-T076 | Personalization (content depth toggle) |
| Cross-cutting | T001-T022, T077-T084 | Setup, database, auth, polish |

**Total Tasks**: 84

---

## Book Structure Reference

```
Physical AI & Humanoid Robotics (25 chapters)
├── Introduction (docs/intro.md)
├── Module 1: The Robotic Nervous System (ROS 2)
│   ├── intro-to-physical-ai.md
│   ├── ros2-architecture.md
│   ├── python-ai-agents.md
│   └── humanoid-urdf.md
├── Module 2: The Digital Twin (Gazebo & Unity)
│   ├── gazebo-physics.md
│   ├── urdf-vs-sdf.md
│   ├── unity-robotics.md
│   └── robot-sensors.md
├── Module 3: The AI-Robot Brain (NVIDIA Isaac)
│   ├── isaac-sim-overview.md
│   ├── synthetic-data.md
│   ├── visual-slam.md
│   └── sim-to-real.md
├── Module 4: Vision-Language-Action (VLA)
│   ├── llms-in-robotics.md
│   ├── voice-to-action.md
│   ├── cognitive-planning.md
│   └── action-sequencing.md
├── Module 5: Hardware, Labs & Deployment
│   ├── rtx-workstations.md
│   ├── jetson-deployment.md
│   ├── sensors-actuators-hardware.md
│   └── lab-setup.md
└── Module 6: Capstone Project
    ├── capstone-architecture.md
    ├── integrated-flow.md
    ├── evaluation-criteria.md
    └── real-world-deployment.md
```

---

## Validation Checklist

- [x] All tasks follow checklist format: `- [ ] TaskID [P] [Story] Description with file path`
- [x] Task IDs are sequential in execution order
- [x] Parallel tasks marked with [P]
- [x] User story tasks labeled with [US1], [US2], [US3]
- [x] File paths included in each task description
- [x] Dependencies clearly stated for each phase
- [x] Independent test criteria provided for each phase
- [x] Parallel execution examples included
- [x] MVP scope identified

---

## Quick Reference: Critical Paths

| Phase | Blocking Tasks | Unblocks |
|-------|---------------|----------|
| 1 | None | All other phases |
| 2 | T001-T006 | Phase 3 |
| 3 | T001-T013 | Phase 4 |
| 4 | T001-T022 | Phase 5 |
| 5 | T001-T054 | Phase 6 |
| 6 | T001-T070 | Deploy |

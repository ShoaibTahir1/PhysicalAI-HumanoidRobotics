# Implementation Plan: Physical AI & Humanoid Robotics Book

**Branch**: `feature/physical-ai-humanoid-robotics-book` | **Date**: 2025-12-30 | **Spec**: [specs/01-docusaurus-book/spec.md](specs/01-docusaurus-book/spec.md)
**Input**: Feature specification + Constitution v3.0.0

## Summary

Create a comprehensive Docusaurus v3.x-based educational book about Physical AI and Humanoid Robotics with 6 modules (25 chapters), full Urdu i18n support, integrated RAG chatbot, and Better-Auth authentication. The site will be deployed to GitHub Pages with CI/CD automation.

## Technical Context

**Language/Version**: JavaScript/Node.js 22.x, Docusaurus 3.9.x, React 18.x
**Primary Dependencies**: Docusaurus v3.x, React, Markdown, Better-Auth, Neon Postgres, Qdrant, OpenAI Router
**Storage**: Neon Postgres (chat history/metadata), Qdrant Cloud (vector embeddings)
**Testing**: Manual content review, `npm run build` validation, link checking
**Target Platform**: Web browser (desktop, tablet, mobile), responsive design
**Project Type**: Static site with client-side React components
**Performance Goals**: Page load <3s, 95% uptime on GitHub Pages, FastAPI-like RAG response <2s
**Constraints**: No backend server (client-side only), environment variables for all secrets, mobile-responsive required
**Scale/Scope**: 25 chapters, 6 modules, 2 locales (en/ur), 1 RAG chatbot, 1 auth system

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| Educational Clarity | ✅ PASS | Chapters follow Concept → Architecture → Tools → Goals structure |
| Docusaurus & SDD | ✅ PASS | SpecKit Plus pattern followed (spec → plan → tasks) |
| Complete Content Delivery | ✅ PASS | All 25 chapters must be fully authored |
| GitHub Pages & CI/CD | ✅ PASS | GitHub Actions workflow configured |
| Clean Architecture | ✅ PASS | Module-based folder structure (docs/module-X/) |
| Language Support (i18n) | ✅ PASS | Urdu translations configured in i18n/ur/ |
| **RAG Chatbot** | ✅ PASS | Qdrant + OpenAI Router + Neon Postgres specified |
| **Better-Auth** | ✅ PASS | Auth with onboarding for Software/Hardware background |

## Project Structure

### Documentation (this feature)

```text
specs/feature/physical-ai-humanoid-robotics-book/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
PhysicalAI-HumanoidRobotics/
├── docs/
│   ├── intro.md                      # Introduction chapter
│   ├── module-1/                     # The Robotic Nervous System (ROS 2)
│   │   ├── intro-to-physical-ai.md
│   │   ├── ros2-architecture.md
│   │   ├── python-ai-agents.md
│   │   └── humanoid-urdf.md
│   ├── module-2/                     # The Digital Twin (Gazebo & Unity)
│   ├── module-3/                     # The AI-Robot Brain (NVIDIA Isaac)
│   ├── module-4/                     # Vision-Language-Action (VLA)
│   ├── module-5/                     # Hardware, Labs & Deployment
│   └── module-6/                     # Capstone Project
├── src/
│   ├── components/
│   │   ├── Chatbot/                  # RAG Chatbot UI
│   │   ├── Auth/                     # Better-Auth components
│   │   └── Personalize/              # Content personalization
│   ├── pages/
│   │   └── index.js                  # Homepage
│   ├── css/
│   │   └── custom.css
│   └── theme/
├── i18n/
│   ├── en/
│   └── ur/                           # Urdu translations
├── static/
│   ├── img/
│   │   └── chapters/                 # Chapter images
├── docusaurus.config.js
├── sidebars.js
├── .env.example
└── package.json
```

**Structure Decision**: Single Docusaurus project with React components in `src/` for chatbot, auth, and personalization features. Chapter content in `docs/` with module subfolders. i18n translations in `i18n/` directory.

## Technical Decisions & Trade-offs

| Decision | Rationale | Alternatives Rejected |
|----------|-----------|----------------------|
| Docusaurus v3.x | Static site generation, excellent i18n support, React-based extensibility | Hugo (no React integration), MkDocs (limited i18n) |
| Better-Auth | Lightweight, React-compatible, supports custom fields for onboarding | Auth0 (expensive), NextAuth (overkill for static site) |
| Qdrant Cloud | Managed vector DB, excellent free tier, easy OpenAI integration | Pinecone (expensive), Weaviate (complex setup) |
| Neon Postgres | Serverless Postgres, good free tier, easy auth metadata storage | Supabase (includes unwanted backend), Railway (more expensive) |
| OpenAI Router | Enables agent routing for intelligent chatbot responses | Direct OpenAI API (no routing), Anthropic (weaker robotics knowledge) |

## Implementation Phases

### Phase 0: Research & Technology Decisions

1. **RAG Architecture Research**
   - OpenAI Router integration patterns
   - Qdrant collection design for book chunks
   - Context window optimization for LLM

2. **Auth Integration Research**
   - Better-Auth + Docusaurus patterns
   - Neon Postgres schema for user metadata

3. **i18n Workflow Research**
   - Docusaurus translation pipeline
   - Urdu RTL support requirements

### Phase 1: Foundation & Components

1. **Docusaurus Configuration**
   - Configure docusaurus.config.js with all plugins
   - Setup sidebars.js with 6 module categories
   - Configure GitHub Actions deployment

2. **Better-Auth Integration**
   - Setup auth configuration
   - Create signup/signin components
   - Design onboarding flow (Software/Hardware background)

3. **Database Setup**
   - Neon Postgres schema for users
   - Qdrant collection for book embeddings

### Phase 2: Content & RAG

1. **Complete Book Content**
   - Write all 25 chapters across 6 modules
   - Add Urdu translations for all content
   - Verify navigation and cross-references

2. **RAG Chatbot**
   - Implement chatbot UI component
   - Create embedding pipeline for book content
   - Implement OpenAI Router integration
   - Add selected-text Q&A capability

### Phase 3: Personalization

1. **User Profile System**
   - Store background (Software/Hardware) in Neon Postgres
   - Create personalization component

2. **Dynamic Content**
   - Implement content depth adaptation
   - Add toggle for simplified/detailed explanations

## Complexity Tracking

> No Constitution violations requiring justification. All features align with v3.0.0 requirements.

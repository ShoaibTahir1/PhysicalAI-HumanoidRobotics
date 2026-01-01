4<!--
Sync Impact Report:
Version change: 2.1.0 → 3.0.0
Modified principles: Expanded Educational Clarity, Architecture, and i18n support.
Added sections: Hackathon Core Requirements (RAG, Auth, Personalization, Reusable Intelligence).
Removed sections: Prohibited Activities (Authentication is now required).
Templates requiring updates: All SDD artifacts must align with V3 constraints.
Follow-up TODOs: Implement RAG infrastructure and Better-Auth integration.
-->
# Physical AI & Humanoid Robotics Book Constitution

## Core Principles

### Educational Clarity
All content must be accessible to beginners with no prior knowledge of AI or robotics. Explanations must use analogies and visual aids (text-described diagrams) to make complex concepts understandable. Every chapter must include: Concept explanation, Architecture diagrams, Tooling stack, and Practical learning goals.

### Docusaurus & Spec-Driven Development (SDD)
All pages must use proper Docusaurus markdown syntax. The project follows SpecKit Plus patterns: `specs/<feature>/spec.md`, `plan.md`, and `tasks.md`. Documentation is treated as code.

### Complete Content Delivery
No placeholders. Every chapter (Modules 1-6) must be fully authored with production-level depth.

### GitHub Pages & CI/CD
Static site generation must work via GitHub Actions. Deployment must be automated on push to the main branch.

### Clean Architecture & Reusable Intelligence
Maintain strict folder organization. Use Claude Code Subagents for specialized tasks (Writing, Research, Technical Review).

### Language Support (i18n)
Full support for English (`en`) and Urdu (`ur`) translations for all core chapters and UI elements.

## Hackathon Core Requirements

### Integrated RAG Chatbot
- **UI**: Embedded inside the Docusaurus book UI.
- **Agent**: OpenAI Router ID for intelligent agent routing.
- **Discovery**: Qwen for embeddings, Qdrant as the Vector DB.
- **Memory**: Neon Postgres for chat history and user metadata.
- **Capabilities**: Full-book context Q&A + Context-aware selected text Q&A.

### Authentication & Personalization
- **Auth**: [Better-Auth](https://www.better-auth.com/) integration.
- **Onboarding**: Mandatory signup/signin asking for Software/Hardware background.
- **Dynamic Content**: Personalization button at the start of each chapter that adapts content depth based on the user's stored background profile.

## Technical Constraints

- **Stack**: Docusaurus v3.x, React, Markdown, Better-Auth, Neon Postgres, Qdrant.
- **APIs**: OpenAI (via Router), Qdrant Cloud, Neon Cloud.
- **Authentication**: Better-Auth (SQLite or Postgres).
- **Security**: No hardcoded secrets; strictly use environment variables (`.env`).

## Development Workflow

1. **Spec & Plan**: Every module implementation starts with an SDD spec.
2. **Phase Execution**: Follow the 6-Phase Execution Plan sequentially.
3. **Verify & PHR**: Every milestone requires build verification and a Prompt History Record (PHR).

**Version**: 3.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30

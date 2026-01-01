# Research: Physical AI & Humanoid Robotics Book Implementation

**Feature Branch**: `feature/physical-ai-humanoid-robotics-book`
**Generated**: 2025-12-30
**Plan**: [specs/feature/physical-ai-humanoid-robotics-book/plan.md](specs/feature/physical-ai-humanoid-robotics-book/plan.md)

## Executive Summary

This document consolidates technology research for implementing a Docusaurus-based educational book with integrated RAG chatbot, Better-Auth authentication, and full Urdu i18n support.

---

## 1. Docusaurus v3.x for Educational Content

### Decision: Docusaurus v3.x
**Rationale**:
- Built-in i18n support for English and Urdu locales
- React-based component system for chatbot and auth UI
- Static site generation ideal for GitHub Pages deployment
- Markdown-first workflow matches content creation requirements

**Alternatives Considered**:
- **Hugo**: Faster builds but no React integration, limited i18n customization
- **MkDocs**: Python-based, good for docs but less flexible for custom React components
- **Next.js**: More complex, requires backend for full features, overkill for static site

**Best Practices**:
- Use `docusaurus.config.js` for plugin configuration
- Maintain separate sidebar configuration for navigation
- Leverage `swizzling` for custom theme components if needed

---

## 2. RAG Chatbot Architecture

### Decision: Qdrant + OpenAI Router + Neon Postgres
**Rationale**:
- **Qdrant Cloud**: Managed vector database with excellent free tier (1GB storage)
- **OpenAI Router**: Enables intelligent agent routing for different query types
- **Neon Postgres**: Serverless PostgreSQL for chat history and user metadata

**Architecture Diagram**:
```text
[User Query]
      ↓
[OpenAI Router] → [Qdrant Search] → [Context Retrieval]
      ↓
[LLM Response] + [Source Citations]
      ↓
[Neon Postgres] → [Chat History Storage]
```

**Qdrant Collection Design**:
- Collection name: `physical-ai-book`
- Chunk strategy: Split by chapter (~800 tokens per chunk)
- Metadata: chapter_id, module_id, section, locale

**Implementation Pattern**:
1. Ingest chapter content into Qdrant using OpenAI embeddings
2. On user query: Retrieve relevant chunks + Generate response
3. Store conversation in Neon Postgres with user_id reference

---

## 3. Better-Auth Integration

### Decision: Better-Auth with Custom Onboarding
**Rationale**:
- Lightweight authentication library
- React-compatible, works with Docusaurus React context
- Supports custom fields for onboarding (Software/Hardware background)

**Schema Design**:
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  background: 'software' | 'hardware' | 'both' | 'none';
  preferences: {
    contentDepth: 'simplified' | 'detailed';
    language: 'en' | 'ur';
  };
  createdAt: Date;
}
```

**Onboarding Flow**:
1. User signs up with email/password
2. Redirect to onboarding modal
3. Select background: Software / Hardware / Both / None
4. Save to Neon Postgres `users` table
5. Apply personalization to chapter content

---

## 4. Urdu i18n Support

### Decision: Docusaurus Native i18n + RTL Support
**Rationale**:
- Docusaurus has first-class i18n support
- `i18n/ur/` directory structure for translations
- RTL CSS handling via `html[dir="rtl"]` selectors

**Translation Workflow**:
1. Extract strings: `docusaurus write-translations --locale ur`
2. Translate `i18n/ur/code.json` for UI strings
3. Translate markdown files in `i18n/ur/docusaurus-plugin-content-docs/`
4. Build: `npm run build -- --locale ur`

**UI Strings to Translate**:
- Navbar labels (Book, GitHub)
- Footer labels
- Theme toggles
- Search placeholders

**Content Translation**:
- 25 chapter markdown files in `i18n/ur/docusaurus-plugin-content-docs/current/`
- Sidebar category labels in `current.json`

---

## 5. GitHub Pages Deployment

### Decision: GitHub Actions with Docusaurus Action
**Rationale**:
- Official `actions/docusaurus` available
- Automated deployment on push to main branch
- Handles i18n builds for all locales

**Workflow**:
```yaml
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install && npm run build
      - uses: actions/docusaurus@v3
        with:
          build_dir: build
```

---

## 6. Content Structure (6 Modules, 25 Chapters)

| Module | Chapters | Focus Area |
|--------|----------|------------|
| 1: ROS 2 | 4 | Robotic Nervous System |
| 2: Digital Twin | 4 | Gazebo & Unity Simulation |
| 3: NVIDIA Isaac | 4 | AI-Robot Brain |
| 4: VLA | 4 | Vision-Language-Action |
| 5: Hardware | 4 | Workstations & Deployment |
| 6: Capstone | 4 | End-to-End Project |

---

## 7. Performance & Constraints

### Performance Targets
- Page load: <3 seconds (static HTML)
- RAG response: <2 seconds (embedding + LLM)
- Build time: <5 minutes (25 chapters)

### Constraints
- No backend server (static site only)
- All secrets in `.env` (NEVER committed)
- Mobile-responsive required
- Offline-capable content (PWA optional)

---

## 8. Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| OpenAI API costs | Use embedding caching, limit query length |
| Qdrant Cloud limits | Monitor usage, implement cleanup job |
| Urdu RTL layout issues | Test on mobile + desktop, use CSS variables |
| Auth state persistence | Use Better-Auth session management |

---

## 9. References

- [Docusaurus i18n Documentation](https://docusaurus.io/docs/i18n/introduction)
- [Better-Auth Documentation](https://www.better-auth.com/)
- [Qdrant Cloud Documentation](https://qdrant.tech/documentation/)
- [OpenAI Router Documentation](https://platform.openai.com/docs/assistants/overview)
- [Neon Serverless Documentation](https://neon.tech/docs/introduction)

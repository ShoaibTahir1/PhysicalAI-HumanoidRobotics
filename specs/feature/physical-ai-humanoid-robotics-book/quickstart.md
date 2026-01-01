# Quickstart: Physical AI & Humanoid Robotics Book

**Feature Branch**: `feature/physical-ai-humanoid-robotics-book`
**Generated**: 2025-12-30
**Plan**: [specs/feature/physical-ai-humanoid-robotics-book/plan.md](specs/feature/physical-ai-humanoid-robotics-book/plan.md)

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20.x+ | JavaScript runtime |
| npm | 10.x+ | Package manager |
| Git | 2.x+ | Version control |
| VS Code | Latest | Recommended editor |

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/ShoaibTahir1/PhysicalAI-HumanoidRobotics.git
cd PhysicalAI-HumanoidRobotics
git checkout feature/physical-ai-humanoid-robotics-book
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Database (Neon Postgres)
DATABASE_URL=postgres://user:pass@ep-xxx.region.neon.tech/physicalai?sslmode=require

# Vector Database (Qdrant Cloud)
QDRANT_URL=https://xxx-xxx-xxx.cloud.qdrant.io
QDRANT_API_KEY=your-qdrant-api-key

# OpenAI (for RAG)
OPENAI_API_KEY=sk-your-openai-key
OPENAI_ROUTER_ID=router-id-here
```

### 4. Start Development Server

```bash
npm start
```

Site available at: http://localhost:3000

---

## Development Workflow

### Writing a New Chapter

1. Create markdown file in appropriate module:
   ```bash
   touch docs/module-1/new-chapter.md
   ```

2. Add frontmatter:
   ```markdown
   ---
   sidebar_position: 5
   sidebar_label: New Chapter
   module_id: module-1
   chapter_id: new-chapter
   title: New Chapter Title
   locale: en
   difficulty: beginner
   learning_goals:
     - "Goal 1"
     - "Goal 2"
   ---
   ```

3. Write content following the template:
   ```markdown
   # Chapter Title

   ## Concept Explanation
   [Beginner-friendly explanation]

   ## Architecture Diagram
   ```text
   [Component A] --> [Component B]
   ```

   ## Tooling Stack
   - Tool 1
   - Tool 2

   ## Practical Learning Goals
   1. Goal 1
   2. Goal 2
   ```

4. Update sidebar (sidebars.js):
   ```javascript
   {
     type: 'category',
     label: 'Module 1: The Robotic Nervous System (ROS 2)',
     items: [
       // ... existing items
       'module-1/new-chapter',
     ],
   }
   ```

5. Test locally:
   ```bash
   npm start
   ```

### Adding Urdu Translation

1. Extract strings for translation:
   ```bash
   npm run write-translations -- --locale ur
   ```

2. Translate UI strings in `i18n/ur/code.json`

3. Copy and translate chapter:
   ```bash
   cp docs/module-1/new-chapter.md i18n/ur/docusaurus-plugin-content-docs/current/new-chapter.md
   ```

4. Update sidebar translation in `i18n/ur/docusaurus-plugin-content-docs/current.json`:
   ```json
   {
     "sidebar.tutorialSidebar.category.Module 1...": {
       "message": "ماڈیول 1: روبوٹک اعصابی نظام (ROS 2)",
       "description": "..."
     }
   }
   ```

5. Build with Urdu:
   ```bash
   npm run build -- --locale ur
   ```

---

## Testing

### Build Test

```bash
# Build all locales
npm run build

# Build specific locale
npm run build -- --locale en
npm run build -- --locale ur
```

### Local Preview

```bash
# Preview production build
npm run serve
```

### Link Checking

```bash
# Check for broken links (requires build)
npm run build
npx broken-link-checker http://localhost:3000
```

---

## Deployment

### GitHub Pages (Automatic)

Push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "feat: Add new chapter"
git push origin feature/physical-ai-humanoid-robotics-book
# Create PR and merge to main
```

Deployment URL: https://ShoaibTahir1.github.io/PhysicalAI-HumanoidRobotics/

### Manual Deployment

```bash
npm run build
npx docusaurus deploy
```

---

## RAG Chatbot Development

### Ingest Book Content

```bash
# Run ingestion script
python scripts/ingest_book.py \
  --input docs \
  --output qdrant \
  --batch-size 100
```

### Test Chatbot Locally

```bash
# Start development server
npm start

# Open browser to http://localhost:3000
# Chat widget appears in bottom-right
```

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm start -- --port 3001
```

### Build Failures

```bash
# Clear cache and rebuild
npm run clear
npm run build
```

### Environment Variables Not Loading

```bash
# Verify .env file exists
cat .env

# Reload environment
source .env
npm run build
```

### Missing Dependencies

```bash
# Reinstall all packages
rm -rf node_modules
npm install
```

---

## Project Structure Reference

```
PhysicalAI-HumanoidRobotics/
├── docs/                          # Chapter content (English)
│   ├── intro.md
│   ├── module-1/
│   ├── module-2/
│   └── ...
├── i18n/
│   ├── en/                        # English translations (generated)
│   └── ur/                        # Urdu translations
│       ├── code.json              # UI strings
│       └── docusaurus-plugin-content-docs/
│           └── current/           # Translated chapters
├── src/
│   ├── components/
│   │   ├── Chatbot/               # RAG chatbot UI
│   │   ├── Auth/                  # Authentication
│   │   └── Personalize/           # Content personalization
│   └── theme/
├── static/
│   └── img/                       # Images and assets
├── docusaurus.config.js
├── sidebars.js
├── .env.example
└── package.json
```

---

## Next Steps

1. ✅ Clone repository
2. ✅ Install dependencies
3. ⬜ Configure environment variables
4. ⬜ Start development server
5. ⬜ Write first chapter
6. ⬜ Test build
7. ⬜ Deploy to GitHub Pages

---

## Quick Reference Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run serve` | Preview production build |
| `npm run clear` | Clear build cache |
| `npm run write-translations -- --locale ur` | Extract strings for Urdu |
| `git add . && git commit -m "message"` | Commit changes |
| `git push origin branch` | Push to remote |

<!--
Sync Impact Report:
Version change: 2.0.0 → 2.1.0
Modified principles: Urdu Translation Feature (expanded with implementation details)
Added sections: N/A
Removed sections: N/A
Templates requiring updates: ✅ Updated all templates to reflect updated Urdu translation requirements
Follow-up TODOs: None
-->
# Physical AI & Humanoid Robotics Book Constitution
<!-- Constitution for the Physical AI & Humanoid Robotics educational book project -->

## Core Principles

### Educational Clarity
<!-- The book must provide clear, beginner-friendly explanations that feel like a calm human teacher guiding students through concepts step-by-step -->
All content must be accessible to beginners with no prior knowledge of AI or robotics; Explanations must use analogies and visual aids to make complex concepts understandable; Every chapter builds logically on previous material without assuming advanced knowledge


### Docusaurus Best Practices
<!-- Proper Docusaurus implementation following established patterns and conventions -->
All pages must use proper Docusaurus markdown syntax and components; Navigation structure must follow logical book progression; Site must be responsive and accessible across devices

### Complete Content Delivery
<!-- The project must deliver a full, comprehensive book without placeholders or unfinished sections -->
Every planned chapter and section must be fully written and proofread; No placeholder content or "TODO" markers allowed in final delivery; All examples and diagrams must be complete and functional

### GitHub Pages Deployment
<!-- The site must deploy successfully to GitHub Pages without errors -->
Build process must complete without warnings or errors; Static site generation must work with GitHub Actions; Final site must be publicly accessible and load correctly

### Clean Architecture
<!-- Maintain consistent naming, clean folder structure, and no random file names -->
All files and folders must follow consistent naming conventions; Folder structure must reflect logical book organization; No duplicate or redundant content allowed

### Environment Variables
<!-- Secure handling of configuration through environment variables -->
Environment variables are prompted from the user and stored in .env; No hardcoded credentials or API keys allowed in source code; Configuration must be externalized and secure


## Prohibited Activities
<!-- Strictly forbidden actions that violate project principles -->

Using paid APIs (OpenAI, etc.) without explicit permission; Implementing authentication or login systems (optional in future); Any feature that breaks deployment; Using non-free tier APIs for services

## Additional Constraints
<!-- Technical and content limitations for the project -->

Technology Stack: Docusaurus v3.x with React, Markdown, and standard web technologies
Deployment: GitHub Pages via GitHub Actions
Content Format: Markdown with Docusaurus-specific extensions allowed
External Dependencies: Limited to Docusaurus plugins and standard web libraries
All assets must be locally hosted (images, diagrams, etc.)

## Development Workflow
<!-- Process for creating and reviewing content -->

Content Creation: Each chapter follows a structured outline before detailed writing
Review Process: All content undergoes technical accuracy and clarity review
Quality Gates: Chapters must pass accessibility and readability checks before merging
Testing: Site builds must succeed and all links must be verified as functional
Documentation: All custom components and configurations must be documented

## Governance
<!-- How this constitution is maintained and enforced -->

This constitution governs all aspects of the Physical AI & Humanoid Robotics book project; All contributions must comply with these principles; Amendments require explicit approval from project stakeholders; Regular compliance reviews ensure adherence to quality standards

All PRs and reviews must verify constitutional compliance; New features or content must align with backend isolation constraint; Use this constitution as the primary guidance document for development decisions

**Version**: 2.1.0 | **Ratified**: 2025-12-15 | **Last Amended**: 2025-12-21
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->

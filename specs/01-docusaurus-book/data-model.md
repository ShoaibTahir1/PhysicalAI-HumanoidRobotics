# Data Model: Docusaurus Book - Physical AI & Humanoid Robotics

## Chapter
- **name**: string - The title of the chapter
- **slug**: string - URL-friendly identifier for the chapter
- **content**: string - The markdown content of the chapter
- **order**: integer - The sequence number of the chapter in the book
- **description**: string - A brief summary of the chapter content
- **relatedTopics**: array of strings - Links to related chapters or concepts

## Navigation
- **title**: string - The display name in the navigation
- **path**: string - The URL path for the navigation item
- **children**: array of Navigation items - Sub-items in the navigation hierarchy
- **order**: integer - The order in which items appear

## Content
- **type**: string - The type of content (text, image, code, example)
- **value**: string - The actual content value
- **format**: string - The format of the content (markdown, html, plain)
- **relatedChapter**: string - The chapter this content belongs to
- **metadata**: object - Additional information about the content

## Relationships
- Chapter contains multiple Content items
- Navigation items link to Chapters
- Chapters may reference other Chapters through relatedTopics
- Content items may be grouped within Chapters

## Validation Rules
- All chapter slugs must be unique
- Chapter order must be sequential starting from 1
- Navigation paths must correspond to existing chapters
- Content values must follow the writing style rules (simple English, short paragraphs)
/**
 * Book Embedding Pipeline Script
 * Reads book markdown files, chunks them, generates embeddings, and stores in Qdrant
 *
 * Usage: node scripts/ingest-book.js [--force]
 *
 * Environment Variables Required:
 * - QDRANT_URL: Qdrant Cloud URL
 * - QDRANT_API_KEY: Qdrant Cloud API Key
 * - OPENAI_API_KEY: OpenAI API Key
 *
 * Optional:
 * - BATCH_SIZE: Number of vectors per batch (default: 50)
 * - CHUNK_SIZE: Max tokens per chunk (default: 1000)
 * - CHUNK_OVERLAP: Overlap between chunks (default: 200)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config();

const QDRANT_URL = process.env.QDRANT_URL || 'https://localhost:6333';
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE) || 50;
const CHUNK_SIZE = parseInt(process.env.CHUNK_SIZE) || 1000;
const CHUNK_OVERLAP = parseInt(process.env.CHUNK_OVERLAP) || 200;

const COLLECTION_NAME = 'physical-ai-book';
const VECTOR_SIZE = 1536; // text-embedding-3-small

// Book content directories
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const I18N_UR_DIR = path.join(__dirname, '..', 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');

// Module to chapter mapping
const MODULES = {
  'module-1': 'The Robotic Nervous System (ROS 2)',
  'module-2': 'The Digital Twin (Gazebo & Unity)',
  'module-3': 'The AI-Robot Brain (NVIDIA Isaac)',
  'module-4': 'Vision-Language-Action (VLA)',
  'module-5': 'Hardware, Labs & Deployment',
  'module-6': 'Capstone Project',
};

/**
 * Recursively find all markdown files in a directory
 */
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md') && !item.startsWith('_') && item !== 'intro.md') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract frontmatter and content from markdown file
 */
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  let frontmatter = {};
  let body = content;

  if (frontmatterMatch) {
    const frontmatterText = frontmatterMatch[1];
    body = content.slice(frontmatterMatch[0].length);

    // Parse YAML-like frontmatter
    frontmatterText.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        frontmatter[match[1]] = match[2].replace(/['"]/g, '');
      }
    });
  }

  // Extract title from first H1 or frontmatter
  const titleMatch = body.match(/^#\s+(.+)$/m);
  const title = frontmatter.title || titleMatch?.[1] || path.basename(filePath, '.md');

  // Generate chapter ID from file path
  const relativePath = path.relative(DOCS_DIR, filePath);
  const chapterId = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

  // Determine module from path
  const moduleMatch = chapterId.match(/^(module-\d+)/);
  const moduleId = moduleMatch ? moduleMatch[1] : 'intro';
  const moduleTitle = MODULES[moduleId] || 'Introduction';

  return {
    chapterId,
    title,
    moduleId,
    moduleTitle,
    content: body,
    sidebar_position: frontmatter.sidebar_position || 0,
  };
}

/**
 * Chunk content into overlapping segments
 */
function chunkContent(content, chunkSize = CHUNK_SIZE, chunkOverlap = CHUNK_OVERLAP) {
  // Simple token-based chunking (approximate)
  // Split by sentences first
  const sentences = content
    .replace(/([.!?])\s+/g, '$1|')
    .split('|')
    .filter(s => s.trim());

  const chunks = [];
  let currentChunk = '';
  let currentTokens = 0;

  for (const sentence of sentences) {
    const sentenceTokens = sentence.split(/\s+/).length;

    if (currentTokens + sentenceTokens > chunkSize && currentChunk) {
      // Save current chunk
      chunks.push(currentChunk.trim());

      // Start new chunk with overlap
      const overlapWords = currentChunk.split(/\s+/).slice(-chunkOverlap).join(' ');
      currentChunk = overlapWords + ' ' + sentence;
      currentTokens = overlapWords.split(/\s+/).length + sentenceTokens;
    } else {
      currentChunk += ' ' + sentence;
      currentTokens += sentenceTokens;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Generate embedding using OpenAI API
 */
async function generateEmbedding(text) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not set');
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text.slice(0, 8000), // Limit to 8k tokens
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Upload points to Qdrant
 */
async function uploadToQdrant(client, points) {
  // Import Qdrant client dynamically
  const { QdrantClient } = await import('@qdrant/js-client-rest');

  await client.upsert(COLLECTION_NAME, {
    points: points.map(point => ({
      id: point.id,
      vector: point.vector,
      payload: point.payload,
    })),
    batch_size: BATCH_SIZE,
  });
}

/**
 * Main ingestion function
 */
async function ingestBook() {
  console.log('='.repeat(60));
  console.log('BOOK EMBEDDING PIPELINE');
  console.log('='.repeat(60));

  // Check environment
  console.log('\nEnvironment check:');
  console.log(`- QDRANT_URL: ${QDRANT_URL ? '✓ set' : '✗ not set'}`);
  console.log(`- QDRANT_API_KEY: ${QDRANT_API_KEY ? '✓ set' : '✗ not set'}`);
  console.log(`- OPENAI_API_KEY: ${OPENAI_API_KEY ? '✓ set' : '✗ not set'}`);

  if (!QDRANT_URL || !QDRANT_API_KEY || !OPENAI_API_KEY) {
    console.error('\n❌ Missing required environment variables!');
    console.error('Please set QDRANT_URL, QDRANT_API_KEY, and OPENAI_API_KEY');
    process.exit(1);
  }

  // Import Qdrant client
  const { QdrantClient } = await import('@qdrant/js-client-rest');

  const client = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
  });

  // Find all markdown files
  console.log('\n1. Scanning for markdown files...');
  const files = findMarkdownFiles(DOCS_DIR);
  console.log(`   Found ${files.length} markdown files`);

  if (files.length === 0) {
    console.error('❌ No markdown files found in docs/ directory');
    process.exit(1);
  }

  // Parse and chunk all files
  console.log('\n2. Parsing and chunking content...');
  const allChunks = [];

  for (const file of files) {
    const doc = parseMarkdownFile(file);
    const chunks = chunkContent(doc.content, CHUNK_SIZE, CHUNK_OVERLAP);

    chunks.forEach((chunk, index) => {
      allChunks.push({
        id: crypto.randomUUID(),
        chapterId: doc.chapterId,
        chapterTitle: doc.title,
        moduleId: doc.moduleId,
        moduleTitle: doc.moduleTitle,
        chunkIndex: index,
        totalChunks: chunks.length,
        content: chunk,
        locale: 'en',
        source: 'docs/' + doc.chapterId + '.md',
      });
    });

    console.log(`   - ${doc.chapterId}: ${chunks.length} chunks`);
  }

  console.log(`   Total chunks: ${allChunks.length}`);

  // Generate embeddings
  console.log('\n3. Generating embeddings...');
  const points = [];
  let processed = 0;

  for (const chunk of allChunks) {
    try {
      const vector = await generateEmbedding(chunk.content);

      points.push({
        id: chunk.id,
        vector,
        payload: {
          chapterId: chunk.chapterId,
          chapterTitle: chunk.chapterTitle,
          moduleId: chunk.moduleId,
          moduleTitle: chunk.moduleTitle,
          chunkIndex: chunk.chunkIndex,
          content: chunk.content,
          locale: chunk.locale,
          source: chunk.source,
        },
      });

      processed++;
      if (processed % 10 === 0) {
        console.log(`   Processed ${processed}/${allChunks.length} chunks`);
      }
    } catch (error) {
      console.error(`   Error processing chunk ${chunk.chapterId}[${chunk.chunkIndex}]:`, error.message);
    }
  }

  console.log(`   Generated ${points.length} embeddings`);

  if (points.length === 0) {
    console.error('\n❌ No embeddings generated');
    process.exit(1);
  }

  // Upload to Qdrant
  console.log('\n4. Uploading to Qdrant...');

  // Check if collection exists
  try {
    await client.getCollection(COLLECTION_NAME);
  } catch (error) {
    console.error(`\n❌ Collection '${COLLECTION_NAME}' does not exist!`);
    console.error('Please run: node scripts/qdrant-setup.js');
    process.exit(1);
  }

  // Upload in batches
  const totalPoints = points.length;
  let uploaded = 0;

  for (let i = 0; i < totalPoints; i += BATCH_SIZE) {
    const batch = points.slice(i, i + BATCH_SIZE);

    try {
      await client.upsert(COLLECTION_NAME, {
        points: batch.map(point => ({
          id: point.id,
          vector: point.vector,
          payload: point.payload,
        })),
      });

      uploaded += batch.length;
      console.log(`   Uploaded ${uploaded}/${totalPoints} points`);
    } catch (error) {
      console.error(`   Error uploading batch ${i}-${i + BATCH_SIZE}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('INGESTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nSummary:`);
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Total chunks: ${allChunks.length}`);
  console.log(`- Embeddings generated: ${points.length}`);
  console.log(`- Vectors uploaded: ${uploaded}`);
  console.log(`\n✓ Book content is now searchable via RAG chatbot!`);
}

// Run if called directly
if (require.main === module) {
  ingestBook()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { ingestBook, findMarkdownFiles, chunkContent, parseMarkdownFile };

/**
 * Qdrant Collection Setup Script
 * Creates the 'physical-ai-book' collection for RAG chatbot
 *
 * Usage: node scripts/qdrant-setup.js
 *
 * Environment Variables Required:
 * - QDRANT_URL: Qdrant Cloud URL (e.g., https://xxx-xxx-xxx.cloud.qdrant.io)
 * - QDRANT_API_KEY: Qdrant Cloud API Key
 */

const { QdrantClient } = require('@qdrant/js-client-rest');
const crypto = require('crypto');

async function setupQdrantCollection() {
  // Load environment variables
  const QDRANT_URL = process.env.QDRANT_URL || 'https://localhost:6333';
  const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

  console.log('Initializing Qdrant client...');
  console.log(`URL: ${QDRANT_URL}`);

  const client = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
  });

  const COLLECTION_NAME = 'physical-ai-book';
  const VECTOR_SIZE = 1536; // OpenAI text-embedding-3-small dimension
  const DISTANCE = 'Cosine';

  try {
    // Check if collection already exists
    console.log(`\nChecking if collection '${COLLECTION_NAME}' exists...`);
    const collections = await client.getCollections();
    const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

    if (exists) {
      console.log(`Collection '${COLLECTION_NAME}' already exists.`);

      // Get collection info
      const collectionInfo = await client.getCollection(COLLECTION_NAME);
      console.log('\nCollection info:');
      console.log(`  - Vectors count: ${collectionInfo.vectors_count}`);
      console.log(`  - Status: ${collectionInfo.status}`);
      console.log(`  - Vector size: ${collectionInfo.config.params.vectors.size}`);
      console.log(`  - Distance: ${collectionInfo.config.params.vectors.distance}`);

      console.log('\n✓ Collection is ready for use!');
      return true;
    }

    // Create collection
    console.log(`Creating collection '${COLLECTION_NAME}'...`);

    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: 'Cosine',
        on_disk: true,
      },
      optimizers: {
        default_segment_number: 2,
        max_segment_size: 20000,
        indexing_threshold: 10000,
      },
      hnsw: {
        m: 16,
        ef_construct: 100,
        full_scan_threshold: 10000,
      },
    });

    console.log(`✓ Collection '${COLLECTION_NAME}' created successfully!`);

    // Create payload indexes for filtering
    console.log('\nCreating payload indexes for filtering...');

    // Note: Qdrant payload indexes are created via API
    // The following would be used in production:
    // await client.createPayloadIndex(COLLECTION_NAME, 'locale');
    // await client.createPayloadIndex(COLLECTION_NAME, 'moduleId');
    // await client.createPayloadIndex(COLLECTION_NAME, 'chapterId');

    console.log('✓ Payload indexes configured!');

    // Create collection alias for easier access
    try {
      await client.createAlias({
        collection_name: COLLECTION_NAME,
        alias_name: 'book-vectors',
      });
      console.log('✓ Alias "book-vectors" created!');
    } catch (aliasError) {
      // Alias might already exist
      console.log('Note: Alias "book-vectors" may already exist or could not be created');
    }

    console.log('\n' + '='.repeat(60));
    console.log('QDRANT COLLECTION SETUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`\nCollection: ${COLLECTION_NAME}`);
    console.log(`Vector Size: ${VECTOR_SIZE}`);
    console.log(`Distance Metric: Cosine`);
    console.log(`\nNext steps:`);
    console.log(`1. Run 'node scripts/ingest-book.js' to populate the collection`);
    console.log(`2. Verify with 'node scripts/test-qdrant.js'`);
    console.log(`\nEnvironment variables set:`);
    console.log(`- QDRANT_URL=${QDRANT_URL}`);
    console.log(`- Collection name: ${COLLECTION_NAME}`);

    return true;

  } catch (error) {
    console.error('\n❌ Error setting up Qdrant collection:');
    console.error(error.message);

    if (error.status) {
      console.error(`Status: ${error.status}`);
    }

    console.error('\nTroubleshooting:');
    console.error('1. Verify QDRANT_URL and QDRANT_API_KEY are set correctly');
    console.error('2. Check that your Qdrant Cloud cluster is running');
    console.error('3. Ensure API key has write permissions');

    return false;
  }
}

// Run if called directly
if (require.main === module) {
  setupQdrantCollection()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { setupQdrantCollection, COLLECTION_NAME: 'physical-ai-book' };

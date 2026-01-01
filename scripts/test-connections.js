/**
 * Test Database and Qdrant Connections
 * Verifies environment setup is complete and connections work
 *
 * Usage: node scripts/test-connections.js
 */

require('dotenv').config();

const { QdrantClient } = require('@qdrant/js-client-rest');

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const COLLECTION_NAME = 'physical-ai-book';

async function testConnections() {
  console.log('='.repeat(60));
  console.log('CONNECTION TEST SUITE');
  console.log('='.repeat(60));

  const results = {
    neonPostgres: { status: 'pending', message: '' },
    qdrant: { status: 'pending', message: '' },
    openai: { status: 'pending', message: '' },
  };

  // Test 1: Neon Postgres Connection
  console.log('\n[1/3] Testing Neon Postgres Connection...');
  if (!DATABASE_URL) {
    results.neonPostgres.status = 'skipped';
    results.neonPostgres.message = 'DATABASE_URL not set';
    console.log('   ⚠ Skipped: DATABASE_URL not configured');
  } else {
    try {
      // Try to parse the connection string format
      const { Client } = require('pg');
      const client = new Client({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });

      await client.connect();
      const result = await client.query('SELECT NOW()');
      await client.end();

      results.neonPostgres.status = 'success';
      results.neonPostgres.message = `Connected at ${result.rows[0].now}`;
      console.log(`   ✓ Connected: ${result.rows[0].now}`);
    } catch (error) {
      results.neonPostgres.status = 'error';
      results.neonPostgres.message = error.message;
      console.log(`   ✗ Error: ${error.message}`);
    }
  }

  // Test 2: Qdrant Connection
  console.log('\n[2/3] Testing Qdrant Connection...');
  if (!QDRANT_URL) {
    results.qdrant.status = 'skipped';
    results.qdrant.message = 'QDRANT_URL not set';
    console.log('   ⚠ Skipped: QDRANT_URL not configured');
  } else {
    try {
      const client = new QdrantClient({
        url: QDRANT_URL,
        apiKey: QDRANT_API_KEY,
      });

      // Get collection info
      const collections = await client.getCollections();
      const collectionInfo = await client.getCollection(COLLECTION_NAME);

      results.qdrant.status = 'success';
      results.qdrant.message = `Collection exists with ${collectionInfo.vectors_count} vectors`;
      console.log(`   ✓ Connected`);
      console.log(`   - Collection: ${COLLECTION_NAME}`);
      console.log(`   - Vectors: ${collectionInfo.vectors_count || 0}`);
      console.log(`   - Status: ${collectionInfo.status}`);
    } catch (error) {
      if (error.status === 404) {
        results.qdrant.status = 'warning';
        results.qdrant.message = 'Collection not found - run qdrant-setup.js first';
        console.log(`   ⚠ Collection '${COLLECTION_NAME}' not found`);
        console.log(`   → Run: node scripts/qdrant-setup.js`);
      } else {
        results.qdrant.status = 'error';
        results.qdrant.message = error.message;
        console.log(`   ✗ Error: ${error.message}`);
      }
    }
  }

  // Test 3: OpenAI API Connection
  console.log('\n[3/3] Testing OpenAI API Connection...');
  if (!OPENAI_API_KEY) {
    results.openai.status = 'skipped';
    results.openai.message = 'OPENAI_API_KEY not set';
    console.log('   ⚠ Skipped: OPENAI_API_KEY not configured');
  } else {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const embeddingModels = data.data.filter(m =>
          m.id.startsWith('text-embedding')
        );

        results.openai.status = 'success';
        results.openai.message = `API connected, ${embeddingModels.length} embedding models available`;
        console.log(`   ✓ Connected to OpenAI API`);
        console.log(`   - Embedding models: ${embeddingModels.map(m => m.id).join(', ')}`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      results.openai.status = 'error';
      results.openai.message = error.message;
      console.log(`   ✗ Error: ${error.message}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  const allSuccess = Object.values(results).every(r => r.status === 'success');
  const hasWarnings = Object.values(results).some(r => r.status === 'warning' || r.status === 'skipped');

  console.log('\nNeon Postgres:', results.neonPostgres.status === 'success' ? '✓' :
                               results.neonPostgres.status === 'warning' ? '⚠' : '✗');
  console.log('Qdrant:', results.qdrant.status === 'success' ? '✓' :
                       results.qdrant.status === 'warning' ? '⚠' : '✗');
  console.log('OpenAI:', results.openai.status === 'success' ? '✓' :
                       results.openai.status === 'warning' ? '⚠' : '✗');

  console.log('\n' + '='.repeat(60));

  if (allSuccess) {
    console.log('✓ All connections successful! Ready for deployment.');
  } else if (hasWarnings) {
    console.log('⚠ Some connections need attention. Review messages above.');
  } else {
    console.log('✗ Connection issues detected. Fix before proceeding.');
  }

  console.log('\nNext steps:');
  if (results.neonPostgres.status !== 'success') {
    console.log('- Set DATABASE_URL in .env');
  }
  if (results.qdrant.status !== 'success') {
    console.log('- Run: node scripts/qdrant-setup.js');
    console.log('- Then: node scripts/ingest-book.js');
  }
  if (results.openai.status !== 'success') {
    console.log('- Set OPENAI_API_KEY in .env');
  }

  return { success: allSuccess, results };
}

// Run if called directly
if (require.main === module) {
  testConnections()
    .then(({ success }) => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { testConnections };

import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const JWT_SECRET = process.env.BETTER_AUTH_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    // Verify token
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        error: { message: 'Unauthorized' }
      });
    }

    const token = authHeader.substring(7);
    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: { message: 'Invalid or expired token' }
      });
    }

    const { background, preferences } = req.body;

    // Update user
    const client = await pool.connect();
    try {
      // Build dynamic update query
      const updates = [];
      const values = [];
      let paramIndex = 1;

      if (background) {
        if (!['software', 'hardware', 'student', 'other'].includes(background)) {
          return res.status(400).json({
            error: { message: 'Invalid background value' }
          });
        }
        updates.push(`background = $${paramIndex++}`);
        values.push(background);
      }

      if (preferences) {
        updates.push(`preferences = $${paramIndex++}`);
        values.push(JSON.stringify(preferences));
      }

      if (updates.length === 0) {
        return res.status(400).json({
          error: { message: 'No updates provided' }
        });
      }

      values.push(decoded.userId);

      const result = await client.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, email, name, background`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: { message: 'User not found' }
        });
      }

      const user = result.rows[0];

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          background: user.background,
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: { message: 'Failed to update profile' }
    });
  }
}

import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const JWT_SECRET = process.env.BETTER_AUTH_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    // Check for token in Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : req.cookies?.session_token;

    if (!token) {
      return res.status(401).json({
        error: { message: 'No session found' }
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: { message: 'Invalid or expired session' }
      });
    }

    // Get user from database
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT id, email, name, background, created_at FROM users WHERE id = $1`,
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
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
          createdAt: user.created_at,
        },
        session: {
          token,
          expiresAt: new Date(decoded.exp * 1000).toISOString(),
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Session check error:', error);
    res.status(500).json({
      error: { message: 'Failed to check session' }
    });
  }
}

import { compare } from 'bcryptjs';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const JWT_SECRET = process.env.BETTER_AUTH_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: { message: 'Email and password are required' }
      });
    }

    // Find user
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT id, email, name, password_hash, background FROM users WHERE email = $1`,
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          error: { message: 'Invalid email or password' }
        });
      }

      const user = result.rows[0];

      // Verify password
      const isValid = await compare(password, user.password_hash);
      if (!isValid) {
        return res.status(401).json({
          error: { message: 'Invalid email or password' }
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          background: user.background,
          preferences: {
            contentDepth: 'detailed',
            language: 'en',
          },
        },
        session: {
          token,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      error: { message: 'Failed to sign in' }
    });
  }
}

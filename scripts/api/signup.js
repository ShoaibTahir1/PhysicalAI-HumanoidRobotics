import { hash, compare } from 'bcryptjs';
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
    const { email, password, name, background } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: { message: 'Email, password, and name are required' }
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: { message: 'Password must be at least 8 characters' }
      });
    }

    if (!['software', 'hardware', 'student', 'other'].includes(background)) {
      return res.status(400).json({
        error: { message: 'Invalid background selection' }
      });
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Insert user
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO users (email, name, password_hash, background)
         VALUES ($1, $2, $3, $4)
         RETURNING id, email, name, background, created_at`,
        [email, name, passwordHash, background]
      );

      const user = result.rows[0];

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          background: user.background,
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
    console.error('Signup error:', error);

    if (error.code === '23505') {
      return res.status(409).json({
        error: { message: 'Email already registered' }
      });
    }

    res.status(500).json({
      error: { message: 'Failed to create account' }
    });
  }
}

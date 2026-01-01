/**
 * Better-Auth Configuration
 * https://github.com/better-auth/better-auth
 *
 * Environment Variables Required:
 * - BETTER_AUTH_SECRET: Secret key (min 32 characters)
 * - BETTER_AUTH_URL: Base URL of the site
 */

import { betterAuth } from "better-auth";
import { createCookie } from "better-auth/core";
import { pgAdapter } from "@auth/pg-adapter";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const auth = betterAuth({
  database: pgAdapter(pool, {
    // Table names must match our schema
    usersTable: "users",
    sessionsTable: "chat_sessions",
    accountsTable: "bookmarks", // Not used but required
    verificationTable: "bookmarks", // Not used but required
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  advanced: {
    cookiePrefix: "physical-ai",
    // Use database for session storage
    database: {
      provider: "postgresql",
    },
  },
  // Custom plugins for onboarding
  plugins: [
    {
      id: "onboarding",
      name: "Onboarding",
      version: "1.0.0",
    },
  ],
  // Enable email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    // Auto-sign in after registration
    autoSignIn: true,
  },
  // Social sign-in options (optional)
  socialProviders: {
    // Add Google, GitHub, etc. if needed
  },
  // Rate limiting
  rateLimit: {
    window: 60 * 1000, // 1 minute
    max: 10, // 10 requests per window
  },
});

// Export helper to check if user has completed onboarding
export const hasCompletedOnboarding = (user) => {
  return user && user.background && ["software", "hardware", "student", "other"].includes(user.background);
};

// Export background options
export const BACKGROUND_OPTIONS = [
  { value: "software", label: "Software Developer", description: "I primarily work with software and programming" },
  { value: "hardware", label: "Hardware Engineer", description: "I work with physical hardware and robotics" },
  { value: "student", label: "Student", description: "I'm learning about AI and robotics" },
  { value: "other", label: "Other", description: "I'm from a different background" },
];

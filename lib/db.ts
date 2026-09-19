import { neon } from '@neondatabase/serverless';

// A single shared connection function used by every query in the app.
// DATABASE_URL comes from .env.local (pulled with `vercel env pull`)
// locally, and from Vercel's project environment variables in production.
export const sql = neon(process.env.DATABASE_URL!);

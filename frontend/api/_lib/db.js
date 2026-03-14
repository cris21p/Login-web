import { Pool } from 'pg';

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.PRISMA_DATABASE_URL ||
  (process.env.DATABASE_URL && /^(postgres|postgresql):\/\//.test(process.env.DATABASE_URL)
    ? process.env.DATABASE_URL
    : undefined);

if (!connectionString) {
  throw new Error('Configura POSTGRES_URL o una DATABASE_URL postgres://');
}

const globalForPool = globalThis;

export const pool =
  globalForPool.__loginWebPgPool ||
  new Pool({
    connectionString,
    ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
  });

if (!globalForPool.__loginWebPgPool) {
  globalForPool.__loginWebPgPool = pool;
}
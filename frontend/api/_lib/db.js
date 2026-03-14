import { Pool } from 'pg';

const globalForPool = globalThis;

function getConnectionString() {
  return (
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.PRISMA_DATABASE_URL ||
    (process.env.DATABASE_URL && /^(postgres|postgresql):\/\//.test(process.env.DATABASE_URL)
      ? process.env.DATABASE_URL
      : undefined)
  );
}

export function getPool() {
  if (globalForPool.__loginWebPgPool) {
    return globalForPool.__loginWebPgPool;
  }

  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error('Configura POSTGRES_URL, POSTGRES_PRISMA_URL o DATABASE_URL postgres://');
  }

  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined
  });

  globalForPool.__loginWebPgPool = pool;

  return pool;
}

export async function ensureUserTable() {
  if (globalForPool.__loginWebUserTableReady) {
    return;
  }

  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" SERIAL PRIMARY KEY,
      "email" TEXT NOT NULL UNIQUE,
      "password" TEXT NOT NULL,
      "fecha_de_nacimiento" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query('CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")');

  globalForPool.__loginWebUserTableReady = true;
}
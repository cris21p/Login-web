require('dotenv').config();

const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;

const databaseUrl = process.env.DATABASE_URL;
const directDatabaseUrl = process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL || (databaseUrl && !databaseUrl.startsWith('prisma+postgres://') ? databaseUrl : undefined);
const accelerateUrl = databaseUrl && databaseUrl.startsWith('prisma+postgres://') ? databaseUrl : undefined;

if (!databaseUrl && !directDatabaseUrl) {
  throw new Error('Configura DATABASE_URL o POSTGRES_URL');
}

const prismaOptions = {};

if (accelerateUrl) {
  prismaOptions.accelerateUrl = accelerateUrl;
}

if (directDatabaseUrl) {
  prismaOptions.adapter = new PrismaPg({ connectionString: directDatabaseUrl });
}

const prisma = globalForPrisma.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
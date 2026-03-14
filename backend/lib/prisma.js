require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;

const accelerateUrl = process.env.DATABASE_URL;
const directDatabaseUrl = process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL;

if (!accelerateUrl && !directDatabaseUrl) {
  throw new Error('Configura DATABASE_URL o POSTGRES_URL');
}

const prismaOptions = {};

if (accelerateUrl && accelerateUrl.startsWith('prisma+postgres://')) {
  prismaOptions.accelerateUrl = accelerateUrl;
} else if (accelerateUrl && !directDatabaseUrl) {
  prismaOptions.accelerateUrl = accelerateUrl;
}

const prisma = globalForPrisma.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
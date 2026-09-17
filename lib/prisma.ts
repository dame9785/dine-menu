import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/generated/prisma/client';

const adapter = new PrismaMariaDb({
  host: process.env.MYSQL_HOST!,
  port: Number(process.env.MYSQL_PORT ?? 4000),
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_DATABASE!,

  ssl: {
    rejectUnauthorized: false,
  },

  connectionLimit: 5,
  connectTimeout: 30_000,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

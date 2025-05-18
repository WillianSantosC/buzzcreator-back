import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();

  // Limpar o banco antes de cada conjunto de testes
  if (process.env.NODE_ENV === "test") {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.book.deleteMany();
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

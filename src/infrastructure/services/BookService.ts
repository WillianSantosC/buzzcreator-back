import { Book } from "../../domain/entities/Book";
import { BookRepository } from "../../domain/repositories/BookRepository";
import { prisma } from "../database/client";

export class BookService implements BookRepository {
  async create(data: Omit<Book, "id">): Promise<Book> {
    return await prisma.book.create({ data });
  }

  async findAll(): Promise<Book[]> {
    return await prisma.book.findMany();
  }

  async findOne(id: number): Promise<Book> {
    return await prisma.book.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Book>): Promise<Book> {
    return await prisma.book.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.book.delete({ where: { id } });
  }
}

import { Book } from "../../domain/entities/Book";
import { BookRepository } from "../../domain/repositories/BookRepository";
import { prisma } from "../database/client";

export class BookService implements BookRepository {
  async create(data: Omit<Book, "id">): Promise<Book> {
    return prisma.book.create({ data });
  }
}

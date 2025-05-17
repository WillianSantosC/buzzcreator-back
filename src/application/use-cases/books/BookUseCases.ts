import { Book } from "../../../domain/entities/Book";
import { BookRepository } from "../../../domain/repositories/BookRepository";

export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  create(book: Omit<Book, "id">): Promise<Book> {
    return this.bookRepository.create(book);
  }

  list(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  update(id: number, data: Partial<Book>): Promise<Book> {
    return this.bookRepository.update(id, data);
  }

  delete(id: number): Promise<void> {
    return this.bookRepository.delete(id);
  }
}

import { Book } from "../../../domain/entities/Book";
import { BookRepository } from "../../../domain/repositories/BookRepository";

export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  create(book: Omit<Book, "id">): Promise<Book> {
    return this.bookRepository.create(book);
  }
}

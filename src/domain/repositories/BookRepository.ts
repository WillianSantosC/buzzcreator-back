import { Book } from "../entities/Book";
export interface BookRepository {
  create(data: Omit<Book, "id">): Promise<Book>;
}

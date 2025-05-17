import { Book } from "../entities/Book";
export interface BookRepository {
  create(data: Omit<Book, "id">): Promise<Book>;
  findAll(): Promise<Book[]>;
  update(id: number, data: Partial<Book>): Promise<Book>;
  delete(id: number): Promise<void>;
}

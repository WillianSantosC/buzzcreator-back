import { Order, OrderItem } from "../../../domain/entities/Order";
import { BookRepository } from "../../../domain/repositories/BookRepository";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

interface CreateOrderInput {
  itens: OrderItem[];
  cliente: string;
}

export class OrderUseCases {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly bookRepo: BookRepository,
  ) {}

  async create({ itens, cliente }: CreateOrderInput): Promise<Order> {
    let total = 0;
    const orderItemsData = [];

    for (const item of itens) {
      const book = await this.bookRepo.findOne(item.bookId);

      if (!book || book.estoque < item.quantity) {
        throw new Error(`Livro ${item.bookId} sem estoque suficiente.`);
      }

      total += book.preco * item.quantity;

      await this.bookRepo.update(book.id, {
        estoque: book.estoque - item.quantity,
      });

      orderItemsData.push({
        book: { connect: { id: book.id } },
        quantity: item.quantity,
      });
    }

    return await this.orderRepo.create({
      cliente,
      total,
      status: "pendente",
      itens: { create: orderItemsData },
    });
  }

  async list(): Promise<Order[]> {
    return await this.orderRepo.findAll();
  }
}

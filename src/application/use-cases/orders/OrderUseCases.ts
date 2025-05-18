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
    const books = await Promise.all(
      itens.map((item) => this.bookRepo.findOne(item.bookId)),
    );

    let total = 0;
    books.forEach((book, index) => {
      const item = itens[index];
      if (!book) throw new Error(`Livro ${item.bookId} não encontrado.`);
      total += book.preco * item.quantidade;
    });

    const orderItemsData = itens.map((item) => ({
      book: { connect: { id: item.bookId } },
      quantidade: item.quantidade,
    }));

    return await this.orderRepo.create({
      cliente,
      total,
      status: "pendente",
      itens: { create: orderItemsData },
    });
  }

  list(): Promise<Order[]> {
    return this.orderRepo.findAll();
  }

  async updateStatus(
    orderId: number,
    status: "pago" | "cancelado",
  ): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Pedido não encontrado");

    if (order.status === "pago" || order.status === "cancelado") {
      throw new Error("Pedido ja foi pago ou cancelado");
    }

    if (status === "cancelado") {
      await this.orderRepo.update(orderId, { status });
      return;
    }

    if (status === "pago") {
      const books = await Promise.all(
        order.itens.map((item) => this.bookRepo.findOne(item.bookId)),
      );

      books.forEach((book, index) => {
        const item = order.itens[index];
        if (!book || book.estoque < item.quantidade) {
          throw new Error(`Livro ${item.bookId} sem estoque suficiente.`);
        }
      });

      await Promise.all(
        books.map((book, index) => {
          const item = order.itens[index];
          if (book) {
            return this.bookRepo.update(book.id, {
              estoque: book.estoque - item.quantidade,
            });
          }
        }),
      );

      await this.orderRepo.update(orderId, {
        status: "pago",
      });

      return;
    }

    throw new Error("Status inválido");
  }
}

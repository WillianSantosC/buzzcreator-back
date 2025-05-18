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

  // Cria um novo pedido com status pendente e calcula o total com base nos preços atuais dos livros
  async create({ itens, cliente }: CreateOrderInput): Promise<Order> {
    // Busca todos os livros relacionados aos itens do pedido
    const books = await Promise.all(
      itens.map((item) => this.bookRepo.findOne(item.bookId)),
    );

    // Calcula o total do pedido com base nos preços e quantidades
    let total = 0;
    books.forEach((book, index) => {
      const item = itens[index];
      if (!book) throw new Error(`Livro ${item.bookId} não encontrado.`);
      total += book.preco * item.quantidade;
    });

    // Prepara os dados de associação dos itens do pedido
    const orderItemsData = itens.map((item) => ({
      book: { connect: { id: item.bookId } },
      quantidade: item.quantidade,
    }));

    // Cria o pedido no repositório
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

  // Atualiza o status de um pedido, realizando validações e ajustes no estoque se necessário
  async updateStatus(
    orderId: number,
    status: "pago" | "cancelado",
  ): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Pedido não encontrado");

    // Caso o status seja pago ou cancelado, lança uma exceção
    if (order.status === "pago" || order.status === "cancelado") {
      throw new Error("Pedido ja foi pago ou cancelado");
    }

    // Caso o status seja cancelado, apenas atualiza o status da ordem
    if (status === "cancelado") {
      await this.orderRepo.update(orderId, { status });
      return;
    }

    if (status === "pago") {
      // Busca os livros envolvidos no pedido
      const books = await Promise.all(
        order.itens.map((item) => this.bookRepo.findOne(item.bookId)),
      );

      // Valida se há estoque suficiente para cada item
      books.forEach((book, index) => {
        const item = order.itens[index];
        if (!book || book.estoque < item.quantidade) {
          throw new Error(`Livro ${item.bookId} sem estoque suficiente.`);
        }
      });

      // Atualiza o estoque dos livros
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

      // Atualiza o status do pedido para pago
      await this.orderRepo.update(orderId, {
        status: "pago",
      });

      return;
    }

    throw new Error("Status inválido");
  }
}

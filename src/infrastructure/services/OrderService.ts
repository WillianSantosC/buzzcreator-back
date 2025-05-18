import { Prisma } from "@prisma/client";
import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { prisma } from "../database/client";

export class OrderService implements OrderRepository {
  async findAll(): Promise<Order[]> {
    return await prisma.order.findMany({
      include: {
        itens: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        itens: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return await prisma.order.create({
      data,
      include: {
        itens: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async update(id: number, data: Pick<Order, "status">): Promise<void> {
    await prisma.order.update({
      where: { id },
      data,
    });
  }
}

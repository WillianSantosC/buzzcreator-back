import { Prisma } from "@prisma/client";
import { Order } from "../../domain/entities/Order";

export interface OrderRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  update(id: number, data: Pick<Order, "status">): Promise<void>;
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
}

import { Prisma } from "@prisma/client";
import { Order } from "../../domain/entities/Order";

export interface OrderRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  findAll(): Promise<Order[]>;
}

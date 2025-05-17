export interface OrderItem {
  bookId: number;
  quantity: number;
}

export interface Order {
  id: number;
  itens: OrderItem[];
  total: number;
  data: Date;
  status: "pendente" | "pago" | "cancelado";
  cliente: string;
}

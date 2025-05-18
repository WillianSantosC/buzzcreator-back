export interface OrderItem {
  bookId: number;
  quantidade: number;
}

export interface Order {
  id: number;
  itens: OrderItem[];
  total: number;
  data: Date;
  status: "pendente" | "pago" | "cancelado";
  cliente: string;
}

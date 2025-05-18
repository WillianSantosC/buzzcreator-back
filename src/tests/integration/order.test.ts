import request from "supertest";
import app from "../../app";

let token = "";
let bookId = "";

beforeAll(async () => {
  const auth = await request(app).post("/admin/login").send({
    username: "admin",
    password: "admin123",
  });
  token = auth.body.token;

  const res = await request(app)
    .post("/book")
    .set("Authorization", `Bearer ${token}`)
    .send({
      titulo: "Domain-Driven Design",
      autor: "Eric Evans",
      descricao: "Strategic design and modeling",
      preco: 120,
      imagem: "https://example.com/image.png",
      estoque: 10,
    });

  bookId = res.body.id;
});

describe("Order routes", () => {
  let orderId: number;

  it("should create a new order (status pending)", async () => {
    const res = await request(app)
      .post("/order")
      .send({
        cliente: "John Doe",
        itens: [{ bookId, quantidade: 2 }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.cliente).toBe("John Doe");
    orderId = res.body.id;
  });

  it("should list all orders", async () => {
    const res = await request(app).get("/order");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update order status to paid", async () => {
    const res = await request(app)
      .put(`/order/${orderId}`)
      .send({ status: "pago" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Order updated");
  });

  it("should give an error when trying to update a paid or canceled order", async () => {
    const res = await request(app)
      .put(`/order/${orderId}`)
      .send({ status: "cancelado" });

    console.log("BODY =====>>>", res.body);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Pedido ja foi pago ou cancelado");
  });
});

import request from "supertest";
import app from "../../app";

let token = "";

beforeAll(async () => {
  const res = await request(app).post("/admin/login").send({
    username: "admin",
    password: "admin123",
  });

  token = res.body.token;
});

describe("Book routes", () => {
  let createdBookId: number;

  it("should create a book", async () => {
    const res = await request(app)
      .post("/book")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Clean Code",
        autor: "Robert Martin",
        descricao: "A handbook of agile software craftsmanship",
        preco: 99,
        imagem: "https://example.com/image.png",
        estoque: 10,
      });

    expect(res.statusCode).toBe(201);
    createdBookId = res.body.id;
  });

  it("should list books", async () => {
    const res = await request(app).get("/book");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a book", async () => {
    const res = await request(app)
      .patch(`/book/${createdBookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ estoque: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body.estoque).toBe(15);
  });

  it("should delete a book", async () => {
    const res = await request(app)
      .delete(`/book/${createdBookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});

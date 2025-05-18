import request from "supertest";
import app from "../../app";

describe("Auth routes", () => {
  it("should login with correct credentials", async () => {
    const res = await request(app).post("/admin/login").send({
      username: "admin",
      password: "admin123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail login with invalid credentials", async () => {
    const res = await request(app).post("/admin/login").send({
      username: "admin",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

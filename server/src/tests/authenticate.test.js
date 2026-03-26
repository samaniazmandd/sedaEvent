import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../index.js";
import { initializeAdmin, initializeUser } from "../db/initializeUsers.js";

beforeAll(async () => {
  await initializeAdmin(process.env.ADMIN_EMAIL_FORTEST,process.env.ADMIN_PASSWORD_FORTEST);
  await initializeUser(process.env.USER_EMAIL_FORTEST,process.env.USER_PASSWORD_FORTEST);
});

describe("Auth routes ", () => {
  describe("POST /auth/login", () => {
    it("returns 200 and token when admin logs in correctly", async () => {
      const res = await request(app).post("/auth/login").send({
        email: process.env.ADMIN_EMAIL_FORTEST,
        password: process.env.ADMIN_PASSWORD_FORTEST,
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toBe("string");
    });

    it("returns 200 and token when usetr logs in correctly", async () => {
      const res = await request(app).post("/auth/login").send({
        email: process.env.USER_EMAIL_FORTEST,
        password: process.env.USER_PASSWORD_FORTEST,
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toBe("string");
    });

    it("returns 401 when login with invalid email/password ", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "invalid@gmail.com",
        password: "invalidpassword",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("POST /auth/signup", () => {
    it("returns 201 and user info when signup fields are all filled ", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({
          email: `testmail${Date.now()}@gmail.com`,
          password: "testtest",
          mobile_phone: "0612345678",
          city: "Deventer",
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user).toHaveProperty("mobile_phone");
      expect(res.body.user).toHaveProperty("city");
      expect(res.body.user).toHaveProperty("isAdmin");
    });
    it("returns 400 when signup with invalid/ empty fields ", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: "test@gmail.com",
        city: "Deventer",
      });
      expect(res.status).toBe(400);
    });
    it("returns 409 when email already exists ", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: process.env.USER_EMAIL_FORTEST,
        password: process.env.USER_PASSWORD_FORTEST,
        mobile_phone: "0612345678",
        city: "Deventer",
      });
      expect(res.status).toBe(409);
    });
  });
});

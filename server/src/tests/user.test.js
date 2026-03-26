import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../index.js";

import { initializeAdmin, initializeUser } from "../db/initializeUsers.js";

let adminToken;
let userToken;

beforeAll(async () => {
  await initializeAdmin(
    process.env.ADMIN_EMAIL_FORTEST,
    process.env.ADMIN_PASSWORD_FORTEST
  );
  await initializeUser(
    process.env.USER_EMAIL_FORTEST,
    process.env.USER_PASSWORD_FORTEST
  );

  const res = await request(app).post("/auth/login").send({
    email: process.env.ADMIN_EMAIL_FORTEST,
    password: process.env.ADMIN_PASSWORD_FORTEST,
  });

  expect(res.status).toBe(200);
  adminToken = res.body.token;

  const resUser = await request(app).post("/auth/login").send({
    email: process.env.USER_EMAIL_FORTEST,
    password: process.env.USER_PASSWORD_FORTEST,
  });
  expect(resUser.status).toBe(200);
  userToken = resUser.body.token;
});

describe("User routes", () => {
  describe("GET /user/users", () => {
    it("returns 200 and a list of users", async () => {
      const res = await request(app)
        .get("/user/users")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
    it("returns 401 when no token/logged in", async () => {
      const res = await request(app).get("/user/users");

      expect(res.status).toBe(401);
    });
    it("returns 403 when a normal user tries to get all users list", async () => {
      const res = await request(app)
        .get("/user/users")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });
  describe("GET /user/:email", () => {
    it("return 200 when admins tries to get a user by email which works as username exclude pasword ", async () => {
      const res = await request(app)
        .get(`/user/${process.env.USER_EMAIL_FORTEST}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);

      expect(res.body).toHaveProperty("email", process.env.USER_EMAIL_FORTEST);
      expect(res.body).toHaveProperty("id");
      expect(res.body).not.toHaveProperty("password");
    });
  });

  it("returns 404 if user is not found", async () => {
    const res = await request(app)
      .get(`/user/${"testnonexistuser@gmail.com"}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
  });

  it("returns 401 when no token or not logged in", async () => {
    const res = await request(app).get(
      `/user/${process.env.USER_EMAIL_FORTEST}`
    );

    expect(res.status).toBe(401);
  });

  it("returns 403 when a normal user tries to get user by email", async () => {
    const res = await request(app)
      .get("/user/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
  describe("DELETE /user/:id", () => {
    it("returns 200 when admin deletes one user by its user id", async () => {
      const dateOfNow = Date.now();

      const resCreateUser = await request(app)
        .post("/auth/signup")
        .send({
          email: `testTodelete${dateOfNow}@gmail.com`,
          password: `testuser${dateOfNow}`,
          mobile_phone: "0611111111",
          city: "Amsterdam",
        });

      expect(resCreateUser.status).toBe(201);

      const fetchUserId = await request(app)
        .get(`/user/testTodelete${dateOfNow}@gmail.com`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(fetchUserId.status).toBe(200);

      const payload = Array.isArray(fetchUserId.body?.users)
        ? fetchUserId.body.users[0]
        : fetchUserId.body;

      expect(payload).toHaveProperty("id");

      const userId = payload.id;

      const res = await request(app)
        .delete(`/user/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });
});

import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../index.js";
import { initializeAdmin } from "../db/initializeUsers.js";

let adminToken;
let eventId;

beforeAll(async () => {
  await initializeAdmin(process.env.ADMIN_EMAIL_FORTEST,process.env.ADMIN_PASSWORD_FORTEST);


  
  const res = await request(app).post("/auth/login").send({
    email: process.env.ADMIN_EMAIL_FORTEST,
    password: process.env.ADMIN_PASSWORD_FORTEST,
  });

  expect(res.status).toBe(200);
  adminToken = res.body.token;
});

describe("Event routes", () => {
  describe("POST /event", () => {
    it("returns 201 when event is succesfully created", async () => {
      const res = await request(app)
        .post("/event")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          title: "Test event",
          date: "2026/12/03",
          time: "19:00:00",
          price: 400,
          img: "imageaddress.jpg",
          maxReservations: 100,
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("title", "Test event");
      eventId = res.body.id;
    });

    it("returns 401 when no token (user is not logged in)", async () => {
      const res = await request(app).post("/event").send({
        title: "Test event without token",
        date: "2026/12/06",
        time: "19:00:00",
        price: 400,
        img: "imageaddress1.jpg",
        maxReservations: 100,
      });

      expect(res.status).toBe(401);
    });

    it("returns 401 when invalid input ", async () => {
      const res = await request(app).post("/event").send({
        title: "Test event without token",
        date: "2026/12/06",
        time: "19:00:00",
        price: -100,
        img: "imageaddress1.jpg",
        maxReservations: 100,
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /event", () => {
    it("returns 200 and list of events when get ", async () => {
      const res = await request(app).get("/event");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    describe("GET /event/:id", () => {
      it("returns 200 and event by id ", async () => {
        const res = await request(app).get(`/event/${eventId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", eventId);
      });
    });

    describe("PUT /event/:id", () => {
      it("returns 200 when updateing ", async () => {
        const res = await request(app)
          .put(`/event/${eventId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            title: "Updated event",
            date: "2026/12/04",
            time: "19:00:00",
            price: 400,
            maxReservations: 20000,
          });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("title", "Updated event");
      });
      it("returns 400 when updateing without required fields ", async () => {
        const res = await request(app)
          .put(`/event/${eventId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            title: "invalid event",
            date: "2026/12/04",
            price: 4,
            maxReservations: 20000,
          });

        expect(res.status).toBe(400);
      });
    });

    describe("GET /event/available", () => {
      it("returns 200 and list of all available eventss ", async () => {
        const res = await request(app).get("/event/available");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
    });
    describe("DELETE /event/:id", () => {
      it("returns 204 when deleted succesfully ", async () => {
        const res = await request(app)
          .delete(`/event/${eventId}`)
          .set("Authorization", `Bearer ${adminToken}`);

        expect(res.status).toBe(204);
      });
    });

    describe("DELETE /event", () => {
      it("returns 204 when deleted all events succesfully, if no events return 400 ", async () => {
        const res = await request(app)
          .delete("/event")
          .set("Authorization", `Bearer ${adminToken}`);

        expect([204, 400]).toContain(res.status);
      });
    });
  });
});

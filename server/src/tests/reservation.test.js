import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../index.js";
import { initializeUser, initializeAdmin } from "../db/initializeUsers.js";


let adminToken;
let eventId;
let userToken;
let reservationId;

beforeAll(async () => {
  await initializeUser(
    process.env.USER_EMAIL_FORTEST,
    process.env.USER_PASSWORD_FORTEST
  );
  await initializeAdmin(
    process.env.ADMIN_EMAIL_FORTEST,
    process.env.ADMIN_PASSWORD_FORTEST
  );

  const resLoginAdmin = await request(app).post("/auth/login").send({
    email: process.env.ADMIN_EMAIL_FORTEST,
    password: process.env.ADMIN_PASSWORD_FORTEST,
  });

  expect(resLoginAdmin.status).toBe(200);
  adminToken = resLoginAdmin.body.token;

  const resEvent = await request(app)
    .post("/event")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      title: "Test Event for Reservations",
      date: "2026/12/01",
      time: "19:00:00",
      price: 500,
      img: "imgaddress.jpg",
      maxReservations: 5,
    });

  expect(resEvent.status).toBe(201);
  eventId = resEvent.body.id;

  const resLoginUser = await request(app).post("/auth/login").send({
    email: process.env.USER_EMAIL_FORTEST,
    password: process.env.USER_PASSWORD_FORTEST,
  });

  expect(resLoginUser.status).toBe(200);
  userToken = resLoginUser.body.token;
});

describe("Reservation routes", () => {
  describe("POST /reservation", () => {
    it("returns 201 when reservation is succesfully created", async () => {
      const res = await request(app)
        .post("/reservation")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          eventId,
          amountOfSeats: 2,
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("eventId", eventId);
      reservationId = res.body.id;
    });
    it("returns 401 when no token or not logged in", async () => {
      const res = await request(app).post("/reservation").send({
        eventId,
        amountOfSeats: 4,
      });

      expect(res.status).toBe(401);
    });

    it("returns 400 when event is not founded", async () => {
      const res = await request(app)
        .post("/reservation")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          eventId: 344775,
          amountOfSeats: 4,
        });

      expect(res.status).toBe(400);
    });
    it("returns 400 when not neough places are available", async () => {
      const res = await request(app)
        .post("/reservation")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          eventId: eventId,
          amountOfSeats: 10,
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /reservation/active", () => {
    it("returns 200 and all active reservation when with token)", async () => {
      const res = await request(app)
        .get("/reservation/active")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("returns 401 when there is no token so not logged in", async () => {
      const res = await request(app).get("/reservation/active");
      expect(res.status).toBe(401);
    });
  });

  describe("PATCH /reservation/:id/cancel", () => {
    it("returns 200 when owner cancels before 24h left", async () => {
      const res = await request(app)
        .patch(`/reservation/${reservationId}/cancel`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("isActive", false);
    });

    it("returns 400 when cancelling a reservation which was already cancelled", async () => {
      const res = await request(app)
        .patch(`/reservation/${reservationId}/cancel`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).toBe(400);
    });
  });
});

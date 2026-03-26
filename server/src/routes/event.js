import express from "express";
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  deleteEventByIdController,
  deleteAllEventsController,
  updateEventByIdController,
  getAllEventsThatCanbeReservedController,
} from "../controllers/event.controller.js";

import { eventCheck, idCheck } from "../middleware/validators.js";
import { isAdmin, authenticateToken } from "../middleware/authenticate.js";

const router = express.Router();
/**
 * @openapi
 * /event:
 *   post:
 *     summary: Create new event
 *     description: Creates a new event in the database and returns it.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, date, time, price, maxReservations]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first event"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025/12/06"
 *               time:
 *                 type: string
 *                 example: "18:00:00"
 *               price:
 *                 type: integer
 *                 minimum: 0
 *                 example: 30
 *               img:
 *                 type: string
 *                 example: "poster.jpg"
 *               maxReservations:
 *                 type: integer
 *                 minimum: 0
 *                 example: 50
 *     responses:
 *       201:
 *         description: Event is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "My first event"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025/12/06"
 *                 time:
 *                   type: string
 *                   example: "18:00:00"
 *                 price:
 *                   type: integer
 *                   minimum: 0
 *                   example: 30
 *                 img:
 *                   type: string
 *                   example: "poster.jpg"
 *                 maxReservations:
 *                   type: integer
 *                   minimum: 0
 *                   example: 50
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Title is mandatory"
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin"
 */

router.post("/", authenticateToken, isAdmin, eventCheck, createEventController);

/**
 * @openapi
 * /event:
 *   get:
 *     summary: list of all events
 *     description: Returns list of events.
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [id, title, date, time, price, maxReservations]
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "My first event"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-06"
 *                   time:
 *                     type: string
 *                     example: "18:00:00"
 *                   price:
 *                     type: integer
 *                     minimum: 0
 *                     example: 30
 *                   img:
 *                     type: string
 *                     nullable: true
 *                     example: "poster.jpg"
 *                   maxReservations:
 *                     type: integer
 *                     minimum: 0
 *                     example: 50
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get("/", getAllEventsController);

/**
 * @openapi
 * /event/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     description: Deletes a single event by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID (positive integer)
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       204: { description: Deleted (no content) }
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "id must be positive number"
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event not found"
 */
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  idCheck,
  deleteEventByIdController
);

/**
 * @openapi
 * /event:
 *   delete:
 *     summary: delete all events
 *     description: Removes all events from database and returns how many events where delted
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin"
 */

router.delete("/", authenticateToken, isAdmin, deleteAllEventsController);

/**
 * @openapi
 * /event/{id}:
 *   put:
 *     summary: Update event
 *     description: Updates event in the database and returns it.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID (positive integer)
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, date, time]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first event"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025/12/06"
 *               time:
 *                 type: string
 *                 example: "18:00:00"
 *               price:
 *                 type: integer
 *                 minimum: 0
 *                 example: 30
 *               img:
 *                 type: string
 *                 example: "poster.jpg"
 *               maxReservations:
 *                 type: integer
 *                 minimum: 0
 *                 example: 50
 *     responses:
 *       200:
 *         description: Event is succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "My first event"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025/12/06"
 *                 time:
 *                   type: string
 *                   example: "18:00:00"
 *                 price:
 *                   type: integer
 *                   minimum: 0
 *                   example: 30
 *                 img:
 *                   type: string
 *                   example: "poster.jpg"
 *                 maxReservations:
 *                   type: integer
 *                   minimum: 0
 *                   example: 50
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Full teh required fields , don't forget id must be positive number"
 *       401:
 *         description: Invalid login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not the admin"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event not found"
 */

router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  idCheck,
  eventCheck,
  updateEventByIdController
);

/**
 * @openapi
 * /event/available:
 *   get:
 *     summary: Get all events that still have available seats
 *     description: returns a list of events that still can be reserevd
 *     responses:
 *       200:
 *         description: List of available events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [id, title, date, time, price, remaining]
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "My first event"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025/12/06"
 *                   time:
 *                     type: string
 *                     example: "18:00:00"
 *                   price:
 *                     type: integer
 *                     minimum: 0
 *                     example: 30
 *                   img:
 *                     type: string
 *                     example: "poster.jpg"
 *                   maxReservations:
 *                     type: integer
 *                     minimum: 0
 *                     example: 50
 *                   remaining:
 *                      type: integer
 *                      minimum: 0
 *                      example: 17
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/available", getAllEventsThatCanbeReservedController);

/**
 * @openapi
 * /event/{id}:
 *   get:
 *     summary: Get event by ID
 *     description: Returns a single event for the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID (positive integer)
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *        200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [id, title, date, time, price, maxReservations]
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "My first event"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-06"
 *                 time:
 *                   type: string
 *                   example: "18:00:00"
 *                 price:
 *                   type: integer
 *                   minimum: 0
 *                   example: 30
 *                 img:
 *                   type: string
 *                   nullable: true
 *                   example: "poster.jpg"
 *                 maxReservations:
 *                   type: integer
 *                   minimum: 0
 *                   example: 50
 *                 _links:
 *                   type: object
 *                   description: HATEOAS links 
 *                   properties:
 *                     self:
 *                       type: object
 *                       properties:
 *                         href: { type: string, example: "/event/1" }
 *                         method: { type: string, example: "GET" }
 *                     update:
 *                       type: object
 *                       properties:
 *                         href: { type: string, example: "/event/1" }
 *                         method: { type: string, example: "PUT" }
 *                     delete:
 *                       type: object
 *                       properties:
 *                         href: { type: string, example: "/event/1" }
 *                         method: { type: string, example: "DELETE" }
 *                     allEvents:
 *                       type: object
 *                       properties:
 *                         href: { type: string, example: "/event" }
 *                         method: { type: string, example: "GET" }
 *        400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "id must be positive number"
 *        404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "event not found"
 */

router.get("/:id", idCheck, getEventByIdController);

export default router;

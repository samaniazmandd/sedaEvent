import express from "express";
import {
  getAllActiveReservationsController,
  createReservationController,
  cancelReservationController,
} from "../controllers/reservation.controller.js";


import { authenticateToken } from "../middleware/authenticate.js";

const router = express.Router();


/**
 * @openapi
 * /reservation:
 *   post:
 *     summary: Create reservation
 *     description: Creates a new reservation in the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId, amountOfSeats]
 *             properties:
 *               eventId:
 *                 type: integer
 *                 example: 3
 *               amountOfSeats:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       201:
 *         description: Reservation is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [id, eventId, amountOfSeats, isActive]
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 20
 *                 eventId:
 *                   type: integer
 *                   example: 3
 *                 amountOfSeats:
 *                   type: integer
 *                   example: 2
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         description: Not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not logged in"
 *       404:
 *         description: event unfound
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event not found"
 *       409:
 *         description: event is full
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not enough places available to reserve"
 */
router.post("/", authenticateToken, createReservationController);


/**
 * @openapi
 * /reservation/active:
 *   get:
 *     summary: gett all active reservations
 *     description: Creates a new reservation in the database
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [id, userId, eventId, amountOfSeats, isActive]
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 20
 *                   userId:
 *                     type: integer
 *                     example: 5
 *                   eventId:
 *                     type: integer
 *                     example: 3
 *                   amountOfSeats:
 *                     type: integer
 *                     example: 2
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *       400:
 *         description: something wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong"
 *       401:
 *         description: not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user is not logged in "
 */

router.get("/active",authenticateToken,getAllActiveReservationsController)




/**
 * @openapi
 * /reservation/{id}/cancel:
 *   patch:
 *     summary: Cancel reservation
 *     description: Cancel a reservation (only if more than 24 hours is left)
 *     security:
 *       - bearerAuth: []
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reservation ID (positive integer)
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Cancelled reservation
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 required: [id, userId, eventId, amountOfSeats, isActive]
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 20
 *                   userId:
 *                     type: integer
 *                     example: 5
 *                   eventId:
 *                     type: integer
 *                     example: 3
 *                   amountOfSeats:
 *                     type: integer
 *                     example: 2
 *                   isActive:
 *                     type: boolean
 *                     example: false
 *       400:
 *         description: something went worng with cancellation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "reservation is already cancelled / too late to cancel this reservation"
 *       401:
 *         description: not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user is not logged in"
 *       403:
 *         description: forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "you can only cancel your own reservation"
 *       404:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Reservation not found"
 */

router.patch("/:id/cancel",authenticateToken,cancelReservationController)


export default router;

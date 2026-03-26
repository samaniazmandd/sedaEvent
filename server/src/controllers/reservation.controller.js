import {
  getAllActiveReservations,
  createReservation,
  cancelReservation,
} from "../db/Reservation.js";



async function getAllActiveReservationsController(req, res) {
  try {
    const reservations = await getAllActiveReservations();
    return res.status(200).json(reservations);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function createReservationController(req, res) {
  try {
    const { eventId, amountOfSeats } = req.body;
    const userId = req.user.subject;
    

    if (!userId || !eventId || !amountOfSeats) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const reservation = await createReservation({
      userId,
      eventId: Number(eventId),
      amountOfSeats: Number(amountOfSeats),
    });

    return res.status(201).json(reservation);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function cancelReservationController(req, res) {
  try {
    const reservationId = req.params.id;
    const userId = req.user.subject;

    if (!reservationId) {
      return res.status(400).json({
        error: "Reservation id is required",
      });
    }

    const cancelled = await cancelReservation(reservationId, userId);
    return res.status(200).json(cancelled);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

export {
  getAllActiveReservationsController,
  createReservationController,
  cancelReservationController,
};

import {
  getAllEventsThatCanbeReserved,
  Reservation,
} from "../db/Reservation.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  deleteAllEvents,
  updateEventById,
} from "../db/Event.js";
import { sequelize } from "../db/sequelize.js";
import { Event } from "../db/Event.js";

async function createEventController(req, res) {
  try {
    const { title, date, time, price, img, maxReservations } = req.body;

    const newEvent = await createEvent({
      title,
      date,
      time,
      price,
      img: img ?? null,
      maxReservations,
    });

    res.status(201).json(newEvent);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function getAllEventsController(req, res) {
  try {
    const event = await getAllEvents();
    return res.status(200).json(event);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}
/////////////////////////////////
async function getEventByIdController(req, res) {
  try {
    const id = Number(req.params.id);
    const event = await getEventById(id);
   //https://medium.com/@shubhadeepchat/implementing-hateoas-in-rest-apis-b83e4e285582
    return res.status(200).json({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      price: event.price,
      img: event.img,
      maxReservations: event.maxReservations,
      _links: {
        self: { href: `/event/${event.id}`, method: "GET" },
        update: { href: `/event/${event.id}`, method: "PUT" },
        delete: { href: `/event/${event.id}`, method: "DELETE" },
        allEvents: { href: "/event", method: "GET" },
      },
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

/////////////////////////////////

async function deleteEventByIdController(req, res) {
  try {
    const id = Number(req.params.id);

    await deleteEventById(id);
    return res.sendStatus(204);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function deleteAllEventsController(req, res) {
  try {
    await sequelize.transaction(async (t) => {
      await Reservation.destroy({ where: {}, transaction: t });
      await Event.destroy({ where: {}, transaction: t });
    });

    await deleteAllEvents();

    return res.sendStatus(204);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function updateEventByIdController(req, res) {
  try {
    const id = Number(req.params.id);

    const updatedEvent = await updateEventById(id, req.body);

    return res.status(200).json(updatedEvent);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function getAllEventsThatCanbeReservedController(req, res) {
  try {
    const reservableItems = await getAllEventsThatCanbeReserved();
    return res.status(200).json(reservableItems);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

export {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  deleteEventByIdController,
  deleteAllEventsController,
  updateEventByIdController,
  getAllEventsThatCanbeReservedController,
};

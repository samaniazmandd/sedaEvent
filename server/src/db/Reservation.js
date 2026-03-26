import { sequelize } from "./sequelize.js";
import {  DataTypes, Model } from "sequelize";
import { Event } from "./Event.js";
class Reservation extends Model {}
Reservation.init(
  {
    ///pk
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //fk to user
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //fk to event
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amountOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "reservation",
    tableName: "reservation",
  }
);


async function getAllActiveReservations() {
  const reservations = await Reservation.findAll({
    where: { isActive: true },
  });

  return reservations;
}

async function createReservation(data) {
  const event = await Event.findByPk(data.eventId);
 

  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  const activeReservationForEvent = await Reservation.findAll({
    where: { eventId: data.eventId, isActive: true },
    attributes: ["amountOfSeats"],
  });

  //hint from this site
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const totalReservedSeats = activeReservationForEvent.reduce(
    (sum, reservation) => sum + reservation.amountOfSeats,
    0
  );

  if (totalReservedSeats + data.amountOfSeats > event.maxReservations) {
    const errorr = new Error("NOt enough places available to reserve");
    errorr.status = 409;
    throw errorr;
  }

  const newReservation = await Reservation.create({
    userId: data.userId,
    eventId: data.eventId,
    amountOfSeats: data.amountOfSeats,
    isActive: true,
  });

  return newReservation;
}

function ableToCancel(event) {
  const startDateAndTime = new Date(`${event.date}T${event.time}`).getTime();

  const hoursleft = startDateAndTime - Date.now();
  const hours = 1000 * 60 * 60;

  return hoursleft >= 24 * hours;
}

async function cancelReservation(id, userId) {
  const reservation = await Reservation.findByPk(id, {
    include: [{ model: Event }],
  });

  if (!reservation) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }

  if (!reservation.isActive) {
    const error = new Error("Reservation is already cancelled");
    error.status = 400;
    throw error;
  }

  if (reservation.userId !== userId) {
    const error = new Error("you can only cancel your own reservation");
    error.status = 403;
    throw error;
  }

  if (!ableToCancel(reservation.event)) {
    const error = new Error("Too late too cancel, there is only 24 hours left");
    error.status = 400;
    throw error;
  }

  await reservation.update({ isActive: false });
  return reservation;
}

async function getAllEventsThatCanbeReserved() {
  const allEvents = await Event.findAll();

  const availableEventsList = [];

  for (const event of allEvents) {
    const activeReservationForEvent = await Reservation.findAll({
      where: { eventId: event.id, isActive: true },
      attributes: ["amountOfSeats"],
    });

    let totalReserved = 0;
    for (const reservation of activeReservationForEvent) {
      totalReserved += reservation.amountOfSeats;
    }

    const remaining = event.maxReservations - totalReserved;

    if (remaining > 0) {
      availableEventsList.push({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        price: event.price,
        img: event.img,
        maxReservations: event.maxReservations,
        remaining: remaining,
      });
    }
  }

  return availableEventsList;
}



export {
  getAllActiveReservations,
  createReservation,
  cancelReservation,
  getAllEventsThatCanbeReserved,
  Reservation
};

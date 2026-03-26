import { sequelize } from "./sequelize.js";
import { DataTypes, Model } from "sequelize";

// TODO create your tables here, see https://sequelize.org/docs/v6/core-concepts/model-basics/#model-definition

class Event extends Model {}
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    maxReservations: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
      validate: { min: 0 },
    },
  },
  {
    sequelize,
    modelName: "event",
    tableName: "event",
  }
);

// TODO export your own functions here, which you can use in your controllers
async function createEvent(data) {
  const event = await Event.create({
    title: data.title,
    date: data.date,
    time: data.time,
    price: data.price,
    img: data.img ?? null,
    maxReservations: data.maxReservations,
  });
  return event;
}

async function getAllEvents() {
  return await Event.findAll();
}

async function getEventById(id) {
  const event = await Event.findByPk(id);
  if (!event) {
    const err = new Error("event not found");
    err.status = 404;
    throw err;
  }
  return event;
}

async function deleteEventById(id) {
  // got my hints from this website
  // https://parvez1487.medium.com/delete-your-table-data-by-id-using-sequelize-8bcad27aa7c6
  const event = await Event.destroy({
    where: { id },
  });
  if (!event) {
    const err = new Error("event not found");
    err.status = 404;
    throw err;
  }
}

async function deleteAllEvents() {
  await Event.destroy({
    where: {},
  });
}

async function updateEventById(id, data) {
  const oldEvent = await Event.findByPk(id);
  if (!oldEvent) {
    const err = new Error("event not found");
    err.status = 404;
    throw err;
  }
  const newEvent = await oldEvent.update({
    title: data.title,
    date: data.date,
    time: data.time,
    price: data.price,
    img: data.img ?? null,
    maxReservations: data.maxReservations,
  });
  return newEvent;
}

export {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  deleteAllEvents,
  updateEventById,
  Event,
};

import { User } from "./User.js";
import { Reservation } from "./Reservation.js";
import { Event } from "./Event.js";

User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });
//when admin deltes event then delete all reservations that belongs to that event
Event.hasMany(Reservation, { foreignKey: "eventId", onDelete: "CASCADE" });
Reservation.belongsTo(Event, { foreignKey: "eventId", onDelete: "CASCADE" });

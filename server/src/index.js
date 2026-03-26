import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger-config.js";

import eventRouter from "./routes/event.js";
import authenticateRouter from "./routes/authenticate.js";
import reservationRouter from "./routes/reservation.js";
import userRouter from "./routes/user.js";

import { sequelize } from "./db/sequelize.js";
import "./db/Event.js";
import "./db/User.js";
import "./db/Reservation.js";
import "./db/relations.js";

import { initializeAdmin, initializeUser } from "./db/initializeUsers.js";

// Check if NODE_ENV environment variable is set, otherwise go to development mode
const nodeEnv = process.env.NODE_ENV;
const app = express();
const port = process.env.PORT;
``;

try {
  await sequelize.authenticate();
  console.log("Connected to db");
  await sequelize.sync({ alter: true });
  console.log("Synced ");

  // //here I initialize admin so they can easilyy login
  await initializeAdmin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  //here I initialize one user for testing without neeidng to signup
  await initializeUser(process.env.USER_EMAIL, process.env.USER_PASSWORD);
} catch (e) {
  console.error(e.message);
}

// Set up basic JSON parsing and CORS headers
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: false,
  })
); // TODO make sure it blocks everything except localhost port 4173 and 5173 (default Svelte ports)

// Setup swagger and make it available on /api-docs.
//I added persistAuthorization to ae sure that swagger remember the entered JWT
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true },
  })
);

// TODO: setup your routers here, remove the one (and the exampleRouter code) below
app.use("/event", eventRouter);
app.use("/auth", authenticateRouter);
app.use("/reservation", reservationRouter);
app.use("/user", userRouter);

// Global error handler. In your code, throw an object with a status and message, and it will be caught here. We ignore one eslint call here, because next is needed.
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

// Setup server, by default on port 3000
app.listen(port, () => {
  // We allow this one console log here, because it helps us understand the server is actually running.
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
});

// Export app for testing purposes
export default app;

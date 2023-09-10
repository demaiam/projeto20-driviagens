import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { passengerInsertSchema } from "../schemas/passenger.schema.js";
import { insertPassenger } from "../controllers/passenger.controller.js";
import { findPassengersTravels } from "../controllers/travel.controller.js";

const passengersRouter = Router();

passengersRouter.post("/passenger", validateSchema(passengerInsertSchema), insertPassenger);
passengersRouter.get("/passenger/travels", findPassengersTravels);

export default passengersRouter;
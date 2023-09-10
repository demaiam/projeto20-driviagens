import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { passengerInsertSchema } from "../schemas/passenger.schema.js";
import { insertPassenger, findPassengersTravels } from "../controllers/passenger.controller.js";

const passengersRouter = Router();

passengersRouter.post("/passenger", validateSchema(passengerInsertSchema), insertPassenger);
passengersRouter.get("/passenger/travels", findPassengersTravels);

export default passengersRouter;
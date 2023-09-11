import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { passengerInsertSchema } from "../schemas/passenger.schema.js";
import { insertPassenger } from "../controllers/passenger.controller.js";

const passengersRouter = Router();

passengersRouter.post("/passengers", validateSchema(passengerInsertSchema), insertPassenger);

export default passengersRouter;
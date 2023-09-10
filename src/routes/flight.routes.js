import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { flightInsertSchema } from "../schemas/flight.schema.js";
import { insertFlight, findFlights, findFlightsByDestination } from "../controllers/flight.controller.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(flightInsertSchema), insertFlight);
flightsRouter.get("/flights", findFlights);
flightsRouter.get("/flights?terminal=:city", findFlightsByDestination);


export default flightsRouter;
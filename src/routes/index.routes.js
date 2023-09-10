import { Router } from "express";
import citiesRouter from "./city.routes.js";
import passengersRouter from "./passenger.routes.js";
import flightsRouter from "./flight.routes.js";
import travelsRouter from "./travel.routes.js";

const router = Router();

router.use(citiesRouter);
router.use(passengersRouter);
router.use(flightsRouter);
router.use(travelsRouter);

export default router;
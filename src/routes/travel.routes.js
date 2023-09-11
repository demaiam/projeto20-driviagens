import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { travelInsertSchema } from "../schemas/travel.schema.js";
import { insertTravel, findPassengersTravels } from "../controllers/travel.controller.js";

const travelsRouter = Router();

travelsRouter.post("/travels", validateSchema(travelInsertSchema), insertTravel);
travelsRouter.get("/passengers/travels", findPassengersTravels);

export default travelsRouter;
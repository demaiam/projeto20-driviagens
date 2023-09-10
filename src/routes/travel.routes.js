import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { travelInsertSchema } from "../schemas/travel.schema.js";
import { insertTravel } from "../controllers/travel.controller.js";

const travelsRouter = Router();

travelsRouter.post("/travel", validateSchema(travelInsertSchema), insertTravel);

export default travelsRouter;
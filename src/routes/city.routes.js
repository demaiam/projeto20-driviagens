import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { cityInsertSchema } from "../schemas/city.schema.js";
import { insertCity } from "../controllers/city.controller.js";

const citiesRouter = Router();

citiesRouter.post("/cities", validateSchema(cityInsertSchema), insertCity);

export default citiesRouter;
import { cityService } from "../services/city.service.js";
import httpStatus from "http-status";

export async function insertCity(req, res) {
  const city = req.body;

  await cityService.insertCity(city);

  res.sendStatus(httpStatus.CREATED);
}
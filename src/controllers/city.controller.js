import { cityRepository } from "../repositories/city.repository.js";
import { cityService } from "../services/city.service.js";
import httpStatus from "http-status";


export async function insertCity(req, res) {
  const city = req.body;

  try {
    await cityService.insertCity(city);

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
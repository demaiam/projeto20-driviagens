import { passengerRepository } from "../repositories/passenger.repository.js";
import httpStatus from "http-status";

export async function insertPassenger(req, res) {
  const passenger = req.body;

  await passengerRepository.insertPassenger(passenger);

  res.sendStatus(httpStatus.CREATED);
}
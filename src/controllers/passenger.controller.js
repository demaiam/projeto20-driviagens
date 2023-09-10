import passengerRepository from "../repositories/passenger.repository.js";
//import passengerService from "../services/passenger.service.js";
import httpStatus from "http-status";

export async function insertPassenger(req, res) {
  const passenger = req.body;

  try {
    await passengerRepository.insertPassenger(passenger);

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
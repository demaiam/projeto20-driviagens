import { travelRepository } from "../repositories/travelRepository.js";
import { passengerService } from "../services/passenger.service.js";
import { flightService } from "../services/flight.service.js";
import httpStatus from "http-status";

export async function insertTravel(req, res) {
  const travel = req.body;

  try {
    

    await travelRepository.insert({ ...travel });

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

import { flightService } from "../services/flight.service.js";
import httpStatus from "http-status";


export async function insertFlight(req, res) {
  const flight = req.body;

  try {
    await flightService.insertFlight(flight);

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
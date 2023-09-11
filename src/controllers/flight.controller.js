import { internalServerError } from "../errors/internal.server.error.js";
import { flightService } from "../services/flight.service.js";
import { formatFlight } from "../utils/dates.utils.js";
import httpStatus from "http-status";

export async function insertFlight(req, res) {
  const flight = req.body;

  await flightService.insertFlight(flight);

  res.sendStatus(httpStatus.CREATED);
}

export async function findFlights(req, res) {
  const query = req.query;

  const flights = await flightService.findFlights(query);
  if (flights.length > 10) throw internalServerError();

  res.status(httpStatus.OK).send(flights.map((flight) => formatFlight(flight)));
}
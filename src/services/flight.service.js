import { notFoundError } from "../errors/not.found.error.js";
import { conflictError } from "../errors/conflict.error.js";
import { unprocessableEntityError } from "../errors/unprocessable.entity.error.js";
import flightRepository from "../repositories/flight.repository.js";
import { compareDate } from "../utils/functions.utils.js";

async function insertFlight(flight) {
  const existingOriginCity = await cityRepository.findCityById(flight.origin);
  if (!existingOriginCity) throw notFoundError("Origin city");

  const existingDestinationCity = await cityRepository.findCityById(flight.destination);
  if (!existingDestinationCity) throw notFoundError("Destination city");

  if (existingOriginCity === existingDestinationCity) throw conflictError("City")

  const timeDifference = compareDate(flight.date);
  if (timeDifference) throw unprocessableEntityError("Time");

  return flightRepository.insertFlight(flight);
}

async function findFlightsByTerminal(terminal, city) {
  const searchCity = await findCityByName(city);

  return flightRepository.findFlightsByTerminal(terminal, searchCity.id);
}

const flightService = {
  insertFlight,
  findFlightsByTerminal
};

export default flightService;
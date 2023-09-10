import { conflictError } from "../errors/conflict.error.js";
import { notFoundError } from "../errors/not.found.error.js";
import flightRepository from "../repositories/flight.repository.js";

import passengerRepository from "../repositories/passenger.repository.js";

export async function insertTravel(travel) {
  const existingPassenger = await passengerRepository.findPassengerById(travel.passengerId);
  if (!existingPassenger) throw notFoundError("Passenger");

  const existingFlight = await flightRepository.findFlightById(travel.flightId);
  if (!existingFlight) throw notFoundError("Flight");

  if (existingPassenger === existingFlight) throw conflictError("Origin and destination");

  return travelRepository.insertTravel(travel);
}

const travelService = {
  insertTravel
};

export default travelService;
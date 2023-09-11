import { conflictError } from "../errors/conflict.error.js";
import { notFoundError } from "../errors/not.found.error.js";
import { travelRepository } from "../repositories/travel.repository.js";
import { flightRepository } from "../repositories/flight.repository.js";
import { passengerRepository } from "../repositories/passenger.repository.js";

export async function insertTravel(travel) {
  const existingPassenger = await passengerRepository.findPassengerById(travel.passengerId);
  if (!existingPassenger) throw notFoundError("Passenger");

  const existingFlight = await flightRepository.findFlightById(travel.flightId);
  if (!existingFlight) throw notFoundError("Flight");

  if (existingPassenger === existingFlight) throw conflictError("Origin and destination");

  return travelRepository.insertTravel(travel);
}

export async function findPassengersTravels(query) {
  let travels;
  if (query.name === undefined) {
    travels = await travelRepository.findPassengersTravels();
  }
  else {
    travels = await travelRepository.findPassengersTravelsByName(query.name);
  }
  return travels;
}

export const travelService = {
  insertTravel,
  findPassengersTravels
};
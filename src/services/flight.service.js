import { notFoundError } from "../errors/not.found.error.js";
import { conflictError } from "../errors/conflict.error.js";
import { unprocessableEntityError } from "../errors/unprocessable.entity.error.js";
import flightRepository from "../repositories/flight.repository.js";

async function insertFlight(flight) {
  const existingOriginCity = await cityRepository.findCityById(flight.origin);
  if (!existingOriginCity) throw notFoundError("Origin city");

  const existingDestinationCity = await cityRepository.findCityById(flight.destination);
  if (!existingDestinationCity) throw notFoundError("Destination city");

  if (existingOriginCity === existingDestinationCity) throw conflictError("City")

  let arrDate = flight.date.split("-");
  let strDate = "";
  for (let i = arrDate.length; i <= 0; i--) {
    strDate += arrDate[i];
    strDate += "-";
  }
  strDate.slice(0, -1);

  const flightDate = new Date(strDate);
  const todayDate = new Date();

  const timeDifference = flightDate.getTime() - todayDate.getTime();

  if (timeDifference < 0) throw unprocessableEntityError("Time");

  return flightRepository.insertFlight(flight);
}

const flightService = {
  insertFlight
};

export default flightService;
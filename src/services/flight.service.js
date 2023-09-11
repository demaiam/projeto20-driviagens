import { notFoundError } from "../errors/not.found.error.js";
import { conflictError } from "../errors/conflict.error.js";
import { unprocessableEntityError } from "../errors/unprocessable.entity.error.js";
import { flightRepository } from "../repositories/flight.repository.js";
import { cityRepository } from "../repositories/city.repository.js";
import { formatDate, formatDates } from "../utils/dates.utils.js";

async function insertFlight(flight) {
  if (flight.origin === flight.destination) throw conflictError("City");

  const existingOriginCity = await cityRepository.findCityById(flight.origin);
  if (!existingOriginCity) throw notFoundError("Origin city");

  const existingDestinationCity = await cityRepository.findCityById(flight.destination);
  if (!existingDestinationCity) throw notFoundError("Destination city");

  const timeDifference = formatDate(flight.date);
  if (timeDifference) throw unprocessableEntityError("Time");

  return flightRepository.insertFlight(flight);
}

async function findFlights(query) {
  const q1 = Object.keys(query)[0];
  const q2 = query[q1];
  const q3 = Object.keys(query)[1];
  const q4 = query[q3];
  const q5 = Object.keys(query)[2];
  const q6 = query[q5];
  let flights;
  if (q1 === undefined) {
    flights = await flightRepository.findFlights();
  }
  else if (q1 === "origin" || q1 === "destination") {
    flights = await flightService.findFlightsByTerminal(q1, q2);
  }
  else if (q1 === "smaller-date" && q3 === "bigger-date") {
    formatDates(q2, q4);

    flights = await flightService.findFlightsByDate(q2, q4);
  }
  else if (q1 === "smaller-date" && (q5 === "origin" || "destination")) {
    flights = await flightRepository.findFlightsByTerminalAndDate(q2, q4, q5, q6);
  }
  return flights;
}

async function findFlightsByTerminal(terminal, city) {
  const searchCity = await cityRepository.findCityByName(city);

  return flightRepository.findFlightsByTerminal(terminal, searchCity.id);
}

async function findFlightsByDate(smallerDate, biggerDate) {
  return flightRepository.findFlightsByDate(smallerDate, biggerDate);
}

export const flightService = {
  insertFlight,
  findFlights,
  findFlightsByTerminal,
  findFlightsByDate
};

/*
async function findFlights(query) {
  const q1 = Object.keys(query)[0];
  const q2 = query[q1];
  const q3 = Object.keys(query)[1];
  const q4 = query[q3];
  const q5 = Object.keys(query)[2];
  const q6 = query[q5];
  let flights;
  if (q1 === undefined) {
    flights = await flightRepository.findFlights();
  }
  else if (q1 === "origin" || q1 === "destination") {
    flights = await flightService.findFlightsByTerminal(q1, q2);
  }
  else if (q1 === "smaller-date" && q3 === "bigger-date") {
    flights = await flightService.findFlightsByDate(q2, q4);
  }
  else if (q1 === "smaller-date" && (q5 === "origin" || "destination")) {
    flights = await flightService.findFlightsByTerminalAndDate(q2, q4, q5, q6);
  }
  return flights;
}
*/
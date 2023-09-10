import flightRepository from "../repositories/flight.repository.js";
import flightService from "../services/flight.service.js";
import httpStatus from "http-status";

export async function insertFlight(req, res) {
  const flight = req.body;

  try {
    await flightService.insertFlight(flight);

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findFlights(req, res) {
  try {
    const flights = await flightRepository.getFlights();

    res.status(httpStatus.OK).send(flights);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findFlightsByOrigin(req, res) {
  const origin = req.query;

  try {
    const flights = await flightRepository.getFlightsByOrigin(origin);

    res.status(httpStatus.OK).send(flights);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findFlightsByDestination(req, res) {
  const destination = req.query;

  try {
    const flights = await flightRepository.findFlightsByDestination(destination);

    res.status(httpStatus.OK).send(flights);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
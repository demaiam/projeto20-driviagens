import travelService from "../services/travel.service.js";
import travelRepository from "../repositories/travel.repository.js";
import httpStatus from "http-status";

export async function insertTravel(req, res) {
  const travel = req.body;

  try {
    await travelService.insertTravel({ ...travel });

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findPassengersTravels(req, res) {
  try {
    await travelRepository.findPassengersTravels();

  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findTravelsByPassengerName(req, res) {
  try {
    await travelRepository.findTravelsByPassengerName();

  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
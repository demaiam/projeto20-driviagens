import { travelService } from "../services/travel.service.js";
import { internalServerError } from "../errors/internal.server.error.js";
import httpStatus from "http-status";

export async function insertTravel(req, res) {
  const travel = req.body;

  await travelService.insertTravel({ ...travel });

  res.sendStatus(httpStatus.CREATED);
}

export async function findPassengersTravels(req, res) {
  const query = req.query;

  const travels = await travelService.findPassengersTravels(query);
  if (travels.length > 10) throw internalServerError();

  res.status(httpStatus.OK).send(travels);
}
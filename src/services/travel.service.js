export async function insertTravel(travel) {
  const searchPassenger = await passengerService.findPassenger(travel.passengerId);
  if (!searchPassenger) return res.status(httpStatus.NOT_FOUND).send({ message: "Passenger not found" });

  const searchFlight = await flightService.findFlight(travel.flightId);
  if (!searchFlight) return res.status(httpStatus.NOT_FOUND).send({ message: "Flight not found" });

  if (searchPassenger === searchFlight) {
    return res.status(httpStatus.CONFLICT).send({ message: "Origin and destination cannot be the same" });
  }
}
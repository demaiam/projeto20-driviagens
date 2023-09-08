import passengerRepository from "../repositories/passenger.repository.js";

async function insertPassenger(passenger) {
  const existingPassenger = await passengerRepository.findPassenger(passenger);
  if (existingPassenger) throw conflictError("Passenger");

  return passengerRepository.insertPassenger(passenger);
}

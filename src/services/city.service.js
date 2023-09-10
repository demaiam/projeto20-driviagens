import { conflictError } from "../errors/conflict.error.js";
import cityRepository from "../repositories/city.repository.js";

async function insertCity(city) {
  const existingCity = await cityRepository.findCityByName(city.name);
  if (existingCity) throw conflictError("City");

  return cityRepository.insertCity(city);
}

const cityService = {
  insertCity
};

export default cityService;
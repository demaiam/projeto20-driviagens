import { connection } from "../database.connection.js";
import { mapObjectToInsertQuery }  from "../utils/sql.utils.js";

async function insertFlight(flight) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(flight);

  return connection.query(
    `INSERT INTO flights(${objectColumns}) VALUES (${paramsOrder});`,
    [...objectValues]
  );
}

const flightRepository = {
  insertFlight
}

export default flightRepository;
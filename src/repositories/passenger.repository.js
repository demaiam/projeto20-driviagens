import { connection } from "../database.connection.js";
import { mapObjectToInsertQuery }  from "../utils/sql.utils.js";

async function insertPassenger(passenger) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(passenger);

  return connection.query(
    `INSERT INTO passengers(${objectColumns}) VALUES (${paramsOrder});`,
    [...objectValues]
  );
}

const passengerRepository = {
  insertPassenger
};

export default passengerRepository;
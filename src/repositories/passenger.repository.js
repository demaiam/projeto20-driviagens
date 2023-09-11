import { connection } from "../configs/database.connection.js";
import { mapObjectToInsertQuery }  from "../utils/sql.util.js";

async function insertPassenger(passenger) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(passenger);

  return connection.query(`
    INSERT INTO passengers(${objectColumns}) VALUES(${paramsOrder});`,
    [...objectValues]
  );
}

async function findPassengerById(id) {
  const passenger = await connection.query(`
    SELECT * FROM passengers WHERE id=$1;`,
    [id]
  );
  return passenger.rows[0];
}

export const passengerRepository = {
  insertPassenger,
  findPassengerById
};
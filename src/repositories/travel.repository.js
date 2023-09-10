import { connection } from "../configs/database.connection.js";
import { mapObjectToInsertQuery }  from "../utils/sql.util.js";

async function insertTravel(travel) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(travel);

  return connection.query(`
    INSERT INTO travels(${objectColumns}) VALUES (${paramsOrder});`,
    [...objectValues]
  );
}

async function findPassengersTravels() {
  const travels = connection.query(`
    SELECT CONCAT("firstName", " ", "lastName" from passengers AS passenger FROM passengers)
    JOIN COUNT();`
  );
  return travels.rows;
}

async function findTravelsByPassengerName(name) {
  const travels = connection.query(`
    SELECT CONCAT("firstName", " ", "lastName" AS passenger FROM passengers)
    JOIN COUNT()
    ILIKE %$1%;`,
    [name]
  );
  return travels.rows;
}

const travelRepository = {
  insertTravel,
  findPassengersTravels,
  findTravelsByPassengerName
}

export default travelRepository;
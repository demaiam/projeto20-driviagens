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
    SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
    SUM("passengerId") AS travels
    FROM passengers, travels
    WHERE passengers.id = travels."passengerId"
    GROUP BY passengers.id;`
  );
  return travels.rows;
}

async function findTravelsByPassengerName(name) {
  const travels = connection.query(`
    SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
    SUM("passengerId") AS travels
    FROM passengers, travels
    WHERE passengers.id = travels."passengerId"
    AND passengers."firstName" ILIKE '%$1%'
	  OR passengers."lastName" ILIKE '%$2%'
    GROUP BY passengers.id;`,
    [name, name]
  );
  return travels.rows;
}

const travelRepository = {
  insertTravel,
  findPassengersTravels,
  findTravelsByPassengerName
}

export default travelRepository;

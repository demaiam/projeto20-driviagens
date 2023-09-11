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
  const travels = await connection.query(`
    SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
    SUM("passengerId") AS travels
    FROM passengers, travels
    WHERE passengers.id = travels."passengerId"
    GROUP BY passengers.id;`
  );
  console.log("resultado " + travels)
  return travels.rows;
}

async function findPassengersTravelsByName(name) {
  const travels = await connection.query(`
    SELECT CONCAT("firstName", ' ', "lastName") AS passenger,
    SUM("passengerId") AS travels
    FROM passengers, travels
    WHERE passengers.id = travels."passengerId"
    AND passengers."firstName" ILIKE '%${name}%'
	  OR passengers."lastName" ILIKE '%${name}%'
    GROUP BY passengers.id;`,
  );
  return travels.rows;
}

export const travelRepository = {
  insertTravel,
  findPassengersTravels,
  findPassengersTravelsByName
}
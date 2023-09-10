import { connection } from "../configs/database.connection.js";
import { mapObjectToInsertQuery }  from "../utils/sql.util.js";

async function insertFlight(flight) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(flight);

  return connection.query(`
    INSERT INTO flights(${objectColumns}) VALUES (${paramsOrder});`,
    [...objectValues]
  );
}

async function findFlights() {
  const flights = connection.query(`
    SELECT * from flights ORDER BY date;`
  );
  return flights.rows;
}

async function findFlightById(id) {
  const flight = connection.query(`
    SELECT * FROM flights WHERE id=$1;`,
    [id]
  );
  return flight.rows[0];
}

async function findFlightsByTerminal(terminal, city) {
  const flights = connection.query(`
    SELECT * FROM flights WHERE $1=$2;`,
    [terminal, city]
  );
  return flights.rows;
}

const flightRepository = {
  insertFlight,
  findFlights,
  findFlightById,
  findFlightsByTerminal
}

export default flightRepository;
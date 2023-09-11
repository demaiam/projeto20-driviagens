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
  const flights = await connection.query(`
    SELECT * from flights ORDER BY date;`
  );
  return flights.rows;
}

async function findFlightById(id) {
  const flight = await connection.query(`
    SELECT * FROM flights WHERE id=$1;`,
    [id]
  );
  return flight.rows[0];
}

async function findFlightsByTerminal(terminal, city) {
  const flights = await connection.query(`
    SELECT * FROM flights WHERE ${terminal}=$1`,
    [city]
  );
  return flights.rows;
}

async function findFlightsByDate(smallerDate, biggerDate) {
  const flights = await connection.query(`
    SELECT * FROM flights WHERE date BETWEEN $1 AND $2
    ORDER BY date;`,
    [smallerDate, biggerDate]
  );
  return flights.rows;
}

async function findFlightsByTerminalAndDate(terminal, city, smallerDate, biggerDate) {
  const flights = await connection.query(`
    SELECT * FROM flights WHERE ${terminal}=$1
    AND date BETWEEN $2 AND $3
    ORDER BY date;`,
    [city, smallerDate, biggerDate]
  );
  return flights.rows;
}

export const flightRepository = {
  insertFlight,
  findFlights,
  findFlightById,
  findFlightsByTerminal,
  findFlightsByDate,
  findFlightsByTerminalAndDate
}
import { connection } from "../configs/database.connection.js";
import { mapObjectToInsertQuery }  from "../utils/sql.util.js";

async function insertCity(city) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(city);

  return connection.query(`
    INSERT INTO cities(${objectColumns}) VALUES(${paramsOrder});`,
    [...objectValues]
  );
}

async function findCityByName(name) {
  console.log(name)
  const result = await connection.query(`
    SELECT * FROM cities WHERE name=$1;`,
    [name]
  );
  return result.rows[0];
}

async function findCityById(id) {
  const result = await connection.query(`
    SELECT name FROM cities WHERE id=$1;`,
    [id]
  );
  return result.rows[0];
}

export const cityRepository = {
  insertCity,
  findCityByName,
  findCityById
};
export function mapObjectToInsertQuery(object, offset = 1) {
  const objectColumns = Object.keys(object).map((key) => `"${key}"`).join(",");
  const objectValues = Object.values(object);
  const paramsOrder = objectValues.map((_, index) => `$${index + offset}`).join(",");

  return { objectColumns, objectValues, paramsOrder };
}
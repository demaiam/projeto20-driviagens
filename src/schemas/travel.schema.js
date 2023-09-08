import joi from "joi";

export const travelInsertSchema = joi.object({
  passengerId: joi.number().integer().required(),
  flightId: joi.number().integer().required()
});
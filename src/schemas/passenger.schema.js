import joi from "joi";

export const passengerInsertSchema = joi.object({
  firstName: joi.string().min(2).max(100).required(),
  lastName: joi.string().min(2).max(100).required()
});
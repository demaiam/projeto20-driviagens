import joi from "joi";

export const cityInsertSchema = joi.object({
  name: joi.string().min(2).max(50).required()
});
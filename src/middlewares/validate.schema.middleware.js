import httpStatus from "http-status";

export function validateSchema(schema) {
  return (req, res, next) => {

    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log(validation.error.details)
      return res.sendStatus(httpStatus.UNPROCESSABLE_CONTENT);
    }

    next();
  }
}
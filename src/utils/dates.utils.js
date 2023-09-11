import { unprocessableEntityError } from "../errors/unprocessable.entity.error.js";
import { badRequest } from "../errors/bad.request.error.js";
import dayjs from "dayjs";
import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export function formatFlight(flight) {
  const date = dayjs(flight.date).format("DD-MM-YYYY");
  return { id: flight.id, origin: flight.origin, destination: flight.destination, date: date }
}

export function formatDate(date) {
  let arrDate = date.split("-");
  let strDate = "";
  for (let i = arrDate.length - 1; i >= 0; i--) {
    strDate += arrDate[i];
    strDate += "-";
  }
  strDate = strDate.slice(0, -1);

  const flightDate = new Date(strDate);
  const todayDate = new Date();
  const timeDifference = flightDate.getTime() - todayDate.getTime();

  if (timeDifference >= 0) return false;
  
  return true;
}

export function formatDates(smallerDate, biggerDate) {
  const dateSchema = joi.object({
    smallerDate: joi.date().format("DD-MM-YYYY"),
    biggerDate: joi.date().format("DD-MM-YYYY")
  });

  const validation = dateSchema.validate({ smallerDate: smallerDate, biggerDate: biggerDate });
    if (validation.error) {
      console.log(validation.error.details)
      throw unprocessableEntityError("Date");
  }

  let arrSmallerDate = smallerDate.split("-");
  let arrBiggerDate = biggerDate.split("-");
  let strSmallerDate = "";
  let strBiggerDate = "";
  for (let i = arrSmallerDate.length - 1; i >= 0; i--) {
    strSmallerDate += arrSmallerDate[i];
    strSmallerDate += "-";
    strBiggerDate += arrBiggerDate[i];
    strBiggerDate += "-";
  }
  strSmallerDate = strSmallerDate.slice(0, -1);
  strBiggerDate = strBiggerDate.slice(0, -1);

  const smallerDateFormatted = new Date(strSmallerDate);
  const biggerDateFormatted = new Date(strBiggerDate);

  const timeDifference = biggerDateFormatted.getTime() - smallerDateFormatted.getTime();

  if (timeDifference < 0) throw badRequest();

  return true;
}
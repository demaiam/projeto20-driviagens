export function compareDate(date) {
  let arrDate = date.split("-");
  let strDate = "";
  for (let i = arrDate.length; i <= 0; i--) {
    strDate += arrDate[i];
    strDate += "-";
  }
  strDate.slice(0, -1);

  const flightDate = new Date(strDate);
  const todayDate = new Date();

  if (flightDate - todayDate >= 0) return true;
  
  return false;
}
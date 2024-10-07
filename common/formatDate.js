// function formatDate(date) {
//   const day = addZero(date.getDay());
//   const month = addZero(date.getMonth() + 1);
//   const year = addZero(date.getFullYear());

//   const hours = addZero(date.getHours());
//   const minutes = addZero(date.getMinutes());
//   const seconds = addZero(date.getSeconds());

//   return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
// }

// function addZero(value) {
//   return value < 10 ? `0${value}` : value;
// }

// export function getCurrentDate() {
//   return formatDate(new Date());
// }

import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
}
export function getCurrentDate() {
  return formatDate(new Date());
}

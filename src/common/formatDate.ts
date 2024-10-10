import moment from "moment";

function formatDate(date: Date) {
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
}
export function getCurrentDate() {
  return formatDate(new Date());
}

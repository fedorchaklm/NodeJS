import moment from "moment";

function formatDate(date: Date): string {
  return moment(date).format("DD-MM-YYYY HH:mm:ss");
}
export function getCurrentDate(): string {
  return formatDate(new Date());
}

import { format, parseISO } from "date-fns";
import { ka } from "date-fns/locale"; // Georgian locale

function formatDateBase(dateString: string, dateFormat: string) {
  const date = parseISO(dateString); // Ensures correct UTC parsing
  return format(date, dateFormat, { locale: ka });
}

export function formatDateWithDay(dateString: string) {
  return formatDateBase(dateString, "eee - dd/M/yyyy"); // "ორშ - 02/2/2025"
}

export function formatDate(dateString: string) {
  return formatDateBase(dateString, "dd MMM, yyyy"); // "22 იანვ, 2022"
}

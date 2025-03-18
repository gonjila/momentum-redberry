import { format } from "date-fns";
import { ka } from "date-fns/locale"; // Georgian locale

function formatDateBase(dateString: string, dateFormat: string) {
  const date = new Date(dateString); // Ensures correct UTC parsing
  return format(date, dateFormat, { locale: ka });
}

export function formatDateWithDay(dateString: string) {
  return formatDateBase(dateString, "eee - dd/M/yyyy"); // "ორშ - 02/2/2025"
}

export function formatDate(dateString: string) {
  return formatDateBase(dateString, "dd MMM, yyyy"); // "22 იანვ, 2022"
}

export function formatDateForDatePickerValue(dateString: string) {
  return formatDateBase(dateString, "dd.MM.yyyy"); // 14.01.2025
}

export function formatDateForTaskApi(dateString: string) {
  return formatDateBase(dateString, "yyyy-MM-dd"); // 2025-12-31
}

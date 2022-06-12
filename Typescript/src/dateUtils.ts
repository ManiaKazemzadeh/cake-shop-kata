import { Temporal } from "temporal-polyfill";

export function addDays(date: Temporal.PlainDateTime, days: number) {
  return date.add(new Temporal.Duration(0, 0, 0, days));
}

export function addHours(
  date: Temporal.PlainDateTime,
  hours: number
): Temporal.PlainDateTime {
  return date.add(new Temporal.Duration(0, 0, 0, 0, hours));
}

export function addWeeks(
  date: Temporal.PlainDateTime,
  weeks: number
): Temporal.PlainDateTime {
  return date.add(new Temporal.Duration(0, 0, weeks));
}

export function isBeforeNoon(date: Temporal.PlainDateTime) {
  return date.hour < 12;
}

export function isWednesdayToSunday(date: Temporal.PlainDateTime) {
  return date.dayOfWeek >= 3;
}

export function isThursdayToSunday(date: Temporal.PlainDateTime) {
  return date.dayOfWeek >= 4;
}

export function isFridayToSunday(date: Temporal.PlainDateTime) {
  return date.dayOfWeek >= 5;
}

export function isFridayToMonday(date: Temporal.PlainDateTime) {
  return date.dayOfWeek >= 5 || date.dayOfWeek === 1;
}

export function latest(...dates: Array<Temporal.PlainDateTime>) {
  return dates.sort().pop();
}

export function daysUntilNextMonday(date: Temporal.PlainDateTime) {
  return (1 + 7 - date.dayOfWeek) % 7 || 7;
}

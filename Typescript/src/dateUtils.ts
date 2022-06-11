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

export function isBeforeNoon(date: Temporal.PlainDateTime) {
  return date.hour < 12;
}

import { Temporal } from "temporal-polyfill";

interface FestivePeriod {
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
}

export function getFestivePeriod(): FestivePeriod {
  return {
    start: Temporal.PlainDate.from("2022-12-23"),
    end: Temporal.PlainDate.from("2023-01-01"),
  };
}

// todo: is there proper a way to get the later of two dates?
export function isDuringFestivePeriod(date: Temporal.PlainDate): boolean {
  const festivePeriod = getFestivePeriod();
  return (
    (festivePeriod.start.month === date.month &&
      festivePeriod.start.day < date.day) ||
    (festivePeriod.end.month === date.month && festivePeriod.end.day > date.day)
  );
}

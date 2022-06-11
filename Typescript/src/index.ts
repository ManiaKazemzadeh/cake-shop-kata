import { Temporal } from "temporal-polyfill";

type Size = "small" | "big";

function addDays(date: Temporal.PlainDateTime, days: number) {
  return date.add(new Temporal.Duration(0, 0, 0, days));
}

function getLeadTime(size: Size): number {
  return size === "small" ? 2 : 3;
}

export function orderCake(
  size: Size,
  orderTime: Temporal.PlainDateTime
): Temporal.PlainDate {
  const leadTime = getLeadTime(size);
  console.log({ orderTime: JSON.stringify(orderTime) });
  const result = addDays(orderTime, leadTime).toPlainDate();
  console.log({ result: JSON.stringify(result) });
  return result;
}

import { Temporal } from "temporal-polyfill";

type Size = "small" | "big";

export function orderCake(
  size: Size,
  orderTime: Temporal.PlainDateTime
): Temporal.PlainDate {
  console.log({ ordertime: JSON.stringify(orderTime) });
  const result = orderTime.add(new Temporal.Duration(0, 0, 0, 2)).toPlainDate();
  console.log({ result: JSON.stringify(result) });
  return result;
}

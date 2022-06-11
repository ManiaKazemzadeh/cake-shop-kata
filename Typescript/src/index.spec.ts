import { Temporal } from "temporal-polyfill";

import { orderCake } from ".";

const monday = Temporal.PlainDateTime.from("2022-06-06T08:00:00.000");
const wednesday = Temporal.PlainDateTime.from("2022-06-08T08:00:00.000");

test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
  console.log({ monday: JSON.stringify(monday) });
  console.log({ wednesday: JSON.stringify(wednesday) });
  const result = orderCake("small", monday);

  expect(result).toEqual(wednesday.toPlainDate());
});

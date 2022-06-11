import { Temporal } from "temporal-polyfill";

import { orderCake } from ".";

const monday = Temporal.PlainDateTime.from("2022-06-06T08:00:00.000");
const wednesday = Temporal.PlainDateTime.from("2022-06-08T08:00:00.000");
const thursday = Temporal.PlainDateTime.from("2022-06-09T08:00:00.000");

test("A small cake, ordered on Monday, is delivered on Wednesday", () => {
  const result = orderCake("small", monday);

  expect(result.toLocaleString()).toEqual(
    wednesday.toPlainDate().toLocaleString()
  );
});

test("A big cake, ordered on Monday, is delivered on Thursday", () => {
  const result = orderCake("big", monday);

  expect(result.toLocaleString()).toEqual(
    thursday.toPlainDate().toLocaleString()
  );
});

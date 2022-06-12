import { Temporal } from "temporal-polyfill";

import { Cake, Size } from "./cake";
import { addHours, addWeeks } from "./dateUtils";

const monday = Temporal.PlainDateTime.from("2022-06-06T00:00:00.000");
const tuesday = Temporal.PlainDateTime.from("2022-06-07T00:00:00.000");
const wednesday = Temporal.PlainDateTime.from("2022-06-08T00:00:00.000");
const thursday = Temporal.PlainDateTime.from("2022-06-09T00:00:00.000");
const friday = Temporal.PlainDateTime.from("2022-06-10T00:00:00.000");
const saturday = Temporal.PlainDateTime.from("2022-06-11T00:00:00.000");
const sunday = Temporal.PlainDateTime.from("2022-06-12T00:00:00.000");

// Question: can the cake sit and wait between the different stages?
// E.g. if a small cake, with frosting and nuts is ordered on Tuesday morning, Marco starts baking immediately, finished baking on Thursday, Sandro does the frosting for 2 days (Saturday), it then needs to "wait" until Monday again before Marco can decorate with nuts.

// Assumption: the baking time for a cake is x consecutive days. I.e. if a cake is ordered on Friday, the baking does not start on Monday.
// Similarly, the frosting time for a cake is 2 consecutive days, i.e. frosting cannot start on a Saturday.

// Assumption 2: the box can arrive anytime after the order has been placed, rather than 3 times from the time Marco starts working on the cake

describe("At Connascent Cakes, ", () => {
  describe("a small cake, ", () => {
    // is this correct? Should the cake be delivered on Tuesday if Marco starts baking on the same day?
    it("ordered on Monday, is delivered on Wednesday", () => {
      const result = new Cake(Size.Small).order(addHours(monday, 8));

      expect(result.equals(wednesday)).toBe(true);
    });

    it("ordered after 12pm on Monday, is delivered on Thursday", () => {
      const result = new Cake(Size.Small).order(addHours(monday, 13));

      expect(result.equals(thursday)).toBe(true);
    });

    it("ordered on Wednesday, is delivered on Friday", () => {
      const result = new Cake(Size.Small).order(addHours(wednesday, 8));

      expect(result.equals(friday)).toBe(true);
    });

    it.each`
      spec          | dayOfOrder
      ${"Thursday"} | ${thursday}
      ${"Friday"}   | ${friday}
      ${"Saturday"} | ${saturday}
      ${"Sunday"}   | ${sunday}
    `("ordered on $spec, is delivered next Wednesday", ({ dayOfOrder }) => {
      const result = new Cake(Size.Small).order(addHours(dayOfOrder, 8));
      const expected = addWeeks(wednesday, 1);

      expect(result.equals(expected)).toBe(true);
    });

    describe("with custom frosting, ", () => {
      it("ordered on Monday, is delivered on Friday", () => {
        const result = new Cake(Size.Small, true).order(addHours(monday, 8));

        expect(result.equals(friday)).toBe(true);
      });

      it("ordered after 12pm on Monday, is delivered on Saturday", () => {
        const result = new Cake(Size.Small, true).order(addHours(monday, 13));

        expect(result.equals(saturday)).toBe(true);
      });

      // Finished baking on Friday, Sandro does not work Sunday-Monday, so frosting work cannot start until Tuesday
      it("ordered on Wednesday, is delivered next Thursday", () => {
        const result = new Cake(Size.Small, true).order(addHours(wednesday, 8));
        const expected = addWeeks(thursday, 1);

        expect(result.equals(expected)).toBe(true);
      });
    });

    describe("with a fancy box, ", () => {
      it("ordered on Monday, is delivered on Thursday", () => {
        const result = new Cake(Size.Small, false, true).order(
          addHours(monday, 8)
        );

        expect(result.equals(thursday)).toBe(true);
      });

      it("ordered after 12pm on Monday, is delivered on Thursday", () => {
        const result = new Cake(Size.Small, false, true).order(
          addHours(monday, 13)
        );

        expect(result.equals(thursday)).toBe(true);
      });

      // Finished baking on Wednesday, finished frosting Friday, no extra days for boxing
      it("and custom frosting, ordered on Monday, is delivered on Friday", () => {
        const result = new Cake(Size.Small, true, true).order(
          addHours(monday, 8)
        );

        expect(result.equals(friday)).toBe(true);
      });

      // Finished baking on Thursday, finished frosting Saturday, no extra days for boxing
      it("and custom frosting, ordered after 12pm on Monday, is delivered Saturday", () => {
        const result = new Cake(Size.Small, true, true).order(
          addHours(monday, 13)
        );

        expect(result.equals(saturday)).toBe(true);
      });
    });
  });

  describe("a big cake, ", () => {
    it("ordered on Monday, is delivered on Thursday", () => {
      const result = new Cake(Size.Big).order(addHours(monday, 8));

      expect(result.equals(thursday)).toBe(true);
    });

    it("ordered after 12pm on Monday, is delivered on Friday", () => {
      const result = new Cake(Size.Big).order(addHours(monday, 13));

      expect(result.equals(friday)).toBe(true);
    });

    it.each`
      spec           | dayOfOrder
      ${"Wednesday"} | ${wednesday}
      ${"Thursday"}  | ${thursday}
      ${"Friday"}    | ${friday}
      ${"Saturday"}  | ${saturday}
      ${"Sunday"}    | ${sunday}
    `("ordered on $spec, is delivered next Thursday", ({ dayOfOrder }) => {
      const result = new Cake(Size.Big).order(addHours(dayOfOrder, 8));
      const expected = addWeeks(thursday, 1);

      expect(result.equals(expected)).toBe(true);
    });

    describe("with custom frosting, ", () => {
      it("ordered on Monday, is delivered on Saturday", () => {
        const result = new Cake(Size.Big, true).order(addHours(monday, 8));

        expect(result.equals(saturday)).toBe(true);
      });

      // Finished baking on Friday, Sandro does not work Sunday-Monday, so frosting work cannot start until Tuesday
      it("ordered after 12pm on Monday, is delivered next Thursday", () => {
        const result = new Cake(Size.Big, true).order(addHours(monday, 13));
        const expected = addWeeks(thursday, 1);

        console.log({ result: JSON.stringify(result) });
        console.log({ expected: JSON.stringify(expected) });

        expect(result.equals(expected)).toBe(true);
      });
    });

    describe("with a fancy box, ", () => {
      it("ordered on Monday, is delivered on Thursday", () => {
        const result = new Cake(Size.Big, false, true).order(
          addHours(monday, 8)
        );

        expect(result.equals(thursday)).toBe(true);
      });

      it("ordered after 12pm on Monday, is delivered on Friday", () => {
        const result = new Cake(Size.Big, false, true).order(
          addHours(monday, 13)
        );

        expect(result.equals(friday)).toBe(true);
      });

      it("and custom frosting, ordered on Monday, is delivered on Saturday", () => {
        const result = new Cake(Size.Big, true, true).order(
          addHours(monday, 8)
        );

        expect(result.equals(saturday)).toBe(true);
      });

      // Finished baking on Friday, Sandro does not work Sunday-Monday, so frosting work cannot start until Tuesday
      it("and custom frosting, ordered after 12pm on Monday, is delivered next Thursday", () => {
        const result = new Cake(Size.Big, true, true).order(
          addHours(monday, 13)
        );
        const expected = addWeeks(thursday, 1);

        expect(result.equals(expected)).toBe(true);
      });
    });
  });
});

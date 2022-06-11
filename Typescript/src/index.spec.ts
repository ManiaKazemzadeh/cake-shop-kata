import { Temporal } from "temporal-polyfill";

import { Cake, Size } from ".";
import { addHours } from "./dateUtils";

const monday = Temporal.PlainDateTime.from("2022-06-06T00:00:00.000");
const wednesday = Temporal.PlainDateTime.from("2022-06-08T00:00:00.000");
const thursday = Temporal.PlainDateTime.from("2022-06-09T00:00:00.000");
const friday = Temporal.PlainDateTime.from("2022-06-10T00:00:00.000");
const saturday = Temporal.PlainDateTime.from("2022-06-11T00:00:00.000");
const sunday = Temporal.PlainDateTime.from("2022-06-12T00:00:00.000");

describe("At Connascent Cakes, ", () => {
  describe("a small cake, ", () => {
    const cake = new Cake(Size.Small);

    it("ordered on Monday, is delivered on Wednesday", () => {
      const result = cake.order(addHours(monday, 8));

      expect(result.equals(wednesday)).toBe(true);
    });

    it("ordered after 12pm on Monday, is delivered on Thursday", () => {
      const result = cake.order(addHours(monday, 13));

      expect(result.equals(thursday)).toBe(true);
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
    });

    describe("with a fancy box, ", () => {
      it("ordered on Monday, is delivered on Thursday", () => {
        const result = new Cake(Size.Small, false, true).order(
          addHours(monday, 8)
        );

        expect(result.equals(thursday)).toBe(true);
      });

      it("ordered after 12pm on Monday, is delivered on Friday", () => {
        const result = new Cake(Size.Small, false, true).order(
          addHours(monday, 13)
        );

        expect(result.equals(friday)).toBe(true);
      });

      it("and custom frosting, ordered on Monday, is delivered on Saturday", () => {
        const result = new Cake(Size.Small, true, true).order(
          addHours(monday, 8)
        );

        expect(result.equals(saturday)).toBe(true);
      });

      it("and custom frosting, ordered after 12pm on Monday, is delivered on Sunday", () => {
        const result = new Cake(Size.Small, true, true).order(
          addHours(monday, 13)
        );

        expect(result.equals(sunday)).toBe(true);
      });
    });

    describe("with nuts, ", () => {
      it("ordered on Monday, is delivered on Thursday", () => {
        const result = cake.order(addHours(monday, 8));

        // does marco work?
        expect(result.equals(thursday)).toBe(true);
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

    describe("with custom frosting, ", () => {
      it("ordered on Monday, is delivered on Saturday", () => {
        const result = new Cake(Size.Big, true).order(addHours(monday, 8));

        expect(result.equals(saturday)).toBe(true);
      });

      it("ordered after 12pm on Monday, is delivered on Sunday", () => {
        const result = new Cake(Size.Big, true).order(addHours(monday, 13));

        expect(result.equals(sunday)).toBe(true);
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

      it("and custom frosting, ordered after 12pm on Monday, is delivered on Sunday", () => {
        const result = new Cake(Size.Big, true, true).order(
          addHours(monday, 13)
        );

        expect(result.equals(sunday)).toBe(true);
      });
    });
  });
});

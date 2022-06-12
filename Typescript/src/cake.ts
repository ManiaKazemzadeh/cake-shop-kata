import { Temporal } from "temporal-polyfill";

import {
  addDays,
  daysUntilNextMonday,
  isBeforeNoon,
  isFridayToMonday,
  isThursdayToSunday,
  isWednesdayToSunday,
  latest,
} from "./dateUtils";

export enum Size {
  Small,
  Big,
}

export class Cake {
  constructor(
    private size: Size,
    private frosting?: boolean,
    private box?: boolean,
    private nuts?: boolean
  ) {}

  public order(orderTime: Temporal.PlainDateTime): Temporal.PlainDate {
    const bakeIsFinished = this.bake(orderTime);
    const cakeIsFinished = this.frost(bakeIsFinished);

    return latest(cakeIsFinished, this.boxCake(orderTime)).toPlainDate();
  }

  private bake(orderTime: Temporal.PlainDateTime) {
    const startBaking = this.startBaking(orderTime);
    return addDays(startBaking, this.leadTimeForBake());
  }

  private startBaking(orderTime: Temporal.PlainDateTime) {
    const startNextDay = isBeforeNoon(orderTime)
      ? orderTime
      : addDays(orderTime, 1);

    return this.nextBakingDay(startNextDay);
  }

  private nextBakingDay(date: Temporal.PlainDateTime) {
    const daysUntilNextBakingDay = this.shouldStartBakingNextMonday(date)
      ? daysUntilNextMonday(date)
      : 0;

    return new Temporal.PlainDateTime(
      date.year,
      date.month,
      date.day + daysUntilNextBakingDay,
      date.hour
    );
  }

  private shouldStartBakingNextMonday(date: Temporal.PlainDateTime) {
    return this.size === Size.Small
      ? isThursdayToSunday(date)
      : isWednesdayToSunday(date);
  }

  private leadTimeForBake() {
    return this.size === Size.Big ? 3 : 2;
  }

  private frost(bakeIsFinished: Temporal.PlainDateTime) {
    if (!this.frosting) return bakeIsFinished;

    const leadTime = 2;
    const startFrosting = this.nextFrostingDay(bakeIsFinished);
    return addDays(startFrosting, leadTime);
  }

  private nextFrostingDay(date: Temporal.PlainDateTime) {
    const shouldStartFrostingNextTuesday = isFridayToMonday(date);

    const daysUntilNextFrostingDay = shouldStartFrostingNextTuesday
      ? daysUntilNextMonday(date) + 1 //todo: find a cleaner way of getting next Tuesday
      : 0;

    return new Temporal.PlainDateTime(
      date.year,
      date.month,
      date.day + daysUntilNextFrostingDay,
      date.hour
    );
  }

  private boxCake(orderTime: Temporal.PlainDateTime) {
    return this.box ? addDays(orderTime, 3) : orderTime;
  }
}

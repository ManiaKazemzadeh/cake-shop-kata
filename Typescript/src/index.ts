import { Temporal } from "temporal-polyfill";

import {
  addDays,
  isBeforeNoon,
  isFridayOrSaturday,
  isThursdayToSunday,
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
    const startBaking = this.startBaking(orderTime);
    return addDays(startBaking, this.leadTime()).toPlainDate();
  }

  private startBaking(orderTime: Temporal.PlainDateTime) {
    const startNextDay = isBeforeNoon(orderTime)
      ? orderTime
      : addDays(orderTime, 1);

    return this.nextBakingDay(startNextDay);
  }

  private nextBakingDay(date: Temporal.PlainDateTime) {
    let daysUntilNextBakingDay = 0;

    if (this.size === Size.Small) {
      daysUntilNextBakingDay = isFridayOrSaturday(date) ? 2 : 0;
    }

    if (this.size === Size.Big) {
      daysUntilNextBakingDay = isThursdayToSunday(date)
        ? (1 + 7 - date.dayOfWeek) % 7 || 7
        : 0;
    }

    return new Temporal.PlainDateTime(
      date.year,
      date.month,
      date.day + daysUntilNextBakingDay,
      date.hour
    );
  }

  private leadTime(): number {
    const defaultLeadTime = this.size === Size.Big || this.box ? 3 : 2;
    return this.frosting ? defaultLeadTime + 2 : defaultLeadTime;
  }
}

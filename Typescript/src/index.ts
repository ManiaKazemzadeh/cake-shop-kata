import { Temporal } from "temporal-polyfill";

import { addDays, isBeforeNoon } from "./dateUtils";

export enum Size {
  Small,
  Big,
}

export class Cake {
  constructor(private size: Size, private frosting?: boolean) {}

  public order(orderTime: Temporal.PlainDateTime): Temporal.PlainDate {
    const leadTime = this.getLeadTime(orderTime);
    const result = addDays(orderTime, leadTime).toPlainDate();
    return result;
  }

  private getLeadTime(orderTime: Temporal.PlainDateTime): number {
    const defaultLeadTime = this.size === Size.Small ? 2 : 3;
    const customLeadTime = this.frosting
      ? defaultLeadTime + 2
      : defaultLeadTime;
    return isBeforeNoon(orderTime) ? customLeadTime : customLeadTime + 1;
  }
}

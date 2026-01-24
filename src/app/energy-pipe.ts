import { Pipe, PipeTransform } from '@angular/core';
import {
  NEW_UNIT_RATE,
  OLD_UNIT_RATE,
  NEW_STANDING_CHARGE,
  OLD_STANDING_CHARGE,
} from './energy.constant';

@Pipe({
  name: 'consumpionPrice',
})
export class ConsumptionPricePipe implements PipeTransform {
  private readonly NEW_TARIFF_START = new Date('2026-01-03T00:00:00Z');
  // transform(value: string): number {
  //   const energyPrice = 0.2788;
  //   const consumptionInKWh = +parseFloat(value).toFixed(2);
  //   const consumptionPrice = energyPrice * consumptionInKWh + 0.48;
  //   return parseFloat(consumptionPrice.toFixed(2));
  // }

  transform(consumption: string, intervalStart: string): string {
    const kwh = Number(parseFloat(consumption).toFixed(2));

    // Default to old tariff if date missing
    const date = intervalStart ? new Date(intervalStart) : null;
    const isNewTariff = date ? date.getTime() >= this.NEW_TARIFF_START.getTime() : false;

    const unitRate = isNewTariff ? NEW_UNIT_RATE : OLD_UNIT_RATE;
    const standing = isNewTariff ? NEW_STANDING_CHARGE : OLD_STANDING_CHARGE;

    const total = unitRate * kwh + standing;
    return `£${Number(total.toFixed(2))}`;
  }
}

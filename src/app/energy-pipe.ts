import { Pipe, PipeTransform } from '@angular/core';
import { UNIT_RATE, STANDING_CHARGE } from './energy.constant';

@Pipe({
  name: 'consumpionPrice',
})
export class ConsumptionPricePipe implements PipeTransform {
  transform(consumption: string): string {
    const kwh = Number(parseFloat(consumption).toFixed(2));

    const unitRate = UNIT_RATE;
    const standing = STANDING_CHARGE;

    const total = unitRate * kwh + standing;
    return `£${Number(total.toFixed(2))}`;
  }
}

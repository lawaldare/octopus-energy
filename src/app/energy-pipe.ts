import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consumpionPrice',
})
export class ConsumptionPricePipe implements PipeTransform {
  private readonly NEW_TARIFF_START = new Date('2026-01-02T00:00:00Z');

  private readonly OLD_UNIT_RATE = 0.27884;
  private readonly OLD_STANDING_CHARGE = 0.47977;

  private readonly NEW_UNIT_RATE = 0.25937;
  private readonly NEW_STANDING_CHARGE = 0.47292;

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

    const unitRate = isNewTariff ? this.NEW_UNIT_RATE : this.OLD_UNIT_RATE;
    const standing = isNewTariff ? this.NEW_STANDING_CHARGE : this.OLD_STANDING_CHARGE;

    const total = unitRate * kwh + standing;
    return `£${Number(total.toFixed(2))}`;
  }
}

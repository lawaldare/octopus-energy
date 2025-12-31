import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consumpionPrice',
})
export class ConsumptionPricePipe implements PipeTransform {
  transform(value: string): number {
    const energyPrice = 0.2736;
    const consumptionInKWh = +parseFloat(value).toFixed(2);
    const consumptionPrice = energyPrice * consumptionInKWh + 0.54;
    return parseFloat(consumptionPrice.toFixed(2));
  }
}

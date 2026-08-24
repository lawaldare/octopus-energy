import { Component, computed, inject, signal } from '@angular/core';
import { EnergyService } from './energy';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ConsumptionPricePipe } from './energy-pipe';
import { DownloadFileTypeService } from './download-file-type.service';
import {
  NEW_STANDING_CHARGE,
  NEW_UNIT_RATE,
  OLD_STANDING_CHARGE,
  OLD_UNIT_RATE,
  STANDING_CHARGE,
  UNIT_RATE,
} from './energy.constant';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ConsumptionPricePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [DatePipe, ConsumptionPricePipe],
})
export class App {
  private readonly NEW_DATE_START = new Date('2026-08-23T00:00:00+01:00');
  // private readonly NEW_TARIFF_START = new Date('2026-03-31T00:00:00Z');

  private readonly energyService = inject(EnergyService);
  private readonly consumpionPricePipe = inject(ConsumptionPricePipe);
  private readonly datePipe = inject(DatePipe);
  private readonly downloadFileTypeService = inject(DownloadFileTypeService);
  public readonly energyBillsByDay = toSignal(
    this.energyService.getEnergyBillsByDay().pipe(
      map((data: any) => {
        return data.results.filter(
          (bill: any) => new Date(bill.interval_start).getTime() >= this.NEW_DATE_START.getTime(),
        );
      }),
    ),
  );

  public total = computed(() => {
    const bills = this.energyBillsByDay();
    if (!bills) return;
    const sum = bills.reduce((acc: number, bill: any) => {
      // let price = 0;
      // if (new Date(bill.interval_start).getTime() >= this.NEW_TARIFF_START.getTime()) {
      //   price = NEW_UNIT_RATE * bill.consumption + NEW_STANDING_CHARGE;
      // } else {
      //   price = OLD_UNIT_RATE * bill.consumption + OLD_STANDING_CHARGE;
      // }
      // return acc + price;
      const price = UNIT_RATE * bill.consumption + STANDING_CHARGE;
      return acc + price;
    }, 0);
    return sum.toFixed(2);
  });

  public exportToCSV(): void {
    const dataToExport = this.energyBillsByDay().map((bill: any, index: number) => {
      return {
        'S/N': index + 1,
        Date: this.datePipe.transform(bill.interval_start, 'longDate'),
        'Consumption Unit (kWh)': bill.consumption,
        'Consumption Price (SC Inc.)': this.consumpionPricePipe.transform(
          bill.consumption,
          bill.interval_start,
        ),
      };
    });
    this.downloadFileTypeService.downloadCSV(dataToExport, 'energy-bills');
  }
}

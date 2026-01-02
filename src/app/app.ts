import { Component, inject, signal } from '@angular/core';
import { EnergyService } from './energy';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ConsumptionPricePipe } from './energy-pipe';
import { DownloadFileTypeService } from './download-file-type.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ConsumptionPricePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [DatePipe, ConsumptionPricePipe],
})
export class App {
  private readonly energyService = inject(EnergyService);
  private readonly consumpionPricePipe = inject(ConsumptionPricePipe);
  private readonly datePipe = inject(DatePipe);
  private readonly downloadFileTypeService = inject(DownloadFileTypeService);
  public readonly energyBillsByDay = toSignal(
    this.energyService.getEnergyBillsByDay().pipe(map((data: any) => data.results))
  );

  public exportToCSV(): void {
    const dataToExport = this.energyBillsByDay().map((bill: any, index: number) => {
      return {
        'S/N': index + 1,
        Date: this.datePipe.transform(bill.interval_start, 'longDate'),
        'Consumption Unit (kWh)': bill.consumption,
        'Consumption Price (SC Inc.)': this.consumpionPricePipe.transform(
          bill.consumption,
          bill.interval_start
        ),
      };
    });
    this.downloadFileTypeService.downloadCSV(dataToExport, 'energy-bills');
  }
}

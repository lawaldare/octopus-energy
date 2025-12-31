import { Component, inject, signal } from '@angular/core';
import { EnergyService } from './energy';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsumptionPricePipe } from './energy-pipe';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ConsumptionPricePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly energyService = inject(EnergyService);
  public readonly energyBillsByDay = toSignal(
    this.energyService.getEnergyBillsByDay().pipe(map((data: any) => data.results))
  );
}

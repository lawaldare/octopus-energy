import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnergyService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.octopus.energy/v1/electricity-meter-points/';
  private readonly MPAN = '1050001544370';
  private readonly METER_SERIAL_NUMBER = '18P0331981';
  private readonly API_KEY = 'sk_live_ouNxPpQgzkuqlLg5MAFulQEcoNkGW6ws';
  private readonly PAGE_SIZE = 1000;
  private readonly PERIOD_FROM = '2025-12-23';
  // private readonly GROUP_BY = 'month';

  public getEnergyBillsByDay() {
    const url = `${this.BASE_URL}${this.MPAN}/meters/${this.METER_SERIAL_NUMBER}/consumption/`;
    let params = new HttpParams();
    params = params.set('page_size', this.PAGE_SIZE);
    params = params.set('period_from', this.PERIOD_FROM);
    params = params.set('group_by', 'day');

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.API_KEY}:`)}`,
    });
    return this.http.get(url, { headers, params });
  }

  public getEnergyBillForTheMonth() {
    const url = `${this.BASE_URL}${this.MPAN}/meters/${this.METER_SERIAL_NUMBER}/consumption/`;
    let params = new HttpParams();
    params = params.set('page_size', this.PAGE_SIZE);
    params = params.set('group_by', 'month');

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.API_KEY}:`)}`,
    });
    return this.http.get(url, { headers, params });
  }
}

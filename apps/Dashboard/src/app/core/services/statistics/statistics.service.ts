import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import { OrderStatisticsResponse, StatisticsResponse } from '../../interfaces/statistics/statistics.interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getOverallStatistics(): Observable<StatisticsResponse> {
    return this._httpClient.get<StatisticsResponse>(`${this._BASE_URL}/statistics/overall`);
  }

  getOrderStatistics(): Observable<OrderStatisticsResponse> {
    return this._httpClient.get<OrderStatisticsResponse>(`${this._BASE_URL}/statistics/orders`);
  }
}

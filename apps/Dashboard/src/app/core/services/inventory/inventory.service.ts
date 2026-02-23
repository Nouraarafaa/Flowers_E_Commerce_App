import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';

export interface LowStockProduct {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export interface LowStockResponse {
  message: string;
  products: LowStockProduct[];
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getLowStockProducts(): Observable<LowStockResponse> {
    return this._httpClient.get<LowStockResponse>(`${this._BASE_URL}/inventory/reports/low-stock`);
  }
}

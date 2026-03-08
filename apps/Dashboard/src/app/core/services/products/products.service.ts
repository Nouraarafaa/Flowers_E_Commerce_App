import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../interfaces/products/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getProducts(): Observable<ProductsResponse> {
    return this._httpClient.get<ProductsResponse>(`${this._BASE_URL}/products`);
  }
}

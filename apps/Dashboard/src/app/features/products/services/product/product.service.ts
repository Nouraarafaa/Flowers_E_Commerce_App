import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import { GetProducts } from '../../interfaces/get-products/get-products';
import { Endpoints } from '../../../../core/enums/endpoints';
import { AddProductResponse } from '../../interfaces/add-product-response/add-product-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _bASE_URL = inject(BASE_URL);
  
  getProducts(): Observable<GetProducts> {
    return this._httpClient.get<GetProducts>(`${this._bASE_URL}${Endpoints.products}`);
  }

  addProduct(data: FormData): Observable<AddProductResponse> {
    return this._httpClient.post<AddProductResponse>(`${this._bASE_URL}${Endpoints.products}`, data);
  }


}

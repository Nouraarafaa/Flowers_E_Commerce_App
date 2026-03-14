import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import { GetProducts } from '../../interfaces/get-products/get-products';
import { Endpoints } from '../../../../core/enums/endpoints';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getProducts(): Observable<GetProducts> {
    return this._httpClient.get<GetProducts>(`${this._BASE_URL}${Endpoints.products}`);
  }

  

}

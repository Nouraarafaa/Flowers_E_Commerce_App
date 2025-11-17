import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { HomeResponse } from '../../interfaces/HomeResponse/home-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getProducts(): Observable<HomeResponse> {
    return this._httpClient.get<HomeResponse>(`${this._BASE_URL}/home`)
  }
}

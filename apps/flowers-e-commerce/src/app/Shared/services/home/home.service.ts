import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { HomeResponse, Product } from '../../interfaces/HomeResponse/home-response';
import { map, Observable } from 'rxjs';
import { homeApi } from '../../../Core/base/home-api';
import { Endpoints } from '../../../Core/enums/endpoints';
import { Testimonials } from '../../interfaces/testimonials';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements homeApi {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getHomeDetails(): Observable<HomeResponse> {
    return this._httpClient.get<HomeResponse>(`${this._BASE_URL}` + Endpoints.home);
  }
  getTestimonials(): Observable<Testimonials>{
    return this._httpClient.get<Testimonials>(`${this._BASE_URL}` + "/testimonials");
  }
  getProductById(id: string): Observable<{ message: string, product: Product }> {
    return this._httpClient.get<{ message: string, product: Product }>(`${this._BASE_URL}${Endpoints.products}/${id}`);
  }
}

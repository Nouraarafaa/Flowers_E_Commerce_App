import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Endpoints } from '../../../Core/enums/endpoints';
import { Product } from '../../interfaces/HomeResponse/home-response';
import { Review } from '../../interfaces/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getProductById(id: string): Observable<{ message: string, product: Product }> {
    return this._httpClient.get<{ message: string, product: Product }>(`${this._BASE_URL}${Endpoints.products}/${id}`);
  }

  getProductReviews(id: string): Observable<{ message: string, reviews: Review[] }> {
    return this._httpClient.get<{ message: string, reviews: Review[] }>(`${this._BASE_URL}${Endpoints.reviews}/${id}`);
  }

  addProductReview(review: { product: string, rating: number, title: string, comment: string }): Observable<unknown> {
    return this._httpClient.post(`${this._BASE_URL}${Endpoints.reviews}`, review);
  }
}

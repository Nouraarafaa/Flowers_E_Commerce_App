import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productsCount?: number;
}

export interface CategoriesResponse {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  categories: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getCategories(): Observable<CategoriesResponse> {
    return this._httpClient.get<CategoriesResponse>(`${this._BASE_URL}/categories`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import {CategoriesResponse ,CategoryResponse } from '../../interfaces/categories-response';
import { DeleteCategoryResponse } from './../../interfaces/categories-response';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getCategories(): Observable<CategoriesResponse> {
    return this._httpClient.get<CategoriesResponse>(`${this._BASE_URL}/categories`);
  }

  addCategory(name: string, imageFile: File): Observable<AddCategoryResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);
    return this._httpClient.post<AddCategoryResponse>(`${this._BASE_URL}/categories`, formData);
  }


}

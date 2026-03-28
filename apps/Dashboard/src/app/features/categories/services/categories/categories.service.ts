import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable, switchMap } from 'rxjs';
import { CategoriesResponse, CategoryResponse , DeleteCategoryResponse } from '../../interfaces/categories-response';
import { Endpoints } from './../../../../core/enums/endpoints';


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getCategories(): Observable<CategoriesResponse> {
    return this._httpClient.get<CategoriesResponse>(`${this._BASE_URL}${Endpoints.categories}?limit=1`).pipe(
      switchMap(res => {
        const allItemsCount = res.metadata.totalItems;
        return this._httpClient.get<CategoriesResponse>(
          `${this._BASE_URL}${Endpoints.categories}?limit=${allItemsCount}`
        );
      })
    );
  }

  getCategory(categoryId: string): Observable<CategoryResponse> {
    return this._httpClient.get<CategoryResponse>(`${this._BASE_URL}${Endpoints.categories}/${categoryId}`);
  }

  addCategory(name: string, imageFile: File): Observable<CategoryResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);
    return this._httpClient.post<CategoryResponse>(`${this._BASE_URL}${Endpoints.categories}`, formData);
  }

  updateCategory(categoryId: string, name: string, imageFile?: File): Observable<CategoryResponse> {
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile && typeof imageFile !== 'string') {
      formData.append('image', imageFile);
    }
    return this._httpClient.put<CategoryResponse>(`${this._BASE_URL}${Endpoints.categories}/${categoryId}`, formData);
  }

  deleteCategory(categoryId: string): Observable<DeleteCategoryResponse> {
    return this._httpClient.delete<DeleteCategoryResponse>(`${this._BASE_URL}${Endpoints.categories}/${categoryId}`);
  }
}

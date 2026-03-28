import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';

export interface Occasion {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  productsCount?: number;
}

export interface OccasionsResponse {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  occasions: Occasion[];
}

@Injectable({
  providedIn: 'root',
})
export class OccasionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getOccasions(): Observable<OccasionsResponse> {
    return this._httpClient.get<OccasionsResponse>(`${this._BASE_URL}/occasions`);
  }
}

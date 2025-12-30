import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';

export interface WishlistResponse {
  message: string;
  status: string;
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  addToWishlist(productId: string): Observable<WishlistResponse> {
    return this._httpClient.post<WishlistResponse>(`${this._BASE_URL}/wishlist`, {
      productId: productId,
    });
  }

  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    return this._httpClient.delete<WishlistResponse>(`${this._BASE_URL}/wishlist/${productId}`);
  }
}


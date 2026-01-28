import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import { WishlistClearResponse, WishlistObjectResponse, WishlistResponse } from '../interfaces/wishlist';



@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getWishlistProducts(): Observable<WishlistObjectResponse> {
    return this._httpClient.get<WishlistObjectResponse>(`${this._BASE_URL}/wishlist`);
  }

  addToWishlist(productId: string): Observable<WishlistResponse> {
    return this._httpClient.post<WishlistResponse>(`${this._BASE_URL}/wishlist`, {
      productId: productId,
    });
  }

  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    return this._httpClient.delete<WishlistResponse>(`${this._BASE_URL}/wishlist/${productId}`);
  }

  clearWishlist(): Observable<WishlistClearResponse> {
    return this._httpClient.post<WishlistClearResponse>(`${this._BASE_URL}/wishlist/clear`,{});
  }
}


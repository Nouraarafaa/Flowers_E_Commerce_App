import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  addToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${this._BASE_URL}/api/v1/wishlist/add`, { product: productId });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(`${this._BASE_URL}/api/v1/wishlist/${productId}`);
  }
}

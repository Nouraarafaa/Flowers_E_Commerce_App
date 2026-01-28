import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/flowers-e-commerce/src/app/Core/environments/environment';
import { Observable } from 'rxjs';
import { CartResponse } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _httpClient = inject(HttpClient);

  getLoggedUserCart():Observable<CartResponse>{
    return this._httpClient.get<CartResponse>(`${environment.BaseUrl}/cart`);
  }


 
}

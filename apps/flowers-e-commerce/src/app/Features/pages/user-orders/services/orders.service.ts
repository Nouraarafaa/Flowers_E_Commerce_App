import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashResponse, GetUserOrderResponse } from '../interfaces/response';
import { environment } from 'apps/flowers-e-commerce/src/app/Core/environments/environment';
import { ShippingAddressPayload } from '../interfaces/payload';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
private readonly _httpClient = inject(HttpClient);


  createCashOrder(payload:ShippingAddressPayload):Observable<CashResponse>{
   return this._httpClient.post<CashResponse>(`${environment.BaseUrl}/orders`, payload);
  }
  getUserOrders():Observable<GetUserOrderResponse>{
   return this._httpClient.get<GetUserOrderResponse>(`${environment.BaseUrl}/orders`);
  }
  
}

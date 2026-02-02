import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/flowers-e-commerce/src/app/Core/environments/environment';
import { map, Observable } from 'rxjs';
import { Address, addressPayload, AddressResponse, deleteAddressResponse } from '../../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class UserAddressesService {

  private readonly _httpClient = inject(HttpClient);


  getLoggedUserAddresses(): Observable<Address[]> {
    return this._httpClient.get<AddressResponse>(`${environment.BaseUrl}/addresses`)
      .pipe(map((res) => res.addresses));
    }

  addAddress(payload: addressPayload): Observable<Address[]> {
    return this._httpClient.patch<AddressResponse>(`${environment.BaseUrl}/addresses`, payload)
      .pipe(map((res) => res.addresses));
    }
  updateAddress(payload: addressPayload,addressId:string): Observable<Address[]> {
    return this._httpClient.patch<AddressResponse>(`${environment.BaseUrl}/addresses/${addressId}`, payload)
      .pipe(map((res) => res.addresses));
    }
  deleteAddress(addressId:string): Observable<Address[]> {
    return this._httpClient.delete<deleteAddressResponse>(`${environment.BaseUrl}/addresses/${addressId}`)
      .pipe(map((res) =>  res.address));
    }
}

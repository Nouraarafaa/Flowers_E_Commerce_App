import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/flowers-e-commerce/src/app/Core/environments/environment';
import { map, Observable } from 'rxjs';
import { Address, AddressResponse } from '../../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class UserAddressesService {

  private readonly _httpClient = inject(HttpClient);


  getLoggedUserAddresses(): Observable<Address[]> {
    return this._httpClient.get<AddressResponse>(`${environment.BaseUrl}/addresses`)
      .pipe(map((res) => res.addresses));
    }
}

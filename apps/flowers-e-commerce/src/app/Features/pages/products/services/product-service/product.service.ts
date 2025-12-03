import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {map, Observable } from 'rxjs';
import {Product, ProductsResponse } from '../../interfaces/products-response';
import { environment } from '../../../../../Core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _httpClient = inject(HttpClient);

  getAllProducts():Observable<ProductsResponse> {
    return this._httpClient.get<ProductsResponse>(`${environment.BaseUrl}/products`).pipe(
    map(response => {
      // 1. Access the products array
      const productsArray = response.products;

      // 2. Sort the products array by price (Low to High)
      productsArray.sort((a:Product, b:Product) => a.priceAfterDiscount - b.priceAfterDiscount);
      
      return response;
    })
  );
  }

  
  
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@elevate-workspace/auth';
import { Observable } from 'rxjs';
import { GetProducts } from '../../interfaces/get-products/get-products';
import { Endpoints } from '../../../../core/enums/endpoints';
import { AddProductResponse } from '../../interfaces/add-product-response/add-product-response';
import { GetProduct } from '../../interfaces/get-product/get-product';
import { ProductData } from '../../interfaces/product-data/product-data';
import { UpdateProductResponse } from '../../interfaces/update-product-response/update-product-response';
import { DeleteProduct } from '../../interfaces/delete-product/delete-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _bASE_URL = inject(BASE_URL);

  getProducts(): Observable<GetProducts> {
    return this._httpClient.get<GetProducts>(`${this._bASE_URL}${Endpoints.products}`);
  }

  getProduct(id: string): Observable<GetProduct> {
    return this._httpClient.get<GetProduct>(`${this._bASE_URL}${Endpoints.products}/${id}`);
  }

  addProduct(data: FormData): Observable<AddProductResponse> {
    return this._httpClient.post<AddProductResponse>(`${this._bASE_URL}${Endpoints.products}`, data);
  }

  updateProduct(id: string, data:ProductData):Observable<UpdateProductResponse> {
    return this._httpClient.put<UpdateProductResponse>(`${this._bASE_URL}${Endpoints.products}/${id}`, data);
  }
  
  deleteProduct(id:string): Observable<DeleteProduct> {
    return this._httpClient.delete<DeleteProduct>( `${this._bASE_URL}${Endpoints.products}/${id}`);
  }

}
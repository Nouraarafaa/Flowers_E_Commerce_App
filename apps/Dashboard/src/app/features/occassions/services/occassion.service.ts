import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment';
import { Observable, switchMap } from 'rxjs';
import { Endpoints } from '../../../core/enums/endpoints';
import { OccasionsResponse,DeleteOccassionResponse, OccasionResponse } from '../interfaces/occassion-response';

@Injectable({
  providedIn: 'root'
})
export class OccassionService {

  private readonly _httpClient = inject(HttpClient);

  getOccassions(): Observable<OccasionsResponse> {
  return this._httpClient.get<OccasionsResponse>(`${environment.BaseUrl}${Endpoints.occasions}?limit=1`).pipe(
    switchMap(res => {
      const allItemsCount = res.metadata.totalItems;
      return this._httpClient.get<OccasionsResponse>(
        `${environment.BaseUrl}${Endpoints.occasions}?limit=${allItemsCount}`
      );
    })
  );
}


  getOccassion(occassionId:string): Observable<OccasionResponse> { 
    return this._httpClient.get<OccasionResponse>(`${environment.BaseUrl}${Endpoints.occasions}/${occassionId}`);
  }

  addOccassion(name: string, imageFile: File): Observable<OccasionResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);
    return this._httpClient.post<OccasionResponse>(`${environment.BaseUrl}${Endpoints.occasions}`, formData);
  }

  updateOccassion(occassionId: string, name: string, imageFile?: File): Observable<OccasionResponse> {
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile && typeof imageFile !== 'string') {
      formData.append('image', imageFile);
    }
    return this._httpClient.put<OccasionResponse>(`${environment.BaseUrl}${Endpoints.occasions}/${occassionId}`, formData);
  }

  deleteOccassion(occassionId:string): Observable<DeleteOccassionResponse> { 
    return this._httpClient.delete<DeleteOccassionResponse>(`${environment.BaseUrl}${Endpoints.occasions}/${occassionId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment';
import { Observable } from 'rxjs';
import { DeleteOccassionResponse, OccassionResponse, OccassionsResponse } from '../interfaces/occassion-response';

@Injectable({
  providedIn: 'root'
})
export class OccassionService {

private readonly _httpClient = inject(HttpClient);

  getOccassions(): Observable<OccassionsResponse> {
    return this._httpClient.get<OccassionsResponse>(`${environment.BaseUrl}/occasions`);
  }

   getOccassion(occassionId:string): Observable<OccassionResponse> { 
    return this._httpClient.get<OccassionResponse>(`${environment.BaseUrl}/occasions/${occassionId}`);
  }

  addOccassion(name: string, imageFile: File): Observable<OccassionResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', imageFile);
    return this._httpClient.post<OccassionResponse>(`${environment.BaseUrl}/occasions`, formData);
  }

  updateOccassion(occassionId: string, name: string, imageFile?: File): Observable<OccassionResponse> {
    const formData = new FormData();
    formData.append('name', name);
    if (imageFile && typeof imageFile !== 'string') {
      formData.append('image', imageFile);
    }
    return this._httpClient.put<OccassionResponse>(`${environment.BaseUrl}/occasions/${occassionId}`, formData);
  }

  deleteOccassion(occassionId:string): Observable<DeleteOccassionResponse> { 
    return this._httpClient.delete<DeleteOccassionResponse>(`${environment.BaseUrl}/occasions/${occassionId}`);
  }
}

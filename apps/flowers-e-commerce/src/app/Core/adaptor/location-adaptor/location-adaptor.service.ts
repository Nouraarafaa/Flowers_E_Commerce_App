import { Injectable } from '@angular/core';
import { locationResponse } from '../../interfaces/location/location.response';
import { LocationModel } from '../../interfaces/location/location-model';

@Injectable({
  providedIn: 'root'
})
export class LocationAdaptorService {

  adapt(data:locationResponse):LocationModel{
    return {
      city: data.results[0].city
    };
  }
}

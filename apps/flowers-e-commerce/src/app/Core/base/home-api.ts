import { Observable } from 'rxjs';
import { HomeResponse } from '../../Shared/interfaces/HomeResponse/home-response';

export abstract class homeApi {
  abstract getHomeDetails(): Observable<HomeResponse>;
}

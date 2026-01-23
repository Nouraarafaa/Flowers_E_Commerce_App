import { Observable } from 'rxjs';
import { HomeResponse, Product } from '../../Shared/interfaces/HomeResponse/home-response';

export abstract class homeApi {
  abstract getHomeDetails(): Observable<HomeResponse>;
  abstract getProductById(id: string): Observable<{ message: string, product: Product }>;
}

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/HomeResponse/home-response';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products ?? [];
    }

    return products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}

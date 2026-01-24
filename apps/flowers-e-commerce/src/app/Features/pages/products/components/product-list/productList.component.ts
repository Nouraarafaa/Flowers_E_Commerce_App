import { Component, inject, input } from '@angular/core';
import { ProductCardComponent } from '../../../../../Shared/components/ui/product-card/product-card.component';
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { SearchPipe } from '../../../../../Shared/pipes/search/search.pipe';
import { SearchService } from '../../../../../Shared/services/search/search.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, SearchPipe],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent {
  _searchService = inject(SearchService);

  products = input.required<Product[]>();
}

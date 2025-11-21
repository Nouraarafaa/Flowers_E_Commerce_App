import { Component, input } from '@angular/core';
import { ProductCardComponent } from '../../../../../Shared/components/ui/product-card/product-card.component';
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {
  products = input.required<Product[]>();
}

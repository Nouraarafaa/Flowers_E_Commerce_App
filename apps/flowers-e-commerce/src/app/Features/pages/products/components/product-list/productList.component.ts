import { Component, input } from '@angular/core';
import { ProductCardComponent } from "../../../../../Shared/components/ui/product-card/product-card.component";
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent {

  products =input.required<Product[]>();
}

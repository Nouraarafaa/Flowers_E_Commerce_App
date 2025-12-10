import { Component, input } from '@angular/core';
import { ProductCardComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/product-card/product-card.component";
import { Product } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent {

  products =input.required<Product[]>();
}

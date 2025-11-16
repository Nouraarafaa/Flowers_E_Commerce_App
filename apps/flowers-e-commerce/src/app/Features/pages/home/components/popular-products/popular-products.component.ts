import { Component } from '@angular/core';
import { ProductCardComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/product-card/product-card.component";

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {}

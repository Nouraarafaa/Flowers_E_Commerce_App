import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../../../../../Shared/components/ui/product-card/product-card.component';
import { ProductsService } from '../../../../../Shared/services/products/products.service';
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.products);
        this.products.set(res.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

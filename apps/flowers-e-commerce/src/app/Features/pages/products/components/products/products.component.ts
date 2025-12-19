import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "../product-list/productList.component";
import { Product } from '../../../../../Shared/interfaces/product';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductFiltersComponent } from "../product-filters-section/productFilters.component";
import { HomeService } from 'apps/flowers-e-commerce/src/app/Shared/services/home/home.service';
import { Category, Occasion } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  imports: [ProductListComponent, PaginatorModule, ProductFiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _homeService = inject(HomeService);

  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);
  products = signal<Product[]>([]);

  getHomeDetailsSub!: Subscription;

  // fullProducts from API
  fullProducts = signal<Product[]>([]);
  // displayedProduct=>current products page
  displayedProducts = signal<Product[]>([]);
  // 'first':first product index
  first: number = 0;
  // 'rows': number of current products page 
  rows: number = 10;
  totalRecords: number = 0; // totalItems from API



  ngOnInit(): void {
    this.getProductsAndCategoriesAndOccasions();
  }

  getProductsAndCategoriesAndOccasions() {
    this.getHomeDetailsSub = this._homeService.getHomeDetails().subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.fullProducts.set(res.products);
        this.totalRecords = res.products.length; 
        this.categories.set(res.categories);
        this.occasions.set(res.occasions);

        
        this.paginateProducts(this.first, this.rows);
      }
    });
  }


  paginateProducts(firstIndex: number, pageSize: number): void {
    const allProducts = this.fullProducts();
    const endIndex = firstIndex + pageSize;
    // (Array slicing)
    const productsOnPage = allProducts.slice(firstIndex, endIndex);
    this.displayedProducts.set(productsOnPage);
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows!;

    this.paginateProducts(this.first, this.rows);
  }



  ngOnDestroy(): void {
    this.getHomeDetailsSub?.unsubscribe();
  }
}

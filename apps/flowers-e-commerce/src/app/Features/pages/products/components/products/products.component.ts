import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "../product-list/productList.component";
import { Product } from '../../../../../Shared/interfaces/product';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductFiltersComponent } from "../product-filters-section/productFilters.component";
import { HomeService } from 'apps/flowers-e-commerce/src/app/Shared/services/home/home.service';
import { Category, Occasion } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProducts } from './../../../../../Core/store/products/products.actions';
import { selectFilteredProducts, selectOriginalProducts } from 'apps/flowers-e-commerce/src/app/Core/store/products/products.selectors';




@Component({
  selector: 'app-products',
  imports: [ProductListComponent, PaginatorModule, ProductFiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _homeService = inject(HomeService);

  _store = inject(Store);

  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);
  products = signal<Product[]>([]);

  getHomeDetailsSub!: Subscription;
  getProductsSub!: Subscription;

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
    this.getCategoriesAndOccasions();
    this.getProductsFromStore();

  }
  
  getCategoriesAndOccasions() {
    this.getHomeDetailsSub = this._homeService.getHomeDetails().subscribe({
      next: (res) => {
        this.categories.set(res.categories);
        this.occasions.set(res.occasions);


      }
    });
  }

  getProductsFromStore() {
   this._store.dispatch(loadProducts());
    this.getProductsSub = this._store.select(selectFilteredProducts).subscribe({
      next: (res) => {
        this.products.set(res);
        this.fullProducts.set(res);
        this.totalRecords = res.length;
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
    this.getProductsSub?.unsubscribe();
  }
}

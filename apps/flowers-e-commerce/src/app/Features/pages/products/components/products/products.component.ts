import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "../product-list/productList.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductFiltersComponent } from "../product-filters-section/productFilters.component";
import { HomeService } from '../../../../../Shared/services/home/home.service';
import { Category, Occasion, Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProducts, setLoading } from '../../../../../Core/store/products/products.actions';
import { selectFilteredProducts, selectLoading } from '../../../../../Core/store/products/products.selectors';
import { SkeletonListComponent } from "../skeleton-list/skeletonList.component";
import { AsyncPipe } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-products',
  imports: [ProductListComponent, PaginatorModule, ProductFiltersComponent, SkeletonListComponent, AsyncPipe, DrawerModule, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _homeService = inject(HomeService);

  _store = inject(Store);


  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);
  products = signal<Product[]>([]);
  visibleFilters = signal(false);

  getHomeDetailsSub!: Subscription;
  getProductsSub!: Subscription;
  isLoading$: Observable<boolean> = this._store.select(selectLoading);

  // fullProducts from API
  fullProducts = signal<Product[]>([]);
  // displayedProduct=>current products page
  displayedProducts = signal<Product[]>([]);
  // 'first':first product index
  first = 0;
  // 'rows': number of current products page 
  rows = 10;
  totalRecords = 0; // totalItems from API




  ngOnInit(): void {
    this.getCategoriesAndOccasions();
    this._store.dispatch(setLoading({ Loading: true }));
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
        setTimeout(() => {
          this._store.dispatch(setLoading({ Loading: false }));
          this.products.set(res);
        }, 2000)
        this.fullProducts.set(res);
        this.totalRecords = res.length;
        this.first = 0; // Reset to first page on filter/sort change
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
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.paginateProducts(this.first, this.rows);
  }



  ngOnDestroy(): void {
    this.getHomeDetailsSub?.unsubscribe();
    this.getProductsSub?.unsubscribe();
  }
}
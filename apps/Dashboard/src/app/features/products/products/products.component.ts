import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DynamicTableComponent } from "../../../shared/components/ui/dynamic-table/dynamic-table.component";
import { TableColumn } from '../../../shared/interfaces/tableColumn/table-column';
import { Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { productAdaptorService } from '../../../core/adaptor/products-adaptor';
import { PageHeaderComponent } from "../../../shared/components/ui/page-header/page-header.component";
import { ProductTableModel } from '../interfaces/product-table-model/product-table-model';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-products',
  imports: [DynamicTableComponent, PageHeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {

  private readonly _productService = inject(ProductService);
  private readonly _productAdaptorService = inject(productAdaptorService);
  private readonly _router = inject(Router);

  products = signal<ProductTableModel[]>([]);
  title = signal<string>("All Products");
  featureName = signal<string>("Add a new product");

  private destroy$ = new Subject<void>();
  
  productsColumns: TableColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'price', header: 'Price', type: 'text' },
    { field: 'stock', header: 'Stock', type: 'text' },
    { field: 'sales', header: 'Sales', type: 'text' },
    { field: 'rating', header: 'Ratings', type: 'text' },
    { field: 'actions', header: '', type: 'actions' }
  ];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts (): void {
    this._productService.getProducts().pipe(
      map((res) => this._productAdaptorService.productAdapt(res.products)),
      takeUntil(this.destroy$)
    ).subscribe({
      next:(res) => {
        console.log(res);
        this.products.set(res);
      },error:(err) => {
        console.log(err);
      }
    })
  }

  addNewProduct(): void {
    this._router.navigate(["products/add"]);
  }
  updateProduct(id:string): void {
    console.log("Update product");
    console.log(id);
  }
  deleteProduct(id:string): void {
    console.log("delet product");
    console.log(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

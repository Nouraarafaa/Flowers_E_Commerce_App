import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../services/categories/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { DynamicTableComponent } from '../../../../shared/components/ui/dynamic-table/dynamic-table.component';
import { TableColumn } from '../../../../shared/interfaces/tableColumn/table-column';
import { PageHeaderComponent } from "apps/Dashboard/src/app/shared/components/ui/page-header/page-header.component";

@Component({
  selector: 'app-categories',
  imports: [ DynamicTableComponent, PageHeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
    private readonly _categoriesService=inject(CategoriesService);
    private readonly _toastrService=inject(ToastrService);
    private readonly _router = inject(Router);
  
    destroy$ = new Subject<void>();
    categories: any[] = [];
    title = signal<string>("All Categories");
  featureName = signal<string>("Add a new category");
  
    columns: TableColumn[] = [
      { field: 'name', header: 'Name', type: 'text' },
      { field: 'productsCount', header: 'Products', type: 'text' },
      { field: 'actions', header: 'Actions', type: 'actions' }
    ];

    ngOnInit(): void {
      this.loadCategories();
    }

    loadCategories(): void {
      this._categoriesService.getCategories().pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.categories = res.categories.map(cat => ({
            ...cat,
            id: cat._id,
            productsCount: `${cat.productsCount} products`
          }));
        },
        error: () => {
          this._toastrService.error('Failed to load categories');
        }
      });
    }

    addNewCategory(): void {
      this._router.navigate(["addCategory"]);
    }

    onEdit(id: string): void {
      this._router.navigate(['/updateCategory', id]);
    }
    
    onDelete(id: string): void {
      this._categoriesService.deleteCategory(id).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this._toastrService.success('Category deleted successfully');
          this.loadCategories();
        },
        error: () => {
          this._toastrService.error('Failed to delete category');
        }
      })
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete(); 
    }
}

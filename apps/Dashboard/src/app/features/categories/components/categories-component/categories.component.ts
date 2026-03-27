import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../services/categories/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { DynamicTableComponent } from '../../../../shared/components/ui/dynamic-table/dynamic-table.component';
import { TableColumn } from '../../../../shared/interfaces/tableColumn/table-column';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, DynamicTableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
    private readonly _categoriesService=inject(CategoriesService);
    private readonly _toastrService=inject(ToastrService);
    private readonly _router = inject(Router);
  
    destroy$ = new Subject<void>();
    categories: any[] = [];
  
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
            productsCount: `${cat.productsCount || 0} products`
          }));
        },
        error: () => {
          this._toastrService.error('Failed to load categories');
        }
      });
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

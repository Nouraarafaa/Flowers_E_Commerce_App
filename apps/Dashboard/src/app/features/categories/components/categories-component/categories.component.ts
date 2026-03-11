import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../../../core/services/categories/categories.service';
import { TableColumn } from '../../../../shared/interfaces/tableColumn/table-column';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { DynamicTableComponent } from '../../../../shared/components/ui/dynamic-table/dynamic-table.component';

interface CategoryUI extends Category {
  id: string;
  products: string;
}

@Component({
  selector: 'app-categories',
  imports: [PageHeaderComponent, DynamicTableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService);

  categories: CategoryUI[] = [];
  columns: TableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'products', header: 'Products' },
    { field: 'actions', header: '', type: 'actions' }
  ];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories.map(cat => ({
          ...cat,
          id: cat._id,
          products: `${cat.productsCount || 0} products`
        }));
      }
    });
  }

  onAdd(): void {
    console.log('Add category');
  }

  onEdit(id: string): void {
    console.log('Edit category', id);
  }

  onDelete(id: string): void {
    console.log('Delete category', id);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { OccasionsService, Occasion } from '../../../../core/services/occasions/occasions.service';
import { TableColumn } from '../../../../shared/interfaces/tableColumn/table-column';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { DynamicTableComponent } from '../../../../shared/components/ui/dynamic-table/dynamic-table.component';

interface OccasionUI extends Occasion {
  id: string;
  products: string;
}

@Component({
  selector: 'app-occassions',
  imports: [PageHeaderComponent, DynamicTableComponent],
  templateUrl: './occassions.component.html',
  styleUrl: './occassions.component.scss',
})
export class OccassionsComponent implements OnInit {
  private readonly _occasionsService = inject(OccasionsService);

  occasions: OccasionUI[] = [];
  columns: TableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'products', header: 'Products' },
    { field: 'actions', header: '', type: 'actions' }
  ];

  ngOnInit(): void {
    this.loadOccasions();
  }

  loadOccasions(): void {
    this._occasionsService.getOccasions().subscribe({
      next: (res) => {
        this.occasions = res.occasions.map(occasion => ({
          ...occasion,
          id: occasion._id,
          products: `${occasion.productsCount || 0} products`
        }));
      }
    });
  }

  onAdd(): void {
    console.log('Add occasion');
  }

  onEdit(id: string): void {
    console.log('Edit occasion', id);
  }

  onDelete(id: string): void {
    console.log('Delete occasion', id);
  }
}


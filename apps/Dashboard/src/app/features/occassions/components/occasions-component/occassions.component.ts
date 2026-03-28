import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router} from '@angular/router';
import { OccassionService } from '../../services/occassion.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DynamicTableComponent } from '../../../../shared/components/ui/dynamic-table/dynamic-table.component';
import { TableColumn } from '../../../../shared/interfaces/tableColumn/table-column';
import { PageHeaderComponent } from "apps/Dashboard/src/app/shared/components/ui/page-header/page-header.component";

@Component({
  selector: 'app-occassions',
  imports: [ DynamicTableComponent, PageHeaderComponent],
  templateUrl: './occassions.component.html',
  styleUrl: './occassions.component.scss',
})
export class OccassionsComponent implements OnInit, OnDestroy {
  private readonly _occassionService = inject(OccassionService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _router = inject(Router);

  destroy$ = new Subject<void>();
  occasions: any[] = [];
  title = signal<string>("All Occasions");
  featureName = signal<string>("Add a new occasion");

  columns: TableColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'productsCount', header: 'Products', type: 'text' },
    { field: 'actions', header: 'Actions', type: 'actions' }
  ];

  ngOnInit(): void {
    this.loadOccasions();
  }

  loadOccasions(): void {
    this._occassionService.getOccassions().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.occasions = res.occasions.map(occ => ({
          ...occ,
          id: occ._id,
          productsCount: `${occ.productsCount} products`
        }));
        console.log(this.occasions);
        
      },
      error: () => {
        this._toastrService.error('Failed to load occasions');
      }
    });
  }
  addNewOccasion(): void {
    this._router.navigate(["addOccasion"]);
  }
  onEdit(id: string): void {
    this._router.navigate(['/updateOccassion', id]);
  }

  onDelete(id: string): void {
    this._occassionService.deleteOccassion(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this._toastrService.success('Occasion deleted successfully');
        this.loadOccasions();
      },
      error: () => {
        this._toastrService.error('Failed to delete occasion');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

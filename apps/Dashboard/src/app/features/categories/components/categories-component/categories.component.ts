import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../services/categories/categories.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
    private readonly _categoriesService=inject(CategoriesService);
    private readonly _toastrService=inject(ToastrService);
  
    destroy$ = new Subject<void>();
    
    
    deleteCategory(id:string){
      this._categoriesService.deleteCategory(id).pipe(takeUntil(this.destroy$)).subscribe({
        next:()=>{
          this._toastrService.success('Category deleted successfully');
        }
      })
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete(); 
    }
}

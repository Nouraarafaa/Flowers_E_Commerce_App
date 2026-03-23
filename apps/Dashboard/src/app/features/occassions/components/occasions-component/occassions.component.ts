import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OccassionService } from '../../services/occassion.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-occassions',
  imports: [RouterLink],
  templateUrl: './occassions.component.html',
  styleUrl: './occassions.component.scss',
})
export class OccassionsComponent implements OnDestroy{
  private readonly _occassionService=inject(OccassionService);
  private readonly _toastrService=inject(ToastrService);

  destroy$ = new Subject<void>();
  
  deleteOccasion(id:string){
    this._occassionService.deleteOccassion(id).pipe(takeUntil(this.destroy$)).subscribe({
      next:()=>{
        this._toastrService.success('Occasion deleted successfully');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); 
  }
}

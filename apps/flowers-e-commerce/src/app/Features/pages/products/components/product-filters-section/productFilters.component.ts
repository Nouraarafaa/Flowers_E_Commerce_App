import { Component, inject, input, signal } from '@angular/core';
import { Category, Occasion } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';
import { FilterNameComponent } from "../filter-name/filterName.component";
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Store } from '@ngrx/store';
import * as ProductActions from 'apps/flowers-e-commerce/src/app/Core/store/products/products.actions';
import { Slider } from 'primeng/slider';


@Component({
  selector: 'app-product-filters',
  imports: [FilterNameComponent, SlicePipe, FormsModule, Rating , Slider],
  templateUrl: './productFilters.component.html',
  styleUrl: './productFilters.component.scss',
})
export class ProductFiltersComponent {
  categoryFilters = input.required<Category[]>();
  occasionFilters = input.required<Occasion[]>();
  selectedCategoryIds = signal<string[]>([]);
  selectedOccasionIds = signal<string[]>([]);
 
  rangeValues: number[] = [0,100];

  starsNumsSelected!: number;

  private readonly _store = inject(Store);



  filterByCategory(category: Category) {
    this.selectedCategoryIds.update(currentIds => {
      const id = category._id;
      if (currentIds.includes(id)) {
        // If ID is already present, remove it (deselect)
        return currentIds.filter((existingId) => existingId !== id);
      } else {
        // If ID is not present, add it (select)
        return [...currentIds, id];
      }
    });
    // console.log(this.selectedCategoryIds());
  }
filterByOccasion(occasion: Occasion) {
  this.selectedOccasionIds.update((currentIds) => {
    const id = occasion._id;
    return currentIds.includes(id)
      ? currentIds.filter((existingId) => existingId !== id)
      : [...currentIds, id];
  });

  this._store.dispatch(
    ProductActions.setFilters({
      filters: {
        occasion: this.selectedOccasionIds().length
          ? this.selectedOccasionIds()
          : null,
      },
    })
  );
}



  filterByPrice() {
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          minPrice: this.rangeValues[0],
          maxPrice: this.rangeValues[1]
        }
      })
    );
  }

  convertRangeToNumber(index: 0 | 1) {
    const value = this.rangeValues[index];

    if (typeof value === 'string') {
      let numericValue = parseFloat(value);
      
      if (numericValue < 0) numericValue = 0;
      if (numericValue > 2000) numericValue = 2000;
      
      if (!isNaN(numericValue)) {
        this.rangeValues[index] = numericValue;
        
        this.rangeValues = [...this.rangeValues]; 
        
        this.filterByPrice(); 
      }
    }
  }

  filterByRating() {
    console.log(this.starsNumsSelected);
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          starRating:this.starsNumsSelected
        }
      })
    );
  }
  



resetCategory() {
  // console.log(this.selectedCategoryIds());
  this.selectedCategoryIds.set([]);
  console.log(this.selectedCategoryIds());


}

resetOccasion() {
  this.selectedOccasionIds.set([]);
  this._store.dispatch(
    ProductActions.setFilters({
      filters: { occasion: null },
    })
  );
}

resetRating() { /* empty */ }

resetPrice() { /* empty */ }

resetAllfilters() {
  // reset all filters

}



}
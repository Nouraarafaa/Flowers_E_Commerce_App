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
  imports: [FilterNameComponent, SlicePipe, FormsModule, Rating, Slider],
  templateUrl: './productFilters.component.html',
  styleUrl: './productFilters.component.scss',
})
export class ProductFiltersComponent {
  categoryFilters = input.required<Category[]>();
  occasionFilters = input.required<Occasion[]>();
  selectedCategoryIds = signal<string[]>([]);
  selectedOccasionIds = signal<string[]>([]);

  rangeValues: number[] = [0, 0];

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
    this.selectedOccasionIds.update(currentIds => {
      const id = occasion._id;
      if (currentIds.includes(id)) {
        // If ID is already present, remove it (deselect)
        return currentIds.filter(existingId => existingId !== id);
      } else {
        // If ID is not present, add it (select)
        return [...currentIds, id];
      }
    });

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
    let value = this.rangeValues[index];

    if (typeof value === 'string') {
      let numericValue = parseFloat(value);

      // 1. Check bounds against [min] and [max] (2000 in your case)
      if (numericValue < 0) numericValue = 0;
      if (numericValue > 2000) numericValue = 2000;

      if (!isNaN(numericValue)) {
        // 2. Update the value in the existing array
        this.rangeValues[index] = numericValue;

        // 3. CRITICAL STEP: Replace the array with a new copy.
        // This forces Angular and the p-slider component to re-render.
        this.rangeValues = [...this.rangeValues];

        // Optional: Call your filter function immediately if desired
        this.filterByPrice();
      }
    }
  }

  filterByRating() {
    console.log(this.starsNumsSelected);
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          starRating: this.starsNumsSelected
        }
      })
    );
  }











  resetCategory() {
    // console.log(this.selectedCategoryIds());
    this.selectedCategoryIds.set([]);
    console.log(this.selectedCategoryIds());


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
    let value = this.rangeValues[index];

    if (typeof value === 'string') {
      let numericValue = parseFloat(value);
      
      // 1. Check bounds against [min] and [max] (2000 in your case)
      if (numericValue < 0) numericValue = 0;
      if (numericValue > 2000) numericValue = 2000;
      
      if (!isNaN(numericValue)) {
        // 2. Update the value in the existing array
        this.rangeValues[index] = numericValue;
        
        // 3. CRITICAL STEP: Replace the array with a new copy.
        // This forces Angular and the p-slider component to re-render.
        this.rangeValues = [...this.rangeValues]; 
        
        // Optional: Call your filter function immediately if desired
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
  

  resetRating() {
    this.starsNumsSelected = 0;
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          starRating: this.starsNumsSelected
        }
      })
    );
    this.starsNumsSelected = 0;
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          starRating: this.starsNumsSelected
        }
      })
    );


  resetPrice() {
    this.rangeValues=[0,0]
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          minPrice: null,
          maxPrice: null
        }
      })
    );



  }



}

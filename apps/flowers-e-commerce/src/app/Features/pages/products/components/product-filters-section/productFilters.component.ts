import { Component, inject, input, signal } from '@angular/core';
import { Category, Occasion, } from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { FilterNameComponent } from '../filter-name/filterName.component';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../../../../Core/store/products/products.actions';
import { Slider } from 'primeng/slider';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-product-filters',
  imports: [FilterNameComponent, SlicePipe, FormsModule, Rating, Slider, SelectModule],
  templateUrl: './productFilters.component.html',
  styleUrl: './productFilters.component.scss',
})
export class ProductFiltersComponent {
  categoryFilters = input.required<Category[]>();
  occasionFilters = input.required<Occasion[]>();

  selectedCategoryIds = signal<string[]>([]);
  selectedOccasionIds = signal<string[]>([]);

  rangeValues: number[] = [0, 0];

  starsNumsSelected = 0;

  sortOptions = [
    { label: 'Price: Low to High', value: { sortBy: 'price', sortOrder: 'asc' } },
    { label: 'Price: High to Low', value: { sortBy: 'price', sortOrder: 'desc' } },
    { label: 'Rating: Highest First', value: { sortBy: 'rateAvg', sortOrder: 'desc' } },
    { label: 'Title: A to Z', value: { sortBy: 'title', sortOrder: 'asc' } },
    { label: 'Title: Z to A', value: { sortBy: 'title', sortOrder: 'desc' } },
    { label: 'Category: A to Z', value: { sortBy: 'category', sortOrder: 'asc' } },
    { label: 'Category: Z to A', value: { sortBy: 'category', sortOrder: 'desc' } },
  ];

  selectedSort = signal<{ sortBy: string, sortOrder: string } | null>(null);

  private readonly _store = inject(Store);

  onSortChange(event: { value: { sortBy: string, sortOrder: string } }) {
    const { sortBy, sortOrder } = event.value;
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          sortBy,
          sortOrder: sortOrder as 'asc' | 'desc',
        },
      })
    );
  }


  /* ================= CATEGORY ================= */
  filterByCategory(category: Category) {
    this.selectedCategoryIds.update((currentIds) => {
      const id = category._id;
      if (currentIds.includes(id)) {
        // If ID is already present, remove it (deselect)
        return currentIds.filter((existingId) => existingId !== id);
      } else {
        // If ID is not present, add it (select)
        return [...currentIds, id];
      }
    });

    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          category: this.selectedCategoryIds().length
            ? this.selectedCategoryIds()
            : null,
        },
      })
    );
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
          maxPrice: this.rangeValues[1],
        },
      })
    );

  }

  convertRangeToNumber(index: 0 | 1) {
    const value = this.rangeValues[index];


    if (typeof value === 'string') {
      let numericValue = parseFloat(value);

      // 1. Check bounds against [min] and [max] (5000 in your case)
      if (numericValue < 0) numericValue = 0;
      if (numericValue > 5000) numericValue = 5000;

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
          starRating: this.starsNumsSelected,
        },
      })
    );
  }




  resetCategory() {
    this.selectedCategoryIds.set([]);
    this._store.dispatch(
      ProductActions.setFilters({
        filters: { category: null },
      })
    );
  }

  resetOccasion() {
    this.selectedOccasionIds.set([]);
    this._store.dispatch(
      ProductActions.setFilters({
        filters: { occasion: null },
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

  }

  resetPrice() {
    this.rangeValues = [0, 0];
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          minPrice: null,
          maxPrice: null,
        },
      })
    );
  }

  resetSort() {
    this.selectedSort.set(null);
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          sortBy: null,
          sortOrder: null,
        },
      })
    );
  }

  resetAllfilters() {
    this.selectedCategoryIds.set([]);
    this.selectedOccasionIds.set([]);
    this.starsNumsSelected = 0;
    this.rangeValues = [0, 0];
    this.selectedSort.set(null);
    this._store.dispatch(ProductActions.resetFilters());
  }
}
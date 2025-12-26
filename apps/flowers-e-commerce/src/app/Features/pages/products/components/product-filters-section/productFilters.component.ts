import { Component, inject, input, signal } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Category, Occasion } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';
import { FilterNameComponent } from '../filter-name/filterName.component';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Slider } from 'primeng/slider';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as ProductActions from 'apps/flowers-e-commerce/src/app/Core/store/products/products.actions';

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

  rangeValues: number[] = [0, 2000];
  starsNumsSelected = 0;

  private readonly _store = inject(Store);

  /* ================= CATEGORY ================= */
  filterByCategory(category: Category) {
    this.selectedCategoryIds.update(ids =>
      ids.includes(category._id)
        ? ids.filter(id => id !== category._id)
        : [...ids, category._id]
    );

    this.dispatchFilters();
  }

  resetCategory() {
    this.selectedCategoryIds.set([]);
    this.dispatchFilters();
  }

  /* ================= OCCASION ================= */
  filterByOccasion(occasion: Occasion) {
    this.selectedOccasionIds.update(ids =>
      ids.includes(occasion._id)
        ? ids.filter(id => id !== occasion._id)
        : [...ids, occasion._id]
    );

    this.dispatchFilters();
  }

  /* ================= PRICE ================= */
  filterByPrice() {
    this.dispatchFilters();
  }

  convertRangeToNumber(index: 0 | 1) {
    let value = Number(this.rangeValues[index]);

    if (isNaN(value)) return;

    value = Math.max(0, Math.min(2000, value));
    this.rangeValues[index] = value;
    this.rangeValues = [...this.rangeValues];

    this.filterByPrice();
  }

  resetPrice() {
    this.rangeValues = [0, 2000];
    this.dispatchFilters();
  }

  /* ================= RATING ================= */
  filterByRating() {
    this.dispatchFilters();
  }

  resetRating() {
    this.starsNumsSelected = 0;
    this.dispatchFilters();
  }

  /* ================= DISPATCH ================= */
  private dispatchFilters() {
    this._store.dispatch(
      ProductActions.setFilters({
        filters: {
          categories: this.selectedCategoryIds(),
          occasions: this.selectedOccasionIds(),
          minPrice: this.rangeValues[0],
          maxPrice: this.rangeValues[1],
          starRating: this.starsNumsSelected
        }
      })
    );
  }
}

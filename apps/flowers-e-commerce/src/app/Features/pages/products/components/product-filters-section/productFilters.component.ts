import { Component, input, signal } from '@angular/core';
import { Category, Occasion } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';
import { FilterNameComponent } from "../filter-name/filterName.component";
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';

@Component({
  selector: 'app-product-filters',
  imports: [FilterNameComponent, SlicePipe, FormsModule, Rating],
  templateUrl: './productFilters.component.html',
  styleUrl: './productFilters.component.scss',
})
export class ProductFiltersComponent {
  categoryFilters = input.required<Category[]>();
  occasionFilters = input.required<Occasion[]>();
  selectedCategoryId = signal<string>('');
  selectedOccasionId = signal<string>('');
  priceStartNum!: number;
  priceEndNum!: number;

  starsNumsSelected!: number;



  filterByCategory(category: Category) {
    this.selectedCategoryId.set(category._id);

  }
  filterByOccasion(occasion: Occasion) {
    this.selectedOccasionId.set(occasion._id);

  }

  resetAllfilters() {
    // reset all filters

  }
}

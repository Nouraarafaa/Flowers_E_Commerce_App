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
  selectedCategoryIds = signal<string[]>([]);
  selectedOccasionIds = signal<string[]>([]);
  priceStartNum!: number;
  priceEndNum!: number;

  starsNumsSelected!: number;



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
  resetCategory() {
    // console.log(this.selectedCategoryIds());
    this.selectedCategoryIds.set([]);
    console.log(this.selectedCategoryIds());


  }

  resetOccasion() {

  }

  resetRating() {

  }

  resetPrice() {

  }

  resetAllfilters() {
    // reset all filters

  }
}

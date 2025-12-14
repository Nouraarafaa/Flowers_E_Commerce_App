import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";

export const selectProductState = createFeatureSelector<ProductsState>('products');

export const selectOriginalProducts = createSelector(
    selectProductState,
    (state)=>state.originalProducts
);
export const selectProductFilters = createSelector(
  selectProductState,
  (state) => state.filters
);

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);


export const selectFilteredProducts = createSelector(
  selectOriginalProducts,
  selectProductFilters,
  (products, filters) => {
    // 1. Start with the full list
    let filtered = products;

    // 2. Apply Category Filter
    if (filters.category) {
   
    }

    // 3. Apply Price Filter
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.priceAfterDiscount! >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.priceAfterDiscount! <= filters.maxPrice!);
    }
    // 4. Apply Star Filter
    if (filters.starRating) {
      
    }

    // 4. Apply Search Term Filter
    if (filters.searchTerm) {

    }

    return filtered; // Return the final array
  }
);

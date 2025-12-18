import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

// 🔹 Basic selectors
export const selectOriginalProducts = createSelector(
  selectProductsState,
  (state) => state.originalProducts
);

export const selectFilters = createSelector(
  selectProductsState,
  (state) => state.filters
);

export const selectIsLoading = createSelector(
  selectProductsState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectProductsState,
  (state) => state.error
);

//Filtered Products
export const selectFilteredProducts = createSelector(
  selectOriginalProducts,
  selectFilters,
  (products, filters) => {
    let filtered = [...products];

    // Category
    if (filters.category?.length) {
      filtered = filtered.filter(p =>
        filters.category!.includes(p.category)
      );
    }

    // Occasion
    if (filters.occasion && filters.occasion.length > 0) {
      filtered = filtered.filter(product =>
        filters.occasion!.includes(product.occasion)
      );
    }


    // Min Price
    if (filters.minPrice !== null) {
      filtered = filtered.filter(
        p => p.priceAfterDiscount! >= filters.minPrice!
      );
    }

    // Max Price
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(
        p => p.priceAfterDiscount! <= filters.maxPrice!
      );
    }

    // Rating
    if (filters.starRating !== null) {
      filtered = filtered.filter(
        p => p.rateAvg === filters.starRating
      );
    }

    // Search
    if (filters.searchTerm) { /* empty */ }

    return filtered;
  }
);

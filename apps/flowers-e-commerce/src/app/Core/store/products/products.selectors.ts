import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";

export const selectProductState = createFeatureSelector<ProductsState>('products');


export const selectProductFilters = createSelector(
  selectProductState,
  (state) => state.filters
);

export const selectFilteredProducts = createSelector(
  selectProductState,
  (state) => state.filteredProducts
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error
);

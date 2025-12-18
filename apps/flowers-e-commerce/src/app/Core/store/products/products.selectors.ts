import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";
import { Product } from "../../../Shared/interfaces/HomeResponse/home-response";

export const selectProductState = createFeatureSelector<ProductsState>('products');

export const selectOriginalProducts = createSelector(
    selectProductState,
    (state)=>state.originalProducts
);


export const selectProductFilters = createSelector(
  selectProductState,
  (state) => state.filters
);

export const selectFilteredProducts = createSelector(
  selectProductState,
  (state) => state.filteredProducts
);


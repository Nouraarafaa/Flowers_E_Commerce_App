import { createAction, props } from "@ngrx/store";
import { Product } from "../../../Shared/interfaces/HomeResponse/home-response";
import { ProductFilters } from "./products.state";

export const loadProducts = createAction(
    '[products] Load Products');

export const setProducts = createAction(
    '[products] set Products',
    props<{ products: Product[] }>());

export const setFilters = createAction(
    '[Product List] Set Filters',
    props<{ filters: Partial<ProductFilters> }>());

export const resetFilters = createAction(
    '[Products] Reset Filters');

export const setLoading = createAction(
    '[products] set Loading',
    props<{ Loading: boolean }>());

export const sortProducts = createAction(
    '[Products] Sort Products',
    props<{ sortBy: string }>()
);

export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{ error: string }>()
);
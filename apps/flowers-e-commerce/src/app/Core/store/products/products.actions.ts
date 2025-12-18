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


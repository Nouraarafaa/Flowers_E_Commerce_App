import { createAction, props } from '@ngrx/store';
import { Product } from '../../../Shared/interfaces/HomeResponse/home-response';
import { ProductFilters } from './products.state';

// Start loading
export const loadProducts = createAction(
    '[Products] Load Products'
);

// Success
export const loadProductsSuccess = createAction(
    '[Products] Load Products Success',
    props<{ products: Product[] }>()
);

// Failure
export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{ error: string }>()
);

// Update Filters
export const setFilters = createAction(
    '[Products] Set Filters',
    props<{ filters: Partial<ProductFilters> }>()
);

export const sortProducts = createAction(
    '[Products] Sort Products',
    props<{ sortBy: string }>()
);

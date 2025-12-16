import { createReducer, on } from '@ngrx/store';
import { initialProductsState } from './products.state';
import {
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure,
    setFilters,
} from './products.actions';

export const productsReducer = createReducer(
    initialProductsState,

    // Loading
    on(loadProducts, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    // Success
    on(loadProductsSuccess, (state, { products }) => ({
        ...state,
        originalProducts: products,
        isLoading: false,
    })),

    // Failure
    on(loadProductsFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),

    // Filters
    on(setFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters,
        },
    }))
);

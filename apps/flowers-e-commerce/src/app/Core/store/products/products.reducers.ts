import { createReducer, on } from '@ngrx/store';
import { initialProductsState } from './products.state';
import {
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure,
    setFilters,
    sortProducts,
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
        products: products,
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
    })),

    // Sort Products
    on(sortProducts, (state, { sortBy }) => {
        let sortedProducts = [...state.products];
        if (sortBy === 'priceLowHigh') {
            sortedProducts = sortedProducts.sort(
                (a, b) => (a.priceAfterDiscount || 0) - (b.priceAfterDiscount || 0)
            );
        }
        return {
            ...state,
            products: sortedProducts,
        };
    })
);

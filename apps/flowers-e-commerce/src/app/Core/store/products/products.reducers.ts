import { createReducer, on } from "@ngrx/store";
import { initialProductsState } from "./products.state";
import { resetFilters, setFilters, setLoading, setProducts } from "./products.actions";

export const productsReducer = createReducer(
    initialProductsState,
    on(setProducts, (state, { products }) => ({
        ...state,
        originalProducts: products,
        filteredProducts: products

    })),

    on(setFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters, // Merge new filters with existing ones
        }

    })),

    on(resetFilters, (state) => ({
        ...state,
        filters: {
            minPrice: null,
            maxPrice: null,
            category: null,
            occasion: null,
            searchTerm: null,
            starRating: null
        },

        filteredProducts: [...state.originalProducts]
    })),

    on(setLoading, (state, { Loading }) => ({
        ...state,
        isLoading: Loading
    }))
)
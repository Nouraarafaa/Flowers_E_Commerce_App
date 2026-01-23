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

    on(setFilters, (state, { filters }) => {
        const updatedFilters = {
            ...state.filters,
            ...filters
        };

        const filtered = state.originalProducts.filter(product => {

            //  (Category)
            const matchesCategory = updatedFilters.category
                ? updatedFilters.category.includes(product.category)
                : true;

            //  (Occasion)
            const matchesOccasion = updatedFilters.occasion
                ? updatedFilters.occasion.includes(product.occasion)
                : true;

            //  (Min & Max)
            const matchesMinPrice = updatedFilters.minPrice
                ? (product.priceAfterDiscount ?? 0) >= updatedFilters.minPrice
                : true;

            const matchesMaxPrice = updatedFilters.maxPrice
                ? (product.priceAfterDiscount ?? 0) <= updatedFilters.maxPrice
                : true;

            //  (Stars)
            const matchesStars = updatedFilters.starRating
                ? (product.rateAvg ?? 0) === updatedFilters.starRating
                : true;

            //  (Search Term)
            const matchesSearch = updatedFilters.searchTerm
                ? product.title?.toLowerCase().includes(updatedFilters.searchTerm.toLowerCase())
                : true;

            // Combine all conditions
            return matchesCategory && matchesOccasion && matchesMinPrice && matchesMaxPrice && matchesStars && matchesSearch;
        });

        return {
            ...state,
            filters: updatedFilters,
            filteredProducts: filtered
        };
    }),

    on(resetFilters, (state) => ({
        ...state,
        filters: initialProductsState.filters,
        filteredProducts: [...state.originalProducts]
    })),
    on(setLoading, (state, { Loading }) => ({
        ...state,
        isLoading: Loading
    }))
    
)
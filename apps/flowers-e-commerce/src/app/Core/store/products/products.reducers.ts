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

        let filtered = state.originalProducts.filter(product => {

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

        // Apply Sorting
        if (updatedFilters.sortBy) {
            filtered = [...filtered].sort((a, b) => {
                let valA: string | number;
                let valB: string | number;

                switch (updatedFilters.sortBy) {
                    case 'price':
                        valA = a.priceAfterDiscount ?? a.price;
                        valB = b.priceAfterDiscount ?? b.price;
                        break;
                    case 'rateAvg':
                        valA = a.rateAvg ?? 0;
                        valB = b.rateAvg ?? 0;
                        break;
                    case 'title':
                        valA = a.title?.toLowerCase() ?? '';
                        valB = b.title?.toLowerCase() ?? '';
                        break;
                    case 'category':
                        valA = a.category?.toLowerCase() ?? '';
                        valB = b.category?.toLowerCase() ?? '';
                        break;
                    default:
                        return 0;
                }

                if (valA < valB) return updatedFilters.sortOrder === 'desc' ? 1 : -1;
                if (valA > valB) return updatedFilters.sortOrder === 'desc' ? -1 : 1;
                return 0;
            });
        }

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
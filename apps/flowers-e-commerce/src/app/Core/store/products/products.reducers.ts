import { createReducer, on } from "@ngrx/store";
import { initialProductsState } from "./products.state";
<<<<<<< HEAD
import { resetFilters, setFilters, setLoading, setProducts } from "./products.actions";
=======
import { setFilters, setProducts} from "./products.actions";
>>>>>>> 7d45d4f69a32575f7cff71dcd821b95bbfd277f0

export const productsReducer = createReducer(
    initialProductsState,
    on(setProducts, (state, { products }) => ({
        ...state,
<<<<<<< HEAD
        originalProducts: products,
        filteredProducts: products

    })),

=======
        originalProducts: products

    })),
   
>>>>>>> 7d45d4f69a32575f7cff71dcd821b95bbfd277f0
    on(setFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters, // Merge new filters with existing ones
        }
<<<<<<< HEAD

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
=======
        
    })),
>>>>>>> 7d45d4f69a32575f7cff71dcd821b95bbfd277f0
)
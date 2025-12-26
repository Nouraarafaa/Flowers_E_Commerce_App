import { createReducer, on } from "@ngrx/store";
import { initialProductsState } from "./products.state";
import { setFilters, setProducts} from "./products.actions";

export const productsReducer = createReducer(
    initialProductsState,
    on(setProducts, (state, { products }) => ({
        ...state,
        originalProducts: products

    })),
   
    on(setFilters, (state, { filters }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...filters, // Merge new filters with existing ones
        }
        
    })),
)

import { Product } from '../../../Shared/interfaces/HomeResponse/home-response';

export interface ProductFilters {
    category: string[] | null;
    occasion: string[] | null;
    minPrice: number | null;
    maxPrice: number | null;
    starRating: number | null;
    searchTerm: string | null;
}

export interface ProductsState {
    originalProducts: Product[];
    filters:ProductFilters;
    isLoading:boolean;
    error:string|null;
}

export const initialProductsState: ProductsState = {
    originalProducts: [],
    filters:{ 
        category: null,
        occasion: null,
        minPrice: null,
        maxPrice: null,
        starRating: null,
        searchTerm: null,
    },
    isLoading:false,
    error:null
}

import { Product } from "../../../Shared/interfaces/HomeResponse/home-response";

export interface ProductFilters {
  category: string [] | null;
  occasion: string [] | null;
  minPrice: number | null;
  maxPrice: number | null;
  starRating: number | null;
  searchTerm: string | null;
}

export interface ProductsState{
    products:Product[];
    filters:ProductFilters;
    isLoading:boolean;
    error:string|null;
}


export const initialProductsState:ProductsState={
    products:[],
    filters:{
        category:null,
        occasion:null,
        minPrice:null,
        maxPrice:null,
        starRating:null,
        searchTerm:null
    },
    isLoading:false,
    error:null
}
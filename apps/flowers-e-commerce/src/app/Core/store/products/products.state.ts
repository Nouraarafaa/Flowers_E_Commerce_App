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
    originalProducts: Product[];
    products:Product[];
    filters:ProductFilters|null;
    isLoading:boolean;
    error:string|null;
}


export const initialProductsState:ProductsState={
    originalProducts: [],
    products:[],
    filters:null,
    isLoading:false,
    error:null
}
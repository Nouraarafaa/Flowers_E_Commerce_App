import { Product } from "./HomeResponse/home-response";

export interface Review {
    _id?: string;
    product?: string | Product;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        photo?: string;
    };
    title?: string;
    text?: string;
    rating: number;
    createdAt?: string; 
}

export interface AddProduct {
    title: string;
    description: string;
    price: number;
    discount: number;
    priceAfterDiscount: number;
    quantity: number;
    category: string;
    occasion: string;
    imgCover: File;
    images: File[];
}
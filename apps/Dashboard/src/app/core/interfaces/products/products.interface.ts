export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  category: { _id: string; name: string };
  occasion: { _id: string; name: string };
  sold: number;
  rateAvg: number;
  rateCount: number;
  id: string;
}

export interface ProductsResponse {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number;
  };
  products: Product[];
}

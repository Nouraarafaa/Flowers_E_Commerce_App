export interface ProductsResponse {
  message: string;
  metadata: Metadata;
  products: Product[];
}

export interface Product {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold?: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: null;
  isInWishlist: boolean;
  discount?: number;
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}
export interface GetProduct {
  message: string;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
  rateCount: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  favoriteId: string | null;
  isInWishlist: boolean;
  discount: number;
  sold?: number;
}

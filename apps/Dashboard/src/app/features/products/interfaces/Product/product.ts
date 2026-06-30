export interface Product {
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
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rateAvg: number;
  rateCount: number;

  discount?: number;
  sold?: number;
  id?: string;

  favoriteId?: string | null;
  isInWishlist?: boolean;

  reviews?: any[];
}

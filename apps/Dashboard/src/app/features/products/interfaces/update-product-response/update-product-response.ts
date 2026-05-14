export interface UpdateProductResponse {
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
  discount: number;
  rateAvg: number;
  rateCount: number;
  sold: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: any[];
  id: string;
}

export interface CartResponse {
  message: string;
  numOfCartItems: number;
  cart: Cart;
}

export interface Cart {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: any[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  discount?: number;
  rateAvg: number;
  rateCount: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  sold?: number;
}
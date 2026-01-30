export interface CashResponse {
  message: string;
  order: Order;
}

export interface Order {
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
}

export interface OrderItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
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
  sold: number;
  id: string;
}

export interface GetUserOrderResponse {
  message: string;
  metadata: Metadata;
  orders: Order[];
}


export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}
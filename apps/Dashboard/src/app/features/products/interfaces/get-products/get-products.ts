import { Product } from "../Product/product";

export interface GetProducts {
  message: string;
  metadata: Metadata;
  products: Product[];
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}


export interface CategoriesResponse {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  categories: Category[];
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productsCount?: number;
}

export interface CategoryResponse {
  message: string;
  category: CategoryData;
}

export interface CategoryData {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
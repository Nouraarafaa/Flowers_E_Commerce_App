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

export interface AddCategoryResponse {
  message: string;
  category: AddCategory;
}

export interface AddCategory {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
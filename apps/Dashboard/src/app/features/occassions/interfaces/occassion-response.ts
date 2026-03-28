export interface OccassionResponse {
  message: string
  metadata: Metadata
  occasions: Occasion[]
}
export interface Metadata {
  currentPage: number
  limit: number
  totalPages: number
  totalItems: number
}
export interface Occasion {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  isSuperAdmin: boolean
  productsCount: number
}


export interface DeleteOccassionResponse {
  message: string;
  document: Document;
}
export interface Document {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
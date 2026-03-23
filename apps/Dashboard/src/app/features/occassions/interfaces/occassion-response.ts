export interface OccassionResponse {
  message: string;
  occasion: Occasion;
}

export interface Occasion {
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
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
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
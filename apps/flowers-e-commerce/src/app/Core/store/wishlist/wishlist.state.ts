import { Product } from "../../../Features/pages/wishlist/interfaces/wishlist";

export interface WishlistState {
  wishlist:Product[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  ids: string[]
}

export const initialWishlistState: WishlistState = {
  wishlist: [],
  isLoading: false,
  error: null,
  successMessage: null,
  ids: []
};
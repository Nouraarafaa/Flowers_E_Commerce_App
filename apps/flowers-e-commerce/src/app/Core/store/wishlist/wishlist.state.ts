export interface WishlistState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialWishlistState: WishlistState = {
  isLoading: false,
  error: null,
  successMessage: null
};

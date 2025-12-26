import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.state';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectIsWishlistLoading = createSelector(
  selectWishlistState,
  (state) => state.isLoading
);

export const selectWishlistError = createSelector(
  selectWishlistState,
  (state) => state.error
);

export const selectWishlistSuccessMessage = createSelector(
  selectWishlistState,
  (state) => state.successMessage
);

export const selectWishlistIds = createSelector(
  selectWishlistState,
  (state) => state.ids
);

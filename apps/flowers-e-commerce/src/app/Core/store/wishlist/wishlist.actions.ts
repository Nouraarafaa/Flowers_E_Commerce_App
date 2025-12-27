import { createAction, props } from '@ngrx/store';

export const addToWishlist = createAction(
  '[Wishlist] Add To Wishlist',
  props<{ productId: string }>()
);

export const addToWishlistSuccess = createAction(
  '[Wishlist] Add To Wishlist Success',
  props<{ message: string; productId: string }>()
);

export const addToWishlistFailure = createAction(
  '[Wishlist] Add To Wishlist Failure',
  props<{ error: string }>()
);

export const removeFromWishlist = createAction(
  '[Wishlist] Remove From Wishlist',
  props<{ productId: string }>()
);

export const removeFromWishlistSuccess = createAction(
  '[Wishlist] Remove From Wishlist Success',
  props<{ message: string; productId: string }>()
);

export const removeFromWishlistFailure = createAction(
  '[Wishlist] Remove From Wishlist Failure',
  props<{ error: string }>()
);
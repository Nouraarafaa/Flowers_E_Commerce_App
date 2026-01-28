import { createAction, props } from '@ngrx/store';
import { Product } from './../../../Features/pages/wishlist/interfaces/wishlist';

export const loadWishlist = createAction(
'[Wishlist] load Wishlist');

export const loadWishlistError = createAction(
'[Wishlist] Load Error',
  props<{ error: string }>());

export const setWishlist = createAction(
'[Wishlist] set Wishlist',
  props<{ products: Product[] }>());

export const addToWishlist = createAction(
  '[Wishlist] Add To Wishlist',
  props<{ product: Product }>()
);

export const addToWishlistSuccess = createAction(
  '[Wishlist] Add To Wishlist Success',
  props<{ message: string; product: Product }>()
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

export const clearWishlist = createAction(
  '[Wishlist] Remove From Wishlist Failure'
);
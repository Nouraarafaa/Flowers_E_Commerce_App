import { createReducer, on } from '@ngrx/store';
import { initialWishlistState } from './wishlist.state';
import {
  addToWishlist,
  addToWishlistFailure,
  addToWishlistSuccess,
  removeFromWishlist,
  removeFromWishlistFailure,
  removeFromWishlistSuccess,
} from './wishlist.actions';

export const wishlistReducer = createReducer(
  initialWishlistState,
  on(addToWishlist, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    successMessage: null
  })),
  on(addToWishlistSuccess, (state, { message }) => ({
    ...state,
    isLoading: false,
    successMessage: message
  })),
  on(addToWishlistFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
    successMessage: null
  })),
  on(removeFromWishlist, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    successMessage: null
  })),
  on(removeFromWishlistSuccess, (state, { message }) => ({
    ...state,
    isLoading: false,
    successMessage: message
  })),
  on(removeFromWishlistFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  }))
);

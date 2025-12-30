import { createReducer, on } from '@ngrx/store';
import { initialWishlistState } from './wishlist.state';
import {
  addToWishlist,
  addToWishlistFailure,
  addToWishlistSuccess,
  clearWishlist,
  loadWishlistError,
  removeFromWishlist,
  removeFromWishlistFailure,
  removeFromWishlistSuccess,
  setWishlist,
} from './wishlist.actions';

export const wishlistReducer = createReducer(
  initialWishlistState,
  on(setWishlist, (state, { products }) => ({
    ...state,
    wishlist: products
  })),

  on(loadWishlistError, (state, { error }) => ({
    ...state,
    error: error
  })),

  on(addToWishlist, (state ,{product}) => ({
    ...state,
    isLoading: true,
    wishlist: [...state.wishlist, product],
    error: null,
    successMessage: null
  })),

  on(addToWishlistSuccess, (state, { message, product }) => ({
    ...state,
    isLoading: false,
    successMessage: message,
    ids: [...state.ids, product._id]
  })),

  on(addToWishlistFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
    successMessage: null
  })),
  
  on(removeFromWishlist, (state, { productId }) => ({
    ...state,
    wishlist: state.wishlist.filter(p => p._id !== productId),
    isLoading: true,
    error: null,
    successMessage: null
  })),

  on(removeFromWishlistSuccess, (state, { message, productId }) => ({
    ...state,
    isLoading: false,
    successMessage: message,
    ids: state.ids.filter(id => id !== productId)
  })),

  on(removeFromWishlistFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
    successMessage: null
  })),

  on(clearWishlist, (state) => ({
  ...state,
  wishlist: initialWishlistState.wishlist, 
  ids: initialWishlistState.ids,
})),

);
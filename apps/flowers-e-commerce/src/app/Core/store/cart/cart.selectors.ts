import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.state";

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
    selectCartState,
    (state) => state?.cart 
);
export const selectCartItems = createSelector(
    selectCartState,
    (state) => state?.cart?.cart?.cartItems || []
);

export const selectCartError = createSelector(
    selectCartState,
    (state) => state.error
);
import { createReducer, on } from "@ngrx/store";
import { initialCartState } from "./cart.state";
import { loadCartError, setCart } from "./cart.actions";


export const cartReducer = createReducer(
  initialCartState,
  on(setCart, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(loadCartError, (state, { error }) => ({
    ...state,
    error
  }))
);
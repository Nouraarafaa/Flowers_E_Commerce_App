
import { createAction, props } from "@ngrx/store";
import { CartItem, CartResponse } from "../../../Features/pages/cart/interfaces/cart";

export const loadCart = createAction(
  '[Cart] load Cart');


export const setCart = createAction(
  '[Cart] set Cart',
  props<{ cart: CartResponse }>());

export const loadCartError = createAction(
  '[Cart] load Cart Error',
  props<{ error: string }>());
import { CartItem, CartResponse } from "../../../Features/pages/cart/interfaces/cart";

export interface CartState {
  cart:CartResponse | null;
  error:string | null;
 
}

export const initialCartState: CartState = {
  cart: null,
  error: null
};
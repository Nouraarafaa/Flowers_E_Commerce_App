import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { CartService} from '../../../Features/pages/cart/services/cart-service/cart-service';
import { loadCart, loadCartError, setCart } from './cart.actions';

@Injectable()
export class CartEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _cartService = inject(CartService);

  loadCartProducts = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCart),
      switchMap(() =>
        this._cartService.getLoggedUserCart().pipe(
          map((data) => setCart({ cart:data })),
          tap((data) => {
            console.log('Cart Data:', data);
          }),
          catchError((error) => {
            console.error('Cart Error:', error);
            return of(loadCartError({ error: error.message }));
          })
        )
      )
    )
  );

 
}
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WishlistService } from '../../../Features/services/wishlist/wishlist.service';
import {
  addToWishlist,
  addToWishlistFailure,
  addToWishlistSuccess,
  removeFromWishlist,
  removeFromWishlistFailure,
  removeFromWishlistSuccess,
} from './wishlist.actions';
import { catchError, map, switchMap, of } from 'rxjs';

@Injectable()
export class WishlistEffects {
  private readonly actions$ = inject(Actions);
  private readonly wishlistService = inject(WishlistService);

  addToWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToWishlist),
      switchMap(({ productId }) =>
        this.wishlistService.addToWishlist(productId).pipe(
          map((response) => addToWishlistSuccess({ message: response.message, productId })),
          catchError((error) => of(addToWishlistFailure({ error: error.message })))
        )
      )
    )
  );

  removeFromWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromWishlist),
      switchMap(({ productId }) =>
        this.wishlistService.removeFromWishlist(productId).pipe(
          map((response) => removeFromWishlistSuccess({ message: response.message, productId })),
          catchError((error) => of(removeFromWishlistFailure({ error: error.message })))
        )
      )
    )
  );
}
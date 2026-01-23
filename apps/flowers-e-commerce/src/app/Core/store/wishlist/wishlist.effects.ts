import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WishlistService } from '../../../Features/pages/wishlist/services/wishlist.service';
import {
  addToWishlist,
  addToWishlistFailure,
  addToWishlistSuccess,
  clearWishlist,
  loadWishlist,
  loadWishlistError,
  removeFromWishlist,
  removeFromWishlistFailure,
  removeFromWishlistSuccess,
  setWishlist,
} from './wishlist.actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';

@Injectable()
export class WishlistEffects {
  private readonly actions$ = inject(Actions);
  private readonly wishlistService = inject(WishlistService);

  loadWishlistProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWishlist),
      switchMap(() =>
        this.wishlistService.getWishlistProducts().pipe(
          map((data) => setWishlist({ products: data.wishlist.products })),
          catchError((error) => {
            console.error('Wishlist Error:', error);
            return of(loadWishlistError({ error: error.message }));
          })
        )
      )
    )
  );

  addToWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToWishlist),
      switchMap(({ product }) =>
        this.wishlistService.addToWishlist(product._id).pipe(
          map((response) => addToWishlistSuccess({ message: response.message, product })),
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

  clearWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearWishlist),
      switchMap(() =>
        this.wishlistService.clearWishlist().pipe(
          map(() => {
            return loadWishlist();
          }),
          catchError((error) => of(loadWishlistError({ error: error.message })))
        )
      )
    )
  );
}
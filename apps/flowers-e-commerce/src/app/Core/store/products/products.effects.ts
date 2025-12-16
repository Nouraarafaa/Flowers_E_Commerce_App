import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { HomeService } from '../../../Shared/services/home/home.service';
import {
    loadProducts,
    loadProductsSuccess,
    loadProductsFailure,
} from './products.actions';

@Injectable()
export class productsEffects {
    private readonly actions$ = inject(Actions);
    private readonly homeService = inject(HomeService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            switchMap(() =>
                this.homeService.getHomeDetails().pipe(
                    map((data) => {
                        const sortedProducts = [...data.products].sort(
                            (a, b) => a.priceAfterDiscount! - b.priceAfterDiscount!
                        );

                        return loadProductsSuccess({ products: sortedProducts });
                    }),
                    catchError(() =>
                        of(loadProductsFailure({ error: 'Failed to load products' }))
                    )
                )
            )
        )
    );
}

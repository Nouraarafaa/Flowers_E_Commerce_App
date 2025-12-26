import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { HomeService } from "../../../Shared/services/home/home.service";
import { loadProducts, setProducts } from "./products.actions";
import { Product } from "../../../Shared/interfaces/product";



@Injectable()
export class productsEffects {
    private readonly _homeService = inject(HomeService);
    _action = inject(Actions);
    callApi = createEffect(
        () => this._action.pipe(
            ofType(loadProducts),
            switchMap(() =>
                this._homeService.getHomeDetails().pipe(
                    tap((data) => {
                        const productsArray = data.products;

                        // 2. Sort the products array by price (Low to High)
                        productsArray.sort((a: Product, b: Product) => a.priceAfterDiscount! - b.priceAfterDiscount!);

                        return data;
                    }),
                    map((data) => setProducts({ products: data.products }))
                )
            )
        )
    );

} 

import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap} from "rxjs";
import { HomeService } from "../../../Shared/services/home/home.service";
import { loadProducts, setProducts } from "./products.actions";



@Injectable()
export class productsEffects{
   private readonly _homeService=inject(HomeService);
    _action=inject(Actions);
    callApi = createEffect(
        ()=>this._action.pipe(
            ofType(loadProducts),
            switchMap(()=>
            this._homeService.getHomeDetails().pipe(
                tap((data)=>{
                    console.log('log From Effect');
                    console.log(data.products);
                }),
                map((data)=> setProducts({ products: data.products }))
            )
            )
        )
    )
} 
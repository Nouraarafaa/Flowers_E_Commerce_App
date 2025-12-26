import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BASE_URL } from '@elevate-workspace/auth';
import { environment } from './Core/environments/environment.prod';
import { headerInterceptor } from './Core/interceptors/header/header.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsReducer } from './Core/store/products/products.reducers';
import { productsEffects } from './Core/store/products/products.effects';
import { wishlistReducer } from './Core/store/wishlist/wishlist.reducers';
import { WishlistEffects } from './Core/store/wishlist/wishlist.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: "top" }), withViewTransitions()),
        provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
            },
        }),
        {
            provide: BASE_URL,
            useValue: environment.BaseUrl
        },
        {
            provide: BASE_URL,
            useValue: environment.BaseUrl
        },
        provideStore({
            products: productsReducer,
            wishlist: wishlistReducer
        }),
        provideEffects([productsEffects, WishlistEffects])
    ],
};

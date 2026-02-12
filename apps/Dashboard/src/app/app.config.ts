import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
<<<<<<< HEAD
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
=======
import { provideRouter } from '@angular/router';
>>>>>>> 9dd2d06c75ccbb892ed7bdc787e07cf1380bccb1
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BASE_URL } from '@elevate-workspace/auth';
import { environment } from './core/environments/environment.prod';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: "top" }), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: BASE_URL,
      useValue: environment.BaseUrl
    },

  ],
};

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BASE_URL } from '@elevate-workspace/auth';
import { environment } from './Core/environments/environment.prod';
import { headersInterceptor } from './Core/interceptors/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withHashLocation(), withInMemoryScrolling( {scrollPositionRestoration: "top"} ), withViewTransitions()),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: BASE_URL,
      useValue: environment.BaseUrl
    }
  ],
};

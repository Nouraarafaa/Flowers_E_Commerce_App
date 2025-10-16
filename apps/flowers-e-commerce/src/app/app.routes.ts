import { Route } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth_layout/auth_layout.component';
import { MainLayoutComponent } from './core/layouts/main_layout/main_layout.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './features/auth/forget_password/forget_password.component'
          ).then((m) => m.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [],
  },
];

import { Route } from '@angular/router';
import { loggedGuard } from './Core/guards/logged/logged.guard';
import { authGuard } from './Core/guards/auth/auth.guard';


export const appRoutes: Route[] = [
    {
        path: "", loadComponent: () => import('./Core/layouts/main-layout/main-layout.component').then((c) => c.MainLayoutComponent), children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", loadComponent: () => import('./Features/pages/home/home.component').then((c) => c.HomeComponent), title: "Home" },
            { path: "products", loadComponent: () => import('./Features/pages/products/components/products/products.component').then((c) => c.ProductsComponent), title: "Products" },
            { path: "categories", loadComponent: () => import('./Features/pages/categories/categories.component').then((c) => c.CategoriesComponent), title: "Categories" },
            { path: "occasions", loadComponent: () => import('./Features/pages/occasions/occasions.component').then((c) => c.OccasionsComponent), title: "Occasions" },
            { path: "contact", loadComponent: () => import('./Features/pages/contact/contact.component').then((c) => c.ContactComponent), title: "Contact" },
            { path: "about", loadComponent: () => import('./Features/pages/about/about.component').then((c) => c.AboutComponent), title: "About" },
            { path:"profile", canActivate: [authGuard], loadComponent: () => import('./Features/pages/ProfileMe/profile/profile.component').then((c) => c.ProfileComponent), children: [
                { path: "", redirectTo: "update-profile", pathMatch: "full" },
                { path:"update-profile", loadComponent: () => import('./Features/pages/ProfileMe/update-profile/update-profile.component').then((c) => c.UpdateProfileComponent), title:"Update Profile" },
                { path:"change-password", loadComponent: () => import('./Features/pages/ProfileMe/change-password/change-password.component').then((c) => c.ChangePasswordComponent), title:"Change Password" }
            ] },
        ]
    },
    {
        path: "", canActivate: [loggedGuard], loadComponent: () => import('./Core/layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent), children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", loadComponent: () => import('./Core/pages/login/login.component').then((c) => c.LoginComponent), title: "Login" },
            { path: "register", loadComponent: () => import('./Core/pages/register/register.component').then((c) => c.RegisterComponent), title: "Register" },
            { path: "forgot-password", loadComponent: () => import('./Core/pages/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent), title: "Forgot Password" }
        ]
    }


];


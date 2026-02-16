import { Route } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard/admin.guard';

export const appRoutes: Route[] = [
    {
        path: "", loadComponent: () => import('./core/layout/main-layout/main-layout-component/mainLayout.component').then((c) => c.MainLayoutComponent), canActivate: [adminGuard], children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", loadComponent: () => import('./features/dashboard/components/dashboard-component/dashboard.component').then((c) => c.DashboardComponent), title: "Dashboard" },
            { path: "categories", loadComponent: () => import('./features/categories/components/categories-component/categories.component').then((c) => c.CategoriesComponent), title: "Categories" },
            { path: "products", loadComponent: () => import('./features/products/components/products-component/products.component').then((c) => c.ProductsComponent), title: "Products" },
            { path: "occasions", loadComponent: () => import('./features/occassions/components/occasions-component/occassions.component').then((c) => c.OccassionsComponent), title: "Occasions" },
            { path: "update-profile", loadComponent: () => import('@elevate/profile').then((c) => c.ProfileFeatureComponent), title: "Update Profile" },
        ]
    }
];

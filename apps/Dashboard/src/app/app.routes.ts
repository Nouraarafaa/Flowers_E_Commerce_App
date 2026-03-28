import { Route } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard/admin.guard';

export const appRoutes: Route[] = [
    {
        path: "", loadComponent: () => import('./core/layout/main-layout/main-layout-component/mainLayout.component').then((c) => c.MainLayoutComponent),canActivate: [adminGuard] ,children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", loadComponent: () => import('./features/dashboard/components/dashboard-component/dashboard.component').then((c) => c.DashboardComponent), title: "Dashboard" },
            { path: "products", loadComponent: () => import('./features/products/products/products.component').then( (c)=> c.ProductsComponent ), title:"products"},
            { path: "products/add", loadComponent: () => import('./features/products/components/add-product/add-product.component').then( (c)=> c.AddProductComponent ), title:"Add Product"},
            { path: "categories", loadComponent: () => import('./features/categories/components/categories-component/categories.component').then((c) => c.CategoriesComponent), title: "Categories" },
            { path: "occasions", loadComponent: () => import('./features/occassions/components/occasions-component/occassions.component').then((c) => c.OccassionsComponent), title: "Occasions" },
            { path: "update-profile", loadComponent: () => import('@elevate/profile').then((c) => c.ProfileFeatureComponent), title: "Update Profile" },
            { path: "addCategory", loadComponent: () => import('./features/categories/components/addCategory/addCategory.component').then((c) => c.AddCategoryComponent), title: "Add Category" },
            { path: "updateCategory/:id", loadComponent: () => import('./features/categories/components/updateCategory/updateCategory.component').then((c) => c.UpdateCategoryComponent), title: "Update Category" },
            { path: "addOccasion", loadComponent: () => import('./features/occassions/components/addOccassion/addOccassion.component').then((c) => c.AddOccassionComponent), title: "Add Occasion" },
            { path: "updateOccassion/:id", loadComponent: () => import('./features/occassions/components/updateOccassion/updateOccassion.component').then((c) => c.UpdateOccassionComponent), title: "Update Occasion" },
        ]
    },
    { path: "not-found", loadComponent: () => import('./core/components/error-pages/not-found/not-found.component').then(c => c.NotFoundComponent), title: "Not Found" },
    { path: "server-down", loadComponent: () => import('./core/components/error-pages/server-down/server-down.component').then(c => c.ServerDownComponent), title: "Server Down" },
    // { path: "not-auth", loadComponent: () => import('./core/components/error-pages/not-auth/not-auth.component').then(c => c.NotAuthComponent), title: "Not Authorized" },
    { path: "**", redirectTo: "not-found" }
];

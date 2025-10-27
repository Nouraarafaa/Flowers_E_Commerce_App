import { Route } from '@angular/router';
import { loggedGuard } from './Core/guards/logged/logged.guard';
import { authGuard } from './Core/guards/auth/auth.guard';


export const appRoutes: Route[] = [

    { path:"", canActivate:[loggedGuard], loadComponent:()=> import('./Core/layouts/auth-layout/auth-layout.component').then( (c)=> c.AuthLayoutComponent ), children:[
        { path:"", redirectTo:"login", pathMatch:"full"},
        { path:"login", loadComponent:()=> import('./Core/pages/login/login.component').then( (c)=>c.LoginComponent), title:"Login" },
        { path:"register", loadComponent:()=> import('./Core/pages/register/register.component').then( (c)=>c.RegisterComponent), title:"Register" },
        { path:"forgot-password", loadComponent:()=> import('./Core/pages/forgot-password/forgot-password.component').then( (c)=>c.ForgotPasswordComponent), title:"Forgot Password" }
    ]},
    { path:"", canActivate:[authGuard], loadComponent:()=> import('./Core/layouts/main-layout/main-layout.component').then( (c)=> c.MainLayoutComponent ), children:[
        {path:"", redirectTo:"home", pathMatch:"full"},
        {path:"home", loadComponent:() => import('./Features/pages/home/home.component').then( (c)=> c.HomeComponent ), title:"Home"}
    ] }

];
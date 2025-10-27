import { Component } from '@angular/core';
import { AuthIntroComponent } from "./components/auth-intro/auth-intro.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthIntroComponent, RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}

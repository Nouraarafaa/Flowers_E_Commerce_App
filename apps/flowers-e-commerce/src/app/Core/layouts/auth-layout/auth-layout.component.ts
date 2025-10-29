import { Component } from '@angular/core';
import { AuthIntroComponent } from "./components/auth-intro/auth-intro.component";
import { RouterModule } from "@angular/router";
import { DecorTopComponent } from "../../../Shared/components/ui/decor-top/decor-top.component";
import { DecorBottomComponent } from "../../../Shared/components/ui/decor-bottom/decor-bottom.component";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthIntroComponent, RouterModule, DecorTopComponent, DecorBottomComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}

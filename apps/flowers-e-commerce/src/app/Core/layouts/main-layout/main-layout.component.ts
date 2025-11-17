import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { NavSideBarComponent } from "../../../shared/components/nav-side-bar/navSideBar.component";
import { NavigationBarComponent } from "../../../shared/components/navigation-bar/navigationBar.component";


@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, NavbarComponent, NavSideBarComponent, NavigationBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}

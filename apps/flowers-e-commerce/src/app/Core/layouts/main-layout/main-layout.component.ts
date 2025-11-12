import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { NavSideBarComponent } from "../../../shared/components/nav-side-bar/navSideBar.component";


@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, NavbarComponent, NavSideBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}

import { Component } from '@angular/core';
import { SideBarComponent } from "../components/side-bar/components/side-bar-component/sideBar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [SideBarComponent, RouterModule],
  templateUrl: './mainLayout.component.html',
  styleUrl: './mainLayout.component.scss',
})
export class MainLayoutComponent {}

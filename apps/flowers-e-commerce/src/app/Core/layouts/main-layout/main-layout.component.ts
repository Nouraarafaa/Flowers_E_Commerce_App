import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}

import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from "../Components/sidebar/sidebar.component";

@Component({
  selector: 'app-profile',
  imports: [RouterModule, SidebarComponent, DrawerModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  visible = false;
}

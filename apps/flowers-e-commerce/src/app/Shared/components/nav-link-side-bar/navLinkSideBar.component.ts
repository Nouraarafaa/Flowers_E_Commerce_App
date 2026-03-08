import { Component, EventEmitter, input, Output} from '@angular/core';
import { Ripple } from 'primeng/ripple';
import { NavIconComponent } from "../nav-icon/navIcon.component";
import { RouterLink } from '@angular/router';
import { environment } from '../../../Core/environments/environment';

@Component({
  selector: 'app-nav-link-side-bar',
  imports: [Ripple, NavIconComponent,RouterLink],
  templateUrl: './navLinkSideBar.component.html',
  styleUrl: './navLinkSideBar.component.scss',
})
export class NavLinkSideBarComponent {
  type =input.required<string>();
  pageNameSideBar=input<string>();
  iconNameSideBar=input<string>();
  itemsCheckSideBar=input<number>();
  navLinkName=input.required<string>();
  userStatusSidebar=input<string>();
  dashboardUrl = environment.dashboardUrl;
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}

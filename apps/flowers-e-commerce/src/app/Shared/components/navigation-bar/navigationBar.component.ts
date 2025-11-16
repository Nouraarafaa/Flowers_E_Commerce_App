import { Component } from '@angular/core';
import { NavigationLinkComponent } from "../navigation-link/navigationLink.component";

@Component({
  selector: 'app-navigation-bar',
  imports: [NavigationLinkComponent],
  templateUrl: './navigationBar.component.html',
  styleUrl: './navigationBar.component.scss',
})
export class NavigationBarComponent {
  navigationLinks: {
    navLinkName: string,
    pagePath: string,
    icon:string
  }[] = [
      {
        navLinkName: 'home',
        pagePath: '/home',
        icon:'pi-home'
      },
      {
        navLinkName: 'products',
        pagePath: '/products',
        icon:'pi-gift'
      },
      {
        navLinkName: 'categories',
        pagePath: '/categories',
        icon:'pi-clipboard'
      },
      {
        navLinkName: 'occasions',
        pagePath: '/occasions',
        icon:'pi-sparkles'
      },
      {
        navLinkName: 'contact',
        pagePath: '/contact',
        icon:'pi-headphones'
      },
      {
        navLinkName: 'about',
        pagePath: '/about',
        icon:'pi-info-circle'
      },
    ]
}

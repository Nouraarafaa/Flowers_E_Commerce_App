import { Component, OnInit, input, output } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { RouterLink } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { NavIconComponent } from '../nav-icon/navIcon.component';


@Component({
  selector: 'app-navbar',
  imports: [RippleModule, NgIf, Menu, Toolbar, ButtonModule, InputTextModule, IconField, InputIcon, RouterLink, NavIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {


  userLoggedNavBar = input.required<boolean>();
  firstNameNavBar = input.required<string>();
  lastNameNavBar = input.required<string>();
  userCityNavBar = input.required<string>();
  wihlistItemsNavBar = input.required<number>();
  cartItemsNavBar = input.required<number>();
  notificationNumNavBar = input.required<number>();

  clicked = output<void>();

  items: MenuItem[] | undefined;


  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {

        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-user',

          },
          {
            label: 'My Addresses',
            icon: 'pi pi-map-marker',

          },
          {
            label: 'My Orders',
            icon: `svg-order-icon`,


          },
          {
            label: 'Dashboard',
            icon: 'pi pi-cog',

          },
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.onClick(); // Call your function here
            }

          }
        ]
      }
    ];

  }


  onClick() {
    this.clicked.emit();
  }

}

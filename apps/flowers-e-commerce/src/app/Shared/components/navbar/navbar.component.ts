import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Router, RouterLink } from "@angular/router";
import { NavIconComponent } from "../nav-icon/navIcon.component";
import { AuthService } from '@elevate-workspace/auth';
import { map, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { HttpClient } from '@angular/common/http';
import { locationResponse } from '../../../Core/interfaces/location/location.response';
import { LocationAdaptorService } from '../../../Core/adaptor/location-adaptor/location-adaptor.service';


@Component({
  selector: 'app-navbar',
  imports: [RippleModule, NgIf, Menu, Toolbar, ButtonModule, InputTextModule, IconField, InputIcon, RouterLink, NavIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {


  userLoggedNavBar = input.required<boolean>();
  firstNameNavBar = input.required<string>();
  lastNameNavBar = input.required<string>();
  userCityNavBar = input.required<string>();
  wihlistItemsNavBar = input.required<number>();
  cartItemsNavBar = input.required<number>();
  notificationNumNavBar = input.required<number>();

  
  logoutSubs!: Subscription;


  private readonly _authService = inject(AuthService);
 
  private readonly _router = inject(Router);

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
              this.logoutUser(); // Call your function here
            }

          }
        ]
      }
    ];

  }

  

  logoutUser(): void {
    this.logoutSubs = this._authService.logout().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.removeItem('flowersEcommerceToken')
          this._router.navigate(['/login']);

        }

      }
    })
  }

  ngOnDestroy(): void {
    
    this.logoutSubs?.unsubscribe();
  }

}

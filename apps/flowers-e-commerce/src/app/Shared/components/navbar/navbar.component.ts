import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Router, RouterLink } from "@angular/router";
import { NavIconComponent } from "../nav-icon/navIcon.component";
import { AuthService } from '@elevate-workspace/auth';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  imports: [RippleModule, NgIf, Menu, Toolbar, ButtonModule, InputTextModule, IconField, InputIcon, RouterLink, NavIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {


  userLogged!: boolean;
  wihlistItems: number = 0;
  cartItems: number = 0;
  notificationNum: number = 0;
  firstName: string = '';
  lastName: string = '';
  getLoggedUserDataSubs!: Subscription;
  logoutSubs!: Subscription;
  userCity:string='';

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _httpClient = inject(HttpClient);
  items: MenuItem[] | undefined;


  ngOnInit() {

    this.getUserStatus();

    this.getUserLocation();

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

  getUserStatus() {
    if (localStorage.getItem('flowersEcommerceToken')) {
      this.userLogged = true;
      this.getUserName();
    }
  }

  getUserName(): void {
    this.getLoggedUserDataSubs = this._authService.getLoggedUserData().subscribe({
      next: (res) => {
        this.firstName = res.user.firstName;
        this.lastName = res.user.lastName;

      }
    })
  }

  getUserLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {

      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
       let apiKey='8aba345824be4346b0596cdf6fce6d6f'; // I obtained this key after logging into the website "https://www.geoapify.com"
      let type = 'city';
      let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=${type}&format=json&apiKey=${apiKey}`
      console.log(latitude,longitude);

     
      this._httpClient.get(url).subscribe({
        next:(res)=>{
 this.userCity = ;
        }
      })
     
      console.log(this.userCity);
      
    })
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
    this.getLoggedUserDataSubs?.unsubscribe();
    this.logoutSubs?.unsubscribe();
  }

}

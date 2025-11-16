import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { RouterLink } from "@angular/router";
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
import { environment } from '../../../Core/environments/environment';


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
  getUserCitySubs!: Subscription;
  logoutSubs!: Subscription;
  userCity: string = '';

  private readonly _authService = inject(AuthService);
  private readonly _locationAdaptorService = inject(LocationAdaptorService);
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

      //Convert Coordinates to City (Reverse Geocoding) using Geoapify

      let apiKey = environment.geoapifyApiKey; // I obtained this key after logging into the website "https://www.geoapify.com"
      let type = 'city';

      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=${type}&format=json&apiKey=${apiKey}`; // this Api was obtained from this link https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/


      this.getUserCitySubs=this._httpClient.get<locationResponse>(url)
        .pipe(map((res) => this._locationAdaptorService.adapt(res)))
        .subscribe({
          next: (res) => {
          
            this.userCity = res.city;
            console.log(this.userCity);

          }
        })


    })
  }

  logoutUser(): void {
    this.logoutSubs = this._authService.logout().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.removeItem('flowersEcommerceToken');
          window.location.reload();
        }

      }
    })
  }

  ngOnDestroy(): void {
    this.getLoggedUserDataSubs?.unsubscribe();
    this.logoutSubs?.unsubscribe();
    this.getUserCitySubs?.unsubscribe();
  }

}

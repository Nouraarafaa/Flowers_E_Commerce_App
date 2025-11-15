import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Drawer } from 'primeng/drawer';
import { AuthService } from '@elevate-workspace/auth';
import { map, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { locationResponse } from '../../../Core/interfaces/location/location.response';
import { LocationAdaptorService } from '../../../Core/adaptor/location-adaptor/location-adaptor.service';
import { Router } from '@angular/router';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { NavLinkSideBarComponent } from "../nav-link-side-bar/navLinkSideBar.component";
import { Dialog } from 'primeng/dialog';
import { ButtonComponent } from "../ui/button/button.component";


@Component({
  selector: 'app-nav-side-bar',
  imports: [Dialog, DrawerModule, ButtonModule, Ripple, InputTextModule, IconField, InputIcon, NavLinkSideBarComponent, ButtonComponent],
  templateUrl: './navSideBar.component.html',
  styleUrl: './navSideBar.component.scss',
})
export class NavSideBarComponent implements OnInit, OnDestroy {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  visible: boolean = false;
  userLogged!: boolean;
  getLoggedUserDataSubs!: Subscription;
  firstName: string = '';
  lastName: string = '';
  userCity: string = '';
  wihlistItems: number = 0;
  cartItems: number = 0;
  notificationNum: number = 0;
  userPhoto: string = '';
  logoutSubs!: Subscription;

  visibleDialog: boolean = false;
  private readonly HIDE_THRESHOLD = 768;



  private readonly _authService = inject(AuthService);
  private readonly _locationAdaptorService = inject(LocationAdaptorService);
  private readonly _router = inject(Router);
  private readonly _httpClient = inject(HttpClient);



  ngOnInit() {
    this.checkScreenSize();
    this.getUserStatus();
    this.getUserLocation();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth > this.HIDE_THRESHOLD) {
    
      this.visible = false;
    }
  }
  
  openDrawer(): void {
    if (window.innerWidth <= this.HIDE_THRESHOLD) {
      this.visible = true;
    }
  }

  getUserStatus() {
    if (localStorage.getItem('flowersEcommerceToken')) {
      this.userLogged = true;
      this.getUserNameAndPhoto();
    }
  }

  getUserNameAndPhoto(): void {
    this.getLoggedUserDataSubs = this._authService.getLoggedUserData().subscribe({
      next: (res) => {
        this.firstName = res.user.firstName;
        this.lastName = res.user.lastName;
        this.userPhoto = res.user.photo;

      }
    })
  }
  getUserLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {

      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      //Convert Coordinates to City (Reverse Geocoding) using Geoapify

      let apiKey = '8aba345824be4346b0596cdf6fce6d6f'; // I obtained this key after logging into the website "https://www.geoapify.com"
      let type = 'city';

      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=${type}&format=json&apiKey=${apiKey}`; // this Api was obtained from this link https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/


      this._httpClient.get<locationResponse>(url)
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
          localStorage.removeItem('flowersEcommerceToken')
          this._router.navigate(['/login']);

        }

      }
    })
  }

  showDialog() {
    this.visibleDialog = true;
  }
  giftSearch(){
    // code write here
  }

  ngOnDestroy(): void {
    this.getLoggedUserDataSubs?.unsubscribe();
    this.logoutSubs?.unsubscribe();

  }





}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from '../../../Shared/components/navbar/navbar.component';
import { NavSideBarComponent } from "../../../Shared/components/nav-side-bar/navSideBar.component";
import { NavigationBarComponent } from "../../../Shared/components/navigation-bar/navigationBar.component";
import { map, Subscription } from 'rxjs';
import { AuthService } from '@elevate-workspace/auth';
import { LocationAdaptorService } from '../../adaptor/location-adaptor/location-adaptor.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { locationResponse } from '../../interfaces/location/location.response';
import { FooterComponent } from "../../pages/footer/footer.component";


@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, NavbarComponent, NavSideBarComponent, NavigationBarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  userLogged!: boolean;
  firstName: string = '';
  lastName: string = '';
  userPhoto: string = '';
  userCity: string = '';
  wihlistItems: number = 0;
  cartItems: number = 0;
  notificationNum: number = 0;
  getLoggedUserDataSubs!: Subscription;
  getUserCitySubs!: Subscription;
  logoutSubs!: Subscription;

  private readonly _authService = inject(AuthService);
  private readonly _locationAdaptorService = inject(LocationAdaptorService);
  private readonly _httpClient = inject(HttpClient);
  



  ngOnInit(): void {
    this.getUserStatus();
    this.getUserLocation();
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

      let apiKey = environment.geoapifyApiKey; // I obtained this key after logging into the website "https://www.geoapify.com"
      let type = 'city';

      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=${type}&format=json&apiKey=${apiKey}`; // this Api was obtained from this link https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/


      this.getUserCitySubs = this._httpClient.get<locationResponse>(url)
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

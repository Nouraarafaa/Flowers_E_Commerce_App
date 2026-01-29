import { Component, inject, input, OnDestroy, OnInit, output, signal, WritableSignal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { Address } from '../../interfaces/address';
import { AsyncPipe } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@elevate-workspace/auth';
import { FormInputComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/form-input/form-input.component";
import { ErrorMessageComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/error-message/error-message.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { UserAddressesService } from '../../services/user-addresses-service/user-addresses.service';
import { ToastrService } from 'ngx-toastr';
import { UserAddressesComponent } from "../user-address-modal/userAddresses.component";

@Component({
  selector: 'app-address-modal',
  imports: [ReactiveFormsModule, Dialog, AsyncPipe, StepsModule, ButtonComponent, FormInputComponent, ErrorMessageComponent, GoogleMapsModule, UserAddressesComponent],
  templateUrl: './addressModal.component.html',
  styleUrl: './addressModal.component.scss',
})
export class AddressModalComponent implements OnInit, OnDestroy {
  userAddressesInput$ = input<Observable<Address[]>>(of([]));
  hide = output();
  items: MenuItem[] | undefined;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _userAddressesService = inject(UserAddressesService);
  private readonly _toastrService = inject(ToastrService);



  dialogType: 'My addresses' | 'Add a new address' | 'Update address info' = 'My addresses';
  
  visible: boolean = true;
  active: number = 0;
  userName: string = '';
  isCallingAPI: WritableSignal<boolean> = signal(false);
  getLoggedUserDataSubs$!: Subscription;
 addAddressSubs$!: Subscription;



  addressForm: FormGroup = this._formBuilder.group({
    street: [null, [Validators.required, Validators.pattern(/^[0-9a-zA-Z\s.,-]{10,100}$/)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  }
  );

  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  zoom = 12;
  marker: { lat: number, lng: number } = this.center;

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: this.zoom
  };


  ngOnInit(): void {
    this.items = [
      {
        label: ''
      },
      {
        label: ''
      }
    ];

    this.getUserLocation();
    this.getUserName();

  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {

      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      this.center = { lat: latitude, lng: longitude };
      this.marker = { lat: latitude, lng: longitude };

      this.mapOptions = {
        center: this.center,
        zoom: this.zoom
      };
    });
  }

  getUserName() {
    this.getLoggedUserDataSubs$ = this._authService.getLoggedUserData().subscribe({
      next: (res) => {
        this.userName = `${res.user.firstName} ${res.user.lastName}`;
      }
    })

  }

  navigationToGoogleMapToDetermineLocation() {
    this.isCallingAPI.set(false);
    this.active = 1;
  }

  addressFormSubmit() {
    if (this.addressForm.valid) {
      this.isCallingAPI.set(true);
      this.navigationToGoogleMapToDetermineLocation();
    }
  }



  onMapClick(event: google.maps.MapMouseEvent) {
    const lat = event.latLng?.lat()!;
    const lng = event.latLng?.lng()!;

    // console.log(lat, lng);
    this.marker = {
      lat,
      lng
    };
  }

  hideDialog() {
    this.hide.emit();
  }

  addNewAddress() {
    this.dialogType = 'Add a new address';
  }

  editAddress(addressId: string) {
    this.dialogType = 'Update address info';
    console.log('edit address id', addressId);
  }

  deleteAddress(addressId: string) {
    console.log('delete address id', addressId);
  }

  saveAddress() {
    const payload = {
      street: this.addressForm.get('street')?.value,
      phone: this.addressForm.get('phone')?.value,
      city: this.addressForm.get('city')?.value,
      lat: (this.marker.lat).toString(),
      long: (this.marker.lng).toString(),
      username: this.userName
    };
    console.log('payload', payload);
    this._toastrService.success('Address added successfuly');
    this.addAddressSubs$ = this._userAddressesService.addAddress(payload).subscribe({
      next:(res)=>{
        console.log(res);
        setTimeout(()=>{
          this.isCallingAPI.set(false);
          this.hideDialog();
        },1000);
       
        
      }
    });
    

  }


  ngOnDestroy(): void {
    this.getLoggedUserDataSubs$?.unsubscribe();
    this.addAddressSubs$?.unsubscribe();
  }



}

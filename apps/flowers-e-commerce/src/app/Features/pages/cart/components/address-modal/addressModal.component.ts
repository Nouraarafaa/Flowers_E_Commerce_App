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

@Component({
  selector: 'app-address-modal',
  imports: [ReactiveFormsModule, Dialog, AsyncPipe, StepsModule, ButtonComponent, FormInputComponent, ErrorMessageComponent],
  templateUrl: './addressModal.component.html',
  styleUrl: './addressModal.component.scss',
})
export class AddressModalComponent implements OnInit, OnDestroy {
  userAddressesInput$ = input<Observable<Address[]>>(of([]));
  hide = output();
  items: MenuItem[] | undefined;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);



  dialogType: 'My addresses' | 'Add a new address' | 'Update address info' = 'Add a new address'; 
  // don't forget to change default value to 'My addresses'
  visible: boolean = true;
  active: number = 0;
  userName: string = '';
  isCallingAPI: WritableSignal<boolean> = signal(false);
  getLoggedUserDataSubs$!: Subscription;



  addressForm: FormGroup = this._formBuilder.group({
    // street: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]{5,}$/)]],
    // phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    // city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    street: [null],
    phone: [null],
    city: [null],
  }
  );


  ngOnInit(): void {
    this.items = [
      {
        label: ''
      },
      {
        label: ''
      }
    ];
  }

  addressFormSubmit() {
    if (this.addressForm.valid) {
      this.isCallingAPI.set(true);
      this.getUserName();
    }
  }

  getUserName() {
    this.getLoggedUserDataSubs$ = this._authService.getLoggedUserData().subscribe({
      next: (res) => {
        this.userName = `${res.user.firstName} ${res.user.lastName}`;
        this.determineGoogleLocation(this.userName);
      }
    })

  }

  determineGoogleLocation(userName: string) {
    this.isCallingAPI.set(false);
    console.log("addressForm valid", this.addressForm.value);
    console.log("User Name:", userName);




    this.active = 1;
    // const payload = {
    //   street: this.addressForm.get('street')?.value,
    //   phone: this.addressForm.get('phone')?.value,
    //   city: this.addressForm.get('city')?.value,
    // };
  }


  hideDialog() {
    this.hide.emit();
  }

  addNewAddress() {
    this.dialogType = 'Add a new address';
  }

  editAddress(addressId: string) {
    this.dialogType = 'Update address info';
  }

  deleteAddress(addressId: string) {

  }

  ngOnDestroy(): void {
    this.getLoggedUserDataSubs$?.unsubscribe();
  }



}

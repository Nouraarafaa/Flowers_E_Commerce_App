import { Component, input, OnInit, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Observable, of } from 'rxjs';
import { Address } from '../../interfaces/address';
import { AsyncPipe } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component";

@Component({
  selector: 'app-address-modal',
  imports: [Dialog, AsyncPipe, StepsModule, ButtonComponent],
  templateUrl: './addressModal.component.html',
  styleUrl: './addressModal.component.scss',
})
export class AddressModalComponent implements OnInit{
  visible: boolean = true;
  userAddressesInput$ = input<Observable<Address[]>>(of([]));
  hide = output();
  dialogType: 'My addresses' | 'Add a new address' | 'Update address info' = 'Add a new address';
  active: number = 0;
  items: MenuItem[] | undefined;

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
  determineGoogleLocation(){
    this.active=1;
  }



}

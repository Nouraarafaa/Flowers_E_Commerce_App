import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserAddressesService } from '../../services/user-addresses-service/user-addresses.service';
import { Address } from '../../interfaces/address';


@Component({
  selector: 'app-shipping-addresses',
  imports: [AsyncPipe],
  templateUrl: './shippingAddresses.component.html',
  styleUrl: './shippingAddresses.component.scss',
})
export class ShippingAddressesComponent{

  userAddressesInput$=input<Observable<Address[]>>(of([]));
  userSelectedAddressflag=output<boolean>();
  OnAddNewAddress=output<void>();

  // Define a variable to track selection
  selectedAddressId: string | null = null;

  // Method to handle the click
  selectAddress(addressId: string) {
    this.selectedAddressId = addressId;
    this.userSelectedAddressflag.emit(false);
  }

  addNewAddress() {
    this.OnAddNewAddress.emit();
    // Implementation for adding a new address
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  addressSelectedObject=output<Address>();

  // Define a variable to track selection
  selectedAddressId: string | null = null;

  // Method to handle the click
  selectAddress(address:Address) {
    this.selectedAddressId = address._id;
    this.addressSelectedObject.emit(address);
    this.userSelectedAddressflag.emit(false);
  }

  addNewAddress() {
    this.OnAddNewAddress.emit();
  }
}

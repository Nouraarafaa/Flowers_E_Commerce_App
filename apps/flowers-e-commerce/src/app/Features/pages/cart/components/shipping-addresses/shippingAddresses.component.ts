import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserAddressesService } from '../../services/user-addresses-service/user-addresses.service';
import { Address } from '../../interfaces/address';
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component";


@Component({
  selector: 'app-shipping-addresses',
  imports: [AsyncPipe, ButtonComponent],
  templateUrl: './shippingAddresses.component.html',
  styleUrl: './shippingAddresses.component.scss',
})
export class ShippingAddressesComponent{

  userAddressesInput$=input<Observable<Address[]>>(of([]));
  userSelectedAddressflag=output<boolean>();

  // Define a variable to track selection
  selectedAddressId: string | null = null;

  // Method to handle the click
  selectAddress(addressId: string) {
    this.selectedAddressId = addressId;
    this.userSelectedAddressflag.emit(false);
  }

  addNewAddress() {
    // Implementation for adding a new address
  }
}

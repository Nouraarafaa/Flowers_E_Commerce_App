import { Component, input, output } from '@angular/core';
import { Address } from '../../interfaces/address';

@Component({
  selector: 'app-user-addresses',
  imports: [],
  templateUrl: './userAddresses.component.html',
  styleUrl: './userAddresses.component.scss',
})
export class UserAddressesComponent {
  dialogTypeInput = input<string>();
  userAddressesInput = input<Address[]>();
  addAddressClicked = output<void>();
  editAddressClicked = output<string>();
  deleteAddressClicked = output<string>();

  onAddNewAddress() {
    this.addAddressClicked.emit();
  }
  onEditAddress(addressId: string) {
    this.editAddressClicked.emit(addressId);
  }
  onDeleteAddress(addressId: string) {
    this.deleteAddressClicked.emit(addressId);
  }

}

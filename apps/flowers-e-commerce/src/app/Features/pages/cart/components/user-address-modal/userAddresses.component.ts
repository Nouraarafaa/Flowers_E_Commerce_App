import { Component, inject, input, output } from '@angular/core';
import { Address } from '../../interfaces/address';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-user-addresses',
  imports: [ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './userAddresses.component.html',
  styleUrl: './userAddresses.component.scss',
})
export class UserAddressesComponent {
  dialogTypeInput = input<string>();
  userAddressesInput = input<Address[]>();
  addAddressClicked = output<void>();
  editAddressClicked = output<Address>();
  deleteAddressClicked = output<string>();
  deleteAddressConfirmed = output<boolean>();
  closeModal = output<boolean>();
  confirmationService = inject(ConfirmationService);

  onAddNewAddress() {
    this.addAddressClicked.emit();
  }
  onEditAddress(address: Address) {
    this.editAddressClicked.emit(address);
  }
  
  onDeleteAddress(addressId: string) {
    this.deleteAddressClicked.emit(addressId);
    this.deleteAddressConfirmed.emit(true);
  }

   confirmDelete(event: Event, id:string) {
      this.confirmationService.confirm({
          key: 'globalConfirm',
          target: event.target as EventTarget,
          message: 'Are you sure you want to delete this address?',
          header: '',
          icon: '',
          rejectLabel: 'Cancel',
          closable: true,
          closeOnEscape: true,
          dismissableMask: true,
          rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true,
          },
          acceptButtonProps: {
              label: 'Confirm',
              severity: 'danger',
          },
          accept: () => {
            this.onDeleteAddress(id);
          }
      });
  }
  

}

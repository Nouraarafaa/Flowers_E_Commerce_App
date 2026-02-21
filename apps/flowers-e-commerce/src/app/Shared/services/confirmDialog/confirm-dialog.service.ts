import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private readonly confirmationService = inject(ConfirmationService);


    confirm(options: {
    message: string;
    subMessage?: string;
    onAccept: () => void;
    acceptLabel?: string;
    rejectLabel?: string;
  }): void {
    this.confirmationService.confirm({
      message: options.message, 
      header: '',
      icon: 'pi pi-trash',
      closable: true,
      closeOnEscape: true,
      dismissableMask: false,
      rejectButtonProps: {
        label: options.rejectLabel || 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: options.acceptLabel || 'Confirm',
        severity: 'danger',
      },
      accept: options.onAccept
    });
  }


}

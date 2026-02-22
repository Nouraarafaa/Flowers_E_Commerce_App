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
    acceptLabel?: string;
    rejectLabel?: string;
    onAccept: () => void;
  }): void {
    this.confirmationService.confirm({
      key: 'globalConfirm',
      message: {
        main: options.message,
        sub: options.subMessage
      } as any,
      header: '',
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
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

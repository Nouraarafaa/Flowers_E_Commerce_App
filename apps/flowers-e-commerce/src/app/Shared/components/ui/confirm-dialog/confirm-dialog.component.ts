import { Component } from '@angular/core';
import {  ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {}

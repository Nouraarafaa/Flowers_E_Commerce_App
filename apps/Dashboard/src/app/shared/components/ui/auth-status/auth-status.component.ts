import { Component, input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-auth-status',
  imports: [NgClass],
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.scss',
})
export class AuthStatusComponent {
  type = input<'success' | 'error'>('success');
  message = input<string>('');
}

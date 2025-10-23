import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  standalone: true, // Assuming this should be a standalone component
  imports: [],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss'
})
export class ValidationComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input() inputName = '';

  get firstErrorKey(): string | null {
    if (this.control && this.control.errors) {
      const keys = Object.keys(this.control.errors);
      return keys.length > 0 ? keys[0] : null;
    }
    return null;
  }
}
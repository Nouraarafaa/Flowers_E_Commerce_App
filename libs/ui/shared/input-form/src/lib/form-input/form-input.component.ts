import { Component, forwardRef, inject, input, Optional, Self, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
 

})
export class FormInputComponent implements ControlValueAccessor {
  @Optional() @Self() public ngControl = inject(NgControl, { optional: true });

  value = signal<string>('');
  id = input<string>('');
  type = input<string>('');
  disabledFlag = input<boolean>(false);
  placeholder = input<string>('');

  constructor() {
    if (this.ngControl) {
      // ربط المكون بـ Angular Form API يدوياً
      this.ngControl.valueAccessor = this;
    }
  }


  onChange: (value: string) => void = () => {/* */};

  onTouched: () => void = () => {/* */};
  
  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(val: string) {
    this.value.set(val);
    this.onChange(val);
  }
}
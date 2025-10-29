import { NgClass } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [NgClass],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],

})
export class FormInputComponent implements ControlValueAccessor {

  value = signal<string>('');
  id = input<string>('');
  type = input<string>('');
  placeholder = input<string>('');
  nameControl = input<AbstractControl | null>();


  onChange: (value: string) => void = () => {};

  onTouched: () => void = () => {};
  
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
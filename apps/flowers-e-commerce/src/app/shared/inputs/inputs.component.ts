import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ValidationComponent } from "../validation/validation.component";

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true
    }
  ],
  imports: [ValidationComponent]
})
export class InputsComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'number' | 'email' = 'text';
  @Input() placeholder = '';
  @Input() control!: FormControl; 

  value = '';
  disabled = false;

  public onChange = (value: any) => {/* */};
  public onTouched = () => {/* */};

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

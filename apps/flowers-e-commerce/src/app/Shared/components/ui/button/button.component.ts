import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  disabledFlag=input<boolean>(false);
  label = input<string>('');
  icon = input<string | null>(null);
  iconPosition = input<'right'|'left'>('left');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  styleClass = input<string>('');
  parentForm = input<FormGroup>();
  buttonClick = output<void>();
  onClick(){
    this.buttonClick.emit();
  }
}
import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input<string>('');
  icon = input<string | null>(null);
  iconPosition = input<'right'|'left'>('left');
  loading = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  styleClass = input<string>('');
  buttonClick = output<void>();
  onClick(){
    this.buttonClick.emit();
  }
}
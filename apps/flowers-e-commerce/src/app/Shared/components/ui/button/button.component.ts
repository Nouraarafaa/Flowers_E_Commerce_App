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
  loading = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  styleClass = input<string>('');
  clicked = output<void>();
  onClick(){
    this.clicked.emit();
  }
}
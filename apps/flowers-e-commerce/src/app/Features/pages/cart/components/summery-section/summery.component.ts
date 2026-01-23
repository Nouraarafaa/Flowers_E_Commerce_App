import { Component, input, output } from '@angular/core';
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component";

@Component({
  selector: 'app-summery',
  imports: [ButtonComponent],
  templateUrl: './summery.component.html',
  styleUrl: './summery.component.scss',
})
export class SummeryComponent {
  checkoutRequested = output<void>();
  discount=input<boolean>(true);
  totalPrice=input<number|undefined>(0);


  OnCheckoutRequested() {
    this.checkoutRequested.emit();
  }
}

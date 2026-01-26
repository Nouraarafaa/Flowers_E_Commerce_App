import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-card',
  imports: [],
  templateUrl: './cartCard.component.html',
  styleUrl: './cartCard.component.scss',
})
export class CartCardComponent {
   photo = input<string>();
  title=input<string>();
  price=input<number>();
  rating=input<number>();
  rateCount=input<number>();
  quantity=input<number>();
  clickedOnRemove=output();

  RemoveFromCart() {
    this.clickedOnRemove.emit();
  }
}

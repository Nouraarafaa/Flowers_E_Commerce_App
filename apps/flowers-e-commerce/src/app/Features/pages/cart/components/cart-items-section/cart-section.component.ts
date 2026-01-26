import { AsyncPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CartItem, CartResponse } from '../../interfaces/cart';
import { Observable, of } from 'rxjs';
import { CartCardComponent } from "../cart-card/cartCard.component";
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component";
import { Tooltip } from 'primeng/tooltip';


@Component({
  selector: 'app-cart-section',
  imports: [Tooltip,AsyncPipe, CartCardComponent, ButtonComponent],
  templateUrl: './cart-section.component.html',
  styleUrl: './cart-section.component.scss',
})
export class CartSectionComponent {
  cart$ = input<Observable<CartResponse | null>>(of(null));
  cartList$ = input<Observable<CartItem[]>>(of([]));

  clearCartRequested = output<void>();
  removeProductRequested = output<string>(); // emits the product ID
  continueShoppingRequested = output<void>();

  // Local methods to emit events
  onClearCart() {
    this.clearCartRequested.emit();
  }

  onRemoveFromCart(productId: string) {
    this.removeProductRequested.emit(productId);
  }

  onContinueShopping() {
    this.continueShoppingRequested.emit();
  }
}

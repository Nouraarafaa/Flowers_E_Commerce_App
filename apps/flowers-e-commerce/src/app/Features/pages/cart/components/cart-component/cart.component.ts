import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SectionTitleComponent } from "apps/flowers-e-commerce/src/app/Shared/components/section-title/sectionTitle.component";
import { CartItem, CartResponse } from '../../interfaces/cart';
import { loadCart } from 'apps/flowers-e-commerce/src/app/Core/store/cart/cart.actions';
import { selectCart, selectCartItems } from 'apps/flowers-e-commerce/src/app/Core/store/cart/cart.selectors';
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component";
import { Router } from '@angular/router';
import { CartSectionComponent } from "../cart-items-section/cart-section.component";
import { SummeryComponent } from "../summery-section/summery.component";
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, SectionTitleComponent, ButtonComponent, CartSectionComponent, SummeryComponent, StepsModule, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _router = inject(Router);
  cart$: Observable<CartResponse | null> = of(null);
  cartList$: Observable<CartItem[]> = of([]);
  discount: boolean = false;
  step: number = 2;
  items: MenuItem[] | undefined;

  active: number = 0;

  ngOnInit(): void {
    this.getCartProducts();
     this.items = [
            {
                label: ''
            },
            {
                label: ''
            }   
        ];


  }

  getCartProducts() {
    this._store.dispatch(loadCart());
    this.cart$ = this._store.select(selectCart);
    this.cartList$ = this._store.select(selectCartItems);

  }

  handleClearCart() {

  }

  handleRemoveProduct(productId: string) {

  }

  handleNavigation() {
    this._router.navigate(['/products']);
  }


  checkoutRequested() {
    this.step = 2;
  }

  shippingAndPaymentSteps() {
    this.active = 1;
    
  }

}

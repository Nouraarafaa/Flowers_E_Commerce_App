import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-wishlist-card',
  imports: [],
  templateUrl: './wishlistCard.component.html',
  styleUrl: './wishlistCard.component.scss',
})
export class WishlistCardComponent {
  photo = input<string>();
  title=input<string>();
  price=input<number>();
  priceAfterDiscount=input<number>();
  rating=input<number>();
  clickedOnRemove=output();

  RemoveFromWishlist() {
    this.clickedOnRemove.emit();
  }
}
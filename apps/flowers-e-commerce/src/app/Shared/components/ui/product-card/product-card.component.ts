import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToWishlist, removeFromWishlist } from '../../../../Core/store/wishlist/wishlist.actions';
import { Product } from '../../../interfaces/HomeResponse/home-response';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  private readonly store = inject(Store);

  onAddToWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Product added to wishlist:', this.product());
    this.store.dispatch(addToWishlist({ productId: this.product()._id }));
  }

  onRemoveFromWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Product removed from wishlist:', this.product());
    this.store.dispatch(removeFromWishlist({ productId: this.product()._id }));
  }

  getStars(rate: number) {
    const full = Math.floor(rate);
    const half = rate % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);
    return { full, half, empty };
  }

  isNew(date: string): boolean {
    const created = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

    return diff <= 90;
  }
  isHot(sold: number | undefined): boolean {
    return (sold ?? 0) > 50;
  }
  isOutOfStock(quantity: number): boolean {
    return quantity <= 0;
  }


}
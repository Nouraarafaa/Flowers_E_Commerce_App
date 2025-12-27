import { Component, inject, input } from '@angular/core';
import { Product } from '../../../interfaces/HomeResponse/home-response';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectWishlistIds } from 'apps/flowers-e-commerce/src/app/Core/store/wishlist/wishlist.selectors';
import { map } from 'rxjs';
import { addToWishlist, removeFromWishlist } from 'apps/flowers-e-commerce/src/app/Core/store/wishlist/wishlist.actions';

@Component({
  selector: 'app-product-card',
  imports: [SlicePipe, AsyncPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  private readonly store = inject(Store);

  isInWishlist$ = this.store.select(selectWishlistIds).pipe(
    map(ids => ids.includes(this.product()._id))
  );

  toggleWishlist(event: Event, inWishlist: boolean) {
    event.stopPropagation();
    event.preventDefault();
    if (inWishlist) {
      console.log('Removing product from wishlist:', this.product());
      this.store.dispatch(removeFromWishlist({ productId: this.product()._id }));
    } else {
      console.log('Adding product to wishlist:', this.product());
      this.store.dispatch(addToWishlist({ productId: this.product()._id }));
    }
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
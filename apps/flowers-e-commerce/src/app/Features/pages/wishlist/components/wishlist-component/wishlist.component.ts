import { Component, inject, OnInit } from '@angular/core';
import { WishlistCardComponent } from "../wishlist-card/wishlistCard.component";
import { Tooltip } from 'primeng/tooltip';
import { Store } from '@ngrx/store';
import { clearWishlist, loadWishlist, removeFromWishlist } from 'apps/flowers-e-commerce/src/app/Core/store/wishlist/wishlist.actions';
import { AsyncPipe } from '@angular/common';
import { selectWishlistProducts } from 'apps/flowers-e-commerce/src/app/Core/store/wishlist/wishlist.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/wishlist';

@Component({
  selector: 'app-wishlist',
  imports: [WishlistCardComponent, Tooltip, AsyncPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly _store = inject(Store);
  wishlist$ !: Observable<Product[]>;
  // wishlistProducts = this._store.selectSignal(selectWishlistProducts);

  ngOnInit(): void {
    this.getWishlistProducts();
  }

  getWishlistProducts() {
    this._store.dispatch(loadWishlist());
    this.wishlist$ = this._store.select(selectWishlistProducts);
  }

  removeFromWishlist(productId: string) {
    this._store.dispatch(removeFromWishlist({ productId: productId }));

  }


  clearWishlist() {
    this._store.dispatch(clearWishlist());
    // console.log('clear');

  }

}

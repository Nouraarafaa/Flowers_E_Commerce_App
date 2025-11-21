import { Component, input } from '@angular/core';
import { Product } from '../../../interfaces/HomeResponse/home-response';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();

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
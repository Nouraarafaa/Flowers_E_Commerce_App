
import { Component, computed, input, signal } from '@angular/core';
import { ProductCardComponent } from '../../../../../Shared/components/ui/product-card/product-card.component';
import {
  Occasion,
  Product,
} from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { SectionTitleComponent } from '../../../../../Shared/components/section-title/sectionTitle.component';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent, SectionTitleComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {
  products = input.required<Product[]>();
  occasions = input.required<Occasion[]>();


  activeOccasion = signal<string>('all');

  filteredProducts = computed(() => {
    const selected = this.activeOccasion();
    const allProducts = this.products();

    if (selected === 'all') {
      return allProducts;
    }

    return allProducts.filter((product) => product.occasion === selected);
  });

  setOccasion(id: string | null) {
    if (!id) return;
    this.activeOccasion.set(id);
  }

}

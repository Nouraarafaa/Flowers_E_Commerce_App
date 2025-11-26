import { Component, computed, input, signal } from '@angular/core';
import { ProductCardComponent } from '../../../../../Shared/components/ui/product-card/product-card.component';
import {
  Category,
  Product,
} from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { SectionTitleComponent } from '../../../../../shared/components/section-title/sectionTitle.component';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent, SectionTitleComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {
  products = input.required<Product[]>();
  categories = input.required<Category[]>();


  activeCategory = signal<string>('all');

  setActiveCategory(categoryId: string) {
    this.activeCategory.set(categoryId);
  }

  filteredProducts = computed(() => {
  const selected = this.activeCategory();

    if (selected === 'all') {
      return this.products();
    }

    return this.products().filter(p => p.category === selected);
  });

}
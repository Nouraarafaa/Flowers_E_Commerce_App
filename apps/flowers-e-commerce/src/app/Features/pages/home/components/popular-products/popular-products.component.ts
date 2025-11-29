import { Component, computed, input, signal } from '@angular/core';
import { ProductCardComponent } from '../../../../../Shared/components/ui/product-card/product-card.component';
import {
  Occasion,
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
  occasions = input.required<Occasion[]>();


  listOfOccasions = [
    { label: 'Wedding', key: 'Wedding' },
    { label: 'Anniversary', key: 'Anniversary' },
    { label: 'Birthday', key: 'Birthday' },
    { label: 'Engagement', key: 'Engagement' },
  ];

  activeOccasion = signal<string>('all');

  getOccasionIdByName(name: string): string | null {
    const occasion = this.occasions().find(
      (occ) => occ.name.toLowerCase() === name.toLowerCase()
    );
    return occasion?._id ?? null;
  }

  filteredProducts = computed(() => {
    const selected = this.activeOccasion();
    const allProducts = this.products();

    if (selected === 'all') {
      return allProducts;
    }

    return allProducts.filter((product) => product.occasion === selected);
  });

  setOccasion(name: string) {
    if (name === 'all') {
      this.activeOccasion.set('all');
      return;
    }

    const id = this.getOccasionIdByName(name);
    if (id) {
      this.activeOccasion.set(id);
    }
  }

}
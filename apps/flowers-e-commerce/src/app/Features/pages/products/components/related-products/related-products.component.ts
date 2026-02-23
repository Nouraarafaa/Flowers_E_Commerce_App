import { Component, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { ProductsService } from '../../../../../Shared/services/products/products.service';
import { Subject, takeUntil } from 'rxjs';
import { ProductSummary } from '../../../../../Shared/interfaces/related-products/related-products';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardComponent } from "../../../../../Shared/components/ui/product-card/product-card.component";


@Component({
  selector: 'app-related-products',
  imports: [CarouselModule, ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements OnDestroy  {

  categoryId = input.required<string>();
  private readonly _productsService = inject(ProductsService);
  relatedProducts = signal<ProductSummary[]>([]);
  private destroy$ = new Subject<void>();

  
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor() {
    effect(() => {
      const id = this.categoryId();
      if (id) {
        this.getRelatedProducts(id);
      }
    });
  }

  getRelatedProducts(id: string): void {
    this._productsService.getRelatedProductsByCategory(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.relatedProducts.set(res.relatedProducts ?? []);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}

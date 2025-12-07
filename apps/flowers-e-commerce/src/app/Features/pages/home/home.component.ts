import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TrustedByComponent } from '../homeComponents/TrustedBy/TrustedBy.component';
import { GalleryComponent } from '../homeComponents/gallery/gallery.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { HomeService } from '../../../Shared/services/home/home.service';
import { BestSellingProductsComponent } from "../homeComponents/best-selling-products/bestSellingProducts.component";
import { Subject, takeUntil } from 'rxjs';
import { BenefitsComponent } from '../../../Shared/components/benefits/benefits.component';
import {
  BestSeller,
  Category,
  Occasion,
  Product,
} from '../../../Shared/interfaces/HomeResponse/home-response';
import { TestimonialsComponent } from "../homeComponents/testimonials/testimonials.component";


@Component({
  selector: 'app-home',
  imports: [TrustedByComponent, GalleryComponent, PopularProductsComponent, BenefitsComponent, TestimonialsComponent, BestSellingProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit, OnDestroy {
  private readonly _homeService = inject(HomeService);
  private destroy$ = new Subject<void>();
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  bestSeller = signal<BestSeller[]>([]);
  occasions = signal<Occasion[]>([]);

  ngOnInit(): void {
    this.getHomeDetails();
  }

  getHomeDetails(): void {
    this._homeService.getHomeDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.products.set(res.products);
          this.categories.set(res.categories);
          this.bestSeller.set(res.bestSeller);
          this.occasions.set(res.occasions);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

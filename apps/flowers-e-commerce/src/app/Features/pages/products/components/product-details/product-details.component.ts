import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../../Shared/services/products/products.service';
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { Review } from '../../../../../Shared/interfaces/review';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { finalize, Subject, takeUntil } from 'rxjs';
import { RelatedProductsComponent } from "../related-products/related-products.component";
import { SectionTitleComponent } from "../../../../../Shared/components/section-title/sectionTitle.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, Rating, FormsModule, RouterLink, DatePipe, InputText, RelatedProductsComponent, SectionTitleComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);

  private destroy$ = new Subject<void>();

  product = signal<Product | null>(null);
  categoryID = signal<string | null>(null);
  selectedImage = signal<string>('');
  isLoading = signal<boolean>(true);
  
  reviews = signal<Review[]>([]);
  isLoadingReviews = signal<boolean>(true);
  
  // New review form
  userRating = 0;
  reviewTitle = '';
  reviewText = '';

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    // Subscribe to param changes
    this._activatedRoute.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      const id = params.get('id');
      if(id) {
        this.loadProductDetails(id);
        this.loadProductReviews(id);
      }
    });
  }

  loadProductDetails(id: string): void {
    this.isLoading.set(true);
    this._productsService.getProductById(id)
      .pipe(takeUntil(this.destroy$), finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.product.set(res.product);
          this.categoryID.set(res.product._id);
          this.selectedImage.set(res.product.imgCover);
        },
        error: (err) => {
          // console.error('Error loading product details:', err);
        }
      });
  }


  loadProductReviews(id: string): void {
    this.isLoadingReviews.set(true);
    this._productsService.getProductReviews(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.reviews.set(res.reviews);
          this.isLoadingReviews.set(false);
        },
        error: (err) => {
          console.error('Error loading reviews:', err);
          this.isLoadingReviews.set(false);
        }
      });
  }

  changeImage(imageUrl: string): void {
    this.selectedImage.set(imageUrl);
  }

  addToCart(): void {
    // Logic for adding to cart
    console.log('Added to cart:', this.product()?.title);
  }

  toggleWishlist(): void {
    // Logic for wishlist
    console.log('Toggled wishlist for:', this.product()?.title);
  }

  submitReview() {
    const currentProduct = this.product();
    if (!currentProduct || this.userRating === 0) return;

    const reviewData = {
      product: currentProduct._id,
      rating: this.userRating,
      title: this.reviewTitle,
      comment: this.reviewText
    };

    this._productsService.addProductReview(reviewData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log('Review added successfully', res);
          // Reset form
          this.userRating = 0;
          this.reviewTitle = '';
          this.reviewText = '';
          
          // Reload reviews to show the new one
          const productId = this.product()?._id;
          if (productId) {
              this.loadProductReviews(productId);
              // Optionally reload product details to update average rating
              this.loadProductDetails(productId);
          }
        },
        error: (err) => {
          console.error('Error adding review:', err);
          // TODO: Show error message to user
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

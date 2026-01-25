import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../../Shared/services/products/products.service';
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { Review } from '../../../../../Shared/interfaces/review';
import { Rating } from 'primeng/rating';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, Rating, Button, FormsModule, RouterLink, DatePipe, InputTextarea, InputText],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);

  product = signal<Product | null>(null);
  selectedImage = signal<string>('');
  isLoading = signal<boolean>(true);
  
  reviews = signal<Review[]>([]);
  isLoadingReviews = signal<boolean>(true);
  
  // New review form
  userRating = 0;
  reviewTitle = '';
  reviewText = '';

  ngOnInit(): void {
    // Subscribe to param changes
    this._activatedRoute.paramMap.subscribe(params => {
       const id = params.get('id');
       if(id) {
         this.loadProductDetails(id);
         this.loadProductReviews(id);
       }
    });
  }

  loadProductDetails(id: string): void {
    this.isLoading.set(true);
    this._productsService.getProductById(id).subscribe({
      next: (res) => {
        this.product.set(res.product);
        this.selectedImage.set(res.product.imgCover);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading product details:', err);
        this.isLoading.set(false);
      }
    });
  }

  loadProductReviews(id: string): void {
    this.isLoadingReviews.set(true);
    this._productsService.getProductReviews(id).subscribe({
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

    this._productsService.addProductReview(reviewData).subscribe({
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
}

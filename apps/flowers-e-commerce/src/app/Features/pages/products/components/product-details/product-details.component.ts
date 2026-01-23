import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeService } from '../../../../../Shared/services/home/home.service';
import { Product } from '../../../../../Shared/interfaces/HomeResponse/home-response';
import { Rating } from 'primeng/rating';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, Rating, Button, FormsModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _homeService = inject(HomeService);

  product = signal<Product | null>(null);
  selectedImage = signal<string>('');
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    console.log('ProductDetailsComponent initialized with ID:', id);
    if (id) {
      this.loadProductDetails(id);
    }
  }

  loadProductDetails(id: string): void {
    this.isLoading.set(true);
    this._homeService.getProductById(id).subscribe({
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
}

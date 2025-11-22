import { Component, inject, OnInit, signal } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { HomeService } from 'apps/flowers-e-commerce/src/app/Shared/services/home/home.service';
import { Testimonial } from './../../../../Shared/interfaces/testimonials';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  imports: [FormsModule, Rating],
  
})
export class TestimonialsComponent implements OnInit {
  private readonly _homeService = inject(HomeService);
  testimonials = signal<Testimonial[]>([]);

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials(): void {
    this._homeService.getTestimonials().subscribe({
      next: (res) => {
        this.testimonials.set(res.testimonials);
        console.log(this.testimonials());
      },
      error: (err) => {
        console.error('Failed to load testimonials:', err);
      },
    });
  }
}

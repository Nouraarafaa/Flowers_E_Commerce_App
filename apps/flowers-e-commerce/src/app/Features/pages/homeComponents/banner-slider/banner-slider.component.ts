import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-slider',
  imports: [CommonModule],
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent {

currentSlide = 0;

  slides = [
    {
      image: '/Images/HomeSlider.png',
      title: 'Say It with Flowers',
      subtitle: 'Elegant gifts for every special moment.'
    },
    {
      image: '/Images/HomeSlider2.png',
      title: 'Fresh Roses',
      subtitle: 'Perfect bouquets for your loved ones.'
    },
  ];

  nextSlide() {
    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

}
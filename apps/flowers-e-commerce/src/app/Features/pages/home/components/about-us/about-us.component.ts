import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SectionTitleComponent } from "../../../../../shared/components/section-title/sectionTitle.component";

@Component({
  selector: 'app-about-us',
  imports: [NgOptimizedImage, SectionTitleComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  benefitsList = [
    'Competitive Prices & Easy Shopping',
    'Premium Quality & Elegant Packaging',
    'Perfect for Every Occasion',
    'Fast & Reliable Delivery',
  ];
}
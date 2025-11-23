import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
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
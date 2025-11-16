import { Component } from '@angular/core';
import { TrustedByComponent } from "../homeComponents/TrustedBy/TrustedBy.component";
import { GalleryComponent } from "../homeComponents/gallery/gallery.component";
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";

@Component({
  selector: 'app-home',
  imports: [TrustedByComponent, GalleryComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

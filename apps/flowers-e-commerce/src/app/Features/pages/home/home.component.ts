import { Component } from '@angular/core';
import { TrustedByComponent } from "../homeComponents/TrustedBy/TrustedBy.component";
import { GalleryComponent } from "../homeComponents/gallery/gallery.component";
import { BenefitsComponent } from '../homeComponents/benefits/benefits.component';

@Component({
  selector: 'app-home',
  imports: [TrustedByComponent, GalleryComponent,BenefitsComponent],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

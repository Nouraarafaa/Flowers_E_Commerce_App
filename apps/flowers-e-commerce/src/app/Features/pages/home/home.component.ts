import { Component } from '@angular/core';
import { TrustedByComponent } from "../homeComponents/TrustedBy/TrustedBy.component";
import { GalleryComponent } from "../homeComponents/gallery/gallery.component";

@Component({
  selector: 'app-home',
  imports: [TrustedByComponent, GalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

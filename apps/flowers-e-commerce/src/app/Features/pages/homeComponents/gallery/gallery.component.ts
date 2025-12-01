import { Component } from '@angular/core';
import { SectionTitleComponent } from "apps/flowers-e-commerce/src/app/Shared/components/section-title/sectionTitle.component";

@Component({
  selector: 'app-gallery',
  imports: [SectionTitleComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
}

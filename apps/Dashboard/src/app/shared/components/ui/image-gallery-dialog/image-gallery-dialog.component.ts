import { Component, effect, input, model, signal } from '@angular/core';
import { Dialog } from "primeng/dialog";

@Component({
  selector: 'app-image-gallery-dialog',
  imports: [Dialog],
  templateUrl: './image-gallery-dialog.component.html',
  styleUrl: './image-gallery-dialog.component.scss',
})
export class ImageGalleryDialogComponent {

  constructor() {
    effect(() => {
      const imgs = this.images();

      if (imgs.length) {
        this.currentIndex.set(0);
      }
    });
  }

  images = input<string[]>([]);
  
  visible = model<boolean>(false);

  currentIndex = signal(0);

  next() {
    if (this.currentIndex() < this.images().length - 1) {
      this.currentIndex.update((v) => v + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((v) => v - 1);
    }
  }
}

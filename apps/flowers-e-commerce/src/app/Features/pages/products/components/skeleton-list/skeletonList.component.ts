import { Component} from '@angular/core';
import { SkeletonCardComponent } from "../skeleton-card/skeletonCard.component";

@Component({
  selector: 'app-skeleton-list',
  imports: [SkeletonCardComponent],
  templateUrl: './skeletonList.component.html',
  styleUrl: './skeletonList.component.scss',
})
export class SkeletonListComponent {
  products=new Array(12);
}

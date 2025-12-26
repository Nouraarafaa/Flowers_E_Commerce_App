import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-card',
  imports: [Skeleton],
  templateUrl: './skeletonCard.component.html',
  styleUrl: './skeletonCard.component.scss',
})
export class SkeletonCardComponent {}

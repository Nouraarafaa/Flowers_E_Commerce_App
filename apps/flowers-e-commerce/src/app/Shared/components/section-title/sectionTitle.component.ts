import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl:'./sectionTitle.component.html',
  styleUrl: './sectionTitle.component.scss',
})
export class SectionTitleComponent {
  alignment=input<string>();
  sectionName=input<string>();
  sectionTitle=input<string>();
}

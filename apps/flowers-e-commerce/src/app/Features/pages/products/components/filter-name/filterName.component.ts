import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filter-name',
  imports: [],
  templateUrl: './filterName.component.html',
  styleUrl: './filterName.component.scss',
})
export class FilterNameComponent {
  filterName= input.required<string>();
}

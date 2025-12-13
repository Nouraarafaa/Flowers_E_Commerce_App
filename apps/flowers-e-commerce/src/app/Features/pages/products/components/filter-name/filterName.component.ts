import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-filter-name',
  imports: [],
  templateUrl: './filterName.component.html',
  styleUrl: './filterName.component.scss',
})
export class FilterNameComponent {
  filterName= input.required<string>();
  clicked=output<void>();
  onClick(){
    this.clicked.emit();
  }
}

import { Component } from '@angular/core';
import { AddCategoryOrOccassionComponent } from "apps/Dashboard/src/app/shared/components/add-category-or-occassion/addCategoryOrOccassion.component";

@Component({
  selector: 'app-add-category',
  imports: [AddCategoryOrOccassionComponent],
  templateUrl: './addCategory.component.html',
  styleUrl: './addCategory.component.scss',
})
export class AddCategoryComponent {}

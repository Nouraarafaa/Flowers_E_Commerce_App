import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";
import { UpsertConfiguration } from 'apps/Dashboard/src/app/shared/interfaces/upsertConfiguration/upsert-configuration';

@Component({
  selector: 'app-add-category',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './addCategory.component.html',
  styleUrl: './addCategory.component.scss',
})
export class AddCategoryComponent {
  categoryConfig: UpsertConfiguration = {
  title: 'Add a New Category',
  placeholderName: 'Enter category name ',
  imageLabel: 'Category image',
  buttonName: 'Add Category',
  functionType: 'Add Category'
};
}

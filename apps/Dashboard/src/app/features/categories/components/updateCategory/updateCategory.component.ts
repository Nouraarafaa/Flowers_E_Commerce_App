import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";
import { UpsertConfiguration } from 'apps/Dashboard/src/app/shared/interfaces/upsertConfiguration/upsert-configuration';

@Component({
  selector: 'app-update-category',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './updateCategory.component.html',
  styleUrl: './updateCategory.component.scss',
})
export class UpdateCategoryComponent {
    categoryConfig: UpsertConfiguration = {
    title: 'Update Category',
    placeholderName: 'Enter category name ',
    imageLabel: 'Category image',
    buttonName: 'Update Category',
    functionType: 'Edit Category'
  };
}

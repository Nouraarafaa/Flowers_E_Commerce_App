import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";
import { UpsertConfiguration } from 'apps/Dashboard/src/app/shared/interfaces/upsertConfiguration/upsert-configuration';

@Component({
  selector: 'app-update-occassion',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './updateOccassion.component.html',
  styleUrl: './updateOccassion.component.scss',
})
export class UpdateOccassionComponent {
   occasionConfig: UpsertConfiguration = {
      title: 'Update Occasion',
      placeholderName: 'Enter Occasion name ',
      imageLabel: 'Occasion image',
      buttonName: 'Update Occasion',
      functionType: 'Edit Occasion'
    };
}

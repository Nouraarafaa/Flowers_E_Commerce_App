import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";
import { UpsertConfiguration } from 'apps/Dashboard/src/app/shared/interfaces/upsertConfiguration/upsert-configuration';

@Component({
  selector: 'app-add-occassion',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './addOccassion.component.html',
  styleUrl: './addOccassion.component.scss',
})
export class AddOccassionComponent {
    occasionConfig: UpsertConfiguration = {
    title: 'Add a New Occasion',
    placeholderName: 'Enter Occasion name ',
    imageLabel: 'Occasion image',
    buttonName: 'Add Occasion',
    functionType: 'Add Occasion'
  };
}

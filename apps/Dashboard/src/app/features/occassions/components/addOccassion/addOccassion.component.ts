import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";

@Component({
  selector: 'app-add-occassion',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './addOccassion.component.html',
  styleUrl: './addOccassion.component.scss',
})
export class AddOccassionComponent {}

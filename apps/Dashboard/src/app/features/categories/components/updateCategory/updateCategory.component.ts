import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";

@Component({
  selector: 'app-update-category',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './updateCategory.component.html',
  styleUrl: './updateCategory.component.scss',
})
export class UpdateCategoryComponent {}

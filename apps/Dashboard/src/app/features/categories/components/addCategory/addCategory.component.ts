import { Component } from '@angular/core';
import { UpsertCategoryAndOccassionComponent } from "apps/Dashboard/src/app/shared/components/upsert-category-occassion/upsertCategoryAndOccassion.component";

@Component({
  selector: 'app-add-category',
  imports: [UpsertCategoryAndOccassionComponent],
  templateUrl: './addCategory.component.html',
  styleUrl: './addCategory.component.scss',
})
export class AddCategoryComponent {}

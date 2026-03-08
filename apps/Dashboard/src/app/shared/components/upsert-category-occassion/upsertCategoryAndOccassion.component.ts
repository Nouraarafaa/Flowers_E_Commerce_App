import { Component, inject, input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInputComponent } from '@elevate-workspace/input-form';
import { CategoriesService } from '../../../features/categories/services/categories/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-upsert-category-and-occassion',
  imports: [FormsModule, FormInputComponent],
  templateUrl: './upsertCategoryAndOccassion.component.html',
  styleUrl: './upsertCategoryAndOccassion.component.scss',
})
export class UpsertCategoryAndOccassionComponent {
  title = input<string>();
  placeholderNameFiled = input<string>();
  imagelabel = input<string>();
  buttonName = input<string>();
  functionType = input<string>();

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _toastrService = inject(ToastrService);
  private destroy$ = new Subject<void>();

  categoryOrOccasion = {
    name: '',
    image: null as File | null,
  };
  imageErrorMessage: string = ''; // to display error message related to image upload

  onSubmit() {
    if (this.categoryOrOccasion.name && this.categoryOrOccasion.image) {
      console.log('object data :', this.categoryOrOccasion);

      // we can use the same component to add category or occasion by checking the functionType input value
      if (this.functionType() === 'Add Category') {
        this._categoriesService.addCategory(this.categoryOrOccasion.name, this.categoryOrOccasion.image).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res) => {
            console.log(res.message);
            this._toastrService.success('Category added successfully');
            this.categoryOrOccasion = {
              name: '',
              image: null
            };
          },
          error: (err) => {
            this._toastrService.error(err.error.error);
          }
        })
      }
      if (this.functionType() === 'Add Occasion') {

      }
      if (this.functionType() === 'Edit Category') {
        
      }
      if (this.functionType() === 'Edit Occasion') {
        
      }
    }
  }

    onFileSelected(event: any) {
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      const file: File = event.target.files[0];
      if (file) {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          this.imageErrorMessage = 'Sorry, only images of the following types are allowed: (PNG, JPG, WEBP)';
          this.categoryOrOccasion.image = null;
          return;
        }
        if (file.size > maxSizeInBytes) {
          this.imageErrorMessage = 'Sorry, the maximum allowed file size is 2MB.';
          return;
        }
        this.imageErrorMessage = '';
        this.categoryOrOccasion.image = file;

      }
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

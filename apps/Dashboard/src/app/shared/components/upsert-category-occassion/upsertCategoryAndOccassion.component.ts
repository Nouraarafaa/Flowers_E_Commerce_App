import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInputComponent } from '@elevate-workspace/input-form';
import { CategoriesService } from '../../../features/categories/services/categories/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from 'primeng/dialog';
import { OccassionService } from '../../../features/occassions/services/occassion.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-upsert-category-and-occassion',
  imports: [FormsModule, FormInputComponent, Dialog],
  templateUrl: './upsertCategoryAndOccassion.component.html',
  styleUrl: './upsertCategoryAndOccassion.component.scss',
})
export class UpsertCategoryAndOccassionComponent implements OnInit,OnDestroy {
  title = input<string>();
  placeholderNameFiled = input<string>();
  imagelabel = input<string>();
  buttonName = input<string>();
  functionType = input<string>();
  categoryOrOccasionId = signal<string>("");

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _occassionService = inject(OccassionService);
  private readonly _toastrService = inject(ToastrService);
  private _activatedRoute = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  categoryOrOccasion: { name: string; image: string | File | null } = {
    name: '',
    image: ''
  };

  checklabel: string = "";
  imageErrorMessage: string = ''; // to display error message related to image upload
  visible: boolean = false;


  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.categoryOrOccasionId.set(id!);
    if (this.functionType()?.includes('Edit')) {
      this.gitCategoryOrOccasionData();
    }
  }

  gitCategoryOrOccasionData() {
    console.log(this.categoryOrOccasionId());
    
    if (this.functionType() === 'Edit Category') {
      // 1- get category by id
      this._categoriesService.getCategory(this.categoryOrOccasionId()!).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          // 2- patch the form with the retrieved data
          this.checklabel = res.category.name;
          this.categoryOrOccasion.name = res.category.name;
          this.categoryOrOccasion.image = res.category.image;
        }
      })

    }
    if (this.functionType() === 'Edit Occassion') {
         // 1- get category by id
      this._occassionService.getOccassion(this.categoryOrOccasionId()!).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          // 2- patch the form with the retrieved data
          this.checklabel = res.occasion.name;
          this.categoryOrOccasion.name = res.occasion.name;
          this.categoryOrOccasion.image = res.occasion.image;
        }
      })
    }

  }

  // to print current image in edit mode if the user didn't change the image and to print the new image name if the user uploaded new image
  getFileName(): string {
    const img = this.categoryOrOccasion.image;
    if (!img) return '';
    if (typeof img === 'string') return 'Current Image';
    return img.name;
  }


  // check if there is any change in the form data to enable the submit button in edit mode
  dataCheckChange(): boolean {
    if (this.functionType()?.includes('Add')) {
      return true;
    }
    const nameChanged = this.categoryOrOccasion.name !== this.checklabel;
    let imageChanged = false;

    if (this.categoryOrOccasion.image instanceof File) {
      // Extract the file name from the old link (coming from the server)
      const oldImageName = this.categoryOrOccasion.image.name;
      console.log('this.categoryOrOccasion.image', this.categoryOrOccasion.image);
      console.log('oldImageName :', oldImageName);

      // If the uploaded file name differs from the current image name (in case the user changes the image), this condition is met and the refresh button is activated.        
      if (this.categoryOrOccasion.image.name !== oldImageName) {
        imageChanged = true;
      }
    }
    if (nameChanged || imageChanged) {
      return true;
    }
    return false;
  }

  // pop up to show the current image in edit mode
  showImage() {
    this.visible = true;
  }


  onSubmit() {
    if (this.categoryOrOccasion.name && this.categoryOrOccasion.image) {
      console.log('object data :', this.categoryOrOccasion);

      // we can use the same component to add category or occasion by checking the functionType input value
      if (typeof this.categoryOrOccasion.image !== 'string') {
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

        if (this.functionType() === 'Add Occassion') {
          console.log('Add Occasion :', this.categoryOrOccasion);
          this._occassionService.addOccassion(this.categoryOrOccasion.name, this.categoryOrOccasion.image).pipe(takeUntil(this.destroy$)).subscribe({
            next: (res) => {
              console.log(res.message);

              this._toastrService.success('Occasion added successfully');
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
      }

      if (this.functionType() === 'Edit Category') {
        this._categoriesService.updateCategory(this.categoryOrOccasionId()!, this.categoryOrOccasion.name, typeof (this.categoryOrOccasion.image) !== 'string' ? this.categoryOrOccasion.image : undefined).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res) => {
            console.log(res.message);
            this._toastrService.success('Category updated successfully');
            this.checklabel = this.categoryOrOccasion.name;
            this.dataCheckChange();
          },
          error: (err) => {
            this._toastrService.error(err.error.error);
          }
        })
      }
      if (this.functionType() === 'Edit Occassion') {
        this._occassionService.updateOccassion(this.categoryOrOccasionId()!, this.categoryOrOccasion.name, typeof (this.categoryOrOccasion.image) !== 'string' ? this.categoryOrOccasion.image : undefined).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res) => {
            console.log(res.message);
            this._toastrService.success('Occasion updated successfully');
            this.checklabel = this.categoryOrOccasion.name;
            this.dataCheckChange();
          },
          error: (err) => {
            this._toastrService.error(err.error.error);
          }
        })
      }
    }
  }

  //to set the categoryOrOccasion image property with the uploaded file if it's valid and to validate the uploaded image file and to set the image error message if the file is not valid.
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

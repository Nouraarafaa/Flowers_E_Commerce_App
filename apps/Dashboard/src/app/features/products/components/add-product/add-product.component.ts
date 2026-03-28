import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormInputComponent } from "../../../../shared/components/ui/form-input/form-input.component";
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";
import { NgClass } from "@angular/common";
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStatusComponent } from "../../../../shared/components/ui/auth-status/auth-status.component";
import { AddProduct } from '../../interfaces/add-product/add-product';
import { DropdownModule } from "primeng/dropdown";
import { CategoriesService } from '../../../categories/services/categories/categories.service';
import { Category } from '../../../categories/interfaces/categories-response';
import { OccassionService } from '../../../occassions/services/occassion.service';
import { Occasion } from '../../../occassions/interfaces/occassion-response';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, FormInputComponent, ErrorMessageComponent, NgClass, ButtonComponent, AuthStatusComponent, DropdownModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _productService = inject(ProductService);
  private destroy$ = new Subject<void>();
  isLoading = signal<boolean>(false);
  success = signal<string>("");
  errorMsg = signal<string>("");

  private readonly _categoriesService = inject(CategoriesService);
  categories = signal<Category[]>([]);
  private readonly  _occassionService = inject(OccassionService);
  occasions = signal<Occasion[]>([]);
  categoriesLoading = signal<boolean>(false);
  occasionsLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.initForm();
    this.listenToPriceChanges();
    this.loadCategories();
    this.loadOccasions();
  }

  initForm(): void {
    this.productForm = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(1)]],
      discount: [null, [Validators.required, Validators.min(0)]],
      priceAfterDiscount: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      category: [null, [Validators.required]],
      occasion: [null, [Validators.required]],
      imgCover: [null, [Validators.required]],
      images: [null, [Validators.required]],
    }, { validators: this.discountLessThanPriceValidator.bind(this) });
  }

  // get cover image & images
  onCoverChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if(!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.productForm.patchValue({
      imgCover: file
    })

    this.productForm.get('imgCover')?.updateValueAndValidity();
  }
  onImagesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if(!input.files) return;

    const newfiles: File[] = Array.from(input.files);
    const currentFiles: File[] = this.productForm.get('images')?.value || [];

    const allFiles = [...currentFiles, ...newfiles];

    const Files = allFiles.filter( (file, index, self) =>
      index === self.findIndex(f => 
        f.name === file.name &&
        f.size === file.size &&
        f.lastModified === file.lastModified
      )
    );

    this.productForm.patchValue({
      images: Files
    })

    this.productForm.get('images')?.updateValueAndValidity();
  }

  // Calculate price after discount
  listenToPriceChanges(): void {
    const priceControl = this.productForm.get('price');
    const discountControl = this.productForm.get('discount');

    priceControl?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculatePrice();
    });

    discountControl?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculatePrice();
    });
  }
  calculatePrice(): void {
    const price = Number(this.productForm.get('price')?.value);
    const discount = Number(this.productForm.get('discount')?.value);

    if (price === null || discount === null) return;

    const result = price - discount;
    // const result = price - (price * discount) / 100;   //-> %

    this.productForm.patchValue(
      {
        priceAfterDiscount: result,
      },
      { emitEvent: false }
    );
  }
  
  // Check that the discount is less than the price
  discountLessThanPriceValidator(group: FormGroup) {
    const price = Number(group.get('price')?.value);
    const discount = Number(group.get('discount')?.value);

    if (isNaN(price) || isNaN(discount)) {
      return null;
    }

    if (price <= 0) {
      return null;
    }

    if (discount >= price) {
      return { discountGreater: true };
    }

    return null;
  }

  // loadCategories & loadOccasions  
  loadCategories() {
    this.categoriesLoading.set(true);
    
    this._categoriesService.getCategories()
    .pipe(takeUntil(this.destroy$), finalize(()=> this.categoriesLoading.set(false))).subscribe({
      next:(res) => {
        // console.log(res);
        this.categories.set(res.categories);
      }
    })
  }
  loadOccasions() {
    this.occasionsLoading.set(true);
    
    this._occassionService.getOccassions()
    .pipe(takeUntil(this.destroy$), finalize(()=> this.occasionsLoading.set(false))).subscribe({
      next:(res) => {
        // console.log(res);
        this.occasions.set(res.occasions)
      }
    })
  }

  // Submit product form
  onSubmit(): void {

    if(this.productForm .invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set("");
    this.success.set("");

    const formData = new FormData();
    const formValue: AddProduct = this.productForm.value;

    formData.append('title', formValue.title);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price.toString());
    formData.append('discount', formValue.discount.toString());
    formData.append('priceAfterDiscount', formValue.priceAfterDiscount.toString());
    formData.append('quantity', formValue.quantity.toString());
    formData.append('category', formValue.category);
    formData.append('occasion', formValue.occasion);
    // imgCover
    formData.append('imgCover', formValue.imgCover);
    // images
    formValue.images.forEach((file: File) => {
      formData.append('images', file);
    });
    
    this._productService.addProduct(formData)
    .pipe(takeUntil(this.destroy$), finalize(()=> this.isLoading.set(false))).subscribe({
      next:(res)=> {
        console.log(res);
        if(res.message === "success" ) {
          this.success.set("Product added successfully");
          this.productForm.reset();
          setTimeout( ()=> {
            this.success.set("");
          },1000)
        }
      },error:(err: HttpErrorResponse)=> {
        console.log(err);
        if(err.error.error){
          this.errorMsg.set(err.error.error);
        }else{
          this.errorMsg.set("Something went wrong");
        }
      }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
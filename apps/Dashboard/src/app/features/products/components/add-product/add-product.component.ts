import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormInputComponent } from "../../../../shared/components/ui/form-input/form-input.component";
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";
import { NgClass } from "@angular/common";
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStatusComponent } from "../../../../shared/components/ui/auth-status/auth-status.component";
import { AddProduct } from '../../interfaces/add-product/add-product';

@Component({
  selector: 'app-add-product',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, FormInputComponent, ErrorMessageComponent, NgClass, ButtonComponent, AuthStatusComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _productService = inject(ProductService);
  destroy$ = new Subject<void>();
  isLoading = signal<boolean>(false);
  success = signal<string>("");
  errorMsg = signal<string>("");

  ngOnInit(): void {
    this.initForm();
    this.listenToPriceChanges();
  }

  initForm(): void {
    this.registerForm = this._formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(1)]],
      discount: [null, [Validators.required, Validators.min(0)]],
      priceAfterDiscount: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      category: [null, [Validators.required]],
      occasion: [null, [Validators.required]],
      imgCover: [null, [Validators.required]],
      images: [null, [Validators.required]],
    }, { validators: this.discountLessThanPriceValidator.bind(this) });
  }

  // get images
  onCoverChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if(!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.registerForm.patchValue({
      imgCover: file
    })

    this.registerForm.get('imgCover')?.updateValueAndValidity();
  }
  onImagesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if(!input.files) return;

    const files: File[] = Array.from(input.files);

    this.registerForm.patchValue({
      images: files
    })

    this.registerForm.get('images')?.updateValueAndValidity();
  }

  // Calculate price after discount
  listenToPriceChanges(): void {
    const priceControl = this.registerForm.get('price');
    const discountControl = this.registerForm.get('discount');

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
    const price = this.registerForm.get('price')?.value;
    const discount = this.registerForm.get('discount')?.value;

    if (price === null || discount === null) return;

    // const result = price - (price * discount) / 100;
    const result = price - discount;

    this.registerForm.patchValue(
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

    if (discount > price) {
      return { discountGreater: true };
    }

    return null;
  }

  onSubmit(): void {

    if(this.registerForm .invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set("");
    this.success.set("");

    const formData = new FormData();
    const formValue: AddProduct = this.registerForm.value;

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
          this.registerForm.reset();
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
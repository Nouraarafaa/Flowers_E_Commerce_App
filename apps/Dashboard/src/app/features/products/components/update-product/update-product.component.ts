import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../../../shared/components/ui/form-input/form-input.component';
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { AuthStatusComponent } from "../../../../shared/components/ui/auth-status/auth-status.component";
import { Category } from '../../../categories/interfaces/categories-response';
import { Occasion } from '../../../occassions/interfaces/occassion-response';
import { CategoriesService } from '../../../categories/services/categories/categories.service';
import { OccassionService } from '../../../occassions/services/occassion.service';
import { NgClass } from '@angular/common';
import { DropdownModule } from "primeng/dropdown";
import { ProductData } from '../../interfaces/product-data/product-data';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ImageGalleryDialogComponent } from "../../../../shared/components/ui/image-gallery-dialog/image-gallery-dialog.component";

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, ErrorMessageComponent, FormInputComponent, NgClass, DropdownModule, AuthStatusComponent, ButtonComponent, ButtonModule, DialogModule, ImageGalleryDialogComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  
  productForm!: FormGroup;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _productService = inject(ProductService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _categoriesService = inject(CategoriesService);
  categories = signal<Category[]>([]);
  private readonly  _occassionService = inject(OccassionService);
  occasions = signal<Occasion[]>([]);
  categoriesLoading = signal<boolean>(false);
  occasionsLoading = signal<boolean>(false);

  originalProductData = signal<ProductData | null>(null);

  productImgCover = signal<string>("");
  productImages = signal<string[]>([]);
  visible = signal<boolean>(false);
  images = signal<string[]>([]); 

  productId = signal<string>("");
  title = signal<string>("");
  
  isLoading = signal<boolean>(false);
  success = signal<string>("");
  errorMsg = signal<string>("");

  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.initForm();
    this.getId();
    this.listenToPriceChanges();
    this.loadCategories();
    this.loadOccasions();
  }

  initForm(): void {
      this.productForm = this._formBuilder.group({
        title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
        price: [null, [Validators.required, Validators.min(1)]],
        discount: [{value: null, disabled: true}, [Validators.required, Validators.min(0)]],
        priceAfterDiscount: [{value: null, disabled: true}, [Validators.required]],
        quantity: [null, [Validators.required, Validators.min(1)]],
        category: [null, [Validators.required]],
        occasion: [{value: null, disabled: true}, [Validators.required]],
      }, { validators: this.discountLessThanPriceValidator.bind(this) });
  }
  // get ID
  getId(): void {
    this._activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe({
      next:(params: ParamMap) => {
        const id = params.get('id');
        if(id) {
          this.loadProduct(id);
        }
      }
    })
  }

  // load Product
  loadProduct(id: string): void {
    this._productService.getProduct(id).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res) => {
        if(res.product){
          const data = {
            title: res.product.title,
            description: res.product.description,
            price: res.product.price,
            discount :res.product.discount,
            priceAfterDiscount: res.product.priceAfterDiscount,
            quantity: res.product.quantity,
            category: res.product.category,
            occasion: res.product.occasion
          }
          this.productForm.patchValue(data);

          // this.productForm.get('discount')?.disable();
          // this.productForm.get('priceAfterDiscount')?.disable();
          // this.productForm.get('occasion')?.disable();

          this.originalProductData.set(this.productForm.getRawValue());
          this.productForm.markAsPristine();
          this.productImgCover.set(res.product.imgCover);
          this.productImages.set(res.product.images);
          this.productId.set(res.product._id);
          this.title.set(res.product.title);

        };
      },
      error:(err) => {
        this.errorMsg.set('Failed to load product data');
      }
    });
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

  isFormUnchanged(): boolean {
    if (!this.originalProductData()) return true;  
    const currentValues = this.productForm.getRawValue();
    return JSON.stringify(currentValues) === JSON.stringify(this.originalProductData());
  }

  // loadCategories & loadOccasions  
  loadCategories() {
    this.categoriesLoading.set(true);
    this._categoriesService.getCategories()
    .pipe(takeUntil(this.destroy$), finalize(()=> this.categoriesLoading.set(false))).subscribe({
      next:(res) => {
        this.categories.set(res.categories);
      }
    })
  }
  loadOccasions() {
    this.occasionsLoading.set(true);
    this._occassionService.getOccassions()
    .pipe(takeUntil(this.destroy$), finalize(()=> this.occasionsLoading.set(false))).subscribe({
      next:(res) => {
        this.occasions.set(res.occasions)
      }
    })
  }

  // open cover & gallery
  open(imageList: string[]) {
    this.images.set(imageList);
    // this.currentIndex.set(0);
    this.visible.set(true);
  }
  // show cover & gallery
  showCover() {
    const image = this.productImgCover();
    if (image) {
      this.open([image]);
    }
  }
  showGallery() {
    const images = this.productImages();
    if (images && images.length > 0) {
      this.open(images);
    }
  }

  // Update Product
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.success.set("");
    this.errorMsg.set("");

    // const { discount, priceAfterDiscount, occasion, ...updateData } = this.productForm.value;    
    const updateData = this.productForm.value;
    
    this._productService.updateProduct(this.productId(), updateData)
    .pipe(takeUntil(this.destroy$), finalize(() => this.isLoading.set(false)))
    .subscribe({
      next:(res) => {
        if(res.message === "success") {
          this.success.set("Product updated successfully");
          setTimeout(()=> {
            this.success.set("");
          },2000)
        }
        
        this.originalProductData.set(this.productForm.getRawValue());
        this.productForm.markAsPristine();
      },error:(err:HttpErrorResponse) => {
        if(err.error.error) {
          this.errorMsg.set(err.error.error);
        }else {
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
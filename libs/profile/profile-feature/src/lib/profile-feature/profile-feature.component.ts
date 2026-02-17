import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@elevate-workspace/auth';
import { FormInputComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/form-input/form-input.component';
import { ButtonComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component';
import { ErrorMessageComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/error-message/error-message.component';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'lib-profile-feature',
  imports: [FormInputComponent, DropdownModule, ButtonComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './profile-feature.component.html',
  styleUrl: './profile-feature.component.scss',
})
export class ProfileFeatureComponent implements OnInit, OnDestroy {
  updateForm!: FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _toastrService = inject(ToastrService);
  private destroy$ = new Subject<void>();


  user = this._authService.currentUser;


  ngOnInit(): void {
    this.initForm();
    this.getUserData();
  }

  initForm(): void {

    this.updateForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      gender: ['', [Validators.required]],
    })
  }


  getUserData(): void {
    let data;
    this._authService.getLoggedUserData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this._authService.currentUser.update(() => res.user);

        data = {
          firstName: this.user().firstName,
          lastName: this.user().lastName,
          email: this.user().email,
          phone: this.user().phone.replace('+2', ''),
          gender: this.user().gender
        }

        this.updateForm.patchValue(data);
      }
    })
  }

  updateUserData(): void {
    if (this.updateForm.valid) {
      this.editProfile();
      this.updateForm.markAsPristine();

    }
  }

  editProfile(): void {
    const payload = {
      firstName: this.updateForm.value.firstName,
      lastName: this.updateForm.value.lastName,
      email: this.updateForm.value.email,
      phone: '+2' + this.updateForm.value.phone,
    }
    this._authService.editProflie(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this._toastrService.success(res.message);
        this._authService.currentUser.update(user => ({
            ...user,
            firstName: this.updateForm.value.firstName, 
            lastName: this.updateForm.value.lastName, 
            email: this.updateForm.value.email, 
            phone: this.updateForm.value.phone 
          }));
      }
    })
  }


  updateUserPhoto(event: any): void {
    const maxSizeInBytes = 4 * 1024 * 1024; // 4MB muximum size from backend
    const file = event.target.files[0];
    console.log(file);

    if (!file) return; //if the user canceled the file selection

    if (file.size > maxSizeInBytes) {

      this._toastrService.error('The image size is too large! The maximum size is 4 MB');

      // Reset the input to prevent sending the same incorrect file
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user().photo = e.target.result; //  preview image to the uploaded file
    };
    reader.readAsDataURL(file);

    if (file === this.user().photo) {
      this.updateForm.markAsPristine();
    } else {
      this.updateForm.markAsDirty();
      this._authService.uploadProfilePhoto(file).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this._toastrService.success('Profile photo updated successfully');
          this._authService.currentUser.update(user => ({
            ...user,
            photo: this.user().photo
          }));
          this.updateForm.markAsPristine();
        },
        error: () => {
          this._toastrService.error('Failed to update profile photo');
        }
      });
    }

  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

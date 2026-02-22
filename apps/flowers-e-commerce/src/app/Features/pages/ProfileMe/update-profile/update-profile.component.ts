import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormInputComponent } from '../../../..//Shared/components/ui/form-input/form-input.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from '../../../../Shared/components/ui/button/button.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '@elevate-workspace/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageComponent } from '../../../../Shared/components/ui/error-message/error-message.component';
import { delay, finalize, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AuthStatusComponent } from "../../../../Shared/components/ui/auth-status/auth-status.component";
import { ProfileData } from '../../../../Core/interfaces/profileData/profile-data';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../../Shared/services/confirmDialog/confirm-dialog.service';

@Component({
  selector: 'app-update-profile',
  imports: [FormInputComponent, DropdownModule, ButtonComponent, ReactiveFormsModule, ErrorMessageComponent, AuthStatusComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  
  registerForm!: FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  private readonly _router = inject(Router);
  private readonly _confirmDialogService = inject(ConfirmDialogService);

  userPhoto!: string;
  selectedFile!: File;
  imageChanged = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  success = signal<string>("");
  errorMsg = signal<string>("");

  originalUserData = signal<ProfileData | null>(null);



  ngOnInit(): void {
    this.initForm();
    this.loadProfile();
  }

  initForm(): void {
    this.registerForm = this._formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^1[0125][0-9]{8}$/)]],
      gender: [{ value: null, disabled: true }],
    });
  }

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];
  
  getGenderLabel(value: string) {
    const option = this.genderOptions.find(opt => opt.value === value);
    return option ? option.label : 'Not Specified';
  }


  loadProfile(): void {
    this._authService.getLoggedUserData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        const user = res.user;
        this.userPhoto = user.photo;
        
        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone.replace('+20', ''),
          gender: user.gender,
        }
        this.originalUserData.set(data); 
        this.registerForm.patchValue(data);
        this.registerForm.markAsPristine();
      },
    });
    
  }
  
  isFormUnchanged(): boolean {
    if (!this.originalUserData()) return true;  
    const currentValues = this.registerForm.getRawValue();
    return JSON.stringify(currentValues) === JSON.stringify(this.originalUserData());
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.selectedFile = file;
    this.imageChanged.set(true);

    const reader = new FileReader();

    reader.onload = () => {
      this.userPhoto = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (!this.registerForm.dirty && !this.imageChanged()) return;
    const formValue = this.registerForm.getRawValue();
    const body = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: '+20' + formValue.phone,
    };

    const request$ = this.imageChanged() && this.selectedFile ? this._authService.uploadProfilePhoto(this.selectedFile).pipe(
      switchMap(() => this._authService.editProflie(body))
    ) : this._authService.editProflie(body);

    this.errorMsg.set("");
    this.isLoading.set(true);

    request$.pipe(takeUntil(this.destroy$), finalize(() => this.isLoading.set(false))).subscribe({
      next: (res) => {
        this.afterSuccess();
        if (res.message === "success") {
          this.success.set(res.message);
          setTimeout( ()=> {
            this.success.set("");
          },1000)
        }
      },
      error: (err:HttpErrorResponse) => {
        if (err.error.error) {
          console.log(err);
          
          this.errorMsg.set(err.error.error);
        }
      }
    });
  }

  afterSuccess(): void {
    this.registerForm.markAsPristine();
    this.imageChanged.set(false);
  
    this.originalUserData.set(this.registerForm.getRawValue());
  }
  

  private deleteAccount(): void {
    this.errorMsg.set("");
    this._authService.deleteMyAccount()
    .pipe(takeUntil(this.destroy$),
      tap((res) => {
        if (res.message === "success") {
          this.success.set(res.message);
        }
      }),
      delay(1000)
    ).subscribe({
      next:(res) => {
        console.log(res);
        if (res.message === "success") {
          localStorage.clear();
          this._router.navigate(['/home']).then(() => {
            window.location.reload();
          })
        }
      },
      error:(err:HttpErrorResponse) => {
        console.log(err);
        if (err.error.error) {
          this.errorMsg.set(err.error.error);
        }
      }
    })
  }

  confirmDelete(): void{
    this._confirmDialogService.confirm({
      message: 'Are you sure you want to delete your account?',
      subMessage: 'This action is permanent and cannot be undone.',
      acceptLabel: 'Yes, delete',
      rejectLabel: 'Nope, not doing it',
      onAccept: ()=> {
        this.deleteAccount();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

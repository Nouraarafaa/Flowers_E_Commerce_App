import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject,  OnDestroy,  OnInit,  signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { FormInputComponent } from "../../../Shared/components/ui/form-input/form-input.component";
import { ErrorMessageComponent } from "../../../Shared/components/ui/error-message/error-message.component";
import { AuthService } from '@elevate-workspace/auth';
import { NgClass } from '@angular/common';
import { AuthStatusComponent } from "../../../Shared/components/ui/auth-status/auth-status.component";
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from "../../../Shared/components/ui/button/button.component";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, FormInputComponent, ErrorMessageComponent, NgClass, AuthStatusComponent, DropdownModule, ButtonComponent, InputGroupModule, InputGroupAddonModule, TranslatePipe],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!:FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private destroy$ = new Subject<void>();

  success: WritableSignal<string> = signal("");
  errorMsg: WritableSignal<string> = signal("");
  isCallingAPI: WritableSignal<boolean> = signal(false);
  togglePassword: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this._formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      gender: [null, [ Validators.required ]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: [null, [Validators.required]]
    },{ validators: [this.validateRePassword]})
  }

  // Confirm Password
  validateRePassword(group:AbstractControl): ValidationErrors | null {
    const password = group.get("password")?.value 
    const rePassword = group.get("rePassword")?.value
    return  password === rePassword ? null : {misMatch:true};
  }

  submitForm(): void{
    if (this.registerForm.valid) {
      this.errorMsg.set("");
      if (!this.isCallingAPI()) {
        this.isCallingAPI.set(true);
        const phoneValue = this.registerForm.get('phone')?.value?.replace(/^0/, '+20');
        const formData = { ...this.registerForm.value, phone: phoneValue };
        this._authService.register(formData)
        .pipe(takeUntil(this.destroy$), finalize(()=> this.isCallingAPI.set(false))).subscribe({
          next:(res)=>{
            if (res.message === "success") {
              timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
                this._router.navigate(['/login'])
              })
              this.success.set(res.message);
            }
          },
          error:(err: HttpErrorResponse)=>{
            if (err.error.error) {
              this.errorMsg.set(err.error.error);
            }
          }
        })
      }
    }else{
      this.registerForm.markAllAsTouched();
    }
  }

  // toggle password
  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
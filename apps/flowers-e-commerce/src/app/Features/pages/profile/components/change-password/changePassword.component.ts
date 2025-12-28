import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@elevate-workspace/auth';
import { AuthStatusComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/auth-status/auth-status.component';
import { ButtonComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component';
import { ErrorMessageComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/error-message/error-message.component';
import { FormInputComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/form-input/form-input.component';
import { InputOtp } from 'primeng/inputotp';
import { finalize, Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, FormInputComponent, ErrorMessageComponent, RouterLink, AuthStatusComponent, ButtonComponent],
  templateUrl: './changePassword.component.html',
  styleUrl: './changePassword.component.scss',
})
export class ChangePasswordComponent {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);  
  private destroy$ = new Subject<void>();
   successPassword:WritableSignal<string> = signal("");
  errorMsgPassword:WritableSignal<string> = signal("");
  isCallingAPI:WritableSignal<boolean> = signal(false);
  togglePassword: WritableSignal<boolean> = signal(false);


    changePassword: FormGroup =this._formBuilder.group({
      oldPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ]],
      confirmPassword: [null, [Validators.required]],
    },
    {validators: this.passwordMatchValidator}
    );
  
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { misMatch: true };
  }
  changePasswordSubmit(): void {
    if (this.changePassword.valid) {
      this.isCallingAPI.set(true);
      this.errorMsgPassword.set("");
      const payload = {
        password: this.changePassword.get('oldPassword')?.value,
        newPassword: this.changePassword.get('newPassword')?.value
      };
      this._authService.changePassword(payload)
      .pipe(takeUntil(this.destroy$), finalize( ()=> this.isCallingAPI.set(false) )).subscribe({
        next:(res)=>{
          if (res.message === "success") {
            timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
              localStorage.setItem("flowersEcommerceToken", res.token);
             
           
            })
            this.successPassword.set(res.message)
          }
        },error:(err:HttpErrorResponse)=> {
          if (err.error.error) {
            this.errorMsgPassword.set(err.error.error);
          }
        }
      })
    }
  }

  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }

}

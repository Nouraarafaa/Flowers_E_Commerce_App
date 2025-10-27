import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@elevate-workspace/auth';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { FormInputComponent } from "../../../Shared/components/ui/form-input/form-input.component";
import { ErrorMessageComponent } from "../../../Shared/components/ui/error-message/error-message.component";
import { Button } from "primeng/button";
import { DecorTopComponent } from "../../../Shared/components/ui/decor-top/decor-top.component";
import { DecorBottomComponent } from "../../../Shared/components/ui/decor-bottom/decor-bottom.component";

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, FormInputComponent, ErrorMessageComponent, Button, DecorTopComponent, DecorBottomComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);  
  private readonly _router = inject(Router);
  private destroy$ = new Subject<void>();

  step:WritableSignal<number> = signal(1);
  successEmail:WritableSignal<string> = signal("");
  errorMsgEmail:WritableSignal<string> = signal("");
  successCode:WritableSignal<string> = signal("");
  errorMsgCode:WritableSignal<string> = signal("");
  successPassword:WritableSignal<string> = signal("");
  errorMsgPassword:WritableSignal<string> = signal("");
  isCallingAPI:WritableSignal<boolean> = signal(false);
  togglePassword: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.initVerifyEmail();
    this.initVerifyCode();
    this.initResetPassword();
  }

  initVerifyEmail(): void {
    this.verifyEmail = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    });
  }
  initVerifyCode(): void {
    this.verifyCode = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{5,6}$/)]],
    });
  }
  initResetPassword(): void {
    this.resetPassword = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword:[null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ]]
    })
  }

  verifyEmailSubmit(): void {
    if (this.verifyEmail.valid) {
      
      const emailValue = this.verifyEmail.get("email")?.value;
      this.resetPassword.get("email")?.patchValue(emailValue);

      this.errorMsgEmail.set("");
      this.isCallingAPI.set(true);
      this._authService.forgotPassword(this.verifyEmail.value)
      .pipe(takeUntil(this.destroy$), finalize( ()=> this.isCallingAPI.set(false) )).subscribe({
        next:(res)=>{
          if (res.message === "success") {
            timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
              this.step.set(2);
            })
            this.successEmail.set(res.info);
          }
        },error:(err:HttpErrorResponse)=> {
          if (err.error.error) {
            this.errorMsgEmail.set(err.error.error);
          }
        }
      })
    }else{
      this.verifyEmail.markAllAsTouched();
    }
  }
  
  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.errorMsgCode.set("");
      this.isCallingAPI.set(true);
      this._authService.verifyCode(this.verifyCode.value)
      .pipe(takeUntil(this.destroy$), finalize( ()=> this.isCallingAPI.set(false) )).subscribe({
        next:(res)=>{
          if (res.status === "Success") {
            timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
              this.step.set(3);
            })
            this.successCode.set(res.status);
          }
        },error:(err:HttpErrorResponse)=> {
          if (err.error.error) {
            this.errorMsgCode.set(err.error.error);
          }
        }
      })
    }else{
      this.verifyCode.markAllAsTouched();
    }
  }
  
  resetPasswordSubmit(): void {
    if (this.resetPassword.valid) {
      this.isCallingAPI.set(true);
      this.errorMsgPassword.set("");
      this._authService.resetPassword(this.resetPassword.value)
      .pipe(takeUntil(this.destroy$), finalize( ()=> this.isCallingAPI.set(false) )).subscribe({
        next:(res)=>{
          if (res.message === "success") {
            timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
              localStorage.setItem("flowersEcommerceToken", res.token);
              this._router.navigate(['/home']);
            })
            this.successPassword.set(res.message)
          }
        },error:(err:HttpErrorResponse)=> {
          if (err.error.error) {
            this.errorMsgPassword.set(err.error.error);
          }
        }
      })
    }else{
      this.resetPassword.markAllAsTouched();
    }
  }

  // toggle password
  togglePasswordVisibility(): void {
    this.togglePassword.update(prev => !prev);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
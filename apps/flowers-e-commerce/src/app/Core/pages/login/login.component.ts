import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { DecorTopComponent } from "../../../Shared/components/ui/decor-top/decor-top.component";
import { DecorBottomComponent } from "../../../Shared/components/ui/decor-bottom/decor-bottom.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '@elevate-workspace/auth';
import { Router, RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Button } from "primeng/button";
import { FormInputComponent } from "../../../Shared/components/ui/form-input/form-input.component";
import { ErrorMessageComponent } from "../../../Shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DecorTopComponent, DecorBottomComponent, Button, FormInputComponent, ErrorMessageComponent, ɵInternalFormsSharedModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!:FormGroup;
  private readonly _authService = inject(AuthService)
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
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
  }

  submitForm(): void{
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.errorMsg.set("");
      if (!this.isCallingAPI()) {
        this.isCallingAPI.set(true);
        this._authService.login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$), finalize(()=> this.isCallingAPI.set(false))).subscribe({
          next:(res)=>{
            console.log(res);
            if (res.message === "success") {
              timer(1000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
                localStorage.setItem("flowersEcommerceToken", res.token);
                this._router.navigate(['/home']);
              })
              this.success.set(res.message);
            }
          },
          error:(err: HttpErrorResponse)=>{
            console.log(err);
            if (err.error.error) {
              this.errorMsg.set(err.error.error);
            }
          }
        })
      }

    }else{
      this.loginForm.markAllAsTouched();
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

import { Component, inject, OnInit } from '@angular/core';
import { FormInputComponent } from "../../../..//Shared/components/ui/form-input/form-input.component";
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from "../../../../Shared/components/ui/button/button.component";
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@elevate-workspace/auth';
import { ErrorMessageComponent } from "../../../../Shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-update-profile',
  imports: [FormInputComponent, DropdownModule, ButtonComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnInit {

  registerForm!:FormGroup;
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);


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
    })
  }


  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];





}

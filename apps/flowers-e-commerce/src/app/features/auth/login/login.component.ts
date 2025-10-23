import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputsComponent } from "../../../shared/inputs/inputs.component";
import { InputType } from '../../../shared/inputs/type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputsComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  InputType = InputType;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

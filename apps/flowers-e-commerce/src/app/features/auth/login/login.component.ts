import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  , ReactiveFormsModule} from '@angular/forms';
import { InputsComponent } from "../../../shared/inputs/inputs.component";

@Component({
  selector: 'app-login',
  imports: [InputsComponent , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

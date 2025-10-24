import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { InputsComponent } from "./shared/inputs/inputs.component";
import { LoginComponent } from "./features/auth/login/login.component";

@Component({
  imports: [NxWelcomeComponent, RouterModule, InputsComponent, LoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flowers-e-commerce';

  
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrl: './not-auth.component.scss',

})
export class NotAuthComponent {

  goToHomePage() {
    window.location.href = environment.websiteUrl;
  }
}

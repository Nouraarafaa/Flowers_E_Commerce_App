import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-auth',
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <img src="Images/not-authorized.png" alt="Not Authorized" class="max-w-2xl w-full mb-12">
      <button (click)="goLogin()" class="bg-maroon-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-maroon-800 transition-colors shadow-lg">
        Log In / Re-authenticate
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotAuthComponent {
  private _router = inject(Router);

  goLogin() {
    this._router.navigate(['/login']); // Assuming there is a login route
  }
}

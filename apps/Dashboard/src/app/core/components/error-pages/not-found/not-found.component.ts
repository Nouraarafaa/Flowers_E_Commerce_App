import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <img src="Images/notfound.png" alt="Not Found" class="max-w-2xl w-full mb-12">
      <button routerLink="/" class="bg-maroon-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-maroon-800 transition-colors shadow-lg">
        Go Home
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotFoundComponent {}

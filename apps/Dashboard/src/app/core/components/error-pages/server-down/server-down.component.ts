import { Component } from '@angular/core';

@Component({
  selector: 'app-server-down',
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <img src="Images/serverdown.png" alt="Server Down" class="max-w-2xl w-full mb-12">
      <button (click)="retry()" class="bg-maroon-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-maroon-800 transition-colors shadow-lg">
        Try Again
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ServerDownComponent {
  retry() {
    window.location.reload();
  }
}

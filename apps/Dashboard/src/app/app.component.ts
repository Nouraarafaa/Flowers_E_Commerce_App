import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UiErrorService } from './core/services/ui-error/ui-error.service';
import { filter } from 'rxjs';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _router = inject(Router);
  private readonly _uiErrorService = inject(UiErrorService);

  constructor() {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._uiErrorService.clearError();
      });
  }
}

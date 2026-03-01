import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from "./Shared/components/ui/confirm-dialog/confirm-dialog.component";

@Component({
  imports: [RouterModule, ConfirmDialogComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'flowers-e-commerce';


}
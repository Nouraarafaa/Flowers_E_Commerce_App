import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from "./shared/side-bar/components/side-bar-component/sideBar.component";

@Component({
  imports: [RouterModule, SideBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Dashboard';
}

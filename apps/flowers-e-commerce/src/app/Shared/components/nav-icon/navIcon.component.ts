import { Component, input } from '@angular/core';
import { RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-icon',
  imports: [RouterLink],
  templateUrl: './navIcon.component.html',
  styleUrl: './navIcon.component.scss',
})
export class NavIconComponent {
  pageName =input.required<string>();
  iconName=input.required<string>();
  itemsCheck=input.required<number>();
  userStatus=input.required<string>();
}

import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar-link',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './sideBarLink.component.html',
  styleUrl: './sideBarLink.component.scss',
})
export class SideBarLinkComponent {
  sideBarLinkName=input.required<string>();
  sideBarPagePath=input.required<string>();
  sideBarIcon=input.required<string>();
}

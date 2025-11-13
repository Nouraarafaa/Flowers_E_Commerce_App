import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-link',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navigationLink.component.html',
  styleUrl: './navigationLink.component.scss',
})
export class NavigationLinkComponent {
  navigationLinkName=input.required<string>();
  navigationPagePath=input.required<string>();
  navigationIcon=input.required<string>();
}

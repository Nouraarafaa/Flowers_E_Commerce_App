import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { RouterLink } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { NavIconComponent } from '../nav-icon/navIcon.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { ToggleButton } from 'primeng/togglebutton';
import { TranslationMyAppService } from '../../../Core/services/TranslationMyApp/translation-my-app.service';


@Component({
  selector: 'app-navbar',
  imports: [RippleModule, NgIf, Menu, Toolbar, ButtonModule, InputTextModule, IconField, InputIcon, RouterLink, NavIconComponent, FormsModule, ToggleButton],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {


  userLoggedNavBar = input.required<boolean>();
  firstNameNavBar = input.required<string>();
  lastNameNavBar = input.required<string>();
  userCityNavBar = input.required<string>();
  wihlistItemsNavBar = input.required<number>();
  cartItemsNavBar = input.required<number>();
  notificationNumNavBar = input.required<number>();

  clicked = output<void>();

  checkedModel = false; // false = en, true = ar

  translation = inject(TranslationMyAppService);

  onLangChange() {
    const lang = this.checkedModel ? 'ar' : 'en';
    this.translation.setLanguage(lang);
  }


  items: MenuItem[] | undefined;

  _searchService = inject(SearchService);

  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {

        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-user',

          },
          {
            label: 'My Addresses',
            icon: 'pi pi-map-marker',

          },
          {
            label: 'My Orders',
            icon: `svg-order-icon`,


          },
          {
            label: 'Dashboard',
            icon: 'pi pi-cog',

          },
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.onClick(); // Call your function here
            }

          }
        ]
      }
    ];

  }


  onClick() {
    this.clicked.emit();
  }

}

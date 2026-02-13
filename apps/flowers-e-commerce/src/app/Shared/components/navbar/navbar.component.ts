import { Component, OnInit, PLATFORM_ID, computed, inject, input, output, signal } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Router, RouterLink } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { NavIconComponent } from '../nav-icon/navIcon.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search/search.service';
import { ToggleButton } from 'primeng/togglebutton';
import { TranslationMyAppService } from '../../../Core/services/TranslationMyApp/translation-my-app.service';
import { environment } from '../../../Core/environments/environment';


@Component({
  selector: 'app-navbar',
  imports: [RippleModule, NgIf, Menu, Toolbar, ButtonModule, InputTextModule, IconField, InputIcon, RouterLink, NavIconComponent, FormsModule, ToggleButton],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {


  userLoggedNavBar = input.required<boolean>();
  firstNameNavBar = input.required<string>();
  userRoleNavBar = input.required<string>();
  lastNameNavBar = input.required<string>();
  userCityNavBar = input.required<string>();
  wihlistItemsNavBar = input.required<number>();
  cartItemsNavBar = input.required<number>();
  notificationNumNavBar = input.required<number>();

  private readonly _router = inject(Router);
  
  clicked = output<void>();

  checkedModel = false; // false = en, true = ar

  public translation = inject(TranslationMyAppService);

  onLangChange() {
    const lang = this.checkedModel ? 'ar' : 'en';
    this.translation.setLanguage(lang);
  }

  _searchService = inject(SearchService);

  isDarkMode = false;

 
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  items = computed<MenuItem[]>(() => {
  
  return[
    {
        separator: true
      },
      {
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-user',
            command: () => {
              this._router.navigate(['/profile'])
            }
          },
          {
            label: 'My Addresses',
            icon: 'pi pi-map-marker',

          },
          {
            label: 'My Orders',
            icon: `svg-order-icon`,
           command: () => {
              this._router.navigate(['/allOrders'])
            }

          },
          {
            label: 'Dashboard',
            icon: 'pi pi-cog',
            visible: this.userRoleNavBar() === 'admin',
          command: () => { window.open(environment.dashboardUrl, '_blank'); }
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
    });

  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkClass();
  }
    
  }


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateDarkClass();
  }

  private updateDarkClass() {
    const root = document.documentElement;
    if (this.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  onClick() {
    this.clicked.emit();
  }

}

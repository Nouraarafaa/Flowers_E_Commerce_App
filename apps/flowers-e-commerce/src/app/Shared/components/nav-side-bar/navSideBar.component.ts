import { Component, HostListener, inject, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Drawer } from 'primeng/drawer';
import { AuthService } from '@elevate-workspace/auth';

import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { NavLinkSideBarComponent } from "../nav-link-side-bar/navLinkSideBar.component";
import { Dialog } from 'primeng/dialog';
import { ButtonComponent } from "../ui/button/button.component";


@Component({
  selector: 'app-nav-side-bar',
  imports: [Dialog, DrawerModule, ButtonModule, Ripple, InputTextModule, IconField, InputIcon, NavLinkSideBarComponent, ButtonComponent],
  templateUrl: './navSideBar.component.html',
  styleUrl: './navSideBar.component.scss',
})
export class NavSideBarComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  visible: boolean = false;

  userLoggedSideBar = input.required<boolean>();
  firstNameSideBar = input.required<string>();
  lastNameSideBar = input.required<string>();
  userPhotoSideBar = input.required<string>();
  userCitySideBar = input.required<string>();
  wihlistItemsSideBar = input.required<number>();
  cartItemsSideBar = input.required<number>();
  notificationNumSideBar = input.required<number>();


  // logoutSubs!: Subscription;

  visibleDialog: boolean = false;
  private readonly HIDE_THRESHOLD = 768;
  private readonly _authService = inject(AuthService);
  
  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth > this.HIDE_THRESHOLD) {

      this.visible = false;
    }
  }

  openDrawer(): void {
    if (window.innerWidth <= this.HIDE_THRESHOLD) {
      this.visible = true;
    }
  }


  logoutUser(): void {
    this._authService.logout().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.removeItem('flowersEcommerceToken');
          window.location.reload();
        }

      }
    })
  }

  showDialog() {
    this.visibleDialog = true;
  }
  giftSearch() {
    // code write here
  }
}

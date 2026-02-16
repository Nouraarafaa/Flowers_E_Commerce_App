import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { SideBarLinkComponent } from "../sidebar-link/sideBarLink.component";
import { AuthService } from '@elevate-workspace/auth';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'apps/Dashboard/src/app/core/environments/environment';


@Component({
  selector: 'app-side-bar',
  imports: [Menu, ButtonModule, SideBarLinkComponent],
  templateUrl: './sideBar.component.html',
  styleUrl: './sideBar.component.scss',
})
export class SideBarComponent implements OnInit,OnDestroy {

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  websiteUrl = environment.websiteUrl;

  items: MenuItem[] | undefined;
  firstName: string = '';
  lastName: string = '';
  userEmail: string = '';
  userPhoto: string = '';
  private destroy$ = new Subject<void>();

  sideBarLinks: {
    sideLinkName: string,
    pagePath: string,
    icon: string
  }[] = [
      {
        sideLinkName: 'Overview',
        pagePath: '/dashboard',
        icon: 'pi-th-large'
      },
      {
        sideLinkName: 'Categories',
        pagePath: '/categories',
        icon: 'pi-clipboard'
      },
      {
        sideLinkName: 'Occasions',
        pagePath: '/occasions',
        icon: 'pi-calendar-clock'
      },
      {
        sideLinkName: 'Products',
        pagePath: '/products',
        icon: 'pi-box'
      }];


  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        items: [
          {
            label: 'Account',
            icon: 'pi pi-user',
            command: () => {
              this._router.navigate(['/update-profile'])
            }
          }, {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.onClick(); // Call your function here
            }

          }
        ]
      }
    ];
    this.getUserNameAndPhoto();
  }

  getUserNameAndPhoto(): void {
    this._authService.getLoggedUserData().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.firstName = res.user.firstName;
        this.lastName = res.user.lastName;
        this.userEmail=res.user.email;
        this.userPhoto = res.user.photo;

      }
    })
  }

  onClick() {
    console.log("Logout");

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

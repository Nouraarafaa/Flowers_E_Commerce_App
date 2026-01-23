import { Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from "@angular/router";
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from "../Components/sidebar/sidebar.component";
import { Subscription } from 'rxjs';
import { AuthService } from '@elevate-workspace/auth';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, SidebarComponent, DrawerModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnDestroy {
  visible = false;
  logoutSubs!: Subscription;
  private readonly _authService = inject(AuthService);

  logoutUser(): void {
    this.logoutSubs = this._authService.logout().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          localStorage.removeItem('flowersEcommerceToken')
          window.location.reload();

        }

      }
    })
  }

  ngOnDestroy(): void {
    this.logoutSubs?.unsubscribe();
  }
}

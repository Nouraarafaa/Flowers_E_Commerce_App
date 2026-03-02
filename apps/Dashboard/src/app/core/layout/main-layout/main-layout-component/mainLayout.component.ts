import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from "../components/side-bar/components/side-bar-component/sideBar.component";
import { Router, RouterModule } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-main-layout',
  imports: [SideBarComponent, RouterModule, Menu, ButtonModule],
  templateUrl: './mainLayout.component.html',
  styleUrl: './mainLayout.component.scss',
})
export class MainLayoutComponent implements OnInit {

  private readonly _router = inject(Router);

    items: MenuItem[] | undefined;

    ngOnInit() {
      this.items = [
          {
              label: 'name',
              items: [
                  {
                      label: 'Profile',
                      icon: 'pi pi-user',
                      command:() => {
                        this._router.navigate(["/update-profile"])
                      },
                  },
                  {
                      label: 'Log Out', 
                      icon: 'pi pi-sign-out',
                      command:() => {
                        this.logOut();
                      },
                  }
              ]
          }
      ];
    }


    logOut() {
      console.log("Log Out");
    }


}

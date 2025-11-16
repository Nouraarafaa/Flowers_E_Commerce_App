import { Component } from '@angular/core';
import { SectionTitleComponent } from "apps/flowers-e-commerce/src/app/shared/components/section-title/sectionTitle.component";
import { ButtonComponent } from "apps/flowers-e-commerce/src/app/shared/components/ui/button/button.component";


@Component({
  selector: 'app-best-selling-products',
  imports: [SectionTitleComponent, ButtonComponent],
  templateUrl: './bestSellingProducts.component.html',
  styleUrl: './bestSellingProducts.component.scss',
})
export class BestSellingProductsComponent {}

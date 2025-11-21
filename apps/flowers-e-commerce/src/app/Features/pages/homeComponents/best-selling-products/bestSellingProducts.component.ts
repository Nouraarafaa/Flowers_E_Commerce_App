import { Component, input } from '@angular/core';
import { SectionTitleComponent } from "apps/flowers-e-commerce/src/app/shared/components/section-title/sectionTitle.component";
import { ButtonComponent } from 'apps/flowers-e-commerce/src/app/Shared/components/ui/button/button.component';
import { BestSeller } from 'apps/flowers-e-commerce/src/app/Shared/interfaces/HomeResponse/home-response';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProductCardComponent } from "apps/flowers-e-commerce/src/app/Shared/components/ui/product-card/product-card.component";


@Component({
  selector: 'app-best-selling-products',
  imports: [SectionTitleComponent, ButtonComponent, Carousel, ButtonModule, ProductCardComponent],
  templateUrl: './bestSellingProducts.component.html',
  styleUrl: './bestSellingProducts.component.scss',
})
export class BestSellingProductsComponent {
  bestSellingProducts = input.required<BestSeller[]>();


    responsiveOptions: any[] | undefined;

    

    ngOnInit() {
     
        this.responsiveOptions = [
            
            {
                breakpoint: '1300px',
                numVisible: 3,
                numScroll: 1
            },
            
            {
                breakpoint: '800px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '640px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }

  }

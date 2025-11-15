import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  imports: [],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
})
export class BenefitsComponent {
  benefitsList:{
    icon:string,
    benefit:string,
    p:string
  }[]=[
    {
      icon:"pi-truck",
      benefit:"Free Delivery",
      p:"For orders above 120 EGP"
    },
    {
      icon:"pi-sync",
      benefit:"Get Refund",
      p:"Refunds within 30 days"
    },
    {
      icon:"pi-shield",
      benefit:"Safe Payment",
      p:"100% Secure Payment"
    },
    {
      icon:"pi-headphones",
      benefit:"24/7 Support",
      p:"Contact us at any time"
    },
    
  ]
}

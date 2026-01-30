import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {

  paymentMethodSelected: string = '';

  navigateToShipping(){

  }
  onCheckout(){}
  paymentMethod(method: string){
    this.paymentMethodSelected = method;
  }
}

import { Component, output } from '@angular/core';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {

  paymentMethodSelected: string = '';
  onClickToBackToShipping = output();

  navigateToShipping(){
    this.onClickToBackToShipping.emit();
  }
  onCheckout(){}
  paymentMethod(method: string){
    this.paymentMethodSelected = method;
  }
}

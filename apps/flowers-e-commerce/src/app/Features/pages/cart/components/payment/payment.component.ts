import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { Address } from '../../interfaces/address';
import { OrdersService } from '../../../user-orders/services/orders.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnDestroy{

  paymentMethodSelected: string = '';
  userAddress = input<Address>();
  onClickToBackToShipping = output();

  private readonly _ordersService = inject(OrdersService);
  private readonly _router = inject(Router);
  private readonly _toastrService = inject(ToastrService);

  createCashOrderSubs!:Subscription

  navigateToShipping() {
    this.onClickToBackToShipping.emit();
  }
  onCheckout() {
   
    const payload = {
      "shippingAddress": {
        "street": this.userAddress()?.street!,
        "phone": this.userAddress()?.phone!,
        "city": this.userAddress()?.city!,
        "lat": this.userAddress()?.lat!,
        "long": this.userAddress()?.long!
      }
    }
    if (this.paymentMethodSelected == 'cash') {
      this.createCashOrderSubs = this._ordersService.createCashOrder(payload).subscribe({
        next:(res)=>{
          if(res.message == "success"){
            this._toastrService.success('Order Created Successfully');
            this._router.navigate(['/allOrders']);
          }
        }
      })

    }




  }
  paymentMethod(method: string) {
    this.paymentMethodSelected = method;
  }

  ngOnDestroy(): void {
    this.createCashOrderSubs?.unsubscribe();
  }
}

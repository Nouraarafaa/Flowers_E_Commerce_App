import { Component, input } from '@angular/core';
import { OrderItem } from '../../interfaces/response';

  
  

@Component({
  selector: 'app-order-item',
  imports: [],
templateUrl: './orderItem.component.html',
  styleUrl: './orderItem.component.scss',
})
export class OrderItemComponent {
  orderItem = input<OrderItem|undefined>()
}

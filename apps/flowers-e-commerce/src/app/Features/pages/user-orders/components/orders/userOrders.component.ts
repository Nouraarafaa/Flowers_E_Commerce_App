import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from '../../interfaces/response';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { OrderItemComponent } from "../order-item-card/orderItem.component";


@Component({
  selector: 'app-user-orders',
  imports: [DatePipe, CurrencyPipe, BadgeModule, OrderItemComponent],
  templateUrl: './userOrders.component.html',
  styleUrl: './userOrders.component.scss',
})
export class UserOrdersComponent implements OnInit, OnDestroy {

  private readonly _ordersService = inject(OrdersService);
  getUserOrdersSub!:Subscription;
  orders:Order[]=[];
  showAll = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.getUserOrdersSub = this._ordersService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = res.orders
        console.log(res);
        
      }
    })
  }

  ngOnDestroy(): void {
    this.getUserOrdersSub?.unsubscribe();

  }
}

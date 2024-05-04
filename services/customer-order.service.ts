import { Injectable } from '@angular/core';
import * as orders from '../json/orders.json';
import * as orderItems from '../json/order-items.json';
import { CustomerService } from './customer.service';
import { CustomerOrder } from '../interfaces/customer-order';
import { OrderItem } from '../interfaces/order-item';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrderService {
  customers: Customer[];
  order: CustomerOrder;
  orders: CustomerOrder[];
  customerOrders: CustomerOrder[];
  orderItem: OrderItem;
  orderItems: OrderItem[] = [];
  allItems: OrderItem[];
  count: number;
  public itemCount: number = 0;
  imageUrl: any[] = [];
  firstName: string;
  lastName: string;
  public p: number = 1;

  constructor(public customerService: CustomerService) {}

  /*  Friday  just create three json files with select * from each of customer, customerorder, OrderItem
    then figure out how to combine them using javascript
        we already have customers

      select * from customer  where CustomerID=2025
      select * from customerorder where customerid = 2025
      select * from OrderItem where orderid in (select orderid from customerorder where customerid = 2025)

  */

  getOrders(id: number) {
    this.orders = (orders as any).default;
    this.firstName = this.customerService.customer.FirstName;
    this.lastName = this.customerService.customer.LastName;
    this.orders = this.orders.filter((o) => o.CustomerId === id);
    this.count = this.orders.length;
    setTimeout(() => {
      console.log('fetching')
    }, 2000);
  }

  getOrderItems(id: number) {
    this.orderItems = (orderItems as any).default;
    this.orderItems = this.orderItems.filter((x) => x.OrderId === id);
    let i = 0;
    let itemCount = 0;
    this.orderItems.forEach((element) => {
      this.imageUrl[i] = 'data:image/png;base64,' + element.ThumbnailPhoto;
      itemCount += element.ItemCount;
      i++;
    });
    this.itemCount = itemCount;
  }

  reset() {
    this.order = null;
    this.orders = null;
    this.orderItems = null;
    this.orderItem = null;
  }
}

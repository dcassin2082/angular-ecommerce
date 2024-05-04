import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import * as customers from '../json/customers.json';
import { CustomerOrderService } from './customer-order.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customers: Customer[];
  customer: Customer;
  customerId: number;
  selectedRow: Number;

  constructor() {}

  getCustomers() {
    this.customers = (customers as any).default;
  }

  getCustomer(id: number) {
    this.customer = this.customers.find((c) => c.CustomerId === id);
  }
}

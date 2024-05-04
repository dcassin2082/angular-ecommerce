import { OrderItem } from './order-item';

export interface CustomerOrder {
  OrderId: number;
  CustomerId: number;
  OrderDate: Date;
  OrderTotal: number;
  OrderSubTotal: number;
  Tax: number;
  ShippingCharge: number;
  CreatedDate: Date;
  Shipped: boolean;
  ShipDate: Date;
  CreatedBy: number;
  Carrier: string;
  ItemCount: number;
  FirstName: string;
  LastName: string;
  OrderItems: OrderItem[];
}

import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { ShippingInfo } from '../interfaces/shipping-info';
import { CartInfo } from '../interfaces/cart-info';
import { PaymentInfo } from '../interfaces/payment-info';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  tax: number;
  subtotal: number;
  shipping: number;
  grandTotal: number;
  productsCount: number;
  cartTotal: number;
  selectedProducts: Product[];
  // shippingInfo: ShippingInfo = new ShippingInfo();
  // cartInfo: CartInfo = new CartInfo();
  // paymentInfo: PaymentInfo = new PaymentInfo();
  shippingInfo: ShippingInfo;
  cartInfo: CartInfo;
  paymentInfo: PaymentInfo;
  today: Date = new Date();
  deliveryDate: Date = new Date();
  shipDate: Date = new Date();

  constructor() {
    this.deliveryDate.setDate(this.today.getDate() + 7);
    this.shipDate.setDate(this.today.getDate() + 1);
  }
}

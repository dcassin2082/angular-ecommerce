import { Injectable } from '@angular/core';
import { Checkout } from '../interfaces/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  checkout: Checkout;

  resetCheckout() {
    this.checkout = {
      CheckoutId: null,
      FirstName: '',
      LastName: '',
      BillingAddress: '',
      BillingCity: '',
      BillingState: '-1',
      BillingZip: '',
      ShippingAddress: '',
      ShippingCity: '',
      ShippingState: '-1',
      ShippingZip: '',
      Phone: '',
      Email: '',
      CardNumber: '',
      CCV: '',
      CardNumbers: [],
      NameOnCard: '',
      Tax: null,
      Shipping: null,
    }
  }
}

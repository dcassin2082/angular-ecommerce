export interface Checkout {
  CheckoutId: number;
  FirstName: string;
  LastName:string;
  ShippingAddress: string;
  ShippingCity:string;
  ShippingState:string;
  ShippingZip: string;
  Phone:string;
  Email:string;
  CardNumbers: string[];
  CardNumber: string;
  NameOnCard: string;
  CCV: string;
  Tax: number;
  Shipping: number;
  BillingAddress: string;
  BillingCity: string;
  BillingState: string;
  BillingZip: string;
}

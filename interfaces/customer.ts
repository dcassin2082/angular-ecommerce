export interface Customer {
  CustomerId: number;
  FirstName: string;
  LastName: string;
  Address: string;
  City: string;
  State: string;
  Zip: string;
  Email: string;
  Phone: string;
  CreatedDate: Date;
  OrderCount: number;
  OrderAggregateProductTotal: number;
}

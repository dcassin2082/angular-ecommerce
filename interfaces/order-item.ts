export interface OrderItem {
  CustomerId: number;
  OrderId: number;
  OrderItemId: number;
  Description: string;
  LineTotal: number;
  ProductID: number;
  SKU: string;
  LargePhoto: any;
  ThumbnailPhoto: any;
  LargePhotoFileName: string;
  ThumbnailPhotoFileName: string;
  ItemCount: number;
  Price: number;
  DetailedDescription: string;
}

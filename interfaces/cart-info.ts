import { Product } from "./product";

export interface CartInfo {
  Tax: number;
  Subtotal: number;
  Shipping: number;
  GrandTotal: number;
  ProductsCount: number;
  CartTotal: number;
  SelectedProducts: Product[];
}

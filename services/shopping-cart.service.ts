import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }
  selectedProducts: Product[] = [];
  // selectedProduct: Product = new Product();
  selectedProduct: Product;
  cartTotal: number = 0;

  filter: Product[];
}

import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../services/confirmation.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  selectedMonth: number;
  orderNumber: number;
  transactionId: number;

  constructor(public confirmationService: ConfirmationService,
    public shoppingCartService: ShoppingCartService, public productService: ProductService, private router: Router) { }

    ngOnInit(): void {
      this.orderNumber = Math.floor(Math.random() * 1000);
      this.transactionId = Math.floor(Math.random() * 10000000);
    }

    
  continueShopping() {
    // this.filter();
    this.router.navigate(['/products']);
  }
}

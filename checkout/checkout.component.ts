import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { StateService } from '../services/state.service';
import { ConfirmationService } from '../services/confirmation.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('chk') chk: ElementRef;

   constructor(public stateService: StateService, public productService: ProductService, public shoppingCartService: ShoppingCartService, private router: Router,
    public checkoutService: CheckoutService, public confirmationService: ConfirmationService) { }

  tax: number;
  shipping: number;
  subtotal: number;
  grandTotal: number;
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[];
  month: string = new Date().getMonth().toString();
  year: string = new Date().getFullYear().toString();
  checked: boolean = true;
  cardType: string;
  result: string;
  selectedMonth: string = '-1';
  selectedYear: string = '-1';
  cards: string[] = ['4111111111111111', '5555555555554444'];
  selectedCardNumber: string = '-1';

  ngOnInit(): void {
    this.stateService.getStates();
    this.subtotal = this.shoppingCartService.cartTotal;
    this.tax = this.subtotal * 0.08;
    this.shipping = this.subtotal > 250 ? 0.00 : (this.subtotal == 0) ? 0.00 : 9.95;
    this.grandTotal = this.subtotal + this.tax + this.shipping;
    this.cardType = '';
    this.resetForm();
    this.checked = true;
  }

  copyText(val: string) {
    try {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      let t = document.getElementById
      let text = document.getElementById(val).innerText;
      selBox.value = text;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    } catch {
     alert('Unable to copy');
    }
  }
  continueShopping() {
    // this.filter();
    this.router.navigate(['/products']);
  }

  backToCart() {
    this.router.navigate(['shopping-cart'])
  }

  clearCardIcons() {
    this.cardType = '';
  }

  onSubmit(form: NgForm) {
    this.setConfirmationInfo();
    this.tax = 0;
    this.subtotal = 0;
    this.shipping = 0;
    this.grandTotal = 0;
    this.resetForm(form);
    let element: HTMLElement = document.getElementById('collapseOneLink') as HTMLElement;
    element.click();
    this.chk.nativeElement.checked = false;
    this.shoppingCartService.selectedProducts = [];
    this.productService.productsCount = 0;
    this.shoppingCartService.cartTotal = 0;
    this.router.navigate(['/confirmation']);
  }

  setConfirmationInfo() {
    this.confirmationService.cartInfo = {
      Tax: this.tax,
      Subtotal: this.subtotal,
      Shipping: this.shipping,
      GrandTotal: this.grandTotal,
      SelectedProducts: this.shoppingCartService.selectedProducts,
      ProductsCount: this.productService.productsCount,
      CartTotal: this.shoppingCartService.cartTotal
    }
    this.confirmationService.shippingInfo = {
      FirstName: this.checkoutService.checkout.FirstName,
      LastName: this.checkoutService.checkout.LastName,
      Address: this.checkoutService.checkout.ShippingAddress,
      City: this.checkoutService.checkout.ShippingCity,
      State: this.checkoutService.checkout.ShippingState,
      Zip: this.checkoutService.checkout.ShippingZip,
      Phone: this.checkoutService.checkout.Phone,
      Email: this.checkoutService.checkout.Email
    }
    this.confirmationService.paymentInfo = {
      NameOnCard: this.checkoutService.checkout.NameOnCard,
      CardNumber: this.checkoutService.checkout.CardNumber.slice(-4),
      CardType: this.cardType,
      Expiration: this.getSelectedMonth() + '/' + this.selectedYear
    }
  }
  expMonth: string;
  getSelectedMonth() {
    switch (this.selectedMonth) {
      case '0':
        return this.expMonth = '1';
      case '1':
        return this.expMonth = '2';
      case '2':
        return this.expMonth = '3';
      case '3':
        return this.expMonth = '4';
      case '4':
        return this.expMonth = '5';
      case '5':
        return this.expMonth = '6';
      case '6':
        return this.expMonth = '7';
      case '7':
        return this.expMonth = '8';
      case '8':
        return this.expMonth = '9';
      case '9':
        return this.expMonth = '10';
      case '10':
        return this.expMonth = '11';
      case '11':
        return this.expMonth = '12';
      default:
        return '';
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.checkoutService.resetCheckout();
    this.checked = false;
    this.selectedMonth = '-1';
    this.selectedYear = '-1';
  }

  setBillingAddress() {
    this.checked = !this.checked;
    if (this.checked) {
      this.checkoutService.checkout.BillingAddress = this.checkoutService.checkout.ShippingAddress;
      this.checkoutService.checkout.BillingCity = this.checkoutService.checkout.ShippingCity;
      this.checkoutService.checkout.BillingState = this.checkoutService.checkout.ShippingState;
      this.checkoutService.checkout.BillingZip = this.checkoutService.checkout.ShippingZip;
    }
    else {
      this.checkoutService.checkout.BillingAddress = '';
      this.checkoutService.checkout.BillingCity = '';
      this.checkoutService.checkout.BillingState = '-1';
      this.checkoutService.checkout.BillingZip = '';
    }
  }

  setCardNumber(event) {
    this.selectedCardNumber = event;
    this.validateCardNumber(this.selectedCardNumber);
  }

  setSelectedMonth(event) {
    var today = new Date();
    var currentMonth = today.getMonth().toString();
    var currentYear = today.getFullYear().toString();
    this.selectedMonth = event;

    if (parseInt(this.selectedMonth) >= parseInt(currentMonth)) {
      this.years = [parseInt(currentYear), parseInt(currentYear) + 1, parseInt(currentYear) + 2, parseInt(currentYear) + 3, parseInt(currentYear) + 4];
    }
    else {
      this.years = [parseInt(currentYear) + 1, parseInt(currentYear) + 2, parseInt(currentYear) + 3, parseInt(currentYear) + 4, parseInt(currentYear) + 5];
    }
    // if (parseInt(this.selectedMonth) >= parseInt(currentMonth)) {
    //   this.years = ['2022', '2023', '2024', '2025', '2026'];
    // }
    // else {
    //   this.years = ['2023', '2024', '2025', '2026', '2027'];
    // }
  }

  setSelectedYear(event) {
    var currentYear = new Date().getFullYear().toString();
    this.selectedYear = event;
  }

  validateCardNumber(cardNumber: string) {
    this.clearCardIcons();
    var digitSum = 0;
    var digits = '';
    var reversedCardNumber = '';

    if (cardNumber.length == 16) {
      for (var i = cardNumber.length - 1; i >= 0; i--) {
        reversedCardNumber += cardNumber[i];
      }
      for (var i = 0; i < reversedCardNumber.length; i++) {
        if ((i + 1) % 2 == 0) {
          digits += parseInt(reversedCardNumber.substr(i, 1)) * 2;
        }
        else {
          digits += reversedCardNumber.substr(i, 1);
        }
      }
      for (var i = 0; i < digits.length; i++) {
        digitSum += parseInt(digits.substr(i, 1));
      }
      if ((digitSum % 10) == 0) {
        if (cardNumber[0] == '4') {
          this.cardType = "Visa";
          this.result = "Visa"
        }
        else if (cardNumber[0] == '5') {
          this.cardType = "Mastercard";
          this.result = "Mastercard";
        }
        else if (cardNumber[0] == '6') {
          this.cardType = "Discover";
          this.result = "Discover"
        }
        else {
          this.result = "Invalid Card Type";
        }
      }
      else {
        this.result = "Card number is Invalid";
      }
    }
  }

}

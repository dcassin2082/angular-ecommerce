import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";
import { Product } from "../interfaces/product";
import { ShoppingCartService } from "../services/shopping-cart.service";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: [
    "./product.component.scss",
    "../products/products.component.scss",
  ],
})
export class ProductComponent implements OnInit {
  constructor(
    public productService: ProductService,
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  recentProducts: Product[];
  similarProducts: Product[];

  ngOnInit(): void {
    // this is a test item ****************
    // this.productService.product = this.productService.products.find(
    //   (p) => p.ProductId === 148
    // );
    ////// ******************************

    if (!this.productService.product) {
      this.router.navigate(["/products"]);
    }
    this.updateRecentlyViewedProducts();
    this.similarProducts = this.productService.products
      .filter(
        (p) =>
          p.ProductSubcategoryId ===
            this.productService.product.ProductSubcategoryId &&
          p.ProductId !== this.productService.product.ProductId
      )
      .slice(0, 3);
  }

  updateRecentlyViewedProducts() {
    let arr = this.productService.recentlyViewedProducts.slice(0, 5);
    if (
      this.productService.product &&
      !arr.includes(this.productService.product)
    ) {
      this.productService.recentlyViewedProducts.unshift(
        this.productService.product
      );
    }
    this.recentProducts = this.productService.recentlyViewedProducts.filter(
      (product, i, arr) =>
        arr.findIndex(
          (t) => t.ProductId === product.ProductId && product.ProductId != null
        ) === i
    );
    if (this.recentProducts) {
      if (this.recentProducts.length > 5) {
        this.recentProducts = this.recentProducts.slice(0, 5);
        this.productService.recentlyViewedProducts = this.recentProducts;
      }
    }
  }
  isEmpty(obj) {
    return obj && Object.keys(obj).length === 0;
  }

  addToCart(product: Product) {
    this.shoppingCartService.selectedProducts.push(product);
    this.productService.productsCount++;
    this.shoppingCartService.cartTotal += product.Price;
    let arr = this.shoppingCartService.selectedProducts.filter(
      (product, i, arr) =>
        arr.findIndex((t) => t.ProductId === product.ProductId) === i
    );
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].ProductId == product.ProductId) {
        arr[i].LineCount++;
      }
    }
    this.shoppingCartService.filter = arr;
    sessionStorage.setItem(
      "selectedProducts",
      JSON.stringify(this.shoppingCartService.selectedProducts)
    );
  }

  goBack() {
    this.router.navigate(["/products"]);
  }
  getProductByColor(color, size) {
    this.productService.product = this.productService.products.find(
      (p) =>
        p.ProductModelId == this.productService.productModelId &&
        p.Size == size &&
        p.Color == color
    );
    this.updateRecentlyViewedProducts();
  }

  getProductBySize(size, color) {
    this.productService.product = this.productService.products.find(
      (p) =>
        p.ProductModelId == this.productService.productModelId &&
        p.Size == size &&
        p.Color == color
    );
    this.updateRecentlyViewedProducts();
  }
}

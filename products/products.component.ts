import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as categories from '../json/product-category.json';
import * as products from '../json/products.json';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private router: Router, public productService: ProductService) {
    router.canceledNavigationResolution = 'computed';
  }

  reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  ngOnInit(): void {
    /*
      get all products
      get categories
      do some kind of random dispay, don't just show bikes
      set sort by: featured, price low, high, any other sorts you can think of?
    */
    // if(this.sortTerm === '-1') {
    //   this.sortTerm = 'featured';
    // }

    // this.productService.featuredProducts = this.productService.products.slice(
    //   0,
    //   2
    // );

    this.productService.itemCount = this.productService.products.length;
    this.getAllProducts();
    if (this.productService.subcategory !== '-1') {
      this.setSubcategory(this.productService.subcategory);
    }
    window.addEventListener("scroll", this.reveal, true);
    this.reveal();
  }

  clearSearch() {
    this.productService.filter = null;
  }

  resetSearch() {
    this.productService.p = 1;
  }

  getProducts(id: number, sort: string) {
    this.productService.page = 1;
    if (id === -1) {
    }
    let arr = [];
    this.productService.productSubCategories.forEach((x) => {
      arr.push(x.ProductSubcategoryId);
    });
    this.productService.products = this.productService.products.filter((p) =>
      arr.includes(p.ProductSubcategoryId)
    );
    this.productService.itemCount = this.productService.products.length;
    this.productService.categoryId =
      this.productService.productCategory.ProductCategoryId;
    this.productService.subcategory =
      this.productService.product.ProductSubcategoryId.toString();
    this.productService.subcategory =
      this.productService.productSubCategories.find(
        (x) =>
          x.ProductSubcategoryId ==
          this.productService.product.ProductSubcategoryId
      ).SubCategoryName;
  }

  getCategory(categoryId) {
    // get subcategories for this category
  }

  goBack() {
    switch (this.productService.previousCategoryId) {
      case -1:
        // back to beginning
        this.getAllProducts();
        this.productService.product = null;
        this.productService.categoryId = -1;
        this.productService.subcategory = '-1';
        break;
      default:
        this.productService.getProductSubcategories(
          this.productService.previousCategoryId
        );
        break;
    }
    // this should go back to the previous screen but since we are staying on the same page ....
    this.productService.product = null;
  }

  setSubcategory(name: string) {
    let index = parseInt(name);
    this.productService.productSubCategoryName =
      this.productService.productSubCategories.find(
        (s) => s.ProductSubcategoryId === index
      ).SubCategoryName;
    this.productService.products = (products as any).default;
    this.productService.subcategory = name;
    this.productService.products = this.productService.products.filter(
      (x) => x.ProductSubcategoryId == parseInt(name)
    );
    let productModelIds = [
      ...new Set(
        this.productService.products.map((item) => item.ProductModelId)
      ),
    ];

    let arr = [];
    /*  for each model id
        get the product
        get the sizes
        get the colors

    */
    productModelIds.forEach((x) => {
      this.productService.product = this.productService.products.find(
        (p) => p.ProductModelId === x
      );
      arr.push(this.productService.product);
    });
    this.productService.products = arr;

    this.productService.itemCount = this.productService.products.length;
    this.productService.product = null;
    this.productService.sort(this.productService.sortTerm);
  }

  getFeatured() {
    return this.productService.unsorted;
  }

  setItemsPerPage(count: number) {
    this.productService.itemsPerPage = count;
    this.productService.page = 1;
  }

  addToCart(product) {}

  getRandomSelections() {
    this.productService.randomSelections = [];
    let counter = 0;
    do {
      let prods = this.productService.products.filter(
        (p) => p.ThumbnailPhotoFileName !== 'no_image_available_small.gif'
      );
      let rand = Math.floor(Math.random() * prods.length);
      let prod = prods[rand];
      if (!this.productService.randomSelections.includes(prod)) {
        this.productService.randomSelections.push(prod);
        counter++;
      }
    } while (counter < this.productService.itemsPerPage);
  }

  public trackByFn(index, item) {
    if (!item) return null;
    return item.id;
  }

  getProductCategories() {
    this.productService.productCategories = (categories as any).default;
  }

  getAllProducts() {
    this.productService.itemCount = this.productService.products.length;
    this.productService.unsorted = Object.assign(
      [],
      this.productService.products
    );
  }
}

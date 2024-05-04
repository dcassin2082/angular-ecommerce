import { Injectable } from "@angular/core";
import * as categories from "../json/product-category.json";
import * as subCategories from "../json/product-sub-categories.json";
import * as products from "../json/products.json";
import * as landing from "../json/landing_page.json";
import { ProductCategory } from "../interfaces/product-category";
import { ProductSubCategory } from "../interfaces/product-sub-category";
import { Product } from "../interfaces/product";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  productCategories: ProductCategory[] = (categories as any).default;
  products: Product[] = (products as any).default;
  landingPage: Product[] = (landing as any).default;
  productSubCategories: ProductSubCategory[] = (subCategories as any).default;
  productCategory: ProductCategory;
  featuredProducts: Product[] = [];
  itemCount: number;
  sortTerm: string = "-1";
  productsCount: number = 0;
  subcategory: string = "-1";
  productSubCategoryName: string = "";
  categoryId: number = -1;
  unsorted: Product[];
  itemsPerPage: number = this.products.length;
  page: number = 1;
  randomSelections: Product[] = [];
  similarProducts: Product[] = [];
  filter: string;
  p: number = 1;
  category: string = "";
  product: Product;
  sizes: any[] = [];
  size: string = "";
  color: string = "";
  colors: any[] = [];
  productModelId: number;
  previousCategoryId: number = -1;
  relatedProducts: Product[] = [];
  recentlyViewedProducts: Product[] = [];

  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(["/shopping-cart"]);
  }

  getProduct(productId) {
    /*
      drill into product
      show related products, recently viewed, customer reviews, etc


    */
    this.relatedProducts = [];
    this.router.navigate(["/product"]);
    this.products = (products as any).default;

    this.product = this.products.find((p) => p.ProductId === productId);
    this.products = this.products.filter(
      (p) => p.ProductModelId === this.product.ProductModelId
    );
    this.sizes = [...new Set(this.products.map((item) => item.Size))];
    this.colors = [...new Set(this.products.map((item) => item.Color))];
    let colors = this.colors.filter((c) => c != this.product.Color);
    colors.forEach((c) => {
      let prod = this.products.find((p) => p.Color !== this.product.Color);
      this.relatedProducts.push(prod);
    });

    this.productModelId = this.product.ProductModelId;
    this.size = this.product.Size;
    this.color = this.product.Color;
    this.categoryId = this.product.ProductCategoryId;
    this.productSubCategories = (subCategories as any).default;
    this.productSubCategories = this.productSubCategories.filter(
      (s) => s.ProductCategoryId === this.product.ProductCategoryId
    );
    this.subcategory = this.product.ProductSubcategoryId.toString();

    // let arr = this.recentlyViewedProducts.slice(0, 5);
    // if (this.product && !arr.includes(this.product)) {
    //   this.recentlyViewedProducts.unshift(this.product);
    // }
    // if (this.recentlyViewedProducts) {
    //   if (this.recentlyViewedProducts.length > 5) {
    //     this.recentlyViewedProducts = this.recentlyViewedProducts.slice(0, 5);
    //   }
    // }
    // get related products
  }

  getProductSubcategories(id) {
    this.previousCategoryId = id;
    switch (id) {
      case "1":
        this.category = "Bikes";
        break;
      case "2":
        this.category = "Components";
        break;
      case "3":
        this.category = "Clothing";
        break;
      case "4":
        this.category = "Accessories";
        break;
      default:
        this.category = "All Categories";
        this.categoryId = -1;
        break;
    }
    this.productSubCategories = (subCategories as any).default;
    this.page = 1;
    // this.products = Object.assign([], this.unsorted);
    this.products = (products as any).default;
    if (id == "-1") {
      this.itemCount = this.products.length;
      this.subcategory = "-1";
      this.productSubCategories = [];
      this.product = null;
      return;
    }
    this.subcategory = "-1";
    this.productSubCategories = this.productSubCategories.filter(
      (sc) => sc.ProductCategoryId == id
    );

    this.productCategory = this.productCategories.find(
      (x) => x.ProductCategoryId == id
    );

    let subCats = [];
    this.productSubCategories.forEach((x) => {
      let prod = this.products.find(
        (p) => p.ProductSubcategoryId == x.ProductSubcategoryId
      );
      if (!prod) {
        this.productSubCategories = this.productSubCategories.filter(
          (item) => item !== x
        );
      }
      subCats.push(x.ProductSubcategoryId);
    });
    this.products = this.products.filter((x) =>
      subCats.includes(x.ProductSubcategoryId)
    );

    // let prods = this.products.filter((value, index, array) => array.indexOf(value) === index);
    let productModelIds = [
      ...new Set(this.products.map((item) => item.ProductModelId)),
    ];
    let arr = [];
    productModelIds.forEach((x) => {
      this.product = this.products.find((p) => p.ProductModelId === x);
      arr.push(this.product);
    });
    this.products = arr;

    this.productCategory = this.productCategories.find(
      (x) => x.ProductCategoryId == id
    );

    this.categoryId = id;
    // this.getRandomSelections();
    if (this.sortTerm !== "-1") {
      this.sort(this.sortTerm);
    }
    this.itemCount = this.products.length;
    this.product = null;
  }

  sort(term: string) {
    this.sortTerm = term;
    if (term === "sort-asc") {
      return this.products.sort(function (a, b) {
        return a.Price > b.Price ? 1 : a.Price < b.Price ? -1 : 0;
      });
    } else if (term === "sort-desc") {
      return this.products.sort(function (a, b) {
        return a.Price < b.Price ? 1 : a.Price > b.Price ? -1 : 0;
      });
    } else if (term === "featured" && this.categoryId === -1) {
      this.products = Object.assign([], this.unsorted);
      this.itemCount = this.products.length;
      this.categoryId = -1;
      this.subcategory = "-1";
      return this.products;
    } else {
      return this.products;
    }
  }
}

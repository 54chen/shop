import { Component,OnInit } from '@angular/core';
import { Product } from '../_models/product';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_service/product.service';
import { CartService } from '../_service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => (this.products = products)
    );
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart but you need to login to checkout!');
  }
}



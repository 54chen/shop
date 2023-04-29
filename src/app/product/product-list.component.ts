import { Component,OnInit } from '@angular/core';
import { Product, products } from '../_models/products';

import { ActivatedRoute } from '@angular/router';
import { CartService } from '../_service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
  share() {
    window.alert('The product has been shared!');
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}



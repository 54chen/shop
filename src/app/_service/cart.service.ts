import { Injectable } from '@angular/core';
import { Product } from '../_models/product';

/**
 * This service provides functionality for cart operation.
 *
 * @dependencies 
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  constructor() { }

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  
}

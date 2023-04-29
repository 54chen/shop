import { Component } from '@angular/core';
import { CartService } from '../_service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();

  constructor(
    private cartService: CartService
  ) { }

  clearCart() {
    this.cartService.clearCart();
    this.items = this.cartService.getItems();
    window.alert('Your cart has been cleared!');
  }
}

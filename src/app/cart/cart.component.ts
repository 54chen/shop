import { Component,OnInit } from '@angular/core';
import { CartService } from '../_service/cart.service';
import { AuthService } from '../_service/auth.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { OrderService } from '../_service/order.service';
import { Order } from '../_models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  user:User|undefined;
  result = "";
  cartForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.result="";
    this.authService.getUsersById(this.authService.userValue?.id).subscribe(u=>this.user = u);
    this.cartForm = new FormGroup({
      firstname: new FormControl('',[Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(1)]),
      email: new FormControl('',[Validators.required, Validators.email]),
    });
}
  clearCart() {
    this.cartService.clearCart();
    this.items = this.cartService.getItems();
    window.alert('Your cart has been cleared!');
  }

  onSubmit() {
    if (this.cartForm.value) {
      const formData = this.cartForm.value;
      this.authService.updateUser({...this.user as User, firstName:formData.firstname, lastName: formData.lastname, email: formData.email}).subscribe(
        user => {this.user = user;}
      );

      let orders: Order[] = [];
      this.items.map(cart=>{
        const o: Order = {
          sku: cart.id,
          price: cart.price,
          count: 1,
          owner: this.user?.id,
          time: Math.floor(new Date().getTime() / 1000)
        };
        orders.push(o);
      });

      let os: Order[] = [];
      os = orders.reduce((acc, order) => {
        const existingOrder = acc.find(o => o.sku === order.sku);
        if (existingOrder) {
          existingOrder.count += order.count;
        } else {
          acc.push(order);
        }
        return acc;
      }, os);
      os.map(o=>{
        this.orderService.postOrder(o).subscribe();
      });
      this.result = "R";
      this.cartService.clearCart();
    }
  }


  get firstname() {
    return this.cartForm.get('firstname');
  }
  get lastname() {
    return this.cartForm.get('lastname');
  }
  get email() {
    return this.cartForm.get('email');
  }
}

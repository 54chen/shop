import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { History } from 'src/app/_models/history';
import { Product } from 'src/app/_models/product';
import { OrderService } from 'src/app/_service/order.service';
import { ProductService } from 'src/app/_service/product.service';
import { AuthService } from 'src/app/_service/auth.service';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  orders: Order[] = [];
  user: User|undefined;
  history: History[] = [];
  products: Product[]|undefined;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private authService: AuthService,
  ) {}

  @ViewChild('orderEditInput')
  set orderEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }


  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      orders => (this.orders = orders) 
    );
  }

  delete(order: Order) {
    this.orders = this.orders.filter(p => p !== order);
    this.orderService
      .deleteOrder(order.id)
      .subscribe();
  }

  show(order: Order) {
    this.history = [];
    let userId = order.owner;
    let time = order.time;

    let user$ = this.authService.getUsersById(userId);
    let orders$ = this.orderService.getOrdersByUserAndTime(userId, time);
    user$.subscribe(u => this.user = u);
    orders$.subscribe(os=>{
      os.map(o=>{
        this.productService.getProductsById(o.sku).subscribe(p=>{
          let h:History = {sku: o.sku, name: p.name, price: o.price, current: p.price,time: o.time,count: o.count} as History
          this.history.push(h);
        });
      });
    });
  }
}




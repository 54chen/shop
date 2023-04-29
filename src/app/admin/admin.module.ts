import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    OrderComponent,
    ProductComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { } 

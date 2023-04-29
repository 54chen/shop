import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
 
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

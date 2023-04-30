import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';

/**
 * This module provides functionality for common users.
 *
 */

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    CartComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false // return entity after PUT/update
      }
    )
  ],
  providers: [ 
    HttpErrorHandler,
    MessageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

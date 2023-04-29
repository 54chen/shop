import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product/product-list.component';
import { CartComponent } from './cart/cart.component';

import { Role } from './_models/user';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard], data: { roles: [Role.ROLE_CUSTOMER, Role.ROLE_ADMIN]}   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';

import {authGuard} from '../auth/auth.guard';
import { Role } from '../_models/user';

const routes: Routes = [{ 
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard], data: { roles: [Role.ROLE_ADMIN]},
  children: [
    {
      path: '',
      canActivateChild: [authGuard], data: { roles: [Role.ROLE_ADMIN]},
      children: [
        { path: '', component: ProductComponent },
        
        { path: 'orders', component: OrderComponent },
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

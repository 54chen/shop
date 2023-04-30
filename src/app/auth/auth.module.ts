import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

/**
 * This module provides functionality for managing.
 *
 * @dependencies CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
 * @declarations LoginComponent
 * @exports 
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}
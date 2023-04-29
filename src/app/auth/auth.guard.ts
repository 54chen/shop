import {inject} from '@angular/core';
import {
  CanActivateFn, CanMatchFn,CanActivateChildFn,
  Router, ActivatedRouteSnapshot
} from '@angular/router';
 
import { Role } from '../_models/user';

import {AuthService} from '../_service/auth.service';

export const authGuard: CanMatchFn|CanActivateFn|CanActivateChildFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const roles = route.data['roles'] as Array<Role>;

  if (authService.userValue && roles.includes(authService.userValue.role)) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
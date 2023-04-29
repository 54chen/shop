import { Injectable } from '@angular/core';

import { User,Role } from './_models/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    const users = [
      {
        id: 1,
        username: 'admin',
        password: '$2y$10$vltGSNVIVKgyvddu8Iqb5.xamlDkrzCfVj8eXXjEBLzhZNQc6soaK', //qwer4321!
        role: Role.ROLE_ADMIN
      },
      {
        id: 2,
        username: 'user',
        password: '$2y$10$vltGSNVIVKgyvddu8Iqb5.xamlDkrzCfVj8eXXjEBLzhZNQc6soaK', //
        role: Role.ROLE_CUSTOMER
      }
    ];
    return {users};
  }
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User,Role } from './_models/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      {
        id: 1,
        username: 'admin',
        password: 'qwer4321!',//'$2y$10$vltGSNVIVKgyvddu8Iqb5.xamlDkrzCfVj8eXXjEBLzhZNQc6soaK', //qwer4321!
        role: Role.ROLE_ADMIN
      },
      {
        id: 2,
        username: 'user',
        password: 'qwer4321!',//'$2y$10$vltGSNVIVKgyvddu8Iqb5.xamlDkrzCfVj8eXXjEBLzhZNQc6soaK', //
        role: Role.ROLE_CUSTOMER
      }
    ];

    const products = [
      {
        id: 1,
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens'
      },
      {
        id: 2,
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras'
      },
      {
        id: 3,
        name: 'Phone Standard',
        price: 299,
        description: ''
      }
    ];

    const orders = [
      {
        id: 1,
        sku: 1,
        price: 10,
        count: 1,
        owner: 1,
        time: Math.floor(new Date().getTime() / 1000)
      },
      {
        id: 2,
        sku: 2,
        price: 110,
        count: 1,
        owner: 2,
        time: Math.floor(new Date().getTime() / 1000)
      },
      {
        id: 3,
        sku: 3,
        price: 10,
        count: 1,
        owner: 2,
        time: Math.floor(new Date().getTime() / 1000)
      },
      {
        id: 4,
        sku: 3,
        price: 10,
        count: 2,
        owner: 2,
        time: Math.floor(new Date().getTime() / 1000)
      },
    ]
    return {users, products, orders};
  }

  genId<T extends { id: any }>(collection: T[]): any {
    if (!collection || collection.length === 0) {
      return 1;
    }
    const maxId = Math.max(...collection.map((item) => item.id));
    return maxId + 1;
  }
  
}

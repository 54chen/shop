import { Order } from "./order"
import { Product } from "./product"
import { User } from "./user"

export interface History {
  sku: number;
  name: string;
  price: number;
  current: number;
  time: number;
  count: number;
}



export interface Order {
  id?: number,
  sku: number,
  price: number,
  count: number,
  owner?: number,
  time: number;
}

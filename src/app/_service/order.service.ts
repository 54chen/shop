import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Order } from '../_models/order';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

/**
 * This service provides functionality for orders.
 *
 * @dependencies HttpClient,HttpErrorHandler
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'api/orders';

  private handleError: HandleError;

  constructor( private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler ) { 
    this.handleError = httpErrorHandler.createHandleError('Orderservice');
  }

   /** GET Orders from the server */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
      .pipe(
        catchError(this.handleError('getOrders', []))
      );
  }
  
  searchOrders(owner: number): Observable<Order[]> {
    const options = owner ?
     { params: new HttpParams().set('owner', owner) } : {};

    return this.http.get<Order[]>(this.ordersUrl, options)
      .pipe(
        catchError(this.handleError<Order[]>('searchOrders', []))
      );
  }

  deleteOrder(id: number|undefined): Observable<unknown> {
    const url = `${this.ordersUrl}/${id}`; // DELETE api/orders/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteOrder',[]))
      );
  }

  postOrder(order: Order): Observable<unknown> {
    const url = `${this.ordersUrl}`; //POST api/orders
    return this.http.post<Order>(url, order)
      .pipe(
        catchError(this.handleError('postOrder',order))
      );
  }
  getOrdersByUserAndTime(userId:number|undefined, time:number): Observable<Order[]> {
    const id = userId?userId:0;
    const options = { params: new HttpParams().set('owner', id).append('time', time) };
    return this.http.get<Order[]>(this.ordersUrl, options)
      .pipe(
        catchError(this.handleError<Order[]>('getOrdersByUserAndTime', []))
      );
  }
}

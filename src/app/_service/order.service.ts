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

  deleteOrder(id: number): Observable<unknown> {
    const url = `${this.ordersUrl}/${id}`; // DELETE api/orders/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteOrder',[]))
      );
  }

  getOrdersByUserAndTime(userId:number, time:number): Observable<Order[]> {
    const options = { params: new HttpParams().set('owner', userId).append('time', time) };
    return this.http.get<Order[]>(this.ordersUrl, options)
      .pipe(
        catchError(this.handleError<Order[]>('searchOrders', []))
      );
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { Router } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private ProductIdUrl = 'api/products/';

  private handleError: HandleError;

  constructor( private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler ) { 
    this.handleError = httpErrorHandler.createHandleError('ProductService');
  }

   /** GET heroes from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }
  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateProduct(product: Product): Observable<Product> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<Product>(this.productsUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('updateProduct', product))
      );
  }

  deleteProduct(id: number): Observable<unknown> {
    const url = `${this.productsUrl}/${id}`; // DELETE api/products/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct',[]))
      );
  }

  getProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(this.ProductIdUrl + id)
      .pipe(
        tap(_ => console.log('fetched Products')),
        catchError(this.handleError<Product>('getProducts'))
      );
  }
}

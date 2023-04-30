import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

import { Role, User } from '../_models/user';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

/**
 * This service provides functionality for managing user accounts.
 *
 * @dependencies HttpClient,HttpErrorHandler
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private handleError: HandleError;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  private usernameUrl = 'api/users?username=';
  private usersUrl = 'api/users';

  constructor(private router: Router,private http: HttpClient,httpErrorHandler: HttpErrorHandler ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
      this.handleError = httpErrorHandler.createHandleError('AuthService');
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<boolean>  {
    return this.geUserByNameAndPassword(username, password).pipe(map(users => {
      let ret = users.some(user=>{
        if (user.username == username) {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return true;
        }
        return false;
      });
      return ret;
    }));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUsersByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(this.usernameUrl + username)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  geUserByNameAndPassword(username: string, password: string): Observable<User[]> {
    const options = { params: new HttpParams().set('username', username).append('password', password) };
    return this.http.get<User[]>(this.usersUrl, options)
      .pipe(
        catchError(this.handleError<User[]>('geUserByNameAndPassword', []))
      );
  }

  getUsersById(id: number|undefined): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User>('getUsers'))
      );
  }

  /** PUT: update the name and email on the server. Returns the updated user upon success. */
  updateUser(user: User): Observable<User> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<User>(this.usersUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }

}
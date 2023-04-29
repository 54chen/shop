import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Role, User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  private usernameUrl = 'api/users?username=';
  private userIdUrl = 'api/users/';

  constructor(private router: Router,private http: HttpClient ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<boolean>  {
    return this.getUsersByUsername(username).pipe(map(users => {
      let ret = users.some(user=>{
        if (user.username == username && user.password == password) {
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

  getUsersById(id: number): Observable<User> {
    return this.http.get<User>(this.userIdUrl + id)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User>('getUsers'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
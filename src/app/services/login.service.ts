import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class LoginService {
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  private currentUser: User;

  constructor(private http: Http) {
    this.currentUser = null;
  }
  
  login(userName: string, password: string) {
    return this.http.post('/users/login', {userName: userName, password: password}).map((response: Response) => {
      // Login sucessful if there is a JWT token in the response
      let user = response.json();
      if (user && user.token) {
        // Store user details and JWT token in local storage to keep user logged between pages refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.isUserLoggedIn.next(true);
      }
    });
  }
    
  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.isUserLoggedIn.next(false);
  }
  
  getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      return JSON.parse(localStorage.getItem('currentUser')); 
    }
  }
  
  getIsUserLoggedIn() {
    return this.isUserLoggedIn.asObservable();
  }
}

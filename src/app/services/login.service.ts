import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { MessageService } from './message.service';

@Injectable()
export class LoginService {
  private userLoggedIn = new BehaviorSubject<User>(null);
  private currentUser: User;
  
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private http: Http,
    private _router: Router,
    private _messageService: MessageService) {
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
        this.userLoggedIn.next(user);

        this.programRefreshFunction();
      }
    });
  }
    
  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.userLoggedIn.next(null);
  }
  
  refreshAuthentication(returnHome: boolean = false) {
    let refreshToken = (JSON.parse(localStorage.getItem('currentUser'))).refreshToken;
    let userId = (JSON.parse(localStorage.getItem('currentUser')))._id;

    this.http.post('/users/refresh', {userId: userId, refreshToken: refreshToken}).map((response: Response) => {
      if (response.status == 200) {
        let user = response.json();
        
        if (user && user.token) {
          // Store user details and JWT token in local storage to keep user logged between pages refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;
          this.userLoggedIn.next(user);
          
          this.programRefreshFunction();
          if (returnHome) {
            window.location.reload();
          }
        } else {
          // User cannot be re-authenticated - Go to login page
          this._messageService.error('Ha ido mal');
          this._router.navigate(['/login']);
        }
      } else{
        // User cannot be re-authenticated - Go to login page
        let error = response.json();
        
        this._messageService.error(error);
        this._router.navigate(['/login']);
      }
    }).subscribe();
  }
  
  getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      let user = JSON.parse(localStorage.getItem('currentUser')); 
      this.userLoggedIn.next(user);
      return user; 
    }
  }
  
  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }
  
  private programRefreshFunction() {
    console.log('Programando next refresh');
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let expirationTime = (new Date(this.jwtHelper.getTokenExpirationDate(user.token)).getTime() - new Date().getTime()); //Miliseconds
        
    // Refresh token before it expires (at least when 80% of expiration time)
    expirationTime = Math.floor(expirationTime * 0.8);
    if (expirationTime > 0) {
      setTimeout(() => {
        this.refreshAuthentication();
      }, expirationTime);
    }
  }
}

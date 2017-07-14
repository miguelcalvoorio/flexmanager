import { Injectable } from '@angular/core'; 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 

import { Subject }    from 'rxjs/Subject'; 

import { LoginService } from '../services/login.service';

@Injectable() 
export class AuthHelp implements CanActivate { 
    constructor(
        private router: Router,
        private _loginService: LoginService) { } 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        
        
        //if (localStorage.getItem('currentUser')) { 
        if (this._loginService.getCurrentUser()) {
            // logged in so return true after update global variables
            return true; 
        } 
        
        // not logged in so redirect to login page with the return url 
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}); 
        return false; 
    }
} 
import { Injectable } from '@angular/core'; 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 

import { Subject }    from 'rxjs/Subject'; 
import { JwtHelper }  from 'angular2-jwt';

import { LoginService } from '../services/login.service';

@Injectable() 
export class AuthHelp implements CanActivate { 
    private jwtHelper: JwtHelper = new JwtHelper();
    
    constructor(
        private router: Router,
        private _loginService: LoginService) { } 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        console.log('canActivate');
        if (this._loginService.getCurrentUser()) {
            console.log('Hay usuario: ');
            let expirationTime = (new Date(this.jwtHelper.getTokenExpirationDate(this._loginService.getCurrentUser().token)).getTime() - new Date().getTime()); //Miliseconds
            if (expirationTime > 0) {
              return true; 
            } else {
                // Check if we have not an expired refresh token
                console.log('Lanzando refresh');
                this._loginService.refreshAuthentication();
            }
        } else {
            // Redirect to Login page
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
} 
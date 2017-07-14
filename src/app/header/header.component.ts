import { Component, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';
import { Router, ActivatedRoute }       from '@angular/router';

import { AuthHelp }     from '../helpers/auth-help';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { User }         from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private userLoggedIn: Observable<boolean>;
  private serviceSubscription: Subscription;
  private currentUser: User;
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authHelp: AuthHelp,
    private loginService: LoginService) { }
    
  ngOnInit() {
    this.userLoggedIn = this.loginService.getIsUserLoggedIn();
    this.serviceSubscription = this.userLoggedIn.subscribe(isUserLoggedIn => {
      if (isUserLoggedIn) {
        this.currentUser = this.loginService.getCurrentUser();
      } else {
        this.currentUser = new User();;
      }
    });
  }   
    
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}

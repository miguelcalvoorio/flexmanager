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
  private userLoggedIn: Observable<User>;
  private serviceSubscription: Subscription;
  private currentUser: User;
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authHelp: AuthHelp,
    private loginService: LoginService) { }
    
  ngOnInit() {
    this.userLoggedIn = this.loginService.getUserLoggedIn();
    this.serviceSubscription = this.userLoggedIn.subscribe(user => {
      console.log('He pillado cambio de user status: ', user);
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = new User();;
      }
    });
  }   
    
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}

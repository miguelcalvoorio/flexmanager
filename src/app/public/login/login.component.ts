import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { LoginService }   from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  showRememberNextTime = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _loginService: LoginService) { }

  ngOnInit() {
    // reset login status
    this._loginService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  login() {
    this.loading = true;
    this._loginService.login(this.model.userName, this.model.password)
      .subscribe(
        data => {
          this._router.navigate([this.returnUrl]);
        },
        error => {
          this._messageService.error('Ha ido mal');
          this.loading = false;
        }
      );
  }
    
  private loginSubmit() {
    this.login();
  }

  onLoginSubmit() {
    this.loginSubmit();
  }

}

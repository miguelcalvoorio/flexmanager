import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { MessageService } from '../../services/message.service';
import { AppFormValidators } from '../../helpers/form-validators'; 
import { UserService }       from '../../services/user.service';
import { User }              from '../../models/user';

@Component({
  selector: 'app-joinus',
  templateUrl: './joinus.component.html',
  styleUrls: ['./joinus.component.css']
})

export class JoinusComponent implements OnInit {
  joinUsForm: FormGroup;
  model: any = {};
  loading = false;

  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.joinUsForm = this._builder.group({
      joinUsName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      joinUsEmail: ['', Validators.compose([Validators.required, AppFormValidators.validateEmail])],
      joinUsCredentials: this._builder.group({
        joinUsPassword: ['', Validators.compose([Validators.required, Validators.maxLength(50), AppFormValidators.validatePassComplexity])],
        joinUsPasswordCheck: ''
      }, { validator: this.arePasswordEqual })
    });
  }
  
  private arePasswordEqual(group: FormGroup) {
    return group.controls['joinUsPassword'].value === group.controls['joinUsPasswordCheck'].value
      ? null : {'mismatch': true};
  }
  
  private joinUsSubmit() {
    this.loading = true;
    this._userService.create(this.model)
      .subscribe( 
        data => { 
          this._messageService.success('Registration successful');
          this._router.navigate(['/login']); 
        }, 
        error => { 
          this._messageService.success(error); 
          this.loading = false;
        }); 
    }
    
    onJoinUsSubmit() {
      this.joinUsSubmit();
    }

}

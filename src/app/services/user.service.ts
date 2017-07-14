import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(
    private http: Http) { }

  create (user: User) {
    return this.http.post('/users/register', user).map((response: Response) => {});
  }
  
  getAll () {
    return this.http.get('/users').map((response: Response) => response.json());
  }
  
  findUsers(query: string) {
    return this.http.get('/users/?q=' + query).map((response: Response) => response.json());
  }
}

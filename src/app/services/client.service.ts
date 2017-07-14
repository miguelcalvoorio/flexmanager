import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Client }  from '../models/client';

@Injectable()
export class ClientService {
  constructor(private http: Http) {}
  
  create (client: Client) {
    return this.http.post('/clients/new', client).map((response: Response) => {});
  }
    
  getAll () {
    return this.http.get('/clients').map((response: Response) => response.json());
  }
    
  deleteClient (id: string) {
    return this.http.delete('/clients/' + id).map((response: Response) => {});
  }
    
  updateClient (client: Client) {
    return this.http.put('/clients/' + client._id, client).map((response: Response) => {});
  }
}
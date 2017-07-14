import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Subject }    from 'rxjs/Subject'; 
import { Router }     from '@angular/router'; 

@Injectable()
export class MessageService {
  private subjectMessage = new Subject<any>();
  private subjectWaiting = new Subject<boolean>();
    
  constructor (private router: Router) {}
  
  warning(message: any) {
    this.subjectMessage.next({type: 'warning', text: message, show: true, time: 0});
    this.checkMessage(message);
  }
    
  error(message: any) {
    this.subjectMessage.next({type: 'danger', text: message, show: true, time: 0});
    this.checkMessage(message);
  }
    
  primary(message: any) {
    this.subjectMessage.next({type: 'primary', text: message, show: true, time: 0});
    this.checkMessage(message);
  }
   
  success(message: any) {
    this.subjectMessage.next({type: 'success', text: message, show: true, time: 0});
    this.checkMessage(message);
  }
    
  info(message: any) {
    this.subjectMessage.next({type: 'info', text: message, show: true, time: 0});
    this.checkMessage(message);
  }
  
  setWaiting(waiting: boolean) {
    this.subjectWaiting.next(waiting);
  }
    
  getMessage(): Observable<any> { 
    return this.subjectMessage.asObservable(); 
  }
  
  getWaiting(): Observable<boolean> {
    return this.subjectWaiting.asObservable();
  }
  
  private checkMessage(message: any) {
    // Check if it is an Authorization error
    if (message && message.status) {
      if (message.status == 401) {
        this.router.navigate(['/login']); 
      }
    }
  }
}

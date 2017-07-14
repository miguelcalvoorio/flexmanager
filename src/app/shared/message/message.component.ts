import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit, OnDestroy {
  private msgSubscription: Subscription;
  private waitingSubscritption: Subscription;
  
  private showWaitingModal: boolean;
  private messageList: any = [];
    
  constructor(private _msgServices: MessageService) {}

  ngOnInit() {
    this.showWaitingModal = false;
    
    this.msgSubscription = this._msgServices.getMessage().subscribe(message => {
      // Include message in the list
      this.messageList.push(message);
            
      // Delete message automatically afeter 4 seconds
      setTimeout(() => {
        this.removeMessage(message);
      }, 4000);
    });
    
    this.waitingSubscritption = this._msgServices.getWaiting().subscribe(waiting => {
      this.showWaitingModal = waiting;
    })
  }

  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
  }
    
  private removeMessage(message: any) {
    let index = this.messageList.indexOf(message);
    this.messageList.splice(index, 1);
  }
}

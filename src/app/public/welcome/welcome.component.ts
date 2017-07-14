import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private jbtHeading: string;
  private jbtSubHeading: string;
  private jbtText: string;
    
  constructor() {
    this.jbtHeading = 'Welcome!'; 
    this.jbtSubHeading = 'This is the starting point to manage your projects'; 
    this.jbtText = 'Flex Manager will help you to easily admin your projects and teams ' + 
      'from any device. Just a few clicks to set-up your project and teams ' + 
      'deployed and you will be able to manage all related things as tasks ' + 
      'backlog, milestones acomplishment, effort, schedule and much more. ' + 
      'And all of this could be done in a simple and effective way.'; 
  }

  ngOnInit() {
  }

}

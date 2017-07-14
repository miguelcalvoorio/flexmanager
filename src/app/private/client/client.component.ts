import { Component, OnInit }   from '@angular/core';
import { FormBuilder }         from '@angular/forms'; 
import { FormGroup }           from '@angular/forms'; 
import { Validators }          from '@angular/forms'; 

import { MessageService }      from '../../services/message.service';
import { ClientService }       from '../../services/client.service';
import { UserService }         from '../../services/user.service';
import { Client }              from '../../models/client';
import { ServiceGroup }        from '../../models/servicegroup';
import { Industry }            from '../../models/industry';
import { Country }             from '../../models/country';

import { ClientAttributeData } from '../../static/clientattr';
import { CountryData }         from '../../static/country';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private clientForm   : FormGroup;
  private clients      : Client[] = [];
  private serviceGroups: ServiceGroup[];
  private industries   : Industry[];
  private countries    : Country[];
    
  private editClient    : any = {};
  private selectedClient: any = {};

  private tagPlaceHolder= '+ add user permission';
  private maxNumberOfUserPermissions = 0; // 0 equals no limits
  private minLengthOfUser  = 0;
  private maxLengthOfUser  = 0; // 0 equals no limits
  private listOfUsers = [];
  
  private minNumLettersForUserFilter = 3;
  
  private loading = false;

  constructor(
    private _builder       : FormBuilder,
    private _messageService: MessageService,
    private _clientService : ClientService,
    private _userService   : UserService) {
  }

  ngOnInit() {
    this.clientForm = this._builder.group({
      clientName        : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      clientIndustry    : ['', Validators.compose([Validators.required])],
      clientServiceGroup: ['', Validators.compose([Validators.required])],
      clientCountry     : ['', Validators.compose([Validators.required])]
    });
    
    // Show modal waiting message
    this._messageService.setWaiting(true);
    
    this.serviceGroups = ClientAttributeData.getServiceGroups();
    this.industries    = ClientAttributeData.getIndustries()
      .filter((item)=> item.idServiceGroup == this.editClient.clientServiceGroup);
    this.countries     = CountryData.getCountries();
        
    this.getAllClients();
  }
  
  private updateListOfUsers(newTag: string) {
    if ((newTag) && (newTag.length >= this.minNumLettersForUserFilter)) {
      this._userService.findUsers(newTag)
        .subscribe(
          data => {
            this.listOfUsers = data.map(item => {return item.userName});
          },
          error => {
            // No data
            this.listOfUsers = [];
          }
        );
    } else {
      this.listOfUsers = [];
    }
  }
    
  private onSelectServiceGroup(idServiceGroup: string) {
    this.industries = ClientAttributeData.getIndustries()
      .filter((item)=> item.idServiceGroup == idServiceGroup);
  }
    
  private getAllClients() {
    // Show modal waiting message
    this._messageService.setWaiting(true);
    
    this._clientService.getAll()
      .subscribe(
        data => {
          this.clients = data;
          this._messageService.setWaiting(false);
        },
        error => {
          this._messageService.error(error);
          this._messageService.setWaiting(false);
        }
      );
  }
    
  private deleteClientRequest(client: Client) {
    this.selectedClient = Object.assign({}, client); // Object copy, to avoid references
  }
    
  private editClientRequest(client: Client) {
    this.editClient = Object.assign({}, client); // Object copy, to avoid references
    
    // Force reloading industry listbox
    this.onSelectServiceGroup(this.editClient.clientServiceGroup);
  }
    
  private newClientRequest() {
    this.editClient._id                = ''
    this.editClient.clientName         = '';
    this.editClient.clientServiceGroup = '';
    this.editClient.clientIndustry     = ''
    this.editClient.clientCountry      = '';
    this.editClient.clientUsers        = [];
  }
    
  private deleteClient(id: string) {
    this._clientService.deleteClient(id)
      .subscribe(
        data => {
          // Update client list
          this.getAllClients();  
        },
        error => {
          this._messageService.error('Ha ido mal');
        }
      );
                
    // Close modal window
    document.getElementById("closeConfirmDeleteClient").click();
  }
    
  private clientSubmit(id: string) {
    this.loading = true;
        
    if (id == '') {
      this._clientService.create(this.editClient)
        .subscribe( 
          data => { 
            this._messageService.success('Ha ido bien');
                        
            // Update client list
            this.getAllClients();
                        
            this.loading = false;
                        
            // Close modal window
            document.getElementById("closeNewClient").click();
          }, 
          error => { 
            this._messageService.error(error);
            this.loading = false;
          }
        ); 
    } else {
      this._clientService.updateClient(this.editClient)
        .subscribe(
          data => {
            this._messageService.success('Ha ido bien');
                        
            // Update client list
            this.getAllClients();
                        
            this.loading = false;
            
            // Close modal window
            document.getElementById("closeNewClient").click();
          },
          error => {
            this._messageService.error(error);
            this.loading = false;
          }
        );
    }
  }
}

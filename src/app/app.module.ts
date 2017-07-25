import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms'; 

import { HttpModule }             from '@angular/http';

import { CustomHttpProvider } from './helpers/custom-http'
import { AuthHelp } from './helpers/auth-help';
import { MessageService } from './services/message.service';
import { PaginationService } from './services/pagination.service';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { ClientService } from './services/client.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Routing } from './app.routing';
import { TaginputComponent } from './shared/taginput/taginput.component';
import { HomeComponent } from './private/home/home.component';
import { WelcomeComponent } from './public/welcome/welcome.component';
import { LoginComponent } from './public/login/login.component';
import { JoinusComponent } from './public/joinus/joinus.component';
import { MessageComponent } from './shared/message/message.component';
import { ClientComponent } from './private/client/client.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CountryPipe } from './pipes/country.pipe';
import { IndustryPipe } from './pipes/industry.pipe';
import { ServicegroupPipe } from './pipes/servicegroup.pipe';
import { ProjectComponent } from './private/project/project.component';
import { TaskComponent } from './private/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageComponent,
    TaginputComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    JoinusComponent,
    ClientComponent,
    PagenotfoundComponent,
    CountryPipe,
    IndustryPipe,
    ServicegroupPipe,
    ProjectComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    CustomHttpProvider,
    AuthHelp,
    MessageService,
    PaginationService,
    LoginService,
    UserService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

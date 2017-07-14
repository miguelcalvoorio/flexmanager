import { Routes, RouterModule } from '@angular/router';

// Public zone
import { LoginComponent }   from './public/login/login.component';
import { JoinusComponent }  from './public/joinus/joinus.component';

// Private zone
import { HomeComponent }    from './private/home/home.component';
import { ClientComponent }  from './private/client/client.component';
import { ProjectComponent } from './private/project/project.component';
import { TaskComponent }    from './private/task/task.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthHelp }         from './helpers/auth-help';

const appRoutes: Routes = [
    { path: 'pagenotfound', component: PagenotfoundComponent },
    { path: 'login'       , component: LoginComponent        },
    { path: 'joinus'      , component: JoinusComponent       },
    { path: ''            , component: HomeComponent,           canActivate: [AuthHelp] },
    { path: 'home'        , component: HomeComponent,           canActivate: [AuthHelp] },
    { path: 'client'      , component: ClientComponent,         canActivate: [AuthHelp] },
    { path: 'project'     , component: ProjectComponent,        canActivate: [AuthHelp] },
    { path: 'task'        , component: TaskComponent,           canActivate: [AuthHelp] },
    
    // otherwise redirect to home
    { path: '**', redirectTo: 'pagenotfound' }
];

export const Routing = RouterModule.forRoot(appRoutes);
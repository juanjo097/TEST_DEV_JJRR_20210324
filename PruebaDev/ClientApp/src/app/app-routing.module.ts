import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CustomersComponent } from './components/modules/customers/customers.component';
import { PersonasComponent } from './components/modules/personas/personas.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'personas', component: PersonasComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


export const AppRoutingModule = RouterModule.forRoot(routes);

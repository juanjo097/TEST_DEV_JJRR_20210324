import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// libs
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

// service api
import { ApiService } from './_services/api.service';

// helpers
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ExcelService } from './_services/excel.service';

// components
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/modules/customers/customers.component';
import { PersonasComponent } from './components/modules/personas/personas.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatePersonaComponent } from './components/modules/personas/modals/update-persona/update-persona.component';
import { DeletePersonaComponent } from './components/modules/personas/modals/delete-persona/delete-persona.component';
import { AddPersonaComponent } from './components/modules/personas/modals/add-persona/add-persona.component';
import { ToastComponent } from './components/toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CustomersComponent,
    PersonasComponent,
    UpdatePersonaComponent,
    DeletePersonaComponent,
    AddPersonaComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ExcelService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdatePersonaComponent,
    DeletePersonaComponent,
    AddPersonaComponent
  ]
})
export class AppModule { }

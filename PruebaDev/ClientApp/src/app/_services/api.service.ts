import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';

import { IPersonasFisicas } from '../_models/IPersonasFisicas';


@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  private cur_usr_sbj: BehaviorSubject<any>;
  public cur_usr: Observable<any>;


  private url = 'https://localhost:44319/api/';
  private toka_url = 'https://api.toka.com.mx/candidato/api/';
  errorData: {};

  private token_customers = '';

  constructor(private http: HttpClient, private router: Router)
  {
    this.cur_usr_sbj = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('cur_user')));
    this.cur_usr = this.cur_usr_sbj.asObservable();
  }

  public get currentUserValue() {
    return this.cur_usr_sbj.value;
  }


  login(username: string, password: string)
  {
    return this.http.post<any>(this.url + 'auth/login',
      {
        username: username,
        password: password
      })
      .pipe(map(user =>
      {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (user && user.token)
          localStorage.setItem('cur_user', JSON.stringify(user));
          this.cur_usr_sbj.next(user);
          return user;
      }),
        catchError(this.handleError)
      );
  }

  getPersonaFisica(): Observable<any>{
    return this.http.get<any>(this.url + 'TbPersonasFisicas').pipe(map(personas_f =>
    {
      return personas_f;
    }),
      catchError(this.handleError)
    );
  }


  deletePersonaFisica(id): Observable<any>{
    return this.http.delete<any>(this.url + 'TbPersonasFisicas/' + id).pipe(map(persona_f =>
    {
      return persona_f;
    }),
      catchError(this.handleError)
    );
  }

  addPersonaFisica(data: IPersonasFisicas): Observable<any>{
    data.UsuarioAgrega = Number(data.UsuarioAgrega);

    return this.http.post<any>(this.url + 'TbPersonasFisicas', data)
      .pipe(map(data =>
      {
        return data;
      }),
        catchError(this.handleError)
      );
  }

  updatePersonaFisica(id, data: IPersonasFisicas): Observable<any> {
    data.UsuarioAgrega = Number(data.UsuarioAgrega);
    return this.http.put<any>(this.url + 'TbPersonasFisicas/' + id, data)
      .pipe(map(data => {
        return data;
      }),
        catchError(this.handleError)
      );
  }


  getCustomers(){
    const headers = {
      'Authorization': `Bearer ${this.token_customers}`,
    };

    return this.http.get<any>(this.toka_url + 'customers',
      {
        headers
      }).pipe(map(customers =>
      {
        console.log(customers);
        return customers;
      }),
        catchError(this.handleError)
      );
  }

  test() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos/1').pipe(map(customers => {
        console.log(customers);
        return customers;
      }),
        catchError(this.handleError)
      );
  }

  logout()
  {
    // remove user from local storage and set current user to null
    localStorage.removeItem('cur_user');
    this.cur_usr_sbj.next(null);
    this.router.navigate(['/login']);

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
    {
      console.error('Error:', error.message);
    } else
    {
      console.error(error);
    }

    this.errorData =
    {
      error: error,
    };

    return throwError(this.errorData);
  }
}

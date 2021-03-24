import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';


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

  private token_customers =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVjYW5kMDAyMSIsInJvbGUiOiJEZXZlbG9wZXIiLCJuYmYiOjE2MTY0Njg5NTcsImV4cCI6MTYxNjQ3MDE1NywiaWF0IjoxNjE2NDY4OTU3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCJ9.V9KsgcHt10cERXFSZP2mOO6J7rjs-1W8CAEQx7NTM10';

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

  getPersonaFisica()
  {
    return this.http.get<any>(this.url + 'TbPersonasFisicas').pipe(map(personas_f =>
    {
      return personas_f;
    }),
      catchError(this.handleError)
    );
  }


  deletePersonaFisica(id)
  {
    return this.http.delete<any>(this.url + 'TbPersonasFisicas/' + id).pipe(map(persona_f =>
    {
      return persona_f;
    }),
      catchError(this.handleError)
    );
  }

  addPersonaFisica(data)
  {
    return this.http.post<any>(this.url + 'TbPersonasFisicas',
      {
        Nombre: data.nombre,
        ApellidoPaterno: data.appelidop,
        ApellidoMaterno: data.apellidom,
        RFC: data.rfc,
        FechaNacimiento: data.fechan,
        UsuarioAgrega: data.usuarioag
      })
      .pipe(map(data =>
      {
        return data;
      }),
        catchError(this.handleError)
      );
  }


  getCustomers()
  {
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
